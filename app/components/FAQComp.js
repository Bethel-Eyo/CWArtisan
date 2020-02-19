import styled from 'styled-components';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';

class FAQComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    };
  }

  toggleExpand = () => {
    this.setState({expanded: !this.state.expanded});
  };

  render() {
    return (
      <Container style={{elevation: 2}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 56,
            paddingLeft: 15,
            paddingRight: 13,
            alignItems: 'center',
          }}
          onPress={() => this.toggleExpand()}>
          <Text>{this.props.title}</Text>
          <Icon
            name={
              this.state.expanded ? 'ios-arrow-dropdown' : 'ios-arrow-dropright'
            }
            size={30}
            color="#2C3F70"
          />
        </TouchableOpacity>
        {/* <View /> */}
        {this.state.expanded && (
          <DataView>
            <SubTxt>{this.props.data}</SubTxt>
          </DataView>
        )}
      </Container>
    );
  }
}

export default FAQComp;

const Container = styled.View`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #cccccc;
  margin-top: 5px;
  background: #ffffff;
`;

const DataView = styled.View`
  padding: 15px;
`;

const Text = styled.Text`
  font-size: 15px;
  color: #2c3f70;
`;

const SubTxt = styled.Text`
  color: #2c3f70;
`;
