//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {Right, List, Content} from 'native-base';
import search from '../gambar/search-engine.png';
import refresh from '../gambar/refresh.png';
import Kategori from './Beranda/Component/Kategori';
import Recommend from './Beranda/Component/Recommend';
import {styles} from './Style';
import {fbs} from './Config';
import ModalTersimpan from './Modal/ModalTersimpan';

const {widht: WIDHT, height: HEIGHT} = Dimensions.get('window');
// create a component
class Beranda extends Component {
  state = {
    listKost: [],
    nama_kost: '',
    alamat_kost: '',
    harga_kost: '',
    foto_kost: '',
    detailkey: '',
    searchtext: '',
    keydetail: [],
    refresh: false,
    reload: false,
    gantiview: false,
    kosong: false,
  };

  detailKost(uid) {
    fbs.database
      .ref('/kosts')
      .child(uid)
      .on('value', snapshot => {
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
    if (this.ModalTersimpan) {
      this.ModalTersimpan.muncul();
    }
  }
  reload() {
    fbs.database.ref('/kosts').on('value', snapshot => {
      this.setState(prev => {
        return {
          listKost: [],
        };
      });
      let data = snapshot.val();
      let listKost = Object.values(data);
      this.setState({
        listKost: listKost,
        refresh: false,
        searchtext: '',
        gantiview: false,
      });
    });
  }
  cari() {
    let text = this.state.searchtext;
    let listKost;
    fbs.database
      .ref('/kosts')
      .orderByChild('nama_kost')
      .startAt(text)
      .endAt(text + '\uf8ff')
      .on('value', snapshot => {
        this.setState(prev => {
          return {
            listKost: [],
          };
        });
        let data = snapshot.val();
        if (data === null) {
          this.setState({
            listKost: [],
            refresh: true,
            gantiview: true,
            kosong: true,
          });
        } else {
          listKost = Object.values(data);
          this.setState({
            listKost: listKost,
            refresh: true,
            gantiview: true,
            kosong: false,
          });
        }
      });
  }
  componentWillMount() {
    this.starterHeaderHeight = 80;
    if (Platform.OS == 'android') {
      this.starterHeaderHeight = 45 + StatusBar.currentHeight;
    }
  }
  componentDidMount() {
    let text = this.state.searchtext;
    if (text === '') {
      fbs.database.ref('/kosts').on('value', snapshot => {
        let data = snapshot.val();
        let listKost = Object.values(data);
        this.setState({listKost});
      });
    }
  }

  render() {
    if (this.state.gantiview === false) {
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                height: this.starterHeaderHeight,
                borderBottomWidth: 1,
                borderBottomColor: '#dddddd',
              }}>
              <View style={styles.search}>
                <TouchableOpacity
                  style={{marginTop: 5}}
                  disabled={this.state.refresh === true ? false : true}
                  onPress={this.reload.bind(this)}>
                  <Image
                    source={this.state.refresh === true ? refresh : search}
                    style={{width: 25, height: 25}}
                  />
                </TouchableOpacity>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Cari Kost"
                  placeholderTextColor="grey"
                  value={this.state.searchtext}
                  onChangeText={searchtext =>
                    this.setState({searchtext: searchtext})
                  }
                  style={styles.textSrc}
                />
                <Right>
                  <TouchableOpacity onPress={this.cari.bind(this)}>
                    <Image
                      source={require('../gambar/right-arrow.png')}
                      style={{width: 20, height: 20}}
                    />
                  </TouchableOpacity>
                </Right>
              </View>
            </View>
            <ScrollView scrollEventThrottle={16}>
              <View style={styles.viewScrollHoz}>
                <Text style={styles.textScrollHor}>
                  Rekomendasi kost daerah Malang
                </Text>
                <View style={{height: 130, marginTop: 20}}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <Kategori
                      image={require('../gambar/gambarKost/kost1.jpg')}
                      name="Kost 1"
                    />

                    <Kategori
                      image={require('../gambar/gambarKost/kost2.png')}
                      name="Kost 2"
                    />

                    <Kategori
                      image={require('../gambar/gambarKost/kost3.jpeg')}
                      name="Kost 3"
                    />

                    <Kategori
                      image={require('../gambar/gambarKost/kost4.jpg')}
                      name="Kost 4"
                    />

                    <Kategori
                      image={require('../gambar/gambarKost/kost5.jpg')}
                      name="Kost 5"
                    />
                  </ScrollView>
                </View>
                <View style={{marginTop: 40, paddingHorizontal: 20}}>
                  <Text style={{fontSize: 24, fontWeight: '700'}}>
                    Apa itu Koskita ?
                  </Text>
                  <Text style={{fontWeight: '100', marginTop: 10}}>
                    Koskita adalah sebuah aplikasi yang ditujukan untuk seluruh
                    kalangan masyarakat, berfungsi untuk memudahkan seseorang
                    dalam mencari kost yang sesuai dengan kebutuhan mereka
                  </Text>
                  <View style={{marginTop: 20, width: 320, height: 200}}>
                    <Image
                      style={{
                        flex: 1,
                        height: null,
                        width: null,
                        resizeMode: 'cover',
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#dddddd',
                      }}
                      source={require('../gambar/gambarKost/kost1.jpg')}
                    />
                  </View>
                </View>
              </View>
              <View style={{marginTop: 40}}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: '700',
                    paddingHorizontal: 20,
                  }}>
                  Kost di Wilayah Malang
                </Text>
                <View
                  style={{
                    paddingHorizontal: 20,
                    marginTop: 15,
                  }}>
                  <List enableEmptySections>
                    <FlatList
                      contentContainerStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                      }}
                      data={this.state.listKost}
                      renderItem={({item}) => {
                        return (
                          <TouchableHighlight
                            onPress={() => this.detailKost(item.uid)}>
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
                  </List>
                </View>
              </View>
            </ScrollView>
          </View>
          <ModalTersimpan
            ref={ref => {
              this.ModalTersimpan = ref;
            }}
            nama_kost={this.state.nama_kost}
            alamat_kost={this.state.alamat_kost}
            harga_kost={this.state.harga_kost}
            foto_kost={this.state.foto_kost}
            detailkey={this.state.detailkey}
            uidPembuat={this.state.uidPembuat}
          />
        </SafeAreaView>
      );
    } else {
      if (this.state.kosong === false) {
        return (
          <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <View
              style={{
                height: this.starterHeaderHeight,
                borderBottomWidth: 1,
                borderBottomColor: '#dddddd',
              }}>
              <View style={styles.search}>
                <TouchableOpacity
                  style={{marginTop: 5}}
                  disabled={this.state.refresh === true ? false : true}
                  onPress={() => this.reload()}>
                  <Image
                    source={this.state.refresh === true ? refresh : search}
                    style={{width: 25, height: 25}}
                  />
                </TouchableOpacity>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Cari Kost"
                  placeholderTextColor="grey"
                  value={this.state.searchtext}
                  onChangeText={searchtext =>
                    this.setState({searchtext: searchtext})
                  }
                  style={styles.textSrc}
                />
                <Right>
                  <TouchableOpacity onPress={this.cari.bind(this)}>
                    <Image
                      source={require('../gambar/right-arrow.png')}
                      style={{width: 20, height: 20}}
                    />
                  </TouchableOpacity>
                </Right>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 15,
              }}>
              <List enableEmptySections>
                <FlatList
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                  }}
                  data={this.state.listKost}
                  renderItem={({item}) => {
                    return (
                      <TouchableHighlight
                        onPress={() => this.detailKost(item.uid)}>
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
              </List>
            </View>
            <ModalTersimpan
              ref={ref => {
                this.ModalTersimpan = ref;
              }}
              nama_kost={this.state.nama_kost}
              alamat_kost={this.state.alamat_kost}
              harga_kost={this.state.harga_kost}
              foto_kost={this.state.foto_kost}
              detailkey={this.state.detailkey}
            />
          </SafeAreaView>
        );
      } else {
        return (
          <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <View
              style={{
                height: this.starterHeaderHeight,
                borderBottomWidth: 1,
                borderBottomColor: '#dddddd',
              }}>
              <View style={styles.search}>
                <TouchableOpacity
                  style={{marginTop: 5}}
                  disabled={this.state.refresh === true ? false : true}
                  onPress={() => this.reload()}>
                  <Image
                    source={this.state.refresh === true ? refresh : search}
                    style={{width: 25, height: 25}}
                  />
                </TouchableOpacity>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Cari Kost"
                  placeholderTextColor="grey"
                  value={this.state.searchtext}
                  onChangeText={searchtext =>
                    this.setState({searchtext: searchtext})
                  }
                  style={styles.textSrc}
                />
                <Right>
                  <TouchableOpacity onPress={this.cari.bind(this)}>
                    <Image
                      source={require('../gambar/right-arrow.png')}
                      style={{width: 20, height: 20}}
                    />
                  </TouchableOpacity>
                </Right>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 15,
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 15, fontWeight: '500', color: 'grey'}}>
                Kost Tidak Ada
              </Text>
            </View>
            <ModalTersimpan
              ref={ref => {
                this.ModalTersimpan = ref;
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
  }
}

//make this component available to the app
export default Beranda;
