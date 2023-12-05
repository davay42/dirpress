import { useItems } from "../../data/directus"

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