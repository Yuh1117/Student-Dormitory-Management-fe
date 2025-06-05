import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card, Drawer } from 'react-native-paper'
import useFetchWithToken from '../../../config/UseFetchWithToken'
import { endpoints } from "../../../config/Apis";
import { useCallback, useContext, useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import AdminStyles from "../../../styles/AdminStyles";
import { RoomContext } from "../../room/admin/roomContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const RoomInvoiceList = () => {
    const {selectedRoom,setSelectedRoom,setSelectedInvoice} = useContext(RoomContext)
    const { loading, fetchWithToken } = useFetchWithToken();
    const [page,setPage] = useState(1);
    const [roomInvoiceList, setRoomInvoiceList] = useState([]);
    const navigation = useNavigation();
    const loadInvoice = async () => {
        if(page>0){
            const data = await fetchWithToken({
                // url: `${endpoints['invoices']}?room_id=${selectedRoom.id}&page=${page}`,
                url: `${endpoints['rooms']}${selectedRoom.id}/invoices/`
            })
            if (data?.results) setRoomInvoiceList([...roomInvoiceList,...data.results]);
            if(data.next===null) setPage(0);
        }
        
    };
    useEffect(() => {
        loadInvoice()
    }, [page])
    useFocusEffect(
        useCallback(()=>{
            setRoomInvoiceList([])
            setPage(1)
            loadInvoice()
        },[])
    )

    const loadMore = () =>{
        if(!loading && roomInvoiceList.length > 0 && page>0)
        setPage(page+1)
      }

    const getColor=(status)=>{
        if (status=="Paid") 
            return "#B5FCCD"
        return "#ffdada"
    }
    return (

        <View style={[AdminStyles.container,{flex:1}]}>
            <FlatList
                onEndReached={loadMore}
                ListFooterComponent={loading && <ActivityIndicator />}
                ListEmptyComponent={!loading && <View style={AdminStyles.center}><Text>chưa có hóa đơn nào</Text></View>}
                data={roomInvoiceList}
                renderItem={({ item }) => (
                    <TouchableOpacity key={item.id}  onPress={() => {
                        setSelectedInvoice(item)
                        
                        navigation.navigate('updateInvoice');
                      }}>
                        <Card key={item.id} style={[AdminStyles.mb,AdminStyles.invoiceCard,{backgroundColor:getColor(item.status)}]}>
                            <Card.Content >
                                <Text style={styles.date}>{new Date(item.created_date).toLocaleDateString()}</Text>
                                <View style={AdminStyles.row}>

                                    <View style={[AdminStyles.flex_05,AdminStyles.center_start]}>
                                        
                                        <Text>{item.description}</Text>
                                    </View>
                                    <View style={AdminStyles.flex_05}>
                                        <Text>{parseFloat(item.total_amount).toLocaleString('vi-VN')}VND</Text>
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                    
                )}
            /> 
             
        </View>

    );
}
export default RoomInvoiceList
const styles = StyleSheet.create({
    date:{
        position:"absolute",
        right:1,
        top:0.2,
        fontSize:11,
        opacity:0.7
    }
})