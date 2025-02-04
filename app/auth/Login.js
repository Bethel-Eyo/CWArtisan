import React from 'react';
import styled from 'styled-components';
import {
  BackHandler,
  TouchableOpacity,
  Platform,
  StatusBar,
  AsyncStorage,
  Alert,
} from 'react-native';
import {FloatingTitleTextInputField} from '../components/FloatingHintInput';
import Loading from '../lotties/Loading';
import Success from '../lotties/Success';
import axios from 'axios';
import Domain from '../constants/Domain';

class Login extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    email: '',
    password: '',
    iconEmail: require('../assets/icon-email.png'),
    iconPassword: require('../assets/icon-password.png'),
    isLoading: false,
    isSuccessful: false,
    popState: true,
  };

  _updateMasterState = (attrName, value) => {
    this.setState({[attrName]: value});
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackClicked(),
    );
  }

  cwArtisanLogin = () => {
    let auth = {
      email: this.state.email,
      password: this.state.password,
    };
    this.setState({isLoading: true});
    axios
      .post(Domain + 'api/artisan-login', auth)
      .then(response => {
        this.setState({isLoading: false});
        this.setState({isSuccessful: true});
        let userToken = response.data.token;
        let userID = response.data.user.id;
        this.storeUserToken(userToken);
        this.storeUserId(userID);
        setTimeout(() => {
          setTimeout(() => {
            this.setState({isSuccessful: false});
          }, 1000);
        }, 2000);
        this.setState({popState: false});
        this.props.navigation.navigate('Home');
      })
      .catch(error => {
        this.setState({isLoading: false});
        Alert.alert('An error occured! ' + error.message);
      });
  };

  storeUserToken = async token => {
    try {
      await AsyncStorage.setItem('artisanToken', token);
    } catch (error) {
      Alert.alert(error);
    }
  };

  storeUserId = async id => {
    try {
      await AsyncStorage.setItem('userId', id);
    } catch (error) {
      Alert.alert(error);
    }
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackClicked);
  }

  handleBackClicked = () => {
    if (this.state.popState == true) {
      Alert.alert(
        'Exit App',
        'Exiting the application?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
      return true;
    }
  };

  focusEmail = () => {
    this.setState({
      iconEmail: require('../assets/icon-email-animated.gif'),
    });
  };

  handleEmailBlur = () => {
    this.setState({iconEmail: require('../assets/icon-email.png')});
  };

  handlePasswordBlur = () => {
    this.setState({iconPassword: require('../assets/icon-password.png')});
  };

  focusPassword = () => {
    this.setState({
      iconPassword: require('../assets/icon-password-animated.gif'),
    });
  };

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor="#AC5428" />
        <Img source={require('../assets/painter.jpg')}>
          <View style={{backgroundColor: 'rgba(25,0,0,0.6)'}}>
            <Logo
              source={require('../assets/cw-logo.png')}
              style={{
                ...Platform.select({
                  ios: {marginTop: 35, marginLeft: 20},
                  android: {marginTop: 10, marginLeft: 20},
                }),
              }}
            />
            <Text>Welcome to Citiworksng Artisan</Text>
          </View>
        </Img>
        <LoginContainer style={{elevation: 5}}>
          <InputView>
            <IconEmail source={this.state.iconEmail} />
            <FloatingTitleTextInputField
              attrName="email"
              title="Email"
              keyboardType="email-address"
              value={this.state.email}
              updateIconState={this.focusEmail}
              updateBlurState={this.handleEmailBlur}
              updateMasterState={this._updateMasterState}
              textInputStyles={{
                // here you can add additional TextInput styles
                color: 'green',
                fontSize: 15,
              }}
              otherTextInputProps={{
                // here you can add other TextInput props of your choice
                autoCapitalize: 'none',
              }}
            />
          </InputView>
          <InputView>
            <IconPassword source={this.state.iconPassword} />
            <FloatingTitleTextInputField
              attrName="password"
              title="Password"
              value={this.state.password}
              updateIconState={this.focusPassword}
              updateBlurState={this.handlePasswordBlur}
              updateMasterState={this._updateMasterState}
              otherTextInputProps={{
                secureTextEntry: true,
                autoCapitalize: 'none',
              }}
            />
          </InputView>
          <TouchableOpacity onPress={this.cwArtisanLogin}>
            <Button style={{elevation: 6}}>
              <BtnText>Login</BtnText>
            </Button>
          </TouchableOpacity>
          <TouchableOpacity>
            <FgtPass
              style={{
                color: '#2C3F70',
                fontSize: 17,
                marginTop: 15,
                fontWeight: 'bold',
              }}
              onPress={() => {
                this.props.navigation.navigate('ForgotPassword');
              }}>
              Forgot Password?
            </FgtPass>
          </TouchableOpacity>
        </LoginContainer>
        <TouchableOpacity>
          <TipText>How to become an Artisan</TipText>
        </TouchableOpacity>
        <Loading isActive={this.state.isLoading} />
        <Success isActive={this.state.isSuccessful} />
      </Container>
    );
  }
}

export default Login;

const InputView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 0.5px;
  border-color: #596273;
  height: 46px;
  border-radius: 5px;
  margin: 10px 8% 5px 8%;
  background-color: #fff;
  opacity: 0.8;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const LoginContainer = styled.View`
  padding-top: 5px;
  background: #ffffff;
  border: 1px solid #cccccc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-top: 10px;
  height: 240px;
  width: 330px;
  align-items: center;
`;

const FgtPass = styled.Text`
  font-family: Ionicons;
`;

const TipText = styled.Text`
  text-align: center;
  font-size: 17px;
  width: 300px;
  margin-top: 15px;
  line-height: 22px;
  color: #f24505;
  font-family: Ionicons;
`;

const Text = styled.Text`
  font-size: 22px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  width: 300px;
  font-weight: 600;
  font-family: Ionicons;
`;

const View = styled.View`
  height: 100%;
  width: 100%;
`;

const Logo = styled.Image`
  height: 50px;
  width: 130px;
`;

const Img = styled.ImageBackground`
  width: 100%;
  height: 30%;
`;

const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
`;

const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
`;

const Button = styled.View`
  background: #f24505;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  box-shadow: 0 5px 5px #c2cbff;
  margin-top: 10px;
  width: 280px;
`;

const BtnText = styled.Text`
  color: white;
  font-size: 17px;
  text-transform: uppercase;
  font-family: Ionicons;
`;
