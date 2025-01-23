import { StyleSheet, Text, View, Image } from 'react-native';

const getImagePath = (imageName) => {
    switch (imageName) {
        case 'magazin-femme1.png':
            return require('../../../assets/images/magazin-femme1.png');
        case 'magazin-femme2.png':
            return require('../../../assets/images/magazin-femme2.png');
        case 'magazin-femme3.png':
            return require('../../../assets/images/magazin-femme3.png');
        case 'magazin-femme4.png':
            return require('../../../assets/images/magazin-femme4.png');
        case 'magazin-femme5.png':
            return require('../../../assets/images/magazin-femme5.png');
        case 'magazin-femme6.png':
            return require('../../../assets/images/magazin-femme6.png');
        case 'magazin-homme1.png':
            return require('../../../assets/images/magazin-homme1.png');
        case 'magazin-homme2.png':
            return require('../../../assets/images/magazin-homme2.png');
        case 'magazin-homme3.png':
            return require('../../../assets/images/magazin-homme3.png');
        case 'magazin-homme4.png':
            return require('../../../assets/images/magazin-homme4.png');
    }
};
const BoutiqueItem = ({ boutiques }) => {
    return (
        <View style={styles.boutiqueContainer}>
            <Image
                source={getImagePath(boutiques.image)} // Image dynamique
                style={styles.image}
            />
            <View style={styles.row}>
                <View>
                    <Text style={styles.title}>{boutiques.name}</Text>
                    <Text style={styles.subtitel}>
                        {boutiques.deliveryFee} € &#8226; {boutiques.minDeliveryTime} - {boutiques.maxDeliveryTime} minutes
                    </Text>
                </View>
                {/* Rating ajouté ici */}
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