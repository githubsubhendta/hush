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
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  back_arrow_svg,
  global_svg,
  GroupIcon,
  GroupIconBlack,
  Selected_SVG,
  Selected_Svg_dark,
  SVG_not_slected,
  SVG_selected,
} from '../utils/constant/TabSVGimage';
import {goBack, navigate} from '../utils/NavigationUtil';
import {useTheme} from '../context/ThemeContext';

const {width, height} = Dimensions.get('window');

const PostScreen = () => {

  const {isDarkModeOn} = useTheme();
  const backgroundColor = isDarkModeOn ? '#030303' : '#FFFFFF';
  const bottomBackgroundColor = isDarkModeOn ? '#141414' : '#fffef5';
  const nextButtonColor = isDarkModeOn ? '#fff' : '#392EBD';
  const textColor = isDarkModeOn ? '#fff' : '#000';
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    {
      category: 'Global',
      items: [
        {
          title: 'Everyone',
          description: 'Your post will be visible to everyone',
          members: null,
          image: require('../images/post1.png'),
        },
      ],
    },
    {
      category: 'Post to a Group',
      items: [
        {
          title: 'Movie Buffs',
          members: '78.1k members',
          image: require('../images/post1.png'),
        },
        {
          title: 'Alice Boderland',
          members: '78.1k members',
          image: require('../images/post1.png'),
        },
        {
          title: 'Whisper Refugees',
          members: '78.1k members',
          image: require('../images/post1.png'),
        },
      ],
    },
  ];

  const handleSelect = option => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(prev => prev.filter(item => item !== option));
    } else {
      setSelectedOptions(prev => [...prev, option]);
    }
  };

  const getCategoryIcon = category => {
    switch (category) {
      case 'Global':
        return <SvgXml xml={global_svg} width={18} height={18} />;
      case 'Post to a Group':
        return <SvgXml xml={isDarkModeOn? GroupIconBlack : GroupIcon} width={18} height={18} />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    console.log('Selected options:', selectedOptions);
    navigate('WritePost')
  };

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
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack}>
            <SvgXml xml={back_arrow_svg} width={30} height={30} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Post To</Text>
        </View>

        <View style={[styles.contentWrapper, {backgroundColor}]}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {options.map((section, sectionIndex) => (
              <View key={sectionIndex} style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionIcon}>
                    {getCategoryIcon(section.category)}
                  </View>
                  <Text style={[styles.sectionTitle,{color:textColor}]}>{section.category}</Text>
                </View>

                {section.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={itemIndex}
                    style={[
                      styles.option,
                      selectedOptions.includes(item.title) &&
                        (isDarkModeOn
                          ? { backgroundColor: '#141414' }
                          : { backgroundColor: '#f0f8ff' }),
                    ]}
                    
                    onPress={() => handleSelect(item.title)}>
                    <View style={styles.optionContent}>
                      <Image source={item.image} style={styles.groupImage} />
                      <View style={styles.optionTextWrapper}>
                        <Text style={[styles.optionTitle,{color:textColor}]}>{item.title}</Text>
                        {item.description && (
                          <Text style={[styles.optionDescription,{color:textColor}]}>
                            {item.description}
                          </Text>
                        )}
                        {item.members && (
                          <Text style={[styles.optionMembers,{color:textColor}]}>
                            {item.members}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View style={styles.optionCheck}>
                      { selectedOptions.includes(item.title) ? (
                        <SvgXml xml={isDarkModeOn ? SVG_selected :Selected_SVG} width={25} height={25} />
                      ) : (
                        <SvgXml xml={isDarkModeOn ?Selected_Svg_dark : SVG_not_slected} width={25} height={25} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>

        </View>
        <View style={[styles.bottomBar, {backgroundColor: bottomBackgroundColor}]}>
        <TouchableOpacity style={[styles.nextButton,{backgroundColor:nextButtonColor}]} onPress={handleNext}>
            <Text style={[styles.nextButtonText,{color : isDarkModeOn ? '#000' : '#fff'}]}>Next</Text>
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
    width: '100%',
    height: '100%',
  },
  header: {
    height: height * 0.12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 25,
  },
  headerTitle: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: '600',
    marginLeft: 8,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  scrollContainer: {
    paddingBottom: height * 0.15,
    paddingTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sectionIcon: {
    paddingRight: 8,
    paddingLeft: 10,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    width: '100%',
    paddingHorizontal: width * 0.04,
  },
  selectedOption: {
    // backgroundColor: '#f0f8ff',
    borderRadius: 10,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  groupImage: {
    width: width * 0.18,
    height: width * 0.14,
    marginRight: 12,
    borderRadius: 10,
  },
  optionTextWrapper: {
    flex: 1,
  },
  optionTitle: {
    fontSize: width * 0.04,
    fontWeight: '700',
  },
  optionDescription: {
    fontSize: width * 0.030,
    marginTop: 2,
  },
  optionMembers: {
    fontSize: width * 0.030,
    marginTop: 2,
  },
  optionCheck: {
    paddingLeft: 10,
  },
  bottomBar: {
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: width * 0.03,
    paddingBottom: Platform.OS === 'android' ? 10 : 20,
  },
  nextButton: {
    borderRadius: 10,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  nextButtonText: {
    fontSize: width * 0.04,
    fontWeight: '500',
  },
});


export default PostScreen;
