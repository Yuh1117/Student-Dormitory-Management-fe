
import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
const BuildingsSegmentedButtons = ({ buildings, value, onValueChange  ,buildingId}) => {
    // const [value, setValue] = React.useState(
    //     buildings.length > 0 ? buildings[0].id.toString() : null
    //   );
  
    const handleValueChange = (val) => {
      console.log("Selected building ID:", val); // In ra giá trị val (b.id)
      console.info(typeof(val))
      
      if (val === undefined || val === null) {
        console.error("Invalid value selected!");
      } else {
        onValueChange(val); // Gọi hàm onValueChange với giá trị hợp lệ
      }

      console.log("BuildingID: ",buildingId)
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <SegmentedButtons
          value={value}
          onValueChange={handleValueChange}
          buttons={buildings.map((b) => ({
            value: b.id,  // Lưu ý: đây là giá trị của nút
            label: b.building_name,
            }))}
          />
        </SafeAreaView>
      );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
  });
  
  export default BuildingsSegmentedButtons;