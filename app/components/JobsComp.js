import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, Alert, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {action: state.action};
}

function mapDispatchToProps(dispatch) {
  return {
    goToTracker: () =>
      dispatch({
        type: 'GO_TO_TRACKER',
      }),
  };
}

class JobsComp extends React.Component {
  storeJobId = async jobId => {
    try {
      await AsyncStorage.setItem('jobId', jobId);
      console.log('stored');
    } catch (error) {
      // Error retrieving data
      Alert.alert('An error occured during the try catch session!');
    }
  };

  render() {
    return (
      <Container>
        <FirstRow>
          <ProfilePicture source={{uri: this.props.photo}} />
          <View>
            <Row>
              <Hint>Client Name:</Hint>
              <Name>{this.props.name}</Name>
            </Row>
            <Row>
              <Hint>Category:</Hint>
              <Value>{this.props.category}</Value>
            </Row>
            {/* <SecondRow>
              <Tip>You placed a Job for</Tip>
              <JobTitle>Door Fixing</JobTitle>
            </SecondRow> */}
            <SecondRow>
              {/* <Icon name="ios-timer" size={24} color="#c85a23" />
              <Time>2pm</Time> */}
              <Icon name="ios-calendar" size={24} color="#c85a23" />
              <Time>{this.props.date}</Time>
            </SecondRow>
          </View>
        </FirstRow>
        <ThirdRow>
          <Icon name="ios-pin" size={24} color="#c85a23" />
          <Time>{this.props.location}</Time>
          <TouchableOpacity
            onPress={() => {
              this.storeJobId(this.props.jobId);
              this.props.goToTracker();
            }}>
            <Button style={{elevation: 7}}>
              <BtnText>Go to Tracker</BtnText>
            </Button>
          </TouchableOpacity>
        </ThirdRow>
      </Container>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(JobsComp);

const ProfilePicture = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  margin: 10px;
`;

const Time = styled.Text`
  font-size: 14px;
  margin-left: 5px;
  margin-right: 15px;
`;

const JobTitle = styled.Text`
  font-size: 17px;
  margin-left: 5px;
  color: #c85a23;
`;

const Tip = styled.Text`
  font-size: 15px;
  color: #818a9f;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

const ThirdRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
  margin-left: 20px;
`;

const SecondRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
`;

const View = styled.View`
  margin-top: 7px;
`;

const FirstRow = styled.View`
  flex-direction: row;
`;

const Hint = styled.Text`
  font-size: 15px;
  color: #818a9f;
`;

const Name = styled.Text`
  font-size: 22px;
  margin-left: 10px;
`;

const Value = styled.Text`
  font-size: 15px;
  margin-left: 10px;
`;

const Container = styled.View`
  background: white;
`;

const Button = styled.View`
  width: 140px;
  height: 38px;
  justify-content: center;
  align-items: center;
  background: #c85a23;
  border-radius: 30px;
  box-shadow: 0 10px 10px #c2cbff;
  bottom: 0;
`;

const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
`;
