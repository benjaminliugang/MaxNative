'use strict';
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ListView, TouchableHighlight } from 'react-native';
import {dbFunction} from '../../basic/sqliteData';
import {Actions} from 'react-native-router-flux'


export default class NewItem extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      objects: ds.cloneWithRows([]),
      objectActions: ds.cloneWithRows([]),
      workOrders: [],
      db: []
    };
    dbFunction.getRecords('Object', (db,results) => {
      var len = db.rows.length;
      var objects = [];
      for (let i = 0; i < len; i++) {
        let row = db.rows.item(i);
        objects.push({name: row.name, description: row.description});
      }
      this.setState({
        objects: ds.cloneWithRows(objects)
      });
    });

    dbFunction.getRecords('ObjectActions', (db,results) => {
      var len = db.rows.length;
      var objectActions = [];
      for (let i = 0; i < len; i++) {
        let row = db.rows.item(i);
        objectActions.push({name: row.name, description: row.description});
      }
      this.setState({
        objectActions: ds.cloneWithRows(objectActions)
      });
    });
  }

  objectItemClick() {

  }

  actionsItemClick() {
    return Actions.workOrderView();
  }

  _renderRow(rowData) {
    return <TouchableHighlight onPress={this.objectItemClick} style={{alignSelf: 'stretch', height:70}}>
      <View style={{left: 10, alignSelf: 'stretch'}}>
        <Text style={{height:70, left: 10, alignSelf: 'stretch', color: '#D1AF94'}} >{rowData.name}</Text>
      </View>
    </TouchableHighlight>;
  }

  _renderActionRow(rowData) {
    return <TouchableHighlight onPress={this.actionsItemClick} style={{alignSelf: 'stretch', height:70, borderBottomWidth: 1, borderColor: '#F2F2F2',}}>
      <View style={{left: 10, alignSelf: 'stretch', height: 50, paddingTop: 15}}>
        <View>
          <Text style={{left: 10, alignSelf: 'stretch', fontWeight: 'bold'}} >{rowData.name}</Text>
        </View>
        <View>
          <Text style={{left: 10, alignSelf: 'stretch', color: '#B3B3B3'}} >{rowData.description}</Text>
        </View>
      </View>
    </TouchableHighlight>;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.objectList}>
          <ListView style={{flex: 1, alignSelf: 'stretch'}} enableEmptySections={true}
            dataSource={this.state.objects}
            renderRow={this._renderRow.bind(this)}
          />
        </View>
        <View style={styles.createItems}>
          <ListView style={{flex: 1, alignSelf: 'stretch', top: 10}} enableEmptySections={true}
            dataSource={this.state.objectActions}
            renderRow={this._renderActionRow.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 60
    // backgroundColor: '#F2F2F2'
  },
  objectList: {
    top: 10,
    flex: 2,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#F2F2F2',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: '#F2F2F2'
  },
  createItems: {
    top: 10,
    left: 10,
    flex: 4,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#F2F2F2',
    alignItems: 'flex-start',
    alignSelf: 'stretch'
  }
});
