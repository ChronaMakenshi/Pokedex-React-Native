import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import NavBar from '@/components/navigation/NavBar';
import PokemonList from '@/components/content/PokemonList';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import usePokemonData  from '@/hooks/usePokemonData';

export default function Home() {
    const { isLoading, data, filterByType, setSearchQuery, scrollToTop, scrollToBottom, flatListRef } = usePokemonData();
    const router = useRouter();

    const navigateToPokemonDetail = (id: string) => {
        router.push(`/pokemon/${id}`);
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <NavBar setSearchQuery={setSearchQuery} filterByType={filterByType} />
                <LinearGradient colors={['#2BB2BB', '#30CDAE']} style={styles.background} locations={[0, 1]}>
                    <View style={styles.blockContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                </LinearGradient>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <NavBar setSearchQuery={setSearchQuery} filterByType={filterByType} />
            <LinearGradient colors={['#2BB2BB', '#30CDAE']} style={styles.background} locations={[0, 1]}>
                <PokemonList
                    data={data}
                    navigateToPokemonDetail={navigateToPokemonDetail}
                    scrollToTop={scrollToTop}
                    scrollToBottom={scrollToBottom}
                    flatListRef={flatListRef}
                />
            </LinearGradient>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    background: {
        width: "100%",
        height: '100%',
    },

});

