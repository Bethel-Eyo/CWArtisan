import React from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import {Alert} from 'react-native';
import Socket from '../constants/Socket';

class SocketScreen extends React.Component {
  state = {
    name: 'Bobby',
  };

  constructor(props) {
    super(props);

    this.socket = io(Socket, {jsonp: false});
    this.socket.on(
      'citiworks-artisan-request:App\\Events\\UserReqArtisan',
      data => {
        console.log('Data Received', data);
        this.checkIt(data.userId, this.socket);
      },
    );
    this.socket.on('disconnect', function() {
      console.log('Client disconnected');
    });
  }

  checkIt = (id, socks) => {
    this.setState({
      name: id,
    });
    //Alert.alert('function called');
    this.killIt(socks);
  };

  killIt = socks => {
    socks.disconnect();
  };

  render() {
    return (
      <Container>
        <Text>{'Hello ' + this.state.name}</Text>
      </Container>
    );
  }
}

export default SocketScreen;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  font-size: 20px;
`;
