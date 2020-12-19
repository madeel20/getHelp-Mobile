import React, { useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { UserRoles } from "../utils/Constants";
import { HelperUserRoutes, NormalUserRoutes } from "../screens/Routes";
import { MappedElement } from "../utils/helpers";
import { auth, database } from "../firebase";
import CheckForThumbUpRequest from "../components/CheckForThumbUpRequest";
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../components/Drawer'
import Home from "../screens/HelperUser/Home";
import Header from "../components/Header";
import { View } from "react-native";
const Drawer = createDrawerNavigator();

const HelperUserStack = () => {
	const intervaObj = useRef();
	useEffect(() => {
		intervaObj.current = setInterval(() => updateLastActive(),
			20000);
		return () => {
			clearInterval(intervaObj.current);
		};
	}, []);
	const updateLastActive = () => {
		database()
			.ref("helpers").child(auth().currentUser.uid)
			.update({ lastActive: new Date().toUTCString() })
	}
	const renderDrawerScreens=()=>{
		return HelperUserRoutes.map(obj=>{
			return <Drawer.Screen name={obj.title} component={obj.component} key={obj.title} />
		})
	}
	return (
		<Drawer.Navigator
			drawerContent={(props) => <DrawerContent {...props} />}>
					{renderDrawerScreens()}
		</Drawer.Navigator>
	);
};
const UserStack = () => {
	return (
		<>
			{/* <PersistentDrawerLeft routes={NormalUserRoutes}/>
			<div className="layout">
				<Switch>
					<MappedElement data={NormalUserRoutes} renderElement={(obj, index )=>{
						return	<Route key={obj.route} path={obj.route} component={obj.component} exact={obj.exact}>
						</Route>;
					}} />
				</Switch>
			</div> */}
		</>
	);
};
const MainStack = () => {
	const stateProps = useSelector(({ User }) => {
		return { ...User };
	});
	const { data } = stateProps;
	return (
		<>
			<CheckForThumbUpRequest />
			{data.role === UserRoles.NORMAL_USER ?
				<UserStack /> :
				<HelperUserStack />
			}
		</>
	);
};

export default MainStack;
