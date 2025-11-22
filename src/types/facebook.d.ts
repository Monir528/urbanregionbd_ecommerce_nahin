declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

declare module 'react-facebook-pixel' {
  export const init: (pixelId: string, advancedMatching?: Record<string, unknown>, options?: Record<string, unknown>) => void;
  export const pageView: () => void;
  export const track: (event: string, parameters?: Record<string, unknown>) => void;
  export const trackCustom: (event: string, parameters?: Record<string, unknown>) => void;
}
