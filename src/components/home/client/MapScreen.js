import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

import {
    REACT_APP_GOOGLE_MAPS_APIKEY
} from '@env';

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

const GOOGLE_MAPS_APIKEY = REACT_APP_GOOGLE_MAPS_APIKEY;

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
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}&key=${GOOGLE_MAPS_APIKEY}&mode=driving`;

        const res = await fetch(url);
        const json = await res.json();

        if (json.status === 'OK' && json.routes.length) {
            const points = decodePolyline(json.routes[0].overview_polyline.points);
            setRouteCoords(points);
        } else {
            console.warn("Google Maps API error:", json.status);
        }
    };

    const decodePolyline = (t) => {
        let points = [];
        let index = 0,
            len = t.length;
        let lat = 0,
            lng = 0;

        while (index < len) {
            let b, shift = 0, result = 0;
            do {
                b = t.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
            lat += dlat;

            shift = 0;
            result = 0;
            do {
                b = t.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
            lng += dlng;

            points.push({
                latitude: lat / 1e5,
                longitude: lng / 1e5,
            });
        }

        return points;
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