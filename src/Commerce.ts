import {
  action,
  computed,
  observable,
  reaction,
  runInAction,
} from 'mobx'

import akasha from 'akasha'

import LineItem from './LineItem'
import Order from './Order'
import User from './User'

import {
  ICart,
  ICartAPI,
  IClient,
  ICoupon,
  IGeoRate,
  IOrder,
  IPayment,
  IUser,
} from './types'

import {
  log
} from './utils'

export type CartUpdateRequest = [string, number, boolean, boolean]
export type AnalyticsProductTransformFn = (v: any) => any

/**
 * Cart keeps track of items being added and removed from the cart/order
 */
export default class Commerce implements ICartAPI {
  /**
   * id of the current cart in the system
   */
  @observable
  cart: ICart = {
    id: '',
    storeId: '',
    email: '',
    name: '',
  }

  /**
   * client is reference to a IClient
   */
  @observable
  client: IClient

  /**
   * updateQueue contains the list of cart item updates so we can ensure
   * updates are pushed fifo
   */
  @observable
  updateQueue: CartUpdateRequest[] = []

  @observable
  updateQueuePromise: Promise<void> = new Promise((res) => { res() })

  /**
   * order is the object for tracking the user's order/cart info
   */
  @observable
  order: Order

  /**
   * user is an object for tracking the user's contact information
   */
  @observable
  user: any = User.load()

  /**
   * payment is the object for tracking the user's payment information
   */
  @observable
  payment: any = {}

  @observable
  _cartInitialized: any = false

  @observable
  analytics: any

  @observable
  analyticsProductTransform: AnalyticsProductTransformFn

  /**
   * Create an instance of Commerce
   * @param client is the http client for talking to carts
   * @param order is the default order configuration
   */
  constructor(
    client: IClient,
    order = {},
    taxRates: IGeoRate[] = [],
    shippingRates: IGeoRate[] = [],
    analytics: any = undefined,
    aPT: AnalyticsProductTransformFn = (v) => v,
  ) {
    this.client = client
    this.order = order ? new Order(order, taxRates, shippingRates, client, this) : Order.load(client, taxRates, shippingRates, this)
    this.analytics = analytics
    this.analyticsProductTransform = aPT
    // this.cartInit()
  }

  /**
   * @return the items on the order
   */
  @computed
  get items(): LineItem[] {
    return this.order.items
  }

  /**
   * @return the number of items on the order
   */
  @computed
  get size(): number {
    return this.order.size
  }

  /**
   * Get the cart id
   * @return the cartId of the current cart from storage.  If there is no
   * current cart, return empty
   */
  @computed
  get cartId(): string {
    return akasha.get('cartId') ?? ''
  }

  /**
   * Get the cart id
   */
  @computed
  get isCartInit(): boolean {
    return this._cartInitialized
  }

  @computed
  get storeId() : string {
    return this.order.storeId
  }

  /**
   * Initialize the cart system.
   * @return initialized or recovered cart instance
   */
  @action
  async cartInit(): Promise<ICart> {
    // check for if the cartId exists and either create a new cart or load cart
    // id
    if (!this.cartId) {
      this.cart = await this.client.cart.create()
      akasha.set('cart', this.cart)
    } else {
      this.cart.id = this.cartId
    }

    runInAction(() => {
      this.order = new Order(akasha.get('order'), [], [], this.client, this)
    })

    // Define reaction for storeid
    reaction (
      () => this.user.email,
      (email) => {
        this.cartSetEmail(email)
      }
    )

    // Define reaction for username
    reaction (
      () => this.user.firstName + ' ' + this.user.lastName,
      (name) => {
        this.cartSetName(name)
      }
    )

    return this.cart
  }

  /**
   * Get the current state of a specific lineitem
   * @param id the product id of a lineitem
   * @return lineitem or undefined if product isn't in cart
   */
  async get(id: string): Promise<LineItem | undefined> {
    // Check the item on the order
    let item = this.order.get(id)

    if (item) {
      return item
    }

    // Check the item in the queue
    for (const request of this.updateQueue) {
      if (request[0] !== id) {
        continue
      }

      const li = new LineItem({
        id: request[0],
        quantity: request[1],
        locked: request[2],
        ignore: request[3],
      }, this.client)

      try {
        await li.loadProductPromise
      } catch (err) {
        log('get error', err)
        return
      }

      return li
    }
  }

  /**
   * Set a lineitem by product id.  Add lineitem to asynchronous update queue
   * @param id productId
   * @param quantity amount of productId in cart
   * @param locked is this lineitem modifiable in the UI
   * @param ignore is this lineitem ignored by the UI (loading in progress,
   * freebie etc)
   * @return promise for when all set operations are completed
   */
  @action
  async set(id, quantity, locked=false, ignore=false): Promise<void> {
    this.updateQueue.push([id, quantity, locked, ignore])

    if (this.updateQueue.length === 1) {
      this.updateQueuePromise = this.executeUpdates()
      await this.updateQueuePromise
    }
  }

  /**
   * Refresh a lineitem by product id.  Add lineitem to asynchronous update queue
   * @return return the LineItem if it exists or nothing if it doesn't.
   */
  @action
  async refresh(id): Promise<LineItem | undefined> {
    let item = await this.get(id)
    if (item) {
      await this.updateQueue.push([id, item.quantity, item.locked, item.ignore])
      return await this.get(id)
    }

    return
  }

  /**
   * Execute all queued updates
   * @return promise for when all queued updates are done
   */
  @action
  async executeUpdates(): Promise<void> {
    const items = this.order.items

    let updateQueueRequest = this.updateQueue.shift()

    // Resolve or escape if empty queue
    if (!updateQueueRequest) {
      return
    }

    let [id, quantity, locked, ignore] = updateQueueRequest

    // log('eu', id)

    // Resolve or escape if itemless mode
    if (this.order.inItemlessMode && quantity > 0) {
      return
    }

    // log('eu2')

    // handle negative quantities.
    if (quantity < 0) {
      quantity = 0
    }

    // delete item
    if (quantity === 0) {
      await this.del(id)
      return
    }

    // log('eu3')

    // try and update item quantity
    if (await this.executeUpdateItem(id, quantity, locked, ignore) != null) {
      return
    }

    // log('eu4')

    // Fetch up to date information at time of checkout openning
    // TODO: Think about revising so we don't report old prices if they changed after checkout is open

    const li = new LineItem({
      id,
      quantity,
      locked,
      ignore
    }, this.client)

    // log('eu4.5')

    try {
      await li.loadProductPromise
    } catch (err) {
      log('set error', err)
      return await this.executeUpdates()
    }

    // log('eu5', this.analytics)

    runInAction(() => {
      items.push(li)

      let a = {
        id: li.productId,
        sku: li.productSlug,
        name: li.productName,
        quantity: quantity,
        price: li.price / 100
      }

      if (this.analytics)  {
        if (this.analyticsProductTransform != null) {
          a = this.analyticsProductTransform(a)
        }

        this.analytics.track('Added Product', a)
      }
    })

    await this.cartSetItem(li.productId, quantity)

    return await this.executeUpdates()
  }

  /**
   * Execute update for item
   * @param id productId
   * @param quantity amount of productId in cart
   * @param locked is this lineitem modifiable in the UI
   * @param ignore is this lineitem ignored by the UI (loading in progress,
   * freebie etc)
   * @return LineItem if item is updated or undefined if something was invalid
   */
  @action
  async executeUpdateItem(id: string, quantity: number, locked: boolean, ignore: boolean): Promise<LineItem | undefined> {
    // log('eui', id)
    const items = this.order.items ?? []

    for (const k in items) {
      const item = items[k]
      // ignore if not a match to id
      if (
        item.id !== id &&
        item.productId !== id &&
        item.productSlug !== id
      ) {
        continue
      }

      const oldValue = item.quantity

      item.quantity = quantity
      item.locked = locked
      item.ignore = ignore

      const newValue = quantity

      const deltaQuantity = newValue - oldValue
      if (deltaQuantity > 0) {
        let a = {
          id: item.productId,
          sku: item.productSlug,
          name: item.productName,
          quantity: deltaQuantity,
          price: item.price / 100
        }

        if (this.analytics)  {
          if (this.analyticsProductTransform != null) {
            a = this.analyticsProductTransform(a)
          }

          this.analytics.track('Added Product', a)
        }

        this.cartSetItem(item.productId, quantity)
      } else if (deltaQuantity < 0) {
        let a = {
          id: item.productId,
          sku: item.productSlug,
          name: item.productName,
          quantity: deltaQuantity,
          price: item.price / 100
        }

        if (this.analytics)  {
          if (this.analyticsProductTransform != null) {
            a = this.analyticsProductTransform(a)
          }

          this.analytics.track('Removed Product', a)
        }
      }

      // log('order.items', this.order.items)

      this.order.items[k].quantity =  quantity
      this.order.items[k].locked = locked
      this.order.items[k].ignore = ignore

      await this.cartSetItem(item.productId, quantity)

      return this.order.items[k]
    }
  }

  @action
  async del(id: string): Promise<LineItem | undefined> {
    const items = this.order.items
    let itemToDeleteIndex: number = items.length

    for (const k in items) {
      const item = items[k]
      if(
        item.productId === id ||
        item.productSlug === id ||
        item.id === id
      ) {
        itemToDeleteIndex = parseInt(k)
        break
      }
    }

    if (itemToDeleteIndex >= items.length) {
      return
    }

    const item = items[itemToDeleteIndex]

    // Remove the itemToDelete from the items list
    this.order.items.splice(itemToDeleteIndex, 1)

    let a: any = {
      id: item.productId,
      sku: item.productSlug,
      name: item.productName,
      quantity: item.quantity,
      price: item.price / 100,
    }

    if (this.analytics)  {
      if (this.analyticsProductTransform != null) {
        a = this.analyticsProductTransform(a)
      }

      this.analytics.track('Removed Product', a)
    }

    await this.cartSetItem(item.productId, 0)

    runInAction(() => {
      item.quantity = 0
    })

    return item
  }

  @action
  async cartSetItem(id: string, quantity: number): Promise<ICart | undefined> {
    if (this.cartId) {
      console.log('cart item')
      this.cart.id = this.cartId
      return this.client.cart.set({
        id: this.cartId,
        productId: id,
        quantity: quantity,
        storeId: this.storeId,
      })
    }
  }

  @action
  async cartSetStore(storeId: string): Promise<ICart | undefined> {
    if (this.cartId) {
      this.cart.id = this.cartId
      this.cart.storeId = storeId || this.storeId
      return this.client.cart.update(this.cart)
    }
  }

  @action
  async cartSetEmail(email: string): Promise<ICart | undefined> {
    if (this.cartId) {
      this.cart.id = this.cartId
      this.cart.email = this.user.email
      return this.client.cart.update(this.cart)
    }
  }

  @action
  async cartSetName(name: string): Promise<ICart | undefined> {
    if (this.cartId) {
      this.cart.id = this.cartId
      this.cart.name = name
      return this.client.cart.update(this.cart)
    }
  }

  @action
  async clear(): Promise<void>{
    this.updateQueue.length = 0
    const itemsClone = this.order.items.slice(0)

    await Promise.all(itemsClone.map((item) => this.set(item.productId, 0)))

    return
  }

  @action
  async setCoupon(code?: string): Promise<ICoupon | undefined> {
    if (code) {
      try {
        let coupon = await this.client.coupon.get(code)
        if (!coupon.enabled) {
          return
        }

        runInAction(() => {
          this.order.coupon = coupon
          this.order.couponCodes = [code]
        })

        if (coupon.freeProductId) {
          await this.client.product.get(coupon.freeProductId)
        }

        return coupon
      } catch (err) {
        log('promoCode error', err)
        return
      }
    }
  }

  @action
  async checkout(payment: IPayment): Promise<IOrder | undefined> {
    let order: IOrder = Object.assign({}, this.order)
    let user: IUser = Object.assign({}, this.user)

    order.items = this.order.items.filter((item) => item.ignore).map((item) => Object.assign({}, item))

    let opts = {
      order,
      payment,
      user,
    }

    let authorizedOrder = await this.client.checkout.authorize(opts)

    if (authorizedOrder) {
      runInAction(() => {
        this.order.id = (authorizedOrder as IOrder).id
        this.order.userId = (authorizedOrder as IOrder).userId
      })

      let capturedOrder = await this.client.checkout.capture({
        orderId: order.id,
      })

      return capturedOrder
    }

    return
  }
}
