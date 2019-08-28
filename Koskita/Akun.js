//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {fbs} from './Config';
import man from '../gambar/man.png';

// create a component
class Akun extends Component {
  state = {
    foto_user: '',
    nama_user: '',
    alamat_user: '',
    no_telp: '',
    email_user: '',
    jumSimpan: '',
    jumPesan: '',
  };

  masuk(navigate) {
    this.props.navigation.navigate(navigate);
  }

  componentDidMount() {
    let uid = fbs.auth.currentUser.uid;
    let jumPesan, jumSimpan;
    fbs.database
      .ref('/users')
      .child(uid)
      .on('value', snapshot => {
        let email;
        if (snapshot.val().email_user.length > 40) {
          let potong = snapshot.val().email_user.slice(0, 40);
          email = potong + '...';
        } else {
          email = snapshot.val().email_user;
        }
        this.setState(prevState => {
          return {
            foto_user: snapshot.val().foto_user,
            nama_user: snapshot.val().nama_user,
            alamat_user: snapshot.val().alamat_user,
            no_telp: snapshot.val().no_telp,
            email_user: email,
          };
        });
      });
    fbs.database
      .ref('/kosts_tersimpan')
      .child(uid)
      .on('value', snapshot => {
        let data = snapshot.val();
        if (data === null) {
          jumSimpan = 0;
        } else {
          let simpan = Object.values(data);
          jumSimpan = simpan.length;
        }
        this.setState({jumSimpan: jumSimpan});
      });

    fbs.database
      .ref('/kosts_pesanan')
      .child(uid)
      .on('value', snapshot => {
        let data = snapshot.val();
        if (data === null) {
          jumPesan = 0;
        } else {
          let pesanan = Object.values(data);
          jumPesan = pesanan.length;
        }
        this.setState({jumPesan: jumPesan});
      });
  }

  signout() {
    Alert.alert('Sign Out', 'Apakah anda yakin untuk sign out ?', [
      {
        text: 'Iya',
        onPress: () => {
          fbs.auth.signOut();
        },
      },
      {
        text: 'Tidak',
      },
    ]);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={
            this.state.foto_user === 'default'
              ? man
              : {uri: this.state.foto_user}
          }
          style={{
            position: 'absolute',
            width: 100,
            height: 100,
            borderRadius: 50,
            left: 130,
            top: 100,
            zIndex: 1,
          }}
        />
        <View
          style={{
            width: 300,
            backgroundColor: '#fff',
            height: 350,
            marginLeft: 30,
            marginTop: 170,
            borderRadius: 10,
          }}>
          <View style={{paddingTop: 40, alignItems: 'center'}}>
            <Text
              style={{color: 'red', fontFamily: 'sans-serif', fontSize: 18}}>
              {this.state.nama_user}
            </Text>
            <Text
              style={{
                paddingTop: 5,
                color: 'grey',
                fontFamily: 'sans-serif',
                fontSize: 13,
              }}>
              {this.state.alamat_user}
            </Text>
            <Text
              style={{color: 'grey', fontFamily: 'sans-serif', fontSize: 13}}>
              {this.state.email_user}
            </Text>
            <Text
              style={{color: 'grey', fontFamily: 'sans-serif', fontSize: 13}}>
              {this.state.no_telp}
            </Text>
          </View>
          <View
            style={{
              paddingTop: 50,
              paddingHorizontal: 20,
              flexDirection: 'row',
            }}>
            <View style={{alignItems: 'center', width: 130}}>
              <Text style={{color: 'red', fontWeight: 'bold', fontSize: 18}}>
                TERSIMPAN
              </Text>
              <Text style={{color: 'red', fontWeight: 'bold', fontSize: 18}}>
                {this.state.jumSimpan}
              </Text>
            </View>
            <View style={{alignItems: 'center', width: 130}}>
              <Text style={{color: 'red', fontWeight: 'bold', fontSize: 18}}>
                PESANAN
              </Text>
              <Text style={{color: 'red', fontWeight: 'bold', fontSize: 18}}>
                {this.state.jumPesan}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 50,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: '#dddddd',
              marginTop: 78,
              borderBottomEndRadius: 10,
              borderBottomStartRadius: 10,
              elevation: 1,
            }}>
            <View
              style={{
                paddingTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <View style={{paddingHorizontal: 10}}>
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => this.masuk('KostTersimpan')}>
                  <Image
                    source={require('../gambar/gambarAkun/save.png')}
                    style={{width: 25, height: 25}}
                  />
                  <Text style={{fontSize: 10, color: 'grey'}}>Tersimpan</Text>
                </TouchableOpacity>
              </View>
              <View style={{paddingHorizontal: 10}}>
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => this.masuk('KostPesanan')}>
                  <Image
                    source={require('../gambar/gambarAkun/basket.png')}
                    style={{width: 25, height: 25}}
                  />
                  <Text style={{fontSize: 10, color: 'grey'}}>Pesanan</Text>
                </TouchableOpacity>
              </View>
              <View style={{paddingHorizontal: 10}}>
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => this.masuk('EditProfile')}>
                  <Image
                    source={require('../gambar/gambarAkun/resume.png')}
                    style={{width: 25, height: 25}}
                  />
                  <Text style={{fontSize: 10, color: 'grey'}}>Edit Profil</Text>
                </TouchableOpacity>
              </View>
              <View style={{paddingHorizontal: 10}}>
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => this.signout()}>
                  <Image
                    source={require('../gambar/gambarAkun/exit.png')}
                    style={{width: 25, height: 25}}
                  />
                  <Text style={{fontSize: 10, color: 'grey'}}>Sign Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
import {from} from 'rxjs';

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ee5253',
  },
});

//make this component available to the app
export default Akun;
