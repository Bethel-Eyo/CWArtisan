import React from 'react';
import styled from 'styled-components';
import {Platform, Alert, StatusBar, Animated} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import JobNotifComp from '../components/JobNotifComp';
import {connect} from 'react-redux';

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
      this.props.navigation.navigate('JST');
    }
    this.showRequest();
  }

  componentDidMount() {
    this.requestLocationPermission();
    setTimeout(() => {
      //Alert.alert('set has timed out');
      this.props.openRequest();
    }, 5000);
    this.showRequest();
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

        <JobNotifComp />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobZoneScreen);

const Container = styled.View``;

const Casing = styled.View``;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Text = styled.Text``;
