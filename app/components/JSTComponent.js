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
    confirmArrival: () =>
      dispatch({
        type: 'CONFIRM_ARRIVAL',
      }),
    confirmDiagnosis: () =>
      dispatch({
        type: 'CONFIRM_DIAGNOSIS',
      }),
    confirmJobDone: () =>
      dispatch({
        type: 'CONFIRM_JOB_DONE',
      }),
  };
}

class JSTComponent extends React.Component {
  handleConfirmations = () => {
    if (this.props.title == 'Arrival') {
      this.props.confirmArrival();
    } else if (this.props.title == 'Diagnosis') {
      this.props.confirmDiagnosis();
    } else if (this.props.title == 'Job Completion') {
      this.props.confirmJobDone();
    }
  };

  render() {
    return (
      <Container
        style={{
          elevation: 3,
          borderColor: this.props.borderColor,
          borderWidth: 1,
        }}>
        <Title style={{color: this.props.titleColor}}>{this.props.title}</Title>
        <Text style={{color: this.props.textColor}}>{this.props.text}</Text>
        <Row>
          <Hint>Status:</Hint>
          <Value style={{color: this.props.valueColor}}>
            {this.props.value}
          </Value>
          <Icon name="ios-alert" size={18} color="#6E7A90" />
        </Row>
        <TouchableOpacity
          disabled={this.props.disable}
          onPress={this.handleConfirmations}>
          <Btn style={{backgroundColor: this.props.btnColor}}>
            <BtnText>{this.props.btnText}</BtnText>
          </Btn>
        </TouchableOpacity>
        <Tip>{this.props.tip}</Tip>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JSTComponent);

const Container = styled.View`
  height: 155px;
  background: #ffffff;
  width: 330px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Title = styled.Text`
  font-size: 17px;
  color: #6e7a90;
  font-weight: bold;
  margin-left: 10px;
`;

const Text = styled.Text`
  font-size: 15px;
  color: #2c3f70;
  margin-top: 10px;
  margin-left: 10px;
`;

const Hint = styled.Text`
  color: #b8bece;
`;

const Value = styled.Text`
  margin-left: 5px;
  margin-right: 5px;
`;

const Tip = styled.Text`
  font-size: 15px;
  color: #b8bece;
  margin-top: 15px;
  margin-left: 10px;
`;

const Btn = styled.View`
  height: 35px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  width: 130px;
  margin-left: 10px;
  margin-top: 12px;
`;

const BtnText = styled.Text`
  color: white;
  font-size: 15px;
  text-transform: uppercase;
  font-family: Ionicons;
`;
