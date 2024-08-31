import { useCallback } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { PanGestureHandlerGestureEvent, PanGestureHandlerStateChangeEvent, State  } from 'react-native-gesture-handler';

export default function useGestureHandler(id: string, navigation: StackNavigationProp<any>) {
    const translateX = useSharedValue(0);
    const scale = useSharedValue(1);

    const handleGestureEvent = useCallback((event: PanGestureHandlerGestureEvent) => {
        translateX.value = event.nativeEvent.translationX;
    }, [translateX]);

    const handleStateChange = useCallback((event: PanGestureHandlerStateChangeEvent) => {
        const { state } = event.nativeEvent;

        if (state === State.END) {
            const nextId = (parseInt(id) + 1).toString();
            const previousId = (parseInt(id) - 1).toString();

            if (translateX.value < -50 && parseInt(nextId) <= 1000) {
                navigation.replace('pokemon/[id]', { id: nextId });
            } else if (translateX.value > 50 && parseInt(previousId) >= 1) {
                navigation.replace('pokemon/[id]', { id: previousId });
            }

            translateX.value = withSpring(0, { damping: 2, stiffness: 100 });
            scale.value = withSpring(1, { damping: 2, stiffness: 100 });
        } else {
            translateX.value = withSpring(0, { damping: 2, stiffness: 100 });
            scale.value = withSpring(1, { damping: 2, stiffness: 100 });
        }
    }, [id, navigation, translateX, scale]);

    return { handleGestureEvent, handleStateChange, translateX, scale };
}

