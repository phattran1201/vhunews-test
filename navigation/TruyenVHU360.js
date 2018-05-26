// import React from 'react';
import { StackNavigator } from 'react-navigation';
import VHU360 from '../screens/VHU360';
import GetLink from '../screens/GetLink';

export default  StackNavigator(
	{
		VHU360: { screen: VHU360 },
		GetLink: { screen: GetLink },

	},
	{
		initialRouteName: 'VHU360',
		headerMode: 'screen'
	}
);
