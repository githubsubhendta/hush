// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   ImageBackground,
//   StatusBar,
// } from 'react-native';
// import {SvgXml} from 'react-native-svg';
// import {
//   back_arrow_svg,
//   plus_svg,
//   search_button_svg,
//   search_svg,
// } from '../utils/constant/TabSVGimage';

// const SearchModal = ({onClose}) => {
//   const recentSearches = ['Alice', 'Whisper', 'Grou', 'Piku'];

//   const visitedGroups = [
//     {
//       name: 'Alice Boderland',
//       members: '78.1k members',
//       image: 'https://via.placeholder.com/48x48.png?text=👁️',
//       nsfw: false,
//     },
//     {
//       name: 'Whisper Refugees',
//       members: '78.1k members',
//       image: 'https://via.placeholder.com/48x48.png?text=🌅',
//       nsfw: false,
//     },
//     {
//       name: 'Group__group',
//       members: '36.7k members',
//       image: 'https://via.placeholder.com/48x48.png?text=🏜️',
//       nsfw: false,
//     },
//     {
//       name: 'Whisper Refugees',
//       members: '78.1k members',
//       image: 'https://via.placeholder.com/48x48.png?text=🌸',
//       nsfw: true,
//     },
//   ];

//   return (
//     <View style={styles.container}>
//       {/* <StatusBar
//         translucent
//         backgroundColor="transparent"
//         barStyle="light-content"
//       /> */}

//       <ImageBackground
//         source={require('../images/headerBg.png')}
//         resizeMode="cover"
//         imageStyle={{opacity: 1}}>
//         <StatusBar
//           translucent
//           backgroundColor="transparent"
//           barStyle="light-content"
//         />
//         <View style={styles.header}>
//           <View style={styles.backArrow}>
//             <TouchableOpacity onPress={onClose}>
//               <SvgXml xml={back_arrow_svg} width={30} height={30} />
//             </TouchableOpacity>

//             <View style={styles.searchBarContainer}>
//               <SvgXml xml={search_svg} width={14} height={14} />
//               <TextInput
//                 placeholder="Search"
//                 placeholderTextColor="#ccc"
//                 style={styles.searchInput}
//               />
//             </View>
//           </View>
//         </View>
//       </ImageBackground>

//       <View style={styles.content}>
//         <Text style={styles.sectionTitle}>Recent Searches</Text>
//         {recentSearches.map((item, index) => (
//           <View key={index} style={styles.recentSearchItem}>
//             <Text style={styles.recentSearchText}>{item}</Text>
//             {/* You can use Ionicons for close icon if needed */}
//           </View>
//         ))}

//         <View style={styles.recentGroupsHeader}>
//           <Text style={styles.sectionTitle}>Recently Visited Groups</Text>
//           <TouchableOpacity>
//             <Text style={styles.clearRecent}>Clear recent</Text>
//           </TouchableOpacity>
//         </View>

//         {visitedGroups.map((group, index) => (
//           <View key={index} style={styles.groupItem}>
//             <View style={styles.groupLeft}>
//               <Image source={{uri: group.image}} style={styles.groupImage} />
//               <View>
//                 <Text style={styles.groupName}>{group.name}</Text>
//                 <Text style={styles.groupMembers}>{group.members}</Text>
//               </View>
//             </View>
//             <View style={styles.groupRight}>
//               {group.nsfw && (
//                 <View style={styles.nsfwBadge}>
//                   <Text style={styles.nsfwText}>NSFW</Text>
//                 </View>
//               )}
//               <TouchableOpacity style={styles.joinButton}>
//                 <Text style={styles.joinText}>Join</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#12022F',
//     width: '100%',
//   },
//   header: {
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   backArrow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   searchBarContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     height: 40,
//     flex: 1,
//   },
//   searchInput: {
//     // flex: 1,
//     marginLeft: 10,
//     color: '#000',
//   },
//   content: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     marginTop: 20,
//     padding: 16,
//     flex: 1,
//   },
//   sectionTitle: {
//     fontWeight: '600',
//     fontSize: 14,
//     marginBottom: 10,
//   },
//   recentSearchItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 8,
//   },
//   recentSearchText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   recentGroupsHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   clearRecent: {
//     fontSize: 14,
//     color: '#6e46ff',
//   },
//   groupItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//     justifyContent: 'space-between',
//   },
//   groupLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   groupImage: {
//     width: 48,
//     height: 48,
//     borderRadius: 12,
//     marginRight: 12,
//     backgroundColor: '#eee',
//   },
//   groupName: {
//     fontSize: 15,
//     fontWeight: '600',
//   },
//   groupMembers: {
//     fontSize: 13,
//     color: '#777',
//   },
//   groupRight: {
//     alignItems: 'flex-end',
//   },
//   nsfwBadge: {
//     backgroundColor: '#FF5E5E',
//     borderRadius: 4,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     marginBottom: 6,
//     alignSelf: 'flex-end',
//   },
//   nsfwText: {
//     color: '#fff',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   joinButton: {
//     backgroundColor: '#6e46ff',
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//   },
//   joinText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 14,
//   },
// });

// export default SearchModal;

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  back_arrow_svg,
  close_svg,
  search_svg,
} from '../utils/constant/TabSVGimage';
import img1 from '../images/post1.png';

const {width, height} = Dimensions.get('window');

const SearchModal = ({onClose}) => {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('discover'); // or 'joined'

  const recentSearches = ['Alice', 'Whisper', 'Grou', 'Piku'];

  const visitedGroups = [
    {
      name: 'Alice Boderland',
      members: '78.1k members',
      image: img1,
      nsfw: false,
      new: false,
      joined: true,
    },
    {
      name: 'Whisper Refugees',
      members: '78.1k members',
      image: img1,
      nsfw: false,
      new: false,
      joined: true,
    },
    {
      name: 'Group__group',
      members: '36.7k members',
      image: img1,
      nsfw: false,
      new: false,
      joined: false,
    },
    {
      name: 'Whisper Refugees',
      members: '78.1k members',
      image: img1,
      nsfw: true,
      new: true,
      joined: false,
    },
  ];

  const filteredGroups = visitedGroups.filter(group => {
    const inSearch = group.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const inTab = activeTab === 'discover' ? true : group.joined;
    return inSearch && inTab;
  });

  const renderRecentSearch = ({item}) => (
    <View style={styles.recentSearchItem}>
      <Text style={styles.recentSearchText}>{item}</Text>
      <SvgXml xml={close_svg} width={14} height={14} />
    </View>
  );

  const renderGroupItem = ({item}) => (
    <View style={styles.groupItem}>
      <View style={styles.groupLeft}>
        <Image source={item.image} style={styles.groupImage} />
        <View>
          <Text style={styles.groupName}>{item.name}</Text>
          <Text style={styles.groupMembers}>{item.members}</Text>
        </View>
      </View>
      <View style={styles.groupRight}>
        {/* 
        {item.nsfw && (
          <View style={styles.nsfwBadge}>
            <Text style={styles.nsfwText}>NSFW</Text>
          </View>
        )} */}
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinText}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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
          <View style={styles.backArrow}>
            <TouchableOpacity onPress={onClose}>
              <SvgXml xml={back_arrow_svg} width={30} height={30} />
            </TouchableOpacity>
            <View style={styles.searchBarContainer}>
              <SvgXml xml={search_svg} width={14} height={14} />
              <TextInput
                placeholder="Search"
                placeholderTextColor="#ccc"
                style={styles.searchInput}
                autoFocus={true}
                value={searchText}
                onChangeText={text => setSearchText(text)}
              />
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          <FlatList
            data={recentSearches}
            renderItem={renderRecentSearch}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />

          <View style={styles.recentGroupsHeader}>
            <Text style={styles.sectionTitle}>Recently Visited Groups</Text>
            <TouchableOpacity>
              <Text style={styles.clearRecent}>Clear recent</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredGroups}
            renderItem={renderGroupItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},

  header: {
    height: 90,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
  },
  backArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 35,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 10,
    color: '#000',
    fontSize: 14,
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: 2,
    padding: 16,
    flex: 1,
  },
  sectionTitle: {
    fontWeight: 700,
    fontSize: 12,
    marginBottom: 12,
    color: '#000',
  },
  recentSearchItem: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recentSearchText: {
    fontSize: 16,
    color: '#333',
  },
  recentGroupsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  clearRecent: {
    fontSize: 14,
    color: '#6e46ff',
    fontWeight: '500',
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  groupLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  groupImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  groupMembers: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  groupRight: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  nsfwBadge: {
    backgroundColor: '#FF5E5E',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 6,
  },
  nsfwText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  newBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 6,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  joinButton: {
    backgroundColor: '#6e46ff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  joinText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default SearchModal;
