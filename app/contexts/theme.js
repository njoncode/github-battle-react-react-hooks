import React from 'react';

const ThemeContext = React.createContext();

export default ThemeContext;
export const ThemeProvider = ThemeContext.Provider;

/**
 * const LocaleContext = React.createContext('en')

 * 
 * useContext takes in a Context object as its first argument and returns whatever was passed to the value prop of the nearest Provider component. 
   Said differently, it has the same use case as .Consumer but with a more composable API.

    export default function Nav () {
        const { locale, toggleLocale } = React.useContext (LocaleContext)

    return locale === 'en'
        ? <EnglishNav toggleLocale={toggleLocale} />
        : <SpanishNav toggleLocale={toggleLocale} />
    }


 * 
 * 
 * 
 */
