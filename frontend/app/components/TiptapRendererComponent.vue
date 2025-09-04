<script setup lang="ts">
import DOMPurify from "dompurify";
import { renderToHTMLString } from '@tiptap/static-renderer';
import StarterKit from "@tiptap/starter-kit";
const props = defineProps<{
  content: object
}>()
const content = computed(() => DOMPurify.sanitize(renderToHTMLString({ content: props.content, extensions: [StarterKit]})))
</script>

<template>
  <div class="tiptap" v-html="content"></div>
</template>

