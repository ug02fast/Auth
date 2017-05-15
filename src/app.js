import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Card, Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBDqXkrBknUvOo2tGAsI0gLFdgQaDHaH5A',
      authDomain: 'authentication-ebfc7.firebaseapp.com',
      databaseURL: 'https://authentication-ebfc7.firebaseio.com',
      projectId: 'authentication-ebfc7',
      storageBucket: 'authentication-ebfc7.appspot.com',
      messagingSenderId: '784071597447'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()}>
                Log Out
              </Button>
            </CardSection>
          </Card>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  spinnerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default App;
