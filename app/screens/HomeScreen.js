import React from 'react';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import DoubleLayout from '../components/DoubleLayout';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  TouchableOpacity,
  Platform,
  ImageBackground,
  StatusBar,
  Alert,
  AsyncStorage,
} from 'react-native';
import {connect} from 'react-redux';
import NotificationButton from '../components/NotificationButton';
import Notifications from '../components/Notifications';
import axios from 'axios';
import Domain from '../constants/Domain';

function mapStateToProps(state) {
  return {action: state.action};
}

function mapDispatchToProps(dispatch) {
  return {
    openNotif: () =>
      dispatch({
        type: 'OPEN_NOTIF',
      }),
  };
}

class HomeScreen extends React.Component {
  state = {
    photo:
      'https://raw.githubusercontent.com/Bethel-Eyo/FunUiCodes/master/assets/avatar-default.jpg',
    category: '',
    name: '',
  };
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.getArtisanProfile();
  }

  componentDidUpdate() {
    if (this.props.action == 'openJobHist') {
      this.props.navigation.navigate('JobHist');
    } else if (this.props.action == 'homeJobTracker') {
      this.props.navigation.navigate('JST');
    } else if (this.props.action == 'openWallet') {
      this.props.navigation.navigate('Wallet');
    } else if (this.props.action == 'openSupport') {
      this.props.navigation.navigate('Support');
    }
  }

  getArtisanProfile = async () => {
    try {
      const value = await AsyncStorage.getItem('artisanToken');
      if (value !== null) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + value,
        };

        axios
          .get(Domain + 'api/artisans/artisan-profile', {
            headers: headers,
          })
          .then(response => {
            this.setState({
              name:
                response.data[0].artisan.first_name +
                ' ' +
                response.data[0].artisan.last_name,
              category: response.data[0].category,
              photo: response.data[0].profile_picture,
            });
            this.storeUserId(response.data[0].artisan_id);
          })
          .catch(error => {
            this.setState({isLoading: false});
            Alert.alert('An error occured! ' + error.message);
          });
      }
    } catch (error) {
      // Error retrieving data
      Alert.alert(error);
    }
  };

  storeUserId = async id => {
    try {
      await AsyncStorage.setItem('artisanId', id);
    } catch (error) {
      Alert.alert(error);
    }
  };

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor="#AC5428" />

        {/* <LinearGradient
          colors={['rgba(200, 90, 35, 0.9)', 'rgba(240, 26, 65, 0.72)']}
          style={{
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}> */}
        <ImageBackground
          source={require('../assets/citi_bg.jpg')}
          style={{
            width: '100%',
          }}>
          <TopView style={{backgroundColor: 'rgba(25,0,0,0.6)'}}>
            <TouchableOpacity
              onPress={this.props.openNotif}
              style={{
                position: 'absolute',
                elevation: 3,
                padding: 5,
                ...Platform.select({
                  ios: {right: 20, top: 32},
                  android: {right: 20, top: 15},
                }),
              }}>
              <NotificationButton />
            </TouchableOpacity>
            <Row
              style={{
                elevation: 3,
                ...Platform.select({
                  ios: {marginLeft: '10%', marginTop: '15%'},
                  android: {marginLeft: '10%', marginTop: '11%'},
                }),
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Settings');
                }}>
                <Dp source={{uri: this.state.photo}} />
              </TouchableOpacity>
              <Column>
                <Name>{this.state.name}</Name>
                <Category>{this.state.category}</Category>
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
        </ImageBackground>
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
        <Notifications />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

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
