import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import Slider from '@react-native-community/slider';
import {posts} from '../../utils/PostData';
import PostItems from '../PostItem';
const {width, height} = Dimensions.get('window');

const LocalTabScreen = () => {
  const renderItem = useCallback(({item}) => <PostItems item={item} />, []);
  const [value, setValue] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Text style={styles.label}>CLOSER</Text>

        <Slider
          style={styles.slider}
          // minimumValue={-0.00000005}
          maximumValue={0.0000001}
          step={0.00000001}
          value={value}
          onValueChange={val => setValue(val)}
          minimumTrackTintColor="#392EBD"
          maximumTrackTintColor="#66645E"
          thumbTintColor="#fff"
        />

        <Text style={styles.label}>FARTHER</Text>
      </View>
      <FlatList
        data={posts}
        numColumns={2}
        renderItem={({item}) => (
          <PostItems
            image={item.image}
            text={item.text}
            likes={item.likes}
            time={item.time}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sliderContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EEE8D5',
    paddingHorizontal: 15,
  },
  slider: {
    width: '70%',
    height: 40,
  },
  label: {
    color: '#2F0E40',
    fontSize: 12,
    fontWeight: '700',
  },
  text: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginTop: height * 0.02,
  },
});

export default LocalTabScreen;
