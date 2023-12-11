import { createDirectus, rest, staticToken, readItem, readItems } from '@directus/sdk'

import { loadEnv } from 'vitepress'

const env = loadEnv('', process.cwd())

export const server = env.VITE_DIRECTUS_URL

export const client = createDirectus(server).with(rest())

export async function useItems(collection, query) {
  try {
    const items = await client.request(readItems(collection, query))
    return items
  } catch (e) {
    console.log(e)
  }
}

export async function useItem(collection, id, query) {
  try {
    const item = await client.request(readItem(collection, id, query))
    return item
  } catch (e) {
    console.log(e)
  }
}