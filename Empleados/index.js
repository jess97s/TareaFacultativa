/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Empleado from './src/Empleado/contenedores/empleado-contenedor';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Empleado);
