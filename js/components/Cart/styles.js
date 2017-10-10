import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

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

main: {
    width, backgroundColor: '#DFDFDF'
},
checkoutTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
},
productStyle: {
    flexDirection: 'row',
    margin: 5,
    marginLeft:1
},
productImage: {
    width: imageWidth,
    height: imageHeight,
    flex: 1,
    resizeMode: 'center'
},
mainRight: {
    flex: 3,
    justifyContent: 'space-between'
},
productController: {
    flexDirection: 'row'
},
numberOfProduct: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
},
txtName: {
    paddingLeft: 20,
    color: '#A7A7A7',
    fontSize: 20,
    fontWeight: '400',
},
txtPrice: {
    paddingLeft: 20,
    color: '#C21C70',
    fontSize: 20,
    fontWeight: '400',
},
txtShowDetail: {
    color: '#C21C70',
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'right',
},
showDetailContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
},
txtClose: {
    color: '#969696',
    fontWeight: 'bold',
    zIndex: 999,
    paddingLeft: 2,
    paddingRight:2,
    paddingBottom:4,
},
txtAction: {
    fontSize: 25,
    fontWeight: 'bold'
},
mb15:{
    marginTop: 20,
    marginBottom: 20
},
totalStyle:{
    color: '#C21C70'
},
totalInfo:{
    marginLeft: 10,
    marginTop:10,
},
totalPrice:{
    color: '#66b85c',
    fontWeight:'bold'
},
totalText:{
    width: 200,
}
};
