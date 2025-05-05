import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  back_arrow_svg,
  Selected_Svg_dark,
  SVG_not_slected,
  SVG_selected,
} from '../utils/constant/TabSVGimage';
import {goBack} from '../utils/NavigationUtil';
import { useTheme } from '../context/ThemeContext';

const {width, height} = Dimensions.get('window');

const CreateGroup = () => {
const {isDarkModeOn} = useTheme();
  const backgroundColor = isDarkModeOn ? '#030303' : '#fff';
  const textColor = isDarkModeOn ? '#fff' : '#000';
  const footerBgColor = isDarkModeOn ? '#141414' : '#FFFCF5';
  const button_BG_COLOR = isDarkModeOn ? '#FFFFFF' : '#4B30DD';
  const button_TEXT_COLOR = isDarkModeOn ? '#000000' : '#FFFFFF';

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selected, setSelected] = useState(false);

  const handleToggle = () => {
    setSelected(!selected);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../images/headerBg.png')}
        resizeMode="cover"
        style={styles.background}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <SvgXml xml={back_arrow_svg} width={30} height={30} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Group</Text>
        </View>

        <View style={{flex: 1}}>
          <View style={[styles.contentWrapper, {backgroundColor}]}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled">
              <Text style={[styles.label, {color: textColor}]}>
                Group Name <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, {backgroundColor}]}
                placeholder="Enter group name..."
                placeholderTextColor="#CCC8BC"
                value={name}
                onChangeText={setName}
              />

              <Text style={[styles.label, {color: textColor}]}>
                Group Description & Rules <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter group description..."
                placeholderTextColor="#CCC8BC"
                value={description}
                onChangeText={setDescription}
                multiline
              />
            </ScrollView>
          </View>

          <View style={[styles.footerContainer, {backgroundColor: footerBgColor}]}>
            <TouchableOpacity
              style={styles.nsfwContainer}
              onPress={handleToggle}
              activeOpacity={0.8}>
              <Text style={styles.nsfwText}>NSFW</Text>
              <SvgXml
                xml={isDarkModeOn ? (selected ? SVG_selected : Selected_Svg_dark) : (selected ? SVG_selected : SVG_not_slected)}
                width={18}
                height={18}
              />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.chooseImageBtn, {backgroundColor: button_BG_COLOR}]}>
              <Text style={[styles.chooseImageText,{color:button_TEXT_COLOR}]}>Choose Image</Text>
            </TouchableOpacity>
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
  header: {
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 700,
    marginLeft: 8,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  required: {
    color: 'red',
  },
  input: {
    
    borderColor: '#E4E4E4',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#000',
    marginBottom: 40,
  },
  textArea: {
    height: height * 0.25,
    textAlignVertical: 'top',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFCF5',
    paddingVertical: 16,
    paddingHorizontal: 30,
  },
  nsfwContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nsfwText: {
    fontSize: 12,
    color: '#FF3E3E',
    fontWeight: 700,
    paddingRight: 8,
  },

  chooseImageBtn: {
    // backgroundColor: '#4B30DD',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  chooseImageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 500,
  },
});

export default CreateGroup;
