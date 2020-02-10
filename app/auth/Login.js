import React from 'react';
import styled from 'styled-components';
import {BackHandler, TouchableOpacity} from 'react-native';
import {FloatingTitleTextInputField} from '../components/FloatingHintInput';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    iconEmail: require('../assets/icon-email.png'),
    iconPassword: require('../assets/icon-password.png'),
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
        <Img source={require('../assets/painter.jpg')}>
          <View style={{backgroundColor: 'rgba(25,0,0,0.6)'}}>
            <Logo source={require('../assets/cw-logo.png')} />
            <Text>Welcome to Citiworksng Artisan</Text>
          </View>
        </Img>
        <LoginContainer>
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
          <TouchableOpacity>
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
                this.props.navigation.push('ResetPass');
              }}>
              Forgot Password?
            </FgtPass>
          </TouchableOpacity>
        </LoginContainer>
        <TipText>
          Don’t have an Artisan account? Find out how to become a CItiworks
          Artisan by clicking below
        </TipText>
        <Button style={{elevation: 6, width: 150, height: 37}}>
          <BtnText style={{fontSize: 14}}>Click me!</BtnText>
        </Button>
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
  height: 50px;
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
  padding-top: 20px;
  background: #ffffff;
  border: 1px solid #cccccc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-top: 20px;
  height: 280px;
  width: 340px;
  align-items: center;
`;

const FgtPass = styled.Text``;

const TipText = styled.Text`
  text-align: center;
  font-size: 17px;
  width: 300px;
  margin-top: 20px;
  line-height: 25px;
  color: #2c3f70;
`;

const Text = styled.Text`
  font-size: 25px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  width: 300px;
  font-weight: 600;
`;

const View = styled.View`
  height: 100%;
  width: 100%;
`;

const Logo = styled.Image`
  height: 60px;
  width: 150px;
  position: absolute;
  top: 30px;
  left: 20px;
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
  margin-top: 20px;
  width: 300px;
`;

const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 17px;
  text-transform: uppercase;
`;
