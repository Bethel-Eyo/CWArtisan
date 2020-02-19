import React from 'react';
import styled from 'styled-components';
import FAQComp from '../components/FAQComp';
import {ScrollView, SafeAreaView, StatusBar} from 'react-native';

class FAQScreen extends React.Component {
  static navigationOptions = {
    title: 'Frequently Asked Questions',
    headerStyle: {
      backgroundColor: '#C85A23',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor="#AC5428" />
        <SafeAreaView>
          <ScrollView>
            {questions.map((question, index) => (
              <FAQComp
                key={index}
                title={question.title}
                data={question.data}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </Container>
    );
  }
}

export default FAQScreen;

const Container = styled.View`
  flex: 1;
`;

const questions = [
  {
    title: 'How do i talk to a Citiworks Customer care?',
    data:
      'Biryani also known as biriyani, biriani, birani or briyani, is a' +
      'mixed rice dish with its origins among the Muslims of the Indian subcontinent.' +
      ' This dish is especially popular throughout the Indian subcontinent, as well as ' +
      'among the diaspora from the region. It is also prepared in other regions such as ' +
      'Iraqi Kurdistan.',
  },
  {
    title: 'Having issues navigating with the app ?',
    data:
      'Biryani also known as biriyani, biriani, birani or briyani, is a' +
      'mixed rice dish with its origins among the Muslims of the Indian subcontinent.' +
      ' This dish is especially popular throughout the Indian subcontinent, as well as ' +
      'among the diaspora from the region. It is also prepared in other regions such as ' +
      'among the diaspora from the region. It is also prepared in other regions such as ' +
      'among the diaspora from the region. It is also prepared in other regions such as ' +
      'Iraqi Kurdistan.',
  },
  {
    title: 'How do i know more?',
    data:
      'Biryani also known as biriyani, biriani, birani or briyani, is a' +
      'mixed rice dish with its origins among the Muslims of the Indian subcontinent.' +
      ' This dish is especially popular throughout the Indian subcontinent, as well as ' +
      'among the diaspora from the region. It is also prepared in other regions such as ' +
      'Iraqi Kurdistan.',
  },
  {
    title: 'How do i add money to my wallet?',
    data:
      'Biryani also known as biriyani, biriani, birani or briyani, is a' +
      'mixed rice dish with its origins among the Muslims of the Indian subcontinent.' +
      ' This dish is especially popular throughout the Indian subcontinent, as well as ' +
      'among the diaspora from the region. It is also prepared in other regions such as ' +
      'Iraqi Kurdistan.',
  },
  {
    title: 'Non Veg Biryanis?',
    data:
      'Biryani also known as biriyani, biriani, birani or briyani, is a' +
      'mixed rice dish with its origins among the Muslims of the Indian subcontinent.' +
      ' This dish is especially popular throughout the Indian subcontinent, as well as ' +
      'among the diaspora from the region. It is also prepared in other regions such as ' +
      'among the diaspora from the region. It is also prepared in other regions such as ' +
      'among the diaspora from the region. It is also prepared in other regions such as ' +
      'Iraqi Kurdistan.',
  },
  {
    title: 'Pizzas ?',
    data:
      'Biryani also known as biriyani, biriani, birani or briyani, is a' +
      'mixed rice dish with its origins among the Muslims of the Indian subcontinent.' +
      ' This dish is especially popular throughout the Indian subcontinent, as well as ' +
      'among the diaspora from the region. It is also prepared in other regions such as ' +
      'Iraqi Kurdistan.',
  },
  {
    title: 'Drinks',
    data:
      'Biryani also known as biriyani, biriani, birani or briyani, is a' +
      'mixed rice dish with its origins among the Muslims of the Indian subcontinent.' +
      ' This dish is especially popular throughout the Indian subcontinent, as well as ' +
      'among the diaspora from the region. It is also prepared in other regions such as ' +
      'among the diaspora from the region. It is also prepared in other regions such as ' +
      'among the diaspora from the region. It is also prepared in other regions such as ' +
      'among the diaspora from the region. It is also prepared in other regions such as ' +
      'Iraqi Kurdistan.',
  },
  {
    title: 'Deserts',
    data:
      'Biryani also known as biriyani, biriani, birani or briyani, is a' +
      'mixed rice dish with its origins among the Muslims of the Indian subcontinent.' +
      ' This dish is especially popular throughout the Indian subcontinent, as well as ' +
      'among the diaspora from the region. It is also prepared in other regions such as ' +
      'Iraqi Kurdistan.',
  },
];
