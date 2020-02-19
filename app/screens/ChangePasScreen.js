import React from 'react';
import styled from 'styled-components';
import {TouchableOpacity} from 'react-native';

class ChangePasScreen extends React.Component {
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

  render() {
    return (
      <Container>
        <InnerContainer style={{elevation: 5}}>
          <InputField placeholder="Enter Old Password" />
          <InputField placeholder="Enter New Password" />
          <InputField placeholder="Confirm New Password" />
          <TouchableOpacity>
            <Button style={{elevation: 7}}>
              <BtnText>Submit</BtnText>
            </Button>
          </TouchableOpacity>
        </InnerContainer>
      </Container>
    );
  }
}

export default ChangePasScreen;

const View = styled.View``;

const Text = styled.Text``;

const Container = styled.View`
  flex: 1;
  align-items: center;
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

const InputField = styled.TextInput`
  border: 1px solid #596273;
  width: 85%;
  height: 44px;
  border-radius: 10px;
  font-size: 14px;
  color: #3c4560;
  margin-top: 20px;
  padding-left: 24px;
`;

const Button = styled.View`
  background: #f24505;
  width: 160px;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  box-shadow: 0 10px 10px #c2cbff;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 17px;
  text-transform: uppercase;
`;
