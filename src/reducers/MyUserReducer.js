import AsyncStorage from "@react-native-async-storage/async-storage";

export default async (current, action) => {
    switch (action.type) {
        case "login":
        case "update":
            return action.payload
        case "logout":
            await AsyncStorage.removeItem('access-token');
            await AsyncStorage.removeItem('user');
            return null;
    }

    return current;
}