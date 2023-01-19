import { SafeAreaView, Text, View, StyleSheet, FlatList, Dimensions } from "react-native";
import COLORS from "../../consts/colors";
import React, { useState, useEffect } from "react";
import { HotelCard, HomeHeader } from "../../components";
import { Loader } from "../../components/Loader";
import { api } from "../../services/api";
import { Appearance } from "react-native";

export default function HotelsScreen() {
    const [isLoadingDone, setLoadingDone] = useState(false);
    const [data, setData] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [color, setColor] = useState('light');
    useEffect(() => {
        Appearance.addChangeListener(({ colorScheme }) => { setColor(colorScheme) });
    })

    async function getData() {
        try {
            const response = await api.get('hotels').then(r => r.data);
            setData(response)
            setHotels(response)
        } catch (err) {
            console.log("Err: " + err)
        } finally {
            setTimeout(() => {
                setLoadingDone(true);
            }, 500);
        }
    }

    const handleSearch = (value) => {
        if (value.length === 0) {
            setHotels(data);
        }
        const filteredData = data.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        if (filteredData.length === 0) {
            setHotels("")
        } else {
            setHotels(filteredData);
        }
    };

    function callReturn() {
        return (
            <View style={{
                backgroundColor: COLORS.white,
                height: Dimensions.get('screen').height / 1.5,
                width: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                padding: 20
            }}>
                <Text style={{textAlign: 'center', fontSize: 20, color: COLORS.primary, fontWeight: 'bold'}}>We're sorry :c</Text>
                <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: COLORS.dark}}>Hotel not found with the specified name.</Text>
            </View>
        )
    }

    useEffect(() => {
        getData();
    }, [])

    if (!isLoadingDone) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                <Loader size="large" />
            </View>
        )
    } else {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: color === 'dark' ? COLORS.darkgrey : COLORS.white }}>
                <View style={{ zIndex: 0 }}>
                    <FlatList
                        data={hotels}
                        renderItem={({ item }) => <HotelCard data={item} />}
                        keyExtractor={(item) => item._id}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={<HomeHeader color={color} onSearch={handleSearch} />} />
                </View>
                {
                    hotels == "" ? callReturn() : null
                }
            </SafeAreaView>
        )
    }
}

const style = StyleSheet.create({
    header: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    searchInputContainer: {
        height: 50,
        backgroundColor: COLORS.light,
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 30,
    },
    categoryListText: {
        fontWeight: 'bold',
    },
    cardImage: {
        height: 200,
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    priceTag: {
        height: 60,
        width: 80,
        backgroundColor: COLORS.primary,
        position: 'absolute',
        zIndex: 1,
        right: 0,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardDetails: {
        height: 100,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        position: 'absolute',
        bottom: 0,
        padding: 20,
        width: '100%',
    },
    topHotelCard: {
        height: 120,
        width: 120,
        backgroundColor: COLORS.white,
        elevation: 15,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    topHotelCardImage: {
        height: 80,
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
});