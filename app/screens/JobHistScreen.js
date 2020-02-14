import React from 'react';
import styled from 'styled-components';
import HistoryComp from '../components/HistoryComp';
import {SafeAreaView, ScrollView, BackHandler} from 'react-native';
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

class JobHistScreen extends React.Component {
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackClicked(),
    );
  }

  handleBackClicked = () => {
    this.props.homeMode();
  };

  static navigationOptions = {
    title: 'Job History',
  };

  render() {
    return (
      <Container>
        <SafeAreaView>
          <ScrollView>
            {histories.map((history, index) => (
              <HistoryComp
                key={index}
                costOfMaterials={history.costOfMaterials}
                serviceCharge={history.serviceCharge}
                citiworksCommission={history.citiworksCommission}
                netIncome={history.netIncome}
                initialBalance={history.initialBalance}
                currentBalance={history.currentBalance}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobHistScreen);

const Container = styled.View`
  background: #cccccc;
  flex: 1;
  padding-bottom: 30px;
`;

const histories = [
  {
    costOfMaterials: '$3500.00',
    serviceCharge: '$1500.00',
    citiworksCommission: '$300.00',
    netIncome: '$1200.00',
    initialBalance: '$5000.00',
    currentBalance: '$6200.00',
  },
  {
    costOfMaterials: '$3500.00',
    serviceCharge: '$1500.00',
    citiworksCommission: '$300.00',
    netIncome: '$1200.00',
    initialBalance: '$5000.00',
    currentBalance: '$6200.00',
  },
  {
    costOfMaterials: '$3500.00',
    serviceCharge: '$1500.00',
    citiworksCommission: '$300.00',
    netIncome: '$1200.00',
    initialBalance: '$5000.00',
    currentBalance: '$6200.00',
  },
  {
    costOfMaterials: '$3500.00',
    serviceCharge: '$1500.00',
    citiworksCommission: '$300.00',
    netIncome: '$1200.00',
    initialBalance: '$5000.00',
    currentBalance: '$6200.00',
  },
  {
    costOfMaterials: '$3500.00',
    serviceCharge: '$1500.00',
    citiworksCommission: '$300.00',
    netIncome: '$1200.00',
    initialBalance: '$5000.00',
    currentBalance: '$6200.00',
  },
];
