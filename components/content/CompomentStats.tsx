import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Stats from '@/components/content/Stats';
import { statTranslations } from '@/constants/pokemonData';

const CompomentStats = ({ stats }) => {
    const statValues = stats.map(statInfo => statInfo.base_stat);
    const statLabels = stats.map(statInfo => `${statTranslations[statInfo.stat.name]}: ${statInfo.base_stat}`);

    return (
        <View style={styles.statsContainer}>
            <Text style={styles.subtitle}>Statistiques :</Text>
            <Stats data={statValues} labels={statLabels} />
        </View>
    );
};

const styles = StyleSheet.create({
    statsContainer: {
        width: 250,
        marginHorizontal: 'auto',
        marginVertical: 10,
        height: 300,
    },
    subtitle: {
        fontFamily: 'PressStart2P',
        fontSize: 12,
        marginVertical: 10,
    },
});

export default CompomentStats;

