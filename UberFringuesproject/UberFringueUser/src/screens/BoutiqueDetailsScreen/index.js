import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import boutiques from '../../../assets/data/boutiques.json'; // Charger les données avec URL
import {Ionicons} from "@expo/vector-icons";
import MenuListeItem from "../../components/MenuListeItem";
import Header from "./Header";
import styles from './styles';

const boutique = boutiques[0]; // Charger la première boutique

const BoutiqueDetailsPage = () => {
    return (
        <View style={styles.page}>
            <FlatList
                ListHeaderComponent={ () => <Header  boutique={boutique} />}
                data={boutique.dishes}
                renderItem={({ item }) => <MenuListeItem dish={item} />}
                />
                    <Ionicons
                        onPress={() => navigation.goBack()}
                        name="arrow-back-circle"
                        size={45}
                        color="black"
                        style={styles.iconContainer}
                    />
        </View>
    );
};

export default BoutiqueDetailsPage;



