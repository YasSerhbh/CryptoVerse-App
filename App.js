import { Provider } from 'react-redux';
import store from './redux/store';
import Application from './Application';


export default function App() {



  return (
    <Provider store={store}>
        <Application />
    </Provider>
  );
}


// Primary #6651a4
// 2eme Color: #c3bbd5