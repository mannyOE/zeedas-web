import React from "react";
import { ListGroup, ListGroupItem, Row, Col } from "reactstrap";
import PropTypes from "prop-types";
// import ZeedasBadge from "../badge";
// import img1 from "../../zeedas-assets/images/profile/lady.jpg";
// import colors from "../../utils/colors";
// import BellIcon from "../../zeedas-assets/icons/icon-bell";
import NoList from "./no-list";
import { Doughnut, Chart, Bar } from "react-chartjs-2";

// some of this code is a variation on https://jsfiddle.net/cmyker/u6rr5moq/
var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw: function () {
    originalDoughnutDraw.apply(this, arguments);

    var chart = this.chart.chart;
    var ctx = chart.ctx;
    var width = chart.width;
    var height = chart.height;

    var fontSize = (height / 114).toFixed(2);

    ctx.font = fontSize + "em Verdana";
    ctx.textBaseline = "middle";
    ctx.fillStyle = chart.config.data.fontColor;
    var text = chart.config.data.text,
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = height / 2;

    ctx.fillText(text, textX, textY);
  },
});
const data = {
  labels: ["Red", "Green"],

  datasets: [
    {
      data: [70, 30],
      backgroundColor: ["#4DBD98", "rgba(77, 189, 152, 0.1)"],
      hoverBackgroundColor: ["#4DBD98", "rgba(77, 189, 152, 0.1)"],
      color: "#03293D",
      fontColor: "#03293D",
      borderWidth: 0,
    },
  ],
  fontColor: "#03293D",
  text: "10 Hours",
};
const options = {
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
  cutoutPercentage: 75,
};
const barData = {
  labels: ["January", "February", "March", "April", "May", "June"],

  datasets: [
    {
      // backgroundColor: [
      //   "rgba(255, 99, 132, 0.2)",
      //   "rgba(54, 162, 235, 0.2)",
      //   "rgba(255, 206, 86, 0.2)",
      //   "rgba(75, 192, 192, 0.2)",
      //   "rgba(153, 102, 255, 0.2)",
      // ],
      backgroundColor: "#4DBD98",
      // borderColor: "#4DBD98",
      borderWidth: 0,
      barPercentage: 0.2,
      barThickness: 2,
      hoverBackgroundColor: "#4DBD98",
      // hoverBorderColor: "#4DBD98",
      data: [65, 59, 80, 81, 56, 55],
    },
  ],
  maintainAspectRatio: true,
};
const barOptions = {
  legend: {
    display: false,
  },
  // tooltips: {
  //   enabled: false,
  // },
};
const HourSpent = ({}) => (
  <div className="hour-spent p-4">
    {data.length < 1 ? (
      <NoList />
    ) : (
      <div>
        <h2 className="hour-title mt-4 mb-3">Hours worked Today</h2>

        <Doughnut data={data} width={350} height={150} options={options} />
        <div className="total-hours d-flex justify-content-between">
          <div>
            <p>Total Hour spent</p>
            <h2>164 Hours</h2>
          </div>
          <div className="bar-chart">
            <Bar
              data={barData}
              options={{
                legend: { display: false, hidden: true, strokeStyle: "none" },
                scales: {
                  xAxes: [
                    {
                      barThickness: 5,
                      gridLines: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  ],
                  yAxes: [
                    {
                      gridLines: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  ],
                },
              }}
            />
          </div>
        </div>
      </div>
    )}
  </div>
);

HourSpent.defaultProps = {
  data: [],
};

HourSpent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object])
  ),
};

export default HourSpent;
