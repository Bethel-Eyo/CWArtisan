import React from 'react';
import styled from 'styled-components';
import {StatusBar, TouchableOpacity, Platform} from 'react-native';
import LottieView from 'lottie-react-native';

class JobDoneScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor="#AC5428" />
        <Title
          style={{
            ...Platform.select({
              ios: {marginTop: 30},
              android: {marginTop: 10},
            }),
          }}>
          Job Completed
        </Title>
        <Comments>The Customer has confirmed your Job Completion</Comments>
        <LottieView
          source={require('../assets/checked.json')}
          style={{height: 150, width: 150, marginTop: 10}}
          autoPlay
          loop={false}
        />
        <Tip>
          Congratulations, Your Job has been completed successfully and $4700.00
          Amount has been credited to your wallet, you can check your wallet to
          see your new balance
        </Tip>
        <TouchableOpacity
          style={{position: 'absolute', bottom: 10}}
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}>
          <Button style={{elevation: 5}}>
            <BtnText>Finish</BtnText>
          </Button>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default JobDoneScreen;

const Container = styled.View`
  align-items: center;
  flex: 1;
`;

const Comments = styled.Text`
  text-align: center;
  color: #6e7a90;
  width: 250px;
  margin-top: 20px;
`;

const Tip = styled.Text`
  text-align: center;
  font-size: 18px;
  width: 250px;
  color: #596273;
  margin-top: 50px;
`;

const BtnText = styled.Text`
  text-transform: uppercase;
`;

const Title = styled.Text`
  font-size: 22px;
  color: #252c3b;
`;

const Button = styled.View`
  border: 0.5px solid #596273;
  border-radius: 20px;
  height: 40px;
  width: 200px;
  background: white;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
`;
