import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import useFetchWithToken from '../../../config/UseFetchWithToken';
import { endpoints } from '../../../config/Apis';
import { SafeAreaView } from 'react-native-safe-area-context';

const SurveyResponses = ({ route }) => {
  const { surveyId,question } = route.params;
  const { loading,fetchWithToken } = useFetchWithToken();
  const [responses, setResponses] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [page,setPage] = useState(1);

  const fetchResponses = async () => {
    if(page>0){
      const data = await fetchWithToken({
        url: `${endpoints['survey-responses'](surveyId)}?page=${page}&question=${question.id}`,
      });
      if (data?.results) setResponses([...responses,...data.results]);
      if(data.next===null) setPage(0);
    }
  };
  useEffect(() => {
    fetchResponses();
  }, [page]);

  const loadMore = () =>{
    if(!loading && responses.length > 0 && page>0)
    setPage(page+1)
  }

  const renderItem = ({ item }) => (
    <View style={{ padding: 12, borderBottomWidth: 1 }}>
      <Text>Học sinh: {item.student}</Text>
      <Text>Trả lời: {item.answer}</Text>
    </View>
  );

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <SafeAreaView>
        
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>
        Các phản hồi cho: {question.question_text}
      </Text>
      <FlatList
        data={responses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListFooterComponent={loading && <ActivityIndicator/>}
        onEndReached={loadMore}
        />
    </View>
        </SafeAreaView>
  );
};

export default SurveyResponses;
