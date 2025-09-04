import { reactive, ref, toValue, watch, computed, type Ref } from 'vue'

type MaybeFn<T> = T | (() => T)

type FieldConfig<TSource, TValue> = {
  /** Значение по умолчанию */
  default: MaybeFn<TValue>
  /** Как вытащить значение из исходного объекта (при инициализации / ресете) */
  get?: (src: TSource | null | undefined) => TValue
  /** Как положить значение обратно в payload (если не задано — берём как есть) */
  set?: (value: TValue, draft: any) => void
  /** Приведение типов/нормализация при записи в форму */
  cast?: (value: any) => TValue
}

type Schema<TSource, TForm> = {
  [K in keyof TForm]: FieldConfig<TSource, TForm[K]>
}

type UseFormBuilderOptions = {
  /** Следить за изменениями источника и переинициализировать форму */
  syncOnSourceChange?: boolean
  /** Глубокий вотч источника */
  deep?: boolean
}

function resolve<T>(v: MaybeFn<T>): T {
  return typeof v === 'function' ? (v as () => T)() : v
}

function deepClone<T>(v: T): T {
  return v == null ? v : JSON.parse(JSON.stringify(v))
}

export function useFormBuilder<TSource, TForm>(
  sourceRef: Ref<TSource | null | undefined>,
  schema: Schema<TSource, TForm>,
  options: UseFormBuilderOptions = { syncOnSourceChange: true, deep: true }
) {
  const touched = ref(false)
  const dirty = ref(false)

  // создаём реактивный объект формы
  const form = reactive({} as TForm)

  function readFromSource(src: TSource | null | undefined): TForm {
    const draft: any = {}
    for (const key in schema) {
      const field = schema[key as keyof TForm] as FieldConfig<TSource, any>
      const base = field.get ? field.get(src as TSource) : resolve(field.default)
      draft[key] = field.cast ? field.cast(base) : base
    }
    return draft
  }

  function writeDefaults(): TForm {
    const draft: any = {}
    for (const key in schema) {
      const field = schema[key as keyof TForm] as FieldConfig<TSource, any>
      draft[key] = resolve(field.default)
    }
    return draft
  }

  function assignToForm(next: TForm) {
    for (const key in schema) {
      // @ts-expect-error index
      form[key] = deepClone((next as any)[key])
    }
  }

  function resetToSource() {
    assignToForm(readFromSource(toValue(sourceRef)))
    touched.value = false
    dirty.value = false
  }

  function resetToDefaults() {
    assignToForm(writeDefaults())
    touched.value = false
    dirty.value = false
  }

  function patchFromSource(patch: Partial<TSource>) {
    const current = toValue(sourceRef)
    const merged = Object.assign({}, deepClone(current ?? {}), patch)
    assignToForm(readFromSource(merged as TSource))
    dirty.value = true
  }

  function setField<K extends keyof TForm>(key: K, value: TForm[K]) {
    // @ts-expect-error index
    form[key] = value
    touched.value = true
    dirty.value = true
  }

  /** Собираем payload с учётом set() для полей */
  function toPayload(): any {
    const draft: any = {}
    for (const key in schema) {
      const field = schema[key as keyof TForm] as FieldConfig<TSource, any>
      const value = deepClone((form as any)[key])
      if (field.set) {
        field.set(value, draft)
      } else {
        draft[key] = value
      }
    }
    return draft
  }

  // Автоинициализация
  assignToForm(readFromSource(toValue(sourceRef)))

  // Синхронизация при изменении источника
  if (options.syncOnSourceChange) {
    watch(
      sourceRef,
      (src) => {
        assignToForm(readFromSource(src))
        touched.value = false
        dirty.value = false
      },
      { immediate: false, deep: options.deep }
    )
  }

  return {
    form,
    touched: computed(() => touched.value),
    dirty: computed(() => dirty.value),
    setField,
    resetToSource,
    resetToDefaults,
    patchFromSource,
    toPayload,
  }
}
