import { useItems } from "./directus"

export default {
  async load() {
    const contacts = await useItems('meta')
    return contacts
  }
}