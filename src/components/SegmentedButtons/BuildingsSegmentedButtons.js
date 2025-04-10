
// import * as React from 'react';
// import { SafeAreaView, StyleSheet } from 'react-native';
// import { SegmentedButtons } from 'react-native-paper';
// const BuildingsSegmentedButtons = ({ buildings, value, onValueChange  ,buildingId}) => {
  
//     const handleValueChange = (val) => {
//       console.log(val)
//       if (val === undefined || val === null) {
//         console.error("Invalid value selected!");
//       } else {
//         onValueChange(val); // Gọi hàm onValueChange với giá trị hợp lệ
//       }
//     };

    
  
//     return (
//       <SafeAreaView style={styles.container}>
//         <SegmentedButtons
//           value={value}
//           onValueChange={handleValueChange}
//           buttons={buildings.map((b) => ({
//             value: b.id,  // Lưu ý: đây là giá trị của nút
//             label: b.building_name,
//             }))}
//           />
//         </SafeAreaView>
//       );
//   };
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//     },
//   });
  
//   export default BuildingsSegmentedButtons;

import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import AdminStyles from '../../styles/AdminStyles';

const BuildingsSegmentedButtons = ({ buildings, value, onValueChange }) => {
  const handleValueChange = (val) => {
    if (val === undefined || val === null) {
      console.error("Invalid value selected!");
    } else {
      onValueChange(val);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={handleValueChange}
        buttons={buildings.map((building) => ({
          value: building.id,
          label: building.building_name,
          
        }))}
        theme={{
          colors: {
            secondaryContainer:"#B9E5E8"
          }
        }}
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
