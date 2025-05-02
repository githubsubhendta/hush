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
// import {
//   arrow_svg,
//   back_arrow_svg,
//   close_svg,
// } from '../utils/constant/TabSVGimage';

// const {width, height} = Dimensions.get('window');
// const scale = width / 375; // Base width for scaling (standard mobile width)
// const normalize = size => Math.round(size * scale);

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
//       type: 'visited',
//     },
//     {
//       id: '2',
//       name: 'Whisper Refugees',
//       members: '78.1k members',
//       image: require('../images/post1.png'),
//       nsfw: false,
//       new: false,
//       type: 'visited',
//     },
//     {
//       id: '3',
//       name: 'Group_group',
//       members: '36.7k members',
//       image: require('../images/post1.png'),
//       nsfw: false,
//       new: false,
//       type: 'visited',
//     },
//     {
//       id: '4',
//       name: 'Whisper Refugees',
//       members: '78.1k members',
//       image: require('../images/post1.png'),
//       nsfw: true,
//       new: true,
//       type: 'visited',
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
//         <View style={{flexDirection: 'row'}}>
//           {item.members && (
//             <Text style={styles.groupMembers}>{item.members}</Text>
//           )}
//           {item.nsfw && (
//             <View style={styles.newBadge}>
//               <Text style={styles.newText}>NSFW</Text>
//             </View>
//           )}
//         </View>
//       </View>

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
//     <ImageBackground
//       source={require('../images/headerBg.png')}
//       style={styles.mainBackground}
//       resizeMode="cover">
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'ios' ? 'padding' : null}
//           style={styles.container}
//           keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
//           <SafeAreaView edges={['top']} style={styles.safeArea}>
//             <StatusBar
//               translucent
//               backgroundColor="transparent"
//               barStyle="light-content"
//             />
//             <View style={styles.header}>
//               <TouchableOpacity onPress={onClose} style={styles.backButton}>
//                 <SvgXml xml={back_arrow_svg} width={30} height={30} />
//               </TouchableOpacity>
//               <View style={styles.searchContainer}>
//                 <TextInput
//                   style={styles.searchInput}
//                   placeholder="Search"
//                   placeholderTextColor="#999"
//                   value={searchText}
//                   onChangeText={setSearchText}
//                   autoFocus
//                 />
//                 {searchText.length > 0 && (
//                   <TouchableOpacity
//                     onPress={() => setSearchText('')}
//                     style={styles.clearButton}>
//                     <SvgXml
//                       xml={close_svg}
//                       width={normalize(16)}
//                       height={normalize(16)}
//                     />
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </View>

//             <View style={styles.contentContainer}>
//               <View style={styles.content}>
//                 {searchText.length === 0 ? (
//                   <View>
//                     <Text style={styles.sectionTitle}>Recent Searches</Text>
//                     <FlatList
//                       data={recentSearches}
//                       keyExtractor={item => item.id}
//                       renderItem={({item}) => (
//                         <View style={styles.recentItem}>
//                           <Text style={styles.recentText} numberOfLines={1}>
//                             {item.term}
//                           </Text>
//                           <TouchableOpacity>
//                             <SvgXml
//                               xml={close_svg}
//                               width={normalize(14)}
//                               height={normalize(14)}
//                             />
//                           </TouchableOpacity>
//                         </View>
//                       )}
//                       showsVerticalScrollIndicator={false}
//                     />

//                     <View style={styles.recentGroupsHeader}>
//                       <Text style={styles.sectionTitle}>
//                         Recently Visited Groups
//                       </Text>
//                       <Text style={styles.clearRecent}>Clear recent</Text>
//                     </View>
//                     <FlatList
//                       data={recentGroups}
//                       keyExtractor={item => item.id}
//                       renderItem={renderGroupItem}
//                       showsVerticalScrollIndicator={false}
//                     />
//                   </View>
//                 ) : (
//                   <>
//                     <View style={styles.tabs}>
//                       {['Top', 'Users', 'Groups', 'Posts'].map(tab => (
//                         <TouchableOpacity
//                           key={tab}
//                           style={[
//                             styles.tabButton,
//                             activeTab === tab && styles.activeTab,
//                           ]}
//                           onPress={() => setActiveTab(tab)}>
//                           <Text
//                             style={[
//                               styles.tabText,
//                               activeTab === tab && styles.activeTabText,
//                             ]}>
//                             {tab}
//                           </Text>
//                         </TouchableOpacity>
//                       ))}
//                     </View>

//                     {renderTabContent()}
//                   </>
//                 )}
//               </View>
//             </View>
//           </SafeAreaView>
//         </KeyboardAvoidingView>
//       </TouchableWithoutFeedback>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   mainBackground: {
//     flex: 1,
//     width: '100%',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: 'transparent',
//   },
//   safeArea: {
//     flex: 1,
//     backgroundColor: 'transparent',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: normalize(18),
//     paddingVertical: normalize(20),
//     backgroundColor: 'transparent',
//   },
//   backButton: {
//     marginRight: normalize(12),
//   },
//   searchContainer: {
//     flex: 1,
//     position: 'relative',
//   },
//   searchInput: {
//     height: normalize(35),
//     fontSize: normalize(16),
//     color: '#000',
//     backgroundColor: '#fff',
//     borderRadius: normalize(12),
//     paddingHorizontal: normalize(15),
//     paddingVertical: normalize(8),
//   },
//   clearButton: {
//     position: 'absolute',
//     right: normalize(10),
//     top: '50%',
//     transform: [{translateY: -normalize(10)}],
//     padding: normalize(4),
//   },
//   contentContainer: {
//     flex: 1,
//     backgroundColor: 'transparent',
//   },
//   content: {
//     flex: 1,
//     borderTopLeftRadius: normalize(16),
//     borderTopRightRadius: normalize(16),
//     backgroundColor: '#fff',
//     paddingHorizontal: normalize(16),
//     paddingTop: normalize(12),
//   },
//   sectionTitle: {
//     marginTop: normalize(10),
//     fontSize: normalize(14),
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: normalize(8),
//   },
//   recentItem: {
//     paddingVertical: normalize(10),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   recentText: {
//     fontSize: normalize(12),
//     color: '#000',
//   },
//   clearRecent: {
//     fontSize: normalize(14),
//     color: '#6e46ff',
//     textAlign: 'right',
//   },
//   recentGroupsHeader: {
//     marginTop: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     // marginBottom: normalize(20),
//   },
//   groupItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: normalize(12),
//   },
//   groupImage: {
//     width: normalize(70),
//     height: normalize(50),
//     borderRadius: normalize(10),
//     marginRight: normalize(12),
//   },
//   groupInfo: {
//     flex: 1,
//     marginRight: normalize(8),
//   },
//   groupName: {
//     fontSize: normalize(14),
//     fontWeight: '600',
//     color: '#000',
//     marginBottom: normalize(2),
//   },
//   groupMembers: {
//     fontSize: normalize(12),
//     color: '#666',
//   },
//   newBadge: {
//     backgroundColor: '#FC4D2FE5',
//     borderRadius: normalize(14),
//     paddingHorizontal: normalize(5),
//     paddingVertical: normalize(1),
//     marginLeft: normalize(3),
//   },
//   newText: {
//     color: '#fff',
//     fontSize: normalize(10),
//     fontWeight: '700',
//   },
//   joinButton: {
//     backgroundColor: '#392EBD',
//     borderRadius: normalize(7),
//     paddingHorizontal: normalize(16),
//     paddingVertical: normalize(6),
//   },
//   joinButtonText: {
//     color: '#fff',
//     fontWeight: '500',
//     fontSize: normalize(14),
//   },
//   tabs: {
//     flexDirection: 'row',
//     marginBottom: normalize(12),
//     flexWrap: 'wrap',
//   },
//   tabButton: {
//     paddingHorizontal: normalize(15),
//     paddingVertical: normalize(5),
//     marginRight: normalize(8),
//     marginBottom: normalize(8),
//   },
//   activeTab: {
//     backgroundColor: '#392EBD',
//     borderRadius: normalize(16),
//   },
//   tabText: {
//     fontSize: normalize(16),
//     color: '#666',
//   },
//   activeTabText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   noResults: {
//     textAlign: 'center',
//     marginTop: normalize(40),
//     fontSize: normalize(16),
//     color: '#666',
//   },
//   topItem: {
//     paddingVertical: normalize(12),
//   },
//   topGroupName: {
//     fontSize: normalize(16),
//     color: '#000',
//     fontWeight: 'bold',
//   },
//   postContainer: {
//     paddingVertical: normalize(16),
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#e0e0e0',
//   },
//   postText: {
//     fontSize: normalize(16),
//     color: '#000',
//   },
//   listContent: {
//     paddingBottom: normalize(20),
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
import {
  arrow_svg,
  back_arrow_svg,
  close_svg,
  Search_Svg,
} from '../utils/constant/TabSVGimage';
import {useTheme} from '../context/ThemeContext';

const {width, height} = Dimensions.get('window');
const scale = width / 375;
const normalize = size => Math.round(size * scale);

const SearchModal = ({onClose}) => {
  const {isDarkModeOn} = useTheme();
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
      type: 'visited',
    },
    {
      id: '2',
      name: 'Whisper Refugees',
      members: '78.1k members',
      image: require('../images/post1.png'),
      nsfw: false,
      new: false,
      type: 'visited',
    },
    {
      id: '3',
      name: 'Group_group',
      members: '36.7k members',
      image: require('../images/post1.png'),
      nsfw: false,
      new: false,
      type: 'visited',
    },
    {
      id: '4',
      name: 'Whisper Refugees',
      members: '78.1k members',
      image: require('../images/post1.png'),
      nsfw: true,
      new: true,
      type: 'visited',
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
        <Text
          style={[styles.groupName, {color: isDarkModeOn ? '#fff' : '#000'}]}>
          {item.name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          {item.members && (
            <Text
              style={[
                styles.groupMembers,
                {color: isDarkModeOn ? '#ccc' : '#666'},
              ]}>
              {item.members}
            </Text>
          )}
          {item.nsfw && (
            <View style={styles.newBadge}>
              <Text style={styles.newText}>NSFW</Text>
            </View>
          )}
        </View>
      </View>

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
          <Text
            style={[
              styles.topGroupName,
              {color: isDarkModeOn ? '#fff' : '#000'},
            ]}>
            {item.name}
          </Text>
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
              <Text
                style={[
                  styles.noResults,
                  {color: isDarkModeOn ? '#fff' : '#000'},
                ]}>
                No results found
              </Text>
            }
            showsVerticalScrollIndicator={false}
          />
        );
      case 'Users':
        return (
          <Text
            style={[styles.noResults, {color: isDarkModeOn ? '#fff' : '#000'}]}>
            Users feature coming soon
          </Text>
        );
      case 'Groups':
        return (
          <FlatList
            data={filteredGroups}
            keyExtractor={item => item.id}
            renderItem={renderGroupItem}
            ListEmptyComponent={
              <Text
                style={[
                  styles.noResults,
                  {color: isDarkModeOn ? '#fff' : '#000'},
                ]}>
                No groups found
              </Text>
            }
            showsVerticalScrollIndicator={false}
          />
        );
      case 'Posts':
        return (
          <View style={styles.postContainer}>
            <Text
              style={[
                styles.postText,
                {color: isDarkModeOn ? '#fff' : '#000'},
              ]}>
              anyone want to rate me??
            </Text>
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
          style={[
            styles.container,
            // {backgroundColor: isDarkModeOn ? '#000' : '#fff'},
          ]}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
          <SafeAreaView edges={['top']} style={styles.safeArea}>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="light-content"
            />
            {/* Header remains unchanged */}
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose} style={styles.backButton}>
                <SvgXml xml={back_arrow_svg} width={30} height={30} />
              </TouchableOpacity>
              <View style={styles.searchContainer}>
                <View style={styles.iconLeft}>
                  <SvgXml
                    xml={Search_Svg}
                    width={normalize(16)}
                    height={normalize(16)}
                  />
                </View>

                <TextInput
                  style={[
                    styles.searchInput,
                    {paddingLeft: normalize(30), paddingRight: normalize(36)},
                  ]}
                  placeholder="Search"
                  placeholderTextColor={'#999'}
                  value={searchText}
                  onChangeText={setSearchText}
                  autoFocus
                />

                {/* Clear button icon on the right */}
                {searchText.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setSearchText('')}
                    style={styles.clearButton}>
                    <SvgXml
                      xml={close_svg}
                      width={normalize(16)}
                      height={normalize(16)}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View
              style={[
                styles.contentContainer,
                {backgroundColor: isDarkModeOn ? '#000' : '#fff'},
              ]}>
              <View
                style={[
                  styles.content,
                  {backgroundColor: isDarkModeOn ? '#000' : '#fff'},
                ]}>
                {searchText.length === 0 ? (
                  <View>
                    <Text
                      style={[
                        styles.sectionTitle,
                        {color: isDarkModeOn ? '#fff' : '#333'},
                      ]}>
                      Recent Searches
                    </Text>
                    <FlatList
                      data={recentSearches}
                      keyExtractor={item => item.id}
                      renderItem={({item}) => (
                        <View style={styles.recentItem}>
                          <Text
                            style={[
                              styles.recentText,
                              {color: isDarkModeOn ? '#fff' : '#000'},
                            ]}
                            numberOfLines={1}>
                            {item.term}
                          </Text>
                          <TouchableOpacity>
                            <SvgXml
                              xml={close_svg}
                              width={normalize(14)}
                              height={normalize(14)}
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                      showsVerticalScrollIndicator={false}
                    />

                    <View style={styles.recentGroupsHeader}>
                      <Text
                        style={[
                          styles.sectionTitle,
                          {color: isDarkModeOn ? '#fff' : '#333'},
                        ]}>
                        Recently Visited Groups
                      </Text>
                      <Text
                        style={{
                          color: isDarkModeOn ? '#888' : '#999',
                          fontSize: normalize(12),
                        }}>
                        Clear recent
                      </Text>
                    </View>
                    <FlatList
                      data={recentGroups}
                      keyExtractor={item => item.id}
                      renderItem={renderGroupItem}
                      showsVerticalScrollIndicator={false}
                    />
                  </View>
                ) : (
                  <>
                    <View style={styles.tabs}>
                      {['Top', 'Users', 'Groups', 'Posts'].map(tab => {
                        const isActive = activeTab === tab;
                        const backgroundColor = isActive
                          ? isDarkModeOn
                            ? '#191919'
                            : '#392EBD'
                          : isDarkModeOn
                          ? '#fff'
                          : '#EEE8D5';

                        const textColor = isActive
                          ? isDarkModeOn
                            ? '#fff'
                            : '#000'
                          : isDarkModeOn
                          ? '#ccc'
                          : '#666';

                        return (
                          <TouchableOpacity
                            key={tab}
                            style={[
                              styles.tabButton,
                              {backgroundColor},
                              isActive && styles.activeTab,
                            ]}
                            onPress={() => setActiveTab(tab)}>
                            <Text
                              style={[
                                styles.tabText,
                                {
                                  color: isActive
                                    ? "#FFFFFF":"#000",
                                  fontWeight: isActive ? 'bold' : 'normal',
                                },
                              ]}>
                              {tab}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
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
  },
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(20),
    backgroundColor: 'transparent',
  },
  backButton: {
    marginRight: normalize(12),
  },
  searchContainer: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 40,
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#000',
  },

  iconLeft: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },

  clearButton: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
  },

  contentContainer: {
    flex: 1,
    borderTopLeftRadius: normalize(16),
    borderTopRightRadius: normalize(16),
  },
  content: {
    flex: 1,
    borderTopLeftRadius: normalize(16),
    borderTopRightRadius: normalize(16),
    paddingHorizontal: normalize(16),
    paddingTop: normalize(12),
  },
  sectionTitle: {
    marginTop: normalize(10),
    fontSize: normalize(14),
    fontWeight: '600',
    marginBottom: normalize(8),
  },
  recentItem: {
    paddingVertical: normalize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentText: {
    fontSize: normalize(12),
  },
  recentGroupsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: normalize(20),
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: normalize(10),
  },
  groupImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: normalize(14),
    fontWeight: '600',
  },
  groupMembers: {
    fontSize: normalize(12),
  },
  newBadge: {
    backgroundColor: 'red',
    borderRadius: 4,
    marginLeft: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  newText: {
    fontSize: normalize(10),
    color: '#fff',
  },
  joinButton: {
    backgroundColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  joinButtonText: {
    fontSize: normalize(12),
    fontWeight: '600',
  },
  topItem: {
    paddingVertical: 10,
  },
  topGroupName: {
    fontSize: normalize(14),
  },
  noResults: {
    textAlign: 'center',
    fontSize: normalize(14),
    marginTop: 20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(10),
  },
  tabButton: {
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(16),
    borderRadius: normalize(12),
  },
  tabText: {
    fontSize: normalize(13),
  },
  postContainer: {
    padding: normalize(16),
  },
  postText: {
    fontSize: normalize(14),
  },
});

export default SearchModal;
