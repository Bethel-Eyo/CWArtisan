import React from 'react';
import styled from 'styled-components';
import {Platform, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import JobNotifComp from '../components/JobNotifComp';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {action: state.action};
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
  };

  componentDidUpdate() {
    if (this.props.action == 'openJobTracker') {
      this.props.navigation.navigate('JST');
    }
  }

  componentDidMount() {
    this.requestLocationPermission();
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
        <View>
          <JobNotifComp />
        </View>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(JobZoneScreen);

const Container = styled.View``;

const View = styled.View`
  position: absolute;
  bottom: 20px
  width: 100%;
  align-items: center;
`;

const Text = styled.Text``;
