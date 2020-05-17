/** @format */

import * as React from 'react';
import { View, Text, Container } from 'native-base';
import HeaderComponent from '../../../components/Header';

export interface DashboardProps {
	navigation: any;
}

const Dashboard: React.SFC<DashboardProps> = props => {
	const { navigation } = props;
	return (
		<Container style={{ backgroundColor: '#E9EEE8' }}>
			<HeaderComponent
				leftActions={{
					iconName: 'md-arrow-round-back',
					iconType: 'Ionicons',
					actions: () => navigation.navigate('HomeClie')
				}}
				background='white'
				title='Dashboard'
				rightItems={[]}
			/>
			<View style={{ marginTop: 30 }}>
				<Text style={{ textAlign: 'center', width: '100%' }} note>
					No hay datos suficientes para generar un reporte.
				</Text>
			</View>
		</Container>
	);
};

export default Dashboard;
