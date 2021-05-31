import React from 'react';
import './style.scss';

const OverviewPerformanceActivities = ({ className }) => {
    const PerformanceActivitiesCard = ({
      textTop,
      cardLabel,
      textBottomLeft,
      textBottomRight,
      className,
    }) => (
      <div
        className={`PerformanceActivitiesCard p-3 d-flex flex-column justify-content-between ${className}`}
      >
        <div className="font-weight-bold">{textTop}</div>
        <hr className="w-100 my-1" />
        <div className="d-flex align-items-center justify-content-between">
          <span className="font-8">{textBottomLeft}</span>
          <span className="font-8">{textBottomRight}</span>
        </div>
        <div className="font-14 font-family-futura font-weight-bold">
          {cardLabel}
        </div>
      </div>
    );
  
    return (
      <div className={`OverviewPerformanceActivities ${className}`}>
        <h2 className="font-18 pb-3 mb-4">Performance Activities</h2>
        <div className="row">
          <div className="col-md-3 h-100">
            <PerformanceActivitiesCard
              className="c-purple"
              textTop={
                <div className="font-28 font-family-futura">
                  18 <span className="font-10">days</span>
                </div>
              }
              textBottomLeft="2 projects"
              cardLabel="Deadline Missed"
            />
          </div>
  
          <div className="col-md-3 h-100">
            <PerformanceActivitiesCard
              className="c-pink"
              textTop={
                <div className="font-28 font-family-futura">
                  18 <span className="font-10">days</span>
                </div>
              }
              textBottomLeft="2 projects"
              textBottomRight="5 developers"
              cardLabel="Total time lost"
            />
          </div>
  
          <div className="col-md-3 h-100">
            <PerformanceActivitiesCard
              className="c-green"
              textTop={<div className="font-28 font-family-futura">$150</div>}
              textBottomLeft="2 projects"
              textBottomRight="5 developers"
              cardLabel="Total Cost Lost"
            />
          </div>
  
          <div className="col-md-3 h-100">
            <PerformanceActivitiesCard
              className="c-orange"
              textTop={<div className="font-28 font-family-futura">$150</div>}
              cardLabel="Total cost saved"
            />
          </div>
  
          <div className="col-md-3 h-100">
            <PerformanceActivitiesCard
              className="c-blue"
              textTop={<div className="font-28 font-family-futura">18</div>}
              cardLabel="Under Utilized 
            Resources"
            />
          </div>
        </div>
      </div>
    );
  };
 
export default OverviewPerformanceActivities;