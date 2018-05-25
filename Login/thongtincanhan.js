import { Button, Container, Content, Footer, Icon, ListItem, Separator, Text } from 'native-base';
import React from 'react';
import { Image, ListView, Platform, focused } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { firebaseApp } from './firebaseConfig';

export default class ThongTinCaNhan extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2,
			}),
		};
	}
	static navigationOptions = ({ navigation }) => ({
		headerLeft: (
			<Icon
				name={
					Platform.OS === 'ios'
						? `ios-menu${focused ? '' : '-outline'}`
						: 'md-menu'
				}
				style={{ paddingLeft: 20, color: '#fff' }}
				onPress={() => navigation.navigate('DrawerOpen')}
			/>
		),
		title: 'Thông tin cá nhân',
		headerRight: (
			<Icon
				onPress={() => navigation.navigate({ routeName: 'HoiDap' })}
				name={
					Platform.OS === 'ios'
						? `ios-add-circle${focused ? '' : '-outline'}`
						: 'md-add-circle'
				}
				style={{ paddingRight: 20, color: '#fff' }}
			/>
		),
		headerTitleStyle: {
			textAlign: 'center',
			flex: 1,
			fontWeight: 'bold',
			// fontStyle: 'italic',
		},
		headerStyle: {
			backgroundColor: '#0099ff',
			elevation: 0,
			shadowOpacity: 0,
		},
		headerTintColor: '#fff',
	});

	componentDidMount() {
		var items = [];
		const userId = firebaseApp.auth().currentUser.uid;
		console.log(userId);
		firebaseApp
			.database()
			.ref('SinhVien')
			.child(userId)
			.on('child_added', dataSnapshot => {
				items.push({
					name: dataSnapshot.val(),
					key: dataSnapshot.key,
				});
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(items),
				});
			});
	}
	thoat() {
		firebaseApp.auth().signOut();
		Actions.loginScreen();
	}

	render() {
		return (
			<Container style={{flex:1}}>
				<Content style={{flex:1}}>
					<Image
						source={{
							uri:
								'https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/drawer-cover.png',
						}}
						style={{
							height: 150,
							width: '100%',
							alignSelf: 'stretch',
							position: 'absolute',
						}}
					/>
					<Image
						square
						style={{
							marginTop: 24,
							height: 80,
							width: 150,
							position: 'absolute',
							alignSelf: 'center',
							top: 20,
						}}
						source={{
							uri: 'http://eoffice.vhu.edu.vn/App/assets/img/VHU_logo.png',
						}}
					/>
					<ListView  style={{ marginTop: 160}}
						dataSource={this.state.dataSource}
						renderRow={rowData => (
							<Content>
								<Separator itemDivider>		
									<Text>{rowData.key}</Text>
								</Separator>
								<ListItem>
									<Text>{rowData.name}</Text>
								</ListItem>
							</Content>
						)}
					/>
				
				</Content>
				<Footer   style={{backgroundColor:'#fff'}} >
					<Button  rounded>
						
						<Text onPress={this.thoat}>Thay đổi thông tin</Text>
					</Button>
				</Footer>
				
			</Container>
		);
	}
}
