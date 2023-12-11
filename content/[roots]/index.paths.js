import { useItems } from "../../data/directus"
import { downloadImages } from '../../data/downloader.js'

export default {
  async paths() {

    const pages = await useItems('pages', {
      filter: {
        root: {
          slug: {
            "_empty": true
          }
        }
      },
      fields: [
        '*',
        {
          files: [{ directus_files_id: ['*'] }],
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

    return pages?.map(page => {
      let content = page.content
      delete page.content
      return {
        params: {
          ...page,
          roots: page?.slug
        }, content
      }
    })
  }
}