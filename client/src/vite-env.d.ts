/// <reference types="vite/client" />

// Tipos para imports de assets
declare module '*.svg' {
  export const ReactComponent: React.FunctionComponent<React.ComponentProps<'svg'> & { title?: string }>;
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.ico' {
  const src: string;
  export default src;
}

declare module '*.avif' {
  const src: string;
  export default src;
}

// Tipos para CSS modules
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Variáveis de ambiente
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_URL: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: string;
  // Adicione outras variáveis de ambiente aqui
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}