// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import AppLovinMAX, { AdView, AdFormat } from 'react-native-applovin-max';

// const BANNER_AD_UNIT_ID = '5c47037d7f05d480'; 

// const BannerAd = () => {
//   return (
//     <View style={styles.adContainer}>
//       <AdView
//         adUnitId={BANNER_AD_UNIT_ID}
//         adFormat={AdFormat.BANNER}
//         style={styles.banner}
//         onAdLoaded={() => console.log('Banner loaded')}
//         onAdLoadFailed={(error) => console.warn('Banner load failed', error)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   adContainer: {
//     width: '100%',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   banner: {
//     width: '100%',
//     height: 50,
//     borderColor:'#000',
//     borderWidth:2
//   },
// });

// export default BannerAd;

import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AppLovinMAX, { AdView, AdFormat } from 'react-native-applovin-max';

const BANNER_AD_UNIT_ID = 'b195f8dd8ded45fe847ad89ed1d71f3e';

const BannerAd = () => {
  const [adLoadState, setAdLoadState] = useState('loading');

  return (
    <View style={styles.adContainer}>
      {adLoadState === 'loading' && <Text>Loading ad...</Text>}
      {adLoadState === 'failed' && <Text>Ad failed to load</Text>}
      <AdView
        adUnitId={BANNER_AD_UNIT_ID}
        adFormat={AdFormat.BANNER}
        style={styles.banner}
        onAdLoaded={() => {
          console.log('Banner ad loaded successfully');
          setAdLoadState('loaded');
        }}
        onAdLoadFailed={(error) => {
          console.warn('Banner ad failed to load:', error);
          setAdLoadState('failed');
        }}
        onAdClicked={() => console.log('Banner ad clicked')}
        onAdExpanded={() => console.log('Banner ad expanded')}
        onAdCollapsed={() => console.log('Banner ad collapsed')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  adContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
  },
  banner: {
    width: '100%',
    height: 50,
    borderColor: '#000',
    borderWidth: 2,
  },
});

export default BannerAd;
