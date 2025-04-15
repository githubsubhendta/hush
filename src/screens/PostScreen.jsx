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
  Selected_SVG,
  SVG_not_slected,
} from '../utils/constant/TabSVGimage';
import {goBack} from '../utils/NavigationUtil';

const {width, height} = Dimensions.get('window');

const PostScreen = () => {
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
        return <SvgXml xml={global_svg} width={14} height={14} />;
      case 'Post to a Group':
        return <SvgXml xml={GroupIcon} width={14} height={14} />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    console.log('Selected options:', selectedOptions);
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

        <View style={styles.contentWrapper}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {options.map((section, sectionIndex) => (
              <View key={sectionIndex} style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionIcon}>
                    {getCategoryIcon(section.category)}
                  </View>
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
                      <Image source={item.image} style={styles.groupImage} />
                      <View style={styles.optionTextWrapper}>
                        <Text style={styles.optionTitle}>{item.title}</Text>
                        {item.description && (
                          <Text style={styles.optionDescription}>
                            {item.description}
                          </Text>
                        )}
                        {item.members && (
                          <Text style={styles.optionMembers}>
                            {item.members}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View style={styles.optionCheck}>
                      {selectedOptions.includes(item.title) ? (
                        <SvgXml xml={Selected_SVG} width={20} height={20} />
                      ) : (
                        <SvgXml xml={SVG_not_slected} width={20} height={20} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>

          
        </View>
        <View style={styles.bottomBar}>
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
  background: {
    flex: 1,
  },
  header: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop:25,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  scrollContainer: {
    paddingBottom: 120,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionIcon: {
    paddingRight: 8,
  },
  sectionTitle: {
    fontSize: Platform.isPad ? 20 : 18,
    fontWeight: '700',
    color: '#000',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    marginBottom: 10,
    width: '100%',
  },
  selectedOption: {
    backgroundColor: '#f0f8ff',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  groupImage: {
    width: 80,
    height: 60,
    marginRight: 12,
    borderRadius: 10,
  },
  optionTextWrapper: {
    flex: 1,
  },
  optionTitle: {
    fontSize: Platform.isPad ? 16 : 14,
    fontWeight: '700',
    color: '#000',
  },
  optionDescription: {
    fontSize: Platform.isPad ? 14 : 12,
    color: '#666',
    marginTop: 2,
  },
  optionMembers: {
    fontSize: Platform.isPad ? 14 : 12,
    color: '#888',
    marginTop: 2,
  },
  optionCheck: {
    paddingLeft: 10,
  },
  bottomBar: {
    width: '100%',
    backgroundColor: '#fffef5',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  nextButton: {
    backgroundColor: '#392EBD',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  
  nextButtonText: {
    color: '#fff',
    fontSize: Platform.isPad ? 16 : 14,
    fontWeight: '500',
  },
});

export default PostScreen;
