import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import {SvgXml} from 'react-native-svg';
import {avatar_svg, back_arrow_svg} from '../../utils/constant/TabSVGimage';
import {goBack} from '../../utils/NavigationUtil';
import { useTheme } from '../../context/ThemeContext';

const {width, height} = Dimensions.get('window');

const ProfileDetails = () => {

const {isDarkModeOn} = useTheme();
  const backgroundColor = isDarkModeOn ? '#000' : '#fff';
const labelTextColor = isDarkModeOn ? '#fff' : '#000';

  const genders = ['Male', 'Female', 'Other'];
  const ageGroups = [
    '15-17',
    '18-20',
    '21-25',
    '26-29',
    '30-35',
    '36-44',
    '45+',
  ];

  const [selectedGender, setSelectedGender] = useState('Male');
  const [selectedAge, setSelectedAge] = useState('45+');

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <ImageBackground
        source={require('../../images/headerBg.png')}
        resizeMode="cover"
        style={styles.background}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack}>
            <SvgXml xml={back_arrow_svg} width={30} height={30} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile Details</Text>
        </View>

        <View style={[styles.mainContainer, {backgroundColor}]}>
          <View style={styles.avatarContainer}>
            <SvgXml xml={avatar_svg} width={80} height={80} />
          </View>

          <Text style={[styles.label, {color: labelTextColor}]}>
            I AM <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.row}>
            {genders.map(gender => (
              <TouchableOpacity
                key={gender}
                onPress={() => setSelectedGender(gender)}
                style={[
                  styles.button,
                  selectedGender === gender
                    ? styles.selectedButton
                    : styles.unselectedButton,
                ]}>
                <Text
                  style={[
                    styles.buttonText,{color: labelTextColor},
                    selectedGender === gender && styles.selectedButtonText,
                  ]}>
                  {gender}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.label, {color: labelTextColor}]}>
            MY AGE <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.ageGrid}>
            {ageGroups.map(age => (
              <TouchableOpacity
                key={age}
                onPress={() => setSelectedAge(age)}
                style={[
                  styles.ageButton,
                  selectedAge === age
                    ? styles.selectedButton
                    : styles.unselectedButton,
                ]}>
                <Text
                  style={[
                    styles.buttonText,{color: labelTextColor},
                    selectedAge === age && styles.selectedButtonText,
                  ]}>
                  {age}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.label, {color: labelTextColor}]}>
            MY LOCATION <Text style={styles.required}>*</Text>
          </Text>
          <View style={[styles.locationBox,{backgroundColor:isDarkModeOn ? '#191919':'#EAEAEA'}]}>
            <Text style={[styles.locationText,{color:labelTextColor}]}>California, USA</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    padding: width * 0.05,
  },
  background: {
    flex: 1,
  },
  header: {
    height: height * 0.14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 20,
  },
  required: {
    color: 'red',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: width * 0.08,
    borderWidth: 1,
    borderColor: '#EEE8D5',
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedButton: {
    backgroundColor: '#EAEAEA',
    borderColor: '#fff',
  },
  unselectedButton: {
    borderColor: '#CCC',
  },
  selectedButtonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonText: {
    color: '#66645E',
    fontSize: 12,
    textAlign: 'center',
  },
  ageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  ageButton: {
    width: '30%',
    borderColor: '#EAEAEA',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
  },
  locationBox: {
    marginTop: 10,
    padding: 15,
    // backgroundColor: '#EAEAEA',
    borderRadius: 10,
  },
  locationText: {
    fontSize: 16,
    textAlign: 'center',
    // color: '#555',
  },
});

export default ProfileDetails;
