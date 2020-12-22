import { StyleSheet } from "react-native";
import theme, { themeColor } from "../../theme";

const styles = StyleSheet.create({
    innerContainer:{
        borderWidth:0.5,
        borderColor: 'black',
        borderRadius:5,
        minHeight:300,
        width:300,
        overflow:'hidden',
        padding:15,
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around'
    },
    btn:{
        backgroundColor:theme.themeColor,
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:5,
        paddingHorizontal:30,
        borderRadius:5,
        flexDirection:'row',
    },
    btnText:{
        color:'white'
    },
    heading:{
        color:'black'
    },
    arrowIcons:{
        backgroundColor:themeColor
    },
    paraText:{
        fontSize:theme.pFontSize
    },
    checkboxContainer:{ 
        width: 230 ,
        maxHeight:220
    },
    checkbox:{
        height: 20, width: 20
    },
    checkboxSelected:{
        backgroundColor: themeColor,
    }
})

export default styles;  