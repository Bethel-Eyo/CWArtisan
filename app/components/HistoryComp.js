import React from 'react';
import styled from 'styled-components';

const HistoryComp = () => (
  <Container>
    <Title>Door Fixing</Title>
    <Category>Carpentry</Category>
    <Date></Date>
    <Row>
      <Hint>Cost of Materials:</Hint>
      <Value>$3500.00</Value>
    </Row>
    <Row>
      <Hint>Service Charge:</Hint>
      <Value>$1500.00</Value>
    </Row>
    <Row>
      <Hint>Citiworks commission:</Hint>
      <Value>$300.00</Value>
    </Row>
    <Row>
      <Hint>Net Income:</Hint>
      <Value>$1200.00</Value>
    </Row>
    <Row>
      <Hint>Initial Balance:</Hint>
      <Value>$5000.00</Value>
    </Row>
    <Row>
      <Hint>Current Balance:</Hint>
      <Value>$3200.00</Value>
    </Row>
  </Container>
);
export default HistoryComp;

const Date = styled.Text``;

const Container = styled.View`
  width: 100%;
  height: 300px;
`;

const Category = styled.Text``;

const Hint = styled.Text``;

const Value = styled.Text``;

const Row = styled.View`
  flex-direction: row;
`;

const Title = styled.Text``;
