import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, StyleSheet } from 'react-native';

const BuildingSelector = ({ onSelect }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Toà A', value: 'A' },
        { label: 'Toà B', value: 'B' },
        { label: 'Toà C', value: 'C' },
    ]);

    useEffect(() =>{
        setValue('A')
    }, [])

    return (
        <View style={styles.container}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={(val) => {
                    setValue(val());
                    onSelect && onSelect(val());
                }}
                setItems={setItems}
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
