// import React, {useEffect, useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   TouchableWithoutFeedback,
//   Animated,
// } from 'react-native';
// import {SvgXml} from 'react-native-svg';
// import {
//   arrow_svg,
//   plan_black_svg,
//   plan_svg,
//   plan_white_svg,
// } from '../utils/constant/TabSVGimage';

// export default function GetPremiumPopup({visible, onClose}) {
//   const [selectedPlan, setSelectedPlan] = useState('weekly');

//   const opacity = useRef(new Animated.Value(0)).current;
//   const translateY = useRef(new Animated.Value(50)).current;

//   const handleSelectPlan = plan => {
//     setSelectedPlan(plan);
//   };

//   useEffect(() => {
//     if (visible) {
//       // Animate in
//       Animated.parallel([
//         Animated.timing(opacity, {
//           toValue: 1,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//         Animated.timing(translateY, {
//           toValue: 0,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//       ]).start();
//     } else {
//       // Animate out
//       Animated.parallel([
//         Animated.timing(opacity, {
//           toValue: 0,
//           duration: 200,
//           useNativeDriver: true,
//         }),
//         Animated.timing(translateY, {
//           toValue: 50,
//           duration: 200,
//           useNativeDriver: true,
//         }),
//       ]).start();
//     }
//   }, [visible]);

//   return (
//     <Modal visible={visible} transparent animationType="none">
//       <TouchableWithoutFeedback onPress={onClose}>
//         <View style={styles.overlay}>
//           <Animated.View
//             style={[styles.container, {opacity, transform: [{translateY}]}]}>
//             {/* Header */}
//             <View style={styles.header}>
//               <View style={styles.dragHandle} />
//               <View style={styles.headerContent}>
//                 <Text style={[styles.title, {flex: 1}]}>Choose Your Plan</Text>
//                 <Text style={[styles.balance, {flex: 1, textAlign: 'right'}]}>
//                   My Quids: -0.25
//                 </Text>
//               </View>
//             </View>

//             {/* Plan Options */}
//             <View>
//               {/* Weekly Plan (Default Selected) */}
//               <TouchableOpacity
//                 style={[
//                   styles.plan,
//                   selectedPlan === 'weekly' && styles.selectedPlan,
//                 ]}
//                 onPress={() => handleSelectPlan('weekly')}>
//                 {/* Show white SVG when selected, black otherwise */}
//                 <SvgXml
//                   xml={
//                     selectedPlan === 'weekly' ? plan_white_svg : plan_black_svg
//                   }
//                   width={24.29}
//                   height={18}
//                 />

//                 <View>
//                   <Text
//                     style={[
//                       styles.planTitle,
//                       selectedPlan === 'weekly' && styles.selectedText,
//                     ]}>
//                     Ad-Free for One Week
//                   </Text>
//                   <Text
//                     style={[
//                       styles.planSubText,
//                       selectedPlan === 'weekly' && styles.selectedText,
//                     ]}>
//                     1000 Quids
//                   </Text>
//                 </View>

//                 {/* Show Continue button only when selected */}
//                 {selectedPlan === 'weekly' ? (
//                   <TouchableOpacity style={styles.continueButton}>
//                     <Text style={styles.continueText}>Continue</Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <SvgXml xml={arrow_svg} width={7.8} height={10} />
//                 )}
//               </TouchableOpacity>

//               {/* Monthly Plan */}
//               <TouchableOpacity
//                 style={[
//                   styles.plan,
//                   selectedPlan === 'monthly' && styles.selectedPlan,
//                 ]}
//                 onPress={() => handleSelectPlan('monthly')}>
//                 {/* Show white SVG when selected, black otherwise */}
//                 <SvgXml
//                   xml={
//                     selectedPlan === 'monthly' ? plan_white_svg : plan_black_svg
//                   }
//                   width={24.29}
//                   height={18}
//                 />

//                 <View>
//                   <Text
//                     style={[
//                       styles.planTitle,
//                       selectedPlan === 'monthly' && styles.selectedText,
//                     ]}>
//                     Ad-Free for One Month
//                   </Text>
//                   <Text
//                     style={[
//                       styles.planSubText2,
//                       selectedPlan === 'monthly' && styles.selectedText,
//                     ]}>
//                     4000 Quids
//                   </Text>
//                 </View>

//                 {/* Show Continue button only when selected */}
//                 {selectedPlan === 'monthly' ? (
//                   <TouchableOpacity style={styles.continueButton}>
//                     <Text style={styles.continueText}>Continue</Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <SvgXml xml={arrow_svg} width={7.8} height={10} />
//                 )}
//               </TouchableOpacity>
//             </View>

//             {/* Footer Info */}
//             <Text style={styles.footerText}>
//               Ad-free options remove only full-screen ads (pop-ups) for the
//               selected period; banner ads remain visible.
//             </Text>

//             {/* Close Button */}
//             {/* <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//               <Text style={styles.closeText}>Close</Text>
//             </TouchableOpacity> */}
//           </Animated.View>
//         </View>
//       </TouchableWithoutFeedback>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     bottom: 0,
//     position: 'absolute',
//   },
//   container: {
//     width: '100%',
//     backgroundColor: '#fff',
//     // borderRadius: 12,
//     padding: 20,
//     bottom: 0,
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   dragHandle: {
//     top: -10,
//     width: 40,
//     height: 4,
//     backgroundColor: 'gray',
//     borderRadius: 2,
//     // marginBottom: 10,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     paddingVertical: 5,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 700,
//     textAlign: 'left',
//     // lineHeight:20,
//   },
//   balance: {
//     fontWeight: 500,
//     fontSize: 14,
//     color: '#2F0E40',
//     marginTop: 5,
//     textAlign: 'right',
//   },
//   negativeBalance: {
//     color: '#D33',
//     fontWeight: 'bold',
//   },

//   // plan: {
//   //   flexDirection: 'row',
//   //   alignItems: 'center',
//   //   padding: 15,
//   //   borderWidth: 1,
//   //   borderColor: '#ccc',
//   //   borderRadius: 8,
//   //   marginBottom: 10,
//   // },
//   // selectedPlan: {
//   //   backgroundColor: '#392EBD',
//   //   borderColor: '#3A56E9',
//   // },
//   // planTextContainer: {
//   //   flex: 1,
//   //   marginLeft: 10,
//   // },
//   // planTitle: {
//   //   fontSize: 16,
//   //   fontWeight: 'bold',
//   //   color: '#fff',
//   // },
//   // planSubText: {
//   //   fontSize: 14,
//   //   color: '#fff',
//   // },

//   plan: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderColor: '#392EBD',
//     borderWidth: 1,
//   },
//   selectedPlan: {
//     backgroundColor: 'blue',
//     // paddingVertical: 25,
//   },
//   planTitle: {
//     textAlign: 'left',
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   selectedText: {
//     paddingLeft: 10,
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   continueButton: {
//     marginTop: 35,
//     backgroundColor: 'white',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 10,
//   },
//   continueText: {
//     color: 'blue',
//     fontWeight: 'bold',
//   },
//   arrow: {
//     fontSize: 20,
//     color: 'black',
//   },
// });

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  arrow_svg,
  plan_black_svg,
  plan_svg,
  plan_white_svg,
} from '../utils/constant/TabSVGimage';

export default function GetPremiumPopup({visible, onClose}) {
  const [selectedPlan, setSelectedPlan] = useState('weekly');

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  const handleSelectPlan = plan => {
    setSelectedPlan(plan);
  };

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <Animated.View
            style={[styles.container, {opacity, transform: [{translateY}]}]}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.dragHandle} />
              <View style={styles.headerContent}>
                <Text style={[styles.title, {flex: 1}]}>Choose Your Plan</Text>
                <Text style={[styles.balance, {flex: 1, textAlign: 'right'}]}>
                  My Quids: -0.25
                </Text>
              </View>
            </View>

            {/* Plan Options */}
            <View>
              <TouchableOpacity
                style={[
                  styles.plan,
                  selectedPlan === 'weekly' && styles.selectedPlan,
                ]}
                onPress={() => handleSelectPlan('weekly')}>
                
                <SvgXml
                  xml={
                    selectedPlan === 'weekly' ? plan_white_svg : plan_black_svg
                  }
                  width={24.29}
                  height={18}
                />

                <View style={styles.planTextContainer}>
                  <Text
                    style={[
                      styles.planTitle,
                      selectedPlan === 'weekly' && styles.selectedText,
                    ]}>
                    Ad-Free for One week
                  </Text>
                  <Text
                    style={[
                      styles.planSubText2,
                      selectedPlan === 'weekly' && styles.selectedText,
                    ]}>
                    4000 Quids
                  </Text>
                </View>

                {/* Show Continue button only when selected */}
                {selectedPlan === 'weekly' ? (
                  <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueText}>Continue</Text>
                  </TouchableOpacity>
                ) : (
                  <SvgXml xml={arrow_svg} width={7.8} height={10} />
                )}
              </TouchableOpacity>

              {/* Monthly Plan */}
              <TouchableOpacity
                style={[
                  styles.plan,
                  selectedPlan === 'monthly' && styles.selectedPlan,
                ]}
                onPress={() => handleSelectPlan('monthly')}>
                <SvgXml
                  xml={
                    selectedPlan === 'monthly' ? plan_white_svg : plan_black_svg
                  }
                  width={24.29}
                  height={18}
                />
                <View style={styles.planTextContainer}>
                  <Text
                    style={[
                      styles.planTitle,
                      selectedPlan === 'monthly' && styles.selectedText,
                    ]}>
                    Ad-Free for One Month
                  </Text>
                  <Text
                    style={[
                      styles.planSubText2,
                      selectedPlan === 'monthly' && styles.selectedText,
                    ]}>
                    4000 Quids
                  </Text>
                </View>
                {selectedPlan === 'monthly' ? (
                  <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueText}>Continue</Text>
                  </TouchableOpacity>
                ) : (
                  <SvgXml xml={arrow_svg} width={7.8} height={10} />
                )}
              </TouchableOpacity>
            </View>

            {/* Footer Info */}
            <Text style={styles.footerText}>
              Ad-free options remove only full-screen ads (pop-ups) for the
              selected period; banner ads remain visible.
            </Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    position: 'absolute',
  },
  container: {
    width: '100%',
    height: 370,
    backgroundColor: '#fff',
    padding: 20,
    bottom: 0,
  },
  header: {
    alignItems: 'center',
    marginBottom: 15,
  },
  dragHandle: {
    position: 'absolute',
    top: -15, // Adjusted to keep it above the header
    left: '50%',
    transform: [{translateX: -20}],
    width: 40,
    height: 4,
    backgroundColor: 'gray',
    borderRadius: 2,
  },
  headerContent: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'left',
  },
  balance: {
    fontWeight: '500',
    fontSize: 14,
    color: '#2F0E40',
    marginTop: 5,
    textAlign: 'right',
  },
  negativeBalance: {
    color: '#D33',
    fontWeight: 'bold',
  },

  plan: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#392EBD',
    borderWidth: 1,
    width: '100%',
    marginBottom: 25,
  },

  selectedPlan: {
    width: '100%',
    backgroundColor: '#392EBD',
  },
  planTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  selectedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  planSubText: {
    fontSize: 14,
    color: 'black',
  },
  planSubText2: {
    fontSize: 14,
    color: 'black',
  },
  continueButton: {
    marginTop: 45,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 72,
  },
  continueText: {
    color: '#000',
    fontWeight: 500,
  },
  arrow: {
    fontSize: 20,
    color: 'black',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'left',
    marginTop: 10,
  },
});
