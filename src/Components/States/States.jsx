import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Avatar from './../Avatar/Avatar';

import './States.scss';

class States extends Component {
  renderStates() {
    const { data = [] } = this.props;
    let content = null;
    content = data.map((state, index) => {
      return (
        <Link
          key={state.statecode}
          to={`${state.confirmed > 0 ? `/${state.state}/districts` : "/"}`}
        >
          <Avatar
            state={state}
            className={(index + 1) % 3 === 0 ? "card-avatar--last-item" : (index + 1) % 2 === 0 ? "card-avatar--second-item" : ""}
          />
        </Link >
      )
    });
    return content;
  }
  render() {
    return (
      <div className="states">
        {this.renderStates()}
      </div>
    )
  }
}

export default States;