import React from 'react';
import { testStatsSelector } from 'state/redux/test/actions';
import IconBag from 'zeedas-assets/icons/icon-bag';
import './style.scss';
import { connect } from 'react-redux';

const IconBagWrapped = () => (
  <div className="IconBag__wrapper">
    <IconBag />
  </div>
);

const ProjectTestOverview = ({stats}) => {
    const {
        failed,
        improvements,
        passed,
        totalModuleTestCases,
        untested,
        totalModules,
      } = stats;
     
  const TestOverviewCard = ({ cardLabel, topRight, className }) => (
    <div
      className={`ProjectTestOverview__card d-flex flex-column justify-content-between p-3 ${className}`}
    >
      <div className="d-flex align-items-center justify-content-between">
        <IconBagWrapped />
        <div className="font-24 font-weight-bold">{topRight}</div>
      </div>
      <div className="d-flex flex-column">
        <span className="font-14 label">{cardLabel} </span>
      </div>
    </div>
  );

  return (
    <div className="ProjectTestOverview">
      <div className="row" style={{ marginLeft: '-0.5rem', marginRight: '-0.5rem' }}>
        <div className="col-md-6 px-2 mb-3">
          <TestOverviewCard
            className="c-orange"
            topRight={totalModules || 0}
            cardLabel="Total Modules"
          />
        </div>
        <div className="col-md-6 px-2 mb-3">
          <TestOverviewCard
            className="c-coal"
            topRight={improvements || 0}
            cardLabel="Improvement"
          />
        </div>
        <div className="col-md-6 px-2 mb-3">
          <TestOverviewCard
            className="c-blue"
            topRight={totalModuleTestCases || 0}
            cardLabel="Total Modules Test"
          />
        </div>

        <div className="col-md-6 px-2 mb-3">
          <TestOverviewCard
            className="c-pink"
            topRight={failed || 0}
            cardLabel="Total Modules Fail"
          />
        </div>
        <div className="col-md-6 px-2 mb-3">
          <TestOverviewCard
            className="c-green"
            topRight={passed || 0}
            cardLabel="Total Passed"
          />
        </div>
        <div className="col-md-6 px-2 mb-3">
          <TestOverviewCard
            className="c-purple"
            topRight={untested || 0}
            cardLabel="Total Untested"
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
    stats: testStatsSelector(state),
  });

export default connect(mapStateToProps)(ProjectTestOverview);
