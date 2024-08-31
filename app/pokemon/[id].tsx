import React, { useRef } from 'react';
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {GestureHandlerRootView, PanGestureHandler, ScrollView} from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import useFetchPokemonData from '@/hooks/useFetchPokemonData';
import useFontsLoader from '@/hooks/useFontsLoader';
import useGestureHandler from '@/hooks/useGestureHandler';
import Carousel from '@/components/content/Carousel';
import ImagedePokemon from '@/components/content/ImagedePokemon';
import ListEvolution from '@/components/content/ListEvolution';
import CompomentStats from '@/components/content/CompomentStats';
import PokemonSheet from '@/components/content/PokemonSheet';
import VersionImage from '@/components/content/VersionImage';
import StylePokemon from '@/components/content/StylePokemon';
import LoadingScreen from "@/components/LoadingScreen";
import ErrorScreen from '@/components/ErrorScreen';
import NoDataScreen from '@/components/NoDataScreen';
import {asexual, femaleOnly, maleOnly, typeColors, typeImages, versionImages} from '@/constants/pokemonData';
import flecheG from '@/assets/images/iconsgauche48.png';


const PokemonDetail: React.FC = () => {
    const scrollViewRef = React.useRef<ScrollView>(null);

    const route = useRoute();
    const { id } = route.params as { id: string };
    const navigation = useNavigation();

    const fontsLoaded = useFontsLoader();
    const { handleGestureEvent, handleStateChange, translateX, scale } = useGestureHandler(id, navigation);
    const {
        pokemon, svgData, carouselImages, frenchName, description, evolutions, loading, error, femaleImageExists, maleImageUri, femaleImageUri
    } = useFetchPokemonData(id);


    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { scale: scale.value }
        ],
    }));

    const handleScrollToTop = () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    };

    if (!fontsLoaded) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#00f" />
                <Text>Loading fonts...</Text>
            </View>
        );
    }

    if (loading) return <LoadingScreen />;
    if (error) return <ErrorScreen error={error} />;
    if (!pokemon) return <NoDataScreen />;

    const getGradientColors = (types: string[]) => {
        const colors = types.map(type => typeColors[type]);
        return colors.length === 1 ? [colors[0], colors[0]] : [colors[0], colors[1] || colors[0]];
    };

    const types = pokemon.types.map((typeInfo: any) => typeInfo.type.name);
    const gradientColors = getGradientColors(types);

    let title;
    let imagesToDisplay = [];

    if (maleOnly.includes(parseInt(id))) {
        title = '♂️';
        imagesToDisplay = [{uri: maleImageUri}];
    } else if (femaleOnly.includes(parseInt(id))) {
        title = '♀️';
        imagesToDisplay = [{uri: maleImageUri}];
    } else if (asexual.includes(parseInt(id))) {
        title = axeImage;
        imagesToDisplay = [{uri: maleImageUri}];
    } else if (femaleImageExists) {
        title = `♂️ & ♀️`;
        imagesToDisplay = [{uri: maleImageUri}, {uri: femaleImageUri}];
    } else {
        title = `♂️ & ♀️`;
        imagesToDisplay = [{uri: maleImageUri}];
    }

    return (
        <GestureHandlerRootView style={styles.flexContainer}>
            <PanGestureHandler
                onGestureEvent={handleGestureEvent}
                onHandlerStateChange={handleStateChange}
                simultaneousHandlers={scrollViewRef}
            >
                <Animated.View style={[styles.container, animatedStyle]}>
                    <LinearGradient colors={['#284bfd', '#699fd0', '#A3FDFB']}>
                        <ImageBackground
                            source={require('@/assets/images/grille.png')}
                            style={styles.backgroundFond}
                            resizeMode="stretch"
                        >
                            <ScrollView
                                ref={scrollViewRef}
                                contentContainerStyle={styles.scrollContainer}
                                style={styles.scrollView}
                            >
                                <View>
                                    <View style={styles.backgroundHeader}/>
                                    <View style={styles.backgroundbar}/>
                                    <LinearGradient
                                        colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.9)', 'rgba(0,208,255,0.9)']}
                                        style={styles.backgroundbar2}
                                    >
                                        <TouchableOpacity
                                            style={styles.containerHome}
                                            onPress={() => navigation.navigate('index')}
                                        >
                                            <Image
                                                source={flecheG}
                                                style={styles.icon}
                                            />
                                            <Text style={styles.textHome}>Vers l'Accueil</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                    <View style={styles.backgroundType}>
                                        <View style={styles.backgroundType1Container}>
                                            <LinearGradient
                                                colors={['rgba(0,208,255,0.9)', 'rgba(0,208,255,0.5)', 'rgba(0,208,255,0.9)']}
                                                start={{x: 0.2, y: 0.8}}
                                                end={{x: 0, y: 0.1}}
                                                style={styles.backgroundType1}
                                            />
                                        </View>
                                        <View style={styles.backgroundType1ombreContainer}>
                                            <View style={styles.backgroundType1ombre}/>
                                        </View>
                                        <View style={styles.backgroundType2Container}>
                                            <LinearGradient
                                                colors={['rgba(0,208,255,0.9)', 'rgba(0,208,255,0.5)', 'rgba(0,208,255,0.9)']}
                                                start={{x: 0.2, y: 0.8}}
                                                end={{x: 0, y: 0.1}}
                                                style={styles.backgroundType1}
                                            />
                                        </View>
                                        <View style={styles.backgroundType2ombreContainer}>
                                            <View style={styles.backgroundType1ombre}/>
                                        </View>
                                        <View style={styles.typeImageContainer}>
                                            {types.map((type, index) => (
                                                <Image
                                                    key={index}
                                                    style={styles.typeImage}
                                                    source={typeImages[type]}
                                                />
                                            ))}
                                        </View>
                                    </View>
                                    <Carousel data={carouselImages} pokemonId={pokemon.id}/>

                                    <LinearGradient colors={gradientColors} style={styles.gradientBackground}>
                                        <View style={styles.contentContainer}>
                                            <StylePokemon style={styles.title}>{frenchName}</StylePokemon>
                                            <ImagedePokemon title={title} imagesToDisplay={imagesToDisplay}/>
                                            <Text style={styles.description}>{description}</Text>
                                            <ListEvolution
                                                evolutions={evolutions.length > 0 ? evolutions : ["Ce Pokémon n'a pas d'évolution"]}
                                            />
                                            <PokemonSheet
                                                height={pokemon?.height || 0}
                                                weight={pokemon?.weight || 0}
                                                heldItems={pokemon?.held_items || []}
                                                abilities={pokemon?.abilities || []}
                                            />
                                            <CompomentStats stats={pokemon.stats}/>
                                            <VersionImage
                                                versionImages={versionImages}
                                                gameIndices={pokemon?.game_indices || []}
                                            />
                                        </View>
                                    </LinearGradient>
                                </View>
                            </ScrollView>
                        </ImageBackground>
                    </LinearGradient>
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 25,
        height: 'auto',
        width: '100%',
        overflow: 'hidden',
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundFond: {
        width: '100%',
    },
    backgroundHeader: {
        height: '2%',
        backgroundColor: 'rgba(0,29,183,0.6)',
    },
    backgroundbar: {
        height: '2%',
        backgroundColor: '#fff',
        borderBottomColor: 'rgba(0,0,0,0.3)',
        borderBottomWidth: 1,
    },
    backgroundbar2: {
        height: 78,
        width: '100%',
        borderBottomColor: 'rgba(0,0,0,0.2)',
        borderBottomWidth: 10,
    },
    backgroundType: {
        position: 'relative',
        height: 80,
    },
    backgroundType1Container: {
        position: 'absolute',
        top: -12,
        left: 30,
        width: 120,
        height: 80,
        overflow: 'hidden',
        borderRadius: 50,
        zIndex: 1,
    },
    backgroundType2Container: {
        position: 'absolute',
        top: -12,
        left: 116,
        width: 120,
        height: 80,
        overflow: 'hidden',
        borderRadius: 50,
    },
    backgroundType1: {
        width: 100,
        height: 50,
        transform: [{rotateX: '180deg'}, {rotateZ: '0.80rad'}],
        borderRadius: 50,
        position: 'absolute',
        top: -11,
    },
    backgroundType1ombreContainer: {
        position: 'absolute',
        top: -12,
        left: 120,
        width: 120,
        height: 100,
        overflow: 'hidden',
        borderRadius: 50,
    },
    backgroundType2ombreContainer: {
        position: 'absolute',
        top: -12,
        left: 35,
        width: 120,
        height: 100,
        overflow: 'hidden',
        borderRadius: 50,
        zIndex: 0,
    },
    backgroundType1ombre: {
        width: 100,
        height: 50,
        transform: [{rotateX: '180deg'}, {rotateZ: '0.80rad'}],
        borderRadius: 50,
        position: 'absolute',
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.2)',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 0,
        elevation: 4,
    },
    typeImageContainer: {
        position: 'absolute',
        flexDirection: 'row',
        top: -6,
        left: 23,
    },
    typeImage: {
        width: 44,
        height: 44,
        marginHorizontal: 21,
        zIndex: 1,
    },
    title: {
        fontSize: 36,
        fontFamily: 'Pokemon-Solid',
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#f7ff0d',
    },
    description: {
        textAlign: 'center',
        width: 350,
        marginHorizontal: 'auto',
        marginVertical: 20,
        fontSize: 14,
        fontFamily: 'PressStart2P',
    },
    containerHome: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginVertical: 10,
        marginLeft: 10,
    },
    textHome: {
        fontFamily: 'PressStart2P',
        fontSize: 10,
    },
    icon: {
        width: 48,
        height: 48,
    },
    flexContainer: {
        flex: 1,
    },
});

export default PokemonDetail;
























