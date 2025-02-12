import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    createNavigationContainerRef,

} from '@react-navigation/native';
import TodoListScreen from '../../screens/todos/todosList';

const TodoStack = createNativeStackNavigator();
const NavigationStack = createNativeStackNavigator();

export const TodoScreenStack = (props) => {
    return (
        <TodoStack.Navigator>
            <TodoStack.Screen
                name="TodoScreen"
                options={{
                    title: 'Todo List',
                    
                }}>
                {() => <TodoListScreen {...props} />}
            </TodoStack.Screen>
           
        </TodoStack.Navigator>
    );
};


export const AppNavigator = (props) => {
    return (
        <NavigationStack.Navigator screenOptions={{ headerShown: false, }}>
            <NavigationStack.Screen name="Todo">
                {() => <TodoScreenStack {...props} />}
            </NavigationStack.Screen>

        </NavigationStack.Navigator>
    );
};

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
    // navigationRef.current.getRootState()
    
    if (navigationRef.isReady()) {
        // console.log(navigationRef.current.getRootState());
        // Perform navigation if the react navigation is ready to handle actions
        navigationRef.navigate(name, params);
    } else {
        // You can decide what to do if react navigation is not ready
        // You can ignore this, or add these actions to a queue you can call later
    }
}
