import React, { Component } from 'react';
import {  TouchableOpacity, Linking, StatusBar } from 'react-native';
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
    ListItem
} from "native-base";
import ButtonFooter from '../ButtonFooter';

import styles from "./styles";


class Support extends Component {
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
            <Title>Hỗ trợ</Title>
          </Body>
          <Right />

        </Header>

        <Content padder>
            <View>

                <H3 style={styles.title}>HỖ TRỢ KHÁCH HÀNG</H3>
                    <ListItem button icon >
                        <Left>
                        </Left>
                        <Body>
                            <TouchableOpacity onPress={()=>this.handleClick('https://shop10k.vn/page/ho-tro-khach-hang/huong-dan-dat-hang.html')}>
                            <Text>
                                Hướng dẫn đặt hàng
                            </Text>
                            </TouchableOpacity>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem button icon >
                        <Left>
                        </Left>
                        <Body>
                        <TouchableOpacity onPress={()=>this.handleClick('https://shop10k.vn/page/ho-tro-khach-hang/huong-dan-thanh-toan.html')}>
                            <Text>
                                Hướng dẫn thanh toán
                            </Text>
                            </TouchableOpacity>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem button icon >
                        <Left>
                        </Left>
                        <Body>
                        <TouchableOpacity onPress={()=>this.handleClick('https://shop10k.vn/page/chinh-sach-cong-ty/quy-dinh-giao-hang.html')}>
                            <Text>
                                Quy định thành viên
                            </Text>
                            </TouchableOpacity>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem button icon >
                        <Left>
                        </Left>
                        <Body>
                        <TouchableOpacity onPress={()=>this.handleClick('https://shop10k.vn/page/chinh-sach-cong-ty/chinh-sach-bao-hanh.html')}>
                            <Text>
                                Chính sách bảo hành
                            </Text>
                            </TouchableOpacity>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem button icon >
                        <Left>
                        </Left>
                        <Body>
                        <TouchableOpacity onPress={()=>this.handleClick('https://shop10k.vn/page/chinh-sach-cong-ty/quy-dinh-giao-hang.html')}>
                            <Text>
                                Quy định giao hàng
                            </Text>
                            </TouchableOpacity>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem button icon >
                        <Left>
                        </Left>
                        <Body>
                        <TouchableOpacity onPress={()=>this.handleClick('https://shop10k.vn/page/chinh-sach-cong-ty/quy-dinh-va-hinh-thuc-thanh-toan.html')}>
                            <Text>
                                Quy định thanh toán
                            </Text>
                            </TouchableOpacity>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem button icon >
                        <Left>
                        </Left>
                        <Body>
                        <TouchableOpacity onPress={()=>this.handleClick('https://shop10k.vn/registrybranch')}>
                            <Text>
                                Đăng ký chi nhánh
                            </Text>
                            </TouchableOpacity>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem button icon >
                        <Left>
                        </Left>
                        <Body>
                        <TouchableOpacity onPress={()=>this.handleClick('https://shop10k.vn/buybig')}>
                            <Text>
                                Mua số lượng lớn
                            </Text>
                            </TouchableOpacity>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>



                    <H3 style={styles.title}>THANH TOÁN VÀ GIAO HÀNG</H3>
                        <ListItem button icon >
                            <Left>

                            </Left>
                            <Body>
                            <TouchableOpacity onPress={()=>this.handleClick('https://shop10k.vn/page/ho-tro-khach-hang/huong-dan-thanh-toan.html')}>
                                <Text>
                                    Hướng dẫn thanh toán
                                </Text>
                                </TouchableOpacity>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem button icon >
                            <Left>
                            </Left>
                            <Body>
                            <TouchableOpacity onPress={()=>this.handleClick('https://shop10k.vn/page/chinh-sach-cong-ty/chinh-sach-doi-tra-hang-va-hoan-tien.html')}>
                                <Text>
                                    Chính sách hoàn tiền
                                </Text>
                                </TouchableOpacity>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem button icon >
                            <Left>
                            </Left>
                            <Body>
                            <TouchableOpacity onPress={()=>this.handleClick('https://shop10k.vn/page/chinh-sach-cong-ty/quy-dinh-giao-hang.html')}>
                                <Text>
                                    Chính sách giao hàng
                                </Text>
                                </TouchableOpacity>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem button icon >
                            <Left>
                            </Left>
                            <Body>
                            <TouchableOpacity onPress={()=>this.handleClick('https://shop10k.vn/page/chinh-sach-cong-ty/chinh-sach-doi-tra-hang-va-hoan-tien.html')}>
                                <Text>
                                    Đổi trả hàng và hoàn tiền
                                </Text>
                                </TouchableOpacity>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>

            </View>

        </Content>
        <ButtonFooter {...this.props}/>
      </Container>
    );
  }
}
export default Support;
