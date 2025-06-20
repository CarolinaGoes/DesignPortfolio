/// <reference types="vite/client" />

// Tipos para arquivos CSS modules
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

// Tipos para arquivos CSS simples
declare module '*.css' {
  const css: string
  export default css
}

// Tipos para SVG (como componentes React)
declare module '*.svg' {
  import { ReactComponent } from 'react'
  const ReactComponent: ReactComponent
  
  const src: string
  export default src
}

// Tipos para imagens
declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

// Tipos para variáveis de ambiente (se usar .env)
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
  // Adicione outras variáveis de ambiente aqui...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}
declare module '*.md' {
  const content: string
  export default content
}