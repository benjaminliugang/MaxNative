'use strict';
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';


export default class NewItem extends Component {
  render() {
    return (
      <View style={styles.navBody}>
        <Text style={styles.navBodyText}> Welcome to ServiceMax! </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2'
  },
  navBodyText: {
    fontSize: 50,
    fontWeight: 'bold'
  }
});
