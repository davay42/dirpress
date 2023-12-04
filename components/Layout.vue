<script setup>
import { useData } from 'vitepress'
import { data as meta } from '../data/meta.data.js'

import '../styles/markdown.postcss'
import '../styles/main.postcss'

const { frontmatter: f, page } = useData()
</script>

<template lang='pug'>
main
  header
    img.logo(:src="`/media/meta-logo.svg`")
    .flex.flex-col
      h1.text-4xl
        a(href="/") {{ meta.title }}
      h2.text-lg {{ meta.description }}

  nav
    a.p-4.bg-light-700(
      v-for="link in meta.nav" :key="link"
      :href="link.url"
      :aria-current="page.relativePath.includes(link.url.replace('/',''))"
    ) {{ link.title }} 

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

  pre {{ f }}
  footer ©️ {{ meta.company }} 

</template>

