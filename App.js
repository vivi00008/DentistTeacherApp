import React, { useState, useContext} from "react"
import * as Font from "expo-font"
import AppLoading from "expo-app-loading"
import { UserContext, UserProvider } from "./src/context/UserContext"
import LoginScreen from "./src/screens/LoginScreen"
import MainApp from "./src"

const Render = () => {
    const user = useContext(UserContext)
    return (
        <React.Fragment>
            {user?.isAuth ? <MainApp /> : <LoginScreen />}
        </React.Fragment>
    )
}

function App() {
    const [fontsLoad, setFontsLoad] = useState(false)

    async function getFonts(){
      await Font.loadAsync({
          'kanitRegular': require("./assets/fonts/Kanit-Regular.ttf"),
          'kanitBold': require('./assets/fonts/Kanit-Bold.ttf'),
          'kanitSemiBold':require('./assets/fonts/Kanit-SemiBold.ttf')
      })
      setFontsLoad(true)
  }

    if (fontsLoad) {
        return (
            <UserProvider>
                <Render />
            </UserProvider>
        )
    } else {
        return (
            <AppLoading
                startAsync={getFonts}
                onFinish={() => setFontsLoad(true)}
                onError={console.warn}
            />
        )
    }
}

export default App
