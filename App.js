import React from 'react';
import App from './js/App';

export default class App1 extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      fontLoaded: false,
    };
  }

   async componentWillMount() {
     await Expo.Font.loadAsync({
      'Roboto': require('./native-base-theme/Fonts/Roboto.ttf'),
      'Roboto_medium': require('./native-base-theme/Fonts/Roboto_medium.ttf')
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if (this.state.fontLoaded) {
        return <App />;
    } else {
        return null;
    }

  }
}
