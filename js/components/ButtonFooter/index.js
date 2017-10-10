import React, { Component } from "react";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Text,
  Body,
  Left,
  Right,
  Icon,
  Badge
} from "native-base";

import styles from "./styles";
import getCart from '../../api/getCart';


class ButtonFooter extends Component {

  constructor(props) {
    super(props);
    this.state = {
        cartArray: []
    }
  }
  componentDidMount(){
      getCart()
          .then(cartArray => this.setState({ cartArray }));
  }

  render() {
      const { navigate } = this.props.navigation;
      const { routeName } = this.props.navigation.state;
    return (
        <Footer>
          <FooterTab>
            <Button
              active={routeName==='Home'?true:false}
              onPress={() => navigate('Home')}
            >
              <Icon active={routeName==='Home'?true:false} name="home" />
              <Text style={styles.btnFont}>Trang chủ</Text>
            </Button>

            <Button
              active={routeName==='Cart'?true:false}
              onPress={() => navigate('Cart')}
              vertical
              badge
            >
            <Badge style={{ backgroundColor: "red" }}>
                  <Text style={styles.btnBadge}>{this.props.cartNumber?this.props.cartNumber:this.state.cartArray.length}</Text>
            </Badge>
              <Icon active={routeName==='Cart'?true:false} name="cart" />
              <Text style={styles.btnFont}>Giỏ hàng</Text>
            </Button>
            <Button active={routeName==='CheckOrders'?true:false} onPress={() => navigate('CheckOrders')}>
              <Icon active={routeName==='CheckOrders'?true:false} name="ios-checkmark-circle" />
              <Text style={styles.btnFont}>Đơn hàng</Text>
            </Button>
          </FooterTab>
        </Footer>

    );
  }
}

export default ButtonFooter;
