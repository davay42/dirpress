import Unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'
import { downloadImages } from '../data/downloader.js'
import { useItem } from '../data/directus'

export default defineConfig(async (ctx) => {

  const meta = await useItem('meta', 1)

  await downloadImages({
    records: [meta],
  })

  const logos = await downloadImages({
    records: [meta],
    field: 'logo',
    format: 'svg'
  })

  const logoPath = logos[0].path

  const icons = await downloadImages({
    records: [meta],
    field: 'icon',
    format: 'svg'
  })

  const iconPath = icons[0].path

  return {
    srcDir: "content",
    outDir: "dist",
    logo: meta.logo,
    title: meta.title,
    titleTemplate: meta.title_template,
    description: meta.description,
    sitemap: {
      hostname: meta.public_url,
    },
    markdown: {
      headers: {
        level: [0, 0],
      },
    },
    themeConfig: {

    },
    vite: {
      plugins: [
        Unocss()
      ],
    },
    head: [
      ['link', { rel: 'icon', href: `/${iconPath}` }],
    ],
    async transformPageData(pageData) {
      if (pageData.frontmatter?.dynamic) {
        pageData.title = pageData.params?.title
        pageData.description = pageData.params?.description
        pageData.frontmatter = { ...pageData.frontmatter, ...pageData.params, cover: pageData.params?.cover ? `${meta.database}/assets/${pageData.params?.cover}?fit=cover&format=webp&width=1000` : '' }
      }
    },
    //@ts-ignore
    transformHead({ pageData }) {
      const url = pageData.relativePath.split('index.md')[0]
      let image = meta?.image
      if (pageData.frontmatter?.cover) {
        image = `${meta.database}/assets/${pageData.frontmatter?.cover}?fit=cover&format=webp&width=1000`
      }
      const head = [

        process.env.NODE_ENV === "production" && meta.stat_script && meta.stat_data_id ? ["script", { async: true, defer: true, [meta.stat_data_tag || "data-website-id"]: meta.stat_data_id, src: meta.stat_script }] : null,

        meta.icon ? ["link", { rel: "icon", type: "image/svg+xml", href: `/${iconPath}` }] : null,

        meta?.author ? ["meta", { name: "author", content: meta?.author }] : null,

        meta?.keywords ? ["meta", { name: "keywords", content: meta?.keywords?.join(', ') }] : null,

        meta.color ? ["meta", { name: "theme-color", content: meta.color }] : null,

        ["meta", { property: "og:type", content: "website" }],

        meta.site ? ["meta", { property: "og:site", content: meta.site }] : null,

        meta.title ? ["meta", { property: "og:site_name", content: meta.title }] : null,

        ['meta', { property: 'og:title', content: `${pageData.title} | ${meta.title}` }],
        ['meta', { property: 'og:description', content: pageData.description }],

        meta.public_url ? ['meta', { property: 'og:url', content: meta.public_url + url }] : null,
        image && ['meta', { property: 'og:image', content: meta.public_url + image }],

        meta.locale ? ["meta", { property: "og:locale", content: meta.locale }] : null,

        meta.title ? ['meta', { name: 'twitter:title', content: `${pageData.title} | ${meta.title}` }] : null,

        meta?.author ? ['meta', { name: 'twitter:site', content: `@${meta.author}` }] : null,

        meta?.author ? ['meta', { name: 'twitter:creator', content: `@${meta.author}` }] : null,
        image ? ['meta', { name: 'twitter:image', content: meta.public_url + image }] : null,

        ['meta', { name: 'twitter:description', content: pageData.description }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],

        ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "white-translucent", },],
        ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
        ["meta", { name: "HandheldFriendly", content: "True" }],
        ["meta", { name: "MobileOptimized", content: "320" }],
      ]
      return head.filter(Boolean)
    }
  }
})