import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';


import {SvgXml} from 'react-native-svg';
import {
  arrow_svg,
  avatar_svg,
  back_arrow_svg,
  quid_svg,
} from '../../utils/constant/TabSVGimage';
import { goBack } from '../../utils/NavigationUtil';
const { width, height } = Dimensions.get('window');

const MyQuidsScreen = () => {
  
  const [text, setText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../images/headerBg.png')}
        resizeMode="cover"
        style={styles.background}>
        
          <View style={styles.header}>
            <View style={styles.backArrow}>
              <TouchableOpacity onPress={goBack}>
                <SvgXml xml={back_arrow_svg} width={30} height={30} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>My Quids</Text>
            </View>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => Alert.alert('Watch & Earn')}>
              <Text style={styles.editButtonText}>Watch & Earn</Text>
            </TouchableOpacity>
          </View>
        
        <View style={styles.mainContainer}>
          <View style={styles.avatarContainer}>
            <SvgXml xml={quid_svg} width={80} height={80} />
          </View>

          <Text style={styles.headingText}>You have 28 Quids!</Text>

          <Text style={{textAlign: 'center', fontWeight: 400, fontSize: 12}}>
            The quick brown fox jumps over the lazy dog. Swiftly running through
            the pastel fields, it dashes past blooming cherry blossoms and soft
            pink petals drifting in the breeze. With every leap, the fox paints
            the sky with hues of warmth and elegance, blending seamlessly into a
            dreamscape of gentle tones and quiet serenity
          </Text>
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
    padding: width * 0.08,
  },
  background: {
    flex: 1,
  },
  header: {
    height: height * 0.14,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.03,
  },
  backArrow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#FFC631',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  editButtonText: {
    color: '#000000',
    fontWeight: 700,
    fontSize: 14,
  },
  headingText: {
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 40,
  },
});

export default MyQuidsScreen;
