import React, { Component } from 'react';
import {
  StyleSheet, Text, View
} from 'react-native';
import { Provider, connect } from 'react-redux';
import Loader from 'react-native-mask-loader';
import Estylesheet from 'react-native-extended-stylesheet';

import Navigator from './app/config/routes';
import store from './app/config/store';

Estylesheet.build({})

export default class App extends Component {
  state = {
    appHasLoaded: false,
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        appHasLoaded: true,
      });
    }, 1000);
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Loader
            isLoaded={this.state.appHasLoaded}
            imageSource={require('./app/assets/m.png')}
            backgroundStyle={styles.loadingBackgroundStyle}
          >
            <Navigator />
          </Loader>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingBackgroundStyle: {
    backgroundColor: '#52DF87',
  }
});
