import React from 'react';
import styled from 'styled-components';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CarouselComp from '../components/CarouselComp';
import {Dimensions, Alert, BackHandler} from 'react-native';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {action: state.action};
}

function mapDispatchToProps(dispatch) {
  return {
    homeMode: () =>
      dispatch({
        type: 'HOME_MODE',
      }),
  };
}

class SliderScreen extends React.Component {
  static navigationOptions = {
    title: 'Job Status Tracker',
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

  state = {
    activeSlide: 0,
    items: [
      {
        status: 'confirm arrival',
      },
      {
        status: 'confirm diagnosis check',
      },
      {
        status: 'confirm job completion',
      },
    ],
  };

  _renderItem({item, index}) {
    return (
      <View key={index}>
        <CarouselComp data={item.status} />
      </View>
    );
  }

  get pagination() {
    return (
      <Pagination
        dotsLength={this.state.items.length}
        activeDotIndex={this.state.activeSlide}
        containerStyle={{backgroundColor: '#C85A23'}}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    return (
      <Container>
        <Carousel
          ref={ref => (this.carousel = ref)}
          data={this.state.items}
          renderItem={this._renderItem}
          onSnapToItem={index => this.setState({activeSlide: index})}
          sliderWidth={Dimensions.get('window').width}
          removeClippedSubviews={false}
          itemWidth={320}
        />
        {this.pagination}
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderScreen);

const Container = styled.View`
  flex: 1;
`;

const View = styled.View`
  align-items: center;
  justify-content: center;
`;
