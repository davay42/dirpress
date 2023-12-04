<script setup>
import { useData } from 'vitepress'
import { data as meta } from '../data/meta.data.js'

const { frontmatter: f, page } = useData()
</script>

<template lang='pug'>
main
  header.p-0.flex.items-center.gap-8
    img.w-20(:src="`/media/meta-logo.svg`")
    .flex.flex-col
      h1.text-4xl
        a(href="/") {{ meta.title }}
      h2.text-lg {{ meta.description }}
  nav.flex.flex-wrap.items-center.w-full
    a.p-4.bg-light-700(
      v-for="link in meta.nav" :key="link"
      :href="link.url"
      :aria-current="page.relativePath.includes(link.url.replace('/',''))"
    ) {{ link.title }} 
  a.p-4.text-2xl.opacity-40(
    v-if="f.category"
    :href="`/catalog/${f.category.slug}/`") {{ f.category.title }}
  .flex.p-4.text-4xl {{ f.title }}
  img(v-if="f.cover" :src="`/media/${f.slug}-cover.webp`")
  article
    content.markdown-body
  footer ©️ {{ meta.company }} 
</template>

<style lang="postcss">
html {
  @apply bg-light-500;
}

html * {
  @apply transition duration-500;
}

a[aria-current=true] {
  @apply bg-light-900;
}

.markdown-body {
  line-height: 1.6;
  @apply leading-loose;

  :is(p) {
    @apply p-4;
  }

  :is(td) {
    @apply p-2;
  }

  :is(table) {
    @apply ml-4 mr-6;
  }

  :is(tr):nth-child(2n) {
    @apply bg-dark-500 bg-opacity-10;
  }

  :is(li) {
    @apply p-1 list-circle;
  }

  :is(h1) {
    font-size: 3em;
    padding-bottom: 0.3em;
  }

  :is(h2) {
    font-size: 1.9em;
    @apply p-4 leading-tight;
  }
}


.markdown-body .markdown-body h3 {
  font-size: 1.2em;
  @apply py-2;
}

.markdown-body ul,
.markdown-body ol {
  padding-left: 2em;
}

.markdown-body blockquote {
  margin: 0;
  padding-left: 3em;
  border-left: 0.5em #eee solid;
}

.markdown-body code {
  padding: 0.2em 0.5em;
  margin: 0;
  font-family: monospace;
  font-size: 90%;
  border-radius: 3px;
}
</style>