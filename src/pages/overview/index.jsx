import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./style.scss";
import { setPageTitle } from "state/redux/app-header/actions";
import { PAGE_TITLES } from "utils/constants";
import OverviewStatistics from "./_components/overview-statistics";
import OverviewPerformanceActivities from "./_components/overview-performance-activities/index";
import OverviewTaskOverview from "./_components/overview-task-overview/index";
import overviewBG from "./_components/overview-bg-img.svg";

const Overview = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle(PAGE_TITLES.overview));
  }, []);

  return (
    <div className="Overview container">
      <img src={overviewBG} alt="" className="bg-img" />
      <OverviewStatistics />
      <OverviewPerformanceActivities className="mt-5" />
      <OverviewTaskOverview className="mt-5" />
    </div>
  );
};

export default Overview;
