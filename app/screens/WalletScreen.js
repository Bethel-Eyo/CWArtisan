import React from 'react';
import styled from 'styled-components';
import {
  TouchableOpacity,
  StatusBar,
  ScrollView,
  BackHandler,
  AsyncStorage,
  Alert,
} from 'react-native';
import TransactComp from '../components/TransactComp';
import {connect} from 'react-redux';
import axios from 'axios';
import Domain from '../constants/Domain';

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

class WalletScreen extends React.Component {
  state = {
    transactions: [],
  };

  static navigationOptions = {
    title: 'Wallet',
    headerStyle: {
      backgroundColor: '#C85A23',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentDidMount() {
    this.getArtisanTransactions();
  }

  getArtisanTransactions = async () => {
    try {
      const value = await AsyncStorage.getItem('artisanToken');
      if (value !== null) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + value,
        };

        const id = await AsyncStorage.getItem('artisanId');

        axios
          .get(Domain + 'api/artisans/artisan-transactions/' + id, {
            headers: headers,
          })
          .then(response => {
            Alert.alert('success');
            this.setState({
              transactions: response.data.transactions,
            });
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

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackClicked(),
    );
  }

  handleBackClicked = () => {
    this.props.homeMode();
  };

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor="#AC5428" />
        <BalanceContainer style={{elevation: 5}}>
          <Title>Available Balance</Title>
          <BalanceRow>
            <Currency>₦</Currency>
            <Value>5000</Value>
          </BalanceRow>
          <TouchableOpacity>
            <Button
              style={{
                elevation: 5,
                backgroundColor: '#c85a23',
              }}>
              <BtnText>Cash Out</BtnText>
            </Button>
          </TouchableOpacity>
        </BalanceContainer>

        <ScrollView>
          <SubTitle>Transaction History</SubTitle>
          <OuterView>
            {/* {history.map((time, index) => (
              <View key={index}>
                <Date>{time.date}</Date>
                {time.transaction.map((job, position) => (
                  <TouchableOpacity key={position}>
                    <View>
                      <TransactComp
                        title={job.jobTitle}
                        category={job.category}
                        cost={job.amountPaid}
                      />
                      <HorizontalView />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))} */}

            {this.state.transactions.map((transaction, index) => (
              <View key={index}>
                <Date>{transaction.created_at}</Date>
                <TransactComp
                  title={transaction.description}
                  category="Cleaning"
                  cost={transaction.amount}
                />
              </View>
            ))}
          </OuterView>
        </ScrollView>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);

const HorizontalView = styled.View`
  background: #cccccc;
  height: 1px;
  width: 100%;
`;

const SubTitle = styled.Text`
  font-size: 17px;
  text-transform: uppercase;
  color: #596273;
  margin-top: 20px;
  margin-left: 20px;
`;

const View = styled.View``;

const OuterView = styled.View`
  padding-bottom: 20px;
`;

const Date = styled.Text`
  color: #596273;
  font-size: 13px;
  margin-top: 17px;
  margin-left: 20px;
  margin-bottom: 7px;
`;

const Container = styled.View`
  flex: 1;
  background: #f6f9ff;
`;

const BalanceContainer = styled.View`
  align-items: center;
  width: 100%;
  height: 200px;
  background: #ffede4;
  margin-top: 10px;
`;

const BalanceRow = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

const Button = styled.View`
  width: 150px;
  height: 38px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
`;

const BtnText = styled.Text`
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  margin-left: 5px;
`;
const Title = styled.Text`
  font-size: 17px;
  margin-top: 15px;
`;

const Currency = styled.Text`
  font-size: 25px;
`;

const Value = styled.Text`
  font-size: 50px;
`;

const history = [
  {
    date: '25th December 2019',
    transaction: [
      {
        jobTitle: 'Door Fixing',
        category: 'Carpentry',
        amountPaid: '₦3500',
      },
    ],
  },
  {
    date: '29th December 2019',
    transaction: [
      {
        jobTitle: 'Air Condition fixing',
        category: 'Electrical eng.',
        amountPaid: '₦2500',
      },
      {
        jobTitle: 'Chair Making',
        category: 'Carpentry',
        amountPaid: '₦4500',
      },
    ],
  },
  {
    date: '5th January 2020',
    transaction: [
      {
        jobTitle: 'Tap fixing',
        category: 'Plumbing',
        amountPaid: '₦2000',
      },
    ],
  },
  {
    date: '13th January 2020',
    transaction: [
      {
        jobTitle: 'Home Cleaning',
        category: 'Cleaning',
        amountPaid: '₦500',
      },
    ],
  },
];
