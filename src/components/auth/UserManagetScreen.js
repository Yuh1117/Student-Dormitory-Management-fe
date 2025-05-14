import { StyleSheet, TouchableOpacity, View,Animated, Pressable } from 'react-native';

import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AdminStyles from '../../styles/AdminStyles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import useFetchWitchToken from '../../config/UseFetchWithToken' 
import { endpoints } from '../../config/Apis';
import CountBadge from '../../config/BagdeComponent';
import { Surface } from 'react-native-paper';


const UserManage = () => {
    const navigation = useNavigation();
    const [complaintCounts,setComplaintCounts] = useState(0);
    const [requestCounts,setRequestCounts] = useState(0);
    const {fetchWithToken} = useFetchWitchToken();
    
    

  // Tạo một Animated Value để điều khiển vị trí theo trục X
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  // Hàm xử lý animation rung lắc
  const startShakeAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 2, // Dịch chuyển sang phải 5px
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -2, // Dịch chuyển sang trái 5px
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0, // Trở về vị trí ban đầu
          duration: 100,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const loadComplaintsNotResovle=async()=>{
        const data = await fetchWithToken({
            url:`${endpoints['complaints']}?q=Pending`,
        });
        if(data.results){
            setComplaintCounts(data.results.length)
        }
    }
   
  const loadPendingRequests = async () => {
    const data = await fetchWithToken({
      url: `${endpoints['room-change-requests']}?status=Pending`,
    });

    if (data.results) {
      setRequestCounts(data.results.length);
    }
  };

  useEffect(() => {
    loadPendingRequests();
    loadComplaintsNotResovle();
    const interval = setInterval(() => {
      startShakeAnimation();
    }, 1000);

    // Clear interval khi component bị unmount
    return () => clearInterval(interval);
  }, []);

 
  useFocusEffect(
        useCallback(() => {
            loadPendingRequests();
            loadComplaintsNotResovle();
        }, [])
    );
    const ShakeCard = ({ count, navigationTarget, customStyle, icon,lable }) => {
        if (count > 0) {
            return (
            <Animated.View style={[AdminStyles.flex_1, { transform: [{ translateX: shakeAnimation }] }]}>
                {/* <TouchableOpacity onPress={() => { navigation.navigate("roomChangeRequestStack") }} style={[style.rightBtn, AdminStyles.btn, AdminStyles.flex_1]}>
                <CountBadge url={`${endpoints['room-change-requests']}?status=Pending`} />
                <MaterialCommunityIcons name='account-plus' style={style.text} />
                <Text style={style.text}>Yêu cầu đổi phòng</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => { navigation.navigate(navigationTarget) }} style={[customStyle, AdminStyles.btn, AdminStyles.flex_1]}>
                <CountBadge count={count} />
                <MaterialCommunityIcons name={icon} style={style.text} />
                <Text style={style.text}>{lable}</Text>
                </TouchableOpacity>
            </Animated.View>
            );
        } else {
            return (
            <TouchableOpacity onPress={() => { navigation.navigate(navigationTarget) }} style={[customStyle, AdminStyles.btn, AdminStyles.flex_1]}>
                <CountBadge count={count} />
                <MaterialCommunityIcons name={icon} style={style.text} />
                <Text style={style.text}>{lable}</Text>
                </TouchableOpacity>
            )
        }
    };
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

                        
                        <ShakeCard count={0} navigationTarget={"createNoti"} customStyle={style.leftTopBtn} icon={"pen"} lable={"Tạo thông báo"}/>
                    </View>
                    <View style ={[AdminStyles.flex_05]}>

                        <ShakeCard count={0} navigationTarget={"surveyStack"} customStyle={style.rightTopBtn} icon={"file-document-edit"} lable={"Khảo sát"}/>
                    </View>
                </View>
            </View>
            
            <View style={AdminStyles.flex_025}>
                <View style={[AdminStyles.row,AdminStyles.flex_1]}>
                    <View style ={[AdminStyles.flex_05]}>
                        <ShakeCard count={complaintCounts} navigationTarget={"complaintsStack"} customStyle={style.leftBtn} icon={"chat-alert"} lable={"Ý kiến"}/>
                    </View>
                    <View style ={[AdminStyles.flex_05]}>

                        <ShakeCard count={requestCounts} navigationTarget={"roomChangeRequestStack"} customStyle={style.rightBtn} icon={"frequently-asked-questions"} lable={"Yêu cầu đổi phòng"}/>
                        
                    </View>
                </View>
            </View>

           

        </SafeAreaView>
    );
}
export default UserManage;
const style = StyleSheet.create({
    animatedSurface: {
    borderRadius: 8,
  },
    contain: {
        // flex:1,
        flexDirection: "row"
    },

    leftTopBtn: {
        backgroundColor: "#5F99AE"

    },
    leftBtn: {
        backgroundColor: "#3D90D7"

    },
    rightTopBtn: {
        backgroundColor: "#7AC6D2"
    },
    rightBtn: {
        backgroundColor: "#3A59D1"
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    surface: {
    // padding: 8,
    // height: 80,
    // width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
})