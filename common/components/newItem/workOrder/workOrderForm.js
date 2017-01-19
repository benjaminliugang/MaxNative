'use strict';
import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ListView, TouchableHighlight, ScrollView } from 'react-native';
import {dbFunction} from '../../../basic/sqliteData';
import t from 'tcomb-form-native';
import {Actions} from 'react-native-router-flux';
import transform, {transformOptions} from 'tcomb-json-schema';

var Form = t.form.Form;
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

// clone the default stylesheet
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.fieldset = {
  flexDirection: 'row'
};
stylesheet.formGroup.normal.flexDirection = 'row';
t.form.Form.stylesheet.controlLabel.normal.color = '#C7C7C7';

// const options = {
//   fields: {
//     workOrderInformation: {
//       fields: {
//         id: {
//           hidden: true
//         },
//         svmx_work_order_number: {
//           label: 'Work Order Number',
//           placeholder: 'Work Order Number'
//         },
//         svmx_contact: {
//           label: 'Contact'
//         }
//       }
//     },
//     Descriptions: {
//       fields: {
//         svmx_subject: {
//           label: 'Subject'
//         },
//         svmx_description: {
//           label: 'Description'
//         },
//       }
//     }
//   }
// };

var Options = t.enums({
  A: 'OptionA',
  B: 'OptionB',
  C: 'OptionC'
});

const WorkOrder = t.struct({
  workOrderInformation: t.struct({
    svmx_work_order_number: t.String,
    svmx_contact: t.maybe(t.String)
  }),
  active: t.Boolean,
  Date: t.Date,
  Descriptions: t.struct({
    svmx_subject: t.maybe(t.String),
    Option: Options,
    svmx_description: t.maybe(t.String)
  })
});

const options = {
  fields: {
    workOrderInformation: {
      fields: {
        svmx_work_order_number: {
          label: 'Work Order Number'
        },
        svmx_contact: {
          label: 'Contact'
        }
      },
      label: 'Work Order Information'
    },
    Descriptions: {
      fields: {
        svmx_subject: {
          label: 'Subject'
        },
        svmx_description: {
          label: 'Description'
        }
      }
    }
  }
};

// var WorkOrder = transform({
// 	  "type": "object",
// 	  "properties": {
// 	    "workOrderInformation": {
// 	      "type": "object",
// 	      "properties": {
//           "id": {"type": "string"},
// 	        "svmx_work_order_number": { "type": "string" },
// 	        "svmx_contact": { "type": "string" },
//           "enum_type": {"type": "string", "enum": ["Street", "Avenue", "Boulevard"]}
// 	      },
// 	      "required": ["svmx_work_order_number", "svmx_contact"]
// 	    },
// 	    "Descriptions": {
// 	      "type": "object",
// 	      "properties": {
// 	        "svmx_subject": { "type": "string" },
// 	        "svmx_description": { "type": "string" }
// 	      }
// 	    }
// 	  },
//     "required": ["workOrderInformation", "Descriptions"]
// 	});

export default class NewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workOrders: ds.cloneWithRows([]),
      db: [],
      workOrderValue: null,
      currentRecordId: null
    };

    this.getWorkOrders();
  }

  getWorkOrders() {
    dbFunction.getRecords('WorkOrder', (db,results) => {
      var len = db.rows.length;
      var workOrders = [];
      for (let i = 0; i < len; i++) {
        let row = db.rows.item(i);
        workOrders.push({id: row.id, svmx_work_order_number: row.svmx_work_order_number, svmx_account: row.svmx_account, svmx_contact: row.svmx_contact, svmx_top_level_product: row.svmx_top_level_product, svmx_subject: row.svmx_subject, svmx_description: row.svmx_description});
      }
      this.setState({
        workOrders: ds.cloneWithRows(workOrders)
      });
    });
  }

  itemClick(rowData) {
    this.setState({
      currentRecordId: rowData.id,
      workOrderValue: {
        workOrderInformation: {
          svmx_work_order_number: rowData.svmx_work_order_number || '',
          svmx_contact: rowData.svmx_contact || ''
        },
        Descriptions: {
          svmx_subject: rowData.svmx_subject || '',
          svmx_description: rowData.svmx_description || ''
        }
      }
    });
  }

  _renderRow(rowData) {
    return <TouchableHighlight onPress={() => {this.itemClick(rowData)}} style={{alignSelf: 'stretch', height:35}}>
      <View style={{left: 10, alignSelf: 'stretch'}}>
        <Text style={{height:35, left: 10, alignSelf: 'stretch', color: '#D7AE99', fontSize: 13}} >{rowData.svmx_work_order_number}</Text>
      </View>
    </TouchableHighlight>;
  }

  onRight() {
    var value = this.refs.form.getValue();
    if (value && value.workOrderInformation) {
      if (this.state.currentRecordId) {
        dbFunction.updateRecord('WorkOrder', value, this.state.currentRecordId);
        this.getWorkOrders();
      } else {
        dbFunction.insertRecord('WorkOrder', value, (rowData) => {
          console.log(rowData);
          this.setState({
            currentRecordId: rowData.id
          });
        });
        this.getWorkOrders();
      }
    }
  }

  onChange(value) {
    this.setState({workOrderValue: value || ''});
  }

  _cancel() {
    return Actions.pop();
  }

  render() {
    let rightButtonTest =  this.state.workOrderValue && this.state.currentRecordId ? 'Save' : 'Create';
    return (
      <View style={styles.container}>
        <View style={styles.navHeader}>
          <TouchableHighlight style={{flex: 1}} onPress={this._cancel.bind(this)}>
            <View>
              <Text> Cancel </Text>
            </View>
          </TouchableHighlight>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', color: '#FFFFFF', fontSize: 16}}> Create New RAM </Text>
          </View>
          <TouchableHighlight style={{flex: 1, alignItems: 'flex-end'}} onPress={this.onRight.bind(this)}>
            <View>
              <Text> {rightButtonTest} </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.objectList}>
            <ListView style={{flex: 1, alignSelf: 'stretch', top: 10}} enableEmptySections={true}
              dataSource={this.state.workOrders}
              renderRow={this._renderRow.bind(this)}
            />
          </View>
          <View style={styles.createItems}>
            <ScrollView>
              <Form
                ref="form"
                type={WorkOrder}
                options={options}
                value={this.state.workOrderValue}
                onChange={this.onChange.bind(this)}
                style={{backgroundColor: '#FF6633'}}
              />
            </ScrollView>
          </View>
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
  formContainer: {
    flex: 9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
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
    marginRight: 20,
    justifyContent: 'flex-start'
  }
});
