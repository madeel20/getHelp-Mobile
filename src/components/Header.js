import React from 'react';
import { Header as HeaderEl } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
function Header(props) {
    const { colors } = useTheme();
    const navigation = useNavigation();
    return (
        <HeaderEl
            backgroundColor="transparent"
            leftComponent={
                <View style={{ paddingLeft: 10 }}>
                    {props.type == 'back' ?

                        <Icon1 name="chevron-back-outline" size={25} onPress={() => navigation.openDrawer()} style={{
                            color: colors.text
                        }}
                            size={30} onPress={props.onPress} /> :
                        <Icon1 name="menu-outline" size={30} onPress={() => navigation.openDrawer()}
                            style={{
                                color: colors.text
                            }} />}
                </View>
            }
            centerComponent={
                <View>
                    <Text style={{ fontSize: 18, fontFamily: 'Montserrat-SemiBold' }}>{props.title}</Text>
                </View>
            }
        />
    );
}

export default Header;
