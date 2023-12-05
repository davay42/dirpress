import { useItems } from "./directus"
import { downloadFiles, downloadImages } from './downloader.js'

export default {
  async load() {
    const main = await useItems('pages', {
      filter: {
        root: {
          _empty: true
        }
      },
      fields: [
        'title', 'slug', 'description',
        {
          files: [{
            directus_files_id: ['*']
          }],
          root: ['slug', 'title'],
          pages: [
            'slug', 'title', 'root.slug'
          ]
        }
      ]
    })

    await downloadImages({
      records: main,
      field: 'cover',
      format: 'webp',
      width: 2000,
    })

    await downloadFiles({
      records: main
    })

    return {
      main
    }
  }
}