<script setup>
import {onBeforeUnmount, onMounted, ref, watch} from 'vue'
import {Editor, EditorContent} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import {useUtility} from "~/composable/useUtility"

const props = defineProps({
  modelValue: {
    type: [String, Object],
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  minHeight: {
    type: String,
    default: '200px',
  },
})

const emit = defineEmits(['update:modelValue'])
const { isString } = useUtility()

const editor = ref(null)
const menuKey = ref(0)

const isJsonString = (value) => {
  if (!isString(value)) return false
  try {
    const parsed = JSON.parse(value)
    return typeof parsed === 'object' && parsed !== null && parsed.type === 'doc'
    
  } catch (_) {
    return false
  }
}

const normalizeIncomingContent = (value) => {
  if (value == null || value === '') {
    return ''
  }
  if (typeof value === 'object') {
    return value
  }
  if (isJsonString(value)) {
    return JSON.parse(value)
  }
  return value
}

watch(() => props.modelValue, (value) => {
  if (!editor.value) return
  const currentJsonStr = JSON.stringify(editor.value.getJSON())

  if (isString(value)) {
    if (isJsonString(value)) {
      if (currentJsonStr === value) return
      editor.value.commands.setContent(JSON.parse(value), false)
      return
    }
    const isEmpty = currentJsonStr === JSON.stringify({ type: 'doc', content: [{ type: 'paragraph' }] })
    if (isEmpty || value.length > 0) {
      editor.value.commands.setContent(value, false)
    }
    return
  }

  const incomingStr = JSON.stringify(value)
  if (currentJsonStr !== incomingStr) {
    editor.value.commands.setContent(value, false)
  }
})

onMounted(() => {
  editor.value = new Editor({
    content: normalizeIncomingContent(props.modelValue),
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: props.placeholder,
      }),
    ],
    editorProps: {
      attributes: {
        class: 'tiptap',
      },
    },
    onUpdate: () => {
      emit('update:modelValue', editor.value.getJSON())
    },
  })

  
  const bump = () => {
    menuKey.value++
  }
  editor.value.on('selectionUpdate', bump)
  editor.value.on('transaction', bump)
  editor.value.on('update', bump)
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>
<template>
  <div class="tiptap-editor">
    <div v-if="editor" :key="menuKey" class="menu-bar">
      <UButton
          size="sm"
          :variant="editor.isActive('bold') ? 'solid' : 'outline'"
          color="primary"
          :class="{ active: editor.isActive('bold') }"
          :disabled="!editor"
          icon="i-lucide-bold"
          title="Полужирный"
          @mousedown.prevent="editor.chain().focus().toggleBold().run()"/>
      <UButton
          size="sm"
          :variant="editor.isActive('italic') ? 'solid' : 'outline'"
          color="primary"
          :class="{ active: editor.isActive('italic') }"
          :disabled="!editor"
          icon="i-lucide-italic"
          title="Курсив"
          @mousedown.prevent="editor.chain().focus().toggleItalic().run()"/>
      <UButton
          size="sm"
          :variant="editor.isActive('strike') ? 'solid' : 'outline'"
          color="primary"
          :class="{ active: editor.isActive('strike') }"
          :disabled="!editor"
          icon="i-lucide-strikethrough"
          title="Зачёркивание"
          @mousedown.prevent="editor.chain().focus().toggleStrike().run()"/>

      <span class="divider"/>

      <UButton
          size="sm"
          :variant="editor.isActive('heading', { level: 1 }) ? 'solid' : 'outline'"
          color="primary"
          :class="{ active: editor.isActive('heading', { level: 1 }) }"
          :disabled="!editor"
          icon="i-lucide-heading-1"
          title="Заголовок H1"
          @mousedown.prevent="editor.chain().focus().toggleHeading({ level: 1 }).run()"/>
      <UButton
          size="sm"
          :variant="editor.isActive('heading', { level: 2 }) ? 'solid' : 'outline'"
          color="primary"
          :class="{ active: editor.isActive('heading', { level: 2 }) }"
          :disabled="!editor"
          icon="i-lucide-heading-2"
          title="Заголовок H2"
          @mousedown.prevent="editor.chain().focus().toggleHeading({ level: 2 }).run()"/>
      <UButton
          size="sm"
          :variant="editor.isActive('heading', { level: 3 }) ? 'solid' : 'outline'"
          color="primary"
          :class="{ active: editor.isActive('heading', { level: 3 }) }"
          :disabled="!editor"
          icon="i-lucide-heading-3"
          title="Заголовок H3"
          @mousedown.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()"/>

      <span class="divider"/>

      <UButton
          size="sm"
          :variant="editor.isActive('bulletList') ? 'solid' : 'outline'"
          color="primary"
          :class="{ active: editor.isActive('bulletList') }"
          :disabled="!editor"
          icon="i-lucide-list"
          title="Маркированный список"
          @mousedown.prevent="editor.chain().focus().toggleBulletList().run()"/>
      <UButton
          size="sm"
          :variant="editor.isActive('orderedList') ? 'solid' : 'outline'"
          color="primary"
          :class="{ active: editor.isActive('orderedList') }"
          :disabled="!editor"
          icon="i-lucide-list-ordered"
          title="Нумерованный список"
          @mousedown.prevent="editor.chain().focus().toggleOrderedList().run()"/>
      <UButton
          size="sm"
          :variant="editor.isActive('blockquote') ? 'solid' : 'outline'"
          color="primary"
          :class="{ active: editor.isActive('blockquote') }"
          :disabled="!editor"
          icon="i-lucide-quote"
          title="Цитата"
          @mousedown.prevent="editor.chain().focus().toggleBlockquote().run()"/>

      <span class="divider"/>

      <UButton
          size="sm"
          :variant="editor.isActive('code') ? 'solid' : 'outline'"
          color="primary"
          :class="{ active: editor.isActive('code') }"
          :disabled="!editor"
          icon="i-lucide-code"
          title="Код"
          @mousedown.prevent="editor.chain().focus().toggleCode().run()"/>
      <UButton
          size="sm"
          :variant="editor.isActive('codeBlock') ? 'solid' : 'outline'"
          color="primary"
          :class="{ active: editor.isActive('codeBlock') }"
          :disabled="!editor"
          icon="i-lucide-code-xml"
          title="Блок кода"
          @mousedown.prevent="editor.chain().focus().toggleCodeBlock().run()"/>
      <UButton
          size="sm"
          variant="outline"
          color="primary"
          :disabled="!editor"
          icon="i-lucide-minus"
          title="Разделитель"
          @click="editor.chain().focus().setHorizontalRule().run()"/>

      <span class="divider"/>

      <UButton
          size="sm"
          variant="outline"
          color="primary"
          :disabled="!editor || !editor.can().chain().focus().undo().run()"
          icon="i-lucide-undo-2"
          title="Отменить"
          @click="editor.chain().focus().undo().run()"/>
      <UButton
          size="sm"
          variant="outline"
          color="primary"
          :disabled="!editor || !editor.can().chain().focus().redo().run()"
          icon="i-lucide-redo-2"
          title="Повторить"
          @click="editor.chain().focus().redo().run()"/>
    </div>

    <editor-content
      :editor="editor"
      :style="{
      minHeight: props.minHeight,
      border: '1px solid var(--ui-color-primary-500)',
      borderRadius: '0.5rem',
      padding: '0.75rem',
    }"/>
  </div>
</template>

<style scoped lang="scss">
.tiptap-editor {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem;
  border: 1px solid var(--gray-2);
  border-radius: 0.5rem;
  background: var(--white);
}

.menu-bar .divider {
  width: 1px;
  height: 1.5rem;
  background: var(--gray-2);
  margin: 0 0.25rem;
}

.menu-bar :deep(button) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  min-width: 32px;
  padding: 0 0.5rem;
  border-radius: 0.5rem;
  
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  transition: background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease, transform 20ms ease;
  user-select: none;
}

.menu-bar :deep(button):active:not(:disabled) {
  transform: translateY(1px);
}

.menu-bar :deep(button:focus),
.menu-bar :deep(button:focus-visible) {
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
}

.menu-bar :deep(button):disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.menu-bar :deep(svg) {
  width: 18px;
  height: 18px;
}

</style>
