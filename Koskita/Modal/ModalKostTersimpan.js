//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {fbs} from '../Config';
import close from '../../gambar/close.png';
import imagenotfound from '../../gambar/imagenotfound.png';

const {width: WIDTH} = Dimensions.get('window');

// create a component
class ModalKostTersimpan extends Component {
  state = {
    visible: false,
  };
  muncul() {
    if (this.state.visible === false) {
      this.setState({visible: true});
    }
  }
  tutup() {
    this.setState({visible: false});
  }
  hapus(key) {
    let uid = fbs.auth.currentUser.uid;
    Alert.alert('Hapus Kost', 'Apakah anda ingin menghapus kost ini ?', [
      {
        text: 'Iya',
        onPress: () => {
          fbs.database
            .ref('/kosts_tersimpan')
            .child(uid)
            .child(key)
            .remove();
          this.setState({visible: false});
        },
      },
      {
        text: 'Tidak',
      },
    ]);
  }
  pesan(key) {
    let uid = fbs.auth.currentUser.uid;
    Alert.alert('Pesan Kost', 'Apakah anda ingin memesan kost ini ?', [
      {
        text: 'Iya',
        onPress: () => {
          fbs.database
            .ref('/kosts_pesanan')
            .child(uid)
            .child(key)
            .set({
              nama_kost: this.props.nama_kost,
              alamat_kost: this.props.alamat_kost,
              harga_kost: this.props.harga_kost,
              foto_kost: this.props.foto_kost,
              status: 'belum',
              uid: key,
              uidPembuat: this.props.uidPembuat,
            })
            .then(
              fbs.database
                .ref('/kosts_tersimpan')
                .child(uid)
                .child(key)
                .remove(),
            );
          this.setState({visible: false});
        },
      },
      {
        text: 'Tidak',
      },
    ]);
  }
  render() {
    return (
      <Modal
        style={{alignItems: 'center'}}
        visible={this.state.visible}
        animationType="slide">
        <TouchableOpacity
          onPress={this.tutup.bind(this)}
          style={{
            width: 25,
            height: 25,
            borderRadius: 15,
            backgroundColor: '#fff',
            zIndex: 1,
            position: 'absolute',
            marginTop: 10,
            marginLeft: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={close}
            style={{
              width: 10,
              height: 10,
            }}
          />
        </TouchableOpacity>

        <Image
          style={{width: WIDTH, height: 200}}
          source={
            this.props.foto_kost === ''
              ? imagenotfound
              : {uri: this.props.foto_kost}
          }
        />
        <View
          style={{
            paddingTop: 20,
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: WIDTH - 30,
              height: 100,
            }}>
            <Text style={{fontSize: 20, color: 'red', fontWeight: '500'}}>
              {this.props.nama_kost}
            </Text>
            <Text style={{fontSize: 15, fontWeight: 'bold', paddingTop: 10}}>
              {this.props.alamat_kost}
            </Text>
            <Text style={{fontSize: 15, paddingTop: 10}}>
              {this.props.harga_kost}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingTop: 20,
          }}>
          <TouchableOpacity
            style={{
              width: WIDTH - 200,
              height: 50,
              backgroundColor: '#c0392b',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
            onPress={() => this.hapus(this.props.detailkey)}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '700',
                fontFamily: 'sans-serif',
                color: '#fff',
              }}>
              Hapus
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: WIDTH - 200,
              height: 50,
              backgroundColor: '#2980b9',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
            onPress={() => this.pesan(this.props.detailkey)}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '700',
                fontFamily: 'sans-serif',
                color: '#fff',
              }}>
              Pesan
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default ModalKostTersimpan;
