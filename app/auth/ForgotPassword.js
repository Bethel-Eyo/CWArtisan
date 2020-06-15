import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform, TouchableOpacity, Alert, AsyncStorage} from 'react-native';
import {FloatingTitleTextInputField} from '../components/FloatingHintInput';
import axios from 'axios';
import Domain from '../constants/Domain';
import Loading from '../lotties/Loading';
import Success from '../lotties/Success';

class ForgotPassword extends React.Component {
  state = {
    phoneNumber: '',
    isLoading: false,
    isSuccessful: false,
    userId: '',
  };

  static navigationOptions = {
    header: null,
  };

  _updateMasterState = (attrName, value) => {
    this.setState({[attrName]: value});
  };

  handleDefaultFocus = () => {};

  handleDefaultBlur = () => {};

  // 1. Check if the phone number is tied to an existing account.
  checkPhoneNumber = () => {
    this.setState({
      isLoading: true,
    });
    let number = {
      phone_number: '+234' + this.state.phoneNumber,
    };
    axios
      .post(Domain + 'api/check-artisan-number', number)
      .then(response => {
        if (response.data.account == null) {
          this.setState({isLoading: false});
          Alert.alert(
            'Failed',
            'This number is not registered with any citiworks account, please be sure to input the right phone number',
          );
        } else {
          this.setState({
            userId: response.data.account.artisan_id,
          });
          this.sendResetCode(number);
        }
      })
      .catch(error => {
        this.setState({isLoading: false});
        Alert.alert('An error occured! ' + error.message);
      });
  };

  // 2. send code to the account the phone number is tied to
  sendResetCode = number => {
    axios
      .post(Domain + 'api/send-artisan-text', number)
      .then(response => {
        this.setState({isLoading: false});
        if (response.data == 'success') {
          this.setState({isSuccessful: true});
          setTimeout(() => {
            setTimeout(() => {
              this.setState({isSuccessful: false});
              Alert.alert(response.data);
            }, 1000);
          }, 2000);
          this.props.navigation.navigate('Verify', {
            phone_number: number,
            userId: this.state.userId,
          });
        } else {
          Alert.alert('Please enter a valide phone number');
        }
      })
      .catch(error => {
        this.setState({isLoading: false});
        Alert.alert('An error occured! ' + error.message);
      });
  };

  render() {
    return (
      <Container
        style={{
          ...Platform.select({
            ios: {marginTop: 40},
            android: {marginTop: 10},
          }),
        }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Icon name="ios-arrow-back" size={35} color="black" />
        </TouchableOpacity>
        <Header>Forgot Password</Header>
        <Subtitle>
          A 6-digit code will be sent to your account's phone number in order to
          help you reset your password
        </Subtitle>
        <InnerView>
          <Row>
            <Icon
              name="ios-phone-portrait"
              style={{marginTop: 27, marginLeft: 35}}
              size={60}
              color="black"
            />
            <Column>
              <Subtitle style={{marginTop: 12}}>via sms:</Subtitle>
              <InputView>
                <Naija>
                  <Prefix>+234</Prefix>
                </Naija>
                <FloatingTitleTextInputField
                  attrName="phoneNumber"
                  title="7060000000"
                  keyboardType="phone-pad"
                  value={this.state.phoneNumber}
                  updateIconState={this.handleDefaultFocus}
                  updateBlurState={this.handleDefaultBlur}
                  updateMasterState={this._updateMasterState}
                  textInputStyles={{
                    // here you can add additional TextInput styles
                    color: 'green',
                    fontSize: 15,
                  }}
                  otherTextInputProps={
                    {
                      // here you can add other TextInput props of your choice
                    }
                  }
                />
              </InputView>
            </Column>
          </Row>
        </InnerView>
        <TouchableOpacity
          onPress={() => {
            this.checkPhoneNumber();
          }}>
          <Button style={{elevation: 6}}>
            <BtnText>Request code</BtnText>
          </Button>
        </TouchableOpacity>
        <Loading isActive={this.state.isLoading} />
        <Success isActive={this.state.isSuccessful} />
      </Container>
    );
  }
}

export default ForgotPassword;

const Prefix = styled.Text``;

const Container = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
`;

const InputView = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 0.5;
  border-color: #596273;
  height: 50;
  border-radius: 5;
  background-color: #fff;
  opacity: 0.8;
  width: 80%;
  padding-right: 10px;
  padding-left: 10px;
  margin-top: 5px;
`;

const Naija = styled.View`
  border-color: #596273;
  border-radius: 5;
  border-width: 0.5;
  margin-right: 5;
  height: 30;
  width: 45;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: white;
`;

const Button = styled.View`
  background: #f24505;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  box-shadow: 0 5px 5px #c2cbff;
  margin-top: 20px;
`;

const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 17px;
  text-transform: uppercase;
`;

const Text = styled.Text`
  margin-top: 5px;
  font-size: 15px;
`;

const Column = styled.View`
  margin-left: 20px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const InnerView = styled.View`
  background-color: #e6eaf4;
  height: 110px;
  width: 100%;
  margin-top: 18px;
  border-radius: 20px;
`;

const Subtitle = styled.Text`
  color: #929aa9;
  font-size: 18px;
  margin-top: 18px;
  line-height: 27px;
`;

const Header = styled.Text`
  margin-top: 30px;
  font-size: 30px;
`;
