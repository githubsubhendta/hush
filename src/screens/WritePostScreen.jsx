import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  back_arrow_svg,
  Selected_SVG,
  Selected_Svg_dark,
  SVG_not_slected,
  SVG_selected,
} from '../utils/constant/TabSVGimage';
import {goBack} from '../utils/NavigationUtil';
import {useTheme} from '../context/ThemeContext';

const WritePost = () => {
  const {isDarkModeOn} = useTheme();
  const backgroundColor = isDarkModeOn ? '#030303' : '#FFFFFF';
  const bottomBackgroundColor = isDarkModeOn ? '#191919' : '#fffef5';
  const ChooseButtonColor = isDarkModeOn ? '#fff' : '#392EBD';
  const textColor = isDarkModeOn ? '#fff' : '#000';

  const [isNfsw, setIsNfsw] = useState(false);
  const [isDM, setIsDM] = useState(false);
  const {width, height} = useWindowDimensions();

  const handleToggle = () => setIsNfsw(!isNfsw);
  const handleDMToggle = () => setIsDM(!isDM);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../images/headerBg.png')}
        resizeMode="cover"
        style={styles.background}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View
          style={[
            styles.header,
            {paddingTop: Platform.OS === 'android' ? 40 : 25},
          ]}>
          <TouchableOpacity onPress={goBack}>
            <SvgXml xml={back_arrow_svg} width={30} height={30} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, {fontSize: width * 0.045}]}>
            Write Post
          </Text>
        </View>

        <View style={[styles.contentWrapper, {backgroundColor}]}>
          <TextInput
            placeholder="Write your thoughts here & pick a relevant image from the next step..."
            placeholderTextColor={textColor}
            style={[
              styles.input,
              {
                color: textColor,
                width: width * 0.9,
                fontSize: width * 0.07,
              },
            ]}
            multiline
            numberOfLines={10}
            fontWeight="700"
            selectionColor="#392EBD"
            textAlign="center"
            textAlignVertical="center"
          />
        </View>

        <View
          style={[styles.bottomBar, {backgroundColor: bottomBackgroundColor}]}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
            <TouchableOpacity
              style={styles.nsfwContainer}
              onPress={handleToggle}
              activeOpacity={0.8}>
              <Text style={styles.nsfwText}>NSFW</Text>
              <SvgXml
                xml={
                  isNfsw
                    ? isDarkModeOn
                      ? SVG_selected
                      : Selected_SVG
                    : isDarkModeOn
                    ? Selected_Svg_dark
                    : SVG_not_slected
                }
                width={18}
                height={18}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nsfwContainer}
              onPress={handleDMToggle}
              activeOpacity={0.8}>
              <Text style={[styles.nsfwText,{color: isDarkModeOn ? '#FFFFFF' :'#FF3E3E'}]}>DM</Text>
              <SvgXml
                xml={
                  isDM
                    ? isDarkModeOn
                      ? SVG_selected
                      : Selected_SVG
                    : isDarkModeOn
                    ? Selected_Svg_dark
                    : SVG_not_slected
                }
                width={18}
                height={18}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.nextButton,{backgroundColor:ChooseButtonColor}]} onPress={() => {}}>
            <Text style={[styles.nextButtonText,{color:isDarkModeOn ? '#000' : '#fff'}]}>Choose Image</Text>
          </TouchableOpacity>
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
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  contentWrapper: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  input: {
    padding: 10,
    lineHeight: 30,
    fontSize: 24,
    textAlign: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  nsfwContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nsfwText: {
    fontSize: 12,
    color: '#FF3E3E',
    fontWeight: '700',
    paddingRight: 8,
  },
  nextButton: {
    backgroundColor: '#392EBD',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default WritePost;
