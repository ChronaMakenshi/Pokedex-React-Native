import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {useNavigation} from '@react-navigation/native';
interface NavBarProps {
    setSearchQuery: (query: string) => void;
    filterByType: (type: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ setSearchQuery, filterByType }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [isInputVisible, setIsInputVisible] = useState(false);
    const navigations = useNavigation();

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const openExternalLink = (url) => {
        if (url && Linking.canOpenURL(url)) {
            Linking.openURL(url);
        } else {
            console.warn('Invalid URL:', url);
        }
        toggleModal();
    };

    return (
        <View style={styles.navBar}>
            <View style={styles.colorContainer}>
                <View style={styles.colorSection1} />
                <View style={styles.colorSection2} />
                <View style={styles.colorSection3} />
                <View style={styles.colorSection4} />
            </View>
            {isInputVisible && (
                <TextInput
                    style={[styles.input, isInputVisible ? styles.visible : styles.hidden]}
                    placeholder="Entrez le nom ou l'ID du Pokémon"
                    placeholderTextColor="#333"
                    onChangeText={(text: string) => setSearchQuery(text)}
                />
            )}
            <TouchableOpacity style={styles.burgerMenu} onPress={toggleModal}>
                <View style={styles.burgerBar} />
                <View style={styles.burgerBar} />
                <View style={styles.burgerBar} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}  onPress={() => setIsInputVisible(!isInputVisible)}>
                <Image source={require('@/assets/images/search.png')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainers}   onPress={() =>
                navigations.reset({
                    index: 0,
                    routes: [{ name: 'index' }],
                })
            }>
                <Image source={require('@/assets/images/Poké_Ball_icon.png')} style={styles.icon} />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
            >
                <View>
                    <View style={styles.modalView}>
                        <TouchableOpacity accessible={true}>
                            <Text style={styles.modalText}>Types</Text>
                            <View style={styles.containerTypes}>
                                <View style={styles.column}>
                                    <TouchableOpacity onPress={() => filterByType('fire')}>
                                        <Image source={require('@/assets/images/types/Feu.png')} style={styles.icontypes} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => filterByType('water')}>
                                        <Image source={require('@/assets/images/types/Eau.png')} style={styles.icontypes} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => filterByType('steel')}>
                                        <Image source={require('@/assets/images/types/Acier.png')} style={styles.icontypes} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => filterByType('fighting')}>
                                        <Image source={require('@/assets/images/types/Combat.png')} style={styles.icontypes} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => filterByType('dragon')}>
                                        <Image source={require('@/assets/images/types/Dragon.png')} style={styles.icontypes} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => filterByType('fairy')}>
                                        <Image source={require('@/assets/images/types/Fée.png')} style={styles.icontypes} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => filterByType('ice')}>
                                        <Image source={require('@/assets/images/types/Glace.png')} style={styles.icontypes} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.column}>
                                    <TouchableOpacity onPress={() => filterByType('bug')}>
                                        <Image source={require('@/assets/images/types/Insecte.png')} style={styles.icontypes} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => filterByType('normal')}>
                                        <Image source={require('@/assets/images/types/Normal.png')} style={styles.icontypes} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => filterByType('grass')}>
                                        <Image source={require('@/assets/images/types/Plante.png')} style={styles.icontypes} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => filterByType('poison')}>
                                        <Image source={require('@/assets/images/types/Poison.png')} style={styles.icontypes} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => filterByType('psychic')}>
                                        <Image source={require('@/assets/images/types/Psy.png')} style={styles.icontypes} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => filterByType('rock')}>
                                        <Image source={require('@/assets/images/types/Roche.png')} style={styles.icontypes} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => filterByType('ground')}>
                                        <Image source={require('@/assets/images/types/Sol.png')} style={styles.icontypes} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => filterByType('electric')}>
                                        <Image source={require('@/assets/images/types/Électrik.png')} style={styles.icontypes} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleModal}>
                            <Text style={styles.closeButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    navBar: {
        height: 100,
    },
    colorContainer: {
        flexDirection: 'column',
        height: '100%',
    },
    colorSection1: {
        flex: 3,
        backgroundColor: '#DB7578',
    },
    colorSection2: {
        flex: 0.1,
        backgroundColor: '#C3888C',
    },
    colorSection3: {
        flex: 3,
        backgroundColor: '#6FE9F3',
    },
    colorSection4: {
        flex: 0.8,
        backgroundColor: '#279494',
    },
    burgerMenu: {
        position: 'absolute',
        left: 30,
        top: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    burgerBar: {
        width: 30,
        height: 5,
        backgroundColor: 'white',
        marginVertical: 5,
        borderRadius: 50,
    },
    iconContainer: {
        position: 'absolute',
        right: 88,
        top: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainers: {
        position: 'absolute',
        right: 20,
        top: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 48,
        height: 48,
    },
    modalView: {
        width: 250,
        backgroundColor: 'transparent',
        paddingTop: 50,
        margin: 'auto',
    },
    modalText: {
        color: '#f5f5f5',
        fontWeight: 'bold',
        backgroundColor: '#090909',
        borderRadius: 10,
        height: 20,
        width: 240,
        marginBottom: 15,
        textAlign: 'center',
    },
    closeButton: {
        color: '#f5f5f5',
        fontWeight: 'bold',
        backgroundColor: '#2980EF',
        borderRadius: 10,
        width: 240,
        height: 20,
        textAlign: 'center',
        marginTop: 10,
    },
    containerTypes:{
        flexDirection: 'row-reverse',
        justifyContent: 'center',
    },
    column: {
        flex: 1,
        marginHorizontal: 5,
    },
    input: {
        position: 'absolute',
        left: '17.5%',
        top: 25,
        width: '48%',
        height: 40,
        borderColor: '#f6f6f6',
        borderWidth: 2,
        borderRadius: 5,
        fontSize: 12,
        paddingHorizontal: 10,
        color: '#000',
    },
    visible: {
        opacity: 1,
        height: 'auto',
    },
    hidden: {
        opacity: 0,
        height: 0,
        overflow: 'hidden',
    },
    icontypes: {
        width: 100,
        height: 20,
        marginBottom: 10,
    },
});

export default NavBar;


