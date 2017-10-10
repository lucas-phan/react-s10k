const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const { deviceHeight, width } = Dimensions.get("window");

const produtWidth = (width - 30) / 2;
const productImageHeight = (produtWidth / 320) * 320;
export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  container: {
    backgroundColor: "#ffffff",
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 8,
    marginBottom: 30
  },
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  mb: {
    marginBottom: 15
    },
    productContainer: {
        width: produtWidth,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        marginLeft:10,
        marginBottom:10,
        elevation: 1
    },
    productImage: {
        width: produtWidth,
        height: productImageHeight
    },
    produceName: {
        marginVertical: 5,
        paddingLeft: 10,
        fontWeight: '500'
    },
    producePrice: {
        marginBottom: 5,
        paddingLeft: 10,
        color: "#FF001B"
    },
    titleContainer: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingBottom: 10
    },

};
