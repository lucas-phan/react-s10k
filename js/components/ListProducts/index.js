
import React, { Component } from "react";
import { Image, View, StatusBar, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
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
    IconNB,
	H3,
	Spinner
 } from "native-base";
import ButtonFooter from '../ButtonFooter/';
import styles from "./styles";
import global from '../global';
import formatMoney from '../FormatMoney';
const linkThumb = global.linkThumb;
const number = 0;

class ListProducts extends Component {
	constructor(props){
		super(props);
		this.state = {
			datas: [],
			loading: false,
			page: 0,
			waitting: true,
			numColDisplay: 2
		}
	}
	componentDidMount() {
	    this.fetchData();
	  }

	  fetchData = async () => {
	    this.setState({ loading: true });
        var { params } = this.props.navigation.state;
		var url = `${global.homeLink}api/catalog/${params.catId}?limit=16&page=${this.state.page}`;
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



	refresh(){

	}

	render() {
		const { navigate, goBack } = this.props.navigation;
		const {
            container, titleContainer, title,
            body, productContainer, productImage,
            produceName, producePrice
        } = styles;
		const { datas } = this.state;
		const catalogName = datas[0]?datas[0].catalogues.name:'';
		return (
			<Container style={styles.container}>
				<StatusBar hidden={true} />
				<Header>
					<Left>
						<Button transparent onPress={() => navigate('ListCat')}>
		                  <Icon name="arrow-back" />
		                </Button>
					</Left>
					<Body>
						<Title>{catalogName}</Title>
					</Body>
					<Right />
				</Header>
			<Content padder style={container}>

				{this.state.waitting?(
					<Spinner color="blue" />
				):(
					<View>
						<View style={titleContainer}>
							<Text style={title}>{catalogName}</Text>
						</View>
						<FlatList
							data={datas}
							numColumns={2}
							onEndReached={this.handleEnd}
							onEndReachedThreshold={0.5}
							keyExtractor={(item, index) => index}
							ListFooterComponent={() =>
							  this.state.loading
								? null
								: <ActivityIndicator size="large" animating />}
							renderItem={({item}) =>
								<TouchableOpacity style={productContainer} onPress={() => navigate('ProductDetail', { productId: item.id })}>
									<Image source={{ uri: `${linkThumb}${item.image}` }} style={productImage} />
									<Text style={produceName}>{item.title}</Text>
									<Text style={producePrice}>{formatMoney(item.price_final)}đ</Text>
								</TouchableOpacity>
							}
						/>
					</View>
				)}

			</Content>

			<ButtonFooter {...this.props}/>

		</Container>
		)
	}
}



export default ListProducts;
