import { createDirectus, rest, staticToken, readItem, readItems } from '@directus/sdk'

export const client = createDirectus('http://0.0.0.0:8055').with(rest())

export async function useItems(collection, query) {
  try {
    const items = await client.request(readItems(collection, query))

    return items
  } catch (e) {
    console.log(e)
  }
}