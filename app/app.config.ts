export default defineAppConfig({
  ui: {
    colors: {
      primary: 'orange',
      neutral: 'stone',
    },
    checkbox: {
      slots: {
        description: 'text-ellipsis overflow-hidden line-clamp-2',
      },
    },
  },
})
