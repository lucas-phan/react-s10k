import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import MapView from 'react-native-maps';

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


class Contact extends Component {

  render() {
      const { mapContainer, infoContainer, rowInfoContainer, infoText } = styles;
    return (
      <Container >
        <Header>
          <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
          </Left>
          <Body>
            <Title>Chi Tiet san pham</Title>
          </Body>
          <Right />

        </Header>

        <Content padder>
            <View style={mapContainer}>
                <MapView
                    style={{ width: width - 20, height: 250 }}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <MapView.Marker
                        coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                        title="Ban Do  "
                        description="Ban do"
                    />
                </MapView>
            </View>
            <View style={infoContainer}>
                <View style={rowInfoContainer}>

                    <Text style={infoText}>164 Trần Bình Trọng, P.3, Q.5</Text>
                </View>
                <View style={rowInfoContainer}>

                    <Text style={infoText}>Hồ Chí Minh | 1900 55 88 60</Text>
                </View>
                <View style={rowInfoContainer}>

                    <Text style={infoText}> 66 Đặng Văn Ngữ, P.10, Q. Phú Nhuận</Text>
                </View>
                
            </View>
        </Content>
        <ButtonFooter {...this.props}/>
      </Container>
    );
  }
}
const { width } = Dimensions.get('window');
export default Contact;
