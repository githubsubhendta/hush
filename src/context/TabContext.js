// import React, { createContext, useContext, useState } from 'react';

// const TabContext = createContext();

// export const TabProvider = ({ children }) => {
//   const [activeTab, setActiveTab] = useState('Hot');
  
//   return (
//     <TabContext.Provider value={{ activeTab, setActiveTab }}>
//       {children}
//     </TabContext.Provider>
//   );
// };

// export const useTab = () => useContext(TabContext);


import React, { createContext, useContext, useState } from 'react';

const TabContext = createContext();

export const TabProvider = ({ children }) => {
  // Store active tabs for different screens (Home, Watch, etc.)
  const [activeTabs, setActiveTabs] = useState({});

  // Function to set tab for a specific screen
  const setActiveTab = (screen, tab) => {
    setActiveTabs((prev) => ({ ...prev, [screen]: tab }));
  };

  return (
    <TabContext.Provider value={{ activeTabs, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

// Custom hook to use the tab context
export const useTab = () => useContext(TabContext);
