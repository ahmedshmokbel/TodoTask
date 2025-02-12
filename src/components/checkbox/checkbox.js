import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IconsComponent from '../layout/IconsComponent';

const Checkbox = ({ label, onCheckChange, checked, size = 24, color = '#FFF' }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handlePress = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        if (onCheckChange) {
            onCheckChange(newChecked);
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={[styles.checkbox, isChecked ? styles.checked : null]}>
                {isChecked && (
                    <IconsComponent name="Check" color={color} size={size} />
                )}
            </View>
            {label ? <Text style={styles.label}>{label}</Text> : null}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 5,
        marginRight: 10,
    },
    checked: {
        borderColor: '#4CAF50',  // A green border color when checked
        backgroundColor: '#4CAF50',  // A green background color when checked
    },
    label: {
        fontSize: 16,
    }
});

export default Checkbox;
