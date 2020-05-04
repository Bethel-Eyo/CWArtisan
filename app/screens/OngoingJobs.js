import React from 'react';
import styled from 'styled-components';
import JobsComp from '../components/JobsComp';
import {
  StatusBar,
  Text,
  Alert,
  TouchableOpacity,
  AsyncStorage,
  BackHandler,
  Button,
} from 'react-native';
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

class OngoingJobs extends React.Component {
  state = {
    jobs: [],
    visibility: false,
  };

  componentDidUpdate() {
    if (this.props.action == 'goToTracker') {
      this.setState({
        visibility: true,
      });
    }
  }

  componentDidMount() {
    this.getOngoingJobs();
  }

  getUserName = async userId => {
    try {
      const value = await AsyncStorage.getItem('artisanToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + value,
      };
      axios
        .get(Domain + 'api/artisans/get-user/' + userId, {
          headers: headers,
        })
        .then(response => {
          return (
            response.data.user[0].user.first_name +
            ' ' +
            response.data.user[0].user.last_name
          );
        });
    } catch (error) {
      // Error retrieving data
      Alert.alert('A try catch error occured!');
    }
  };

  getUserPhoto = async userId => {
    try {
      const value = await AsyncStorage.getItem('artisanToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + value,
      };
      axios
        .get(Domain + 'api/artisans/get-user/' + userId, {
          headers: headers,
        })
        .then(response => {
          return response.data.user[0].profile_picture;
        });
    } catch (error) {
      // Error retrieving data
      Alert.alert('A try catch error occured!');
    }
  };

  getOngoingJobs = async () => {
    try {
      const value = await AsyncStorage.getItem('artisanToken');
      const id = await AsyncStorage.getItem('userId');

      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + value,
      };

      axios
        .get(Domain + 'api/aritsans/get-ongoing-jobs/' + id, {
          headers: headers,
        })
        .then(response => {
          this.setState({
            jobs: response.data.jobs,
          });
        });
    } catch (error) {
      // Error retrieving data
      Alert.alert('A try catch error occured!');
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

  storeJobId = async jobId => {
    try {
      await AsyncStorage.setItem('jobId', jobId);
      this.props.navigation.navigate('JST');
    } catch (error) {
      // Error retrieving data
      Alert.alert('An error occured during the try catch session!');
    }
  };

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor="#AC5428" />
        {this.state.jobs.map((job, index) => (
          <View key={index}>
            {visibility == true && this.storeJobId(job.id)}
            <JobsComp
              name={this.getUserName(job.user_id)}
              location={job.job_location}
              photo={this.getUserPhoto(job.user_id)}
              category={job.category}
              date={job.created_at}
              status="ongoing"
              color="#c85a23"
            />
            <HorizontalView />
          </View>
        ))}
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OngoingJobs);

const Container = styled.View`
  flex: 1;
`;

const View = styled.View`
  width: 100%;
`;

const HorizontalView = styled.View`
  background: #cccccc;
  height: 1px;
  width: 100%;
  margin-left: 20px;
  margin-top: 10px;
`;
