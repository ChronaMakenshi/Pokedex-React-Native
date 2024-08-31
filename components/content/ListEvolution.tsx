import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListEvolution = ({ evolutions }) => {
    return (
        <View>
            <Text style={styles.evolutionsTitle}>Évolutions:</Text>
            <View style={styles.evolutionsList}>
                {evolutions.map((evolution, index) => (
                    <Text key={index} style={styles.evolutionName}>{evolution}</Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    evolutionsTitle: {
        textAlign: 'center',
        fontFamily: 'PressStart2P',
    },
    evolutionsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    evolutionName: {
        fontSize: 10,
        paddingHorizontal: 10,
        fontFamily: 'PressStart2P',
        color: 'white',
    },
});

export default ListEvolution;

