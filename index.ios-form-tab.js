import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Text, ScrollView } from 'react-native';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import t from 'tcomb-form-native';

const styles = StyleSheet.create({
  containerHeader: {
    flex: 1,
  },
  containerTabs: {
    flex: 4,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class MaxNative extends Component {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Overview' },
      { key: '2', title: 'Work Details' },
      { key: '3', title: 'Descriptions' },
      { key: '4', title: 'System Info' }
    ],
  };

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBarTop {...props}/>;
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <View style={[ styles.page ]}><Text>Overview </Text></View>;
    case '2':
      return <View style={[ styles.page ]}><Text>Work Details</Text></View>;
    case '3':
      return <View style={[ styles.page ]}><Text>Descriptions</Text></View>;
    case '4':
      return <View style={[ styles.page ]}><Text>System Info</Text></View>;
    default:
      return null;
    }
  };

  render() {
    return (
      // <ScrollView>
        <View style={{flex: 1}}>
          <Text style={styles.containerHeader}>Work Order</Text>
          <TabViewAnimated
            style={styles.containerTabs}
            navigationState={this.state}
            renderScene={this._renderScene}
            renderHeader={this._renderHeader}
            onRequestChangeTab={this._handleChangeTab}
          />
        </View>
      // </ScrollView>
    );
  }
};

AppRegistry.registerComponent('MaxNative', () => MaxNative);
