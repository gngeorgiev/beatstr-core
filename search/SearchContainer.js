import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SearchComponent from '../../search/SearchComponent';
import * as searchActions from './searchActions';
import * as favoritesActions from '../favorites/favoritesActions';
import {play} from '../player/playerActions';

function mapStateToProps(state) {
    return {
        dataSource: state.searchResults,
        searchHistory: state.searchHistory
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, searchActions, favoritesActions, {play}), dispatch);
}

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
export default Search;
