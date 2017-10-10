import React, { Component } from "react";
import { Image, TouchableOpacity, StatusBar, FlatList } from 'react-native';
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
    Left,
    Body,
    Right,
    H3,
    View,
    Form,
    Item,
    Label,
    Input,
    Spinner
} from "native-base";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import ButtonFooter from '../ButtonFooter';
import global from '../global';
import sendOrder from '../../api/sendOrder';
import getToken from '../../api/getToken';
import getCart from '../../api/getCart';
import saveCart from '../../api/saveCart';
import formatMoney from '../FormatMoney';

import styles from "./styles";

const linkThumb = `${global.homeLink}thumbs/`;

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            datas: [],
            productId: '',
            cartArray: [],
            refresh: false,
            showForm: false,
            waittingCheckout: false,
            fullName: '',
            phone: '',
            address: '',
            district: '',
            total: 0,
            totalShip: 0,
            notice: ''
        }
        this._scrollToInput = this._scrollToInput.bind(this);
    }
    incrQuantity(productId) {
        const newCart = this.state.cartArray.map(e => {
            if (e.product.id !== productId) return e;
            return { product: e.product, quantity: e.quantity + 1 };
        });
        this.setState({ cartArray: newCart },
            () => saveCart(this.state.cartArray)
        );
    }
    getTotalShip(districtValue){
        //const { district } = this.state;
        //console.log(districtValue);
        this.setState({
            district: districtValue
        });

        fetch(`${global.homeLink}api/get-shipping?address=${districtValue}`)
        .then((response)=>response.json())
        .then((responseJson)=>{
            if(responseJson[0].price){
                this.setState({
                    totalShip: responseJson[0].price,
                })
            }
        })
        .catch((e)=>{console.log(e)});
    }

    decrQuantity(productId) {
        const newCart = this.state.cartArray.map(e => {
            if (e.product.id !== productId) return e;
            var quantity = 1;
            if(e.quantity>1){
                quantity = e.quantity - 1;
            }
            return { product: e.product, quantity };
        });
        this.setState({ cartArray: newCart },
            () => saveCart(this.state.cartArray)
        );
    }

    removeProduct(productId) {
        const newCart = this.state.cartArray.filter(e => e.product.id !== productId);
        this.setState({ cartArray: newCart },
            () => saveCart(this.state.cartArray)
        );
    }

    checkCart(){
        if(this.state.cartArray){
            if(this.state.cartArray.length>0){
                return true;
            }
        }
        return false;
    }

    _showForm(){
        this.setState({
            showForm: true
        })
    }
    _hideForm(){
        this.setState({
            showForm: false
        })
    }

    async onSendOrder() {

        const {  totalShip, fullName, phone, address, district, cartArray } = this.state;

        if(!fullName||!phone||!district){
            return false;
        }

        this.setState({
            waittingCheckout: true
        });

        const arrTotal = cartArray.map(e => e.product.price_final * e.quantity);
        const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;

        const arrTotalItem = cartArray.map(e => e.quantity);
        const totalItem = arrTotalItem.length ? arrTotalItem.reduce((a, b) => a + b) : 0;

        const cartProducts = cartArray.map(e => ({
            product_id: e.product.id,
            price_final: e.product.price_final,
            qty: e.quantity
        }));
        var cart = {
            'total': total+totalShip,
            'count_item': totalItem,
            'cart_items': cartProducts
        };
        //console.log(JSON.stringify(cart));
        cart = JSON.stringify(cart);
        //const strData = `fullname=${fullName}&telephone=${phone}&address=${address}&quanhuyen=${district}&cart=${cart}`;
        const strData = {
            fullname: fullName,
            telephone: phone,
            address,
            quanhuyen: district,
            carts:cart
        }

        //return false;

        try {
            const kq = await sendOrder(strData);
            this.setState({
                notice: JSON.stringify(kq),
                waittingCheckout: false,
                cartArray: []
                },() => saveCart(this.state.cartArray)
            );

        } catch (e) {
            console.log(e);
        }
    }
    componentDidMount(){
        getCart()
            .then(cartArray => this.setState({ cartArray }));
    }
    refresh(){

	}
    _scrollToInput (reactNode: any) {
      // Add a 'scroll' ref to your ScrollView
      this.refs.scroll.scrollToFocusedInput(reactNode)
      //this.refs.scroll.scrollToPosition(0, 0, true)
    }



  render() {
      const { navigate } = this.props.navigation;
      const {productStyle, mainRight, productController,
          txtName, txtPrice, productImage, numberOfProduct,
          txtClose, totalInfo, totalPrice, totalText} = styles;
      const { cartArray } = this.state;
      const arrTotal = cartArray.map(e => e.product.price_final * e.quantity);
      const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;
      //this.setState({total});

      const form =
          !this.state.notice?(
              <View>
                <Form>
                  <Item inlineLabel>
                    <Label>Họ tên:</Label>
                    <Input
                        value={this.state.fullName}
                        onChangeText={text => this.setState({ fullName: text })}
                    />
                  </Item>
                  <Item inlineLabel >
                    <Label>Số điện thoại:</Label>
                    <Input
                        keyboardType='numeric'
                        value={this.state.phone}
                        onChangeText={text => this.setState({ phone: text })}
                    />
                  </Item>
                  <Item inlineLabel last >
                    <Label>Quận/huyện:</Label>
                    <Input
                        value={this.state.district}
                        onChangeText={(text) => this.getTotalShip(text)}
                    />
                  </Item>

                  <Item inlineLabel>
                    <Label>Địa chỉ:</Label>
                    <Input
                        value={this.state.address}
                        onChangeText={text => this.setState({ address: text })}
                    />
                  </Item>

                  <View style={totalInfo}>
                    <Text>
                        <Text style={totalText}>Tiền hàng:</Text>
                        <Text style={totalPrice}>{formatMoney(total)}đ</Text>
                    </Text>
                    <Text>
                        <Text style={totalText}>Phí đến {this.state.district}:</Text>
                        <Text style={totalPrice}>{formatMoney(this.state.totalShip)}đ</Text>
                    </Text>
                    <Text>
                        <Text style={totalText}>Tổng đơn hàng:</Text>
                        <Text style={totalPrice}>{formatMoney(total+this.state.totalShip)}đ</Text>
                    </Text>
                  </View>

                </Form>
                {!this.state.waittingCheckout?(
                    <Button full success style={styles.mb15} onPress={()=>this.onSendOrder()}>
                      <Text>Xác nhận</Text>
                    </Button>
                ):(
                    <View>
                        <Button full success style={styles.mb15} disabled >
                          <Text>Vui lòng đợi...</Text>
                        </Button>
                        <View>
                            <Spinner color="blue" />
                        </View>
                    </View>
                )}

            </View>
          ):(
              <Text>{this.state.notice}</Text>
          )

      const showForm = this.state.showForm?form: null;

    return (
      <Container >
      <StatusBar hidden={true} />
        <Header>
          <Left>
          <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="menu" />
          </Button>
          </Left>
          <Body>
            <Title>Giỏ hàng</Title>
          </Body>
          <Right />

        </Header>

        <Content padder>

        {this.state.showForm===false?(
            <FlatList
            refreshing={this.state.refresh}
            onRefresh={()=>{this.refresh()}}
            data={this.state.cartArray}
            keyExtractor={(item, index) => index}
            renderItem={({item}) =>
                <Card>
                  <CardItem cardBody>
                  <View style={productStyle}>
                      <TouchableOpacity onPress={()=>this.removeProduct(item.product.id)}>
                          <Text style={txtClose}>X</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => navigate('ProductDetail', { productId: item.product.id })}>
                        <Image source={{ uri: `${linkThumb}${item.product.image}` }} style={productImage} />
                      </TouchableOpacity>
                      <View style={[mainRight]}>
                          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => navigate('ProductDetail', { productId: item.product.id})}>
                              <Text style={txtName}>{item.product.title}</Text>
                              </TouchableOpacity>
                          </View>
                          <View>
                              <Text style={txtPrice}>{formatMoney(item.product.price_final)}đ</Text>
                          </View>
                          <View style={productController}>
                              <View style={numberOfProduct}>
                                  <TouchableOpacity onPress={()=>this.incrQuantity(item.product.id)}>
                                      	<Icon active name="ios-add-circle-outline" style={{ color: '#777', fontSize: 26, width: 30 }} />
                                  </TouchableOpacity>
                                  <Text>{item.quantity}</Text>
                                  <TouchableOpacity onPress={()=>this.decrQuantity(item.product.id)}>
                                      <Icon active name="ios-remove-circle-outline" style={{ color: '#777', fontSize: 26, width: 30 }} />
                                  </TouchableOpacity>
                              </View>
                          </View>
                      </View>
                  </View>
                  </CardItem>
                </Card>
            }
            />
        ):null}


            {this.checkCart()?(
                <View>
                    {this.state.showForm?(
                        <Button full iconLeft danger  onPress={()=>this._hideForm()}>
                          <Text>{formatMoney(total)}đ - Hủy Đặt hàng</Text>
                        </Button>
                    ):(
                        <Button full iconLeft success style={styles.mb15} onPress={()=>this._showForm()}>
                          <Text>{formatMoney(total)}đ - Đặt hàng</Text>
                        </Button>
                    )}

                </View>
            ):(
                <View>
                    <H3>Chưa có sản phẩm nào</H3>
                    <Button full iconLeft success style={styles.mb15} onPress={() => navigate('Home')}>
                        <Icon active name="home" />
                      <Text>Về trang chủ</Text>
                    </Button>
                </View>
            )}

            {showForm}

        </Content>
        <ButtonFooter {...this.props} cartNumber={this.state.cartArray.length}/>
      </Container>
    );
  }
}



export default Cart;
