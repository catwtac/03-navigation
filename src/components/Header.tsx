import React from 'react';

const Header: React.FC<any> = (props) => {
  
  return (
    <header className="header">
      <div className="header">
        {props.title}
      </div>

    </header>
  );
}

export default Header;