import React, { useState } from 'react';
import IconTrend from 'zeedas-assets/icons/icon-trend';
import AccountAvatar from 'pages/users/user-profile/_components/account-avatar';
import './style.scss';

export const performers = {
  top: [
    {
      name: 'Abel Okon',
      email: 'abel.oken@zeedas.com',
      performance: '8',
    },
    {
      name: 'Abel Okon',
      email: 'abel.oken@zeedas.com',
      performance: '8',
    },
    {
      name: 'Abel Okon',
      email: 'abel.oken@zeedas.com',
      performance: '8',
    },
  ],
  bottom: [
    {
      name: 'Abel Okon',
      email: 'abel.oken@zeedas.com',
      performance: '-8',
    },
    {
      name: 'Abel Okon',
      email: 'abel.oken@zeedas.com',
      performance: '-8',
    },
    {
      name: 'Abel Okon',
      email: 'abel.oken@zeedas.com',
      performance: '-8',
    },
  ],
};

const ProjectTeamMember = ({ member, category }) => (
  <div
    className={`ProjectTeamMember row no-gutters align-items-center px-4 py-3 ${category}`}
  >
    <div className="col-md-6 d-flex align-items-center">
      <AccountAvatar />
      <div className="member-info">
        <div className="member-name font-14 font-weight-bold">
          {member.name}
        </div>
        <div className="member-email font-10">{member.email}</div>
      </div>
    </div>
    <div className="col-md-6 d-flex member-performance align-items-center justify-content-end">
      <div className="member-performance font-14 mr-4 font-weight-bold">
        {member.performance} %
      </div>
      <IconTrend fill={category === 'top' ? '#4DBD98' : ' #EB0E43'} />
    </div>
  </div>
);

const ProjectTeamPerformance = () => {
  const [activeTab, setActiveTab] = useState('top');
  return (
    <div className="ProjectTeamPerformance pt-4 h-100">
      <div className="ProjectTeamPerformance__header px-4">
        <h2 className="font-20 font-weight-bold">Team Perfomance</h2>
        <p className="font-12">
          All issues assigned to you directly, to your team or by your job role
        </p>
      </div>
      <div className="ProjectTeamPerformance__body">
        <div className="ProjectTeamPerformance__tabs">
          <div className="d-flex justify-content-between px-5 font-14">
            <a
              className={`px-3 py-3 ${activeTab == 'top' ? 'active' : ''}`}
              onClick={() => setActiveTab('top')}
            >
              Top Performers
            </a>
            <a
              className={`px-3 py-3 ${activeTab == 'bottom' ? 'active' : ''}`}
              onClick={() => setActiveTab('bottom')}
            >
              Low Performers
            </a>
          </div>
        </div>
        <div className="ProjectTeamPerformance__members py-3 px-4">
          {performers[activeTab].map((member, index) => (
            <ProjectTeamMember
              key={index}
              member={member}
              category={activeTab}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectTeamPerformance;
