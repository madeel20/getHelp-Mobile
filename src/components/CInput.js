import React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default function CInput({style={},value,onChangeText,placeHolder='',type='name',keyboardType='default',editable=true}) {
    return (
        <TextInput
        style={[styles.input,style]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeHolder}
        textContentType={type}
        keyboardType={keyboardType}
        editable={editable}        
        />
    )
}
const styles = StyleSheet.create({
   input: { height: 40, width:'80%', borderColor: 'gray', borderWidth: 1 , borderRadius:3,marginVertical:5}
})
