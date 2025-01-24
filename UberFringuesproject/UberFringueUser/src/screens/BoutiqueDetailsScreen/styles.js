import { StyleSheet } from "react-native";

export default StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    image: {
        width: '100%',
        aspectRatio: 5 / 3,
    },
    title: {
        fontSize: 35,
        fontWeight: "600",
        marginVertical: 10,

    },
    subtitle: {
        color: '#525252', 
        fontSize: 15,
    },
    container: {
        margin: 10,
    },
    iconContainer: {
        position: "absolute",
        top: 35,
        left: 10,
    },
    
    menuTitle: {
        marginTop: 20,
        marginLeft: 0,
        fontSize: 19,
        letterSpacing: 0.7,
    },
});
