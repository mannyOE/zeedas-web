import DoughnutChart from 'pages/project/overview/_components/doughnut-chart';
import React from "react";


const chartBG = ['#4DBD98'];
const chartData = ['38'];
const labels = [
  'Hours Spent',
];

const HourSpentCopy = () => {
  return (
    <div className="HourSpent">
      {/* <DoughnutChart
        doughnutData={chartData}
        backgroundColor={chartBG}
        cutoutPercentage={70}
        labels={labels}
        width={166}
        height={166}
      />
      <div className="chart-text">
        <span className=" font-16">
          128 <br />
          days
        </span>
        <span className=" sub-text font-12 mt-2">
          Timeline <br /> extension
        </span>
      </div> */}
    </div>
  );
};

export default HourSpentCopy;
