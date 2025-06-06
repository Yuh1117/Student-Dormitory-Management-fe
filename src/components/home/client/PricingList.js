import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button, Avatar } from 'react-native-paper';
import AccountStyles from '../../auth/AccountStyles';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';


const PricingList = () => {
    const nav = useNavigation()
    const { t } = useTranslation()

    const pricingData = [
        { icon: 'home', label: t('pricingItems.home'), value: t('pricingValues.home') },
        { icon: 'bolt', label: t('pricingItems.electricity'), value: t('pricingValues.electricity'), sub: t('pricingValues.electricitySub') },
        { icon: 'water', label: t('pricingItems.water'), value: t('pricingValues.water'), sub: t('pricingValues.waterSub') },
        { icon: 'delete', label: t('pricingItems.trash'), value: t('pricingValues.trash') },
        { icon: 'wifi', label: t('pricingItems.wifi'), value: t('pricingValues.wifi') },
    ];

    return (
        <View>
            <View style={AccountStyles.card}>
                <Text style={styles.title}>{t('pricingListTitle')}</Text>

                {pricingData.map((item, index) => (
                    <View key={index} style={styles.row}>
                        <View style={styles.iconWrap}>
                            <Avatar.Icon icon={item.icon} size={30} style={{ backgroundColor: '#376be3' }} color="white" />
                        </View>
                        <View style={styles.labelColumn}>
                            <Text style={styles.label}>{item.label}</Text>
                            {item.sub && <Text>{item.sub}</Text>}
                        </View>
                        <Text style={styles.label}>{item.value}</Text>
                    </View>
                ))}

            </View>
            <View style={styles.shadow}>
                <Button
                    icon="file-document-outline"
                    style={{ borderWidth: 0 }}
                    labelStyle={[{ color: '#376be3' }, styles.label]}
                    onPress={() => nav.navigate('Rules')}
                >
                    {t('rules')}
                </Button>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    iconWrap: {
        width: 40,
        alignItems: 'center',
    },
    labelColumn: {
        flex: 1,
        paddingHorizontal: 10,
    },
    shadow: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 7,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
    },
});

export default PricingList;
