// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ImageBackground,
//   SafeAreaView,
//   Dimensions,
//   ScrollView,
//   Image,
//   Modal,
// } from 'react-native';

// import {SvgXml} from 'react-native-svg';
// import {plus_svg, search_button_svg} from '../utils/constant/TabSVGimage';
// import {useTheme} from '../context/ThemeContext';

// import SearchModal from '../components/SearchModal';

// const {width, height} = Dimensions.get('window');

// import img1 from '../images/post1.png';
// import img2 from '../images/post1.png';
// import img3 from '../images/post1.png';
// import img4 from '../images/post1.png';
// import img5 from '../images/post1.png';
// import {navigate} from '../utils/NavigationUtil';

// const mockGroups = [
//   {id: '1', name: 'Group_xyz', members: '36.7k', joined: false, image: img1},
//   {id: '2', name: 'Whisper Refugees', members: '78.1k', joined: false, image: img2},
//   {id: '3', name: 'Deban_Xyz', members: '31.1k', joined: true, image: img3},
//   {id: '4', name: 'Movie Buffs', members: '78.1k', joined: false, image: img4},
//   {id: '5', name: 'Alice Boderland', members: '78.1k', joined: false, image: img5},
//   {id: '6', name: 'Whisper Refugees', members: '78.1k', joined: false, image: img2},
//   {id: '7', name: 'Group_group', members: '78.1k', joined: false, image: img1},
// ];

// const GroupScreen = () => {
//   const [activeTab, setActiveTab] = useState('discover');
//   const [searchText, setSearchText] = useState('');
//   const [groups, setGroups] = useState(mockGroups);
//   const [isSearchModalVisible, setSearchModalVisible] = useState(false);

//   const {isDarkModeOn} = useTheme();

//   const backgroundColor = isDarkModeOn ? '#030303' : '#FFFFFF';
//   const textColor = isDarkModeOn ? '#000000' : '#FFFFFF';

//   const filteredGroups = groups.filter(group => {
//     const inSearch = group.name.toLowerCase().includes(searchText.toLowerCase());
//     const inTab = activeTab === 'discover' ? true : group.joined;
//     return inSearch && inTab;
//   });

//   const handleJoin = id => {
//     const updatedGroups = groups.map(group =>
//       group.id === id ? {...group, joined: !group.joined} : group,
//     );
//     setGroups(updatedGroups);
//   };

//   return (
//     <SafeAreaView style={[styles.container]}>
//       <ImageBackground
//         source={require('../images/headerBg.png')}
//         resizeMode="cover"
//         style={[styles.background]}>
//         <View style={[styles.header]}>
//           <View style={styles.backArrow}>
//             <TouchableOpacity
//               onPress={() => navigate('CreateGroup')}
//               style={{flexDirection: 'row', alignItems: 'center'}}>
//               <SvgXml xml={plus_svg} width={14} height={14} />
//               <Text style={[styles.headerTitle]}>
//                 Create Group
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity
//             style={styles.editButton}
//             onPress={() => setSearchModalVisible(true)}>
//             <SvgXml xml={search_button_svg} width={20} height={20} />
//           </TouchableOpacity>
//         </View>

//         <View style={[styles.mainContainer, {backgroundColor}]}>
//           <View
//             style={[
//               styles.tabContainer,
//               {backgroundColor: isDarkModeOn ? '#191919' : '#EFE7DE'},
//             ]}>
//             <TouchableOpacity
//               onPress={() => setActiveTab('discover')}
//               style={[
//                 styles.tabButton,
//                 activeTab === 'discover' && {
//                   backgroundColor: isDarkModeOn ? '#FFFFFF' : '#392EBD',
//                 },
//               ]}>
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab === 'discover' && styles.activeTabText,
//                   activeTab === 'discover'
//                     ? {color: isDarkModeOn ? '#000000' : '#FFFFFF'}
//                     : undefined,
//                 ]}>
//                 Discover Groups
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => setActiveTab('my')}
//               style={[
//                 styles.tabButton,
//                 activeTab === 'my' && {
//                   backgroundColor: isDarkModeOn ? '#FFFFFF' : '#392EBD',
//                 },
//               ]}>
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab === 'my' && styles.activeTabText,
//                   activeTab === 'my'
//                     ? {color: isDarkModeOn ? '#000000' : '#FFFFFF'}
//                     : undefined,
//                 ]}>
//                 My Groups
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <ScrollView style={{backgroundColor: backgroundColor}}>
//             {filteredGroups.map(item => (
//               <View
//                 key={item.id}
//                 style={[
//                   styles.groupItem,
//                   {backgroundColor},
//                   item.joined && {
//                     backgroundColor: isDarkModeOn ? '#191919' : '#FFFFFF',
//                   },
//                 ]}>
//                 <View style={styles.groupInfo}>
//                   <Image source={item.image} style={styles.groupImage} />
//                   <View>
//                     <Text style={[styles.groupName, {color: textColor}]}>
//                       {item.name}
//                     </Text>
//                     <Text
//                       style={[
//                         styles.groupMembers,
//                         {color: isDarkModeOn ? '#AAAAAA' : '#66645E'},
//                       ]}>
//                       {item.members} members
//                     </Text>
//                   </View>
//                 </View>
//                 {/* <TouchableOpacity
//                   onPress={() => handleJoin(item.id)}
//                   style={[
//                     styles.joinButton,
//                     item.joined && styles.joinedButton,{
//                       backgroundColor:isDarkModeOn ? '#FFFFFF' : '#4B1FA2',
//                     }
//                   ]}>
//                   <Text
//                     style={[
//                       item.joined
//                         ? styles.joinedButtonText
//                         : styles.joinButtonText,{color:isDarkModeOn ? '#000000' : '#FFFFFF'}
//                     ]}>
//                     {item.joined ? 'Joined' : 'Join'}
//                   </Text>
//                 </TouchableOpacity> */}

// <TouchableOpacity
//   onPress={() => {
//     if (!item.joined) {
//       handleJoin(item.id); // Join
//     } else if (item.joined && !item.confirmed) {
//       handleConfirm(item.id); // Confirm to allow leaving later
//     } else {
//       handleLeave(item.id); // Leave
//     }
//   }}
//   style={[
//     styles.joinButton,
//     item.joined && styles.joinedButton,
//     {
//       backgroundColor: isDarkModeOn ? '#FFFFFF' : '#4B1FA2',
//     },
//   ]}>
//   <Text
//     style={[
//       item.joined ? styles.joinedButtonText : styles.joinButtonText,
//       { color: isDarkModeOn ? '#000000' : '#FFFFFF' },
//     ]}>
//     {!item.joined
//       ? 'Join'
//       : item.joined && !item.confirmed
//       ? 'Joined'
//       : 'Leave'}
//   </Text>
// </TouchableOpacity>

//               </View>
//             ))}
//           </ScrollView>
//         </View>
//       </ImageBackground>
//       <Modal
//         visible={isSearchModalVisible}
//         animationType="slide"
//         transparent={false}
//         statusBarTranslucent={true}
//         onRequestClose={() => setSearchModalVisible(false)}
//         style={styles.modalStyle}>
//         <SearchModal onClose={() => setSearchModalVisible(false)} />
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1},
//   mainContainer: {
//     flex: 1,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     overflow: 'hidden',
//   },
//   background: {flex: 1},
//   header: {
//     height: 110,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: width * 0.05,
//     paddingTop: height * 0.05,
//   },
//   backArrow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#2F0E40',
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderRadius: 12,
//   },
//   headerTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginLeft: 5,
//     color: '#FFF',
//   },
//   editButton: {
//     backgroundColor: 'transparent',
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     marginBottom: 16,
//   },
//   tabButton: {
//     flex: 1,
//     paddingVertical: 20,
//     backgroundColor: 'transparent',
//   },
//   tabText: {
//     fontSize: 14,
//     textAlign: 'center',
//     fontWeight: '500',
//   },
//   activeTabText: {
//     fontSize: 14,
//     fontWeight: '700',
//   },
//   groupItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: width * 0.04,
//   },
//   groupInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   groupImage: {
//     width: width * 0.15,
//     height: height * 0.05,
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   groupName: {
//     fontSize: 14,
//     fontWeight: '700',
//     marginBottom: 2,
//   },
//   groupMembers: {
//     fontSize: 10,
//     fontWeight: '500',
//   },
//   joinButton: {
//     backgroundColor: '#4B1FA2',
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//     borderRadius: 10,
//     fontWeight: '600',
//   },
//   joinedButton: {
//     backgroundColor: '#EAE3D5',
//   },
//   joinButtonText: {
//     color: '#fff',
//   },
//   joinedButtonText: {
//     color: '#000',
//   },
//   modalStyle: {
//     margin: 0,
//     width: '100%',
//   },
// });

// export default GroupScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Image,
  Modal,
} from 'react-native';

import {SvgXml} from 'react-native-svg';
import {plus_svg, search_button_svg} from '../utils/constant/TabSVGimage';
import {useTheme} from '../context/ThemeContext';
import SearchModal from '../components/SearchModal';
import {navigate} from '../utils/NavigationUtil';

import img1 from '../images/post1.png';
import img2 from '../images/post1.png';
import img3 from '../images/post1.png';
import img4 from '../images/post1.png';
import img5 from '../images/post1.png';

const {width, height} = Dimensions.get('window');

const mockGroups = [
  {
    id: '1',
    name: 'Group_xyz',
    members: '36.7k',
    joined: false,
    confirmed: false,
    image: img1,
  },
  {
    id: '2',
    name: 'Whisper Refugees',
    members: '78.1k',
    joined: false,
    confirmed: false,
    image: img2,
  },
  {
    id: '3',
    name: 'Deban_Xyz',
    members: '31.1k',
    joined: true,
    confirmed: true,
    image: img3,
  },
  {
    id: '4',
    name: 'Movie Buffs',
    members: '78.1k',
    joined: false,
    confirmed: false,
    image: img4,
  },
  {
    id: '5',
    name: 'Alice Boderland',
    members: '78.1k',
    joined: false,
    confirmed: false,
    image: img5,
  },
  {
    id: '6',
    name: 'Whisper Refugees',
    members: '78.1k',
    joined: false,
    confirmed: false,
    image: img2,
  },
  {
    id: '7',
    name: 'Group_group',
    members: '78.1k',
    joined: false,
    confirmed: false,
    image: img1,
  },
];

const GroupScreen = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchText, setSearchText] = useState('');
  const [groups, setGroups] = useState(mockGroups);
  const [isSearchModalVisible, setSearchModalVisible] = useState(false);

  const {isDarkModeOn} = useTheme();
  const backgroundColor = isDarkModeOn ? '#030303' : '#FFFFFF';
  const textColor = isDarkModeOn ? '#000000' : '#FFFFFF';

  const filteredGroups = groups.filter(group => {
    const inSearch = group.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const inTab = activeTab === 'discover' ? true : group.joined;
    return inSearch && inTab;
  });

  const updateGroupState = (id, updates) => {
    setGroups(prev =>
      prev.map(group => (group.id === id ? {...group, ...updates} : group)),
    );
  };

  const handleJoin = id => {
    updateGroupState(id, {joined: true, confirmed: false});
  };

  const handleConfirm = id => {
    updateGroupState(id, {confirmed: true});
  };

  const handleLeave = id => {
    updateGroupState(id, {joined: false, confirmed: false});
  };

  const getButtonLabel = group => {
    if (!group.joined) return 'Join';
    if (group.joined && !group.confirmed) return 'Joined';
    return 'Leave';
  };

  const handleButtonPress = group => {
    if (!group.joined) {
      handleJoin(group.id);
    } else if (group.joined && !group.confirmed) {
      handleConfirm(group.id);
    } else {
      handleLeave(group.id);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../images/headerBg.png')}
        resizeMode="cover"
        style={styles.background}>
        <View style={styles.header}>
          <View style={styles.backArrow}>
            <TouchableOpacity
              onPress={() => navigate('CreateGroup')}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <SvgXml xml={plus_svg} width={14} height={14} />
              <Text style={styles.headerTitle}>Create Group</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setSearchModalVisible(true)}>
            <SvgXml xml={search_button_svg} width={20} height={20} />
          </TouchableOpacity>
        </View>

        <View style={[styles.mainContainer, {backgroundColor}]}>
          <View
            style={[
              styles.tabContainer,
              {backgroundColor: isDarkModeOn ? '#191919' : '#EFE7DE'},
            ]}>
            {['discover', 'my'].map(tab => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[
                    styles.tabButton,
                    isActive && {
                      backgroundColor: isDarkModeOn ? '#FFFFFF' : '#392EBD',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.tabText,
                      {
                        color: isActive
                          ? isDarkModeOn
                            ? '#000000'
                            : '#FFFFFF'
                          : isDarkModeOn
                          ? '#FFFFFF'
                          : '#000000',
                        fontWeight: isActive ? 'bold' : 'normal',
                      },
                    ]}>
                    {tab === 'discover' ? 'Discover Groups' : 'My Groups'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <ScrollView style={{backgroundColor}}>
            {filteredGroups.map(group => (
              <View
                key={group.id}
                style={[
                  styles.groupItem,
                  {backgroundColor},
                  group.joined && {
                    backgroundColor: isDarkModeOn ? '#191919' : '#FFFFFF',
                  },
                ]}>
                <View style={styles.groupInfo}>
                  <Image source={group.image} style={styles.groupImage} />
                  <View>
                    <Text
                      style={[
                        styles.groupName,
                        {color: isDarkModeOn ? '#FFFFFF' : '#000000'},
                      ]}>
                      {group.name}
                    </Text>
                    <Text
                      style={[
                        styles.groupMembers,
                        {color: isDarkModeOn ? '#AAAAAA' : '#66645E'},
                      ]}>
                      {group.members} members
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => handleButtonPress(group)}
                  style={[
                    styles.joinButton,
                    getButtonLabel(group) === 'Leave' && {
                      backgroundColor: '#FF3B30',
                    }, 
                    getButtonLabel(group) !== 'Leave' &&
                      (group.joined
                        ? {
                            backgroundColor: isDarkModeOn
                              ? '#FFFFFF'
                              : '#EAE3D5',
                          }
                        : {
                            backgroundColor: isDarkModeOn
                              ? '#FFFFFF'
                              : '#4B1FA2',
                          }),
                  ]}>
                  <Text
                    style={[
                      styles.joinButtonText,
                      getButtonLabel(group) === 'Leave' && {color: '#FFFFFF'},
                      getButtonLabel(group) !== 'Leave' &&
                        (group.joined
                          ? {color: isDarkModeOn ? '#000000' : '#000000'}
                          : {color: isDarkModeOn ? '#000000' : '#FFFFFF'}),
                    ]}>
                    {getButtonLabel(group)}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </ImageBackground>

      <Modal
        visible={isSearchModalVisible}
        animationType="slide"
        transparent={false}
        statusBarTranslucent={true}
        onRequestClose={() => setSearchModalVisible(false)}
        style={styles.modalStyle}>
        <SearchModal onClose={() => setSearchModalVisible(false)} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  mainContainer: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  background: {flex: 1},
  header: {
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
  },
  backArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2F0E40',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#FFF',
  },
  editButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    // color: '#fff',
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: '700',
  },
  groupItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: width * 0.04,
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  groupImage: {
    width: width * 0.15,
    height: height * 0.05,
    borderRadius: 10,
    marginRight: 10,
  },
  groupName: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  groupMembers: {
    fontSize: 10,
    fontWeight: '500',
  },
  joinButton: {
    backgroundColor: '#4B1FA2',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
    fontWeight: '600',
  },
  joinedButton: {
    backgroundColor: '#EAE3D5',
  },
  joinButtonText: {
    color: '#fff',
  },
  joinedButtonText: {
    color: '#000',
  },
  modalStyle: {
    margin: 0,
    width: '100%',
  },
});

export default GroupScreen;
