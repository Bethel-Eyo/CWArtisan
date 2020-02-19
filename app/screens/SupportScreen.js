import React from 'react';
import styled from 'styled-components';
import SupportComp from '../components/SupportComp';
import {TouchableOpacity, StatusBar, Linking, BackHandler} from 'react-native';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {action: state.action};
}

function mapDispatchToProps(dispatch) {
  return {
    homeMode: () =>
      dispatch({
        type: 'HOME_MODE',
      }),
  };
}

class SupportScreen extends React.Component {
  static navigationOptions = {
    title: 'Support',
    headerStyle: {
      backgroundColor: '#C85A23',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackClicked(),
    );
  }

  handleBackClicked = () => {
    this.props.homeMode();
  };

  goToDetailScreen = index => {
    if (index == 0) {
      this.chatUp();
    } else if (index == 1) {
      this.dialCall();
    } else if (index == 2) {
      this.props.navigation.navigate('FAQ');
    } else if (index == 3) {
    }
  };

  chatUp = () => {
    Linking.openURL('https://api.whatsapp.com/send?phone=+2347062444444');
  };

  dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${07062444444}';
    } else {
      phoneNumber = 'telprompt:${07062444444}';
    }

    Linking.openURL(phoneNumber);
  };

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor="#AC5428" />
        {supportItems.map((support, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              this.goToDetailScreen(index);
            }}>
            <View>
              <SupportComp logo={support.logo} text={support.Text} />
              <HorizontalView />
              {/* {(index == 0 || index == 1 || index == 2) && <HorizontalView />} */}
            </View>
          </TouchableOpacity>
        ))}
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupportScreen);

const HorizontalView = styled.View`
  background: #cccccc;
  height: 1px;
  width: 100%;
  margin-left: 10px;
`;

const View = styled.View``;

const Container = styled.View`
  flex: 1;
  padding-left: 10px;
`;

const supportItems = [
  {
    logo: 'ios-chatbubbles',
    Text: 'Chat with Citiworksng Support',
  },
  {
    logo: 'ios-call',
    Text: 'Call Citworksng Support',
  },
  {
    logo: 'ios-chatboxes',
    Text: 'Frequently Asked Questions (FAQ)',
  },
  {
    logo: 'ios-today',
    Text: 'Terms and Conditions/Privacy Policy',
  },
];
