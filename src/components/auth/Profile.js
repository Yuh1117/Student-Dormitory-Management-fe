import { useContext, useState } from "react";
import { View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, HelperText, Text, TextInput } from "react-native-paper";
import styles from "./styles";
import { MyDispatchContext, MyUserContext } from "../../config/MyContexts";
import useFetchWithToken from "../../config/UseFetchWithToken";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { endpoints } from "../../config/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
    const userData = useContext(MyUserContext)
    const dispatch = useContext(MyDispatchContext)
    const [user, setUser] = useState(userData._j)
    const { loading, fetchWithToken } = useFetchWithToken()
    const nav = useNavigation()
    const [msg, setMsg] = useState()

    const fields = [
        { label: "Tên", field: "first_name", secureTextEntry: false, icon: "text" },
        { label: "Họ", field: "last_name", secureTextEntry: false, icon: "text" },
        { label: "Tên đăng nhập", field: "username", secureTextEntry: false, icon: "text" },
        { label: "Email", field: "email", secureTextEntry: false, icon: "email" },
        { label: "Số điện thoại", field: "phone_number", secureTextEntry: false, icon: "phone" },
        { label: "Mã số sinh viên", field: "student_code", secureTextEntry: false, icon: "identifier", disabled: true },
        { label: "Trường", field: "university", secureTextEntry: false, icon: "school", disabled: true },
    ];

    const setState = (value, field) => {
        setUser({ ...user, [field]: value });
    };

    const pick = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled)
                setState(result.assets[0], "avatar")
        }
    }

    const validate = () => {
        for (let f of fields) {
            if (!f.disabled) {
                if (!(f.field in user) || user[f.field] === '') {
                    setMsg(`Vui lòng nhập ${f.label}!`)
                    return false
                }
            }
        }
        return true
    }

    const saveInfor = async () => {
        if (validate() === true) {
            const token = await AsyncStorage.getItem("access-token");
            let form = new FormData()
            for (let key in user) {
                if (key === "avatar") {
                    form.append(key, {
                        uri: user.avatar.uri,
                        name: user.avatar.fileName,
                        type: user.avatar.type
                    })
                } else {
                    form.append(key, user[key])
                }
            }

            await Apis.post(endpoints["student"], form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            if (res) {
                dispatch({
                    "type": "update",
                    "payload": res
                });
                nav.navigate("UserHome")
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <TouchableOpacity onPress={pick}>
                        <Avatar.Image
                            size={100}
                            source={user.avatar.uri ? { uri: user.avatar.uri } : require('../../assets/batman.png')}
                        />
                    </TouchableOpacity>
                </View>

                <HelperText style={styles.m} type="error" visible={msg}>
                    {msg}
                </HelperText>

                <View style={styles.card}>

                    {fields.map(f => <>
                        <TextInput
                            mode="outlined"
                            style={[styles.input, {
                                padding: 0, borderWidth: 0,
                            }]}
                            key={f.field}
                            value={user[f.field]}
                            onChangeText={(text) => setState(text, f.field)}
                            label={f.label}
                            secureTextEntry={f.secureTextEntry}
                            disabled={f.disabled || false}
                            right={<TextInput.Icon icon={f.icon} />}
                        />
                    </>)}

                    < TouchableOpacity style={styles.button} onPress={saveInfor} disabled={loading} >
                        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Lưu</Text>}
                    </TouchableOpacity >
                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile;