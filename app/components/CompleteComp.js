import styled from 'styled-components';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

class CompleteComp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
          <CircularView>
            <Icon name="ios-hammer" size={34} color="rgba(200, 90, 35, 0.9)" />
          </CircularView>
          <Column>
            <Category>{this.props.category}</Category>
            <Title>{this.props.title}</Title>
            <Row>
              <TimeTxt>5:00pm</TimeTxt>
              <DateTxt>{this.props.date}</DateTxt>
            </Row>
          </Column>
        </Row>

        <Row style={{position: 'absolute', top: 35, right: 10}}>
          <Icon
            name="ios-pin"
            size={18}
            color="rgba(200, 90, 35, 0.9)"
            style={{marginRight: 5}}
          />
          <LocationTxt>{this.props.location}</LocationTxt>
        </Row>
      </Container>
    );
  }
}

export default CompleteComp;

const Container = styled.View`
  width: 100%;
  height: 90px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const Column = styled.View``;

const CircularView = styled.View`
  top: 15;
  bottom: 58.15%;
  border: rgba(200, 90, 35, 0.9);
  border-radius: 30px;
  height: 60px;
  width: 60px;
  justify-content: center;
  align-items: center;
`;

const Category = styled.Text`
  font-size: 15px;
  color: #cccccc;
  font-weight: 600;
  margin-left: 15px;
  margin-top: 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  margin-left: 15px;
  margin-top: 3px;
`;

const DateTxt = styled.Text`
  margin-left: 5px;
  margin-top: 5px;
`;

const TimeTxt = styled.Text`
  margin-left: 15px;
  margin-top: 5px;
`;

const LocationTxt = styled.Text`
  color: 'rgba(200, 90, 35, 0.9)';
`;
