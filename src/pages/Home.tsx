import React, { useEffect } from 'react';
import { initBrevoTracker

} from '../lib/trackerbrevo'; 

const Home: React.FC = () => {
  useEffect(()=> {
    initBrevoTracker();
  },[]);
  return (
    <div ><h1 >Accueil</h1><p >Bienvenue sur la page d'accueil !</p></div>
  );
}

export default Home;