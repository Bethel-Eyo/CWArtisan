import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from '../auth/Login';
import ResetPassword from '../auth/ResetPassword';

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    ResetPass: ResetPassword,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
