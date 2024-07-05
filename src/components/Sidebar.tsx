import React from 'react';
import { Link, useLocation } from "react-router-dom";

type Props = {
  onChangeSideBar: (title: string) => void,
};
const Sidebar: React.FC<any> = (props: Props) => {
  const location = useLocation();
  function onChangeSideBar(value: string) {
    return props.onChangeSideBar(value);
  }

  return (
    <aside >
      <div className="columnOne">

        <h2 className="logo"> <img src="./images/logo.png" alt="logo" /></h2>

        <ul className="mt-4">
          <li><Link to="/" className={location.pathname === "/" ? "linkSelected" : ""}
            onClick={() => onChangeSideBar('Accueil')} >Accueil</Link></li>
          <li><Link to="/tasks" className={location.pathname === "/tasks" ? "linkSelected" : ""} 
          onClick={() => onChangeSideBar('Tâches')}>Tâches</Link></li>
          <li><Link to="/about" className={location.pathname === "/about" ? "linkSelected" : ""} 
          onClick={() => onChangeSideBar('A propos')}>A propos</Link></li>
        </ul>
        
      </div>
    </aside>
  );
}
export default Sidebar;