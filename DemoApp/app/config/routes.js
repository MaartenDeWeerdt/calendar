import { StackNavigator } from 'react-navigation';
import { StatusBar } from 'react-native';

import Home from '../screens/Home';
import AddTask from '../screens/AddTask';

export default StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: () => null,
        }
    },
    AddTask: {
        screen: AddTask,
        navigationOptions: {
            header: () => null,
        }
    }
}, {
        mode: 'modal',
        cardStyle: { paddingTop: StatusBar.currentHeight },
        headerMode: 'none'
    })