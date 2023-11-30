<script setup>
import { useData } from 'vitepress';

const { site, theme } = useData()
</script>

<template lang='pug'>
main
  h1.text-2xl {{ site.title }}
  h2.text-lg {{ site.description }}
  content
  pre {{ theme.footer }}
</template>