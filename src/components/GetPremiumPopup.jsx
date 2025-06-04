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
// import {useTheme} from '../context/ThemeContext';

// export default function GetPremiumPopup({visible, onClose}) {
//   const [selectedPlan, setSelectedPlan] = useState('weekly');

// const {isDarkModeOn} = useTheme();

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
//               <TouchableOpacity
//                 style={[
//                   styles.plan,
//                   selectedPlan === 'weekly' && styles.selectedPlan,
//                 ]}
//                 onPress={() => handleSelectPlan('weekly')}>

//                 <SvgXml
//                   xml={
//                     selectedPlan === 'weekly' ? plan_white_svg : plan_black_svg
//                   }
//                   width={24.29}
//                   height={18}
//                 />

//                 <View style={styles.planTextContainer}>
//                   <Text
//                     style={[
//                       styles.planTitle,
//                       selectedPlan === 'weekly' && styles.selectedText,
//                     ]}>
//                     Ad-Free for One week
//                   </Text>
//                   <Text
//                     style={[
//                       styles.planSubText2,
//                       selectedPlan === 'weekly' && styles.selectedText,
//                     ]}>
//                     4000 Quids
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
//                 <SvgXml
//                   xml={
//                     selectedPlan === 'monthly' ? plan_white_svg : plan_black_svg
//                   }
//                   width={24.29}
//                   height={18}
//                 />
//                 <View style={styles.planTextContainer}>
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
//           </Animated.View>
//         </View>
//       </TouchableWithoutFeedback>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     bottom: 0,
//     position: 'absolute',
//   },
//   container: {
//     width: '100%',
//     height: 370,
//     backgroundColor: '#fff',
//     padding: 20,
//     bottom: 0,
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   dragHandle: {
//     position: 'absolute',
//     top: -15,
//     left: '50%',
//     transform: [{translateX: -20}],
//     width: 40,
//     height: 4,
//     backgroundColor: 'gray',
//     borderRadius: 2,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     paddingVertical: 5,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '700',
//     textAlign: 'left',
//   },
//   balance: {
//     fontWeight: '500',
//     fontSize: 14,
//     color: '#2F0E40',
//     marginTop: 5,
//     textAlign: 'right',
//   },
//   negativeBalance: {
//     color: '#D33',
//     fontWeight: 'bold',
//   },

//   plan: {
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderColor: '#392EBD',
//     borderWidth: 1,
//     width: '100%',
//     marginBottom: 25,
//   },

//   selectedPlan: {
//     width: '100%',
//     backgroundColor: '#392EBD',
//   },
//   planTextContainer: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   planTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   selectedText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   planSubText: {
//     fontSize: 14,
//     color: 'black',
//   },
//   planSubText2: {
//     fontSize: 14,
//     color: 'black',
//   },
//   continueButton: {
//     marginTop: 45,
//     backgroundColor: 'white',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     minWidth: 72,
//   },
//   continueText: {
//     color: '#000',
//     fontWeight: 500,
//   },
//   arrow: {
//     fontSize: 20,
//     color: 'black',
//   },
//   footerText: {
//     fontSize: 12,
//     color: '#666',
//     textAlign: 'left',
//     marginTop: 10,
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
  arrow_svg_white,
  plan_black_svg,
  plan_svg,
  plan_white_svg,
} from '../utils/constant/TabSVGimage';
import {useTheme} from '../context/ThemeContext';

export default function GetPremiumPopup({visible, onClose}) {
  const [selectedPlanLight, setSelectedPlanLight] = useState('weekly');
  const [selectedPlanDark, setSelectedPlanDark] = useState('weekly');

  const {isDarkModeOn} = useTheme();

  const opacityLight = useRef(new Animated.Value(0)).current;
  const translateYLight = useRef(new Animated.Value(50)).current;
  const opacityDark = useRef(new Animated.Value(0)).current;
  const translateYDark = useRef(new Animated.Value(50)).current;

  const handleSelectPlanLight = plan => {
    setSelectedPlanLight(plan);
  };

  const handleSelectPlanDark = plan => {
    setSelectedPlanDark(plan);
  };

  useEffect(() => {
    if (visible && !isDarkModeOn) {
      Animated.parallel([
        Animated.timing(opacityLight, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateYLight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacityLight, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateYLight, {
          toValue: 50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }

    if (visible && isDarkModeOn) {
      Animated.parallel([
        Animated.timing(opacityDark, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateYDark, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacityDark, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateYDark, {
          toValue: 50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, isDarkModeOn]);

  return (
    <>
      {/* Light Mode Modal */}
      <Modal
        visible={visible && !isDarkModeOn}
        transparent
        animationType="none">
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <Animated.View
              style={[
                styles.container,
                {
                  opacity: opacityLight,
                  transform: [{translateY: translateYLight}],
                },
              ]}>
              <View style={styles.header}>
                <View style={styles.dragHandle} />
                <View style={styles.headerContent}>
                  <Text style={[styles.title, {flex: 1}]}>
                    Choose Your Plan
                  </Text>
                  <Text style={[styles.balance, {flex: 1, textAlign: 'right'}]}>
                    My Quids: -0.25
                  </Text>
                </View>
              </View>

              <View>
                <TouchableOpacity
                  style={[
                    styles.plan,
                    selectedPlanLight === 'weekly' && styles.selectedPlan,
                  ]}
                  onPress={() => handleSelectPlanLight('weekly')}>
                  <SvgXml
                    xml={
                      selectedPlanLight === 'weekly'
                        ? plan_white_svg
                        : plan_black_svg
                    }
                    width={24.29}
                    height={18}
                  />
                  <View style={styles.planTextContainer}>
                    <Text
                      style={[
                        styles.planTitle,
                        selectedPlanLight === 'weekly' && styles.selectedText,
                      ]}>
                      Ad-Free for One Week
                    </Text>
                    <Text
                      style={[
                        styles.planSubText2,
                        selectedPlanLight === 'weekly' && styles.selectedText,
                      ]}>
                      4000 Quids
                    </Text>
                  </View>
                  {selectedPlanLight === 'weekly' ? (
                    <TouchableOpacity style={styles.continueButton}>
                      <Text style={styles.continueText}>Continue</Text>
                    </TouchableOpacity>
                  ) : (
                    <SvgXml xml={arrow_svg} width={7.8} height={10} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.plan,
                    selectedPlanLight === 'monthly' && styles.selectedPlan,
                  ]}
                  onPress={() => handleSelectPlanLight('monthly')}>
                  <SvgXml
                    xml={
                      selectedPlanLight === 'monthly'
                        ? plan_white_svg
                        : plan_black_svg
                    }
                    width={24.29}
                    height={18}
                  />
                  <View style={styles.planTextContainer}>
                    <Text
                      style={[
                        styles.planTitle,
                        selectedPlanLight === 'monthly' && styles.selectedText,
                      ]}>
                      Ad-Free for One Month
                    </Text>
                    <Text
                      style={[
                        styles.planSubText2,
                        selectedPlanLight === 'monthly' && styles.selectedText,
                      ]}>
                      4000 Quids
                    </Text>
                  </View>
                  {selectedPlanLight === 'monthly' ? (
                    <TouchableOpacity style={styles.continueButton}>
                      <Text style={styles.continueText}>Continue</Text>
                    </TouchableOpacity>
                  ) : (
                    <SvgXml xml={arrow_svg} width={7.8} height={10} />
                  )}
                </TouchableOpacity>
              </View>

              <Text style={styles.footerText}>
                Ad-free options remove only full-screen ads (pop-ups) for the
                selected period; banner ads remain visible.
              </Text>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Dark Mode Modal */}
      <Modal visible={visible && isDarkModeOn} transparent animationType="none">
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <Animated.View
              style={[
                styles.containerDark,
                {
                  opacity: opacityDark,
                  transform: [{translateY: translateYDark}],
                },
              ]}>
              <View style={styles.header}>
                <View style={styles.dragHandleDark} />
                <View style={styles.headerContent}>
                  <Text style={[styles.titleDark, {flex: 1}]}>
                    Choose Your Plan
                  </Text>
                  <Text
                    style={[styles.balanceDark, {flex: 1, textAlign: 'right'}]}>
                    My Quids: -0.25
                  </Text>
                </View>
              </View>

              <View>
                <TouchableOpacity
                  style={[
                    styles.planDark,
                    selectedPlanDark === 'weekly' && styles.selectedPlanDark,
                  ]}
                  onPress={() => handleSelectPlanDark('weekly')}>
                  <SvgXml
                    xml={
                      selectedPlanDark === 'weekly'
                        ? plan_black_svg
                        : plan_white_svg
                    }
                    width={24.29}
                    height={18}
                  />
                  <View style={styles.planTextContainer}>
                    <Text
                      style={[
                        styles.planTitleDark,
                        selectedPlanDark === 'weekly' &&
                          styles.selectedTextDark,
                      ]}>
                      Ad-Free for One Week
                    </Text>
                    <Text
                      style={[
                        styles.planSubTextDark,
                        selectedPlanDark === 'weekly' &&
                          styles.selectedTextDark,
                      ]}>
                      4000 Quids
                    </Text>
                  </View>
                  {selectedPlanDark === 'weekly' ? (
                    <TouchableOpacity style={styles.continueButtonDark}>
                      <Text style={styles.continueTextDark}>Continue</Text>
                    </TouchableOpacity>
                  ) : (
                    <SvgXml xml={arrow_svg_white} width={7.8} height={10} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.planDark,
                    selectedPlanDark === 'monthly' && styles.selectedPlanDark,
                  ]}
                  onPress={() => handleSelectPlanDark('monthly')}>
                  <SvgXml
                    xml={
                      selectedPlanDark === 'monthly'
                        ? plan_black_svg
                        : plan_white_svg
                    }
                    width={24.29}
                    height={18}
                  />
                  <View style={styles.planTextContainer}>
                    <Text
                      style={[
                        styles.planTitleDark,
                        selectedPlanDark === 'monthly' &&
                          styles.selectedTextDark,
                      ]}>
                      Ad-Free for One Month
                    </Text>
                    <Text
                      style={[
                        styles.planSubTextDark,
                        selectedPlanDark === 'monthly' &&
                          styles.selectedTextDark,
                      ]}>
                      4000 Quids
                    </Text>
                  </View>
                  {selectedPlanDark === 'monthly' ? (
                    <TouchableOpacity style={styles.continueButtonDark}>
                      <Text style={styles.continueTextDark}>Continue</Text>
                    </TouchableOpacity>
                  ) : (
                    <SvgXml xml={arrow_svg_white} width={7.8} height={10} />
                  )}
                </TouchableOpacity>
              </View>

              <Text style={styles.footerTextDark}>
                Ad-free options remove only full-screen ads (pop-ups) for the
                selected period; banner ads remain visible.
              </Text>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    position: 'absolute',
  },
  container: {
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: 350,
    backgroundColor: '#fff',
    padding: 20,
    bottom: 0,
  },
  containerDark: {
    width: '100%',
    height: 350,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#191919',
    padding: 20,
    bottom: 0,
  },
  header: {
    alignItems: 'center',
    marginBottom: 15,
  },
  dragHandle: {
    position: 'absolute',
    top: -15,
    left: '50%',
    transform: [{translateX: -20}],
    width: 40,
    height: 4,
    backgroundColor: 'gray',
    borderRadius: 2,
  },
  dragHandleDark: {
    position: 'absolute',
    top: -15,
    left: '50%',
    transform: [{translateX: -20}],
    width: 40,
    height: 4,
    backgroundColor: '#666',
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
    color: '#000',
  },
  titleDark: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'left',
    color: '#fff',
  },
  balance: {
    fontWeight: '500',
    fontSize: 14,
    color: '#2F0E40',
    marginTop: 5,
    textAlign: 'right',
  },
  balanceDark: {
    fontWeight: '500',
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
    textAlign: 'right',
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
  planDark: {
    backgroundColor: '#191919',
    padding: 10,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#666',
    borderWidth: 1,
    width: '100%',
    marginBottom: 25,
  },
  selectedPlan: {
    width: '100%',
    backgroundColor: '#392EBD',
  },
  selectedPlanDark: {
    width: '100%',
    backgroundColor: '#fff',
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
  planTitleDark: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  selectedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  selectedTextDark: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  planSubText: {
    fontSize: 14,
    color: 'black',
  },
  planSubText2: {
    fontSize: 14,
    color: 'black',
  },
  planSubTextDark: {
    fontSize: 14,
    color: '#fff',
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
  continueButtonDark: {
    marginTop: 45,
    backgroundColor: '#191919',
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
  continueTextDark: {
    color: '#fff',
    fontWeight: 500,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'left',
    marginTop: 10,
  },
  footerTextDark: {
    fontSize: 12,
    color: '#9E9E9E',
    textAlign: 'left',
    marginTop: 10,
  },
});
