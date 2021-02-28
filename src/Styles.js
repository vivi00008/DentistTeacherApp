import React from 'react' 
import { StyleSheet, Dimensions } from 'react-native'

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width
export default StyleSheet.create({
    root: {
        flex: 1,
    },
    bgContainer: {
        margin: 30,
        marginTop: 30,
    },
    container: {
        marginHorizontal: 24,
        flex: 1,
        flexDirection: "column",
    },
    textHeader: {
        color: "white",
        fontSize: 30,
        fontFamily: "kanitRegular",
    },
    contentBg: {
        backgroundColor: "white",
        flex: 1,
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        marginTop: 48,
        padding: 12,
        height: HEIGHT / 1.3,
    },
    iconContent: {
        top: -50,
        backgroundColor: "#c577c4",
        right: 20,
        position: "absolute",
    },
    container: {
        marginHorizontal: 24,
        flex: 1,
        flexDirection: "column",
    },
    loginButton: {
        flexDirection: "row",
        backgroundColor: "rgb(46,196,182)",
        width: WIDTH / 1.3,
        height: HEIGHT / 15,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 10,
        bottom:80,
        position:'absolute'
    },
    iconArrowRight: {
        color: "white",
        right: 30,
        position: "absolute",
    },
    textButton: {
        fontSize: 18,
        fontFamily: "kanitRegular",
        color: "white",
    },
    rentContent:{
        marginTop:HEIGHT/10
    }
})