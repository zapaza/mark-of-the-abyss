/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ImportMetaEnv {
    // readonly VITE_APP_TITLE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

// Объявление глобальной переменной, которую подставляем через Vite define
declare const __IS_DEBUG__: boolean;