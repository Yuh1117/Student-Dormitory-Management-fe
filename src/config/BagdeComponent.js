import { Badge } from "react-native-paper";
import { useCallback, useEffect, useState } from "react";
import useFetchWithToken from '../config/UseFetchWithToken';
import { useFocusEffect } from "@react-navigation/native";

const CountBadge = ({ count}) => {
    // const [count, setCount] = useState(0);
    // const { fetchWithToken } = useFetchWithToken();

    // const loadData = async () => {
    //     try {
    //         const data = await fetchWithToken({ url });
    //         if (data?.results) {
    //             setCount(data.results.length);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };
    // useEffect(() => {
    //     loadData();
    // }, [])
    // useFocusEffect(
    //     useCallback(() => {
    //         loadData()
    //     }, [])
    // );

    if (count === 0 ) return null;
    return (
        <Badge style={{ position: 'absolute', top: -8, right: -8 }}>
            {count }
        </Badge>
    );
};

export default CountBadge;
