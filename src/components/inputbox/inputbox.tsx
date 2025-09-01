import React, { ReactNode } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputBoxProps extends TextInputProps {
  label?: string;
  width?: number | string;
  height?: number;
  children?: ReactNode; // for an icon or any element
}

export const InputBox: React.FC<InputBoxProps> = ({
  label,
  width = '100%',
  height = 50,
  placeholder = '',
  children,
  ...textInputProps // for other TextInput props like value, onChangeText
}) => {
  return (
    <View style={{ marginBottom: 15 }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, { width, height }]}>
        {children && <View style={styles.iconContainer}>{children}</View>}
        <TextInput
          style={[styles.input, { marginLeft: children ? 10 : 0 }]}
          placeholder={placeholder}
          placeholderTextColor="#999"
          {...textInputProps}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '500',
    color:'black'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#f8f8f8',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});
