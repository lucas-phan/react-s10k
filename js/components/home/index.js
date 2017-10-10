import React, { Component } from 'react';
import { Image, View, StatusBar, TouchableOpacity, FlatList } from "react-native";
// import FastImage from 'react-native-fast-image'
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
	List,
	Spinner,
 } from "native-base";
import getHome from '../../api/getHome';
import saveHome from '../../api/saveHome';
import ButtonFooter from '../ButtonFooter/';
import global from '../global';
import formatMoney from '../FormatMoney';
import styles from "./styles";

const linkThumb = global.homeLink;

class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			datas: [],
			waitting: true
		}
	}

	// getHomeData(){
	// 	if(this.state.datas.length>0){
	// 		console.log(11111111);
	// 		this.setState({
	// 			waitting: false
	// 		})
	// 		return false;
	//
	// 	}
	// 	console.log('check-----');
	// 	console.log(this.state.datas.length);
	// 	return false;
	//
	// 	fetch(`${global.homeLink}api/home/products`)
	// 	.then((response)=>response.json())
	// 	.then((responseJson)=>{
	// 	    this.setState({
	// 	        datas: responseJson,
	// 			waitting: false
	// 	    },() => saveHome(this.state.datas))
	// 	})
	// 	.catch((e)=>{console.log(e)});
	// }
	//
	componentWillMount() {
		fetch(`${global.homeLink}api/home/products`)
		.then((response)=>response.json())
		.then((responseJson)=>{
		    this.setState({
		        datas: responseJson,
				waitting: false
		    })
		})
		.catch((e)=>{console.log(e)});
    }


	render() {
		const { navigate } = this.props.navigation;
		const {
			container, titleContainer, title,
			body, productContainer, productImage,
			produceName, producePrice
		} = styles;
		return (
			<Container style={container}>
				<StatusBar hidden={true} />
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
							<Icon name="menu" />
						</Button>
					</Left>
					<Body>
						<Title>Trang chủ</Title>
					</Body>
					<Right />
				</Header>

				<Content padder style={container}>
					{this.state.waitting?(
						<View>
							<Spinner color="blue" />
						</View>
					):(
						<List
						    dataArray={this.state.datas}
						    renderRow={data =>
						        <View>
								<View style={titleContainer}>
				                    <Text style={title}>{data.catalogue.title}</Text>
				                </View>
								<FlatList
									data={data.products}
									numColumns={2}
									keyExtractor={(item, index) => index}

									renderItem={({item}) =>
										<TouchableOpacity style={productContainer} onPress={() => navigate('ProductDetail', { productId: item.id })}>
											<Image source={{ uri: `${linkThumb}${item.image}` }} style={productImage} />
											<Text style={produceName}>{item.title}</Text>
											<Text style={producePrice}>{formatMoney(item.price_final)}đ</Text>
										</TouchableOpacity>
									}
								/>

						      </View>
						    }
						/>
					)}
		        </Content>
				<ButtonFooter {...this.props} />
			</Container>
		)
	}
}



export default Home;
