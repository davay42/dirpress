---
dynamic: root
---

<img class="mb-8" :src="f?.cover" alt="Cover image" />

# {{ f.title }}

<!-- @content -->

<script setup>
import { useData } from 'vitepress'
const { frontmatter: f } = useData()
</script>

<ul v-for="(product) in f.products" :key="product">
  <a :href="`/catalog/${product?.category?.slug}/${product.slug}/`">
  <h2>{{product?.title}}</h2>
  <span class="text-dark-100 dark-text-light-900">{{product?.description}}</span>
  </a>
</ul>
