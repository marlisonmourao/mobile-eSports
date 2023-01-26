import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Game } from '../screens/Game'
import { Home } from '../screens/Home'


type AppRouteProps = {
  home: undefined;
  game: { 
    id: string, 
    bannerUrl: string, 
    title: string
  };
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRouteProps>

const { Navigator, Screen } = createNativeStackNavigator<AppRouteProps>()

export function AppRoutes() {
  return(
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen 
        name='home'
        component={Home}
      />

      <Screen 
        name='game'
        component={Game}
      />
    </Navigator>
  )
}