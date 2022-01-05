import * as React from 'react';
import { StackActions } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
	if (navigationRef.isReady()) {
		// Perform navigation if the react navigation is ready to handle actions
		navigationRef.navigate(name, params);
	}
}
export function dispatch(action) {
	if (navigationRef.isReady()) {
		// Perform navigation if the react navigation is ready to handle actions
		navigationRef.dispatch(action);
	}
}
export function jumpTo(name, params) {
	if (navigationRef.isReady()) {
		// Perform navigation if the react navigation is ready to handle actions
		navigationRef.jumpTo(name, params);
	}
}
export function replace(name, params) {
	if (navigationRef.isReady()) {
		// Perform navigation if the react navigation is ready to handle actions
		navigationRef.dispatch(StackActions.replace(name, params));
	}
}
export function push(name, params) {
	if (navigationRef.isReady()) {
		// Perform navigation if the react navigation is ready to handle actions
		navigationRef.dispatch(StackActions.push(name, params));
	}
}
export function goBack() {
	if (navigationRef.isReady()) {
		// Perform navigation if the react navigation is ready to handle actions
		navigationRef.goBack();
	}
}
export const navigation = {
	navigate,
	dispatch,
	jumpTo,
	replace,
	push,
	goBack
}