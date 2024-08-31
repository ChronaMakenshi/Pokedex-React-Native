import { useCallback, useEffect, useState } from 'react';

const useFetchPokemonData = (id: string) => {
    const [pokemon, setPokemon] = useState(null);
    const [svgData, setSvgData] = useState<string | null>(null);
    const [carouselImages, setCarouselImages] = useState([]);
    const [frenchName, setFrenchName] = useState('');
    const [description, setDescription] = useState('');
    const [evolutions, setEvolutions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [femaleImageExists, setFemaleImageExists] = useState(true);

    const maleImageUri = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
    const femaleImageUri = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/female/${id}.gif`;

    const fetchPokemonData = useCallback(async () => {
        try {
            const fetchJson = async <T>(url: string): Promise<T> => {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`);
                return response.json();
            };

            const fetchText = async (url: string) => {
                const response = await fetch(url);
                if (!response.ok) return null;
                return response.text();
            };

            const [pokemonData, speciesData, svgData, evolutionData] = await Promise.all([
                fetchJson(`https://pokeapi.co/api/v2/pokemon/${id}`),
                fetchJson(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
                fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`).then(res => res.ok ? res.text() : null),
            ]);


            setPokemon(pokemonData);
            setSvgData(svgData);

            const frenchName = speciesData.names.find((nameEntry: any) => nameEntry.language.name === 'fr')?.name || pokemonData.name;
            setFrenchName(frenchName);

            const descriptionEntry = speciesData.flavor_text_entries.find((entry: any) => entry.language.name === 'fr') ||
                speciesData.flavor_text_entries.find((entry: any) => entry.language.name === 'en') ||
                {flavor_text: 'No description available'};
            setDescription(descriptionEntry.flavor_text);

            try {
                const evolutionData = await fetchJson(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
                const getFrenchEvolutionNames = async (chain: any): Promise<string[]> => {
                    const promises = [];
                    while (chain) {
                        promises.push(fetchJson(chain.species.url).then((species: any) => species.names.find((nameEntry: any) => nameEntry.language.name === 'fr')?.name || chain.species.name));
                        chain = chain.evolves_to[0];
                    }
                    return Promise.all(promises);
                };

                const evolutionNames = await getFrenchEvolutionNames(evolutionData.chain);
                setEvolutions(evolutionNames);

            } catch (e) {
                setEvolutions([]);
            }

            const checkImageExists = async (url: string): Promise<boolean> => {
                try {
                    const response = await fetch(url, {method: 'HEAD'});
                    return response.ok;
                } catch {
                    return false;
                }
            };

            const femaleImageExists = await checkImageExists(femaleImageUri);
            setFemaleImageExists(femaleImageExists);

            const carouselImagesData = [
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonData.id}.svg`,
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`,
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonData.id}.png`
            ];

            const getAvailableImages = async (urls: string[]): Promise<string[]> => {
                const checks = urls.map(url => fetch(url).then(res => res.ok ? url : null));
                const results = await Promise.all(checks);
                return results.filter(Boolean) as string[];
            };

            const availableImages = await getAvailableImages(carouselImagesData);
            setCarouselImages(availableImages.map((url, index) => ({
                image: url,
                label: index === 0 ? 'Pokémon du monde des rêves' : index === 1 ? 'Pokémon Original' : 'Pokémon Shiny'
            })));

        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [id, femaleImageUri]);

    useEffect(() => {
        if (id) fetchPokemonData();
    }, [id, fetchPokemonData]);

    return {
        pokemon,
        svgData,
        carouselImages,
        frenchName,
        description,
        evolutions,
        loading,
        error,
        femaleImageExists,
        maleImageUri,
        femaleImageUri
    };
};

export default useFetchPokemonData;
