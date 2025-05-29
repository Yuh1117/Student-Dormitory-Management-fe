

import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFetchWithToken from '../../../../config/UseFetchWithToken';
import { endpoints } from '../../../../config/Apis';
import { Surface, Text } from 'react-native-paper';
import AdminStyles from '../../../../styles/AdminStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Statistics = () => {
  const [statistics, setStatistics] = useState(null);
  const { fetchWithToken, loading } = useFetchWithToken();
  const [detail, setDetail] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [buildingDetail, setBuildingDetail] = useState([]);

  const loadStatistics = async () => {
    try {
      const data = await fetchWithToken({ url: endpoints['/statistics-sumamary/'] });
      if (data) {
        setStatistics(data);
      }
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  };

  const loadDetail = async () => {
    try {
      const data = await fetchWithToken({ url: endpoints['/statistics-detail/'] });
      if (data) {
        setBuildingDetail(data.building_detail);
      }
    } catch (error) {
      console.error('Error loading building detail:', error);
    }
  };

  useEffect(() => {
    loadStatistics();
  }, []);

  useEffect(() => {
    if (detail) {
      loadDetail();
    }
  }, [detail]);

  const handleShowDetail = () => {
    if (!detail) setDetail(true);
    setShowDetail(prev => !prev);
  };

 const StatisticsCard = ({ text, icon,icon_size=40 }) => {
    return (
      <View style={[AdminStyles.row, AdminStyles.mb]}>
        <Surface style={[styles.surface, AdminStyles.flex_1,AdminStyles.roomBgColor]} elevation={1}>
          <View style={[AdminStyles.flex_1, AdminStyles.row, AdminStyles.center]}>

            <View style={[AdminStyles.flex_025, AdminStyles.row ,AdminStyles.center]}>

              <MaterialCommunityIcons name={icon} size={icon_size} />
            </View>
            <View style={[AdminStyles.flex_075, AdminStyles.row ]}>
              {loading?<ActivityIndicator/>: <Text>{text}</Text>}
            </View>
          </View>
        </Surface>

      </View>
    )
  }


  const BuildingDetailCard = ({ item, icon }) => (
    <Surface style={styles.detailCard} elevation={1}>
      <View style={styles.detailHeader}>
        <MaterialCommunityIcons name={icon} size={32} style={styles.icon} />
        <Text style={styles.cardTitle}>{item.building_name}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Tổng số phòng:</Text>
        <Text>{item.total_rooms}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Tổng số sinh viên:</Text>
        <Text>{item.total_students}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Số phòng còn trống:</Text>
        <Text>{item.room_still_empty}</Text>
      </View>
    </Surface>
  );

  return (
    <SafeAreaView style={[AdminStyles.container, { flex: 1 }]}>
      <StatisticsCard text={`Số lượng tòa: ${statistics?.total_buildings || '0'}`} icon="office-building" />
      <StatisticsCard text={`Số lượng phòng: ${statistics?.total_rooms || '0'}`} icon="door" />
      <StatisticsCard text={`Số lượng sinh viên: ${statistics?.total_students || '0'}`} icon="tooltip-account" />

      <TouchableOpacity style={styles.detailButton} onPress={handleShowDetail}>
        <Text style={styles.detailButtonText}>
          {showDetail ? 'Ẩn chi tiết' : 'Xem chi tiết'}
        </Text>
      </TouchableOpacity>

      {showDetail && (
        loading ? <ActivityIndicator style={{ marginTop: 20 }} /> :
        <FlatList
          data={buildingDetail}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <BuildingDetailCard item={item} icon="home" />}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
     backgroundColor: '#f5f5f5',
  },
  card: {
    padding: 16,
    marginHorizontal: 10,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    // flex:1,
    // flexDirection:"row"
  },
  icon: {
    marginRight: 16,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
  },
  detailCard: {
    padding: 16,
    margin: 10,
    borderRadius: 16,
    backgroundColor: '#BEE4D0',
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: '500',
  },
  detailButton: {
    alignSelf: 'center',
    marginVertical: 8,
    backgroundColor: '#fff',
    // backgroundColor: '#2196F3',
    shadowColor:"#3E3F5B",
    shadowOffset:2,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
  },
  detailButtonText: {
    color: 'black',
    fontWeight: '600',
  },
});
