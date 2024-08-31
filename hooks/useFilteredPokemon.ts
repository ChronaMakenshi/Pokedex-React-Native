import { useState, useEffect } from 'react';
import { Pokemon } from '../hooks/usePokemonData';

const useFilteredPokemon = (data: Pokemon[], pokemonNames: Map<number, string>, searchQuery: string) => {
    const [filteredData, setFilteredData] = useState<Pokemon[]>([]);

    useEffect(() => {
        if (searchQuery) {
            const filtered = data.filter((pokemon) => {
                const id = pokemon.url.split('/')[6];
                const nameInFrench = pokemonNames.get(parseInt(id));
                return (nameInFrench && nameInFrench.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    id === searchQuery;
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    }, [searchQuery, data, pokemonNames]);

    return filteredData;
};

export default useFilteredPokemon;
