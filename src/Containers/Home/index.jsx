import React, { Component } from 'react';
import TextInput from './../../Components/TextInput/TextInput';
import States from './../../Components/States/States';
import ApiRequest from './../../Service/ApiRequest';
import debounce from './../../Utils/debounce';
import { sortByNumberAndAlphabeticOrder } from './../../Utils/Sorting';
import IndianFlagLg from './../../assets/images/india-flag-icon-64.png';
import './home.scss';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      states: [],
      searched: false,
      total: {}
    };
    this.minCharsToSearch = 2;
    this.fetchDataSuccess = this.fetchDataSuccess.bind(this);
    this.fetchDataError = this.fetchDataError.bind(this);
    this.searchState = this.searchState.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }
  fetchData() {
    ApiRequest({
      url: "master",
      type: "GET"
    }, null, this.fetchDataSuccess, this.fetchDataError)
  }
  componentDidMount() {
    this.fetchData();
    setInterval(this.fetchData, 60 * 60 * 1000);
  }
  fetchDataSuccess(states) {
    states = sortByNumberAndAlphabeticOrder(states.statewise, 'confirmed', 'state', true);
    const itemToBeRemoved = states.find((state, index) => {
      return "total".equalsIgnoreCase(state.state);
    });
    states.splice(states.indexOf(itemToBeRemoved), 1);
    this.setState({
      states: states,
      filteredStates: states,
      total: itemToBeRemoved
    });
  }
  fetchDataError(error) {
  }
  searchState(query = "") {
    const { states } = this.state;
    if (query.length > this.minCharsToSearch || query.length === 0) {
      let filteredStates = states.filter(({ state = "" }) => {
        state = state.toLowerCase();
        query = query.toLowerCase();
        return state.includes(query);
      });
      filteredStates = sortByNumberAndAlphabeticOrder(filteredStates, 'total', 'state', true);
      this.setState({
        filteredStates,
        searched: true
      });
    } else {
      this.setState({
        searched: false
      });
    }
  }
  render() {
    const { filteredStates, searched, total = {} } = this.state;
    let updatedTime = total.lastupdatedtime;
    if (updatedTime) {
      const dateArr = updatedTime.split('/');
      updatedTime = `${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`;
      const format = 'DD/MM/YYYY hh:mm:ss A';
      updatedTime = window.moment(new Date(updatedTime)).format(format);
    }
    return (
      <div className="covid-container">
        <div className="header">
          <h2>COVID-19 Tracker</h2>
          <div className="india">
            <picture>
              <source media="(min-width: 1024px)" srcSet={IndianFlagLg} />
              <img alt="cube" src={IndianFlagLg} />
            </picture>
          </div>
          <div className="totals">
            {
              Boolean(updatedTime) &&
              <div className="totals__lastupdated">
                Last updated on {updatedTime}
              </div>
            }
            <div className="totals__confirmed totals__elem">
              <div className="label"><b>CONFIRMED</b></div>
              <div className="count">{total.confirmed}</div>
            </div>
            <div className="totals__active totals__elem">
              <div className="label"><b>ACTIVE</b></div>
              <div className="count">{total.active}</div>
            </div>
            <div className="totals__recovered totals__elem">
              <div className="label"><b>RECOVERED</b></div>
              <div className="count">{total.recovered}</div>
            </div>
            <div className="totals__deaths totals__elem">
              <div className="label"><b>DEATHS</b></div>
              <div className="count">{total.deaths}</div>
            </div>
          </div>
          <TextInput
            search={debounce(this.searchState, 300)}
            hasError={searched && !filteredStates.length}
          />
        </div>
        <States
          data={filteredStates}
        />
      </div>
    )
  }
}

export default Home;