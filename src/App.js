import React, {useEffect} from 'react'
import {View, Text} from 'react-native'
import { Provider } from "react-redux"
import { setTopLevelNavigator } from 'src/utils/navigation';
import { RootNavigator } from 'src/navigation/AppNavigation';
import SplashScreen from 'react-native-splash-screen';
// import { configureStore } from 'src/store/configureStore';

// const store = configureStore();

const App = () => {

  useEffect (()=> {
    SplashScreen.hide();
  }, [])

  return (
    <RootNavigator
      ref={(navigatorRef) => {
        setTopLevelNavigator(navigatorRef);
      }}
    />
  )
}

export default App
