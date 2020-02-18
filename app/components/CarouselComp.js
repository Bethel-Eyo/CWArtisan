import React from 'react';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';

const CarouselComp = props => (
  <Container style={{elevation: 5}}>
    <Logo source={require('../assets/citiworks_logo.png')} />
    <Title>Door Fixing</Title>
    <Category>Carpentry</Category>
    <Button style={{elevation: 5}}>
      <BtnText>{props.data}</BtnText>
    </Button>
    <LottieView
      source={require('../assets/carousel-loading.json')}
      style={{height: 50, width: 50, marginTop: 10}}
      autoPlay
    />
    <Btn style={{elevation: 5}}>
      <BtnText>Proceed</BtnText>
    </Btn>
  </Container>
);

export default CarouselComp;

const Logo = styled.Image`
  width: 97px;
  height: 40px;
  margin-top: 10px;
`;

const Container = styled.View`
  height: 350px;
  width: 310px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  border: 1px solid #cccccc;
  align-items: center;
  margin-top: 50px;
`;

const Title = styled.Text`
  font-size: 22px;
  margin-top: 10px;
`;

const Category = styled.Text``;

const Button = styled.View`
  background: #f24505;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  box-shadow: 0 5px 5px #c2cbff;
  margin-top: 15px;
  width: 260px;
`;

const Btn = styled.View`
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: #b8bece;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  width: 260px;
  position: absolute;
  bottom: 20px;
`;

const BtnText = styled.Text`
  color: white;
  font-size: 15px;
  text-transform: uppercase;
  font-family: Ionicons;
`;
