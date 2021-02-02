import React from 'react';
import {
	View,
	StyleSheet,
	ActivityIndicator
} from 'react-native';
import Colors from '../../constants/Colors';


const LoadingSpinner = props => {
	return (
		<View style={styles.spinnerContainer}>
			<ActivityIndicator size="small" color={Colors.primaryColor} />
		</View>
	)
};

const styles = StyleSheet.create({
	spinnerContainer: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		zIndex: 100,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
	}
});

export default LoadingSpinner;