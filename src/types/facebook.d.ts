interface Window {
  fbq: (command: string, event: string, parameters?: Record<string, unknown>) => void;
}

declare module 'react-facebook-pixel' {
  export const init: (pixelId: string, advancedMatching?: any, options?: any) => void;
  export const pageView: () => void;
  export const track: (event: string, parameters?: Record<string, unknown>) => void;
  export const trackCustom: (event: string, parameters?: Record<string, unknown>) => void;
}
