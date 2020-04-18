import React from 'react';
import styled from 'styled-components';
import {TouchableOpacity, AsyncStorage, Alert} from 'react-native';
import Loading from '../lotties/Loading';
import Success from '../lotties/Success';
import {FloatingTitleTextInputField} from '../components/FloatingHintInput';
import axios from 'axios';
import Domain from '../constants/Domain';

class ChangePasScreen extends React.Component {
  state = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    isLoading: false,
    isSuccessful: false,
  };

  static navigationOptions = {
    title: 'Change Password',
    headerStyle: {
      backgroundColor: '#C85A23',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  onChangePassword = async () => {
    this.setState({isLoading: true});
    try {
      const value = await AsyncStorage.getItem('artisanToken');
      const id = await AsyncStorage.getItem('userId');
      if (value !== null) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + value,
        };

        let pass = {
          current_password: this.state.oldPassword,
          new_password: this.state.newPassword,
          confirm_new_password: this.state.confirmPassword,
        };

        axios
          .post(Domain + 'api/artisans/change-password/' + id, pass, {
            headers: headers,
          })
          .then(response => {
            this.setState({isLoading: false});
            if (response) {
              this.setState({isSuccessful: true});
              Alert.alert(response.data.message);
              // sign user out
              if (response.data.msgType == 'success') {
                this.props.navigation.navigate('Login');
              }
              setTimeout(() => {
                setTimeout(() => {
                  this.setState({isSuccessful: false});
                }, 1000);
              }, 2000);
            }
          })
          .catch(error => {
            this.setState({isLoading: false});
            Alert.alert('An error occured! ' + error.message);
          });
      }
    } catch (error) {
      // Error retrieving data
      Alert.alert(error);
    }
  };

  _updateMasterState = (attrName, value) => {
    this.setState({[attrName]: value});
  };

  handleDefaultFocus = () => {};

  handleDefaultBlur = () => {};

  render() {
    return (
      <Container>
        <Title>
          Once you change your password, you will be logged out and asked to log
          in with your new password. To proceed enter the following details
        </Title>
        <InnerContainer style={{elevation: 5}}>
          <InputView>
            <FloatingTitleTextInputField
              attrName="oldPassword"
              title="Enter Old Password"
              updateBlurState={this.handleDefaultBlur}
              updateIconState={this.handleDefaultFocus}
              value={this.state.oldPassword}
              updateMasterState={this._updateMasterState}
              otherTextInputProps={{
                secureTextEntry: true,
                autoCapitalize: 'none',
              }}
            />
          </InputView>
          <InputView>
            <FloatingTitleTextInputField
              attrName="newPassword"
              title="Enter New Password"
              updateBlurState={this.handleDefaultBlur}
              updateIconState={this.handleDefaultFocus}
              value={this.state.newPassword}
              updateMasterState={this._updateMasterState}
              otherTextInputProps={{
                secureTextEntry: true,
                autoCapitalize: 'none',
              }}
            />
          </InputView>
          <InputView>
            <FloatingTitleTextInputField
              attrName="confirmPassword"
              title="Confirm New Password"
              updateBlurState={this.handleDefaultBlur}
              updateIconState={this.handleDefaultFocus}
              value={this.state.confirmPassword}
              updateMasterState={this._updateMasterState}
              otherTextInputProps={{
                secureTextEntry: true,
                autoCapitalize: 'none',
              }}
            />
          </InputView>
          <TouchableOpacity onPress={this.onChangePassword}>
            <Button style={{elevation: 7}}>
              <BtnText>Submit</BtnText>
            </Button>
          </TouchableOpacity>
        </InnerContainer>
        <Loading isActive={this.state.isLoading} />
        <Success isActive={this.state.isSuccessful} />
      </Container>
    );
  }
}

export default ChangePasScreen;

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 14px;
  color: #000000;
  font-weight: 500;
  margin-top: 10px;
  margin-right: 20px;
  margin-left: 20px;
`;

const InputView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 0.5;
  border-color: #596273;
  height: 50;
  border-radius: 5;
  margin: 10px 10% 10px 10%;
  background-color: #fff;
  opacity: 0.8;
  width: 85%;
  padding-right: 10px;
  padding-left: 10px;
`;

const InnerContainer = styled.View`
  margin-top: 5%
  align-items: center;
  width: 85%;
  height: 300px;
  border: 1px solid #cccccc;
  box-shadow: 0px 4px 10px rgba(204, 204, 204, 0.4);
  border-radius: 20px;
  background: #ffffff;
  align-items: center;
  padding: 10px;
`;

const Button = styled.View`
  background: #f24505;
  width: 160px;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  box-shadow: 0 10px 10px #c2cbff;
  margin-top: 15px;
  margin-bottom: 30px;
`;

const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 17px;
  text-transform: uppercase;
`;
