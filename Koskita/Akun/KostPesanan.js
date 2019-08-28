//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import KomponenPesanan from './KostPesanan/KomponenPesanan';
import {fbs} from '../Config';
import {Item} from 'native-base';
// create a component
class KostPesanan extends Component {
  state = {
    listPesanan: [],
    nama_kost: '',
    harga_kost: '',
    foto_kost: '',
    alamat_kost: '',
    keydetail: '',
    uidPembuat: '',
  };
  async detailPesanan(uid) {
    let Useruid = fbs.auth.currentUser.uid;
    await fbs.database
      .ref('/kosts_pesanan')
      .child(Useruid)
      .child(uid)
      .once('value', snapshot => {
        this.setState(prev => {
          return {
            nama_kost: snapshot.val().nama_kost,
            harga_kost: snapshot.val().harga_kost,
            alamat_kost: snapshot.val().alamat_kost,
            foto_kost: snapshot.val().foto_kost,
            uidPembuat: snapshot.val().uidPembuat,
            keydetail: uid,
          };
        });
      });
    this.props.navigation.navigate('ModalPesanan', {
      detailkey: this.state.keydetail,
      nama_kost: this.state.nama_kost,
      alamat_kost: this.state.alamat_kost,
      harga_kost: this.state.harga_kost,
      foto_kost: this.state.foto_kost,
      uidPembuat: this.state.uidPembuat,
    });
  }
  componentWillMount() {
    let uid = fbs.auth.currentUser.uid;
    fbs.database
      .ref('/kosts_pesanan')
      .child(uid)
      .on('value', snapshot => {
        let data = snapshot.val();
        if (data === null) {
          this.setState({listPesanan: []});
        } else {
          let listPesanan = Object.values(data);
          this.setState({listPesanan});
        }
      });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            height: 50,
            borderWidth: 0.5,
            borderColor: '#dddddd',
            elevation: 1,
            justifyContent: 'center',
          }}>
          <View style={{paddingLeft: 15}}>
            <Text style={{color: 'red', fontSize: 17, fontWeight: 'bold'}}>
              Kost Pesanan
            </Text>
          </View>
        </View>
        <FlatList
          data={this.state.listPesanan}
          renderItem={({item}) => {
            return (
              <TouchableHighlight onPress={() => this.detailPesanan(item.uid)}>
                <KomponenPesanan
                  image={item.foto_kost}
                  namaKost={item.nama_kost}
                  alamatKost={item.alamat_kost}
                  hargaKost={item.harga_kost}
                  status={item.status}
                />
              </TouchableHighlight>
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

//make this component available to the app
export default KostPesanan;
