import React from 'react';
import {
	View, 
	Text,
	StyleSheet,
	ActivityIndicator
} from 'react-native';
import Colors from '../../constants/Colors';


const LoadingSpinner = props => {
	return (
		<View style={styles.spinnerContainer}>
			<ActivityIndicator color={Colors.accentColor} />
		</View>
	)
};

const styles = StyleSheet.create({
	spinnerContainer: {
		position: 'absolute',
		zIndex: 100,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
	}
});

export default LoadingSpinner;