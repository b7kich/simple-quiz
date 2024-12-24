import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {},
  "previewHead": (head) =>(`
    ${head}
    <link rel="stylesheet" href="index.css">
   <link
     rel="preconnect"
     href="https://fonts.googleapis.com"
   />
   <link
     rel="preconnect"
     href="https://fonts.gstatic.com"
     crossorigin
   />
   `)
};
export default config;


