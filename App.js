import Expo from 'expo';
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import RootNavigation from './navigation/RootNavigation';

export default class App extends React.Component {
	state = {
		isLoadingComplete: false,
	};
	async componentWillMount() {
		await Expo.Font.loadAsync({
			'Roboto': require('./assets/Font/Roboto.ttf'),
			'Roboto_medium': require('./assets/Font/Roboto_medium.ttf'),
		});
		this.setState({ isLoadingComplete: true });
	}

	render() {
		return (
			<View style={styles.container}>
				{Platform.OS === 'ios' && <StatusBar barStyle="default" />}
				<RootNavigation />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
