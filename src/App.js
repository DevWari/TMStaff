import React, {useEffect} from 'react'
import { Provider } from "react-redux"
import { setTopLevelNavigator } from 'src/utils/navigation';
import { RootNavigator } from 'src/navigation/AppNavigation';
import { configureStore } from 'src/store/configureStore';
import SplashScreen from 'react-native-splash-screen';


const store = configureStore();

const App = () => {

  useEffect (()=> {
    SplashScreen.hide();
  }, [])

  return (    
    <Provider store={store}>        
      <RootNavigator
        ref={(navigatorRef) => {
          setTopLevelNavigator(navigatorRef);
        }}
      />        
    </Provider>
  )
}
export default App
