import React from 'react';
import './style.scss';
import CardComponent from 'zeedas-components/card';
import TabNavigation from 'zeedas-components/tab-navigation';
import CompletedTasksList from '../completed-tasks-list';
import WorkSummaryList from '../work-summary-list';
import HourSpent from '../hour-spent';

const completedTasksList = [
  { title: 'Interview with users' },
  { title: 'Creating Lunch announcement bills' },
  { title: 'Chat Bot Screen App' },
];

const tabNavigationTitles = [
  { tabId: 1, title: 'Work Summary' },
  { tabId: 2, title: 'Hour Spent' },
  { tabId: 3, title: 'Completed Task' },
  { tabId: 4, title: 'Uncompleted Task' },
];

/* Dummy Data */
const CompletedTasks = [
  {
    title: 'Interview with users',
    appIcon: '',
    date: 'Oct 12',
  },
  {
    title: 'Interview with users',
    appIcon: '',
    date: 'Oct 12',
  },
  {
    title: 'Interview with users',
    appIcon: '',
    date: 'Oct 12',
  },
  {
    title: 'Interview with users',
    appIcon: '',
    date: 'Oct 12',
  },
  {
    title: 'Interview with users',
    appIcon: '',
    date: 'Oct 12',
  },
];

const tabNavigationContents = [
  { contentId: 1, content: <WorkSummaryList data={[]} /> },
  { contentId: 2, content: <HourSpent data={[]} /> },
  {
    contentId: 3,
    content: <CompletedTasksList data={[]} dummyData={CompletedTasks} />,
  },
  { contentId: 4, content: <CompletedTasksList data={[]} dummyData={CompletedTasks}/> },
];

const TasksBreakdown = ({ className }) => (
  <div className={`${className}`}>
    <CardComponent height={'487px'} className="p-0">
      <div className="py-3">
        <TabNavigation
          contentClassName="px-3"
          className="pt-3"
          titleSize={12}
          titleStyles={{ paddingBottom: '13px', fontWeight: 600, opacity: 0.8 }}
          tabNavigationTitles={tabNavigationTitles}
          tabNavigationContents={tabNavigationContents}
        />
      </div>
    </CardComponent>
  </div>
);

export default TasksBreakdown;
