'use strict';
import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ListView, TouchableHighlight, ScrollView, TextInput } from 'react-native';
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
// stylesheet.formGroup.normal.flexDirection = 'row';
stylesheet.controlLabel.normal.color = '#C7C7C7';
// t.form.Form.stylesheet.controlLabel.normal.color = '#C7C7C7';

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

var ShortString = t.refinement(t.String, function (s) {
  return s.length < 3;
});

ShortString.getValidationErrorMessage = function (value) {
  if (!value) {
    return 'Required';
  }
  if (value.length >= 3) {
    return 'Too long my friend';
  }
};

var Options = t.enums({
  A: 'OptionA',
  B: 'OptionB',
  C: 'OptionCd'
});

var DynamicOptions = t.enums({});

var myCustomTemplate = (locals) => {

  var containerStyle = {borderColor: '#F7F7F7'};
  var labelStyle = {color: '#FF4B66'};
  var textboxStyle = {height: 40, borderColor: 'gray', borderWidth: 1};

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{locals.label}</Text>
      <TextInput style={textboxStyle} />
    </View>
  );
}

const WorkOrder = t.struct({
  workOrderInformation: t.struct({
    svmx_work_order_number: t.Number,
    svmx_contact: t.maybe(t.String)
  }),
  active: t.Boolean,
  Date: t.Date,
  Descriptions: t.struct({
    dynamicField: t.maybe(t.String),
    search: t.list(t.String),
    svmx_subject: t.maybe(t.String),
    Option: t.maybe(Options),
    svmx_description: t.maybe(t.String)
  })
});

var listTransformer = {
  format: function (value) {
    return Array.isArray(value) ? value.join(' ') : value;
  },
  parse: function (str) {
    return str ? str.split(' ') : [];
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
      type: WorkOrder,
      workOrders: ds.cloneWithRows([]),
      db: [],
      workOrderValue: {Descriptions: {search: ['climbing', 'yosemite']}},
      currentRecordId: null,
      options: {
        fields: {
          workOrderInformation: {
            fields: {
              svmx_work_order_number: {
                label: 'Work Order Number',
                // template: myCustomTemplate
                placeholder: 'Your placeholder here'
              },
              svmx_contact: {
                label: 'Contact',
                help: 'Help message'
              }
            },
            label: 'Work Order Information'
            // stylesheet: stylesheet
          },
          Descriptions: {
            fields: {
              dynamicField: {
                onFocus: this.optionOnFocus.bind(this)
              },
              svmx_subject: {
                label: 'Subject'
              },
              svmx_description: {
                label: 'Description'
              },
              search: {
                factory: t.form.Textbox, // tell tcomb-react-native to use the same component for textboxes
                transformer: listTransformer,
                help: 'Keywords are separated by spaces'
              }
            }
          }
        }
      }
    };

    this.getWorkOrders();
  }

  optionOnFocus() {
    console.log('Option on focus');
    DynamicOptions = t.enums({
        A: 'OptionA',
        B: 'OptionB',
        C: 'OptionCd'
    });

    WorkOrder = t.struct({
      workOrderInformation: t.struct({
        svmx_work_order_number: t.String,
        svmx_contact: t.maybe(t.String)
      }),
      active: t.Boolean,
      Date: t.Date,
      Descriptions: t.struct({
        dynamicField: t.maybe(DynamicOptions),
        search: t.list(t.String),
        svmx_subject: t.maybe(t.String),
        Option: t.maybe(Options),
        svmx_description: t.maybe(t.String)
      })
    });
    setTimeout(() => {
      this.setState({
        type: WorkOrder
      });
    }, 3000);
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
    // this.optionOnFocus();
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
          <View style={{flex: 11, alignItems: 'center'}}>
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
                type={this.state.type}
                options={this.state.options}
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
