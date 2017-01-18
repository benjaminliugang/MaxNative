'use strict';

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);
SQLite.enablePromise(false);

var database_name = "Max.db";
var database_version = "1.0";
var database_displayname = "SQLite Max Database";
var database_size = 200000;
var db;

class SQLiteDemo extends Component {
    constructor(props) {
      super(props);
      this.state = {
        progress: [],
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
      };
    }

    componentWillUnmount(){
        this.closeDatabase();
    }

    errorCB(err) {
        console.log("error: ",err);
        this.state.progress.push("Error: "+ (err.message || err));
        this.setState(this.state);
        return false;
    }

    successCB() {
        console.log("SQL executed ...");
    }

    openCB() {
        this.state.progress.push("Database OPEN");
        this.setState(this.state);
    }

    closeCB() {
        this.state.progress.push("Database CLOSED");
        this.setState(this.state);
    }

    deleteCB() {
        console.log("Database DELETED");
        this.state.progress.push("Database DELETED");
        this.setState(this.state);
    }

    populateDatabase(db){
        var that = this;
        that.state.progress.push("Database integrity check");
        that.setState(that.state);
        db.executeSql('SELECT 1 FROM Version LIMIT 1', [],
            function () {
                that.state.progress.push("Database is ready ... executing query ...");
                that.setState(that.state);
                db.transaction(that.queryEmployees.bind(that),that.errorCB.bind(that),function() {
                    that.state.progress.push("Processing completed");
                    that.setState(that.state);
                });
            },
            function (error) {
                console.log("received version error:", error);
                that.state.progress.push("Database not yet ready ... populating data");
                that.setState(that.state);
                db.transaction(that.populateDB.bind(that), that.errorCB.bind(that), function () {
                    that.state.progress.push("Database populated ... executing query ...");
                    that.setState(that.state);
                    db.transaction(that.queryEmployees.bind(that),that.errorCB.bind(that), function () {
                        console.log("Transaction is now finished");
                        that.state.progress.push("Processing completed");
                        that.setState(that.state);
                        that.closeDatabase();
                    });
                });
            });
    }

    populateDB(tx) {
        this.state.progress.push("Executing DROP stmts");
        this.setState(this.state);

        tx.executeSql('DROP TABLE IF EXISTS Employees;');
        tx.executeSql('DROP TABLE IF EXISTS Offices;');
        tx.executeSql('DROP TABLE IF EXISTS Departments;');

        this.state.progress.push("Executing CREATE stmts");
        this.setState(this.state);

        tx.executeSql('CREATE TABLE IF NOT EXISTS Version( '
            + 'version_id INTEGER PRIMARY KEY NOT NULL); ', [], this.successCB.bind(this), this.errorCB.bind(this));

        tx.executeSql('CREATE TABLE IF NOT EXISTS Departments( '
            + 'department_id INTEGER PRIMARY KEY NOT NULL, '
            + 'name VARCHAR(30) ); ', [], this.successCB.bind(this), this.errorCB.bind(this));

        tx.executeSql('CREATE TABLE IF NOT EXISTS Offices( '
            + 'office_id INTEGER PRIMARY KEY NOT NULL, '
            + 'name VARCHAR(20), '
            + 'longtitude FLOAT, '
            + 'latitude FLOAT ) ; ', [], this.successCB.bind(this), this.errorCB.bind(this));

        tx.executeSql('CREATE TABLE IF NOT EXISTS Employees( '
            + 'employe_id INTEGER PRIMARY KEY NOT NULL, '
            + 'name VARCHAR(55), '
            + 'office INTEGER, '
            + 'department INTEGER, '
            + 'FOREIGN KEY ( office ) REFERENCES Offices ( office_id ) '
            + 'FOREIGN KEY ( department ) REFERENCES Departments ( department_id ));', []);

        this.state.progress.push("Executing INSERT stmts");
        this.setState(this.state);

        tx.executeSql('INSERT INTO Departments (name) VALUES ("Client Services");', []);
        tx.executeSql('INSERT INTO Departments (name) VALUES ("Investor Services");', []);
        tx.executeSql('INSERT INTO Departments (name) VALUES ("Shipping");', []);
        tx.executeSql('INSERT INTO Departments (name) VALUES ("Direct Sales");', []);

        tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("Denver", 59.8,  34.);', []);
        tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("Warsaw", 15.7, 54.);', []);
        tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("Berlin", 35.3, 12.);', []);
        tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("Paris", 10.7, 14.);', []);

        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Sylvester Stallone", 2,  4);', []);
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Elvis Presley", 2, 4);', []);
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Leslie Nelson", 3,  4);', []);
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Fidel Castro", 3, 3);', []);
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Bill Clinton", 1, 3);', []);
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Margaret Thatcher", 1, 3);', []);
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Donald Trump", 1, 3);', []);
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Dr DRE", 2, 2);', []);
        tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Samantha Fox", 2, 1);', []);
        console.log("all config SQL done");
    }

    queryEmployees(tx) {
        console.log("Executing sql...");
        tx.executeSql('SELECT a.name, b.name as deptName FROM Employees a, Departments b WHERE a.department = b.department_id and a.department=?', [3],
            this.queryEmployeesSuccess.bind(this),this.errorCB.bind(this));
        //tx.executeSql('SELECT a.name, from TEST', [],() => {},this.errorCB);
    }

    queryEmployeesSuccess(tx,results) {
        this.state.progress.push("Query completed");
        this.setState(this.state);
        var len = results.rows.length;
        for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            this.state.progress.push(`Empl Name: ${row.name}, Dept Name: ${row.deptName}`);
        }
        this.setState(this.state);
    }

    loadAndQueryDB(){
        this.state.progress.push("Opening database ...");
        this.setState(this.state);
        db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, this.openCB.bind(this), this.errorCB.bind(this));
        this.populateDatabase(db);
    }

    deleteDatabase(){
        this.state.progress = ["Deleting database"];
        this.setState(this.state);
        SQLite.deleteDatabase(database_name, this.deleteCB.bind(this), this.errorCB.bind(this));
    }

    closeDatabase(){
        var that = this;
        if (db) {
            console.log("Closing database ...");
            that.state.progress.push("Closing database");
            that.setState(that.state);
            db.close(that.closeCB.bind(this),that.errorCB.bind(this));
        } else {
            that.state.progress.push("Database was not OPENED");
            that.setState(that.state);
        }
    }

    runDemo(){
        this.state.progress = ["Starting SQLite Demo"];
        this.setState(this.state);
        this.loadAndQueryDB();
    }
};

var populateDB = (tx) => {
    console.log('Database initialize.');
    tx.executeSql('DROP TABLE IF EXISTS WorkOrder;');
    tx.executeSql('CREATE TABLE IF NOT EXISTS WorkOrder( '
        + 'id INTEGER PRIMARY KEY NOT NULL, '
        + 'svmx_work_order_number VARCHAR(20), '
        + 'svmx_account VARCHAR(20), '
        + 'svmx_contact VARCHAR(20), '
        + 'svmx_subject VARCHAR(20), '
        + 'svmx_description VARCHAR(55), '
        + 'svmx_top_level_product VARCHAR(20) ) ; ', [], () => {console.log('WorkOrder created.')}, () => {console.log('WorkOrder create failed.')});

    tx.executeSql('INSERT INTO WorkOrder (svmx_work_order_number, svmx_account, svmx_contact, svmx_top_level_product, svmx_subject, svmx_description) VALUES ("001", "Test001", "157****9822", "LevelA", "Subject", "Subject Description");', []);
    tx.executeSql('INSERT INTO WorkOrder (svmx_work_order_number, svmx_account, svmx_contact, svmx_top_level_product, svmx_subject, svmx_description) VALUES ("002", "Test002", "157****9822", "LevelA", "Subject", "Subject Description");', []);
    tx.executeSql('INSERT INTO WorkOrder (svmx_work_order_number, svmx_account, svmx_contact, svmx_top_level_product, svmx_subject, svmx_description) VALUES ("003", "Test003", "157****9822", "LevelA", "Subject", "Subject Description");', []);
    tx.executeSql('INSERT INTO WorkOrder (svmx_work_order_number, svmx_account, svmx_contact, svmx_top_level_product, svmx_subject, svmx_description) VALUES ("004", "Test004", "157****9822", "LevelA", "Subject", "Subject Description");', []);
    tx.executeSql('INSERT INTO WorkOrder (svmx_work_order_number, svmx_account, svmx_contact, svmx_top_level_product, svmx_subject, svmx_description) VALUES ("005", "Test005", "157****9822", "LevelA", "Subject", "Subject Description");', []);
    tx.executeSql('INSERT INTO WorkOrder (svmx_work_order_number, svmx_account, svmx_contact, svmx_top_level_product, svmx_subject, svmx_description) VALUES ("006", "Test006", "157****9822", "LevelA", "Subject", "Subject Description");', []);
    tx.executeSql('INSERT INTO WorkOrder (svmx_work_order_number, svmx_account, svmx_contact, svmx_top_level_product, svmx_subject, svmx_description) VALUES ("007", "Test007", "157****9822", "LevelA", "Subject", "Subject Description");', []);
    tx.executeSql('INSERT INTO WorkOrder (svmx_work_order_number, svmx_account, svmx_contact, svmx_top_level_product, svmx_subject, svmx_description) VALUES ("008", "Test008", "157****9822", "LevelA", "Subject", "Subject Description");', []);
    tx.executeSql('INSERT INTO WorkOrder (svmx_work_order_number, svmx_account, svmx_contact, svmx_top_level_product, svmx_subject, svmx_description) VALUES ("009", "Test009", "157****9822", "LevelA", "Subject", "Subject Description");', []);
    tx.executeSql('INSERT INTO WorkOrder (svmx_work_order_number, svmx_account, svmx_contact, svmx_top_level_product, svmx_subject, svmx_description) VALUES ("010", "Test010", "157****9822", "LevelA", "Subject", "Subject Description");', []);
    tx.executeSql('INSERT INTO WorkOrder (svmx_work_order_number, svmx_account, svmx_contact, svmx_top_level_product, svmx_subject, svmx_description) VALUES ("011", "Test011", "157****9822", "LevelA", "Subject", "Subject Description");', []);
    tx.executeSql('INSERT INTO WorkOrder (svmx_work_order_number, svmx_account, svmx_contact, svmx_top_level_product, svmx_subject, svmx_description) VALUES ("012", "Test012", "157****9822", "LevelA", "Subject", "Subject Description");', []);
    tx.executeSql('INSERT INTO WorkOrder (svmx_work_order_number, svmx_account, svmx_contact, svmx_top_level_product, svmx_subject, svmx_description) VALUES ("013", "Test013", "157****9822", "LevelA", "Subject", "Subject Description");', []);
    tx.executeSql('INSERT INTO WorkOrder (svmx_work_order_number, svmx_account, svmx_contact, svmx_top_level_product, svmx_subject, svmx_description) VALUES ("014", "Test014", "157****9822", "LevelA", "Subject", "Subject Description");', []);

    tx.executeSql('DROP TABLE IF EXISTS ObjectActions;');
    tx.executeSql('CREATE TABLE IF NOT EXISTS ObjectActions( '
        + 'id INTEGER PRIMARY KEY NOT NULL, '
        + 'name VARCHAR(20), '
        + 'description VARCHAR(20)) ; ', [], () => {console.log('ObjectActions created.')}, () => {console.log('ObjectActions create failed.')});

    tx.executeSql('INSERT INTO ObjectActions (name, description) VALUES ("Create New RAM", "Create New RAM description");', []);
    tx.executeSql('INSERT INTO ObjectActions (name, description) VALUES ("Create New Shipment Order", "Create New Shipment Order description");', []);

    tx.executeSql('DROP TABLE IF EXISTS Object;');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Object( '
        + 'id INTEGER PRIMARY KEY NOT NULL, '
        + 'name VARCHAR(20), '
        + 'description VARCHAR(20)) ; ', [], () => {console.log('Object created.')}, () => {console.log('Object create failed.')});

    tx.executeSql('INSERT INTO Object (name, description) VALUES ("Work Order", "Work Order description");', []);
    tx.executeSql('INSERT INTO Object (name, description) VALUES ("Case", "Case description");', []);
    tx.executeSql('INSERT INTO Object (name, description) VALUES ("Contact", "Contact description");', []);
    tx.executeSql('INSERT INTO Object (name, description) VALUES ("Event", "Event description");', []);
    tx.executeSql('INSERT INTO Object (name, description) VALUES ("Location", "Location description");', []);
    tx.executeSql('INSERT INTO Object (name, description) VALUES ("Parts Order", "Parts Order description");', []);
    tx.executeSql('INSERT INTO Object (name, description) VALUES ("ServicePlan", "ServicePlan description");', []);
    tx.executeSql('INSERT INTO Object (name, description) VALUES ("Service Pricebook", "Service Pricebook description");', []);
    tx.executeSql('INSERT INTO Object (name, description) VALUES ("ServiceMax Event", "ServiceMax Event description");', []);

    console.log("all config SQL done");
};

module.exports = { dbFunction:
  {
    initDB: () => {
      db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, () => { console.log('DB opened!')}, () => { console.log('Failed to open DB!')});
      db.executeSql('SELECT 1 FROM WorkOrder LIMIT 1', [], () => { console.log('Database already initialized!'); },
          (error) => {
            db.transaction(populateDB, () => {console.error('Database initialize failed.')}, () => { console.log('Database is ready!'); });
          });
    },

    updateRecord: (objectID, data, recordId, successCallback, errorCallback) => {
      if (db) {
        if (!successCallback) {
          successCallback = () => {
            console.error('Update record successfully!');
          }
        }
        if (!errorCallback) {
          errorCallback = () => {
            console.error('Update records failed.');
          }
        }

        switch (objectID) {
          case 'WorkOrder':
            let statement = `UPDATE WorkOrder SET svmx_work_order_number = "${data.workOrderInformation.svmx_work_order_number}",
              svmx_contact = "${data.workOrderInformation.svmx_contact}",
               svmx_subject = "${data.Descriptions ? data.Descriptions.svmx_subject : ''}",
               svmx_description = "${data.Descriptions ? data.Descriptions.svmx_description : ''}" WHERE id = "${recordId}"`;
            db.executeSql(statement, []);
            break;
          default:
            consle.error(`No ${objectID} id.`);
        }
      }
    },

    insertRecord: (objectID, data, successCallback, errorCallback) => {
      if (db) {
        if (!successCallback) {
          successCallback = () => {
            console.error('Create record successfully!');
          }
        }
        if (!errorCallback) {
          errorCallback = () => {
            console.error('Create records failed.');
          }
        }

        switch (objectID) {
          case 'WorkOrder':
            let statement = `INSERT INTO WorkOrder (svmx_work_order_number, svmx_contact,
               svmx_subject, svmx_description) VALUES ("${data.workOrderInformation.svmx_work_order_number}",
              "${data.workOrderInformation.svmx_contact}", "${data.Descriptions ? data.Descriptions.svmx_subject : ''}", "${data.Descriptions ? data.Descriptions.svmx_description : ''}");`;
            db.executeSql(statement, [], successCallback);
            break;
          default:
            consle.error(`No ${objectID} id.`);
        }
      }
    },

    getRecords: (objectID, successCallback, errorCallback) => {
      if (db) {
        if (!successCallback) {
          console.error('Please pass success callback function.');
        }
        if (!errorCallback) {
          errorCallback = () => {
            console.error('Query records failed.');
          }
        }
        switch (objectID) {
          case 'WorkOrder':
            db.executeSql('SELECT id, svmx_work_order_number, svmx_account, svmx_contact, svmx_top_level_product, svmx_subject, svmx_description FROM WorkOrder', [],
                successCallback, errorCallback);
            break;
          case 'ObjectActions':
            db.executeSql('SELECT name, description FROM ObjectActions', [],
                successCallback, errorCallback);
            break;
          case 'Object':
            db.executeSql('SELECT name, description FROM Object', [],
                successCallback, errorCallback);
            break;
          default:
            consle.error(`No ${objectID} id.`);
        }
      } else {
        console.error('DB does not initialized.');
      }
    },

    clearDB: () => {

    }
  }
}
