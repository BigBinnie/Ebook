import 'react-native-gesture-handler';
import React from 'react';
import {AsyncStorage, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginView} from './views/LoginView';
import {LoadingView} from './components/Loading';
import {AuthContext} from './context';
import {apiUrl} from './urlconfig';
import Tab from './views/Navigator';
import {newNavigator} from './views/NewNavigator';

const Stack = createStackNavigator();
const CHECK_URL = apiUrl + '/checkSession';

export default function Router() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );
  React.useEffect(() => {
    const Async = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('@eBook:token');
      } catch (e) {}
      fetch(CHECK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          if (responseData.status < 0) {
            AsyncStorage.removeItem('@eBook:token');
            dispatch({type: 'RESTORE_TOKEN', token: null});
          } else {
            dispatch({type: 'RESTORE_TOKEN', token: userToken});
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    Async();
  }, []);
  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async (data) => {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            <Stack.Screen name="Splash" component={LoadingView} />
          ) : state.userToken == null ? (
            <Stack.Screen
              name="Login"
              component={LoginView}
              options={{
                title: 'Log in',
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                headerShown: false,
              }}
            />
          ) : (
            <Stack.Screen
              name="Home"
              component={Tab}
              options={{headerShown: true}}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
