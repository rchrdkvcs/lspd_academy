// vite.config.ts
import { getDirname } from "file:///C:/Users/B34R/Desktop/td.b34r.fr/node_modules/.pnpm/@adonisjs+core@6.14.1_@adonisjs+assembler@7.8.2_@vinejs+vine@2.1.0_edge.js@6.2.0/node_modules/@adonisjs/core/build/src/helpers/main.js";
import inertia from "file:///C:/Users/B34R/Desktop/td.b34r.fr/node_modules/.pnpm/@adonisjs+inertia@1.2.2_@adonisjs+core@6.14.1_@adonisjs+session@7.5.0_@adonisjs+vite@3.0.0_edge.js@6.2.0/node_modules/@adonisjs/inertia/build/src/plugins/vite.js";
import adonisjs from "file:///C:/Users/B34R/Desktop/td.b34r.fr/node_modules/.pnpm/@adonisjs+vite@3.0.0_@adonisjs+core@6.14.1_@adonisjs+shield@8.1.1_edge.js@6.2.0_vite@5.4.8/node_modules/@adonisjs/vite/build/src/client/main.js";
import vue from "file:///C:/Users/B34R/Desktop/td.b34r.fr/node_modules/.pnpm/@vitejs+plugin-vue@5.1.4_vite@5.4.8_vue@3.5.12/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import UnoCSS from "file:///C:/Users/B34R/Desktop/td.b34r.fr/node_modules/.pnpm/unocss@0.63.4_postcss@8.4.47_vite@5.4.8/node_modules/unocss/dist/vite.mjs";
import { defineConfig } from "file:///C:/Users/B34R/Desktop/td.b34r.fr/node_modules/.pnpm/vite@5.4.8_@types+node@22.7.5/node_modules/vite/dist/node/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/B34R/Desktop/td.b34r.fr/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    inertia({ ssr: { enabled: false } }),
    vue(),
    adonisjs({ entrypoints: ["inertia/app/app.ts"], reload: ["resources/views/**/*.edge"] }),
    UnoCSS()
  ],
  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      "~/": `${getDirname(__vite_injected_original_import_meta_url)}/inertia/`
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxCMzRSXFxcXERlc2t0b3BcXFxcdGQuYjM0ci5mclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQjM0UlxcXFxEZXNrdG9wXFxcXHRkLmIzNHIuZnJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0IzNFIvRGVza3RvcC90ZC5iMzRyLmZyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZ2V0RGlybmFtZSB9IGZyb20gJ0BhZG9uaXNqcy9jb3JlL2hlbHBlcnMnXG5pbXBvcnQgaW5lcnRpYSBmcm9tICdAYWRvbmlzanMvaW5lcnRpYS9jbGllbnQnXG5pbXBvcnQgYWRvbmlzanMgZnJvbSAnQGFkb25pc2pzL3ZpdGUvY2xpZW50J1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgVW5vQ1NTIGZyb20gJ3Vub2Nzcy92aXRlJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIGluZXJ0aWEoeyBzc3I6IHsgZW5hYmxlZDogZmFsc2UgfSB9KSxcbiAgICB2dWUoKSxcbiAgICBhZG9uaXNqcyh7IGVudHJ5cG9pbnRzOiBbJ2luZXJ0aWEvYXBwL2FwcC50cyddLCByZWxvYWQ6IFsncmVzb3VyY2VzL3ZpZXdzLyoqLyouZWRnZSddIH0pLFxuICAgIFVub0NTUygpLFxuICBdLFxuXG4gIC8qKlxuICAgKiBEZWZpbmUgYWxpYXNlcyBmb3IgaW1wb3J0aW5nIG1vZHVsZXMgZnJvbVxuICAgKiB5b3VyIGZyb250ZW5kIGNvZGVcbiAgICovXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ34vJzogYCR7Z2V0RGlybmFtZShpbXBvcnQubWV0YS51cmwpfS9pbmVydGlhL2AsXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRSLFNBQVMsa0JBQWtCO0FBQ3ZULE9BQU8sYUFBYTtBQUNwQixPQUFPLGNBQWM7QUFDckIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixTQUFTLG9CQUFvQjtBQUxvSixJQUFNLDJDQUEyQztBQU9sTyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxRQUFRLEVBQUUsS0FBSyxFQUFFLFNBQVMsTUFBTSxFQUFFLENBQUM7QUFBQSxJQUNuQyxJQUFJO0FBQUEsSUFDSixTQUFTLEVBQUUsYUFBYSxDQUFDLG9CQUFvQixHQUFHLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxDQUFDO0FBQUEsSUFDdkYsT0FBTztBQUFBLEVBQ1Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBTUEsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsTUFBTSxHQUFHLFdBQVcsd0NBQWUsQ0FBQztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
