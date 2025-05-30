import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, StyleSheet } from 'react-native';

const BuildingSelector = ({ buildings, onSelect }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    useEffect(() => {
        if (buildings.length > 0) {
            const values = buildings.map(b => b.value);
            if (!values.includes(value)) {
                const firstValue = buildings[0].value;
                setValue(firstValue);
                onSelect && onSelect(firstValue);
            }
        }
    }, [buildings]);

    return (
        <View style={styles.container}>
            <DropDownPicker
                open={open}
                value={value}
                items={buildings}
                setOpen={setOpen}
                setValue={(val) => {
                    setValue(val());
                    onSelect && onSelect(val());
                }}
                placeholder="Chọn toà"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        zIndex: 1000,
    },
    dropdown: {
        borderRadius: 10,
        borderColor: '#ccc',
    },
    dropdownContainer: {
        borderRadius: 10,
        borderColor: '#ccc',
    },
});

export default BuildingSelector;
