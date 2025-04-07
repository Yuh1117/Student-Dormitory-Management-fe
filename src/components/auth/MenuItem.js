import { TouchableOpacity, View } from "react-native"
import styles from "./styles"
import { Text } from "react-native-paper"
import { Feather } from "@expo/vector-icons"

const MenuItem = ({ icon, title, titleColor = '#333', onPress }) => {

    return (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuItemLeft}>
                {icon}
                <Text style={[styles.menuItemText, { color: titleColor }]}>{title}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>
    )
}

export default MenuItem