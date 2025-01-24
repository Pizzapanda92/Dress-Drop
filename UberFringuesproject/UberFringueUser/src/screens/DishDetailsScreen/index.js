import { View, Text, Image, StyleSheet } from "react-native";
import boutique from "../../../assets/data/boutiques.json";

const dish = boutique[0].dishes[0];

const DishDetailsScreen = () => {
    return (
        <View style={styles.page}>
            <Image 
                source={{ uri: dish.image }} 
                style={styles.image}
            />
            <Text style={styles.name}>{dish.name}</Text>
            <Text style={styles.description}>{dish.description}</Text>
            <View style={styles.separator} />
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: "100%",
        paddingVertical: 40,
        padding: 10,
    },

    name: {
        fontSize: 30,
        fontWeight: "600",
        marginVertical: 10,
    },

    separator: {
        height: 1,
        backgroundColor: "lightgrey",
        marginVertical: 10,
    },

    image: {
        width: "100%",
        aspectRatio: 5 / 3,
    },
});

export default DishDetailsScreen;
