/** @format */
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyA_l3TOLWk6lD9i6t8zT4oLhCi4C7IjoQY',
	authDomain: 'inkmark-d4044.firebaseapp.com',
	databaseURL: 'https://inkmark-d4044.firebaseio.com',
	projectId: 'inkmark-d4044',
	storageBucket: 'inkmark-d4044.appspot.com',
	messagingSenderId: '911522641682',
	appId: '1:911522641682:web:04edfa4e565adc5a9465cb',
	measurementId: 'G-G140ZDPQZ3'
};

firebase.initializeApp(firebaseConfig);
export const { auth } = firebase;
