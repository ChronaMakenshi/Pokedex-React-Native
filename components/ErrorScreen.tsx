import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface ErrorScreenProps {
    error: string;
    onRetry?: () => void; 
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ error, onRetry }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.errorText}>Une erreur est survenue :</Text>
            <Text style={styles.errorMessage}>{error}</Text>
            {onRetry && (
                <Button title="Réessayer" onPress={onRetry} />
            )}
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
    errorText: {
        fontSize: 18,
        color: 'red',
        marginBottom: 8,
    },
    errorMessage: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ErrorScreen;
