'use strict';
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import {Actions} from 'react-native-router-flux'
import {dbFunction} from '../basic/sqliteData'


export default class Navigation extends Component {
  onPress() {
    return Actions.newItem();
  }

  initDB() {
    dbFunction.initDB();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navHeader}>
          <View style={styles.navHeaderBody}>
            <Image source={require('../../image/calendar-image.png')} style={styles.navHeaderImage}/>
            <Text style={styles.navHeaderText}> Calendar </Text>
          </View>
          <TouchableHighlight style={styles.navHeaderBody} onPress={this.initDB.bind(this)}>
            <View style={styles.navHeaderBody}>
              <Image source={require('../../image/calendar-image.png')} style={styles.navHeaderImage}/>
              <Text style={styles.navHeaderText}> Init DB </Text>
            </View>
          </TouchableHighlight>
          <View style={styles.navHeaderBody}>
            <Image source={require('../../image/calendar-image.png')} style={styles.navHeaderImage}/>
            <Text style={styles.navHeaderText}> Tasks </Text>
          </View>
          <TouchableHighlight style={styles.navHeaderBody} onPress={this.onPress.bind(this)}>
            <View style={styles.navHeaderBody}>
              <Image source={require('../../image/calendar-image.png')} style={styles.navHeaderImage}/>
              <Text style={styles.navHeaderText}> New Item </Text>
            </View>
          </TouchableHighlight>
          <View style={styles.navHeaderBody}>
            <Image source={require('../../image/calendar-image.png')} style={styles.navHeaderImage}/>
            <Text style={styles.navHeaderText}> Recents </Text>
          </View>
          <View style={styles.navHeaderBody}>
            <Image source={require('../../image/calendar-image.png')} style={styles.navHeaderImage}/>
            <Text style={styles.navHeaderText}> Tools </Text>
          </View>
        </View>
        <View style={styles.navBody}>
          <Text style={styles.navBodyText}> Welcome to ServiceMax! </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1
  },
  navHeader: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FF6634',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navHeaderBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navHeaderText: {
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  navBody: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2'
  },
  navBodyText: {
    fontSize: 50,
    fontWeight: 'bold'
  },
  navHeaderImage: {
    height: 40,
    width: 40,
    alignSelf: 'center',
    resizeMode: 'contain'
  }
});
