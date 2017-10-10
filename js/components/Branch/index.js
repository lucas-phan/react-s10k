import React, { Component } from 'react';
import {TextInput} from 'react-native';
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
    Form,
    Item,
    Label,
    Input
} from "native-base";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ButtonFooter from '../ButtonFooter';

import styles from "./styles";


class Branch extends Component {

  render() {
      const { mapContainer, infoContainer, rowInfoContainer, infoText } = styles;
    return (
      <Container >
        <Header>
          <Left>
              <Button transparent onPress={() => navigate('DrawerOpen')}>
                  <Icon name="menu" />
              </Button>
          </Left>
          <Body>
            <Title>Chi nhánh</Title>
          </Body>
          <Right />

        </Header>

        <Content padder>

              <View>
                <TextInput />
              </View>
              <View>
                <TextInput />
              </View>
              <View>
                <TextInput />
              </View>
              <View>
                <TextInput />
              </View>
              <View>
                <TextInput />
              </View>
              <View>
                <TextInput />
              </View>
              <View>
                <TextInput />
              </View>
              <View>
                <TextInput />
              </View>

              <View>
                <TextInput />
              </View>
              <View>
                <TextInput />
              </View>
              <View>
                <TextInput />
              </View>
              <View>
                <TextInput />
              </View>
              <View>
                <TextInput />
              </View>
              <View>
                <TextInput />
              </View>


        </Content>

        <ButtonFooter {...this.props}/>
      </Container>

    );
  }
}
export default Branch;
