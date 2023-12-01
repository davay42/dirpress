---
title: Catalog
list: catalog
---

<script setup>
import { data } from './catalog.data'
</script>

<template v-for="(cat) in data.categories" :key="cat">
  <h2><a :href="`/catalog/${cat.slug}/`">{{cat?.title}}</a></h2>
  <p>{{cat?.description}}</p>
  <ul>
    <li v-for="product in cat?.products" :key="product">
      <a class="text-lg" :href="`/catalog/${cat.slug}/${product.slug}/`" >
      {{product.title}}
      </a>
    </li>
  </ul>
</template>
