import 'react-native-gesture-handler';
import React from 'react';
import MainStack from './sharesomefriends/Navigation/StackNavigation'
// import DrawerNavigator from './sharesomefriends/Navigation/DrawerNavigation';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './sharesomefriends/Navigation/DrawerNavigation';
import reduxStore from './sharesomefriends/ReduxUtils/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

const { store, persistor } = reduxStore()
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>

  )
}
export default App;