import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeldItem {
    item: {
        name: string;
    };
}

interface Ability {
    ability: {
        name: string;
    };
    is_hidden: boolean;
}

interface PokemonSheetProps {
    height?: number;
    weight?: number;
    heldItems?: HeldItem[];
    abilities?: Ability[];
}

const PokemonSheet: React.FC<PokemonSheetProps> = ({
                                                       height = 0,
                                                       weight = 0,
                                                       heldItems = [],
                                                       abilities = [],
                                                   }) => {
    return (
        <View>
            <Text style={styles.height}>
                <Text style={styles.heightTitle}>Hauteur: </Text>
                <Text style={styles.heightValue}>{(height / 10).toFixed(1)} m</Text>
            </Text>
            <Text style={styles.weight}>
                <Text style={styles.weightTitle}>Poids: </Text>
                <Text style={styles.weightValue}>{(weight / 10).toFixed(1)} kg</Text>
            </Text>
            {heldItems.length > 0 && (
                <View style={styles.itemContainer}>
                    <Text style={styles.subtitle}>Objet d'évolution :</Text>
                    <Text style={styles.subtitle2}>{heldItems[0]?.item?.name || 'Aucun objet trouvé'}</Text>
                </View>
            )}
            {abilities.length > 0 && (
                <View style={styles.abilitiesContainer}>
                    <View style={styles.talent}>
                        <Text style={styles.subtitle}>Talents :</Text>
                        {abilities.filter(ability => !ability.is_hidden).map((ability, index) => (
                            <Text style={styles.subtitle2} key={index}>{ability.ability.name}</Text>
                        ))}
                    </View>
                    <View style={styles.talentcacher}>
                        <Text style={styles.subtitle}>Talent caché :</Text>
                        {abilities.filter(ability => ability.is_hidden).map((ability, index) => (
                            <Text style={styles.subtitle2} key={index}>{ability.ability.name}</Text>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    height: {
        textAlign: 'center',
        fontSize: 12,
        fontFamily: 'PressStart2P',
        marginTop: 10,
    },
    weight: {
        textAlign: 'center',
        fontFamily: 'PressStart2P',
        fontSize: 12,
    },
    heightTitle: {
        color: '#000000',
    },
    heightValue: {
        color: '#ffffff',
    },
    weightTitle: {
        color: '#000000',
    },
    weightValue: {
        color: '#ffffff',
    },
    itemContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        textAlign: 'center',
    },
    abilitiesContainer: {
        alignItems: 'center',
    },
    subtitle: {
        fontFamily: 'PressStart2P',
        fontSize: 12,
    },
    subtitle2:{
        fontFamily: 'PressStart2P',
        fontSize: 12,
        color: '#fff',
    },
    talent: {
        flexDirection: 'row',
    },
    talentcacher: {
        flexDirection: 'row',
    },
});

export default PokemonSheet;





