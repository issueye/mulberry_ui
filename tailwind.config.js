/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  corePlugins: {
    preflight: false
  },
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg_color: "var(--el-bg-color)",
        primary: "var(--el-color-primary)",
        primary_light_9: "var(--el-color-primary-light-9)",
        text_color_primary: "var(--el-text-color-primary)",
        text_color_regular: "var(--el-text-color-regular)",
        text_color_disabled: "var(--el-text-color-disabled)",
        'header': {
          '100': '#CFEDFA',
          '200': '#A0D8F6',
          '300': '#6DB6E5',
          '400': '#4690CC',
          '500': '#1661AB',
          '600': '#104B93',
          '700': '#0B387B',
          '800': '#072763',
          '900': '#041B52',
        },
      }
    }
  }
};