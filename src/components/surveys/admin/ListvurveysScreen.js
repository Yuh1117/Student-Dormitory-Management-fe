import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFetchWithToken from '../../../config/UseFetchWithToken';
import { endpoints } from '../../../config/Apis';
import { Ionicons } from '@expo/vector-icons'; // hoặc import từ 'react-native-vector-icons/Ionicons'
import AdminStyles from '../../../styles/AdminStyles';
import { Button } from 'react-native-paper';

const SurveyList = ({ navigation }) => {
  const {loading, fetchWithToken } = useFetchWithToken();
  const [surveys, setSurveys] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [page,setPage] = useState(1);

  const loadSurveys = async () => {
    if (page > 0){
      const data = await fetchWithToken({ url: endpoints['surveys'] });
      if (data?.results) setSurveys([...surveys, ...data.results]); 
      console.log(data.results)
      if(data.next===null) setPage(0);
      console.log(page)
    }
  };

  useEffect(() => {
    loadSurveys();
  }, [page]);
  const loadMore = () =>{
    if(!loading && surveys.length > 0 && page>0)
    setPage(page+1)
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#ccc',
      }}
      onPress={() => navigation.navigate('surveyDetail', { survey: item })}
    >
      <Ionicons name="document-text-outline" size={24} color="#007AFF" style={{ marginRight: 12 }} />
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
        <Text style={{ color: '#666' }}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <SafeAreaView style={[AdminStyles.container,AdminStyles.flex_1]}>
        <View style={AdminStyles.flex_1}>

            <FlatList
                data={surveys}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                onEndReached={loadMore}
                ListFooterComponent={loading && <ActivityIndicator/>}
                />
            <View>
                    <TouchableOpacity
                        // disabled={selectedRoom.available_beds === 0}
                        onPress={() => navigation.navigate("createSurvey")}
                        style={[styles.button, AdminStyles.successColor]}>
                        <Text style={styles.buttonText}>Tạo khảo sát</Text>
                      </TouchableOpacity>
                    </View>
        </View>
    </SafeAreaView>
    
  );
};

export default SurveyList;
const styles = StyleSheet.create({
  
  button: {
    // backgroundColor: '#aed1fc',
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontWeight: '600',
    color: '#000',
  },
});