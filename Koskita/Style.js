import {StyleSheet, Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  textSrc: {
    flex: 1,
    fontWeight: '500',
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingVertical: 5,
  },
  search: {
    flexDirection: 'row',
    padding: 5,
    height: 45,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 10,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 2,
    borderRadius: 5,
  },
  viewScrollHoz: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 10,
  },
  textScrollHor: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  gambarKost: {
    height: 90,
    width: 130,
    resizeMode: 'cover',
  },
});
