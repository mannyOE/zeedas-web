import React, { useState } from 'react';
import DoughnutChart from '../doughnut-chart';
import './style.scss';

const chartBG = ['#00858D', '#FFCD3F', '#EB5757', '#1A0C2F'];
const chartData = ['38', '48', '18', '68'];
const labels = [
  'New Features',
  'Deadline Misssed',
  'Low Acurracy',
  'Late QA Testing',
];

const ProjectPerformanceSummary = () => {
  return (
    <div className="ProjectPerformanceSummary pt-4">
      <div className="ProjectPerformanceSummary__header px-4 pb-3">
        <h2 className="font-20 font-weight-bold">Performance Summary</h2>
        <p className="font-12 m-0">
          Activities of issues assigned and initiated over time
        </p>
      </div>
      {/* <div className="ProjectPerformanceSummary__body px-4 pt-3">
        <div
          className="row no-gutters"
          
        >
          <div className="col-md-5">
            <div className="chart h-100 d-flex align-items-center">
              <DoughnutChart
                doughnutData={chartData}
                backgroundColor={chartBG}
                labels={labels}
              />
            </div>
          </div>
          <div className="col-md-7">
            <div className="chart-legend py-4">
              {labels.map((item, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center py-2 font-14"
                >
                  <div
                    className="indicator"
                    style={{ backgroundColor: chartBG[index] }}
                  ></div>
                  <span className="mx-3">{chartData[index]}%</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ProjectPerformanceSummary;
