import ReactPixel from 'react-facebook-pixel';

const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '1663315537778417';

export const initFacebookPixel = () => {
  if (typeof window === 'undefined' || !FACEBOOK_PIXEL_ID) return;
  
  ReactPixel.init(FACEBOOK_PIXEL_ID, null, {
    autoConfig: true,
    debug: process.env.NODE_ENV === 'development',
  });
  ReactPixel.pageView();
};

export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window === 'undefined' || !window.fbq) return;
  
  ReactPixel.track(eventName, parameters);
};

// Standard Events
export const events = {
  pageView: () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  },
  
  viewContent: (contentType: string, contentData: Record<string, any> = {}) => {
    trackEvent('ViewContent', { content_type: contentType, ...contentData });
  },
  
  search: (searchString: string, searchResults: number) => {
    trackEvent('Search', { 
      search_string: searchString, 
      search_results: searchResults 
    });
  },
  
  addToCart: (contentData: Record<string, any> = {}) => {
    trackEvent('AddToCart', contentData);
  },
  
  initiateCheckout: (contentData: Record<string, any> = {}) => {
    trackEvent('InitiateCheckout', contentData);
  },
  
  purchase: (value: number, currency: string, contentData: Record<string, any> = {}) => {
    trackEvent('Purchase', { 
      value, 
      currency, 
      ...contentData 
    });
  },
  
  // Add more standard events as needed
};
