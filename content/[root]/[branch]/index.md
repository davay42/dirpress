---
dynamic: branch
---

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'
const { params:p, frontmatter:f } = useData()

</script>

# {{ p.title }}

> {{ p.description }}

<!-- @content -->

<!-- <pre class="text-xs">{{ f }}</pre> -->
