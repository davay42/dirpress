<script setup>
import { useData } from 'vitepress';

import { data } from '../data/meta.data.js'

const { site, theme } = useData()
</script>

<template lang='pug'>
main
  h1.text-2xl {{ site.title }}
  h2.text-lg {{ site.description }}
  content
  pre {{ data }}
  pre {{ theme.footer }}
</template>