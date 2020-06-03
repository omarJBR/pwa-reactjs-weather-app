import React from 'react';
import { withRouter } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <a className="nav navbar-brand">Weather App</a>
      </nav>
    </div>
  );
}

export default withRouter(Navbar);
