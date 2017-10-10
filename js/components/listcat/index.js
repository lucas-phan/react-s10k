import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body,
	List, ListItem, Separator, Thumbnail, Spinner } from 'native-base';
import { FlatList, StatusBar } from 'react-native';

import ButtonFooter from "../ButtonFooter";
import styles from './styles';
import global from '../global';

const linkPage = global.homeLink;

class ListCat extends Component {
	constructor(props){
		super(props);
		this.state={
			datas: [],
			waitting: true
		}
	}
	async componentWillMount() {
        fetch(`${global.homeLink}api/list-catalogues`)
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
		return (
			<Container style={styles.container}>
			<StatusBar hidden={true} />
				<Header>
					<Left>
						<Button transparent onPress={() => navigate('DrawerOpen')}>
							<Icon name="menu" />
						</Button>
					</Left>
					<Body>
						<Title>Danh mục</Title>
					</Body>
					<Right />
				</Header>

				<Content>
					{this.state.waitting?(
						<Spinner color="blue" />
					):(
						<FlatList
							data={this.state.datas}
							keyExtractor={(item, index) => index}
							renderItem={({item}) =>
								<ListItem button icon onPress={() => navigate('ListProducts', { catId: item.id })} >
									<Left>
										

								  	</Left>
									<Body>
										<Text>
											{item.fullname}
										</Text>
									</Body>
									<Right>
										<Icon name="arrow-forward" />
									</Right>
								</ListItem>

							}
						/>
					)}

				</Content>

				<ButtonFooter {...this.props}/>
			</Container>
		);
	}
}

export default ListCat;
