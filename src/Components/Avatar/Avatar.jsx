import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactAvatar from 'react-avatar';
import Fade from '@material-ui/core/Fade';
import './avatar.scss';

class Avatar extends Component {
  render() {
    const { state: { state = "", lastupdatedtime = "", confirmed = "", active = "", deaths = "" } = {}, className = "" } = this.props;
    let updatedTime = lastupdatedtime;
    if (updatedTime) {
      const dateArr = updatedTime.split('/');
      updatedTime = `${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`;
      const format = 'DD/MM/YYYY hh:mm:ss A';
      updatedTime = window.moment(new Date(updatedTime)).format(format);
    }
    const classes = `card-avatar ${className}`;
    return (
      <Fade in={true} timeout={1800}>
        <div className={classes}>
          <ReactAvatar name={state} round={true} size="40" />
          <div className="card-avatar-heading">
            {
              state &&
              <div>
                <div className="card-avatar-main">{state}</div>
                {
                  Boolean(updatedTime) &&
                  <div className="last-updated">Updated on {updatedTime}</div>
                }
              </div>
            }
            {
              confirmed &&
              <div className="card-avatar-sub card-avatar-sub--confirmed">
                <span className="label">CONFIRMED</span>
                <span className="count">{confirmed}</span>
              </div>
            }
            {
              active &&
              <div className="card-avatar-sub card-avatar-sub--active">
                <span className="label">ACTIVE</span>
                <span className="count">{active}</span>
              </div>
            }
            {
              deaths &&
              <div className="card-avatar-sub card-avatar-sub--deaths">
                <span className="label">DEATHS</span>
                <span className="count">{deaths}</span>
              </div>
            }
          </div>
          {
            Boolean(updatedTime) &&
            <div className="last-updated last-updated--375">Updated on {updatedTime}</div>
          }
        </div>
      </ Fade>
    )
  }
}

export default Avatar;