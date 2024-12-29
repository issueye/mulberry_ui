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
          '50': '#144A74',
          '100': '##CEEFF8',
          '200': '#A1DBF1',
          '300': '#6BB2D5',
          '400': '#4182AB',
          '500': '#144A74',
          '600': '#0E3963',
          '700': '#0A2B53',
          '800': '#061E43',
          '900': '#031537',
        },
      }
    }
  }
};