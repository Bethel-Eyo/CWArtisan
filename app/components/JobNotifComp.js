import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, Dimensions, Animated, Alert} from 'react-native';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {action: state.action};
}

function mapDispatchToProps(dispatch) {
  return {
    openJobTracker: () =>
      dispatch({
        type: 'OPEN_JOB_TRACKER',
      }),
    openRequest: () =>
      dispatch({
        type: 'OPEN_REQUEST',
      }),
    closeRequest: () =>
      dispatch({
        type: 'CLOSE_REQUEST',
      }),
  };
}

const screenHeight = Dimensions.get('window').height;

class JobNotifComp extends React.Component {
  state = {
    top: new Animated.Value(screenHeight),
  };

  componentDidMount() {
    this.showRequest();
  }

  componentDidUpdate() {
    this.showRequest();
  }

  showRequest = () => {
    if (this.props.action == 'openRequest') {
      Animated.spring(this.state.top, {
        toValue: screenHeight - 400,
      }).start();
    }

    if (this.props.action == 'closeRequest') {
      Animated.spring(this.state.top, {
        toValue: screenHeight,
      }).start();
    }
  };

  render() {
    return (
      <AnimatedContainer style={{top: this.state.top}}>
        <Casing>
          <Row>
            <ProfilePix source={require('../assets/userdp.jpg')} />
            <Column>
              <Name>Kamila Sulaiman</Name>
              <Location>Lekki, Lagos, Nigeria.</Location>
            </Column>
          </Row>
          <TouchableOpacity>
            {/* <CallBtn>
            <Icon name="ios-call" size={20} color="rgba(0, 0, 0, 0.5)" />
            <CallBtnText>Call</CallBtnText>
          </CallBtn> */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.openJobTracker();
            }}>
            <Button>
              <BtnText>Accept</BtnText>
            </Button>
          </TouchableOpacity>
          <Linearlayout style={{position: 'absolute', bottom: 10, left: 40}}>
            <CircularView style={{elevation: 4, borderColor: '#288831'}}>
              <Icon name="ios-call" size={23} color="#288831" />
            </CircularView>
            <Text style={{color: '#288831'}}>Call</Text>
          </Linearlayout>
          <Linearlayout style={{position: 'absolute', bottom: 10, right: 40}}>
            <TouchableOpacity onPress={this.props.closeRequest}>
              <CircularView style={{elevation: 4}}>
                <Icon name="ios-close" size={25} color="#C85A23" />
              </CircularView>
            </TouchableOpacity>

            <Text style={{color: '#C85A23'}}>Cancel</Text>
          </Linearlayout>
        </Casing>
      </AnimatedContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobNotifComp);

const Casing = styled.View`
  height: 230px;
  width: 330px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  margin-bottom: 15px;
  position: absolute;
`;

const Container = styled.View`
position: absolute;
  bottom: 20px
  width: 100%;
  align-items: center;`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const ProfilePix = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
`;

const Row = styled.View`
  flex-direction: row;
  margin-top: 15px;
  margin-left: 20px;
`;

const Column = styled.View`
  margin-left: 20px;
`;

const Name = styled.Text`
  font-size: 20px;
`;

const Location = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
`;

const Button = styled.View`
  background: #f24505;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  box-shadow: 0 5px 5px #c2cbff;
  margin-top: 15px;
  width: 280px;
  margin-left: 25px;
`;

const BtnText = styled.Text`
  color: white;
  font-size: 17px;
  text-transform: uppercase;
  font-family: Ionicons;
`;

const CircularView = styled.View`
  border: 1px solid #c85a23;
  height: 46px;
  width: 46px;
  border-radius: 23px;
  background: #ffffff;
  justify-content: center;
  align-items: center;
`;

const CallBtn = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  background: #ffffff;
  border: 0.5px solid #596273;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  margin-left: 100px;
`;

const Text = styled.Text`
  font-size: 17px;
  margin-top: 5px;
`;

const Linearlayout = styled.View`
  align-items: center;
`;

const CallBtnText = styled.Text`
  margin-left: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
`;
