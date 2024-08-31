import React, {useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {SvgUri, SvgXml} from 'react-native-svg';
import {Audio} from 'expo-av';
import flecheG from '@/assets/images/iconsgauche48.png';
import flecheD from '@/assets/images/iconsdroite48.png';
import {typeImages} from "@/constants/pokemonData";

interface CarouselPokemonProps {
    data: { image: string, label: string }[];
    pokemonId: string;
}


export default function CarouselPokemon({data, pokemonId}) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const carouselRef = useRef<any>(null); // Reference to the Carousel

    const playSound = async () => {
        try {
            const soundUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonId}.ogg`;
            const {sound} = await Audio.Sound.createAsync(
                {uri: soundUrl},
                {shouldPlay: true}
            );
            await sound.playAsync();
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    };

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % data.length;
        setCurrentIndex(nextIndex);
        carouselRef.current.scrollTo({index: nextIndex});
    };

    const handlePrevious = () => {
        const prevIndex = (currentIndex - 1 + data.length) % data.length;
        setCurrentIndex(prevIndex);
        carouselRef.current.scrollTo({index: prevIndex});
    };

    return (
        <View style={styles.carouselContainer}>
            <Carousel
                ref={carouselRef}
                loop
                width={300}
                height={300}
                autoPlay={false}
                data={data}
                onSnapToItem={(index) => setCurrentIndex(index)}
                renderItem={({item}) => (
                    <View style={styles.carouselItem}>
                        <Text style={styles.label}>{item.label}</Text>
                        <TouchableOpacity onPress={playSound}>
                            {item.image.includes('.svg') ? (
                                <SvgUri width={200} height={200} uri={item.image}/>
                            ) : (
                                <Image width={200} height={200} source={{uri: item.image}} style={styles.image}/>
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.arrowButtonLeft} onPress={handlePrevious}>
                <Image  source={flecheG} width={48} height={48}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.arrowButtonRight} onPress={handleNext}>
                <Image  source={flecheD} width={48} height={48}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        position: 'relative',
        alignItems: 'center',
    },
    carouselItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
    arrowButtonLeft: {
        position: 'absolute',
        left: 10,
        top: 100,
        zIndex: 1,
    },
    arrowButtonRight: {
        position: 'absolute',
        right: 10,
        top: 100,
        zIndex: 1,
    },
    label: {
        marginTop: 8,
        fontSize: 10,
        color: '#171717',
        fontFamily: 'PressStart2P',
    },
});














