import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default {
  container: {
    backgroundColor: "#fff"
},
titleProduct:{
    fontSize: 16,
    fontWeight: "bold",
},
productTite:{
    marginTop: 10,
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 10
},
productPrice:{
    color: '#FF001B',
    fontWeight: 'bold'
},
productNote:{
    fontSize: 13
},
btnBuy:{
    marginTop: 10,
    marginBottom: 10
},
mapStyle: {
    width: width - 40,
    height: 230,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
},
mapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderRadius: 2,
    shadowColor: '#3B5458',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2
},
infoContainer: {
    padding: 10,
    flex: 1,
    backgroundColor: '#FFF',
    margin: 10,
    marginTop: 0,
    borderRadius: 2,
    shadowColor: '#3B5458',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2
},
rowInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#D6D6D6'
},
imageStyle: {
    width: 30,
    height: 30
},
infoText: {
    color: '#AE005E',
    fontWeight: '500'
}
};
