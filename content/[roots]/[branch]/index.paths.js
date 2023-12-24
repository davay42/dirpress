import { useItems } from "../../../data/directus"
import { downloadImages } from '../../../data/downloader.js'

export default {
  async paths() {

    const pages = await useItems('pages', {
      filter: {
        "_and": [
          {
            root: {
              slug: {
                "_nempty": true
              }
            }
          },
          {
            root: {
              root: {
                slug: {
                  "_empty": true
                }
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
    }) || []

    // await downloadImages({
    //   records: pages,
    //   field: 'cover',
    //   format: 'webp',
    //   width: 2000,
    // })

    return pages?.map(page => {
      let content = page.content
      delete page.content
      return {
        params: {
          ...page,
          roots: page.root?.slug,
          branch: page?.slug
        }, content
      }
    })
  }
}