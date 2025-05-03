import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import AccountStyles from "../auth/AccountStyles"
import { ScrollView } from "react-native-gesture-handler"
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper"
import { useState } from "react"
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from "@expo/vector-icons"


const SendSupport = () => {
    const [loading, setLoading] = useState(false)

    const pick = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled)
                setState(result.assets[0], "image")
        }
    }

    return (
        <View style={AccountStyles.container}>
            <ScrollView>
                <Text style={styles.title}>Nội dung yêu cầu</Text>

                <View style={{ padding: 7 }}>
                    <TextInput
                        label="Tiêu đề"
                        mode="outlined"
                        style={[AccountStyles.input, { padding: 0, borderWidth: 0, backgroundColor: 'white' }]}
                        theme={{
                            roundness: 8,
                        }}
                    />

                    <TextInput
                        label="Nội dung"
                        mode="outlined"
                        style={[AccountStyles.input, { padding: 0, borderWidth: 0, height: 100, backgroundColor: 'white' }]}
                        multiline
                        numberOfLines={4}
                        theme={{
                            roundness: 8,
                        }}
                    />

                    <TouchableOpacity onPress={pick}>
                        <MaterialIcons name="add-photo-alternate" size={30} color="#888" />
                        <Image
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={[AccountStyles.button, { backgroundColor: '#376be3' }]} disabled={loading}>
                        {loading ? <ActivityIndicator color="white" /> : <Text style={AccountStyles.buttonText}>Gửi yêu cầu</Text>}
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10,
    },

    image: {
        height: 150,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        marginVertical: 8,
    },

});

export default SendSupport