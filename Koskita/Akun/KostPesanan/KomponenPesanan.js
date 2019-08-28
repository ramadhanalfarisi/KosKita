//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Right} from 'native-base';
import setuju from '../../../gambar/yes-button-circular-outline.png';
import imagenotfound from '../../../gambar/imagenotfound.png';

// create a component
class KomponenPesanan extends Component {
  render() {
    return (
      <View
        style={{
          height: 100,
          borderWidth: 1,
          borderColor: '#dddddd',
          borderRadius: 5,
          marginHorizontal: 5,
          marginTop: 5,
          flexDirection: 'row',
        }}>
        <View style={{felx: 1}}>
          <Image
            source={
              this.props.image === '' ? imagenotfound : {uri: this.props.image}
            }
            style={{
              height: 100,
              width: 110,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            justifyContent: 'center',
            width: 185,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'sans-serif',
              fontWeight: '500',
              color: '#b63838',
              paddingBottom: 5,
            }}>
            {this.props.namaKost}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              paddingBottom: 5,
            }}>
            {this.props.alamatKost}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'sans-serif',
              fontWeight: '600',
            }}>
            {this.props.hargaKost}
          </Text>
        </View>

        <Right>
          <View
            style={{
              height: 100,
              width: 55,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomRightRadius: 5,
              borderTopRightRadius: 5,
            }}>
            <Image
              source={this.props.status === 'setuju' ? setuju : ''}
              style={{width: 40, height: 40}}
            />
          </View>
        </Right>
      </View>
    );
  }
}

//make this component available to the app
export default KomponenPesanan;
