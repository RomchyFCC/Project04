
import React from 'react';

const Header = props => {
  return (
    <header className="header" >
      <h1 onClick={props.toggleRecipe.bind(this)} >Roman's Cookbook</h1>
    </header>
  );
}

export default Header;