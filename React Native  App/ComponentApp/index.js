/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Stack_Navigation from './Components/Stack_Navigation';
import Tab_Navigation from './Components/Tab_Navigation';
import Drawer_Navigation from './Components/Drawer_Navigation';
import Hook from './Components/Hook';
import Form from './Components/Form';
import FlatListComponent from './Components/FlatListComponent';
import Scroll from './Components/Scroll';

AppRegistry.registerComponent(appName, () => App);
