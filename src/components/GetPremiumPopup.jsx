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
            <View style={styles.planContainer}>
              {/* Weekly Plan (Default Selected) */}
              <TouchableOpacity
                style={[
                  styles.plan,
                  selectedPlan === 'weekly' && styles.selectedPlan, // Apply selected style
                ]}
                onPress={() => handleSelectPlan('weekly')}>
                <View style={styles.icon} />
                <View style={styles.planTextContainer}>
                  <Text
                    style={[
                      styles.planTitle,
                      selectedPlan === 'weekly' && styles.selectedText, // Change text color
                    ]}>
                    Ad-Free for One Week
                  </Text>
                  <Text
                    style={[
                      styles.planSubText,
                      selectedPlan === 'weekly' && styles.selectedText,
                    ]}>
                    1000 Quids
                  </Text>
                </View>

                {/* Show Continue button only when selected */}
                {selectedPlan === 'weekly' ? (
                  <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueText}>Continue</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.arrow}>›</Text>
                )}
              </TouchableOpacity>

              {/* Monthly Plan */}
              <TouchableOpacity
                style={[
                  styles.plan,
                  selectedPlan === 'monthly' && styles.selectedPlan,
                ]}
                onPress={() => handleSelectPlan('monthly')}>
                <View style={styles.iconOutline} />
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

                {/* Show Continue button only when selected */}
                {selectedPlan === 'monthly' ? (
                  <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueText}>Continue</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.arrow}>›</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Footer Info */}
            <Text style={styles.footerText}>
              Ad-free options remove only full-screen ads (pop-ups) for the
              selected period; banner ads remain visible.
            </Text>

            {/* Close Button */}
            {/* <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity> */}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    position: 'absolute',
  },
  container: {
    width: '100%',
    backgroundColor: '#fff',
    // borderRadius: 12,
    padding: 20,
    bottom: 0,
  },
  header: {
    alignItems: 'center',
    marginBottom: 15,
  },
  dragHandle: {
    top: -10,
    width: 40,
    height: 4,
    backgroundColor: 'gray',
    borderRadius: 2,
    // marginBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'left',
    // lineHeight:20,
  },
  balance: {
    fontWeight: 500,
    fontSize: 14,
    color: '#2F0E40',
    marginTop: 5,
    textAlign: 'right',
  },
  negativeBalance: {
    color: '#D33',
    fontWeight: 'bold',
  },
  planContainer: {
    marginTop: 10,
  },
  // plan: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: 15,
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 8,
  //   marginBottom: 10,
  // },
  // selectedPlan: {
  //   backgroundColor: '#392EBD',
  //   borderColor: '#3A56E9',
  // },
  // planTextContainer: {
  //   flex: 1,
  //   marginLeft: 10,
  // },
  // planTitle: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   color: '#fff',
  // },
  // planSubText: {
  //   fontSize: 14,
  //   color: '#fff',
  // },

  plan: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#392EBD',
    borderWidth: 1,
  },
  selectedPlan: {
    backgroundColor: 'blue',
    paddingVertical: 25,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  selectedText: {
    color: 'white',
  },
  continueButton: {
    marginTop:25,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  continueText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 20,
    color: 'black',
  },
});
