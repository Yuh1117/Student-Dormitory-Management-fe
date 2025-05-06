import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native"
import AccountStyles from "../auth/AccountStyles"
import { ScrollView } from "react-native-gesture-handler"
import { ActivityIndicator, Button, HelperText, Text, TextInput } from "react-native-paper"
import { useState } from "react"
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { authApis, endpoints } from "../../config/Apis"
import AsyncStorage from "@react-native-async-storage/async-storage"


const SendSupport = () => {
    const [loading, setLoading] = useState(false)
    const [complaint, setComplaint] = useState({})
    const [msg, setMsg] = useState()
    const nav = useNavigation()

    const setState = (value, field) => {
        setComplaint({ ...complaint, [field]: value });
    };

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

    const validate = () => {
        if (!complaint.title || complaint.title.trim() === "") {
            setMsg("Tiêu đề không được để trống!")
            return false;
        }

        if (!complaint.description || complaint.description.trim() === "") {
            setMsg("Nội dung không được để trống!")
            return false;
        }

        return true;
    }

    const handleSubmit = () => {
        if (validate() === true) {
            Alert.alert(
                "Xác nhận",
                "Bạn có chắc chắn gửi yêu cầu này?",
                [
                    { text: "Hủy", style: "cancel" },
                    { text: "Xác nhận", onPress: submitSupport }
                ]
            )
        }
    }

    const submitSupport = async () => {
        try {
            setLoading(true)

            const token = await AsyncStorage.getItem("access-token")
            let form = new FormData();
            for (let key in complaint) {
                if (key === "image" && complaint.image) {
                    const name = complaint.image.name?.split('.').pop() || 'jpg';
                    const type = (name === 'png') ? 'image/png' : 'image/jpeg';

                    form.append(key, {
                        uri: complaint.image.uri,
                        name: complaint.image.name || "image.jpg",
                        type: complaint.image.type?.includes("image/") ? complaint.image.type : type,
                    });
                } else {
                    form.append(key, complaint[key])
                }
            }

            const res = await authApis(token).post(endpoints["complaints"], form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                },
            });

            if (res) {
                Alert.alert("Gửi yêu cầu thành công")
                nav.navigate("UserHome")
            }
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
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
                        value={complaint["title"]}
                        onChangeText={(text) => setState(text, "title")}
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
                        value={complaint["description"]}
                        onChangeText={(text) => setState(text, "description")}
                    />

                    <TouchableOpacity onPress={pick}>
                        <MaterialIcons name="add-photo-alternate" size={30} color="#888" />
                        <Image
                            style={styles.image}
                            resizeMode="contain"
                            source={complaint.image && { uri: complaint.image.uri }}
                        />
                    </TouchableOpacity>

                    {msg &&
                        <HelperText style={{ fontSize: 18 }} type="error" visible={msg}>
                            {msg}
                        </HelperText>
                    }

                    <TouchableOpacity style={[AccountStyles.button, { backgroundColor: '#376be3' }]} disabled={loading}
                        onPress={handleSubmit}>
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
        height: 200,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        marginVertical: 8,
    },

});

export default SendSupport