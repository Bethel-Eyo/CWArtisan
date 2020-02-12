import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from '../auth/Login';
import ResetPassword from '../auth/ResetPassword';
import HomeScreen from '../screens/HomeScreen';
import JobHistScreen from '../screens/JobHistScreen';

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    ResetPass: ResetPassword,
    Home: HomeScreen,
    JobHist: JobHistScreen,
  },
  {
    initialRouteName: 'Login',
    // headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
