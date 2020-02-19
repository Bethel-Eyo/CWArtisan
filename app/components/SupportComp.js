import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';

const SupportComp = props => (
  <Container>
    <IconContainer>
      <Icon name={props.logo} size={20} color="#ffffff" />
    </IconContainer>
    <Text>{props.text}</Text>
  </Container>
);

export default SupportComp;

const IconContainer = styled.View`
  height: 36px;
  justify-content: center;
  align-items: center;
  width: 36px;
  border-radius: 18px;
  background: #c85a23;
  margin-left: 10px;
`;

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  height: 52px;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 15px;
  margin-left: 20px;
  color: #6e7a90;
`;
