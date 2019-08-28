import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Beranda from './Beranda';
import Tersimpan from './Tersimpan';
import Pesan from './Pesan';
import Akun from './Akun';
import EditProfile from './Akun/EditProfile';
import KostPesanan from './Akun/KostPesanan';
import ViewPesan from './Pesan/ViewPesan';
import KostTersimpan from './Akun/KostTersimpan';
import ModalPesanan from './Modal/ModalPesanan';
import home from '../gambar/home.png';
import simpan from '../gambar/bookmark.png';
import chat from '../gambar/chat.png';
import akun from '../gambar/man.png';

const Tab = createBottomTabNavigator(
  {
    Beranda: {
      screen: Beranda,
      navigationOptions: {
        tabBarLabel: 'BERANDA',
        tabBarIcon: <Image source={home} style={{width: 24, height: 24}} />,
      },
    },
    Tersimpan: {
      screen: Tersimpan,
      navigationOptions: {
        tabBarLabel: 'TERSIMPAN',
        tabBarIcon: <Image source={simpan} style={{width: 24, height: 24}} />,
      },
    },
    Pesan: {
      screen: Pesan,
      navigationOptions: {
        tabBarLabel: 'PESAN',
        tabBarIcon: <Image source={chat} style={{width: 24, height: 24}} />,
      },
    },
    Akun: {
      screen: Akun,
      navigationOptions: {
        tabBarLabel: 'AKUN',
        tabBarIcon: <Image source={akun} style={{width: 24, height: 24}} />,
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: {width: 5, height: 3},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
      },
    },
  },
);

const Stack = createStackNavigator(
  {
    Tab: Tab,
    EditProfile: EditProfile,
    KostPesanan: KostPesanan,
    KostTersimpan: KostTersimpan,
    ViewPesan: ViewPesan,
    ModalPesanan: ModalPesanan,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export const ContainerBeranda = createAppContainer(Stack);
