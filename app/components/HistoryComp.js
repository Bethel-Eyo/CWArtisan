import React from 'react';
import styled from 'styled-components';

const HistoryComp = props => (
  <Container style={{elevation: 4}}>
    <Title>Door Fixing</Title>
    <Category>Carpentry</Category>
    <Date>Today at 5:20pm</Date>
    <HorizontalView />
    <Row>
      <Hint>Cost of Materials:</Hint>
      <Value>{props.costOfMaterials}</Value>
    </Row>
    <Row>
      <Hint>Service Charge:</Hint>
      <Value>{props.serviceCharge}</Value>
    </Row>
    <Row>
      <Hint>Citiworks commission:</Hint>
      <Value>{props.citiworksCommission}</Value>
    </Row>
    <Row>
      <Hint>Net Income:</Hint>
      <Value>{props.netIncome}</Value>
    </Row>
    <Row>
      <Hint>Initial Balance:</Hint>
      <Value>{props.initialBalance}</Value>
    </Row>
    <Row>
      <Hint>Current Balance:</Hint>
      <Value>{props.currentBalance}</Value>
    </Row>
    <HorizontalView />
    <View>
      <SubTitle>CWArtisan</SubTitle>
    </View>
  </Container>
);
export default HistoryComp;

const View = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const SubTitle = styled.Text`
  font-weight: bold;
  color: #c85a23;
  font-family: Ionicons;
`;

const Date = styled.Text`
  position: absolute;
  right: 10px;
  top: 10px;
  color: #6e7a90;
  font-weight: bold;
  font-family: Ionicons;
`;

const HorizontalView = styled.View`
  background: #cccccc;
  height: 1px;
  width: 100%;
`;

const Container = styled.View`
  width: 100%;
  height: 252px;
  background: #ffffff;
  margin-top: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Category = styled.Text`
  margin-left: 20px;
  color: #6e7a90;
  font-family: Ionicons;
`;

const Hint = styled.Text`
  font-size: 15px;
  width: 170px;
  color: #6e7a90;
  font-family: Ionicons;
`;

const Value = styled.Text`
  font-size: 15px;
  font-family: Ionicons;
`;

const Row = styled.View`
  flex-direction: row;
  margin-top: 10px;
  width: 100%;
  margin-left: 30px;
`;

const Title = styled.Text`
  margin-left: 20px;
  font-size: 20px;
  font-family: Ionicons;
`;
