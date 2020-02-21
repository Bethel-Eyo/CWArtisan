import React from 'react';
import styled from 'styled-components';
import TearLines from 'react-native-tear-lines';
import {StatusBar} from 'react-native';

class JobDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
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
        <StatusBar barStyle="light-content" backgroundColor="#AC5428" />
        <TearLines
          ref="top"
          color="#FFFFFF"
          style={{
            shadowColor: '#cccccc',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.8,
            shadowRadius: 7,
            elevation: 6,
          }}></TearLines>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            // borderColor: '#cccccc',
            // borderLeftWidth: 1,
            // borderRightWidth: 1,
          }}
          onLayout={e => {
            this.refs.top.onLayout(e);
            this.refs.bottom.onLayout(e);
          }}>
          <FullWidth>
            <Logo source={require('../assets/citiworks_logo.png')} />
            <Title>Door Fixing</Title>
            <SubTitle>Carpentry</SubTitle>
          </FullWidth>
          <Row>
            <Hint>Client:</Hint>
            <Values>Janet Wilson</Values>
          </Row>
          <Row>
            <Hint>Location:</Hint>
            <Values>Ikosi Ketu, Lagos</Values>
          </Row>
          <Row>
            <Hint>Rating:</Hint>
            <Values>Excellent</Values>
          </Row>
          <Row>
            <Hint>Cost of Materials:</Hint>
            <Values>$3,500.00</Values>
          </Row>
          <Row>
            <Hint>Service Charge:</Hint>
            <Values>$1,500.00</Values>
          </Row>
          <Row>
            <Hint>Citiworks commission:</Hint>
            <Values>$300.00</Values>
          </Row>
          <Row>
            <Hint>Net Income:</Hint>
            <Values>$1,200.00</Values>
          </Row>
          <Row>
            <Hint>Initial Balance:</Hint>
            <Values>$5,000.00</Values>
          </Row>
          <Row>
            <Hint>Current Balance:</Hint>
            <Values>$6,200.00</Values>
          </Row>
          <Row style={{marginBottom: 20}}>
            <Hint>Timestamp:</Hint>
            <Values>11-02-2020, 9:53pm</Values>
          </Row>
        </View>
        <TearLines
          isUnder
          ref="bottom"
          color="#FFFFFF"
          style={{
            shadowColor: '#cccccc',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.8,
            shadowRadius: 7,
            elevation: 6,
          }}></TearLines>
      </Container>
    );
  }
}

export default JobDetailScreen;

const Container = styled.View`
  flex: 1;
  background: #f6f9ff;
  padding: 30px;
`;

const Logo = styled.Image`
  height: 35px;
  width: 90px;
`;

const FullWidth = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  font-size: 22px;
  margin-top: 10px;
`;

const SubTitle = styled.Text`
  font-size: 15px;
  color: #818a9f;
`;

const Row = styled.View`
  flex-direction: row;
  margin-top: 12px;
  margin-left: 20px;
`;

const Hint = styled.Text`
  font-size: 14px;
  color: #818a9f;
  width: 150px;
`;

const Values = styled.Text`
  font-size: 14px;
  margin-left: 10px;
`;

const View = styled.View``;
