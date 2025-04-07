import { UserContext, UserProvider } from "./UserContext";
import { useContext, useState } from "react";
import { View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Text, TextInput } from "react-native-paper";
import styles from "./styles";

const Profile = () => {
    return (
        <UserProvider>
            <ProfileContent />
        </UserProvider>
    );
}

const ProfileContent = () => {
    const { user } = useContext(UserContext)
    const [loading, setLoading] = useState(false)

    const saveInfor = async () => {
        setLoading(true)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Avatar.Image size={100} source={require('../../assets/batman.png')} />
                    <Text style={[{ marginTop: 10, fontSize: 18 }, styles.fw]}>
                        {user.last_name} {user.first_name}
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={[styles.fw, { marginBottom: 6 }]}>Số điện thoại</Text>
                    <TextInput
                        mode="outlined"
                        value={user.phone_number}
                        style={[styles.input, { padding: 0 }]}
                    />

                    <Text style={[styles.fw, { marginBottom: 6 }]}>Mã số sinh viên</Text>
                    <TextInput
                        mode="outlined"
                        value={user.student_code}
                        disabled
                        style={[styles.input, { padding: 0 }]}
                    />

                    <Text style={[styles.fw, { marginBottom: 6 }]}>Trường</Text>
                    <TextInput
                        mode="outlined"
                        value={user.university}
                        style={[styles.input, { padding: 0 }]}
                        disabled
                    />
                    < TouchableOpacity style={styles.button} onPress={saveInfor} disabled={loading} >
                        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Lưu</Text>}
                    </TouchableOpacity >
                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile;