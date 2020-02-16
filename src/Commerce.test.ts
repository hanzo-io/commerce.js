import Commerce from './Commerce'
import {
  ICartClient,
  IGeoRate,
} from './types'
import Api from 'hanzo.js'
import {
  log,
  setLogLevel,
} from './utils'

// setLogLevel('test')

const KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NzIzMDc4NDcsInN1YiI6IjhBVEdFZ1owdWwiLCJqdGkiOiJGVmU0NWRyVzZPYyIsIm5hbWUiOiJ0ZXN0LXB1Ymxpc2hlZC1rZXkiLCJiaXQiOjQ1MDM2MTcwNzU2NzUxNzZ9.k82KjvI4AkRIEF5pjl_hj7nSvkNEkBctHfnbZWoEgVI'
const ENDPOINT = 'https://api-dot-hanzo-staging-249116.appspot.com/'

describe('Commerce', () => {
  let analyticsArgs: any[] = []

  let analytics = {
    track: (...args) => {
      analyticsArgs = args
    },
  }

  let client = new Api({
    key: KEY,
    endpoint: ENDPOINT,
  })

  test('default constructor', () => {
    let order = {
      currency: 'usd',
      items: [],
    }

    let c = new Commerce(client, order)

    expect(c.client).toBe(client)
    expect(c.order.currency).toBe(order.currency)
    expect(c.order.type).toBe('stripe')
    expect(c.order.storeId).toBe('')
    expect(c.order.items).toEqual([])
  })

  test('default cartInit', async () => {
    let order = {
      currency: 'usd',
    }

    let c = new Commerce(client, order)
    let cart = await c.cartInit()

    expect(cart.id).toEqual(expect.any(String))
    expect(c.cart.id).toBe(cart.id)
  })

  test('should set an item by id', async () => {
    let order = {
      currency: 'usd',
    }

    let c = new Commerce(client, order, [], [], analytics)

    await c.set('rbcXB3Qxcv6kNy', 1)

    let items = c.items

    expect(items.length).toBe(1)

    let item = items[0]

    expect(item.productId).toBe('rbcXB3Qxcv6kNy')
    expect(item.productSlug).toBe('sad-keanu-shirt')
    expect(item.quantity).toBe(1)

    expect(analyticsArgs[0]).toBe('Added Product')
    expect(analyticsArgs[1].id).toBe('rbcXB3Qxcv6kNy')
    expect(analyticsArgs[1].sku).toBe('sad-keanu-shirt')
    expect(analyticsArgs[1].quantity).toBe(1)

    expect(c.order.total).toBe(item.price * item.quantity)
  })

  test('should set an item by slug', async () => {
    let order = {
      currency: 'usd',
    }

    let c = new Commerce(client, order, [], [], analytics)

    await c.set('sad-keanu-shirt', 1)

    let items = c.items

    expect(items.length).toBe(1)

    let item = items[0]

    expect(item.productId).toBe('rbcXB3Qxcv6kNy')
    expect(item.productSlug).toBe('sad-keanu-shirt')
    expect(item.quantity).toBe(1)

    expect(analyticsArgs[0]).toBe('Added Product')
    expect(analyticsArgs[1].id).toBe('rbcXB3Qxcv6kNy')
    expect(analyticsArgs[1].sku).toBe('sad-keanu-shirt')
    expect(analyticsArgs[1].quantity).toBe(1)

    expect(c.order.total).toBe(item.price * item.quantity)
  })

  test('should set and get an item by item or slug', async () => {
    let order = {
      currency: 'usd',
    }

    let c = new Commerce(client, order, [], [], analytics)

    await c.set('sad-keanu-shirt', 1)

    let item = await c.get('rbcXB3Qxcv6kNy')

    expect(item).toBeDefined()

    if (item) {
      expect(item.productId).toBe('rbcXB3Qxcv6kNy')
      expect(item.productSlug).toBe('sad-keanu-shirt')
      expect(item.quantity).toBe(1)
    }

    item = await c.get('sad-keanu-shirt')

    expect(item).toBeDefined()

    if (item) {
      expect(item.productId).toBe('rbcXB3Qxcv6kNy')
      expect(item.productSlug).toBe('sad-keanu-shirt')
      expect(item.quantity).toBe(1)

      expect(c.order.total).toBe(item.price * item.quantity)
    }
  })

  test('should not get an item by invalid id or slug, item should not be added until synchronized', async() => {
    let order = {
      currency: 'usd',
    }

    let c = new Commerce(client, order)

    let setP = c.set('84cRXBYs9jX7wzzz', 1)
    expect(c.size).toBe(0)

    await setP

    let item = await c.get('84cRXBYs9jX7wzzz')

    expect(c.size).toBe(0)
    expect(item).toBeUndefined()
  })

  test('should overwrite an existing item', async() => {
    let order = {
      currency: 'usd',
    }

    let c = new Commerce(client, order, [], [], analytics)

    await c.set('sad-keanu-shirt', 1)

    let item = await c.get('sad-keanu-shirt')

    expect(item).toBeDefined()

    if (item) {
      expect(item.productId).toBe('rbcXB3Qxcv6kNy')
      expect(item.productSlug).toBe('sad-keanu-shirt')
      expect(item.quantity).toBe(1)
    }

    await c.set('sad-keanu-shirt', 2)

    item = await c.get('sad-keanu-shirt')

    expect(item).toBeDefined()

    if (item) {
      expect(item.productId).toBe('rbcXB3Qxcv6kNy')
      expect(item.productSlug).toBe('sad-keanu-shirt')
      expect(item.quantity).toBe(2)

      expect(c.order.total).toBe(item.price * item.quantity)
    }
  })

  test('should remove an item by setting quantity to 0', async () => {
    let order = {
      currency: 'usd',
    }

    let c = new Commerce(client, order, [], [], analytics)

    await c.set('sad-keanu-shirt', 1)
    await c.set('sad-keanu-shirt', 0)

    let items = c.items

    expect(items.length).toBe(0)

    expect(analyticsArgs[0]).toBe('Removed Product')
    expect(analyticsArgs[1].id).toBe('rbcXB3Qxcv6kNy')
    expect(analyticsArgs[1].sku).toBe('sad-keanu-shirt')
    expect(analyticsArgs[1].quantity).toBe(1)

    expect(c.order.total).toBe(0)
  })

  test('should remove an item by setting quantity to -1', async () => {
    let order = {
      currency: 'usd',
    }

    let c = new Commerce(client, order, [], [], analytics)

    await c.set('sad-keanu-shirt', 1)
    await c.set('sad-keanu-shirt', -1)

    let items = c.items

    expect(items.length).toBe(0)

    expect(analyticsArgs[0]).toBe('Removed Product')
    expect(analyticsArgs[1].id).toBe('rbcXB3Qxcv6kNy')
    expect(analyticsArgs[1].sku).toBe('sad-keanu-shirt')
    // set to 1, then set to max(0, -1) = 0, the quantity below is therefore |0-1| = 1
    expect(analyticsArgs[1].quantity).toBe(1)

    expect(c.order.total).toBe(0)
  })

  test('should not set when in an itemless mode', async () => {
    let order = {
      currency: 'usd',
      mode: 'deposit',
    }

    let c = new Commerce(client, order, [], [], analytics)

    await c.set('sad-keanu-shirt', 1)

    expect(c.size).toBe(0)
    expect(c.order.total).toBe(0)
  })


  test('should not be able to set subtotal directly when not in an itemless mode', async () => {
    let order = {
      currency: 'usd',
    }

    let c = new Commerce(client, order, [], [], analytics)

    c.order.subtotal = 100

    expect(c.order.subtotal)
    expect(c.order.total).toBe(0)
  })

  test('should be able to set subtotal directly when in an itemless mode', async () => {
    let order = {
      currency: 'usd',
      mode: 'deposit',
    }

    let c = new Commerce(client, order, [], [], analytics)

    c.order.subtotal = 100

    expect(c.order.subtotal)
    expect(c.order.total).toBe(100)
  })

  test('clear', async () => {
    let order = {
      currency: 'usd',
    }

    let c = new Commerce(client, order, [], [], analytics)

    await c.set('sad-keanu-shirt', 1)

    expect(c.size).toBe(1)

    expect(analyticsArgs[0]).toBe('Added Product')
    expect(analyticsArgs[1].id).toBe('rbcXB3Qxcv6kNy')
    expect(analyticsArgs[1].sku).toBe('sad-keanu-shirt')
    expect(analyticsArgs[1].quantity).toBe(1)

    await c.clear()

    expect(c.size).toBe(0)

    expect(analyticsArgs[0]).toBe('Removed Product')
    expect(analyticsArgs[1].id).toBe('rbcXB3Qxcv6kNy')
    expect(analyticsArgs[1].sku).toBe('sad-keanu-shirt')
    expect(analyticsArgs[1].quantity).toBe(1)

    expect(c.order.total).toBe(0)
  })

  test('should clear when switching to an itemless mode', async () => {
    let order = {
      currency: 'usd',
    }

    let c = new Commerce(client, order, [], [], analytics)

    await c.set('sad-keanu-shirt', 1)

    expect(c.size).toBe(1)

    expect(analyticsArgs[0]).toBe('Added Product')
    expect(analyticsArgs[1].id).toBe('rbcXB3Qxcv6kNy')
    expect(analyticsArgs[1].sku).toBe('sad-keanu-shirt')
    expect(analyticsArgs[1].quantity).toBe(1)

    c.order.mode = 'deposit'

    await c.updateQueuePromise

    expect(c.size).toBe(0)

    expect(analyticsArgs[0]).toBe('Removed Product')
    expect(analyticsArgs[1].id).toBe('rbcXB3Qxcv6kNy')
    expect(analyticsArgs[1].sku).toBe('sad-keanu-shirt')
    expect(analyticsArgs[1].quantity).toBe(1)

    expect(c.order.total).toBe(0)
  })

  test('should set subtotal directly in itemless mode', async () => {
    let order = {
      currency: 'usd',
    }

    let c = new Commerce(client, order, [], [], analytics)

    c.order.subtotal = 1111
    // odd negative zero issue
    expect(c.order.subtotal === 0).toBe(true)
    expect(c.order.total).toBe(0)

    c.order.mode = 'deposit'

    c.order.subtotal = 2222

    expect(c.order.subtotal).toBe(2222)
    expect(c.order.total).toBe(2222)
  })

  test('should set unfiltered shippingRate', async () => {
    let order = {
      currency: 'usd',
      shippingAddress: {
        country: 'us',
        state: 'ca',
        city: 'los angeles'
      },
    }

    let shippingRates: IGeoRate[] = [{
      percent: 0,
      cost: 1000,
    }]

    let c = new Commerce(client, order, [], shippingRates, analytics)

    await c.set('sad-keanu-shirt', 1)

    let item = await c.get('sad-keanu-shirt')

    expect(item).toBeDefined()

    if (item) {
      expect(c.size).toBe(1)
      expect(c.order.shipping).toBe(c.order.shippingRates[0].cost)
      expect(c.order.total).toBe(item.price * item.quantity + c.order.shippingRates[0].cost)
    }
  })

  test('should use shippingRates filter with shippingAddress with correct city', async () => {
    let order = {
      currency: 'usd',
      shippingAddress: {
        country: 'us',
        state: 'ca',
        city: 'los angeles'
      },
    }

    let shippingRates: IGeoRate[] = [{
      country: 'us',
      state: 'ca',
      city: 'los angeles',
      percent: 0,
      cost: 1000,
    }, {
      percent: 0,
      cost: 2000,
    }]

    let c = new Commerce(client, order, [], shippingRates, analytics)

    await c.set('sad-keanu-shirt', 1)

    let item = await c.get('sad-keanu-shirt')

    expect(item).toBeDefined()

    if (item) {
      expect(c.size).toBe(1)
      expect(c.order.shipping).toBe(c.order.shippingRates[0].cost)
      expect(c.order.total).toBe(item.price * item.quantity + c.order.shippingRates[0].cost)
    }
  })

  test('should use shippingRates filter with shippingAddress with correct postal code', async () => {
    let order = {
      currency: 'usd',
      shippingAddress: {
        country: 'us',
        state: 'ca',
        postalCode: '123',
        city: 'los angeles'
      },
    }

    let shippingRates: IGeoRate[] = [{
      country: 'us',
      state: 'ca',
      postalCodes: '123,234',
      percent: 0,
      cost: 1000,
    }, {
      percent: 0,
      cost: 2000,
    }]

    let c = new Commerce(client, order, [], shippingRates, analytics)

    await c.set('sad-keanu-shirt', 1)

    let item = await c.get('sad-keanu-shirt')

    expect(item).toBeDefined()

    if (item) {
      expect(c.size).toBe(1)
      expect(c.order.shipping).toBe(c.order.shippingRates[0].cost)
      expect(c.order.total).toBe(item.price * item.quantity + c.order.shippingRates[0].cost)
    }
  })

  test('should use shippingRates filter with shippingAddress with country filter', async () => {
    let order = {
      currency: 'usd',
      shippingAddress: {
        country: 'uk',
        state: 'ca',
        postalCode: '123',
        city: 'los angeles'
      },
    }

    let shippingRates: IGeoRate[] = [{
      country: 'us',
      state: 'ca',
      postalCodes: '123,234',
      percent: 0,
      cost: 1000,
    }, {
      percent: 0,
      cost: 2000,
    }]

    let c = new Commerce(client, order, [], shippingRates, analytics)

    await c.set('sad-keanu-shirt', 1)

    let item = await c.get('sad-keanu-shirt')

    expect(item).toBeDefined()

    if (item) {
      expect(c.size).toBe(1)
      expect(c.order.shipping).toBe(c.order.shippingRates[1].cost)
      expect(c.order.total).toBe(item.price * item.quantity + c.order.shippingRates[1].cost)
    }
  })

  test('should set unfiltered taxRate', async () => {
    let order = {
      currency: 'usd',
      shippingAddress: {
        country: 'us',
        state: 'ca',
        city: 'los angeles'
      },
    }

    let taxRates: IGeoRate[] = [{
      percent: 0,
      cost: 1000,
    }]

    let c = new Commerce(client, order, taxRates, [], analytics)

    await c.set('sad-keanu-shirt', 1)

    let item = await c.get('sad-keanu-shirt')

    expect(item).toBeDefined()

    if (item) {
      expect(c.size).toBe(1)
      expect(c.order.tax).toBe(c.order.taxRates[0].cost)
      expect(c.order.total).toBe(item.price * item.quantity + c.order.taxRates[0].cost)
    }
  })

  test('should use taxRates filter with shippingAddress with correct city', async () => {
    let order = {
      currency: 'usd',
      shippingAddress: {
        country: 'us',
        state: 'ca',
        city: 'los angeles'
      },
    }

    let taxRates: IGeoRate[] = [{
      country: 'us',
      state: 'ca',
      city: 'los angeles',
      percent: 0,
      cost: 1000,
    }, {
      percent: 0,
      cost: 2000,
    }]

    let c = new Commerce(client, order, taxRates, [], analytics)

    await c.set('sad-keanu-shirt', 1)

    let item = await c.get('sad-keanu-shirt')

    expect(item).toBeDefined()

    if (item) {
      expect(c.size).toBe(1)
      expect(c.order.tax).toBe(c.order.taxRates[0].cost)
      expect(c.order.total).toBe(item.price * item.quantity + c.order.taxRates[0].cost)
    }
  })

  test('should use taxRates filter with shippingAddress with correct postal code', async () => {
    let order = {
      currency: 'usd',
      shippingAddress: {
        country: 'us',
        state: 'ca',
        postalCode: '123',
        city: 'los angeles'
      },
    }

    let taxRates: IGeoRate[] = [{
      country: 'us',
      state: 'ca',
      postalCodes: '123,234',
      percent: 0,
      cost: 1000,
    }, {
      percent: 0,
      cost: 2000,
    }]

    let c = new Commerce(client, order, taxRates, [], analytics)

    await c.set('sad-keanu-shirt', 1)

    let item = await c.get('sad-keanu-shirt')

    expect(item).toBeDefined()

    if (item) {
      expect(c.size).toBe(1)
      expect(c.order.tax).toBe(c.order.taxRates[0].cost)
      expect(c.order.total).toBe(item.price * item.quantity + c.order.taxRates[0].cost)
    }
  })

  test('should use taxRates filter with shippingAddress with country filter', async () => {
    let order = {
      currency: 'usd',
      shippingAddress: {
        country: 'uk',
        state: 'ca',
        postalCode: '123',
        city: 'los angeles'
      },
    }

    let taxRates: IGeoRate[] = [{
      country: 'us',
      state: 'ca',
      postalCodes: '123,234',
      percent: 0,
      cost: 1000,
    }, {
      percent: 0,
      cost: 2000,
    }]

    let c = new Commerce(client, order, taxRates, [], analytics)

    await c.set('sad-keanu-shirt', 1)

    let item = await c.get('sad-keanu-shirt')

    expect(item).toBeDefined()

    if (item) {
      expect(c.size).toBe(1)
      expect(c.order.tax).toBe(c.order.taxRates[1].cost)
      expect(c.order.total).toBe(item.price * item.quantity + c.order.taxRates[1].cost)
    }
  })

  test('setCoupon', async () => {
    let order = {
      currency: 'usd',
    }

    let c = new Commerce(client, order, [], [], analytics)

    await c.set('sad-keanu-shirt', 1)

    let coupon = await c.setCoupon('SUCH-COUPON')

    expect(coupon).toBeDefined()

    if (coupon) {
      expect(coupon.code).toBe('SUCH-COUPON')
      expect(coupon.amount).toBe(500)

      let item = await c.get('sad-keanu-shirt')

      expect(item).toBeDefined()

      if (item) {
        expect(c.size).toBe(1)
        expect(c.order.total).toBe(item.price * item.quantity - coupon.amount)
      }
    }
  })

  test('setCoupon fails on invalid coupon', async () => {
    let order = {
      currency: 'usd',
    }

    let c = new Commerce(client, order, [], [], analytics)

    await c.set('sad-keanu-shirt', 1)

    let coupon = await c.setCoupon('BAD-COUPON')

    expect(coupon).not.toBeDefined()
  })
})
