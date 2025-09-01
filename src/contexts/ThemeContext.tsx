import React, {createContext, useState} from 'react';
// themes
import {darkTheme, lightTheme} from '../themes';

export type TTheme = 'light' | 'dark';

export type TThemeContext = {
  mode: TTheme;
  theme: typeof lightTheme;
  toggleTheme?: (theme: TTheme) => void;
};

export type TThemeState = Omit<TThemeContext, 'toggleTheme'>;

type TThemeProvider = {
  children: React.ReactNode;
};

const initialTheme: TThemeState = {
  mode: 'light',
  theme: lightTheme,
};

export const ThemeContext = createContext<TThemeContext>(initialTheme);

export const ThemeProvider: React.FC<TThemeProvider> = ({children}) => {
  const [theme, setTheme] = useState<TThemeState>(initialTheme);

  // useEffect(() => {
  //   // Load saved theme from storage
  //   const getTheme = async () => {
  //     try {
  //       const savedTheme = await AsyncStorage.getItem('theme');
  //       if (savedTheme) {
  //         setTheme(savedTheme);
  //       }
  //     } catch (error) {
  //       console.log('Error loading theme:', error);
  //     }
  //   };
  //   getTheme();
  // }, []);

  const toggleTheme = (newMode: TTheme) => {
    setTheme({
      mode: newMode,
      theme: newMode === 'dark' ? darkTheme : lightTheme,
    });
    // AsyncStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{...theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};