import React from 'react';
import { View } from 'react-native';
import AccountStyles from '../auth/AccountStyles';
import { ScrollView } from 'react-native-gesture-handler';
import MenuItem from '../auth/MenuItem';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const Settings = () => {
    const nav = useNavigation()
    const { t } = useTranslation()

    return (
        <View style={[AccountStyles.container, { justifyContent: '', padding: 10 }]}>
            <ScrollView>
                <View style={[AccountStyles.card, { paddingHorizontal: 0 }]}>
                    <MenuItem custom={{ elevation: 0, paddingVertical: 10 }}
                        icon={<MaterialIcons name="security" size={22} color="#333" />}
                        title={t('security')}
                    />
                    <MenuItem custom={{ elevation: 0, paddingVertical: 10 }}
                        icon={<MaterialIcons name="notifications-none" size={24} color="black" />}
                        title={t('notifications.title')}
                    />
                    <MenuItem custom={{ elevation: 0, paddingVertical: 10 }}
                        icon={<MaterialIcons name="light-mode" size={22} color="#333" />}
                        title={t('preferences')}
                    />
                    <MenuItem custom={{ elevation: 0, paddingVertical: 10 }}
                        icon={<MaterialIcons name="language" size={22} color="#333" />}
                        title={t('language')}
                        onPress={() => nav.navigate('Language')}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default Settings;