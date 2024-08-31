import { useEffect, useState, useRef } from 'react';
import { Alert, FlatList } from 'react-native';

interface Pokemon {
    url: string;
}

interface PokemonSpecies {
    id: number;
    names: { language: { name: string }; name: string }[];
}

const usePokemonData = () => {
    const [data, setData] = useState<Pokemon[]>([]);
    const [filteredData, setFilteredData] = useState<Pokemon[]>([]);
    const [pokemonNames, setPokemonNames] = useState<Map<number, string>>(new Map());
    const [isLoading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const flatListRef = useRef<FlatList<{ url: string }>>(null);

    const scrollToTop = () => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    const scrollToBottom = () => {
        flatListRef.current?.scrollToEnd({ animated: true });
    };

    const getPokemon = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
            if (!response.ok) throw new Error('Network response was not ok');
            const json = await response.json();
            if (json.results && Array.isArray(json.results)) {
                setData(json.results);
                setFilteredData(json.results);
            } else {
                throw new Error('Invalid data structure');
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
            Alert.alert('Error', 'Failed to fetch Pokémon data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const filterByType = async (type: string) => {
        setLoading(true);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
            if (!response.ok) {
                throw new Error('Failed to fetch Pokémon by type');
            }
            const json = await response.json();
            const pokemonOfType = json.pokemon.map((p: any) => p.pokemon);
            setFilteredData(pokemonOfType);
        } catch (error) {
            console.error('Error fetching Pokémon by type:', error);
            Alert.alert('Erreur', 'Impossible de récupérer les Pokémon pour ce type.');
        } finally {
            setLoading(false);
        }
    };

    const fetchPokemonSpeciesInBatches = async (batchSize: number) => {
        const names = new Map<number, string>();
        const total = 1025;
        let start = 1;

        while (start <= total) {
            const end = Math.min(start + batchSize - 1, total);
            const fetchPromises = [];

            for (let i = start; i <= end; i++) {
                fetchPromises.push(
                    fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
                        .then(response => response.json())
                        .then((json: PokemonSpecies) => {
                            const frenchName = json.names.find(name => name.language.name === 'fr')?.name;
                            if (frenchName) {
                                names.set(i, frenchName);
                            }
                        })
                        .catch(error => console.error(`Failed to fetch Pokémon species ${i}:`, error))
                );
            }

            await Promise.all(fetchPromises);
            start = end + 1;
        }

        setPokemonNames(names);
    };

    const handleSearchQueryChange = (query: string) => {
        setSearchQuery(query);

        if (query === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter(pokemon => {
                const id = pokemon.url.split('/')[6];
                const name = pokemonNames.get(Number(id))?.toLowerCase() || '';
                return name.includes(query.toLowerCase()) || id.includes(query);
            });
            setFilteredData(filtered);
        }
    };

    useEffect(() => {
        getPokemon();
        fetchPokemonSpeciesInBatches(50);
    }, []);

    return {
        isLoading,
        data: filteredData,
        filterByType,
        setSearchQuery: handleSearchQueryChange,
        scrollToTop,
        scrollToBottom,
        flatListRef,
    };
};

export default usePokemonData;
