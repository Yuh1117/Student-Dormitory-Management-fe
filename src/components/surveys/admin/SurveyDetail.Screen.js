import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SurveyDetail = ({ route, navigation }) => {
  const { survey } = route.params;

  const renderQuestion = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('surveyResponses', {surveyId: survey.id, question: item })}
      style={{ padding: 12, borderBottomWidth: 1 }}
    >
      <Text>{item.question_text}</Text>
      {/* <Text style={{ fontStyle: 'italic' }}>{item.question_type}</Text> */}
    </TouchableOpacity>
  );
  console.log(survey)

  return (
    <SafeAreaView>

    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{survey.title}</Text>
      <Text style={{ marginBottom: 12 }}>{survey.description}</Text>

      <FlatList
        data={survey.questions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderQuestion}
      />
    </View>
    </SafeAreaView>
  );
};

export default SurveyDetail;
