import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { signUserOut } from 'blockstack';

export default class NavBar extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  state = {
    showUserMenu: false,
    timeoutReference: null,
  };

  componentWillMount() {
    // this.setState({
    //   person: new Person(loadUserData().profile),
    // });
  }

  getUserMenuClass = showUserMenu => {
    const classText = 'nav-item dropdown pull-xs-right';
    if (showUserMenu) {
      return `${classText} show`;
    }
    return classText;
  };

  closeUserMenu = () => {
    this.setState({ showUserMenu: false });
  };

  navMouseLeave = () => {
    if (this.state.showUserMenu) {
      this.clearTimeoutReference();
      this.setState({ timeoutReference: setTimeout(this.closeUserMenu, 500) });
    }
  };

  navMouseEnter = () => {
    if (this.state.showUserMenu) {
      this.clearTimeoutReference();
    }
  };

  clearTimeoutReference = () => {
    const { timeoutReference } = this.state;
    if (timeoutReference !== null) {
      clearTimeout(timeoutReference);
    }
  };

  handleSignOut = e => {
    e.preventDefault();
    this.closeUserMenu();
    signUserOut(window.location.origin);
  };

  toggleMenu = e => {
    const { showUserMenu } = this.state;
    e.preventDefault();
    this.setState({ showUserMenu: !showUserMenu });
  };

  renderUserMenu = () => {
    const { user } = this.props;
    const { showUserMenu } = this.state;

    return (
      <ul className="nav navbar-nav">
        <li
          className={this.getUserMenuClass(showUserMenu)}
          onMouseLeave={this.navMouseLeave}
          onMouseEnter={this.navMouseEnter}
        >
          <button
            className="nav-link dropdown-toggle link-button"
            aria-haspopup="true"
            aria-expanded={showUserMenu}
            onClick={this.toggleMenu}
          >
            <img
              src={user.avatarUrl()}
              className="img-circle tiny d-inline-block align-top"
              id="avatar-image"
              alt="avatar"
            />&nbsp;
            {user.name()}
          </button>
          <div className={`dropdown-menu ${showUserMenu ? 'show' : ''}`}>
            <Link
              className="dropdown-item nav-link"
              target="_blank"
              to="http://localhost:8888/profiles"
              onClick={this.closeUserMenu}
            >
              Profile
            </Link>
            <Link
              className="dropdown-item nav-link"
              target="_blank"
              to="http://www.blockstack.org"
              onClick={this.closeUserMenu}
            >
              Blockstack
            </Link>
            <div className="dropdown-divider" />
            <button
              className="dropdown-item log-out-link button-link"
              href="#"
              onClick={this.handleSignOut}
            >
              Logout
            </button>
          </div>
        </li>
      </ul>
    );
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-faded">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <i className="fa fa-arrow-circle-up" aria-hidden="true" /> UpSkill
          </Link>
          {this.renderUserMenu()}
        </div>
      </nav>
    );
  }
}
