// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Loading } from './components/LoadingComponent';

const { persistor, store } = ConfigureStore();


export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Jash App</Text>
    //   <Text>Open up App.js to start working on your app...??!</Text>
    //   <StatusBar style="auto" />
    // </View>

    <Provider store={store}>
      <PersistGate
      loading={<Loading/>}
      persistor={persistor}
      >
    <Main />
    </PersistGate>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
