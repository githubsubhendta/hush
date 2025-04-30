import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [isDarkModeOn, setIsDarkModeOn] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('isDarkMode');
      if (savedTheme !== null) {
        setIsDarkModeOn(savedTheme === 'true');
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newValue = !isDarkModeOn;
    setIsDarkModeOn(newValue);
    await AsyncStorage.setItem('isDarkMode', newValue.toString());
  };

  return (
    <ThemeContext.Provider value={{isDarkModeOn, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
