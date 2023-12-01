import { useItem } from "../../data/directus.js"

export default {
  async load() {
    const contacts = await useItem('contact', 1)
    return contacts
  }
}