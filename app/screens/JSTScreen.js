import React from 'react';
import styled from 'styled-components';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CarouselComp from '../components/CarouselComp';
import {Dimensions, Alert} from 'react-native';

class JSTScreen extends React.Component {
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
      <View>
        <CarouselComp key={index} data={item.status} />
      </View>
    );
  }

  get pagination() {
    return (
      <Pagination
        dotsLength={this.state.items.length}
        activeDotIndex={this.state.activeSlide}
        containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
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
          itemWidth={330}
        />
        {this.pagination}
      </Container>
    );
  }
}

export default JSTScreen;

const Container = styled.View`
  flex: 1;
`;

const View = styled.View`
  align-items: center;
  justify-content: center;
`;
