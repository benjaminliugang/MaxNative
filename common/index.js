'use strict';
import React, {Component} from 'react';
import t from 'tcomb-form-native';
import Navigation from './components/navigation';
import MaxLogin from './components/login';
import NewItem from './components/newItem/newItem';
import WorkOrderForm from './components/newItem/workOrder/workOrderForm';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    Image
} from 'react-native';
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux'

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};
export default class MaxNative extends Component {
    render() {
        return <Router createReducer={reducerCreate}>
            <Scene key="modal" component={Modal} >
                <Scene key="root" hideNavBar={true}>
                    <Scene key="launch" component={MaxLogin} title="Launch" initial={true} style={{flex:1, backgroundColor:'transparent'}}/>
                    <Scene key="navigation" direction="vertical">
                      <Scene key="navigationModal" component={Navigation} schema="modal"  hideNavBar={true} style={{flex:1, backgroundColor:'transparent'}}/>
                      <Scene key="newItem" direction="vertical" hideNavBar={false}>
                        <Scene key="newItemModal" component={NewItem} schema="modal" title="New Item" leftTitle="Back" onLeft={() => {return Actions.navigationModal();}} titleStyle={styles.navTitleText} hideNavBar={false} navigationBarStyle={styles.navHeader} style={{flex:1, backgroundColor:'transparent'}}/>
                        <Scene key="workOrderView" component={WorkOrderForm} hideNavBar={true} style={{flex:1, backgroundColor:'transparent'}}/>
                      </Scene>
                    </Scene>
                </Scene>
            </Scene>
        </Router>;
    }
}

const styles = StyleSheet.create({
  navHeader: {
    backgroundColor: '#FF6634'
  },
  navTitleText: {
    fontWeight: 'bold',
    color: '#FFFFFF'
  }
});
