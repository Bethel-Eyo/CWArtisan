import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import OngoingJobs from '../screens/OngoingJobs';
import CompletedJobs from '../screens/CompletedJobs';
import JSTScreen from '../screens/JSTScreen';
import JobDoneScreen from '../screens/JobDoneScreen';

const activeColor = '#C85A23';
const inActiveColor = '#b8bece';

const JobStack = createStackNavigator(
  {
    Home: OngoingJobs,
    JT: JSTScreen,
    Suc: JobDoneScreen,
  },
  {
    headerMode: 'none',
  },
);

JobStack.navigationOptions = ({navigation}) => {
  var tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;
  if (routeName == 'JT' || routeName == 'Suc') {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarLabel: 'Ongoing Jobs',
    tabBarIcon: ({focused}) => (
      <Icon
        name="ios-easel"
        size={26}
        color={focused ? activeColor : inActiveColor}
      />
    ),
  };
};

const HeaderTabs = createMaterialTopTabNavigator(
  {
    Ongoing: JobStack,
    Completed: CompletedJobs,
  },
  {
    initialRouteName: 'Ongoing',
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      labelStyle: {
        fontSize: 15,
        color: '#C85A23',
      },
      indicatorStyle: {
        backgroundColor: '#C85A23',
      },
      style: {
        backgroundColor: '#ffffff',
      },
    },
  },
);

const JobsNavigator = createStackNavigator(
  {
    Home: {
      screen: HeaderTabs,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default JobsNavigator;
