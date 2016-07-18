import React from 'react';
import {connect} from 'react-redux';
import HeaderComponent from '../../header/HeaderComponent';

const Header = connect()(HeaderComponent);
export default Header;
