import React, { Component } from 'react';
import Fade from '@material-ui/core/Fade';
import ApiRequest from './../../Service/ApiRequest';
import DistrictsList from './../../Components/DistrictsList';
import './districts.scss';

class Districts extends Component {
  constructor() {
    super();
    this.state = {
      districts: {}
    }
    this.fetchData = this.fetchData.bind(this);
    this.fetchDataSuccess = this.fetchDataSuccess.bind(this);
    this.fetchDataError = this.fetchDataError.bind(this);
  }
  componentDidMount() {
    this.fetchData();
    setInterval(this.fetchData, 60 * 60 * 1000);
  }
  fetchData() {
    ApiRequest({
      url: "districts",
      type: "GET"
    }, null, this.fetchDataSuccess, this.fetchDataError)
  }
  fetchDataSuccess(districts) {
    this.setState({
      districts
    });
  }
  fetchDataError(error) {
  }
  render() {
    const { match: { params: { state = "" } = {} } = {} } = this.props;
    const { districts } = this.state;
    const stateDistricts = districts[state] ? districts[state].districtData : {};
    return (
      <div className="districts">
        <h3 className="districts__parent-state">
          {state}
        </h3>
        <Fade in={true} timeout={1800}>
          <h5 className="districts__no-of-districts">
            Showing {Object.keys(stateDistricts).length} districts
        </h5>
        </Fade>
        <DistrictsList
          districts={districts}
          state={state}
        />
      </div>
    );
  }
}

export default Districts;