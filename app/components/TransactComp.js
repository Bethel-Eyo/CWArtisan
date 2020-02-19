import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';

const TransactComp = props => (
  <Container>
    <JobTitle>{props.title}</JobTitle>
    <Category>{props.category}</Category>
    <Cost>{props.cost}</Cost>
    <Icon
      name="ios-arrow-forward"
      size={22}
      color="#818a9f"
      style={{position: 'absolute', right: 25}}
    />
  </Container>
);

export default TransactComp;

const Container = styled.View`
  width: 100%;
  height: 60px;
  background: #ffffff;
  justify-content: center;
`;

const JobTitle = styled.Text`
  margin-left: 20px;
  font-size: 17px;
`;

const Category = styled.Text`
  margin-left: 20px;
  color: #b8bece;
`;

const Cost = styled.Text`
  position: absolute;
  right: 50;
  font-size: 14px;
`;
