import { useItems } from "../../../../data/directus"

export default {
  async paths() {

    const products = await useItems('products', {
      fields: [
        '*',
        {
          category: [
            'slug', 'title'
          ]
        }
      ]
    })

    return products.map(product => {
      let content = product.content
      delete product.content
      return {
        params: {
          ...product,
          cat: product?.category?.slug
        }, content
      }
    })
  }
}