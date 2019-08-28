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
  SafeAreaView,
} from 'react-native';
import {fbs} from '../Config';
import close from '../../gambar/close.png';
import imagenotfound from '../../gambar/imagenotfound.png';

const {width: WIDTH} = Dimensions.get('window');

// create a component
class ModalPesanan extends Component {
  state = {
    uid: '',
    keydetail: this.props.navigation.state.params.detailkey,
    nama_kost: this.props.navigation.state.params.nama_kost,
    foto_kost: this.props.navigation.state.params.foto_kost,
    alamat_kost: this.props.navigation.state.params.alamat_kost,
    harga_kost: this.props.navigation.state.params.harga_kost,
    uidPembuat: this.props.navigation.state.params.uidPembuat,
  };
  tutup() {
    this.props.navigation.goBack();
  }
  hapus(key) {
    let uid = fbs.auth.currentUser.uid;
    Alert.alert('Simpan Kost', 'Apakah anda ingin menghapus kost ini ?', [
      {
        text: 'Iya',
        onPress: () => {
          fbs.database
            .ref('/kosts_pesanan')
            .child(uid)
            .child(key)
            .remove()
            .then(this.props.navigation.goBack());
        },
      },
      {
        text: 'Tidak',
      },
    ]);
  }

  chat(uidPembuat, nama_kost, foto_kost) {
    this.props.navigation.navigate('ViewPesan', {
      uidPembuat: uidPembuat,
      nama_kost: nama_kost,
      foto: foto_kost,
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
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
            this.state.foto_kost === ''
              ? imagenotfound
              : {uri: this.state.foto_kost}
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
              {this.state.nama_kost}
            </Text>
            <Text style={{fontSize: 15, fontWeight: 'bold', paddingTop: 10}}>
              {this.state.alamat_kost}
            </Text>
            <Text style={{fontSize: 15, paddingTop: 10}}>
              {this.state.harga_kost}
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
            onPress={() => this.hapus(this.state.keydetail)}>
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
            onPress={() =>
              this.chat(
                this.state.uidPembuat,
                this.state.nama_kost,
                this.state.foto_kost,
              )
            }>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '700',
                fontFamily: 'sans-serif',
                color: '#fff',
              }}>
              Chat
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
export default ModalPesanan;
