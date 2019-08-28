//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {fbs} from '../Config';
import edit from '../../gambar/edit.png';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import man from '../../gambar/man.png';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
const {width: WIDTH} = Dimensions.get('window');
class EditProfile extends Component {
  state = {
    editable: false,
    disabledButton: true,
    textEdit: 'Edit',
    nama_user: '',
    alamat_user: '',
    no_telp: '',
    email_user: '',
    foto_user: '',
    urlFoto: '',
    name_image: '',
  };

  bukaimage() {
    const options = {
      title: 'Choose Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response.uri;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          foto_user: source,
          name_image: response.fileName,
        });
      }
    });
  }

  editProfil(uri, mime = 'image/jpeg', name) {
    if (name === '') {
      let uidUser = fbs.auth.currentUser.uid;
      fbs.database
        .ref('/users')
        .child(uidUser)
        .update({
          nama_user: this.state.nama_user,
          alamat_user: this.state.alamat_user,
          no_telp: this.state.no_telp,
        })
        .then(
          this.setState(prevState => {
            return {
              textEdit: 'Edit',
              editable: false,
              disabledButton: true,
            };
          }),
        );
    } else {
      return new Promise((resolve, reject) => {
        let imgUri = uri;
        let uploadBlob = null;
        const uploadUri =
          Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
        const currentUser = fbs.auth.currentUser.uid;
        const imageRef = fbs.storage.ref(`/users/${currentUser}`);

        fs.readFile(uploadUri, 'base64')
          .then(data => {
            return Blob.build(data, {type: `${mime};BASE64`});
          })
          .then(blob => {
            uploadBlob = blob;
            return imageRef.put(blob, {contentType: mime, name: name});
          })
          .then(() => {
            uploadBlob.close();
            return imageRef.getDownloadURL();
          })
          .then(url => {
            let uidUser = fbs.auth.currentUser.uid;
            fbs.database
              .ref('/users')
              .child(uidUser)
              .update({
                nama_user: this.state.nama_user,
                alamat_user: this.state.alamat_user,
                no_telp: this.state.no_telp,
                foto_user: url,
              })
              .then(
                this.setState(prevState => {
                  return {
                    textEdit: 'Edit',
                    editable: false,
                    disabledButton: true,
                  };
                }),
              );
            resolve(url);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }

  onInput() {
    if (this.state.textEdit === 'Edit') {
      this.setState({
        textEdit: 'Simpan',
        editable: true,
        disabledButton: false,
      });
    } else {
      Alert.alert(
        'Simpan Profil',
        'Apakah anda yakin ingin mengubah profil ?',
        [
          {
            text: 'Iya',
            onPress: () =>
              this.editProfil(
                this.state.foto_user,
                'image/jpeg',
                this.state.name_image,
              ),
          },
          {
            text: 'Tidak',
          },
        ],
      );
    }
  }

  componentDidMount() {
    let uidUser = fbs.auth.currentUser.uid;
    fbs.database
      .ref('/users')
      .child(uidUser)
      .on('value', snapshot => {
        this.setState(prevState => {
          return {
            nama_user: snapshot.val().nama_user,
            alamat_user: snapshot.val().alamat_user,
            no_telp: snapshot.val().no_telp,
            email_user: snapshot.val().email_user,
            foto_user: snapshot.val().foto_user,
          };
        });
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{paddingHorizontal: 20}}>
          <View style={{paddingTop: 25, alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 18, fontWeight: '500'}}>
              Edit Profil
            </Text>
          </View>
          <View style={{alignItems: 'center', paddingTop: 20}}>
            <TouchableOpacity
              style={{position: 'absolute', zIndex: 2, right: 110, top: 90}}
              onPress={() => this.bukaimage()}
              disabled={this.state.disabledButton}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                }}>
                <Image source={edit} style={{width: 20, height: 20}} />
              </View>
            </TouchableOpacity>
            <Image
              source={
                this.state.foto_user === 'default'
                  ? man
                  : {uri: this.state.foto_user}
              }
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
          </View>
          <View style={{alignItems: 'center', paddingTop: 25}}>
            <TextInput
              placeholder="Nama"
              placeholderTextColor="#dddddd"
              value={this.state.nama_user}
              editable={this.state.editable}
              underlineColorAndroid="transparent"
              onChangeText={nama => this.setState({nama_user: nama})}
              style={{
                borderRadius: 5,
                elevation: 1,
                height: 50,
                width: WIDTH - 45,
                backgroundColor: '#fff',
                justifyContent: 'center',
                color: '#000',
                fontSize: 15,
              }}
            />
          </View>
          <View style={{alignItems: 'center', paddingTop: 25}}>
            <TextInput
              placeholder="Alamat"
              placeholderTextColor="#dddddd"
              value={this.state.alamat_user}
              editable={this.state.editable}
              underlineColorAndroid="transparent"
              onChangeText={alamat => this.setState({alamat_user: alamat})}
              style={{
                borderRadius: 5,
                elevation: 1,
                height: 50,
                width: WIDTH - 45,
                backgroundColor: '#fff',
                justifyContent: 'center',
                color: '#000',
                fontSize: 15,
              }}
            />
          </View>
          <View style={{alignItems: 'center', paddingTop: 25}}>
            <TextInput
              placeholder="No Telp"
              placeholderTextColor="#dddddd"
              value={this.state.no_telp}
              editable={this.state.editable}
              keyboardType="phone-pad"
              underlineColorAndroid="transparent"
              onChangeText={telp => this.setState({no_telp: telp})}
              style={{
                borderRadius: 5,
                elevation: 1,
                height: 50,
                width: WIDTH - 45,
                backgroundColor: '#fff',
                justifyContent: 'center',
                color: '#000',
                fontSize: 15,
                textAlign: 'left',
              }}
            />
          </View>
          <View style={{alignItems: 'center', paddingTop: 25}}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#dddddd"
              value={this.state.email_user}
              editable={false}
              underlineColorAndroid="transparent"
              style={{
                borderRadius: 5,
                elevation: 1,
                height: 50,
                width: WIDTH - 45,
                backgroundColor: '#fff',
                justifyContent: 'center',
                color: '#000',
                fontSize: 15,
                textAlign: 'left',
              }}
            />
          </View>
          <View style={{paddingTop: 25}}>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableHighlight
                onPress={() => this.onInput()}
                style={{
                  width: WIDTH - 260,
                  height: 45,
                  backgroundColor: '#27ae60',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    fontFamily: 'sans-serif',
                    color: '#fff',
                  }}>
                  {this.state.textEdit}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ee5253',
  },
});

//make this component available to the app
export default EditProfile;
