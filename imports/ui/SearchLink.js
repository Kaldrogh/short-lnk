import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';

const muiTheme = getMuiTheme({
  palette: {
      primary1Color: '#ef6c00'
  }
})

const SearchLink = (props) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <TextField onChange={props.onChange} value={props.inputValue} floatingLabelText="Search a Link" name="searchLink" fullWidth={true} onBlur={props.cleanInput}/>
  </MuiThemeProvider>
);

export default SearchLink;
