import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';

import {SvgXml} from 'react-native-svg';
import {
  avatar_svg,
  back_arrow_svg,
} from '../../utils/constant/TabSVGimage';
import { goBack } from '../../utils/NavigationUtil';

const { width, height } = Dimensions.get('window');

const EditUserProfile = () => {
  
  const [text, setText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../images/headerBg.png')}
        resizeMode="cover"
        style={styles.background}>
        <ImageBackground
          source={require('../../images/headerBg.png')}
          resizeMode="cover">
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack}>
              <SvgXml xml={back_arrow_svg} width={width * 0.08} height={width * 0.08} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Display Name</Text>
          </View>
        </ImageBackground>
        <View style={styles.mainContainer}>
          <View style={styles.avatarContainer}>
            <SvgXml xml={avatar_svg} width={width * 0.2} height={width * 0.2} />
          </View>

          <Text style={styles.editText}>Edit Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter New Name"
            placeholderTextColor={'gray'}
            value={text}
            onChangeText={setText}
          />

          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => Alert.alert('Name Change Successfully')}>
            <Text style={styles.editButtonText}>Change</Text>
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
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.03,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginLeft: width * 0.05,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  editText: {
    fontSize: width * 0.04,
    fontWeight: '500',
    textAlign: 'left',
    color: '#333',
    paddingLeft: width * 0.01,
  },
  input: {
    height: height * 0.05,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginVertical: height * 0.015,
    fontSize: width * 0.035,
    color: '#000',
  },
  editButton: {
    width: width * 0.25,
    backgroundColor: '#392EBD',
    paddingVertical: height * 0.015,
    borderRadius: 10,
    marginTop: height * 0.05,
    alignSelf: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFEF4',
    fontWeight: '700',
    fontSize: width * 0.04,
  },
});

export default EditUserProfile;
