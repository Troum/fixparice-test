export default defineAppConfig({

  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'slate',
    },
    button: {
      defaultVariants: {


      }
    },
    textarea: {
      slots: {
        root: 'w-full',
      },
    },
    select: {
      slots: {
        root: 'relative inline-flex items-center h-[44px]',
        base: [
          'w-full h-[44px] rounded-xl border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors'
        ],
      },
    },
    inputNumber: {
      slots: {
        root: 'relative inline-flex items-center h-[44px]',
        base: [
          'w-full h-[44px] rounded-xl border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors'
        ],
      },
    },
    input: {
      slots: {
        root: 'relative inline-flex items-center w-full',
        base: [
          'w-full rounded-xl border-0 placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-all duration-200'
        ],
        leading: 'absolute inset-y-0 start-0 flex items-center',
        leadingIcon: 'shrink-2 text-gray-400',
        trailing: 'absolute inset-y-0 end-0 flex items-center',
        trailingIcon: 'shrink-0 text-gray-400'
      },
      variants: {
        size: {
          xs: { base: 'px-3 py-2 text-xs gap-1.5', leading: 'ps-3', trailing: 'pe-3', leadingIcon: 'size-4', trailingIcon: 'size-4' },
          sm: { base: 'px-3.5 py-2.5 text-sm gap-2', leading: 'ps-3.5', trailing: 'pe-3.5', leadingIcon: 'size-4', trailingIcon: 'size-4' },
          md: { base: 'px-4 py-3 text-sm gap-2', leading: 'ps-2', trailing: 'pe-4', leadingIcon: 'size-5', trailingIcon: 'size-5' },
          lg: { base: 'px-5 py-3.5 text-base gap-2.5', leading: 'ps-5', trailing: 'pe-5', leadingIcon: 'size-5', trailingIcon: 'size-5' },
          xl: { base: 'px-6 py-4 text-base gap-3', leading: 'ps-6', trailing: 'pe-6', leadingIcon: 'size-6', trailingIcon: 'size-6' }
        },
        variant: {
          outline: 'text-gray-900 bg-white ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:focus:ring-primary-400',
          soft: 'text-gray-900 bg-gray-50 hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-800',
          subtle: 'text-gray-900 bg-gray-50 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white dark:ring-gray-700',
          ghost: 'text-gray-900 bg-transparent hover:bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 dark:text-white dark:hover:bg-gray-800 dark:focus:bg-gray-800'
        },
        color: {
          primary: '',
          secondary: '',
          neutral: ''
        }
      },
      compoundVariants: [
        { color: 'primary', variant: ['outline','subtle'], class: 'focus:ring-primary-500 dark:focus:ring-primary-400' },
        { color: 'secondary', variant: ['outline','subtle'], class: 'focus:ring-secondary-500 dark:focus:ring-secondary-400' }
      ],
      defaultVariants: {
        size: 'md',
        color: 'primary',
        variant: 'outline'
      }
    },
  }
})
