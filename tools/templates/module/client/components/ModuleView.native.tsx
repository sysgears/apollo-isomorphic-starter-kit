/*tslint:disable:no-implicit-dependencies*/
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const $Module$View = () => {
  return (
    <View style={styles.container}>
      <View style={styles.element}>
        <Text style={styles.box}>Hello $Module$!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  element: {
    paddingTop: 30
  },
  box: {
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15
  }
});

export default $Module$View;
