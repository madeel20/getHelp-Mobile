import React, { useState,useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Title, Caption, Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import { useSelector,useDispatch } from 'react-redux';
import theme from '../theme';
import { database } from '../firebase';
import { getHelpGig } from '../Store/Actions/UsersActions';
import { helpGigStatus, UserRoles } from '../utils/Constants';
function DrawerContent(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const stateProps = useSelector(({ User }) => {
    return {
      ...User,
    };
  });
  const {helpGig,data} = stateProps;
  const { fullName, grade, meetLink } = data;
  useEffect(()=>{
		database().ref("helpGigs").child(auth().currentUser.uid)
			.on("value", (snapshot) => {
				dispatch(getHelpGig(snapshot.val()));
			});
	},[]);
	useEffect(()=> {
		if(helpGig && helpGig.status === helpGigStatus.ACTIVE){
      navigation.navigate('Get Help')
			// history.push(data.role === UserRoles.NORMAL_USER?"/":"/get-help");
		}
	},[helpGig]);
 
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: 100
      }}>
        <View style={styles.info}>
          <Title style={styles.title}>{fullName}</Title>
          <Caption style={styles.caption}>Grade: {grade}</Caption>
          <Caption onPress={() => {
            Linking.openURL(helperUser.meetLink)
              .catch(err => {
                console.error("Failed opening page because: ", err)
                alert('Meeting link is invalid!')
              })
          }} style={styles.link}>{meetLink}</Caption>
        </View>
      <DrawerContentScrollView
        {...props}
        >
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ size }) => (
                <Icon name="home-outline" color="#B41116" size={size} />
              )}
              label="Home"
              labelStyle={styles.labelstyle}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({ size }) => (
                <Icon1 name="settings-outline" color="#B41116" size={size} />
              )}
              label="Edit Meeting Link"
              labelStyle={styles.labelstyle}
              onPress={() => {
                props.navigation.navigate('Edit Meeting Link');
              }}
            />
            <DrawerItem
              icon={({ size }) => (
                <Icon name="near-me" color="#B41116" size={size} />
              )}
              label="Get Help"
              labelStyle={styles.labelstyle}
              onPress={() => {
                props.navigation.navigate('Get Help');
              }}
            />
            <DrawerItem
              icon={({ size }) => (
                <Icon1 name="settings-outline" color="#B41116" size={size} />
              )}
              label="Edit Subjects"
              labelStyle={styles.labelstyle}
              onPress={() => {
                props.navigation.navigate('Edit Subjects');
              }}
            />
          </Drawer.Section>
          <DrawerItem
            icon={({ size }) => (
              <Icon1 name="star-outline" color="#B41116" size={size} />
            )}
            label="Helper Records"
            labelStyle={styles.labelstyle}
            onPress={() => {
              props.navigation.navigate('Helper Records');
            }}
          />
           <DrawerItem
              icon={({ size }) => (
                <Icon1 name="settings-outline" color="#B41116" size={size} />
              )}
              label="Edit Profile"
              labelStyle={styles.labelstyle}
              onPress={() => {
                props.navigation.navigate('Edit Profile');
              }}
            />
          <DrawerItem
            labelStyle={styles.labelstyle}
            icon={({ size }) => (
              <Icon name="logout-variant" color="#B41116" size={size} />
            )}
            label="Sign Out"
            onPress={() => {
              auth().signOut();
            }}
          />
        </View>
      </DrawerContentScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    // flex: 1,
  },
  userInfoSection: {
    // paddingLeft: 20,
  },
  // image: {
  //   height: 140,
  //   opacity: 0.8,
  //   paddingTop: -3,
  // },
  info: {
    display:'flex',
    alignItems:'center',
    marginTop:20
  },
  title: {
    fontSize: theme.h1FontSize,
    // marginTop: 3,
    fontFamily: 'Montserrat-Bold',
    // lineHeight: 22,
    color: 'black',
    alignSelf: 'center',
  },
  caption: {
    fontSize: 18,
    lineHeight: 18,
    fontFamily: 'Montserrat-Bold',
    color: 'black',
    marginVertical: 10,
    alignSelf: 'center',
  },
  link: {
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'Montserrat-Bold',
    color: 'grey',
    alignSelf: 'center',
  },
  labelstyle: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default DrawerContent