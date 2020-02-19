import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {action: state.action};
}

function mapDispatchToProps(dispatch) {
  return {
    openJobHist: () =>
      dispatch({
        type: 'OPEN_JOB_HIST',
      }),
    homeJobTracker: () =>
      dispatch({
        type: 'HOME_JOB_TRACKER',
      }),
    openWallet: () =>
      dispatch({
        type: 'OPEN_WALLET',
      }),
    openSupport: () =>
      dispatch({
        type: 'OPEN_SUPPORT',
      }),
  };
}

class DoubleLayout extends React.Component {
  render() {
    return (
      <Container style={{elevation: 2}}>
        <Row>
          <TouchableOpacity
            onPress={() => {
              if (this.props.row == 'one') {
                this.props.openWallet();
              } else if (this.props.row == 'two') {
                this.props.openJobHist();
              }
            }}>
            <LinearLayout>
              <CircularView>
                <Icon name={this.props.firstName} size={26} color="#C85A23" />
              </CircularView>
              <Text>{this.props.firstLabel}</Text>
            </LinearLayout>
          </TouchableOpacity>
          <VerticalView />
          <TouchableOpacity
            onPress={() => {
              if (this.props.row == 'one') {
                this.props.homeJobTracker();
              } else if (this.props.row == 'two') {
                this.props.openSupport();
              }
            }}>
            <LinearLayout>
              <CircularView style={{elevation: 4}}>
                <Icon name={this.props.secondName} size={23} color="#C85A23" />
              </CircularView>
              <Text>{this.props.secondLabel}</Text>
            </LinearLayout>
          </TouchableOpacity>
        </Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoubleLayout);

const Text = styled.Text`
  font-size: 15px;
  margin-top: 10px;
  color: rgba(44, 63, 112, 0.74);
  font-family: Ionicons;
`;

const Row = styled.View`
  flex-direction: row;
`;

const VerticalView = styled.View`
  height: 120px;
  width: 1px;
  background: #cccccc;
`;

const LinearLayout = styled.View`
  align-items: center;
  justify-content: center;
  width: 142px;
  height: 120px;
`;

const Container = styled.View`
  height: 120px;
  width: 285px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #cccccc;
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
