import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingScreen: React.FC<{ message?: string }> = ({ message = "Loading..." }) => (
    <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFFFF3" />
        <Text style={styles.textload}>{message}</Text>
    </View>
);

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EE4035',
    },
    textload: {
        color: '#FFFFF3',
        fontSize: 18,
    },
});

export default LoadingScreen;
