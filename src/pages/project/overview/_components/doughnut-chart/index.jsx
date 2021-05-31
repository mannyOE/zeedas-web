import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const doughnutDataStructure = (data, backgroundColor, labels) => {
  const doughnutData = {
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 0,
      },
    ],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels,
  };
  return doughnutData;
};

let segment;
const options = (cutoutPercentage) => {
  return {
    maintainAspectRatio: false,
    responsive: false,
    cutoutPercentage: cutoutPercentage,
    segmentShowStroke: false,
    onHover: function (evt, elements) {
      if (elements && elements.length) {
        segment = elements[0];
        this.chart.update();
        const selectedIndex = segment['_index'];
        segment._model.outerRadius += 5;
      } else {
        if (segment) {
          segment._model.outerRadius -= 5;
        }
        segment = null;
      }
    },
    legend: {
      display: false,
      position: 'right',
      align: 'start',
      labels: {
        // boxWidth: 30,
        padding: 18,
        usePointStyle: true,
      },
    },
    layout: {
      padding: 10,
    },
  };
};
const DoughnutChart = ({
  doughnutData,
  backgroundColor,
  cutoutPercentage,
  labels,
  width,
  height,
}) => (
  <div
    style={{
      position: 'relative',
    }}
  >
    <Doughnut
      data={() => doughnutDataStructure(doughnutData, backgroundColor, labels)}
      options={options(cutoutPercentage)}
      width={width}
      height={height}
    />
  </div>
);

export default DoughnutChart;

DoughnutChart.defaultProps = {
  doughnutData: [],
  backgroundColor: ['#00858D', '#FFCD3F', '#EB5757', '#1A0C2F'],
  labels: [],
  width: 166,
  height: 166,
  cutoutPercentage: 60,
};

DoughnutChart.propTypes = {
  doughnutData: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array])
  ),
  backgroundColor: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array])
  ),
  labels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array])
  ),
  height: PropTypes.number,
  width: PropTypes.number,
  cutoutPercentage: PropTypes.number,
};
