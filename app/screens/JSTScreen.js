import React from 'react';
import styled from 'styled-components';
import JSTComponent from '../components/JSTComponent';
import {connect} from 'react-redux';
import {
  BackHandler,
  Alert,
  Animated,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import {FloatingTitleTextInputField} from '../components/FloatingHintInput';
import Icon from 'react-native-vector-icons/Ionicons';
import io from 'socket.io-client';
import axios from 'axios';
import Domain from '../constants/Domain';
import Loading from '../lotties/Loading';
import Success from '../lotties/Success';
import Socket from '../constants/Socket';

const screenHeight = Dimensions.get('window').height;

function mapStateToProps(state) {
  return {action: state.action};
}

function mapDispatchToProps(dispatch) {
  return {
    homeMode: () =>
      dispatch({
        type: 'HOME_MODE',
      }),
    undoConfirmArrival: () =>
      dispatch({
        type: 'UNDO_CONFIRM_ARRIVAL',
      }),
    activateConfirmDiagnosis: () =>
      dispatch({
        type: 'ACTIVATE_CONFIRM_DIAGNOSIS',
      }),
    undoConfirmDiagnosis: () =>
      dispatch({
        type: 'UNDO_CONFIRM_DIAGNOSIS',
      }),
    confirmJobDone: () =>
      dispatch({
        type: 'CONFIRM_JOB_DONE',
      }),
    interimJobDone: () =>
      dispatch({
        type: 'INTERIM_JOB_DONE',
      }),
    interimArrival: () =>
      dispatch({
        type: 'INTERIM_ARRIVAL',
      }),
    interimDiagnosis: () =>
      dispatch({
        type: 'INTERIM_DIAGNOSIS',
      }),
    activateConfirmJobDone: () =>
      dispatch({
        type: 'ACTIVATE_CONFIRM_JOB_DONE',
      }),
    undoConfirmJobDone: () =>
      dispatch({
        type: 'UNDO_CONFIRM_JOB_DONE',
      }),
  };
}

class JSTScreen extends React.Component {
  static navigationOptions = {
    title: 'Job Status Tracker',
  };

  constructor(props) {
    super(props);

    this.socket = io(Socket, {jsonp: false});

    // when user confirms arrival
    this.socket.on(
      'artisan-arrival-confirmed:App\\Events\\OnArrivedCon',
      data => {
        console.log('User confirms arrival', data);
        this.checkBroadCastByArtisanId(data.jobId, 'Arrival');
      },
    );

    // when user confirms diagnosis completion
    this.socket.on(
      'job-diagnosis-confirmed:App\\Events\\OnDiagnosedCon',
      data => {
        console.log('User confirms diagnosis completion', data);
        this.checkBroadCastByArtisanId(data.jobId, 'Diagnosis');
      },
    );

    this.socket.on(
      'user-confirms-job-completion:App\\Events\\OnCompletedCon',
      data => {
        console.log('User confirms job completion', data);
        this.checkBroadCastByArtisanId(data.jobId, 'Completion');
      },
    );
  }

  // getActiveJob = () => {
  //   try{
  //     const token = await AsyncStorage.getItem('artisanToken');
  //     const clientID = await AsyncStorage.getItem('clientID');
  //     const jobTime = await AsyncStorage.getItem('jobTime');

  //     const headers = {
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + token,
  //     };

  //     axios.get(Domain + 'api/artisans/get-active-job/'+ clientID + '/' + jobTime, {
  //       headers: headers,
  //     }).then(response => {
  //       this.setState({
  //         jobId: response.data.job.job
  //       });
  //     });
  //   } catch (error) {
  //     // Error retrieving data
  //     Alert.alert('A try catch error occured!');
  //   }
  // };

  checkBroadCastByArtisanId = async (jobId, status) => {
    try {
      const value = await AsyncStorage.getItem('artisanToken');
      const id = await AsyncStorage.getItem('userId');
      if (value !== null) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + value,
        };

        axios
          .get(Domain + 'api/artisans/single-job/' + jobId, {
            headers: headers,
          })
          .then(response => {
            if (id == response.data.job.artisan_id) {
              //this.storeJobId(jobId);
              if (status == 'Arrival') {
                this.setFirstPhase();
              } else if (status == 'Diagnosis') {
                this.setSecondPhase();
              } else if (status == 'Completion') {
                this.setThirdPhase();
              }
            } else {
            }
          })
          .catch(error => {
            Alert.alert('An error occured! ' + error.message);
          });
      }
    } catch (error) {
      // Error retrieving data
      Alert.alert('An error occured during the try catch session!');
    }
  };

  conArrival = async () => {
    this.props.undoConfirmArrival();
    this.setState({isLoading: true});
    try {
      const value = await AsyncStorage.getItem('artisanToken');
      if (value !== null) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + value,
        };

        const job_id = await AsyncStorage.getItem('jobId');

        let id = {
          real_job_id: job_id,
        };

        axios
          .post(Domain + 'api/artisans/create-arrival', id, {
            headers: headers,
          })
          .then(response => {
            console.log(response.data);
            Alert.alert(response.data.message);
            this.setInterimFirstPhase();
            this.setState({isLoading: false});
          })
          .catch(error => {
            Alert.alert('An error occured! ' + error.message);
            this.setState({isLoading: false});
          });
      }
    } catch (error) {
      // Error retrieving data
      Alert.alert('A try catch error occured!');
      this.setState({isLoading: false});
    }
  };

  confirmDiagnosis = async () => {
    // to first make the dialog disappear down
    this.props.undoConfirmDiagnosis();

    this.setState({isLoading: true});
    try {
      const value = await AsyncStorage.getItem('artisanToken');
      if (value !== null) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + value,
        };

        const job_id = await AsyncStorage.getItem('jobId');

        let id = {
          real_job_id: job_id,
          job_title: this.state.jobTitle,
          cost_of_materials: this.state.costOfMaterials,
          service_charge: this.state.serviceCharge,
        };

        axios
          .post(Domain + 'api/artisans/create-diagnosis', id, {
            headers: headers,
          })
          .then(response => {
            console.log(response.data);
            Alert.alert(response.data.message);
            this.setInterimSecondPhase();
            this.setState({isLoading: false});
          })
          .catch(error => {
            Alert.alert('An error occured! ' + error.message);
            this.setState({isLoading: false});
          });
      }
    } catch (error) {
      // Error retrieving data
      Alert.alert('A try catch error occured!');
      this.setState({isLoading: false});
    }
  };

  confirmCompletion = async () => {
    this.props.undoConfirmJobDone();
    this.setState({isLoading: true});
    try {
      const value = await AsyncStorage.getItem('artisanToken');
      if (value !== null) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + value,
        };

        const job_id = await AsyncStorage.getItem('jobId');

        let id = {
          real_job_id: job_id,
        };

        axios
          .post(Domain + 'api/artisans/request-completion', id, {
            headers: headers,
          })
          .then(response => {
            console.log(response.data);
            Alert.alert(response.data.message);
            this.setInterimThirdPhase();
            this.setState({isLoading: false});
          })
          .catch(error => {
            Alert.alert('An error occured! ' + error.message);
            this.setState({isLoading: false});
          });
      }
    } catch (error) {
      // Error retrieving data
      Alert.alert('A try catch error occured!');
      this.setState({isLoading: false});
    }
  };

  _updateMasterState = (attrName, value) => {
    this.setState({[attrName]: value});
  };

  componentDidUpdate() {
    if (this.props.action == 'confirmArrival') {
      this.confirmArrival();
    } else if (this.props.action == 'confirmJobDone') {
      this.confirmJobCompletion();
    }
    this.configureComponent();
  }

  state = {
    firstText: 'I just arrived at the job Location',
    firstTextColor: '#2C3F70',
    secondText: 'I have completed the Diagnosis phase',
    secondTextColor: '#B8BECE',
    thirdText: 'The job have been completed successfully',
    thirdTextColor: '#B8BECE',
    firstValue: 'Pending',
    firstValueColor: '#2C3F70',
    secondValue: 'Not started',
    secondValueColor: '#B8BECE',
    thirdValue: 'Not started',
    thirdValueColor: '#B8BECE',
    incompleteIcon: '',
    completeIcon: '',
    firstTitleColor: '#2C3F70',
    secondTitleColor: '#B8BECE',
    thirdTitleColor: '#B8BECE',
    firstBorderColor: '#2c3f70',
    secondBorderColor: '#B8BECE',
    thirdBorderColor: '#B8BECE',
    firstBtnColor: '#c85a23',
    secondBtnColor: '#B8BECE',
    thirdBtnColor: '#B8BECE',
    firstBtnText: 'confirm',
    secondBtnText: 'confirm',
    thirdBtnText: 'confirm',
    firstDisable: false,
    secondDisable: true,
    thirdDisable: true,
    proceedDisable: true,
    proceedColor: '#B8BECE',
    firstTip: '',
    secondTip: '',
    thirdTip: '',
    top: new Animated.Value(screenHeight + 300),
    scale: new Animated.Value(1.3),
    translateY: new Animated.Value(0),
    isLoading: false,
    isSuccessful: false,
    jobId: '',
    jobTitle: '',
    costOfMaterials: '',
    serviceCharge: '',
  };

  configureComponent = () => {
    if (this.props.action == 'confirmDiagnosis') {
      Animated.timing(this.state.top, {
        toValue: 0,
        duration: 0,
      }).start();

      Animated.spring(this.state.scale, {toValue: 1}).start();
      Animated.spring(this.state.translateY, {
        toValue: 0,
        duration: 0,
      }).start();
    }

    if (
      this.props.action == 'undoConfirmDiagnosis' ||
      this.props.action == 'activateConfirmJobDone'
    ) {
      setTimeout(() => {
        Animated.timing(this.state.top, {
          toValue: screenHeight + 300,
          duration: 0,
        }).start();

        Animated.spring(this.state.scale, {toValue: 1.3}).start();
      }, 500);

      Animated.spring(this.state.translateY, {
        toValue: screenHeight,
        duration: 500,
      }).start();
    }
  };

  confirmArrival = () => {
    Alert.alert(
      'Arrival',
      'Have you met with your client?',
      [
        {
          text: 'Not Yet',
          onPress: () => this.props.undoConfirmArrival(),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => this.conArrival(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  confirmJobCompletion = () => {
    Alert.alert(
      'Job Completion',
      'Is your client satisfied with the Job?',
      [
        {
          text: 'No',
          onPress: () => this.props.undoConfirmJobDone(),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => this.confirmCompletion(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  setInterimFirstPhase = () => {
    this.props.interimArrival();
    this.setState({
      firstBorderColor: '#B8BECE',
      firstBtnColor: '#B8BECE',
      firstDisable: true,
      firstTextColor: '#B8BECE',
      firstTitleColor: '#B8BECE',
      firstTip: 'waiting for the user to confirm arrival',
    });
    // setTimeout(() => {
    //   this.setFirstPhase();
    // }, 3000);
  };

  setFirstPhase = () => {
    this.props.activateConfirmDiagnosis();
    this.setState({
      firstBorderColor: '#30D769',
      firstBtnColor: '#30D769',
      firstBtnText: 'confirmed',
      firstDisable: true,
      firstTextColor: '#30D769',
      firstTitleColor: '#30D769',
      firstValue: 'Arrived',
      firstValueColor: '#30D769',
      firstTip: '',
      secondBorderColor: '#2C3F70',
      secondBtnColor: '#c85a23',
      secondDisable: false,
      secondTextColor: '#2C3F70',
      secondTitleColor: '#2C3F70',
      secondValue: 'Pending',
      secondValueColor: '#2C3F70',
    });
  };

  setInterimSecondPhase = () => {
    this.props.interimDiagnosis();
    this.setState({
      secondBorderColor: '#B8BECE',
      secondBtnColor: '#B8BECE',
      secondDisable: true,
      secondTextColor: '#B8BECE',
      secondTitleColor: '#B8BECE',
      secondTip: 'waiting for the user to confirm Diagnosis',
    });
    // setTimeout(() => {
    //   this.setSecondPhase();
    // }, 3000);
  };

  setSecondPhase = () => {
    this.props.activateConfirmJobDone();
    this.setState({
      secondBorderColor: '#30D769',
      secondBtnColor: '#30D769',
      secondBtnText: 'confirmed',
      secondDisable: true,
      secondTextColor: '#30D769',
      secondTitleColor: '#30D769',
      secondValue: 'Completed',
      secondValueColor: '#30D769',
      secondTip: '',
      thirdBorderColor: '#2C3F70',
      thirdBtnColor: '#c85a23',
      thirdDisable: false,
      thirdTextColor: '#2C3F70',
      thirdTitleColor: '#2C3F70',
      thirdValue: 'Pending',
      thirdValueColor: '#2C3F70',
    });
  };

  setInterimThirdPhase = () => {
    this.props.interimJobDone();
    this.setState({
      thirdBorderColor: '#B8BECE',
      thirdBtnColor: '#B8BECE',
      thirdDisable: true,
      thirdTextColor: '#B8BECE',
      thirdTitleColor: '#B8BECE',
      thirdTip: 'waiting for the user to confirm Job completion',
    });
    // setTimeout(() => {
    //   this.setThirdPhase();
    // }, 3000);
  };

  setThirdPhase = () => {
    this.setState({
      thirdBorderColor: '#30D769',
      thirdBtnColor: '#30D769',
      thirdBtnText: 'confirmed',
      thirdDisable: true,
      thirdTextColor: '#30D769',
      thirdTitleColor: '#30D769',
      thirdValue: 'Completed',
      thirdTip: '',
      thirdValueColor: '#30D769',
      proceedDisable: false,
      proceedColor: '#c85a23',
    });
  };

  // componentDidMount() {
  //   this.retrieveStoredState();
  // }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackClicked(),
    );
  }

  // to store the Job status Tracker redux state
  storeState = async reduxState => {
    try {
      await AsyncStorage.setItem('state', reduxState);
    } catch (error) {}
  };

  // to retrieve the stored redux JST state
  retrieveStoredState = async () => {
    try {
      const storedState = await AsyncStorage.getItem('state');
      if (storedState !== null) {
        if (storedState == 'activateConfirmDiagnosis') {
          this.setFirstPhase();
        } else if (storedState == 'activateConfirmJobDone') {
          this.setSecondPhase();
        } else if (storedState == 'interimArrival') {
          this.setInterimFirstPhase();
        } else if (storedState == 'interimDiagnosis') {
          this.setInterimSecondPhase();
        } else if (storedState == 'interimJobDone') {
          this.setInterimThirdPhase();
        } else {
          this.props.undoConfirmArrival();
        }
      }
    } catch (error) {}
  };

  handleBackClicked = () => {
    //this.storeState(this.props.action);
    this.props.homeMode();
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle="light-content" backgroundColor="#AC5428" />
        <ScrollView style={{height: '100%'}}>
          <Container>
            <JSTComponent
              title="Arrival"
              titleColor={this.state.firstTitleColor}
              value={this.state.firstValue}
              valueColor={this.state.firstValueColor}
              text={this.state.firstText}
              textColor={this.state.firstTextColor}
              btnText={this.state.firstBtnText}
              btnColor={this.state.firstBtnColor}
              borderColor={this.state.firstBorderColor}
              tip={this.state.firstTip}
              disable={this.state.firstDisable}
            />
            <JSTComponent
              title="Diagnosis"
              titleColor={this.state.secondTitleColor}
              value={this.state.secondValue}
              valueColor={this.state.secondValueColor}
              text={this.state.secondText}
              textColor={this.state.secondTextColor}
              btnText={this.state.secondBtnText}
              btnColor={this.state.secondBtnColor}
              borderColor={this.state.secondBorderColor}
              tip={this.state.secondTip}
              disable={this.state.secondDisable}
            />
            <JSTComponent
              title="Job Completion"
              titleColor={this.state.thirdTitleColor}
              value={this.state.thirdValue}
              valueColor={this.state.thirdValueColor}
              text={this.state.thirdText}
              textColor={this.state.thirdTextColor}
              btnText={this.state.thirdBtnText}
              btnColor={this.state.thirdBtnColor}
              borderColor={this.state.thirdBorderColor}
              tip={this.state.thirdTip}
              disable={this.state.thirdDisable}
            />
            <TouchableOpacity
              disable={this.state.disable}
              onPress={() => {
                this.props.navigation.replace('Jobs');
              }}
              style={{marginTop: 30}}>
              <Button style={{backgroundColor: this.state.proceedColor}}>
                <BtnText>Next</BtnText>
              </Button>
            </TouchableOpacity>
            <AnimatedContainer
              style={{
                elevation: 7,
                top: this.state.top,
                transform: [
                  {scale: this.state.scale},
                  {translateY: this.state.translateY},
                ],
                backgroundColor: 'rgba(25,0,0,0.7)',
              }}>
              <Casing>
                {/* <Logo source={require('../assets/citiworks_logo.png')} /> */}
                {/* <Title>Costing</Title> */}
                <Tip>
                  Please enter the cost of materials and service charge for the
                  execution of the job.
                </Tip>
                <InputView>
                  <FloatingTitleTextInputField
                    attrName="jobTitle"
                    title="Job Title"
                    value={this.state.jobTitle}
                    updateIconState={() => {}}
                    updateBlurState={() => {}}
                    updateMasterState={this._updateMasterState}
                    otherTextInputProps={{
                      autoCapitalize: 'none',
                    }}
                  />
                </InputView>
                <InputView>
                  <FloatingTitleTextInputField
                    attrName="costOfMaterials"
                    title="Cost of Materials"
                    value={this.state.costOfMaterials}
                    updateIconState={() => {}}
                    updateBlurState={() => {}}
                    updateMasterState={this._updateMasterState}
                    otherTextInputProps={{
                      autoCapitalize: 'none',
                      keyboardType: 'numeric',
                    }}
                  />
                </InputView>
                <InputView>
                  <FloatingTitleTextInputField
                    attrName="serviceCharge"
                    title="Service Charge"
                    value={this.state.serviceCharge}
                    updateIconState={() => {}}
                    updateBlurState={() => {}}
                    updateMasterState={this._updateMasterState}
                    otherTextInputProps={{
                      autoCapitalize: 'none',
                      keyboardType: 'numeric',
                    }}
                  />
                </InputView>
                <TouchableOpacity onPress={this.confirmDiagnosis}>
                  <Button>
                    <BtnText>Next</BtnText>
                  </Button>
                </TouchableOpacity>
              </Casing>
              <TouchableOpacity
                onPress={() => {
                  this.props.undoConfirmDiagnosis();
                }}>
                <CloseButton style={{elevation: 20}}>
                  <Icon name="ios-close" size={44} color="#546bfb" />
                </CloseButton>
              </TouchableOpacity>
            </AnimatedContainer>
          </Container>
        </ScrollView>
        <Loading isActive={this.state.isLoading} />
        <Success isActive={this.state.isSuccessful} />
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JSTScreen);

const Container = styled.View`
  align-items: center;
  height: 100%;
`;

const Casing = styled.View`
  height: 340px;
  width: 320px;
  align-items: center;
  background: #ffffff;
  border: 1px solid #cccccc;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  align-items: center;
  margin-top: 20%;
`;

const CostContainer = styled.View`
  height: 100%;
  width: 100%;
  position: absolute;
  align-items: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(CostContainer);

const InputView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 0.5px;
  border-color: #596273;
  height: 46px;
  border-radius: 5px;
  margin: 10px 3% 5px 3%;
  background-color: #fff;
  opacity: 0.8;
`;

const Logo = styled.Image`
  width: 97px;
  height: 40px;
  margin-top: 15px;
`;

const Title = styled.Text`
  text-transform: uppercase;
  color: #c85a23;
  font-size: 18px;
  margin-top: 10px;
`;

const Tip = styled.Text`
  color: #b8bece;
  margin-top: 10px;
`;

const Button = styled.View`
  background: #f24505;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  box-shadow: 0 5px 5px #c2cbff;
  margin-top: 10px;
  width: 280px;
`;

const BtnText = styled.Text`
  color: white;
  font-size: 17px;
  text-transform: uppercase;
  font-family: Ionicons;
`;

const CloseButton = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;
