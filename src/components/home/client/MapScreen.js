import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import Apis, { authApis, endpoints } from '../../../config/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const home = {
    latitude: 10.675319,
    longitude: 106.690484,
    title: 'Ký túc xá YUH',
};

const destination = {
    latitude: 10.675476,
    longitude: 106.690346,
    title: 'Bãi gửi xe ký túc xá YUH',
};

const MapScreen = () => {
    const [origin, setOrigin] = useState(null);
    const [routeCoords, setRouteCoords] = useState([]);
    const mapRef = useRef(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Không có quyền truy cập vị trí');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log("User location:", location.coords);
            setOrigin(location.coords);
            fetchRoute(location.coords, destination);

            if (location?.coords && mapRef.current) {
                mapRef.current.animateToRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }, 1000);
            }
        })();
    }, []);

    const fetchRoute = async (start, end) => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            const url = `${endpoints['map']}?origin_lat=${start.latitude}&origin_lng=${start.longitude}&dest_lat=${end.latitude}&dest_lng=${end.longitude}`;

            const res = await authApis(token).get(url);

            if (res.status === 200 && res.data?.overview_polyline) {
                setRouteCoords(res.data.overview_polyline);
            } else {
                console.warn("Error fetching route:", res.data?.error || "Unknown error");
            }
        } catch (error) {
            console.error("Axios error fetching route:", error.message || error);
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: destination.latitude,
                    longitude: destination.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                {origin && (
                    <Marker coordinate={origin} title="Bạn đang ở đây" pinColor="blue" />
                )}

                <Marker coordinate={destination} title={destination.title} />
                <Marker coordinate={home} title={home.title} />

                {routeCoords.length > 0 && (
                    <Polyline coordinates={routeCoords} strokeWidth={5} strokeColor="blue" />
                )}
            </MapView>
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})