import { AsyncStorage } from 'react-native';

const saveHome = async (homeArray) => { 
    await AsyncStorage.setItem('@home', JSON.stringify(homeArray));
};

export default saveHome;
