import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from '../auth/Login';
import ResetPassword from '../auth/ResetPassword';
import HomeScreen from '../screens/HomeScreen';
import JobHistScreen from '../screens/JobHistScreen';
import JobZoneScreen from '../screens/JobZoneScreen';
import JSTScreen from '../screens/JSTScreen';

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    ResetPass: ResetPassword,
    Home: HomeScreen,
    JobHist: JobHistScreen,
    JobZone: JobZoneScreen,
    JST: JSTScreen,
  },
  {
    initialRouteName: 'Login',
    // headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
