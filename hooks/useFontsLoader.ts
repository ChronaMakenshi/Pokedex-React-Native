import { useFonts } from 'expo-font';

const useFontsLoader = () => {
    const [fontsLoaded] = useFonts({
        'Pokemon-Solid': require('@/assets/fonts/Pokemon Solid.ttf'),
        'PressStart2P': require('@/assets/fonts/PressStart2P-Regular.ttf'),
    });

    return fontsLoaded;
};

export default useFontsLoader;