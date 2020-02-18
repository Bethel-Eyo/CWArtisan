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
} from 'react-native';
import {FloatingTitleTextInputField} from '../components/FloatingHintInput';
import Icon from 'react-native-vector-icons/Ionicons';

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
    activateConfirmJobDone: () =>
      dispatch({
        type: 'ACTIVATE_CONFIRM_JOB_DONE',
      }),
  };
}

class JSTScreen extends React.Component {
  static navigationOptions = {
    title: 'Job Status Tracker',
  };

  _updateMasterState = (attrName, value) => {
    this.setState({[attrName]: value});
  };

  componentDidUpdate() {
    if (this.props.action == 'confirmArrival') {
      this.confirmArrival();
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
    firstTip: 'waiting for the user to confirm arrival',
    secondTip: 'waiting for user to confirm diagnosis',
    thirdTip: 'waiting for user to confirm job completion',
    top: new Animated.Value(screenHeight),
    scale: new Animated.Value(1.3),
    translateY: new Animated.Value(0),
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
          toValue: screenHeight,
          duration: 0,
        }).start();

        Animated.spring(this.state.scale, {toValue: 1.3}).start();
      }, 500);

      Animated.spring(this.state.translateY, {
        toValue: 1000,
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
          onPress: () => this.setFirstPhase(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
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
      secondBorderColor: '#2C3F70',
      secondBtnColor: '#c85a23',
      secondDisable: false,
      secondTextColor: '#2C3F70',
      secondTitleColor: '#2C3F70',
      secondValue: 'Pending',
      secondValueColor: '#2C3F70',
    });
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
      thirdBorderColor: '#2C3F70',
      thirdBtnColor: '#c85a23',
      thirdDisable: false,
      thirdTextColor: '#2C3F70',
      thirdTitleColor: '#2C3F70',
      thirdValue: 'Pending',
      thirdValueColor: '#2C3F70',
    });
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
            <Logo source={require('../assets/citiworks_logo.png')} />
            <Title>Costing</Title>
            <Tip>
              Please enter the cost of materials and service charge for the
              execution of the job.
            </Tip>
            <InputView>
              <FloatingTitleTextInputField
                attrName="costOfMaterials"
                title="Cost of Materials"
                value=""
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
                attrName="password"
                title="Service Charge"
                value=""
                updateIconState={() => {}}
                updateBlurState={() => {}}
                updateMasterState={this._updateMasterState}
                otherTextInputProps={{
                  autoCapitalize: 'none',
                }}
              />
            </InputView>
            <TouchableOpacity onPress={this.setSecondPhase}>
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
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JSTScreen);

const Container = styled.View`
  align-items: center;
  flex: 1;
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
