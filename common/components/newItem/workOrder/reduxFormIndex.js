/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStore } from 'redux'
import { combineReducers } from 'redux-immutablejs'
import { reducer as formReducer } from 'redux-form/immutable'
import { fromJS } from 'immutable'
import { Provider } from 'react-redux'
import ImmutableForm from './reduxFormTest'

const reducer = combineReducers({
  form: formReducer
})

const store = createStore(reducer, fromJS({}))

export default class ReduxFormIndex extends Component {

  render() {
    const { type } = this.state

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Text> Test </Text>
          </View>
          <View style={{flex: 1}}>
            <ImmutableForm />
          </View>
        </View>
      </Provider>
    );
  }
}

const Button = props => (
  <TouchableOpacity {...props}><Text style={styles.button}>{ props.children }</Text></TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    color: 'white',
    fontSize: 10,
    height: 30,
    lineHeight: 30,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 30
  }
});

AppRegistry.registerComponent('ReduxFormIndex', () => ReduxFormIndex);
