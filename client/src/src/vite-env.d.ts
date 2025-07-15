/// <reference types="vite/client" />

// CSS Modules
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

// CSS/SCSS comuns
declare module '*.css' {
  const css: string
  export default css
}

declare module '*.scss' {
  const scss: string
  export default scss
}

// SVG como componente React e como src
declare module '*.svg' {
  import * as React from 'react'
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >
  const src: string
  export default src
}

// Tipos para imagens
declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.bmp' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

// Tipos para arquivos Markdown
declare module '*.md' {
  const content: string
  export default content
}

// Variáveis de ambiente (Vite)
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
  // Adicione outras variáveis conforme necessário
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
