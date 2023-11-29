import Unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'
import { presetIcons, presetUno, presetWebFonts } from 'unocss'

const meta = {
  title: "Unichem Trade Service",
  logo: '/logo.svg',
  description: 'Chemical trading company for Asian and global markets',
  company: 'Unichem Trade Service Co Ltd.',
  copyright: 'All rights reserved © 2023',
  image: '/logo.png',
  umamiScript: 'https://stats.defucc.me/umami.js',
  umamiId: '30f34da6-4a35-41e4-be2a-8b8a209616acs',
  author: 'UCTS',
  url: 'https://unichemtradeservice.com/',
  site: 'unichemtradeservice.com',
  icon: 'logo.svg',
  color: '#3B9879',
  locale: 'ru-RU',
  tags: 'Bulk chemical trade'
}

export default defineConfig({
  logo: meta.logo,
  title: meta.title,
  description: meta.description,
  sitemap: {
    hostname: 'https://unichemtradeservice.com',
  },
  markdown: {
    headers: {
      level: [0, 0],
    },
  },
  themeConfig: {
    search: {
      provider: 'local',
    },
    footer: {
      message: meta.company,
      copyright: meta.copyright,
    },
    nav: [],
    sidebar: {},
  },
  vite: {
    plugins: [
      Unocss({
        presets: [
          presetUno(),
          presetIcons({
            scale: 1.2,
            warn: true,
            unit: 'em',
          }),
          presetWebFonts({
            provider: 'bunny',
            fonts: {
              sans: 'Inter',
            },
          }),
        ],
      })
    ],
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
  ],
  transformPageData(pageData) {
    if (pageData.frontmatter?.dynamic) {
      pageData.title = pageData.params?.title
      pageData.description = pageData.params?.description
      pageData.frontmatter = { ...pageData.frontmatter, ...pageData.params, cover: pageData.params?.cover ? `https://cms.bioamin-rus.ru/assets/${pageData.params?.cover}?fit=cover&format=webp&width=1000` : '' }
    }
  },
  //@ts-ignore
  transformHead({ pageData }) {
    const url = pageData.relativePath.split('index.md')[0]
    let image = meta?.image
    if (pageData.frontmatter?.cover) {
      image = `https://cms.bioamin-rus.ru/assets/${pageData.frontmatter?.cover}?fit=cover&format=webp&width=1000`
    }
    const head = [

      process.env.NODE_ENV === "production" && meta.umamiScript && meta.umamiId ? ["script", { async: true, defer: true, "data-website-id": meta.umamiId, src: meta.umamiScript }] : null,

      meta.icon ? ["link", { rel: "icon", type: "image/svg+xml", href: meta.url + meta.icon }] : null,
      meta?.author ? ["meta", { name: "author", content: meta?.author }] : null,
      meta?.tags ? ["meta", { name: "keywords", content: meta?.tags }] : null,
      meta.color ? ["meta", { name: "theme-color", content: meta.color }] : null,

      ["meta", { property: "og:type", content: "website" }],
      meta.site ? ["meta", { property: "og:site", content: meta.site }] : null,
      meta.title ? ["meta", { property: "og:site_name", content: meta.title }] : null,
      ['meta', { property: 'og:title', content: `${pageData.title} | ${meta.title}` }],
      ['meta', { property: 'og:description', content: pageData.description }],
      meta.url ? ['meta', { property: 'og:url', content: meta.url + url }] : null,
      image && ['meta', { property: 'og:image', content: meta.url + image }],
      meta.locale ? ["meta", { property: "og:locale", content: meta.locale }] : null,

      meta.title ? ['meta', { name: 'twitter:title', content: `${pageData.title} | ${meta.title}` }] : null,
      ['meta', { name: 'twitter:description', content: pageData.description }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      meta?.author ? ['meta', { name: 'twitter:site', content: `@${meta.author}` }] : null,
      meta?.author ? ['meta', { name: 'twitter:creator', content: `@${meta.author}` }] : null,
      image ? ['meta', { name: 'twitter:image', content: meta.url + image }] : null,

      ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "white-translucent", },],
      ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
      ["meta", { name: "HandheldFriendly", content: "True" }],
      ["meta", { name: "MobileOptimized", content: "320" }],
    ]
    return head.filter(Boolean)
  }
})