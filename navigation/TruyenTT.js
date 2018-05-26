// import React from 'react';
import { StackNavigator } from 'react-navigation';
import GetLink from '../screens/GetLink';
import TinTuc from '../screens/TinTuc';

export default  StackNavigator(
	{
		TinTuc: { screen: TinTuc },
		GetLink: { screen: GetLink },
	},
	{
		initialRouteName: 'TinTuc',
		headerMode: 'screen',
	}
);
