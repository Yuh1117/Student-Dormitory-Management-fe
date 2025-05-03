import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { DefaultTheme, List, PaperProvider, Text } from 'react-native-paper';

const customTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#376be3'
    },
};

const Rules = () => {
    const [expanded, setExpanded] = useState('')

    const handlePress = (panel) => {
        setExpanded(expanded === panel ? '' : panel);
    };

    return (
        <PaperProvider theme={customTheme}>
            <ScrollView style={styles.container}>
                <View style={styles.sectionWrapper}>
                    <List.Section title="Nội quy" titleStyle={styles.title}>
                        <List.Accordion
                            style={styles.sectionWrapper}
                            title="1. Giữ gìn trật tự, an ninh"
                            expanded={expanded === '1'}
                            onPress={() => handlePress('1')}>
                            <Text style={styles.text}>
                                Sinh viên phải tuân thủ các quy định về giờ giấc ra vào KTX.{"\n"}
                                Không tụ tập, gây ồn ào ảnh hưởng đến người khác.{"\n"}
                                Giữ gìn tài sản chung, không sử dụng thiết bị điện không đúng quy định.{"\n"}
                                Báo cáo ngay cho Ban quản lý KTX (BQL KTX) nếu có bất kỳ sự việc bất thường nào xảy ra.{"\n"}
                            </Text>
                        </List.Accordion>

                        <List.Accordion
                            style={styles.sectionWrapper}
                            title="2. Vệ sinh môi trường"
                            expanded={expanded === '2'}
                            onPress={() => handlePress('2')}>
                            <Text style={styles.text}>
                                Giữ gìn vệ sinh phòng ở, khu vực sinh hoạt chung.{"\n"}
                                Thu gom rác thải đúng nơi quy định.{"\n"}
                                Không vứt rác bừa bãi, không xả rác thải xuống cống rãnh.{"\n"}
                                Tham gia các hoạt động vệ sinh môi trường do BQL KTX tổ chức.{"\n"}
                            </Text>
                        </List.Accordion>

                        <List.Accordion
                            style={styles.sectionWrapper}
                            title="3. An toàn phòng cháy chữa cháy"
                            expanded={expanded === '3'}
                            onPress={() => handlePress('3')}>
                            <Text style={styles.text}>
                                Trang bị kiến thức về phòng cháy chữa cháy (PCCC).{"\n"}
                                Sử dụng các thiết bị điện an toàn, tiết kiệm điện.{"\n"}
                                Không sử dụng các vật liệu dễ cháy trong KTX.{"\n"}
                                Báo cáo ngay cho BQL KTX nếu phát hiện có nguy cơ cháy nổ.{"\n"}
                            </Text>
                        </List.Accordion>

                        <List.Accordion
                            style={styles.sectionWrapper}
                            title="4. Sinh hoạt văn minh"
                            expanded={expanded === '4'}
                            onPress={() => handlePress('4')}>
                            <Text style={styles.text}>
                                Ăn mặc lịch sự, phù hợp với môi trường tập thể.{"\n"}
                                Lễ phép, tôn trọng người khác.{"\n"}
                                Không sử dụng chất kích thích, cờ bạc, mại dâm trong KTX.{"\n"}
                                Tham gia các hoạt động văn hóa, thể thao do KTX tổ chức.{"\n"}
                            </Text>
                        </List.Accordion>

                        <List.Accordion
                            style={styles.sectionWrapper}
                            title="5. Thiết bị chung"
                            expanded={expanded === '5'}
                            onPress={() => handlePress('5')}>
                            <Text style={styles.text}>
                                Sử dụng các thiết bị chung (máy giặt, tủ lạnh,...) tiết kiệm, đúng quy định.{"\n"}
                                Giữ gìn vệ sinh các thiết bị chung.{"\n"}
                                Bồi thường thiệt hại nếu làm hư hỏng các thiết bị chung.{"\n"}
                            </Text>
                        </List.Accordion>

                        <List.Accordion
                            style={styles.sectionWrapper}
                            title="6. Khách đến thăm"
                            expanded={expanded === '6'}
                            onPress={() => handlePress('6')}>
                            <Text style={styles.text}>
                                Khách đến thăm phải xuất trình giấy tờ tùy thân.{"\n"}
                                Khách chỉ được phép đến thăm trong giờ quy định.{"\n"}
                                Không ở lại KTX quá 22h00.{"\n"}
                            </Text>
                        </List.Accordion>

                        <List.Accordion
                            style={styles.sectionWrapper}
                            title="7. Khen thưởng và kỷ luật"
                            expanded={expanded === '7'}
                            onPress={() => handlePress('7')}>
                            <Text style={styles.text}>
                                Sinh viên có thành tích tốt trong việc thực hiện nội quy KTX sẽ được khen thưởng.{"\n"}
                                Sinh viên vi phạm nội quy KTX sẽ bị xử lý kỷ luật theo quy định.
                            </Text>
                        </List.Accordion>
                    </List.Section>
                </View>
            </ScrollView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    text: {
        fontSize: 15,
        lineHeight: 24,
        padding: 12
    },
    sectionWrapper: {
        borderRadius: 10,
        backgroundColor: 'white'
    },
});


export default Rules;
