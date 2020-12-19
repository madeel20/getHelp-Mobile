import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Title, Caption, Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
export function DrawerContent(props) {
  const stateProps = useSelector(({User}) => {
    return {
      ...User,
    };
  });
  const {fullname, phoneNumber, image} = stateProps;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        overflow: 'hidden',
      }}>
      <View style={{justifyContent: 'center', alignContent: 'center'}}>
        <Image style={styles.image} source={{uri: image}} />
        <View style={styles.info}>
          <Title style={styles.title}>{fullname}</Title>
          <Caption style={styles.caption}>{phoneNumber}</Caption>
        </View>
      </View>
      <DrawerContentScrollView
        {...props}
        style={{flex: 1, marginTop: -20, bottom: 0}}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({size}) => (
                <Icon name="home-outline" color="#B41116" size={size} />
              )}
              label="Home"
              labelStyle={styles.labelstyle}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({size}) => (
                <Icon name="notebook-outline" color="#B41116" size={size} />
              )}
              label="Menus"
              labelStyle={styles.labelstyle}
              onPress={() => {
                props.navigation.navigate('Menu');
              }}
            />
            <DrawerItem
              icon={({size}) => (
                <Icon1 name="fast-food-outline" color="#B41116" size={size} />
              )}
              labelStyle={styles.labelstyle}
              label="Orders"
              onPress={() => {
                props.navigation.navigate('Orders');
              }}
            />
            <DrawerItem
              icon={({size}) => (
                <Icon name="notebook-outline" color="#B41116" size={size} />
              )}
              label="Plans"
              labelStyle={styles.labelstyle}
              onPress={() => {
                props.navigation.navigate('Plan');
              }}
            />
            <DrawerItem
              icon={({size}) => (
                <Icon1 name="card-outline" color="#B41116" size={size} />
              )}
              label="Payments"
              labelStyle={styles.labelstyle}
              onPress={() => {
                props.navigation.navigate('Payment');
              }}
            />
          </Drawer.Section>
          <DrawerItem
            icon={({size}) => (
              <Icon1 name="star-outline" color="#B41116" size={size} />
            )}
            label="Reviews"
            labelStyle={styles.labelstyle}
            onPress={() => {
              props.navigation.navigate('Reviews');
            }}
          />
          <DrawerItem
            icon={({size}) => (
              <Icon1
                name="chatbox-ellipses-outline"
                color="#B41116"
                size={size}
              />
            )}
            labelStyle={styles.labelstyle}
            label="Support"
            onPress={() => {
              props.navigation.navigate('Support');
            }}
          />
          <DrawerItem
            icon={({size}) => (
              <Icon1 name="settings-outline" color="#B41116" size={size} />
            )}
            label="Settings"
            labelStyle={styles.labelstyle}
            onPress={() => {
              props.navigation.navigate('Settings');
            }}
          />
          <DrawerItem
            labelStyle={styles.labelstyle}
            icon={({size}) => (
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
    flex: 1,
  },
  userInfoSection: {
    // paddingLeft: 20,
  },
  image: {
    height: 140,
    opacity: 0.8,
    paddingTop: -3,
  },
  info: {
    marginLeft: 15,
    flexDirection: 'column',
    position: 'absolute',
    alignSelf: 'center',
   justifyContent:'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    width:'100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    // marginTop: 3,
    fontFamily: 'Montserrat-Bold',
    lineHeight: 22,
    color: 'white',
    alignSelf: 'center',
  },
  caption: {
    fontSize: 18,
    lineHeight: 18,
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    alignSelf: 'center',
  },
  labelstyle: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
});
