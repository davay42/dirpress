import { useItem } from "./directus"
import { downloadImages } from "./downloader.js"

export default {
  async load() {
    const meta = await useItem('meta', 1)
    return meta
  }


}