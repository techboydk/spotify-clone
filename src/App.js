import React, { useEffect } from 'react'
import Login from './components/Login'
import Main from './components/Main';
import { getTokenFromUrl } from './utils/spotify'
import { useStateProvider } from './utils/StateProvider';
//import SpotifyWebApi from 'spotify-web-api-js'



//const spotify = new SpotifyWebApi();


const App = () => {
  const [{token}, dispatch] = useStateProvider();

  useEffect(()=>{
    const _token = getTokenFromUrl().access_token;
    if(_token){
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      })
      //window.location.hash = "";
    }
  },[token, dispatch])

  return (
   <div className="app">
      {
        token ? <Main/> : <Login/>
      }
   </div>
  )
}

export default App;
