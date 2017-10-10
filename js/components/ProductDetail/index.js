import React, { Component } from "react";
import { Image, TouchableOpacity,StatusBar, FlatList, Linking } from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Card,
    CardItem,
    Text,
    Thumbnail,
    Left,
    Body,
    Right,
    IconNB,
    List,
    H3,
    View,
    Spinner
} from "native-base";
import Swiper from 'react-native-swiper';

import ButtonFooter from '../ButtonFooter';

import global from '../global';
import saveCart from '../../api/saveCart';
import getCart from '../../api/getCart';
import styles from "./styles";
import formatMoney from '../FormatMoney';


const linkThumb = global.linkThumb;

class ProductDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            datas: [],
            productId: '',
            waitting: true,
            cartArray: []
        }
    }

    addProductToCart() {
        const product = this.state.datas.single_item;
        const isExist = this.state.cartArray.some(e => e.product.id === product.id);
        if (isExist) return false;
        var cartArrayValue = this.state.cartArray.concat({ product, quantity: 1 });

        this.setState(
            { cartArray:  cartArrayValue},
            () => saveCart(cartArrayValue)
        );
    }
    checkAddCart(){
        const { single_item } = this.state.datas;
        if(single_item){
            var value = this.state.cartArray.find(e=>(single_item.id===e.product.id));
            return value;
        }
        return false;
    }

    componentWillMount() {
        var { params } = this.props.navigation.state;
        fetch(`${global.homeLink}api/product/${params.productId}`)
        .then((response)=>response.json())
        .then((responseJson)=>{
            this.setState({
                datas: responseJson,
                waitting: false
            })
        })
        .catch((e)=>{console.log(e)});

        //get cart in store
        getCart()
            .then(cartArray => this.setState({ cartArray }));

    }
    getProductDetail(productId) {
        this.setState({
            waitting: true
        });

        if(this.state.productId === productId){
            setTimeout(() => {
                this.setState({
                    waitting: false
                });
            }, 100);
            return false;
        }

        this.setState({
            productId: productId
        });

        fetch(`${global.homeLink}api/product/${productId}`)
        .then((response)=>response.json())
        .then((responseJson)=>{
            this.setState({
                datas: responseJson,
                waitting: false
            });
            //console.log()
        })
        .catch((e)=>{console.log(e)});
    }

    handleClick(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }

  render() {
      const { navigate } = this.props.navigation;
      const {
            container, titleContainer, title,
            body, productContainer, productImage,
            produceName, producePrice
        } = styles;

	  var productImages = [];
      const { single_item } = this.state.datas;
      const catId  = single_item?single_item.catalogues.id:'';
	  if(single_item){
		  if(single_item.image!=''){
		  	productImages.push(single_item.image);
		  }
		    if(single_item.image_album !=''){
		  	  var tmp = JSON.parse(single_item.image_album);
		  	  tmp.map((item)=>{
		  		  productImages.push(item.background);
		  	  })
		    }

	  }


    return (

      <Container style={styles.container}>
      <StatusBar hidden={true} />
        <Header>
          <Left>
          <Button transparent onPress={() => navigate('ListProducts', {catId})}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Sản phẩm</Title>
          </Body>
          <Right />

        </Header>

        <Content padder style={container}>
        {this.state.waitting?(
            <Spinner color="blue" />
        ): (
            <View>
                <View>
    				<Swiper height={220}>
    					{productImages.map((item, index)=>
    						<Image key={index}
    						  style={{
    							resizeMode: "cover",
    							width: null,
    							height: 200,
    							flex: 1
    						  }}
    						  source={{uri: linkThumb+item}}
    						/>
    					)}
    				</Swiper>
                </View>
				<H3 style={styles.productTite}>{single_item?single_item.title:''}</H3>
				<Text note style={styles.productNote}>
					Mã SP: {single_item?single_item.sku:''}
				</Text>
                <Text note style={styles.productNote}>
					Danh mục: {this.state.datas.catalogue?this.state.datas.catalogue.fullname:''}
				</Text>

                <View >
                    <Text note style={styles.productNote}>
    					 Chi nhánh:
    				</Text>
                    <View>
                        {single_item.inventories.map((item, index)=>
                            <TouchableOpacity onPress={()=>this.handleClick(`https://www.google.com/maps/place/${item.address2}`)} key={index}>
                                <Text style={styles.branch}>{item.address} - Bản đồ</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
				<Text note style={styles.productNote, {marginTop:10}}>
					Giá: <Text style={styles.productPrice}>{single_item?formatMoney(single_item.price_final):''}đ</Text>
				</Text>

                <View style={styles.btnBuy}>
                    {this.checkAddCart()?(
                        <Button iconLeft full  onPress={() => this.addProductToCart()}>
                              <Icon active name="cart" />
                              <Text>Đã Mua</Text>
                        </Button>
                    ):(
                        <Button iconLeft full success onPress={() => this.addProductToCart()}>
                              <Icon active name="cart" />
                              <Text>Mua</Text>
                        </Button>
                    )}

                </View>

                <H3>Sản phẩm liên quan</H3>

                <FlatList
                    data={this.state.datas.related_products}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                    renderItem={({item}) =>
                        <TouchableOpacity style={productContainer} onPress={() => this.getProductDetail(item.id)}>
                            <Image source={{ uri: `${linkThumb}${item.image}` }} style={productImage} />
                            <Text style={produceName}>{item.title}</Text>
                            <Text style={producePrice}>{formatMoney(item.price_final)}đ</Text>
                        </TouchableOpacity>
                    }
                />
            </View>
        )}




        </Content>

        <ButtonFooter {...this.props} cartNumber={this.state.cartArray.length}/>
      </Container>
    );
  }
}



export default ProductDetail;
