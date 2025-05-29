import { useTranslation } from 'react-i18next';
import { Portal, Dialog, Button, Text } from 'react-native-paper';

const NotiDetail = ({ visible, onClose, notification }) => {
    const { t, i18n } = useTranslation()

    if (!notification) return null;

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onClose} style={{ backgroundColor: 'white' }}>
                <Dialog.Title>{notification.title}</Dialog.Title>
                <Dialog.Content>
                    <Text style={{ fontSize: 16 }}>{notification.content}</Text>
                </Dialog.Content>
                <Dialog.Actions style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, color: 'gray' }}>
                        {new Date(notification.created_date).toLocaleDateString(i18n.language, {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </Text>
                    <Button onPress={onClose}>{t('close')}</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default NotiDetail;