import { StyleSheet, Text, View, Image } from 'react-native';

const BoutiqueItem = ({ boutiques }) => {
    return (
        <View style={styles.boutiqueContainer}>
            <Image
                source={{ uri: boutiques.image }} // Utilisation de l'URL directement
                style={styles.image}
            />
            <View style={styles.row}>
                <View>
                    <Text style={styles.title}>{boutiques.name}</Text>
                    <Text style={styles.subtitel}>
                        {boutiques.deliveryFee} € &#8226; {boutiques.minDeliveryTime} - {boutiques.maxDeliveryTime} minutes
                    </Text>
                </View>
                {/* Rating */}
                <View style={styles.rating}>
                    <Text>{boutiques.rating}</Text>
                </View>
            </View>
        </View>
    );
};

export default BoutiqueItem;

const styles = StyleSheet.create({
    boutiqueContainer: {
        width: '100%',
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 4 / 3,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        marginVertical: 5,
    },
    subtitel: {
        color: 'grey',
    },
    row: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
    },
    rating: {
        marginLeft: "auto", 
        backgroundColor: "#FFD700", 
        width: 30, 
        height: 30, 
        alignItems: "center", 
        justifyContent: "center", 
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor: "#DAA520",
    },
});
