import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoDataScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>Aucune donnée disponible.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default NoDataScreen;
