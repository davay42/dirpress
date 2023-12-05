import { useItems } from "../../../data/directus"

export default {
  async paths() {

    const categories = await useItems('pages', {
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

    return categories.map(category => {
      let content = category.content
      delete category.content
      return {
        params: {
          ...category,
          root: category.root?.slug,
          branch: category?.slug
        }, content
      }
    })
  }
}