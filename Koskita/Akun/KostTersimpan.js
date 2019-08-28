//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import Recommend from '../Beranda/Component/Recommend';
import {fbs} from '../Config';
import ModalKostTersimpan from '../Modal/ModalKostTersimpan';

// create a component
class KostTersimpan extends Component {
  constructor() {
    super();
    this.state = {
      listTersimpan: [],
      nama_kost: '',
      alamat_kost: '',
      harga_kost: '',
      foto_kost: '',
      detailkey: '',
    };
  }

  detailKost(uid) {
    let Useruid = fbs.auth.currentUser.uid;
    fbs.database
      .ref('/kosts_tersimpan')
      .child(Useruid)
      .child(uid)
      .once('value', snapshot => {
        this.setState(prevState => {
          return {
            nama_kost: snapshot.val().nama_kost,
            alamat_kost: snapshot.val().alamat_kost,
            harga_kost: snapshot.val().harga_kost,
            foto_kost: snapshot.val().foto_kost,
            detailkey: uid,
            uidPembuat: snapshot.val().uidPembuat,
          };
        });
      });
    if (this.ModalKostTersimpan) {
      this.ModalKostTersimpan.muncul();
    }
  }

  componentDidMount() {
    let uid = fbs.auth.currentUser.uid;
    fbs.database
      .ref('/kosts_tersimpan')
      .child(uid)
      .on('value', snapshot => {
        let data = snapshot.val();
        if (data === null) {
          this.setState({listTersimpan: []});
        } else {
          let listTersimpan = Object.values(data);
          this.setState({listTersimpan: listTersimpan});
        }
      });
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1}}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#dddddd',
              height: 50,
              justifyContent: 'center',
              paddingLeft: 13,
              backgroundColor: '#fff',
            }}>
            <Text style={{color: 'red', fontSize: 18, fontWeight: '700'}}>
              Kost tersimpan
            </Text>
          </View>
          <View style={styles.container}>
            <FlatList
              contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
              data={this.state.listTersimpan}
              renderItem={({item}) => {
                return (
                  <TouchableHighlight onPress={() => this.detailKost(item.uid)}>
                    <Recommend
                      image={item.foto_kost}
                      namaKost={item.nama_kost}
                      alamat={item.alamat_kost}
                      harga={item.harga_kost}
                    />
                  </TouchableHighlight>
                );
              }}
            />
          </View>
        </View>
        <ModalKostTersimpan
          ref={ref => {
            this.ModalKostTersimpan = ref;
          }}
          nama_kost={this.state.nama_kost}
          alamat_kost={this.state.alamat_kost}
          harga_kost={this.state.harga_kost}
          foto_kost={this.state.foto_kost}
          detailkey={this.state.detailkey}
        />
      </SafeAreaView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

//make this component available to the app
export default KostTersimpan;
