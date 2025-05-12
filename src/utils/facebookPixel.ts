import ReactPixel from 'react-facebook-pixel';

type ContentItem = {
  id: string;
  quantity: number;
};

type EventParameters = {
  content_ids?: string[];
  content_name?: string;
  content_type?: string;
  content_category?: string;
  contents?: ContentItem[];
  currency?: string;
  value?: number;
  num_items?: number;
  search_string?: string;
  search_results?: number;
  payment_method?: string;
  order_id?: string;
  [key: string]: unknown;
};

const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '1663315537778417';

// This function is kept for backward compatibility but not used directly
export const initFacebookPixel = () => {
  if (typeof window === 'undefined' || !FACEBOOK_PIXEL_ID || !ReactPixel.init) return;
  
  try {
    ReactPixel.init(FACEBOOK_PIXEL_ID, undefined, {
      autoConfig: true,
      debug: process.env.NODE_ENV === 'development',
    });
    ReactPixel.pageView();
  } catch (error) {
    console.error('Error initializing Facebook Pixel:', error);
  }
};

export const trackEvent = (eventName: string, parameters: EventParameters = {}) => {
  if (typeof window === 'undefined' || !window.fbq || !ReactPixel) return;
  
  try {
    ReactPixel.track(eventName, parameters);
  } catch (error) {
    console.error('Error tracking Facebook Pixel event:', error);
  }
};

// Standard Events
export const events = {
  pageView: () => {
    if (typeof window === 'undefined' || !window.fbq) return;
    
    try {
      window.fbq('track', 'PageView');
    } catch (error) {
      console.error('Error tracking PageView:', error);
    }
  },
  
  viewContent: (contentType: string, contentData: EventParameters = {}) => {
    trackEvent('ViewContent', { content_type: contentType, ...contentData });
  },
  
  search: (searchString: string, searchResults: number) => {
    trackEvent('Search', { 
      search_string: searchString, 
      search_results: searchResults 
    });
  },
  
  addToCart: (contentData: EventParameters = {}) => {
    trackEvent('AddToCart', contentData);
  },
  
  initiateCheckout: (contentData: EventParameters = {}) => {
    trackEvent('InitiateCheckout', contentData);
  },
  
  purchase: (value: number, currency: string, contentData: EventParameters = {}) => {
    trackEvent('Purchase', { 
      value, 
      currency, 
      ...contentData 
    });
  },
};
