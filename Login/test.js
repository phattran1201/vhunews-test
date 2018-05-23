/*
Mr Nguyen Duc Hoang
https://www.youtube.com/c/nguyenduchoang
Email: sunlight4d@gmail.com
An example of firebaseApp
*/
import React, { Component } from 'react';
import { Platform, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button';
import firebaseApp from 'react-native-firebase';

export default class LoginComponent extends Component {
	constructor(props) {
		super(props);
		this.unsubscriber = null;
		this.state = {
			isAuthenticated: false,
			email: '',
			password: '',
			user: null,
		};
	}
	componentDidMount() {
		this.unsubscriber = firebaseApp.auth().onAuthStateChanged(changedUser => {
			console.log(`changed User : ${JSON.stringify(changedUser.toJSON())}`);
			this.setState({ user: changedUser });
		});
	}
	componentWillUnmount() {
		if (this.unsubscriber) {
			this.unsubscriber();
		}
	}
	onAnonymousLogin = () => {
		firebaseApp
			.auth()
			.signInAnonymously()
			.then(() => {
				console.log('Login successfully');
				this.setState({
					isAuthenticated: true,
				});
			})
			.catch(error => {
				console.log(`Login failed. Error = ${error}`);
			});
	};
	onRegister = () => {
		firebaseApp
			.auth()
			.createUserWithEmailAndPassword(
				this.state.email,
				this.state.password
			)
			.then(loggedInUser => {
				this.setState({ user: loggedInUser });
				console.log(
					`Register with user : ${JSON.stringify(loggedInUser.toJSON())}`
				);
			})
			.catch(error => {
				console.log(`Register fail with error: ${error}`);
			});
	};
	onLogin = () => {
		firebaseApp
			.auth()
			.signInWithEmailAndPassword(
				this.state.email,
				this.state.password
			)
			.then(loggedInUser => {
				console.log(
					`Login with user : ${JSON.stringify(loggedInUser.toJSON())}`
				);
			})
			.catch(error => {
				console.log(`Login fail with error: ${error}`);
			});
	};
	render() {
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					backgroundColor: 'white',
					borderRadius: Platform.OS === 'ios' ? 30 : 0,
				}}
			>
				<Text
					style={{
						fontSize: 20,
						fontWeight: 'bold',
						textAlign: 'center',
						margin: 40,
					}}
				>
					Login with firebaseApp{' '}
				</Text>
				<Button
					containerStyle={{
						padding: 10,
						borderRadius: 4,
						backgroundColor: 'rgb(226,161,184)',
					}}
					style={{ fontSize: 18, color: 'white' }}
					onPress={this.onAnonymousLogin}
				>
					Login anonymous
				</Button>
				<Text style={{ margin: 20, fontSize: 15 }}>
					{this.state.isAuthenticated == true ? 'Logged in anonymous' : ''}
				</Text>
				<TextInput
					style={{
						height: 40,
						width: 200,
						margin: 10,
						padding: 10,
						borderColor: 'gray',
						borderWidth: 1,
						color: 'black',
					}}
					keyboardType="email-address"
					placeholder="Enter your email"
					autoCapitalize="none"
					onChangeText={text => {
						this.setState({ email: text });
					}}
				/>
				<TextInput
					style={{
						height: 40,
						width: 200,
						margin: 10,
						padding: 10,
						borderColor: 'gray',
						borderWidth: 1,
						color: 'black',
					}}
					keyboardType="default"
					placeholder="Enter your password"
					secureTextEntry={true}
					onChangeText={text => {
						this.setState({ password: text });
					}}
				/>
				<View style={{ flexDirection: 'row' }}>
					<Button
						containerStyle={{
							padding: 10,
							borderRadius: 4,
							margin: 10,
							backgroundColor: 'green',
						}}
						style={{ fontSize: 17, color: 'white' }}
						onPress={this.onRegister}
					>
						Register
					</Button>
					<Button
						containerStyle={{
							padding: 10,
							margin: 10,
							borderRadius: 4,
							backgroundColor: 'blue',
						}}
						style={{ fontSize: 17, color: 'white' }}
						onPress={this.onLogin}
					>
						Login
					</Button>
				</View>
			</View>
		);
	}
}
