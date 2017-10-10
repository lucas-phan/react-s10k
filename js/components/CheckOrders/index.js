import React, { Component } from 'react';
import { FlatList, StatusBar } from 'react-native';
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
    Spinner,
    Form,
    Input,
    Label,
    Item,
    ListItem
} from "native-base";
import ButtonFooter from '../ButtonFooter';
import global from '../global';
import formatMoney from '../FormatMoney';
import styles from "./styles";


class CheckOrders extends Component {
    constructor(props){
        super(props);
        this.state={
            waitting: false,
            phone: null,
            datas: [],
            noDisplay: false
        }
    }

    checkOrders(){
        const { phone } = this.state;
        this.setState({
            waitting: true
        })
        fetch(`${global.homeLink}api/history?phone=${phone}`)
        .then((response)=>response.json())
        .then((responseJson)=>{
            this.setState({
                datas: responseJson,
                waitting: false,
                noDisplay: false
            })

        })
        .catch((e)=>{
            this.setState({
                noDisplay: true
            })
        });
    }

  render() {
     const { datas, waitting, noDisplay, phone } = this.state;

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
            <Title>Kiểm tra đơn hàng</Title>
          </Body>
          <Right />

        </Header>

        <Content padder>
            <View>
              <Form>
                <Item rounded >
                  <Input
                        placeholder='Số điện thoại'
                      keyboardType='numeric'
                      value={this.state.phone}
                      onChangeText={text => this.setState({ phone: text })}
                  />
                </Item>

              </Form>
              <Button full success style={styles.btnStyle} onPress={()=>this.checkOrders()}>
                <Text>Kiểm tra đơn hàng</Text>
              </Button>
          </View>
          

          {waitting?(
              <View>
                <Spinner color="blue" />
              </View>
          ):(
                  <FlatList
                      data={datas}
                      keyExtractor={(item, index) => index}
                      renderItem={({item}) =>
                            <Card style={styles.mb}>
                                <CardItem>
                                  <Left>
                                    <Body>
                                        <Text style={styles.titleProduct}>Tên khách hàng: {item.customerName}</Text>
                                        <Text note>Mã đơn hàng: {item.code}</Text>
                                    </Body>
                                  </Left>
                                </CardItem>

                                <CardItem >
                                      <Body>
                                      <H3>Sản phẩm đã mua</H3>
                                     {item.invoiceDetails.map((itemDetail, index)=>
                                          <View key={index} style={styles.listProductStyle} >
                                               <Text>{itemDetail.productName}</Text>
                                           </View>
                                     )}
                                     </Body>

                                </CardItem>


                                <CardItem style={{ paddingVertical: 0 }}>
                                  <Left>
                                      <Text>Tổng đơn hàng</Text>
                                      <Text style={styles.textPrice}>{formatMoney(item.totalPayment)} đ</Text>
                                  </Left>

                                  <Right>
                                          <Text>Trạng thái: </Text>
                                          <Text>{item.statusValue}</Text>
                                  </Right>
                                </CardItem>
                              </Card>

                      }
                  />
          )}


        </Content>
        <ButtonFooter {...this.props}/>
      </Container>
    );
  }
}
export default CheckOrders;
