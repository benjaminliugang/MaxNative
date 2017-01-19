'use strict';
import React, {Component} from 'react';
import t from 'tcomb-form-native';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    Image
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import BasicVariables from '../basic/basicVariables';
import {dbFunction} from '../basic/sqliteData';
import Spinner from 'react-native-loading-spinner-overlay';

var Form = t.form.Form;

var options = {
  auto: 'placeholders',
  fields: {
    Password: {
      secureTextEntry: true,
      error: 'Please input password'
    },
    UserName: {
      error: 'Please input username'
    }
  }
};

var Login = t.struct({
  UserName: t.String,
  Password: t.String
});

export default class MaxLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  onPress() {
    var value = this.refs.form.getValue();
    dbFunction.initDB();
    this.setState({
      visible: !this.state.visible
    });
    if (value) {
      setTimeout(() => {
        this.setState({
          visible: !this.state.visible
        });
        Actions.navigation();
      }, 3000);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../image/login-image.png')} style={styles.loginImage}/>
        <View style={styles.formContainer}>
          <Form
            ref="form"
            type={Login}
            options={options}
            style={{backgroundColor: '#FF6633'}}
          />
          <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
        </View>
        <View style={{ flex: 1 }}>
          <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={{color: '#FFF'}}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    flex: 1
  },
  formContainer: {
    justifyContent: 'flex-start',
    marginTop: 50,
    padding: 20,
    flex: 4
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  loginImage: {
    height: 400,
    width: 400,
    flex: 2,
    alignSelf: 'center',
    resizeMode: 'contain'
  }
});
