<script setup>
import { useData } from 'vitepress'
import { data as meta } from '../data/meta.data.js'
import { data as pages } from '../data/pages.data.js'

import '../styles/markdown.postcss'
import '../styles/main.postcss'

const { frontmatter: f, page, params } = useData()

</script>

<template lang='pug'>
main
  header
    img.logo(:src="`/media/meta-logo.svg`")
    .flex.flex-col
      h1.text-4xl
        a(href="/") {{ meta.title }}
      h2.text-lg {{ meta.description }}
  p {{  }}
  nav
    a.p-4.bg-light-700(
      v-for="main in pages.main" :key="main"
      :href="`/${main.slug}/`"
      :aria-current="page.relativePath.includes(main.slug)"
    ) {{ main.title }} 

  img.cover(
    v-if="f.cover" 
    :src="`/media/${f.slug}-cover.webp`")

  .flex.flex-wrap.items-center.text-2xl.gap-2.px-2
    a.p-2.opacity-40(
      v-if="f.category"
      :href="`/catalog/${f.category.slug}/`") {{ f.category.title }}
    .flex.p-2 {{ f.title }}

  article.flex-auto
    content.markdown-body

  aside.gallery(v-if="f.gallery")
    .text-lg Gallery
    .p-0(v-for="image in f.gallery") {{ image.directus_files_id }}

  .flex.flex-col.gap-4.p-4 
    a.p-4.bg-light-100.shadow-xl.text-2xl.rounded-xl(
      v-for="page in f.pages" :key="page"
      :href="'/' + [page?.root?.root?.slug, page?.root?.slug, page.slug].join('/') + '/'"
      ) {{ page.title }}

  footer ©️ {{ meta.company }} 

</template>

