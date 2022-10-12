/**
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {AppRegistry} from 'react-native';
import App from './Navigations/App';
// import Payment from './screens/Cart/Payment';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
