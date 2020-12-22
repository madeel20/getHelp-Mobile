import { StyleSheet } from "react-native";
import theme, { themeColor } from "../../theme";

const styles = StyleSheet.create({
    innerContainer:{
        borderWidth:0.1,
        borderColor: 'black',
        minHeight:250,
        borderRadius:1,
        width:300,
        overflow:'hidden',
        paddingVertical:10,
        paddingHorizontal:30,
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around'
    },
    subContainers:{
        display:'flex',
        flexDirection:'column'
    },
    subChildContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        borderRadius:2,
        borderWidth:0.2,
        borderColor:'grey',
        padding:10,
        marginVertical:5,
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
        fontSize:theme.pFontSize,
        marginVertical:3,
        alignSelf:'flex-start'
    },
    checkboxContainer:{ 
        width: 230 ,
        marginVertical:10,
        maxHeight:250
    },
    checkbox:{
        height: 20, width: 20
    },
    checkboxSelected:{
        backgroundColor: themeColor,
    },
    recordsContainer:{
        maxHeight:300,
    },
    link: {
        fontSize: 15,
        lineHeight: 18,
        fontFamily: 'Montserrat-Bold',
        color: 'grey',
        alignSelf: 'center',
      },
})

export default styles;  