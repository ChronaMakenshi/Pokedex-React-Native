import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { versionImages } from '@/constants/pokemonData';


const PokemonGameIndices: React.FC<{ gameIndices: any[] }> = ({ gameIndices }) => {
    return (
        <View style={styles.gameIndicesContainer}>
            <Text style={styles.subtitle}>Apparaît dans :</Text>
            <View style={styles.gameImagesContainer}>
                {gameIndices.map((gameIndex, index) => {
                    const versionName = gameIndex.version.name;
                    console.log('Version Name:', versionName);

                    const imageSource = versionImages[versionName];
                    console.log('Image Source:', imageSource);

                    return imageSource ? (
                        <Image
                            key={index}
                            style={styles.versionImages}
                            source={imageSource}
                        />
                    ) : (
                        <Text key={index} style={styles.gameText}>
                            {versionName}
                        </Text>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    gameIndicesContainer: {
        marginVertical: 8,
        width: 300,
        marginHorizontal: 'auto',
    },
    gameImagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    versionImages: {
        width: 50,
        height: 50,
        margin: 4,
    },
    gameText: {
        fontSize: 16,
        margin: 4,
    },
    subtitle: {
        fontSize: 12,
        marginVertical: 4,
        fontFamily: 'PressStart2P',
    },
});

export default PokemonGameIndices;




