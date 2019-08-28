//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {styles} from '../../Style';

// create a component
class Kategori extends Component {
  render() {
    return (
      <View
        style={{
          height: 130,
          width: 130,
          marginLeft: 20,
          borderWidth: 0.5,
          borderColor: '#dddddd',
        }}>
        <View style={{flex: 2}}>
          <Image source={this.props.image} style={styles.gambarKost} />
        </View>
        <View style={{flex: 1, paddingLeft: 10, paddingTop: 30}}>
          <Text>{this.props.name}</Text>
        </View>
      </View>
    );
  }
}
//make this component available to the app
export default Kategori;
