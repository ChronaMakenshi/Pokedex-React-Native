import React, { useRef } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PokemonListProps {
    data: { url: string }[];
    navigateToPokemonDetail: (id: string) => void;
    scrollToTop: () => void;
    scrollToBottom: () => void;
    flatListRef: React.RefObject<FlatList<{ url: string }>>;
}

const PokemonList: React.FC<PokemonListProps> = ({ data, navigateToPokemonDetail, scrollToTop, scrollToBottom, flatListRef }) => {

    const formatId = (id: number) => {
        return id.toString().padStart(3, '0');
    };

    return (
        <View style={styles.blockContainer}>
            <View style={styles.arrowContainerTop}>
                <View style={styles.containerline}>
                    <View style={styles.line} />
                </View>
                <TouchableOpacity style={styles.arrowButtonTop} onPress={scrollToTop}>
                    <View style={styles.triangleTop} />
                </TouchableOpacity>
                <View style={styles.containerline}>
                    <View style={styles.line} />
                </View>
            </View>
            <FlatList
                ref={flatListRef}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                renderItem={({ item }) => {
                    const id = item.url.split('/')[6];
                    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

                    return (
                        <TouchableOpacity style={styles.containerList} onPress={() => navigateToPokemonDetail(id)}>
                            <View style={styles.itemContainer}>
                                <View style={styles.imageContainer} />
                                <View style={styles.imageContainerOmbre}>
                                    <Image style={styles.image} source={{ uri: imageUrl }} />
                                </View>
                                <Text style={styles.text}>{formatId(parseInt(id))}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
            <View style={styles.arrowContainerBottom}>
                <View style={styles.containerline}>
                    <View style={styles.line} />
                </View>
                <TouchableOpacity onPress={scrollToBottom}>
                    <View style={styles.triangleBottom} />
                </TouchableOpacity>
                <View style={styles.containerline}>
                    <View style={styles.line} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    blockContainer: {
        flex: 1,
        paddingVertical: 100,
    },

    arrowContainerTop: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginLeft: '4%',
        marginRight: '4%',
        marginTop: -100,
    },

    arrowContainerBottom: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: '4%',
        marginRight: '4%',
    },

    arrowButtonTop: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    triangleTop: {
        width: 0,
        height: 0,
        borderLeftWidth: 55,
        borderRightWidth: 55,
        borderBottomWidth: 35,
        borderStyle: 'solid',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#7DFEEB',
        shadowColor: "#7DFEEB",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },

    triangleBottom: {
        width: 0,
        height: 0,
        borderLeftWidth: 55,
        borderRightWidth: 55,
        borderTopWidth: 35,
        borderStyle: 'solid',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#7DFEEB',
        marginLeft: 15,
        marginRight: 15,
        shadowColor: "#7DFEEB",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },

    containerList: {
        flex: 1,
        alignItems: 'center',
    },

    itemContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 20,
    },

    imageContainer: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#1b7038',
        transform: [{translateX: 5}, {translateY: -15}],
    },

    imageContainerOmbre: {
        backgroundColor: '#46A467',
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        resizeMode: 'cover',
        width: 120,
        height: 120,
        zIndex: 3,
    },

    text: {
        marginTop: -5,
        fontSize: 32,
        color: '#024a80',
        fontWeight: 'bold',
        textShadowColor: 'rgba(255,255, 255, 1)',
        textShadowOffset: { width: 2, height: -2 },
        textShadowRadius: 1,
    },

    containerline: {
        flex: 1,
    },

    line: {
        width: '100%',
        height: 5,
        borderRadius: 5,
        backgroundColor: '#7DFEEB',
        shadowColor: "#7DFEEB",
        shadowOffset: {
            width: 200,
            height: 20,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
});

export default PokemonList;
