import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  back_arrow_svg, 
  Language_Selectd_SVG,
} from '../../utils/constant/TabSVGimage';
import {goBack, navigate} from '../../utils/NavigationUtil';
const {width, height} = Dimensions.get('window');
import { useTheme } from '../../context/ThemeContext';

const languages = [
  'English',
  'Hindi',
  'Spanish',
  'French',
  'German',
  'Portuguese',
  'Arabic',
];

const SelectLanguage = () => {
const {isDarkModeOn} = useTheme();
const backgroundColor = isDarkModeOn ? '#000' : '#fff';
const cardBackgroundColor = isDarkModeOn ? '#191919' : '#fffef4';
// const textColor = isDarkModeOn ? '#fff' : '#000';

  const [selectedLanguage, setSelectedLanguage] = useState('English');

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
          <Text style={styles.headerTitle}>Select Language</Text>
        </View>

        {/* Content */}
        <View style={[styles.contentWrapper, {backgroundColor}]}>
          <Text style={styles.subHeading}>SELECT APP LANGUAGE</Text>
          <View style={[styles.card, {backgroundColor: cardBackgroundColor}]}>
            <FlatList
              data={languages}
              keyExtractor={item => item}
              renderItem={({item, index}) => {
                const isSelected = selectedLanguage === item;
                const textColor =
                  isDarkModeOn
                    ? isSelected
                      ? '#000' // Dark mode & selected
                      : '#fff' // Dark mode & not selected
                    : '#000';  // Light mode (always black)
              
                return (
                  <Pressable
                    onPress={() => setSelectedLanguage(item)}
                    style={[
                      styles.languageOption,
                      isSelected && styles.selectedOption,
                      index === 0 && {
                        borderTopWidth: 0,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                      },
                      index === languages.length - 1 && {
                        borderBottomWidth: 0,
                        borderBottomLeftRadius: 16,
                        borderBottomRightRadius: 16,
                      },
                    ]}>
                    <Text style={[styles.languageText, {color: textColor}]}>{item}</Text>
                    {isSelected && (
                      <SvgXml xml={Language_Selectd_SVG} width={16} height={16} />
                    )}
                  </Pressable>
                );
              }}
              
            />
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
  background: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    height: height * 0.14,
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.03,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  card: {
    borderRadius: 20,
  },
  subHeading: {
    fontWeight: '700',
    fontSize: 13,
    marginBottom: 12,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderBottomColor: '#eee8d5',
    borderBottomWidth: 1,
  },
  selectedOption: {
    backgroundColor: '#eee8d5',
  },
  languageText: {
    fontSize: 12,
    fontWeight: 500,
  },
});

export default SelectLanguage;
