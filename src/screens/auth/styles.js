import { StyleSheet } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
    authContainer:{
        borderWidth:0.5,
        borderColor: 'black',
        borderRadius:5,
        height:250,
        width:300,
        overflow:'hidden',
        padding:15,
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around'
    },
    privacyPolicyContainer: {
        flexDirection:'row',
        alignItems:'center'
    },
    signInButton:{
        backgroundColor:theme.themeColor,
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        borderRadius:5,
        flexDirection:'row'
    },
    signInButtonText:{
        color:'white'
    },
    googleIcon:{
        width:20,
        height:20,
        marginRight:10
    },
    heading:{

    },
    altOptionText:{
        color:theme.themeColor
    },
    privayPolicyText:{
        fontSize:theme.pFontSize
    }
})

export default styles;  