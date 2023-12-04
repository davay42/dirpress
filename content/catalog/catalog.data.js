import { useItems } from "../../data/directus"
import { downloadImages } from '../../data/downloader.js'

export default {
  async load() {
    const categories = await useItems('categories', {
      fields: [
        '*',
        {
          products: ['slug', 'title', 'description', 'cover']
        }
      ]
    })

    await downloadImages({
      records: categories,
      field: 'cover',
      format: 'webp',
      width: 2000,
    })

    const products = await useItems('products', {
      fields: [
        '*',
        {
          category: ['*']
        }
      ]
    })

    await downloadImages({
      records: products,
      field: 'cover',
      format: 'webp',
      width: 2000,
    })

    return {
      products,
      categories
    }
  }
}