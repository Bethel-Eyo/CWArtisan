import React from 'react';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import DoubleLayout from '../components/DoubleLayout';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, Platform, Alert} from 'react-native';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {action: state.action};
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidUpdate() {
    if (this.props.action == 'openJobHist') {
      this.props.navigation.navigate('JobHist');
    } else if (this.props.action == 'homeJobTracker') {
      this.props.navigation.navigate('JST');
    } else if (this.props.action == 'openWallet') {
      this.props.navigation.navigate('Wallet');
    }
  }

  render() {
    return (
      <Container>
        <LinearGradient
          colors={['rgba(200, 90, 35, 0.9)', 'rgba(240, 26, 65, 0.72)']}
          style={{
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}>
          <TopView>
            <TouchableOpacity
              style={{
                position: 'absolute',
                elevation: 3,
                padding: 5,
                ...Platform.select({
                  ios: {right: 20, top: 35},
                  android: {right: 20, top: 15},
                }),
              }}>
              <Icon name="ios-settings" size={25} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                position: 'absolute',
                elevation: 3,
                padding: 5,
                ...Platform.select({
                  ios: {right: 60, top: 35},
                  android: {right: 60, top: 15},
                }),
              }}>
              <Icon name="ios-notifications" size={25} color="#ffffff" />
            </TouchableOpacity>
            <Row
              style={{
                elevation: 3,
                ...Platform.select({
                  ios: {marginLeft: '10%', marginTop: '15%'},
                  android: {marginLeft: '10%', marginTop: '9%'},
                }),
              }}>
              <Dp source={require('../assets/carpenter.jpg')} />
              <Column>
                <Name>Idris Elba</Name>
                <Category>Carpenter</Category>
              </Column>
            </Row>
          </TopView>
          <SubRow>
            <Icon name="ios-star" size={16} color="#1B2EDE" />
            <Text>Professional</Text>
          </SubRow>
          <SubRow style={{right: 30}}>
            <Circle />
            <Text>Available</Text>
          </SubRow>
        </LinearGradient>
        <View>
          <DoubleLayout
            nav={this.props.navigation}
            row="one"
            firstName="ios-wallet"
            firstLabel="Wallet"
            secondName="ios-easel"
            secondLabel="Job Tracker"
          />
        </View>
        <SecondView>
          <DoubleLayout
            row="two"
            firstName="ios-clock"
            firstLabel="Job History"
            secondName="ios-people"
            secondLabel="Support"
          />
        </SecondView>
        <ThirdView>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('JobZone');
            }}>
            <CircularView style={{elevation: 7}}>
              <Icon name="ios-paper-plane" size={30} color="#ffffff" />
            </CircularView>
          </TouchableOpacity>
        </ThirdView>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(HomeScreen);

const Circle = styled.View`
  height: 14px;
  width: 14px;
  border-radius: 7px;
  background: #10e325;
`;

const Container = styled.View`
  flex: 1;
`;

const CircularView = styled.View`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background: rgba(200, 90, 35, 0.9);
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
`;

const View = styled.View`
  align-items: center;
  width: 100%;
  height: 120px;
  margin-top: -50px;
`;

const SecondView = styled.View`
  align-items: center;
  width: 100%;
  height: 120px;
  margin-top: 15px;
`;

const ThirdView = styled.View`
  align-items: center;
  width: 100%;
  margin-top: 45px;
`;

const Dp = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 40px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const SubRow = styled.View`
  margin-left: 10%;
  flex-direction: row;
  position: absolute;
  top: 66%;
`;

const Column = styled.View`
  margin-left: 20px;
  margin-top: 10px;
`;

const TopView = styled.View`
  height: 236px;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Text = styled.Text`
  font-size: 12px;
  color: white;
  margin-left: 7px;
  font-weight: bold;
  font-family: Ionicons;
`;

const Name = styled.Text`
  font-size: 21px;
  font-weight: bold;
  color: white;
  font-family: Ionicons;
`;

const Category = styled.Text`
  font-size: 15px;
  color: white;
  font-family: Ionicons;
`;
