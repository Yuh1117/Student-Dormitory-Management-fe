import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import StudentDetail from './StudentDetail';

const RoommateItem = ({ item }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <TouchableOpacity onPress={() => setShowDetails(!showDetails)} activeOpacity={0.8}>
            <StudentDetail
                item={item}
                showDetails={showDetails}
                toggleDetails={() => setShowDetails(!showDetails)}
            />
        </TouchableOpacity>
    );
};

export default RoommateItem;