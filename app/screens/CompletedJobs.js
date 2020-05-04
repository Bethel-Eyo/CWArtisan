import React from 'react';
import styled from 'styled-components';
import CompleteComp from '../components/CompleteComp';
import axios from 'axios';
import Domain from '../constants/Domain';
import {AsyncStorage} from 'react-native';

class CompletedJobs extends React.Component {
  state = {
    jobs: [],
  };

  componentDidMount() {
    this.getCompletedJobs();
  }

  getCompletedJobs = async () => {
    try {
      const value = await AsyncStorage.getItem('artisanToken');
      if (value !== null) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + value,
        };

        const id = await AsyncStorage.getItem('userId');

        axios
          .get(Domain + 'api/artisans/get-completed-jobs/' + id, {
            headers: headers,
          })
          .then(response => {
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

  render() {
    return (
      <Container>
        {this.state.jobs.map((job, index) => (
          <View key={index}>
            <CompleteComp
              category={job.category}
              title={job.job_title}
              date={job.created_at}
              location={job.job_location}
            />
            <HorizontalView />
          </View>
        ))}
      </Container>
    );
  }
}

export default CompletedJobs;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  padding-left: 15px;
`;

const HorizontalView = styled.View`
  background: #cccccc;
  height: 1px;
  width: 100%;
  margin-left: 10px;
`;

const View = styled.View`
  width: 100%;
`;
