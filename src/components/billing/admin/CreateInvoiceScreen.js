import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RoomContext } from '../../room/admin/roomContext';
import AdminStyles from '../../../styles/AdminStyles';
import useFetchWithToken from '../../../config/UseFetchWithToken';
import { endpoints } from '../../../config/Apis';
import { ActivityIndicator } from 'react-native-paper';

export default function CreateInvoiceScreen({ navigation }) {
  // const [room, setRoom] = useState('');
  const [status, setStatus] = useState('Unpaid');
  const [description,setDescription] = useState("")
  const [items, setItems] = useState([{ description: '', amount: '' }]);
  const [totalAmount, setTotalAmount] = useState('');
  const { selectedRoom,setSsetSelectedRoom} = useContext(RoomContext);
  const {loading,fetchWithToken} = useFetchWithToken();
  

  const handleAddItem = () => {
    setItems([...items, { description: '', amount: '' }]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = async () => {
    const payload = {
      room: selectedRoom.id,
      // room: parseInt(selectedRoom.id),
      
      total_amount: parseFloat(totalAmount),
      status : "Unpaid",
      description:description,
      items: items.map(item => ({
        description: item.description,
        amount: parseFloat(item.amount),
      })),
    };

    console.log(selectedRoom)
    const data = await fetchWithToken({
      method: 'POST',
      url: `${endpoints['invoices']}`,
      data : payload
    })

    if(data){
      // console.log()
      navigation.goBack();
    }

  };
  useEffect(()=>{
    setItems([{ description: 'Tiền nhà', amount: selectedRoom.monthly_fee }])
  },[])
  //
  useEffect(() => {
    const total = items.reduce((sum, item) => {
      const amount = parseFloat(item.amount);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
    setTotalAmount(total.toFixed(2));
  }, [items]);
  return (
    <ScrollView style={[styles.container]}>
      <View style = {AdminStyles.pbottom}>
      <Text style={styles.label}>Số phòng {selectedRoom.room_number}</Text>

<Text style={styles.label}>Tổng tiền: {parseFloat(totalAmount).toLocaleString('vi-VN')}VND</Text>

<Text style={styles.label}>Mô Tả</Text>
<TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder='Tiền Trọ Tháng ...'/>

<Text style={styles.label}>Chi tiết các khoản</Text>
{items.map((item, index) => (
  <View key={index} style={styles.itemContainer}>
    <TextInput
      style={styles.input}
      placeholder="Mô tả"
      value={item.description}
      onChangeText={(text) => handleItemChange(index, 'description', text)}
    />
    <TextInput
      style={styles.input}
      placeholder="Số tiền"
      keyboardType="numeric"
      value={item.amount}
     
      onChangeText={(text) => handleItemChange(index, 'amount', text)}
    />

      <Button styles = {{}} title="Xoá" color="red" onPress={() => handleRemoveItem(index)} />
  </View>
))}
{/* <Button title="+" onPress={handleAddItem} style = {styles.addButton}/> */}
<TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
  
  <Text style={[styles.addButtonText,styles.addButtonShape]}>+</Text>
</TouchableOpacity>
<View style={{ marginVertical: 10 }} />
{loading ? <ActivityIndicator/>:<Button title="Tạo hóa đơn" onPress={handleSubmit} color={AdminStyles.successColor.backgroundColor}/>}
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderColor: "#ff6"
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    // minWidth:170
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: 10,
  },
  addButtonShape:{
    backgroundColor:"#9EC6F3",
    paddingTop:10,
    paddingBottom:10,
    paddingRight:40,
    paddingLeft:40,
    borderRadius:20
  },
  addButtonText: {
    marginLeft: 6,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  itemContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  }
});