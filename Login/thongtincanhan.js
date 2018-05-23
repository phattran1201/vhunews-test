import { Container, Content, Icon, ListItem, Separator, Text } from 'native-base';
import React from 'react';
import { ListView, Platform, focused } from 'react-native';
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
			<Container>
				<Content>
					<ListView
						dataSource={this.state.dataSource}
						renderRow={rowData => (
							<Content>
								<Separator bordered>
									<Text>{rowData.key}</Text>
								</Separator>
								<ListItem>
									<Text>{rowData.name}</Text>
								</ListItem>
							</Content>
						)}
					/>
				</Content>
				<Content>
					<Text onPress={this.thoat}>thoat</Text>
				</Content>
			</Container>
		);
	}
}
