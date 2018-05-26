// import React from 'react';
import { StackNavigator } from 'react-navigation';
import GetLink from '../screens/GetLink';
import HoatDong from '../screens/HoatDong';

export default  StackNavigator(
	{
		HoatDong: { screen: HoatDong },
		GetLink: { screen: GetLink },
	},
	{
		initialRouteName: 'HoatDong',
		headerMode: 'screen',
	}
);
