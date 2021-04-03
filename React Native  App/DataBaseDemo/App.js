/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';


import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'UserDatabase.db'});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: 'akhzar',
      user_contact: '03219434203',
      user_address: 'Alhafeez',
      input_user_id: 2,
    };

    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }

  // constructor(props) {
  //     super(props);
  //     db.transaction(function(txn) {
  //       txn.executeSql(
  //         "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
  //         [],
  //         function(tx, res) {
  //           Alert.alert('item is = ' + res.rows.length);
  //           console.log('item:', res.rows.length);
  //           if (res.rows.length == 0) {
  //             txn.executeSql('DROP TABLE IF EXISTS table_user', []);
  //             txn.executeSql(
  //               'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
  //               []
  //             );
  //           }
  //         }
  //       );
  //     });
  //   }

  InsertDBAction = () => {
    console.log('insertDB Called');
    if (this.state.user_name) {
      if (this.state.user_contact) {
        if (this.state.user_address) {
          db.transaction((tx) => {
            // Loop would be here in case of many values

            tx.executeSql(
              'INSERT INTO table_user (user_id, user_name, user_contact, user_address) VALUES (?,?,?,?)',
              [
                this.state.input_user_id,
                this.state.user_name,
                this.state.user_contact,
                this.state.user_address,
              ],
              (tx, results) => {
                console.log('Insert Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'User updated successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                          that.props.navigation.navigate('HomeScreen'),
                      },
                    ],
                    {cancelable: false},
                  );
                } else {
                  alert('Updation Failed');
                }
              },
            );
          });

          //  db.transaction(function(tx) {
          //    tx.executeSql(
          //      'INSERT INTO table_user (user_id, user_name, user_contact, user_address) VALUES (?,?,?,?)',
          //      [this.state.input_user_id, this.state.user_name, this.state.user_contact, this.state.user_address],
          //      (tx, results) => {
          //        console.log('Results', results.rowsAffected);
          //        if (results.rowsAffected > 0) {
          //          Alert.alert(
          //            'Success',
          //            'You are Registered Successfully',
          //            [
          //              {
          //                text: 'Ok',
          //                onPress: () =>
          //                  that.props.navigation.navigate('HomeScreen'),
          //              },
          //            ],
          //            { cancelable: false }
          //          );
          //        } else {
          //          alert('Registration Failed');
          //        }
          //      }
          //    );
          //  });
        } else {
          alert('Please fill Address');
        }
      } else {
        alert('Please fill Contact Number');
      }
    } else {
      alert('Please fill Name');
    }
  };

  SelectDBAction = () => {
    console.log('Select DB is Called');

    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var len = results.rows.length;
        console.log('select * results are = ', len);
        if (len > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            console.log(results.rows.item(i).user_name);
          }

          this.setState({
            user_name: results.rows.item(0).user_name,
          });
          this.setState({
            user_contact: results.rows.item(0).user_contact,
          });
          this.setState({
            user_address: results.rows.item(0).user_address,
          });
        } else {
          alert('No user found');
          //  this.setState({
          //    user_name:'',
          //    user_contact:'',
          //    user_address:'',
          //  });
        }
      });
    });
  };

  UpdateDBAction = () => {
    console.log('Select DB is Called');

    this.setState({
      user_name: 'NTU',
      user_contact: '1122',
      user_address: 'Updated Address',
      input_user_id: 1,
    });

    if (this.state.user_name) {
      if (this.state.user_contact) {
        if (this.state.user_address) {
          db.transaction((tx) => {
            tx.executeSql(
              'UPDATE table_user set user_name=?, user_contact=? , user_address=? where user_id=?',
              [
                this.state.user_name,
                this.state.user_contact,
                this.state.user_address,
                this.state.input_user_id,
              ],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'User updated successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                          that.props.navigation.navigate('HomeScreen'),
                      },
                    ],
                    {cancelable: false},
                  );
                } else {
                  alert('Updation Failed');
                }
              },
            );
          });
        } else {
          alert('Please fill Address');
        }
      } else {
        alert('Please fill Contact Number');
      }
    } else {
      alert('Please fill Name');
    }
  };

  DeleteRowDBAction = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_user where user_id=3',
        [],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => that.props.navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid User Id');
          }
        },
      );
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
        <Text> In the name of Allah </Text>

        <TouchableOpacity
          onPress={() => this.InsertDBAction()}
          style={{
            marginLeft: 40,
            marginRight: 40,
            marginBottom: 20,
            marginTop: 40,
            backgroundColor: '#E8590A',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
          }}>
          <Text> Insert into Database </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.SelectDBAction()}
          style={{
            marginLeft: 40,
            marginRight: 40,
            marginBottom: 20,
            marginTop: 40,
            backgroundColor: '#E8590A',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
          }}>
          <Text> Select DB Action </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.UpdateDBAction()}
          style={{
            marginLeft: 40,
            marginRight: 40,
            marginBottom: 20,
            marginTop: 40,
            backgroundColor: '#E8590A',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
          }}>
          <Text> Update DB Action </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.DeleteRowDBAction()}
          style={{
            marginLeft: 40,
            marginRight: 40,
            marginBottom: 20,
            marginTop: 40,
            backgroundColor: '#E8590A',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
          }}>
          <Text> Delete DB Action </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
