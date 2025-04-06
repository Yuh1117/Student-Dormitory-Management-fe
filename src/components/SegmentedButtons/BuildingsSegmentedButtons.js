
import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
const BuildingsSegmentedButtons = ({buildings}) => {
    const [value, setValue] = React.useState(
        buildings.length > 0 ? buildings[0].id.toString() : null
      );
  
      return (
        <SafeAreaView style={styles.container}>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={buildings.map((b) => ({
              value: b.id.toString(),
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