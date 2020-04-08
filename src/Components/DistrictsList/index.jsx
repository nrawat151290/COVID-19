import React from 'react';
import { sortByNumberAndAlphabeticOrder } from './../../Utils/Sorting';
import Fade from '@material-ui/core/Fade';
import './districtsList.scss';

const DistrictsList = (props) => {
  const { districts = {}, state } = props;
  const district = districts[state] || {};
  let { districtData = {} } = district;
  const districtsArray = Object.keys(districtData || {}).map((district) => {
    return { ...districtData[district], name: district };
  })
  districtData = sortByNumberAndAlphabeticOrder(districtsArray, 'confirmed', 'name');
  return (
    <ul className="districts-list">
      {
        districtData.map((district) => {
          let countClassName = "districts-list-item__count";
          let countModifier = "";
          let listModifier = "";
          if (district.confirmed <= 5) {
            countModifier = " districts-list-item__count--low";
            listModifier = " districts-list-item--low";
          } else if (district.confirmed > 5 && district.confirmed <= 30) {
            countModifier = " districts-list-item__count--avg";
            listModifier = " districts-list-item--avg";
          } else if (district.confirmed > 30) {
            countModifier = " districts-list-item__count--high";
            listModifier = " districts-list-item--high";
          }
          countClassName = countClassName + countModifier;

          let listClassName = `districts-list-item districts-list-item--${district.name} ${listModifier}`;
          return (
            <Fade
              in={true}
              timeout={1800}
              key={`district-${district.name}`}
            >
              <li
                className={listClassName}
              >
                <span className="districts-list-item__name">{district.name}</span>
                <span className={countClassName}>{district.confirmed}</span>
                <div className="clearfix" />
              </li>
            </Fade>
          )
        })
      }
    </ul>
  )
}

export default DistrictsList;