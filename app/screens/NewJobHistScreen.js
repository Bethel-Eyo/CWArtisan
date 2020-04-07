import React from 'react';
import styled from 'styled-components';
import {
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
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

class TransactScreen extends React.Component {
  state = {
    jobs: [],
  };

  componentDidMount() {
    this.getArtisanJobs();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackClicked(),
    );
  }

  getArtisanJobs = async () => {
    try {
      const value = await AsyncStorage.getItem('artisanToken');
      if (value !== null) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + value,
        };

        const id = await AsyncStorage.getItem('artisanId');

        axios
          .get(Domain + 'api/artisans/artisan-jobs/' + id, {
            headers: headers,
          })
          .then(response => {
            Alert.alert('success');
            this.setState({
              jobs: response.data.jobs,
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

  handleBackClicked = () => {
    this.props.homeMode();
  };

  static navigationOptions = {
    title: 'Job History',
    headerStyle: {
      backgroundColor: '#C85A23',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor="#AC5428" />
        <SafeAreaView>
          <ScrollView style={{backgroundColor: '#e7ebf4'}}>
            <OuterView>
              {/* {history.map((time, index) => (
                <View key={index}>
                  <Date>{time.date}</Date>
                  {time.transaction.map((job, position) => (
                    <TouchableOpacity
                      key={position}
                      onPress={() => {
                        this.props.navigation.navigate('JobDetail');
                      }}>
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

              {this.state.jobs.map((job, index) => (
                <View key={index}>
                  <Date>{job.created_at}</Date>
                  <TransactComp
                    title={job.job_title}
                    category={job.category}
                    cost={job.net_income}
                  />
                </View>
              ))}
            </OuterView>
          </ScrollView>
        </SafeAreaView>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactScreen);

const Container = styled.View`
  background: #e7ebf4;
  flex: 1;
`;

const HorizontalView = styled.View`
  background: #cccccc;
  height: 1px;
  width: 100%;
`;

const View = styled.View``;

const OuterView = styled.View`
  padding-bottom: 20px;
`;

const Date = styled.Text`
  color: #596273;
  font-weight: bold;
  font-size: 15px;
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 7px;
`;

const history = [
  {
    date: '25th December 2019',
    transaction: [
      {
        jobTitle: 'Janet Wilson',
        category: 'Carpentry',
        amountPaid: 'ikosi, Ketu, Lagos',
      },
    ],
  },
  {
    date: '29th December 2019',
    transaction: [
      {
        jobTitle: 'Aderonke Sulaiman',
        category: 'Electrical eng.',
        amountPaid: 'Abraham Adesanya',
      },
      {
        jobTitle: 'Linda Iweneofu',
        category: 'Carpentry',
        amountPaid: 'Sango tedo',
      },
    ],
  },
  {
    date: '5th January 2020',
    transaction: [
      {
        jobTitle: 'Wofai martins',
        category: 'Plumbing',
        amountPaid: 'Agungi',
      },
    ],
  },
  {
    date: '13th January 2020',
    transaction: [
      {
        jobTitle: 'Thelma Kelechi',
        category: 'Cleaning',
        amountPaid: 'Ogudu, Ojota',
      },
    ],
  },
  {
    date: '29th December 2019',
    transaction: [
      {
        jobTitle: 'Femi Ofi',
        category: 'Electrical eng.',
        amountPaid: 'Mk Abiola Gardens estate',
      },
      {
        jobTitle: 'Emediong Okon',
        category: 'Carpentry',
        amountPaid: 'Oniru, Lagos island',
      },
    ],
  },
  {
    date: '13th January 2020',
    transaction: [
      {
        jobTitle: 'Ekpono Ambrose',
        category: 'Cleaning',
        amountPaid: 'Lekki phase 1',
      },
    ],
  },
];
