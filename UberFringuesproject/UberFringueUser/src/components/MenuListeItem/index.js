import { View, Text, StyleSheet, Image, Pressable } from "react-native";

const MenuListeItem = ({ dish }) => {
    return (
        <Pressable
            onPress={() => navigation.navigate("Dish", { id: dish.id })}
            style={styles.container}
        >
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{dish.name}</Text>
                <Text style={styles.description} numberOfLines={3}>
                    {dish.description}
                </Text>
                <Text style={styles.price}>€ {dish.price}</Text>
            </View>

            {dish.images && dish.images.length > 0 && (
                <Image
                    source={{ uri: dish.images[0] }}
                    style={styles.image}
                />
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
        flexDirection: "row",
    },
    name: {
        fontWeight: "600",
        fontSize: 16,
        letterSpacing: 0.5,
    },
    description: {
        color: "gray",
        marginVertical: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
    },
    image: {
        height: 75,
        aspectRatio: 1,
    },
});

export default MenuListeItem;
