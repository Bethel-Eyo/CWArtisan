import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const navigation = useNavigation();

const DoubleLayout = props => (
  <Container style={{elevation: 4}}>
    <Row>
      <TouchableOpacity
        onPress={() => {
          if (props.row == 'one') {
            Alert.alert('Wallet');
          } else if (props.row == 'two') {
            navigation.navigate('JobHist');
          }
        }}>
        <LinearLayout>
          <CircularView>
            <Icon name={props.firstName} size={26} color="#C85A23" />
          </CircularView>
          <Text>{props.firstLabel}</Text>
        </LinearLayout>
      </TouchableOpacity>
      <VerticalView />
      <TouchableOpacity
        onPress={() => {
          if (props.row == 'one') {
            Alert.alert('Job Tracker');
          } else if (props.row == 'two') {
            Alert.alert('Support');
          }
        }}>
        <LinearLayout>
          <CircularView style={{elevation: 4}}>
            <Icon name={props.secondName} size={23} color="#C85A23" />
          </CircularView>
          <Text>{props.secondLabel}</Text>
        </LinearLayout>
      </TouchableOpacity>
    </Row>
  </Container>
);

export default DoubleLayout;

const Text = styled.Text`
  font-size: 15px;
  margin-top: 10px;
  color: rgba(44, 63, 112, 0.74);
`;

const Row = styled.View`
  flex-direction: row;
`;

const VerticalView = styled.View`
  height: 120px;
  width: 1px;
  background: #cccccc;
`;

const LinearLayout = styled.View`
  align-items: center;
  justify-content: center;
  width: 142px;
  height: 120px;
`;

const Container = styled.View`
  height: 120px;
  width: 285px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #cccccc;
`;

const CircularView = styled.View`
  border: 1px solid #c85a23;
  height: 46px;
  width: 46px;
  border-radius: 23px;
  background: #ffffff;
  justify-content: center;
  align-items: center;
`;
