import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class TextInput extends Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.inputProps = {
      onChange: this.handleChange
    };
  }
  handleChange(event) {
    const { search = () => { } } = this.props;
    this.setState({
      value: event.target.value
    });
    search(event.target.value);
  }
  render() {
    const { value } = this.state;
    const { hasError } = this.props;
    return (
      <TextField
        fullWidth={true}
        error={hasError}
        id="outlined-error-helper-text"
        label="Search State"
        helperText={hasError ? <div><strong>{value}</strong> <span>did not yield any results. Please modify your search</span></div> : ""}
        variant="outlined"
        inputProps={this.inputProps}
        value={value}
      />
    )
  }
}

export default TextInput;