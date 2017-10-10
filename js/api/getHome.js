import { AsyncStorage } from 'react-native';

const getHome = async () => {
    try {
        const value = await AsyncStorage.getItem('@home');
        if (value !== null) {
            return JSON.parse(value);
        }
        return [];
    } catch (error) {
    // Error retrieving data
        return [];
    }
};

export default getHome;
