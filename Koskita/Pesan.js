//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import Komponen from './Pesan/Komponen';
import {fbs} from './Config';
// create a component
const {height: HEIGHT, width: WIDTH} = Dimensions.get('window');
class Pesan extends Component {
  state = {
    userList: [],
    nama_user: '',
    foto_user: '',
  };
  async chatview(uidPembuat) {
    await fbs.database
      .ref('/admins')
      .child(uidPembuat)
      .once('value', snapshot => {
        this.setState(prevState => {
          return {
            nama_user: snapshot.val().nama_user,
            foto_user: snapshot.val().foto_user,
          };
        });
      });
    this.props.navigation.navigate('ViewPesan', {
      uidPembuat: uidPembuat,
      nama_kost: this.state.nama_user,
      foto: this.state.foto_user,
    });
  }
  componentWillMount() {
    let userUid = fbs.auth.currentUser.uid;
    fbs.database
      .ref('messages')
      .child(userUid)
      .on('child_added', snapshot => {
        let person = snapshot.val();
        person.key = snapshot.key;
        this.setState(prevState => {
          return {
            userList: [...prevState.userList, person],
          };
        });
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
              Pesan
            </Text>
          </View>
        </View>
        <FlatList
          data={this.state.userList}
          renderItem={({item}) => {
            return (
              <TouchableHighlight onPress={() => this.chatview(item.key)}>
                <Komponen uidAkun={item.key} />
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
export default Pesan;
