import { useItems } from "../../../../data/directus"
import { downloadImages } from '../../../../data/downloader.js'

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
                _nempty: true
              }
            }
          }
        ]
      },
      fields: [
        '*',
        {
          root: ['*', {
            root: ['*']
          }],
          pages: [
            '*',
            {
              root: ['*', {
                root: ['*']
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
          roots: page.root?.root?.slug,
          branch: page.root?.slug,
          leaf: page?.slug
        }, content
      }
    })
  }
}