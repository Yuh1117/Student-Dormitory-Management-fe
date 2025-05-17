import { Portal, Dialog, Button, Text } from 'react-native-paper';

const NotiDetail = ({ visible, onClose, notification }) => {
    if (!notification) return null;

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onClose} style={{ backgroundColor: 'white' }}>
                <Dialog.Title>{notification.title}</Dialog.Title>
                <Dialog.Content>
                    <Text style={{ fontSize: 16 }}>{notification.content}</Text>
                </Dialog.Content>
                <Dialog.Actions style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{ fontSize: 14, color: 'gray' }}>
                        {new Date(notification.created_date).toLocaleDateString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </Text>
                    <Button onPress={onClose}>Đóng</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default NotiDetail;