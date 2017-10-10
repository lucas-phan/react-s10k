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
class Promotions extends Component {
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
		var url = `${global.homeLink}api/khuyenmai`;

		 await fetch(url)
        .then((response)=>response.json())
        .then((responseJson)=>{

			if(responseJson.length !=0){
				this.setState(state => ({
			      datas: [...state.datas, ...responseJson],
			      loading: false,
				  waitting: false
			    }));
			}else{
				console.log('da het du lieu');
			}

        })
        .catch((e)=>{console.log(e)});

	  }

	  handleEnd = () => {
	    this.setState(state => ({ page: state.page + 1 }), () => this.fetchData());
	  }

  render() {
      const { navigate } = this.props.navigation;
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
            <Title>Khuyến mãi</Title>
          </Body>
          <Right />

        </Header>

        <Content padder>
            {this.state.waitting?(
                <Spinner color="blue" />
            ):(
                <FlatList
                    data={this.state.datas}
                    keyExtractor={(item, index) => index}

                    renderItem={({item}) =>
                    <Content>
                        <Card style={styles.mb}>

                        <TouchableOpacity onPress={() => navigate('PromotionDetail', { promotionId: item.id })}>
                            <CardItem  cardBody>
                              <Image
                                style={{
                                  resizeMode: "cover",
                                  width: null,
                                  height: 200,
                                  flex: 1
                                }}
                                source={{uri: linkThumb+item.image}}
                            />
                            </CardItem>
                        </TouchableOpacity>

                        <CardItem>
                            <Body>
                                <TouchableOpacity onPress={() => navigate('PromotionDetail', { promotionId: item.id })}>
                                  <Text style={styles.titleProduct}>{item.title}</Text>
                                </TouchableOpacity>
                            </Body>

                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text note>{item.description}</Text>
                            </Body>
                        </CardItem>

                        <CardItem style={{ paddingVertical: 0 }}>
                            <Left></Left>
                          <Right>
                              <Button transparent style={styles.mb15} onPress={() => navigate('PromotionDetail', { promotionId: item.id })}>
                                  <Text>Chi tiết</Text>
                              </Button>
                          </Right>
                        </CardItem>
                      </Card>

                    </Content>

                    }
                />
            )}


        </Content>
        <ButtonFooter {...this.props}/>
      </Container>
    );
  }
}
export default Promotions;
