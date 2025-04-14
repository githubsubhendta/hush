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
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  back_arrow_svg,
  global_svg,
  GroupIcon,
  Language_Selectd_SVG,
  Selected_SVG,
  SVG_not_slected,
} from '../utils/constant/TabSVGimage';
import {goBack} from '../utils/NavigationUtil';
// import { Ionicons } from '@expo/vector-icons'; // or 'react-native-vector-icons/Ionicons'

const {width, height} = Dimensions.get('window');
const PostSCreen = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    {
      category: 'Global',
      items: [
        {
          title: 'Everyone',
          description: 'Your post will be visible to everyone',
          members: null,
        },
      ],
    },
    {
      category: 'Post to a Group',
      items: [
        {
          title: 'Movie Buffs',
          members: '78.1k members',
        },
        {
          title: 'Alice Boderland',
          members: '78.1k members',
        },
        {
          title: 'Whisper Refugees',
          members: '78.1k members',
        },
      ],
    },
  ];

  const handleSelect = option => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(prev => prev.filter(item => item !== option)); // remove
    } else {
      setSelectedOptions(prev => [...prev, option]); // add
    }
  };

  const getCategoryIcon = category => {
    switch (category) {
      case 'Global':
        return <SvgXml xml={global_svg} width={14} height={14} />;
      case 'Post to a Group':
        return <SvgXml xml={GroupIcon} width={14} height={14} />;

      default:
        return null;
    }
  };

  const handleNext = () => {
    // Handle next button action
    console.log('Selected option:', selectedOption);
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

        {/* Content */}
        <View style={styles.contentWrapper}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {options.map((section, sectionIndex) => (
              <View key={sectionIndex} style={styles.section}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'left',
                    alignItems: 'center',
                  }}>
                  <Text style={{paddingRight: 10}}>
                    {' '}
                    {getCategoryIcon(section.category)}
                  </Text>
                  <Text style={styles.sectionTitle}>{section.category}</Text>
                </View>
                {section.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={itemIndex}
                    style={[
                      styles.option,
                      selectedOptions.includes(item.title) &&
                        styles.selectedOption,
                    ]}
                    onPress={() => handleSelect(item.title)}>
                    <View style={styles.optionContent}>
                      <Text style={styles.optionTitle}>{item.title}</Text>
                      {item.description && (
                        <Text style={styles.optionDescription}>
                          {item.description}
                        </Text>
                      )}
                      {item.members && (
                        <Text style={styles.optionMembers}>{item.members}</Text>
                      )}
                    </View>
                    {selectedOptions.includes(item.title) ? (
                      <SvgXml xml={Selected_SVG} width={20} height={20} />
                    ) : (
                      <SvgXml xml={SVG_not_slected} width={20} height={20} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
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
  contentWrapper: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: 'center',
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

  scrollContainer: {
    paddingBottom: 150,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: Platform.isPad ? 20 : 18,
    fontWeight: '700',
    color: '#000000',
    paddingVertical: 15,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  selectedOption: {
    backgroundColor: '#f0f8ff',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: Platform.isPad ? 16 : 14,
    fontWeight: '700',
    color: '#00000',
    marginBottom: 3,
  },
  optionDescription: {
    fontSize: Platform.isPad ? 16 : 14,
    color: '#666',
  },
  optionMembers: {
    fontSize: Platform.isPad ? 16 : 14,
    color: '#888',
    marginTop: 3,
  },
  selectedIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1e88e5',
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fffef4',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: Platform.isPad ? 18 : 16,
    fontWeight: 'bold',
  },
});

export default PostSCreen;
