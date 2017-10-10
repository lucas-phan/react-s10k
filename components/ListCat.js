import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
            mang: [],
            refresh:false
        }
    }

    async componentWillMount() {
        fetch("https://shop10k.vn/api/list-catalogues")
        .then((response)=>response.json())
        .then((responseJson)=>{
            this.setState({
                mang: responseJson
            })
        })
        .catch((e)=>{console.log(e)});

      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
    }

    refresh(){

    }

  render() {
    return (
      <FlatList
        refreshing={this.state.refresh}
        onRefresh={()=>{this.refresh()}}
        data={this.state.mang}
        renderItem={({item})=>
            <View style={styles.row}>
                <Text>{item.id}</Text>
                <Text>{item.fullname}</Text>
                <Image
                  style={{width: 32, height: 32}}
                  source={{uri: linkPage+item.icon}}
                />

            </View>
        }
        keyExtractor={(item, index) => index}
      />
    )
  }

}

const linkPage = 'https://shop10k.vn';

const styles = StyleSheet.create({
    row:{
        padding:10,
        borderBottomWidth: 1
    }
})
