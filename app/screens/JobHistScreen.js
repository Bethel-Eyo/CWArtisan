import React from 'react';
import styled from 'styled-components';
import HistoryComp from '../components/HistoryComp';

class JobHistScreen extends React.Component {
  render() {
    return (
      <Container>
        <HistoryComp />
      </Container>
    );
  }
}

export default JobHistScreen;

const Container = styled.View``;
