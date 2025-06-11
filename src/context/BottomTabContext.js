// import React, {createContext, useContext, useState} from 'react';

// const BottomTabContext = createContext();

// export const BottomTabProvider = ({children}) => {
//   const [isTabVisible, setIsTabVisible] = useState(true);

//   const showTab = () => setIsTabVisible(true);
//   const hideTab = () => setIsTabVisible(false);

//   return (
//     <BottomTabContext.Provider value={{isTabVisible, showTab, hideTab}}>
//       {children}
//     </BottomTabContext.Provider>
//   );
// };

// export const useBottomTab = () => useContext(BottomTabContext);


import React, {createContext, useContext, useRef} from 'react';
import {Animated} from 'react-native';

const BottomTabContext = createContext();

export const BottomTabProvider = ({children}) => {
  const tabBarTranslateY = useRef(new Animated.Value(0)).current;

  const hideTab = () => {
    Animated.timing(tabBarTranslateY, {
      toValue: 100, // move it off screen
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const showTab = () => {
    Animated.timing(tabBarTranslateY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <BottomTabContext.Provider value={{tabBarTranslateY, hideTab, showTab}}>
      {children}
    </BottomTabContext.Provider>
  );
};

export const useBottomTab = () => useContext(BottomTabContext);
