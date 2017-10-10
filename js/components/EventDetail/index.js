import React, { Component } from 'react';
import { Image, StatusBar, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";

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
import ButtonFooter from '../ButtonFooter';

import styles from "./styles";
import global from '../global';
const linkThumb = global.linkThumb;
class EventsDetail extends Component {
    constructor(props){
		super(props);
		this.state = {
			datas: [],
			loading: false,
			page: 0,
			waitting: true
		}
	}
	componentWillMount() {
	    this.fetchData();
	  }

	  fetchData = async () => {
	    this.setState({ loading: true });
        var { params } = this.props.navigation.state;


		var url = `${global.homeLink}api/sukien/${params.eventId}`;

		 await fetch(url)
        .then((response)=>response.json())
        .then((responseJson)=>{
			this.setState(state => ({
		      datas: responseJson,
		      loading: false,
			  waitting: false
		    }));
        })
        .catch((e)=>{console.log(e)});

	  }

	  handleEnd = () => {
	    this.setState(state => ({ page: state.page + 1 }), () => this.fetchData());
	  }

  render() {
      const { navigate } = this.props.navigation;
      const  promotion  = this.state.datas;
    return (
      <Container >
      <StatusBar hidden={true} />
        <Header>
          <Left>
          <Button transparent onPress={() => navigate('Events')}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Sự kiện</Title>
          </Body>
          <Right />

        </Header>

        <Content padder>
        {this.state.waitting?(
            <Spinner color="blue" />
        ): (
            <View>

                    <Image
                      style={{
                        resizeMode: "cover",
                        width: null,
                        height: 200,
                        flex: 1
                      }}
                      source={{uri: linkThumb+promotion.image}}
                    />

				<H3 style={styles.productTite}>{promotion?promotion.title:''}</H3>
				<Text note style={styles.productNote}>
					{promotion?promotion.description:''}
				</Text>

				<Text note style={styles.productNote}>
					<Text>{promotion?promotion.content:''}</Text>
				</Text>



            </View>
        )}

        </Content>

        <ButtonFooter {...this.props}/>
      </Container>
    );
  }
}
export default EventsDetail;
