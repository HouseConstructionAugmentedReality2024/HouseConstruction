/* eslint-disable prettier/prettier */
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroBox,
  ViroMaterials,
  ViroAnimations,
  //Viro3DObject,
  //ViroARCamera
  //ViroTrackingReason,
  //ViroTrackingStateConstants,
} from '@viro-community/react-viro';
import React, { useState } from 'react';
import {  PermissionsAndroid, StyleSheet, TouchableOpacity, View } from 'react-native';
//import { StyleSheet } from 'react-native';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const InitialScene = () => {

  ViroMaterials.createMaterials({
    wood: {
      diffuseTexture: require('./assets/wood.jpg')
    },
    black:{
      diffuseTexture:require('./assets/Chair/ChairBlack.jpeg')
    }
  })

  ViroAnimations.registerAnimations({
    rotate: {
      duration: 2500,
      properties: {
        rotateY: '+=90'
      }
    }
  })

  

  return (
    
      <ViroARScene>
        <ViroText
      text={'House Construction'}
      position={[-2, 2, -5]} 
      // eslint-disable-next-line react-native/no-inline-styles
  style={{fontSize:30,color:'yellow'}}/>
        <ViroBox
          height={2}
          length={2}
          width={2}
          position={[0, -1, -1]}
          scale={[0.2, 0.2, 0.2]}
          materials={['wood']}
          animation={{ name: 'rotate', loop: true, run: true }}
  />
        {/*<Viro3DObject
          source={require('./assets/Chair/Chair.obj')}
          position={[0,-5,-5]}
          scale={[0.05,0.05,0.05]}
          materials={['black']}
type="OBJ"
  />*/}


      </ViroARScene>
      
  );
};

export default () => {
  const [object,setObject] = useState<string>('Chair');
  return (
    <View style={styles.mainView}>
    <ViroARSceneNavigator
      initialScene={{
        scene: InitialScene
      }}
      viroAppProps={{"object":object}}
      style={{ flex: 1 }}
    />
    <View style={styles.controlsView}>
        <TouchableOpacity onPress={()=>setObject('Chair')}>
          
        </TouchableOpacity>
        <TouchableOpacity></TouchableOpacity>
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  mainView:{
    flex:1
  },
  controlsView:{
    width:"100%",
    height:100,
    backgroundColor:'#fff',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  }

});
