import React from 'react';
import { Text, View, StyleSheet, TextStyle } from 'react-native';

interface OutlinedTextProps {
    children: React.ReactNode;
    style?: TextStyle;
}

const StylePokemon: React.FC<OutlinedTextProps> = ({ children, style }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.textpokemon, styles.textOutline]}>{children}</Text>
            <Text style={[styles.textpokemon, style]}>{children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textpokemon: {
        fontSize: 38,
        fontFamily: 'Pokemon-Solid',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    textOutline: {
        position: 'absolute',
        top: 0,
        color: '#425FA9',
        textShadowColor: '#1E4B83',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
});

export default StylePokemon;
