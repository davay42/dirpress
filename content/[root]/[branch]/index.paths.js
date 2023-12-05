import { useItems } from "../../../data/directus"
import { downloadImages } from '../../../data/downloader.js'

export default {
  async paths() {

    const pages = await useItems('pages', {
      filter: {
        _and: [
          {
            root: {
              _nempty: true
            }
          },
          {
            root: {
              root: {
                _empty: true
              }
            }
          }
        ]
      },
      fields: [
        '*',
        {
          root: ['*', {
            root: ['slug']
          }],
          pages: [
            '*',
            {
              root: ['*', {
                root: ['slug']
              }]
            }
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
          root: page.root?.slug,
          branch: page?.slug
        }, content
      }
    })
  }
}