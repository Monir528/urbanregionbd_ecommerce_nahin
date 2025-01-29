'use client';
import { createContext, useContext, useState } from 'react';

/**
 * @typedef {Object} AppContext
 * @property {Object} productCategory
 * @property {string} productCategory.get
 * @property {function(string): void} productCategory.update
 */

/** @type {React.Context<AppContext|null>} */
const AppContexts = createContext(null);

// Fix 1: Properly destructure children from propst
export function NavBarProvider( { children }: { children: React.ReactNode } ) {  // Changed this line
    const [productCategory, setProductCategory] = useState("");

    const AppContext = {
        productCategory: {
            get: productCategory,
            update: function (cart) {
                setProductCategory(cart);
            }
        }
    };

    // Fix 2: Pass AppContext directly instead of wrapping in an object
    return (
        <AppContexts.Provider value={AppContext}>
            {children}
        </AppContexts.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNavBarContext() {
    const context = useContext(AppContexts);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
}