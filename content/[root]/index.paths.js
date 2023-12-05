import { useItems } from "../../data/directus"
import { downloadImages } from '../../data/downloader.js'

export default {
  async paths() {

    const pages = await useItems('pages', {
      filter: {
        root: {
          _empty: true
        }
      },
      fields: [
        '*',
        {
          pages: [
            '*',
            { root: ['slug', 'title'] }
          ]
        }
      ]
    })

    await downloadImages({
      records: pages,
      field: 'cover',
      format: 'webp',
      width: 2000,
    })

    return pages.map(page => {
      let content = page.content
      delete page.content
      return {
        params: {
          ...page,
          root: page?.slug
        }, content
      }
    })
  }
}