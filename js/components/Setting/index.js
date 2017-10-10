import React, { Component } from 'react';
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
    View
} from "native-base";
import ButtonFooter from '../ButtonFooter';

import styles from "./styles";


class Setting extends Component {

  render() {
      const { mapContainer, infoContainer, rowInfoContainer, infoText } = styles;
    return (
      <Container >
        <Header>
          <Left>
              <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                  <Icon name="menu" />
              </Button>
          </Left>
          <Body>
            <Title>Cài đặt</Title>
          </Body>
          <Right />

        </Header>

        <Content padder>
            <View>
                <Text>Cài đặt</Text>
            </View>

        </Content>
        <ButtonFooter {...this.props}/>
      </Container>
    );
  }
}
export default Setting;
