import { useItems } from "../../data/directus"

export default {
  async load() {
    const categories = await useItems('categories', {
      fields: [
        '*',
        {
          products: ['slug', 'title', 'description', 'cover']
        }
      ]
    }
    )
    const products = await useItems('products', {
      fields: [
        '*',
        {
          category: ['*']
        }
      ]
    })

    return {
      products,
      categories
    }
  }
}