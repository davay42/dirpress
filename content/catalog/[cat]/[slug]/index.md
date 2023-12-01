---
dynamic: true
---

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'
const { params, frontmatter:p } = useData()

</script>

<a :href="`/catalog/${p.category.slug}/`">{{ p.category.title }}</a>

# {{ p.title }}

> {{ p.description }}

<table>
<tr v-if="p?.cas">
<td>CAS</td><td>{{p.cas}}</td>
</tr>
<tr v-if="p?.tnved">
<td>ТНВЭД</td><td>{{p.tnved}}</td>
</tr>
</table>

<!-- @content -->

<!-- <pre class="text-xs">{{ f }}</pre> -->
