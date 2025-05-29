import { use, useContext, useState } from "react";
import { View, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Avatar, HelperText, Text, TextInput } from "react-native-paper";
import { MyDispatchContext, MyUserContext } from "../../config/MyContexts";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { authApis, endpoints } from "../../config/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AccountStyles from "./AccountStyles";
import { useTranslation } from "react-i18next";

const Profile = () => {
    const userData = useContext(MyUserContext)
    const dispatch = useContext(MyDispatchContext)
    const [user, setUser] = useState(userData._j)
    const [loading, setLoading] = useState(false)
    const nav = useNavigation()
    const [msg, setMsg] = useState()
    const { t } = useTranslation()

    const fields = [
        { label: t('profile.fields.first_name'), field: "first_name", secureTextEntry: false, icon: "text" },
        { label: t('profile.fields.last_name'), field: "last_name", secureTextEntry: false, icon: "text" },
        { label: t('profile.fields.email'), field: "email", secureTextEntry: false, icon: "email" },
        { label: t('profile.fields.phone_number'), field: "phone_number", secureTextEntry: false, icon: "phone" },
        { label: t('profile.fields.student_code'), field: "student_code", secureTextEntry: false, icon: "identifier", disabled: true },
        { label: t('profile.fields.university'), field: "university", secureTextEntry: false, icon: "school", disabled: true },
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

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (f.field === "email" && !emailRegex.test(user[f.field])) {
                setMsg("Email không hợp lệ!");
                return false;
            }
        }
        return true
    }

    const saveInfor = async () => {
        if (validate() === true) {
            try {
                setLoading(true)

                const token = await AsyncStorage.getItem("access-token")
                let form = new FormData();
                for (let key in user) {
                    if (key === "avatar" && user.avatar) {
                        if (user.avatar !== userData._j.avatar) {
                            const name = user.avatar.name?.split('.').pop() || 'jpg';
                            const type = (name === 'png') ? 'image/png' : 'image/jpeg';

                            form.append(key, {
                                uri: user.avatar.uri,
                                name: user.avatar.name || "avatar.jpg",
                                type: user.avatar.type?.includes("image/") ? user.avatar.type : type,
                            });
                        }
                    } else {
                        form.append(key, user[key])
                    }
                }

                const res = await authApis(token).patch(endpoints["current-user"], form, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Accept": "application/json",
                    },
                });

                if (res) {
                    dispatch({
                        type: "update",
                        payload: res.data,
                    });

                    Alert.alert("Cập nhật thông tin thành công")
                    nav.navigate("AccountMain")
                }
            } catch (ex) {
                console.error(ex);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <View style={[AccountStyles.container, { justifyContent: 'none', marginTop: 10 }]}>
            <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={pick}>
                        <Avatar.Image
                            size={100}
                            source={user.avatar?.uri ? { uri: user.avatar.uri } : user.avatar ? { uri: user.avatar } : require('../../assets/batman.png')}
                        />
                    </TouchableOpacity>
                </View>

                <HelperText style={AccountStyles.m} type="error" visible={msg}>
                    {msg}
                </HelperText>

                <View style={AccountStyles.card}>

                    {fields.map(f =>
                        <TextInput
                            key={f.field}
                            mode="outlined"
                            style={[AccountStyles.input, { padding: 0, borderWidth: 0, backgroundColor: 'white' }]}
                            value={user[f.field]}
                            onChangeText={(text) => setState(text, f.field)}
                            label={f.label}
                            secureTextEntry={f.secureTextEntry}
                            disabled={f.disabled || false}
                            right={<TextInput.Icon icon={f.icon} />}
                        />
                    )}

                    < TouchableOpacity style={AccountStyles.button} onPress={saveInfor} disabled={loading} >
                        {loading ? <ActivityIndicator color="white" /> : <Text style={AccountStyles.buttonText}>{t('update')}</Text>}
                    </TouchableOpacity >
                </View>


            </ScrollView>
        </View>
    )
}

export default Profile;