import { createDirectus, rest, staticToken, readItem, readItems } from '@directus/sdk'
import { loadEnv } from 'vitepress'

const env = loadEnv('', process.cwd())

export const client = createDirectus('https://cms.bioamin-rus.ru/').with(rest()).with(staticToken(env.VITE_CMS_KEY))

export async function useItems(collection, query) {
  try {
    const items = await client.request(readItems(collection, query))

    return items
  } catch (e) {
    console.log(e)
  }
}