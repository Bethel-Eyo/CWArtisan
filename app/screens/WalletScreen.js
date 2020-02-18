import React from 'react';
import styled from 'styled-components';
import {BackHandler, TouchableOpacity} from 'react-native';

class WalletScreen extends React.Component {
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackClicked(),
    );
  }
  handleBackClicked = () => {
    this.props.homeMode();
  };
  render() {
    return (
      <Container>
        <TouchableOpacity>
          <Button>
            <BtnText>Test</BtnText>
          </Button>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default WalletScreen;

const Container = styled.View`
  align-items: center;
  padding-top: 20px;
  flex: 1;
`;

const Button = styled.View`
  background: #f24505;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  box-shadow: 0 5px 5px #c2cbff;
  margin-top: 10px;
  width: 180px;
`;

const BtnText = styled.Text`
  color: white;
  font-size: 17px;
  text-transform: uppercase;
  font-family: Ionicons;
`;
