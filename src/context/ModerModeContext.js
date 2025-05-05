
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, useEffect } from 'react';

const ModernModeContext = createContext();

export const ModernModeProvider = ({ children }) => {
  const [isModernOn, setIsModernOn] = useState(false);
  

  useEffect(() => {
    const modernMode = async () => {
      const savedMode = await AsyncStorage.getItem('isModernOn');
      if (savedMode !== null) {
        setIsModernOn(savedMode === 'true');
      }
    };
    modernMode();
  }, []);
  const toggleModernMode = async () => {
    const newValue = !isModernOn;
    setIsModernOn(newValue);
    await AsyncStorage.setItem('isModernOn', newValue.toString());
  };

  return (
    <ModernModeContext.Provider value={{ isModernOn, toggleModernMode }}>
      {children}
    </ModernModeContext.Provider>
  );
};

export const useModernMode = () => useContext(ModernModeContext);