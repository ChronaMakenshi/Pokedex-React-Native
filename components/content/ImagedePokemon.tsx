import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axeImage from '@/assets/images/axe.png';

interface ImagedePokemonProps {
    title: string | { uri: string };
    imagesToDisplay: { uri: string }[];
}

const ImagedePokemon: React.FC<ImagedePokemonProps> = ({ title, imagesToDisplay }) => {

    const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

    const handleImageError = (uri: string) => {
        console.log('Error loading image:', uri);
        setImageError(prev => ({ ...prev, [uri]: true }));
    };

    return (
        <View>
            {typeof title === 'string' ? (
                <Text style={styles.titleMF}>{title}</Text>
            ) : (
                <Image
                    source={title}
                    style={styles.pokemonImageAxe}
                />
            )}
            {imagesToDisplay.length > 0 && (
                <View style={styles.imageContainerGenre}>
                    {imagesToDisplay.map((image, index) => (
                        <Image
                            key={index}
                            source={{ uri: image.uri }}
                            style={styles.pokemonImageGenre}
                            onError={() => handleImageError(image.uri)}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    titleMF: {
        fontSize: 30,
        alignSelf: 'center',
    },
    pokemonImageAxe: {
        width: 30,
        height: 30,
        alignSelf: 'center',
    },
    imageContainerGenre: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    pokemonImageGenre: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        overflow: 'hidden',
    },
});

export default ImagedePokemon;
