import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AdminStyles from '../../styles/AdminStyles';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import useFetchWitchToken from '../../config/UseFetchWithToken' 
import { endpoints } from '../../config/Apis';
import CountBadge from '../../config/BagdeComponent';


const UserManage = () => {
    const navigation = useNavigation();
    const [complaintCounts,setComplaintCounts] = useState(0);
    const [requestCounts,setRequestCounts] = useState(0);
    const {fetchWithToken} = useFetchWitchToken();
    
    const loadComplaintsNotResovle=async()=>{
        const data = await fetchWithToken({
            url:`${endpoints['complaints']}?q=Pending`,
        });
        if(data.results){
            setComplaintCounts(data.results.length)
            console.log(data.results.length)
        }
    }
    // useEffect(()=>{
    //     loadComplaintsNotResovle();
    // },[])

    return (
        <SafeAreaView style={[AdminStyles.container, { flex: 1 }]}>
            <View style={AdminStyles.flex_025}>
                <View style={AdminStyles.flex_1}>
                    {/* <Button buttonColor={AdminStyles.successColor.backgroundColor} style={[AdminStyles.flex_1,AdminStyles.center]} icon="account-plus" mode="contained" onPress={() => {
                        navigation.navigate('register');
                    }}>
                        Đăng Ký Sinh Viên
                    </Button> */}
                    <TouchableOpacity onPress={()=>{navigation.navigate('register')}} style={[AdminStyles.flex_1,AdminStyles.center,AdminStyles.successColor,AdminStyles.btn,AdminStyles.row
                    ]}>
                            <MaterialCommunityIcons name='account-plus' style={style.text}/><Text style={style.text}>Đăng Ký Sinh Viên</Text>
                        </TouchableOpacity>
                </View>
            </View>


            <View style={AdminStyles.flex_025}>
                <View style={[AdminStyles.row,AdminStyles.flex_1]}>
                    <View style ={[AdminStyles.flex_05]}>

                        <TouchableOpacity onPress={()=>{navigation.navigate("createNoti")}} style={[style.leftBtn, AdminStyles.btn,AdminStyles.flex_1]}>
                            <Text style={style.text}>Tạo Thông báo</Text>
                        </TouchableOpacity>
                    </View>
                    <View style ={[AdminStyles.flex_05]}>

                        <TouchableOpacity onPress={()=>{navigation.navigate("surveyStack")}} style={[style.rightBtn, AdminStyles.btn,AdminStyles.flex_1]}>
                            <Text style={style.text}>Khảo Sát</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={AdminStyles.flex_025}>
                <View style={[AdminStyles.row,AdminStyles.flex_1]}>
                    <View style ={[AdminStyles.flex_05]}>

                        <TouchableOpacity onPress={()=>{navigation.navigate("complaintsStack")}} style={[style.leftBtn, AdminStyles.btn,AdminStyles.flex_1]}>
                            <CountBadge url={`${endpoints['complaints']}?q=Pending`}/>
                            {/* <CountBadge sum={[complaintCounts]}/> */}
                            <MaterialCommunityIcons name='account-plus' style={style.text}/>
                            <Text style={style.text}>Ý Kiến</Text>
                        </TouchableOpacity>
                    </View>
                    <View style ={[AdminStyles.flex_05]}>

                        <TouchableOpacity onPress={()=>{navigation.navigate("roomChangeRequestStack")}} style={[style.rightBtn, AdminStyles.btn,AdminStyles.flex_1]}>
                            <CountBadge url={`${endpoints['room-change-requests']}?status=Pending`}/>
                            <MaterialCommunityIcons name='account-plus' style={style.text}/>
                            <Text style={style.text}>Yêu cầu đổi phòng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            
            {/* <View style={AdminStyles.flex_025}>
                <View style={AdminStyles.flex_1}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('complaintsStack')}} style={[AdminStyles.flex_1,AdminStyles.center,AdminStyles.successColor,AdminStyles.btn,AdminStyles.row
                    ]}>
                            <MaterialCommunityIcons name='account-plus' style={style.text}/><Text style={style.text}>Ý Kiến</Text>
                        </TouchableOpacity>
                </View>
            </View> */}

        </SafeAreaView>
    );
}
export default UserManage;
const style = StyleSheet.create({
    contain: {
        // flex:1,
        flexDirection: "row"
    },

    leftBtn: {
        backgroundColor: "red"

    },
    rightBtn: {
        backgroundColor: "blue"
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    }
})