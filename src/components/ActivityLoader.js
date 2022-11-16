import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import {
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';

const ActivityLoader = ({visible = false }) => {
  if (!visible) return null;
  return (
    <Modal
      visible={true}
      transparent={true}
      statusBarTranslucent
      style={{flex: 1}}>
      <View style={styles.containerStyle}>
        <View style={styles.indicatorViewStyle}>
            <ActivityIndicator size={'large'} color="#000" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    containerStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      flex: 1,
    },
    indicatorViewStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderRadius: wp(3),
      height: wp(25),
      width: wp(25),
    },
  });

export default ActivityLoader;