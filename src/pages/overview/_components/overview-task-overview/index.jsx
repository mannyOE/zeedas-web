import React from 'react';
import './style.scss';
import { performers } from '../../../project/overview/_components/project-team-performance/index';
import DoughnutChart from '../../../project/overview/_components/doughnut-chart/index';
import IconArrowTailed from 'zeedas-assets/icons/icon-arrow-tailed';
import colors from 'utils/colors';

const chartBG = ['#00858D', '#FFCD3F', '#EB5757', '#1A0C2F'];
const chartData = ['38', '48', '18', '68'];
const labels = [
  'New Features',
  'Deadline Misssed',
  'Low Acurracy',
  'Late QA Testing',
];

const TaskOverviewSummary = ({}) => {
  return (
    <div className="TaskOverviewSummary p-3">
      {/* <div className="chart d-flex justify-content-center positive-relative">
        <DoughnutChart
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
        </div>
      </div>

      <div className="chart-legend">
        <div className="row">
          {labels.map((item, index) => (
            <div className="col-md-3">
              <div
                key={index}
                className="d-flex flex-column text-center align-items-center py-2 font-14"
              >
                <div
                  className="indicator mb-2"
                  style={{ backgroundColor: chartBG[index] }}
                ></div>
                <span
                  className="font-10 text-center"
                  style={{ color: '#03293D' }}
                >
                  {chartData[index]}%
                </span>
                <span className="font-10 text-center">{item}</span>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

const PerformersCard = ({ category, members, headerText }) => (
  <div className="PerformersCard py-4">
    <h3 className="px-4 pb-3 font-14">{headerText}</h3>
    <div className="Performers">
      {members.map((member) => (
        <div className="Performer d-flex justify-content-between align-items-center py-3 px-4">
          <div className="d-flex align-items-center">
            <span className="member-avatar mr-3"></span>
            <div className="d-flex flex-column">
              <span className="member-name font-14">
                {member.name}
              </span>
              <span className="member-email font-12">{member.email}</span>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <IconArrowTailed
              direction={category === 'top' ? 'up' : 'down'}
              fill={
                category === 'top' ? colors.ZEEDAS_GREEN : colors.ZEEDAS_RED
              }
            />
            <span
              className={`performance-count font-8 ml-2 ${
                category === 'top' ? 'green' : 'red'
              }`}
            >
              {member.performance}%
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const OverviewTaskOverview = ({ className }) => {
  return (
    <div className={`OverviewTaskOverview ${className}`}>
      <h2 className="font-18 pb-3 mb-4">Task Overview</h2>
      <div className="row">
        <div className="col-md-4 h-100">
          <TaskOverviewSummary />
        </div>
        <div className="col-md-4 h-100">
          <div className="OverviewTaskOverview__top-performers">
            <PerformersCard
              members={performers.top}
              headerText="Top Performers"
              category="top"
            />
          </div>
        </div>
        <div className="col-md-4 h-100">
          <PerformersCard
            members={performers.bottom}
            headerText="Bottom Performers"
            category="bottom"
          />
        </div>
      </div>
    </div>
  );
};

export default OverviewTaskOverview;
