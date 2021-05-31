import React from 'react';
import {
  Pie,
} from 'react-chartjs-2';
import PropTypes from "prop-types";

const pieDataStructure = (data, backgroundColor, labels) => {
  const pieData = {
    datasets: [{
      data,
      backgroundColor,
    }],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels,
  };
  return pieData;
};

const options = {
  maintainAspectRatio: false,
  responsive: false,
  legend: {
    display: true,
    position: 'right',
    align: 'start',
    labels: {
      // boxWidth: 30,
      padding: 18,
      usePointStyle: true,
    },
  },
  layout: {
    padding: {
      // left: 50,
      right: 0,
      top: 10,
      bottom: 10,
    },
  },
};
const PieChart = ({ pieData, backgroundColor, labels }) => (
  <div
    style={{
      position: 'relative',
    }}
  >
    <Pie
      data={() => pieDataStructure(pieData, backgroundColor, labels)}
      width={250}
      height={131}
      options={options}
      // options={{ maintainAspectRatio: false }}
      // labels={labels}
      // options={{
      //   maintainAspectRatio: false,
      //   legend: { display: true, labels: { fontFamily: "Poppins" } },
      // }}
    />

  </div>

);

export default PieChart;

PieChart.defaultProps = {
  pieData: [],
  backgroundColor: [
    '#2dce89',
    '#5e72e4',
    '#23b7e5',
  ],
  labels: [],
};

PieChart.propTypes = {
  pieData: PropTypes.arrayOf(PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string, PropTypes.array],
  )),
  backgroundColor: PropTypes.arrayOf(PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string, PropTypes.array],
  )),
  labels: PropTypes.arrayOf(PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string, PropTypes.array],
  )),
};
