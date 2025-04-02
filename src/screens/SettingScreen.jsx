import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';

import Svg, {SvgXml} from 'react-native-svg';
import {
  arrow_svg,
  avatar_svg,
  back_arrow_svg,
} from '../utils/constant/TabSVGimage';

const SettingScreen = () => {
  const [checked, setChecked] = useState(
    Array(notifications?.length).fill(false),
  );


  const navigation = useNavigation();

  const toggleCheckbox = index => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  const profileOptions = [
    'Profile Details',
    'My Quids',
    'My Subscriptions',
    'Chat Votes',
    'App Language',
  ];

  const notifications = [
    'Poll',
    'Replies',
    'Sister Replies',
    'Likes',
    'Chat',
    'Local',
    'Groups',
    'School',
  ];

  const spreadWorld = [
    'Follow us on Instagram',
    'Follow us on Pintrest',
    'Follow us on Tik Tok',
    'Rate our app',
  ];
  const support = ['Email Support', 'FAQ', 'Terms of Use', 'Privacy Policy'];

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../images/headerBg.png')}
        resizeMode="cover"
        style={styles.background}>
        <ImageBackground
          source={require('../images/headerBg.png')}
          resizeMode="cover">
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <SvgXml xml={back_arrow_svg} width={30} height={30} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Setting</Text>
          </View>
        </ImageBackground>

        <View style={styles.mainContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.container}>
            <View style={styles.profileSection}>
              {/* <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatar} /> */}
              <View style={styles.avatar}>
                <SvgXml xml={avatar_svg} width={80} height={80} />
              </View>

              <Text style={styles.username}>cyan_blackbird</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Name</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>MY PROFILE</Text>
            <View style={styles.card}>
              {profileOptions.map((option, index) => (
                <TouchableOpacity key={index} style={styles.optionItem}>
                  <Text style={styles.optionText}>{option}</Text>
                  <SvgXml xml={arrow_svg} width={7.37} height={12} />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>PUSH NOTIFICATIONS</Text>
            <View style={styles.card}>
              {notifications.map((notif, index) => (
                <View key={index} style={styles.notificationItem}>
                  <Text style={styles.optionText}>{notif}</Text>
                  {/* <CheckBox value={checked[index]} onValueChange={() => toggleCheckbox(index)} /> */}
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>SPREAD THE WORLD</Text>
            <View style={styles.card}>
              {spreadWorld.map((spread, index) => (
                <View key={index} style={styles.notificationItem}>
                  <Text style={styles.optionText}>{spread}</Text>
                  {/* <CheckBox value={checked[index]} onValueChange={() => toggleCheckbox(index)} /> */}
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>SUPPORT</Text>
            <View style={styles.card}>
              {support.map((supp, index) => (
                <View key={index} style={styles.notificationItem}>
                  <Text style={styles.optionText}>{supp}</Text>
                  {/* <CheckBox value={checked[index]} onValueChange={() => toggleCheckbox(index)} /> */}
                </View>
              ))}
            </View>

            <View style={styles.logo}>
                {/* <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatar} /> */}
               <Image source={require("../images/Hush.png")} style={{width:100,height:100,resizeMode: 'contain',}} />
            </View>
          </ScrollView>
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
    padding: 20,
  },
  background: {
    flex: 1,
  },
  header: {
    height: 110,
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
  profileSection: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    alignItems: 'center',
    borderRadius: 80,
    borderWidth: 0.3,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  editButton: {
    backgroundColor: '#5A31F4',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 700,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginTop: 40,
    marginBottom: 8,
  },
  card: {
    borderRadius: 10,
    padding: 10,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 150, 
    height: 150, 
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
}

});

export default SettingScreen;
