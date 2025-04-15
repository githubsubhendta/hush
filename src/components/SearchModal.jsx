// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   StyleSheet,
//   StatusBar,
//   ImageBackground,
//   Dimensions,
//   KeyboardAvoidingView,
//   Platform,
//   Keyboard,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import {SvgXml} from 'react-native-svg';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {arrow_svg, back_arrow_svg} from '../utils/constant/TabSVGimage';

// const {width, height} = Dimensions.get('window');

// const SearchModal = ({onClose}) => {
//   const [searchText, setSearchText] = useState('');
//   const [activeTab, setActiveTab] = useState('Top');

//   const recentSearches = [
//     {id: '1', term: 'Alice'},
//     {id: '2', term: 'Whisper'},
//     {id: '3', term: 'Orou'},
//     {id: '4', term: 'Pitu'},
//   ];

//   const recentGroups = [
//     {
//       id: '1',
//       name: 'Alice Boderland',
//       members: '78.1k members',
//       image: require('../images/post1.png'),
//       nsfw: false,
//       new: false,
//     },
//     {
//       id: '2',
//       name: 'Whisper Refugees',
//       members: '78.1k members',
//       image: require('../images/post1.png'),
//       nsfw: false,
//       new: false,
//     },
//     {
//       id: '3',
//       name: 'Group_group',
//       members: '36.7k members',
//       image: require('../images/post1.png'),
//       nsfw: false,
//       new: false,
//     },
//     {
//       id: '4',
//       name: 'Whisper Refugees',
//       members: '78.1k members',
//       image: require('../images/post1.png'),
//       nsfw: false,
//       new: true,
//     },
//   ];

//   const topGroups = [
//     {id: '1', name: 'all_user_1234', type: 'group'},
//     {id: '2', name: 'alice_swan_official', type: 'group'},
//     {id: '3', name: 'alladin_blackbird', type: 'group'},
//     {
//       id: '4',
//       name: 'Alice Boderland',
//       members: '78.1k members',
//       type: 'visited',
//     },
//     {
//       id: '5',
//       name: 'Alove',
//       members: '78.1k members',
//       type: 'visited',
//     },
//     {
//       id: '6',
//       name: 'Alone_Pe',
//       members: '36.7k members',
//       type: 'visited',
//     },
//   ];

//   const renderGroupItem = ({item}) => (
//     <View style={styles.groupItem}>
//       <Image source={item.image} style={styles.groupImage} />
//       <View style={styles.groupInfo}>
//         <Text style={styles.groupName}>{item.name}</Text>
//         {item.members && (
//           <Text style={styles.groupMembers}>{item.members}</Text>
//         )}
//       </View>
//       {item.new && (
//         <View style={styles.newBadge}>
//           <Text style={styles.newText}>NEW</Text>
//         </View>
//       )}
//       {item.type === 'visited' && (
//         <TouchableOpacity style={styles.joinButton}>
//           <Text style={styles.joinButtonText}>Join</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );

//   const renderTopItem = ({item}) => {
//     if (item.type === 'group') {
//       return (
//         <View style={styles.topItem}>
//           <Text style={styles.topGroupName}>{item.name}</Text>
//         </View>
//       );
//     } else {
//       return renderGroupItem({item});
//     }
//   };

//   const renderTabContent = () => {
//     const filteredGroups = recentGroups.filter(g =>
//       g.name.toLowerCase().includes(searchText.toLowerCase()),
//     );

//     switch (activeTab) {
//       case 'Top':
//         return (
//           <FlatList
//             data={topGroups}
//             keyExtractor={item => item.id}
//             renderItem={renderTopItem}
//             ListEmptyComponent={
//               <Text style={styles.noResults}>No results found</Text>
//             }
//             showsVerticalScrollIndicator={false}
//           />
//         );
//       case 'Users':
//         return <Text style={styles.noResults}>Users feature coming soon</Text>;
//       case 'Groups':
//         return (
//           <FlatList
//             data={filteredGroups}
//             keyExtractor={item => item.id}
//             renderItem={renderGroupItem}
//             ListEmptyComponent={
//               <Text style={styles.noResults}>No groups found</Text>
//             }
//             showsVerticalScrollIndicator={false}
//           />
//         );
//       case 'Posts':
//         return (
//           <View style={styles.postContainer}>
//             <Text style={styles.postText}>anyone want to rate me??</Text>
//           </View>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={{flex: 1}}>
//         <ImageBackground
//           source={require('../images/headerBg.png')}
//           style={{flex: 1, width: '100%', height: '100%'}}
//           // style={StyleSheet.absoluteFill}
//           resizeMode="cover">
//           <SafeAreaView style={styles.container}>
//             <StatusBar
//               translucent
//               backgroundColor="transparent"
//               barStyle="light-content"
//             />
//             <View style={styles.headerWrapper}>
//               <View style={styles.header}>
//                 <TouchableOpacity onPress={onClose} style={styles.backButton}>
//                   <SvgXml xml={back_arrow_svg} width={30} height={30} />
//                 </TouchableOpacity>
//                 <TextInput
//                   style={styles.searchInput}
//                   placeholder="Search"
//                   placeholderTextColor="#999"
//                   value={searchText}
//                   onChangeText={setSearchText}
//                   autoFocus
//                 />
//               </View>
//             </View>

//             <View style={styles.content}>
//               {searchText.length === 0 ? (
//                 <>
//                   <Text style={styles.sectionTitle}>Recent Searches</Text>
//                   <FlatList
//                     data={recentSearches}
//                     keyExtractor={item => item.id}
//                     renderItem={({item}) => (
//                       <View style={styles.recentItem}>
//                         <Text style={styles.recentText}>{item.term}</Text>
//                       </View>
//                     )}
//                     showsVerticalScrollIndicator={false}
//                   />

//                   <Text style={[styles.sectionTitle, {marginTop: 20}]}>
//                     Recently Visited Groups
//                   </Text>
//                   <Text style={styles.clearRecent}>Clear recent</Text>
//                   <FlatList
//                     data={recentGroups}
//                     keyExtractor={item => item.id}
//                     renderItem={renderGroupItem}
//                     showsVerticalScrollIndicator={false}
//                   />
//                 </>
//               ) : (
//                 <>
//                   <View style={styles.tabs}>
//                     {['Top', 'Users', 'Groups', 'Posts'].map(tab => (
//                       <TouchableOpacity
//                         key={tab}
//                         style={[
//                           styles.tabButton,
//                           activeTab === tab && styles.activeTab,
//                         ]}
//                         onPress={() => setActiveTab(tab)}>
//                         <Text
//                           style={[
//                             styles.tabText,
//                             activeTab === tab && styles.activeTabText,
//                           ]}>
//                           {tab}
//                         </Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>

//                   {renderTabContent()}
//                 </>
//               )}
//             </View>
//           </SafeAreaView>
//         </ImageBackground>
//       </KeyboardAvoidingView>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   mainBackground: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   container: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     backgroundColor: 'transparent',
//   },
//   headerWrapper: {
//     paddingBottom: 8,
//     backgroundColor: 'transparent',
//   },
//   header: {
//     height: 60,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//   },
//   backButton: {
//     marginRight: 12,
//   },
//   searchInput: {
//     flex: 1,
//     height: 38,
//     fontSize: 16,
//     color: '#000',
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     // marginRight: 0, // ensure no margin
//   },
//   content: {
//     flex: 1,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     paddingHorizontal: 16,
//     paddingTop: 12,
//     backgroundColor: '#fff',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 8,
//   },
//   recentItem: {
//     paddingVertical: 12,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#e0e0e0',
//   },
//   recentText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   clearRecent: {
//     fontSize: 14,
//     color: '#6e46ff',
//     textAlign: 'right',
//     marginBottom: 12,
//   },
//   groupItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#e0e0e0',
//   },
//   groupImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 10,
//     marginRight: 12,
//   },
//   groupInfo: {
//     flex: 1,
//   },
//   groupName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000',
//     marginBottom: 2,
//   },
//   groupMembers: {
//     fontSize: 14,
//     color: '#666',
//   },
//   newBadge: {
//     backgroundColor: '#6e46ff',
//     borderRadius: 4,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     marginRight: 8,
//   },
//   newText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   joinButton: {
//     backgroundColor: '#6e46ff',
//     borderRadius: 15,
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//   },
//   joinButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   tabs: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     marginBottom: 12,
//   },
//   tabButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     marginRight: 8,
//   },
//   activeTab: {
//     borderBottomWidth: 2,
//     borderBottomColor: '#6e46ff',
//   },
//   tabText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   activeTabText: {
//     color: '#6e46ff',
//     fontWeight: '600',
//   },
//   noResults: {
//     textAlign: 'center',
//     marginTop: 40,
//     fontSize: 16,
//     color: '#666',
//   },
//   topItem: {
//     paddingVertical: 12,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#e0e0e0',
//   },
//   topGroupName: {
//     fontSize: 16,
//     color: '#000',
//     fontWeight: 'bold',
//   },
//   postContainer: {
//     paddingVertical: 16,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#e0e0e0',
//   },
//   postText: {
//     fontSize: 16,
//     color: '#000',
//   },
// });

// export default SearchModal;

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {arrow_svg, back_arrow_svg} from '../utils/constant/TabSVGimage';

const {width, height} = Dimensions.get('window');

const SearchModal = ({onClose}) => {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('Top');

  const recentSearches = [
    {id: '1', term: 'Alice'},
    {id: '2', term: 'Whisper'},
    {id: '3', term: 'Orou'},
    {id: '4', term: 'Pitu'},
  ];

  const recentGroups = [
    {
      id: '1',
      name: 'Alice Boderland',
      members: '78.1k members',
      image: require('../images/post1.png'),
      nsfw: false,
      new: false,
    },
    {
      id: '2',
      name: 'Whisper Refugees',
      members: '78.1k members',
      image: require('../images/post1.png'),
      nsfw: false,
      new: false,
    },
    {
      id: '3',
      name: 'Group_group',
      members: '36.7k members',
      image: require('../images/post1.png'),
      nsfw: false,
      new: false,
    },
    {
      id: '4',
      name: 'Whisper Refugees',
      members: '78.1k members',
      image: require('../images/post1.png'),
      nsfw: false,
      new: true,
    },
  ];

  const topGroups = [
    {id: '1', name: 'all_user_1234', type: 'group'},
    {id: '2', name: 'alice_swan_official', type: 'group'},
    {id: '3', name: 'alladin_blackbird', type: 'group'},
    {
      id: '4',
      name: 'Alice Boderland',
      members: '78.1k members',
      type: 'visited',
    },
    {
      id: '5',
      name: 'Alove',
      members: '78.1k members',
      type: 'visited',
    },
    {
      id: '6',
      name: 'Alone_Pe',
      members: '36.7k members',
      type: 'visited',
    },
  ];

  const renderGroupItem = ({item}) => (
    <View style={styles.groupItem}>
      <Image source={item.image} style={styles.groupImage} />
      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>{item.name}</Text>
        {item.members && (
          <Text style={styles.groupMembers}>{item.members}</Text>
        )}
      </View>
      {item.new && (
        <View style={styles.newBadge}>
          <Text style={styles.newText}>NEW</Text>
        </View>
      )}
      {item.type === 'visited' && (
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderTopItem = ({item}) => {
    if (item.type === 'group') {
      return (
        <View style={styles.topItem}>
          <Text style={styles.topGroupName}>{item.name}</Text>
        </View>
      );
    } else {
      return renderGroupItem({item});
    }
  };

  const renderTabContent = () => {
    const filteredGroups = recentGroups.filter(g =>
      g.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    switch (activeTab) {
      case 'Top':
        return (
          <FlatList
            data={topGroups}
            keyExtractor={item => item.id}
            renderItem={renderTopItem}
            ListEmptyComponent={
              <Text style={styles.noResults}>No results found</Text>
            }
            showsVerticalScrollIndicator={false}
          />
        );
      case 'Users':
        return <Text style={styles.noResults}>Users feature coming soon</Text>;
      case 'Groups':
        return (
          <FlatList
            data={filteredGroups}
            keyExtractor={item => item.id}
            renderItem={renderGroupItem}
            ListEmptyComponent={
              <Text style={styles.noResults}>No groups found</Text>
            }
            showsVerticalScrollIndicator={false}
          />
        );
      case 'Posts':
        return (
          <View style={styles.postContainer}>
            <Text style={styles.postText}>anyone want to rate me??</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ImageBackground
      source={require('../images/headerBg.png')}
      style={styles.mainBackground}
      resizeMode="cover">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
          <SafeAreaView edges={['top']} style={styles.safeArea}>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="light-content"
            />
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose} style={styles.backButton}>
                <SvgXml xml={back_arrow_svg} width={30} height={30} />
              </TouchableOpacity>
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#999"
                value={searchText}
                onChangeText={setSearchText}
                autoFocus
              />
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.content}>
                {searchText.length === 0 ? (
                  <>
                    <Text style={styles.sectionTitle}>Recent Searches</Text>
                    <FlatList
                      data={recentSearches}
                      keyExtractor={item => item.id}
                      renderItem={({item}) => (
                        <View style={styles.recentItem}>
                          <Text style={styles.recentText}>{item.term}</Text>
                        </View>
                      )}
                      showsVerticalScrollIndicator={false}
                    />

                    <Text style={[styles.sectionTitle, {marginTop: 20}]}>
                      Recently Visited Groups
                    </Text>
                    <Text style={styles.clearRecent}>Clear recent</Text>
                    <FlatList
                      data={recentGroups}
                      keyExtractor={item => item.id}
                      renderItem={renderGroupItem}
                      showsVerticalScrollIndicator={false}
                    />
                  </>
                ) : (
                  <>
                    <View style={styles.tabs}>
                      {['Top', 'Users', 'Groups', 'Posts'].map(tab => (
                        <TouchableOpacity
                          key={tab}
                          style={[
                            styles.tabButton,
                            activeTab === tab && styles.activeTab,
                          ]}
                          onPress={() => setActiveTab(tab)}>
                          <Text
                            style={[
                              styles.tabText,
                              activeTab === tab && styles.activeTabText,
                            ]}>
                            {tab}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    {renderTabContent()}
                  </>
                )}
              </View>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  backButton: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  recentItem: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  recentText: {
    fontSize: 16,
    color: '#000',
  },
  clearRecent: {
    fontSize: 14,
    color: '#6e46ff',
    textAlign: 'right',
    marginBottom: 12,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 12,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  groupMembers: {
    fontSize: 14,
    color: '#666',
  },
  newBadge: {
    backgroundColor: '#6e46ff',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
  },
  newText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  joinButton: {
    backgroundColor: '#6e46ff',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 12,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6e46ff',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#6e46ff',
    fontWeight: '600',
  },
  noResults: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#666',
  },
  topItem: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  topGroupName: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  postContainer: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  postText: {
    fontSize: 16,
    color: '#000',
  },
});

export default SearchModal;
