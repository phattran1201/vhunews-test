// import React from 'react';
import { StackNavigator } from 'react-navigation';
import GetLink from '../screens/GetLink';
import ThongBao from '../screens/ThongBao';

export default  StackNavigator(
	{
		ThongBao: { screen: ThongBao },
		GetLink: { screen: GetLink },
	},
	{
		initialRouteName: 'ThongBao',
		headerMode: 'screen',
	}
);
