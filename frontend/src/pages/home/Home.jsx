import { useAuthStore } from '../../store/authUser'
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";



const Home = () => {
  const {user} = useAuthStore()
  return (
    <>
      {user ? <HomeScreen /> : <AuthScreen />}{/* se existe user vai mostra Home se não authscreen */}
    </>
  )
}

export default Home
