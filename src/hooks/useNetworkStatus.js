import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(null); 

  useEffect(() => {
   
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
    });

   
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return isConnected === null ? true : isConnected; 
};