import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
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
  };
}

class JobNotifComp extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <ProfilePix source={require('../assets/userdp.jpg')} />
          <Column>
            <Name>Kamila Sulaiman</Name>
            <Location>Lekki, Lagos, Nigeria.</Location>
          </Column>
        </Row>
        <TouchableOpacity>
          <CallBtn>
            <Icon name="ios-call" size={20} color="rgba(0, 0, 0, 0.5)" />
            <CallBtnText>Call</CallBtnText>
          </CallBtn>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.openJobTracker();
          }}>
          <Button>
            <BtnText>Accept</BtnText>
          </Button>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobNotifComp);

const Container = styled.View`
  height: 180px;
  width: 330px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  margin-bottom: 15px;
`;

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

const CallBtnText = styled.Text`
  margin-left: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
`;
