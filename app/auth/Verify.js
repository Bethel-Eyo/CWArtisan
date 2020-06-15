import React from 'react';
import styled from 'styled-components';
import {
  FloatingTitleTextInputField,
  AsyncStorage,
} from '../components/FloatingHintInput';
import {TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Domain from '../constants/Domain';
import Loading from '../lotties/Loading';
import Success from '../lotties/Success';

class Verify extends React.Component {
  state = {
    code: '',
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

  handleNext = () => {
    this.setState({isLoading: true});
    this.setState({
      userId: this.props.navigation.state.params.userId,
    });
    let sixDigit = {
      verification_code: this.state.code,
      phone_number: this.props.navigation.state.params.phone_number,
    };
    axios
      .post(Domain + 'api/verify-artisan-number', sixDigit)
      .then(response => {
        if (response.data == 'valid') {
          this.setState({isLoading: false});
          Alert.alert(response.data);
          this.props.navigation.navigate('ResetPass', {
            userId: this.state.userId,
          });
        } else {
          Alert.alert('Incorrect code');
          this.setState({isLoading: false});
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
        <Title>Enter 6 digit code</Title>
        <SubTitle>
          The recovery code was sent to your mobile number Please enter the
          code.
        </SubTitle>
        <InputView>
          <FloatingTitleTextInputField
            attrName="code"
            title="6 digit"
            keyboardType="phone-pad"
            value={this.state.code}
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
        <TouchableOpacity
          onPress={() => {
            this.handleNext();
          }}
          style={{position: 'absolute', bottom: 40, right: 20}}>
          <CircularView>
            <Icon name="ios-arrow-forward" size={28} color="white" />
          </CircularView>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 40,
            left: 20,
          }}>
          <Icon name="ios-arrow-back" size={26} color="black" />
          <SubTitle style={{marginLeft: 10, marginTop: 2}}>Back</SubTitle>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <SubTitle style={{marginTop: 20, color: '#C85A23'}}>
            Send this code again
          </SubTitle>
        </TouchableOpacity>
        <Loading isActive={this.state.isLoading} />
        <Success isActive={this.state.isSuccessful} />
      </Container>
    );
  }
}

export default Verify;

const Container = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
`;

const CircularView = styled.View`
  height: 56px;
  width: 56px;
  border-radius: 28px;
  background: #c85a23;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  margin-top: 40px;
  font-size: 14px;
`;

const Title = styled.Text`
  margin-top: 10px;
  font-size: 24px;
  font-weight: bold;
`;

const SubTitle = styled.Text`
  color: #929aa9;
  font-size: 18px;
  margin-top: 18px;
  line-height: 27px;
`;

const InputView = styled.View`
  flex-direction: row;
  justify-content: center;
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
  margin-top: 20px;
`;
