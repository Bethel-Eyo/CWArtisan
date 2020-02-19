import React from 'react';
import styled from 'styled-components';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
  StatusBar,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class SettingsScreen extends React.Component {
  state = {
    name: 'Bethel Eyo',
    email: 'betheleyo@gmail.com',
    phoneNumber: '+2347067035331',
    photo:
      'https://raw.githubusercontent.com/Bethel-Eyo/FunUiCodes/master/assets/avatar-default.jpg',
  };

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SafeAreaView style={{backgroundColor: '#e7ebf4'}}>
        <StatusBar barStyle="dark-content" backgroundColor="#AC5428" />

        <ScrollView style={{backgroundColor: '#e7ebf4'}}>
          <ImageBackground
            source={require('../assets/citi_bg.jpg')}
            style={{height: 270, width: '100%', marginBottom: 10}}>
            <TopView
              style={{
                backgroundColor: 'rgba(25,0,0,0.5)',
                flex: 1,
                width: '100%',
                alignItems: 'center',
              }}>
              <ProfilePicture source={require('../assets/carpenter.jpg')} />
              <Name>Idris Elba</Name>
              <Row style={{height: 30}}>
                <Hint style={{color: '#C8D0E8', fontSize: 14}}>Craft:</Hint>
                <Values>Furniture Engineer</Values>
              </Row>
              <Row style={{height: 30}}>
                <Hint style={{color: '#C8D0E8', fontSize: 14}}>Email:</Hint>
                <Values>idriselba49@gmail.com</Values>
              </Row>
              <Row style={{height: 30}}>
                <Hint style={{color: '#C8D0E8', fontSize: 14}}>
                  Phone Number:
                </Hint>
                <Values>+2347098767889</Values>
              </Row>
            </TopView>
          </ImageBackground>
          <Container>
            <AccountView style={{elevation: 3}}>
              <TouchableOpacity>
                <Row>
                  <Icon
                    name="ios-notifications-outline"
                    size={26}
                    color="#818a9f"
                    style={{marginRight: 20}}
                  />
                  <Hint>Notifications</Hint>
                  <Icon
                    name="ios-arrow-forward"
                    size={23}
                    color="#818a9f"
                    style={{position: 'absolute', right: 25}}
                  />
                </Row>
              </TouchableOpacity>
            </AccountView>
            <AccountView style={{elevation: 3}}>
              <Title>Help and Feedback</Title>
              <Tip>
                We welcome your feedback, questions and comments! You can reach
                us below
              </Tip>
              <HorizontalView />
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://citiworks.ng/about-us');
                }}>
                <Row>
                  <Icon
                    name="ios-tablet-portrait"
                    size={26}
                    color="#818a9f"
                    style={{marginRight: 20}}
                  />
                  <Hint>About us</Hint>
                  <Icon
                    name="ios-arrow-forward"
                    size={23}
                    color="#818a9f"
                    style={{position: 'absolute', right: 25}}
                  />
                </Row>
              </TouchableOpacity>
              <HorizontalView />
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('FAQ');
                }}>
                <Row>
                  <Icon
                    name="ios-chatboxes"
                    size={26}
                    color="#818a9f"
                    style={{marginRight: 20}}
                  />
                  <Hint>Frequently Asked Questions</Hint>
                  <Icon
                    name="ios-arrow-forward"
                    size={23}
                    color="#818a9f"
                    style={{position: 'absolute', right: 25}}
                  />
                </Row>
              </TouchableOpacity>
              <HorizontalView />
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    'mailto:info@citiworks.ng?subject=SendMail&body=Description',
                  )
                }>
                <Row>
                  <Icon
                    name="ios-mail"
                    size={26}
                    color="#818a9f"
                    style={{marginRight: 20}}
                  />
                  <Hint>Contact Us</Hint>
                  <Icon
                    name="ios-arrow-forward"
                    size={23}
                    color="#818a9f"
                    style={{position: 'absolute', right: 25}}
                  />
                </Row>
              </TouchableOpacity>
            </AccountView>
            <AccountView style={{elevation: 3}}>
              <Title>Security</Title>
              <Tip>
                At Citiworksng, we make sure all your details are well secured
                and protected.
              </Tip>
              <HorizontalView />
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('ChangePassword');
                }}>
                <Row>
                  <Icon
                    name="ios-lock"
                    size={26}
                    color="#818a9f"
                    style={{marginRight: 20}}
                  />
                  <Hint>Change Password</Hint>
                  <Icon
                    name="ios-arrow-forward"
                    size={23}
                    color="#818a9f"
                    style={{position: 'absolute', right: 25}}
                  />
                </Row>
              </TouchableOpacity>
              <HorizontalView />
              <TouchableOpacity>
                <Row>
                  <Icon
                    name="ios-today"
                    size={26}
                    color="#818a9f"
                    style={{marginRight: 20}}
                  />
                  <Hint>Privacy</Hint>
                  <Icon
                    name="ios-arrow-forward"
                    size={23}
                    color="#818a9f"
                    style={{position: 'absolute', right: 25}}
                  />
                </Row>
              </TouchableOpacity>
            </AccountView>
            <AccountView style={{elevation: 3}}>
              <TouchableOpacity>
                <Row>
                  <Icon
                    name="ios-log-out"
                    size={26}
                    color="#818a9f"
                    style={{marginRight: 20}}
                  />
                  <Hint>Logout</Hint>
                </Row>
              </TouchableOpacity>
            </AccountView>
          </Container>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default SettingsScreen;

const TopView = styled.View``;

const Name = styled.Text`
  font-size: 25px;
  color: #ffffff;
`;

const Container = styled.View`
  flex: 1;
  background: #e7ebf4;
`;

const AccountView = styled.View`
  background: #ffffff;
  padding-left: 15px;
  margin-bottom: 10px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.Text`
  text-transform: uppercase;
  font-size: 17px;
  margin-top: 5px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Tip = styled.Text`
  font-size: 15px;
  color: #818a9f;
  margin-bottom: 5px;
`;

const Hint = styled.Text`
  font-size: 18px;
  color: #818a9f;
`;

const Values = styled.Text`
  font-size: 16px;
  margin-left: 20px;
  color: #ffffff;
`;

const Row = styled.View`
  flex-direction: row;
  height: 47px;
  align-items: center;
`;

const HorizontalView = styled.View`
  background: #cccccc;
  height: 1px;
  width: 100%;
`;

const ProfilePicture = styled.Image`
  height: 120px;
  width: 120px;
  border-radius: 60px;
  margin-top: 15px;
  margin-bottom: 10px;
`;
