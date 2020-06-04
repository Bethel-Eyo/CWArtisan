import React from 'react';
import styled from 'styled-components';
import {Platform, Alert, StatusBar, Animated, AsyncStorage} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import JobNotifComp from '../components/JobNotifComp';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';
import Domain from '../constants/Domain';
import Socket from '../constants/Socket';
import PushNotification from 'react-native-push-notification';

function mapStateToProps(state) {
  return {action: state.action};
}

function mapDispatchToProps(dispatch) {
  return {
    openRequest: () =>
      dispatch({
        type: 'OPEN_REQUEST',
      }),
    closeRequest: () =>
      dispatch({
        type: 'CLOSE_REQUEST',
      }),
  };
}

class JobZoneScreen extends React.Component {
  static navigationOptions = {
    title: 'Job Zone',
  };

  state = {
    region: {
      latitude: 10,
      longitude: 10,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    opacity: new Animated.Value(1),
    userName: '',
    userAddress: '',
    userPhoto: '',
    userDevice: '',
  };

  constructor(props) {
    super(props);

    //this.socket = io('http://citiworksApi.test:3000', {jsonp: false});
    this.socket = io(Socket, {jsonp: false});
    this.socket.on(
      'citiworks-artisan-request:App\\Events\\UserReqArtisan',
      data => {
        console.log('Data Received', data);
        this.checkBroadcast(
          data.artisanId,
          data.userId,
          data.category,
          data.location,
          this.socket,
        );
        //this.getUserDetails(data.userId, data.category, data.location);
      },
    );
    this.socket.on('disconnect', function() {
      console.log('Client disconnected');
    });
  }

  configurePushNotification = () => {
    console.log('belacrus is called');
    const that = this;
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        Alert.alert(token.token);
        console.log('token: ' + token.token);
        that.setState({name: token.token});
        that.getPrevDeviceToken(token.token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        setTimeout(() => {
          if (!notification['foreground']) {
            ToastAndroid.show("You've clicked!", ToastAndroid.SHORT);
          }
        }, 1);
        PushNotification.localNotificationSchedule({
          title: 'Notification with my name',
          message: notification['userId'], // (required)
          date: new Date(Date.now()), // in 60 secs
        });
      },
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      senderID: '156486116617',

      popInitialNotification: true,
      requestPermissions: true,
    });
  };

  getPrevDeviceToken = async token => {
    try {
      const value = await AsyncStorage.getItem('artisanToken');
      const id = await AsyncStorage.getItem('userId');
      if (value !== null) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + value,
        };
        axios
          .get(Domain + 'api/artisans/get-device-token/' + id, {
            headers: headers,
          })
          .then(response => {
            // set a flag to know if user already has a previous token
            if (response.data.device.length !== 0) {
              this.updateDeviceToken(value, id, token);
            } else {
              this.storeDeviceToken(value, token);
            }
          })
          .catch(error => {
            Alert.alert('An error occured! ' + error.message);
          });
      }
    } catch (error) {
      // Error retrieving data
      Alert.alert('Error occured during the try catch');
    }
  };

  storeDeviceToken = (artisanToken, deviceToken) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + artisanToken,
    };

    let toks = {
      device_token: deviceToken,
    };

    axios
      .post(Domain + 'api/artisans/store-device', toks, {
        headers: headers,
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        Alert.alert('An error occured! ' + error.message);
      });
  };

  updateDeviceToken(artisanToken, userId, deviceToken) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + artisanToken,
    };

    let toks = {
      device_token: deviceToken,
      user_id: userId,
    };

    axios
      .post(Domain + 'api/artisans/update-device', toks, {
        headers: headers,
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        Alert.alert('An error occured! ' + error.message);
      });
  }

  checkBroadcast = async (artisanId, userId, category, location, socks) => {
    try {
      const id = await AsyncStorage.getItem('userId');
      if (id !== null) {
        if (artisanId == id) {
          console.log('The right artisan');
          this.getUserDetails(userId, category, location, socks);
        } else {
          socks.disconnect();
          console.log('Not this artisan');
        }
      }
    } catch (error) {
      // Error retrieving data
      Alert.alert('A try catch error occured!');
      socks.disconnect();
      console.log('Error while checking artisan');
    }
  };

  storeUserName = async userName => {
    try {
      await AsyncStorage.setItem('userName', userName);
    } catch (error) {}
  };

  retrieveUserName = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      if (name !== null) {
        this.setState({
          userName: name,
        });
      }
    } catch (error) {}
  };

  storeUserAddress = async userAddress => {
    try {
      await AsyncStorage.setItem('userAddress', userAddress);
    } catch (error) {}
  };

  retrieveUserAddress = async () => {
    try {
      const address = await AsyncStorage.getItem('userAddress');
      if (address !== null) {
        this.setState({
          userAddress: address,
        });
      }
    } catch (error) {}
  };

  storeUserPhoto = async userPhoto => {
    try {
      await AsyncStorage.setItem('userPhoto', userPhoto);
    } catch (error) {}
  };

  retrieveUserPhoto = async () => {
    try {
      const photo = await AsyncStorage.getItem('userPhoto');
      if (photo !== null) {
        this.setState({
          userPhoto: photo,
        });
      }
    } catch (error) {}
  };

  storeClient = async (clientID, category, location) => {
    try {
      await AsyncStorage.setItem('clientID', clientID);
      await AsyncStorage.setItem('category', category);
      await AsyncStorage.setItem('location', location);
    } catch (error) {}
  };

  getUserDetails = async (id, category, location, socks) => {
    this.storeClient(id, category, location);
    try {
      const value = await AsyncStorage.getItem('artisanToken');
      if (value !== null) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + value,
        };

        axios
          .get(Domain + 'api/artisans/get-user/' + id, {
            headers: headers,
          })
          .then(response => {
            console.log('Got the user');
            this.setState({
              userName:
                response.data.user[0].user.first_name +
                ' ' +
                response.data.user[0].user.last_name,
              userAddress: response.data.user[0].address,
              userPhoto: response.data.user[0].profile_picture,
            });
            this.props.openRequest();
            socks.disconnect();
          })
          .catch(error => {
            Alert.alert('An error occured! ' + error.message);
            socks.disconnect();
            console.log('Error occured while getting user');
          });
      }
    } catch (error) {
      // Error retrieving data
      Alert.alert('A try catch error occured!');
      socks.disconnect();
      console.log('error occured with async');
    }
  };

  // storeJobTime = async time => {
  //   try {
  //     await AsyncStorage.setItem('jobTime', time);
  //   } catch (error) {
  //     // Error retrieving data
  //     Alert.alert('A try catch error occured!');
  //   }
  // };

  getUserDevice = async () => {
    try {
      const token = await AsyncStorage.getItem('artisanToken');
      const clientID = await AsyncStorage.getItem('clientID');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      };

      axios
        .get(Domain + 'api/artisans/get-user-device' + clientID, {
          headers: headers,
        })
        .then(response => {
          this.setState({
            userDevice: response.data.device.device_token,
          });
          this.acceptJobRequest(this.state.userDevice);
        })
        .catch(error => {
          Alert.alert('An error occured! ' + error.message);
        });
    } catch (error) {
      // Error retrieving data
      Alert.alert('A try catch error occured!');
    }
  };

  acceptJobRequest = async userDevice => {
    try {
      const token = await AsyncStorage.getItem('artisanToken');
      const clientID = await AsyncStorage.getItem('clientID');
      const artisanID = await AsyncStorage.getItem('userId');
      const category = await AsyncStorage.getItem('category');
      const location = await AsyncStorage.getItem('location');

      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      };

      let accepted = {
        user_id: clientID,
        artisan_id: artisanID,
        category: category,
        job_location: location,
        user_device: userDevice,
      };
      axios
        .post(Domain + 'api/artisans/accept-user-request', accepted, {
          headers: headers,
        })
        .then(response => {
          if (response.data.messageType == 'success') {
            Alert.alert(response.data.message);
            // this.storeJobTime(response.data.job.created_at);
            this.props.navigation.replace('Jobs');
          } else {
            Alert.alert('Acceptance sent but something is not right!');
          }
        })
        .catch(error => {
          Alert.alert('An error occured! ' + error.message);
        });
    } catch (error) {
      // Error retrieving data
      Alert.alert('A try catch error occured!');
    }
  };

  showRequest = () => {
    if (this.props.action == 'openRequest') {
      Animated.spring(this.state.opacity, {
        toValue: 0.5,
      }).start();
    }

    if (this.props.action == 'closeRequest') {
      Animated.spring(this.state.opacity, {
        toValue: 1,
      }).start();
    }
  };

  componentDidUpdate() {
    if (this.props.action == 'openJobTracker') {
      this.getUserDevice();
    }
    this.showRequest();
    // this.retrieveUserName();
    // this.retrieveUserAddress();
  }

  componentDidMount() {
    this.requestLocationPermission();
    this.showRequest();
    this.configurePushNotification();
    // this.retrieveUserName();
    // this.retrieveUserAddress();
  }

  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iPhone ' + response);

      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('Android ' + response);

      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    }
  };

  locateCurrentPosition = () => {
    console.log('locate position has been called');
    Geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        this.setState({location});

        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0521,
        };
        this.setState({initialPosition});
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
    );
  };

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor="#AC5428" />
        <AnimatedContainer style={{opacity: this.state.opacity}}>
          <MapView
            provider={PROVIDER_GOOGLE}
            ref={map => (this._map = map)}
            showsUserLocation={true}
            style={{height: '100%'}}
            initialRegion={this.state.initialPosition}>
            <Marker coordinate={{latitude: 37.78825, longitude: -122.4324}}>
              <Callout>
                <Text>Hello Sanfrancisco</Text>
              </Callout>
            </Marker>
          </MapView>
        </AnimatedContainer>

        <JobNotifComp
          name={this.state.userName}
          address={this.state.userAddress}
          photo={this.state.userPhoto}
        />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobZoneScreen);

const Container = styled.View``;

const Casing = styled.View``;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Text = styled.Text``;
