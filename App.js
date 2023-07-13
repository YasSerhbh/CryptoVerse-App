import { Provider } from 'react-redux';
import store from './redux/store';
import Application from './Application';
import registerNNPushToken from 'native-notify';
import { NATIVE_APP_ID, NATIVE_APP_TOKEN } from './KEYS';
import 'react-native-url-polyfill/auto';



export default function App() {

    registerNNPushToken(NATIVE_APP_ID, NATIVE_APP_TOKEN);

  return (
    <Provider store={store}>
        <Application />
    </Provider>
  );
}


// Primary #6651a4
// 2eme Color: #c3bbd5