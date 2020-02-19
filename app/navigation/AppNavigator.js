import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from '../auth/Login';
import ResetPassword from '../auth/ResetPassword';
import HomeScreen from '../screens/HomeScreen';
import JobZoneScreen from '../screens/JobZoneScreen';
import JSTScreen from '../screens/JSTScreen';
import WalletScreen from '../screens/WalletScreen';
import JobDoneScreen from '../screens/JobDoneScreen';
import SupportScreen from '../screens/SupportScreen';
import FAQScreen from '../screens/FAQScreen';
import TransactScreen from '../screens/NewJobHistScreen';
import ChangePasScreen from '../screens/ChangePasScreen';
import SettingsScreen from '../screens/SettingsScreen';

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    ResetPass: ResetPassword,
    Home: HomeScreen,
    JobHist: TransactScreen,
    JobZone: JobZoneScreen,
    JST: JSTScreen,
    Wallet: WalletScreen,
    Done: JobDoneScreen,
    Support: SupportScreen,
    FAQ: FAQScreen,
    ChangePassword: ChangePasScreen,
    Settings: SettingsScreen,
  },
  {
    initialRouteName: 'Login',
    // headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
