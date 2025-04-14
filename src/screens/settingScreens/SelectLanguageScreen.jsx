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
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  back_arrow_svg,
  Language_Selectd_SVG,
} from '../../utils/constant/TabSVGimage';
import {goBack, navigate} from '../../utils/NavigationUtil';
// import { Ionicons } from '@expo/vector-icons'; // or 'react-native-vector-icons/Ionicons'

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
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  return (
    <SafeAreaView style={styles.container}>
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
        <View style={styles.contentWrapper}>
          <Text style={styles.subHeading}>SELECT APP LANGUAGE</Text>
          <View style={styles.card}>
            <FlatList
              data={languages}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => setSelectedLanguage(item)}
                  style={[
                    styles.languageOption,
                    selectedLanguage === item && styles.selectedOption,
                  ]}>
                  <Text style={styles.languageText}>{item}</Text>
                  {selectedLanguage === item && (
                    <SvgXml xml={Language_Selectd_SVG} width={16} height={16} />
                  )}
                </Pressable>
              )}
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
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
  },
  contentWrapper: {
    flex:1,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // justifyContent: 'center',
  },

  header: {
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#fffef4',
    // margin:16,
    // padding: 16,
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
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderTopColor: '#eee8d5',
    borderTopWidth: 1,
  },
  selectedOption: {
    backgroundColor: '#eee8d5',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  languageText: {
    fontSize: 12,
    fontWeight: 500,
  },
});

export default SelectLanguage;
