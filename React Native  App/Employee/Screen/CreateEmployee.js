// import React, {useState} from 'react';
// import {View, Text, StyleSheet, Modal, Alert} from 'react-native';
// import { Button, Card, TextInput } from "react-native-paper";
//
// const CreateEmployee = () => {
//   const [Name, setName] = useState('');
//   const [Position, setPosition] = useState('');
//   const [Gmail, setGmail] = useState('');
//   const [Phone, setPhone] = useState('');
//   const [Blood, setBlood] = useState('');
//   const [Image, setImage] = useState('');
//   const [modal, setModal] = useState('false');
//
//   function insertFromCamera() {
//     Alert.alert('hello');
//   }
//   return (
//     <Card style={{flex: 1, margin: 8, backgroundColor: '#f6f5f5'}}>
//       <TextInput
//         style={styles.textInput}
//         label="Name"
//         mode={'outlined'}
//         placeholder="Enter your name"
//         value={Name}
//         theme={themes}
//         onChangeText={(text) => setName(text)}
//       />
//       <TextInput
//         style={styles.textInput}
//         label="Position"
//         mode={'outlined'}
//         placeholder="Enter your position in office"
//         value={Position}
//         theme={themes}
//         onChangeText={(text) => setPosition(text)}
//       />
//       <TextInput
//         style={styles.textInput}
//         label="Gmail"
//         mode={'outlined'}
//         placeholder="Enter your gmail"
//         value={Gmail}
//         theme={themes}
//         onChangeText={(text) => setGmail(text)}
//       />
//       <TextInput
//         style={styles.textInput}
//         label="Phone Number"
//         mode={'outlined'}
//         placeholder="Enter your number"
//         theme={themes}
//         value={Phone}
//         onChangeText={(text) => setPhone(text)}
//       />
//       <TextInput
//         style={styles.textInput}
//         label="Blood Group"
//         mode={'outlined'}
//         placeholder="Enter your blood group"
//         theme={themes}
//         value={Blood}
//         onChangeText={(text) => setBlood(text)}
//       />
//       <Button
//         style={{fontSize: 20, marginHorizontal: 8, margin: 10}}
//         icon={Image == '' ? 'upload' : 'check'}
//         mode="contained"
//         theme={themes}
//         onPress={() => setModal(true)}>
//         Upload Image
//       </Button>
//       <Button
//         style={{fontSize: 20, marginHorizontal: 8, margin: 10}}
//         icon="content-save"
//         mode="contained"
//         theme={themes}
//         onPress={() => setModal(true)}>
//         Save
//       </Button>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modal}
//         onRequestClose={() => setModal('false')}>
//         <View style={styles.modalView}>
//           <View style={styles.modalButton}>
//             <Button
//               style={{fontSize: 20}}
//               icon="camera"
//               mode="contained"
//               theme={themes}
//               onPress={() => insertFromCamera()}>
//               Camera
//             </Button>
//             <Button
//               style={{fontSize: 20}}
//               icon="image-area"
//               mode="contained"
//               theme={themes}
//               onPress={() => setModal(true)}>
//               Gallery
//             </Button>
//           </View>
//           <Button
//             style={{fontSize: 20}}
//             mode="outlined"
//             onPress={() => setModal(false)}>
//             Cancel
//           </Button>
//         </View>
//       </Modal>
//     </Card>
//   );
// };
//
// const themes = {
//   colors: {
//     primary: 'blue',
//     fontSize: 25,
//   },
// };
//
// const styles = StyleSheet.create({
//   textInput: {
//     fontSize: 20,
//     margin: 8,
//     backgroundColor: 'white',
//   },
//   modalButton: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 10,
//   },
//   modalView: {
//     position: 'absolute',
//     bottom: 2,
//     width: '100%',
//     backgroundColor: '#e5e2e2',
//   },
// });
// export default CreateEmployee;
