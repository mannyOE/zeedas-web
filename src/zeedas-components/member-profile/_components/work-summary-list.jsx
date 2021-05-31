import React from "react";
import { ListGroup, ListGroupItem, Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import ZeedasBadge from "../../badge";
import img1 from "zeedas-assets/images/profile/lady.jpg";
import BellIcon from "zeedas-assets/icons/icon-bell";
import NoList from "./no-list";
import { Chart, Bar } from "react-chartjs-2";

import CardComponent from "../../card";
import Colors from "utils/colors";
import IconUsers from "zeedas-assets/icons/icon-users";
import ShoppingIcon from "zeedas-assets/icons/icon-shopping-bag";
Chart.elements.Rectangle.prototype.draw = function () {
  var ctx = this._chart.ctx;
  var vm = this._view;
  var left, right, top, bottom, signX, signY, borderSkipped, radius;
  var borderWidth = vm.borderWidth;
  var cornerRadius = 20;

  if (!vm.horizontal) {
    // bar
    left = vm.x - vm.width / 2;
    right = vm.x + vm.width / 2;
    top = vm.y;
    bottom = vm.base;
    signX = 1;
    signY = bottom > top ? 1 : -1;
    borderSkipped = vm.borderSkipped || "bottom";
  } else {
    // horizontal bar
    left = vm.base;
    right = vm.x;
    top = vm.y - vm.height / 2;
    bottom = vm.y + vm.height / 2;
    signX = right > left ? 1 : -1;
    signY = 1;
    borderSkipped = vm.borderSkipped || "left";
  }

  // Canvas doesn't allow us to stroke inside the width so we can
  // adjust the sizes to fit if we're setting a stroke on the line
  if (borderWidth) {
    // borderWidth shold be less than bar width and bar height.
    var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
    borderWidth = borderWidth > barSize ? barSize : borderWidth;
    var halfStroke = borderWidth / 2;
    // Adjust borderWidth when bar top position is near vm.base(zero).
    var borderLeft = left + (borderSkipped !== "left" ? halfStroke * signX : 0);
    var borderRight =
      right + (borderSkipped !== "right" ? -halfStroke * signX : 0);
    var borderTop = top + (borderSkipped !== "top" ? halfStroke * signY : 0);
    var borderBottom =
      bottom + (borderSkipped !== "bottom" ? -halfStroke * signY : 0);
    // not become a vertical line?
    if (borderLeft !== borderRight) {
      top = borderTop;
      bottom = borderBottom;
    }
    // not become a horizontal line?
    if (borderTop !== borderBottom) {
      left = borderLeft;
      right = borderRight;
    }
  }

  ctx.beginPath();
  ctx.fillStyle = vm.backgroundColor;
  ctx.strokeStyle = vm.borderColor;
  ctx.lineWidth = borderWidth;

  // Corner points, from bottom-left to bottom-right clockwise
  // | 1 2 |
  // | 0 3 |
  var corners = [
    [left, bottom],
    [left, top],
    [right, top],
    [right, bottom],
  ];

  // Find first (starting) corner with fallback to 'bottom'
  var borders = ["bottom", "left", "top", "right"];
  var startCorner = borders.indexOf(borderSkipped, 0);
  if (startCorner === -1) {
    startCorner = 0;
  }

  function cornerAt(index) {
    return corners[(startCorner + index) % 4];
  }

  // Draw rectangle from 'startCorner'
  var corner = cornerAt(0);
  ctx.moveTo(corner[0], corner[1]);
  var nextCornerId, nextCorner, width, height, x, y;
  for (var i = 1; i < 4; i++) {
    corner = cornerAt(i);
    nextCornerId = i + 1;
    if (nextCornerId == 4) {
      nextCornerId = 0;
    }

    nextCorner = cornerAt(nextCornerId);

    width = corners[2][0] - corners[1][0];
    height = corners[0][1] - corners[1][1];
    x = corners[1][0];
    y = corners[1][1];

    var radius = cornerRadius;

    // Fix radius being too large
    if (radius > height / 2) {
      radius = height / 2;
    }
    if (radius > width / 2) {
      radius = width / 2;
    }

    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
  }

  ctx.fill();
  if (borderWidth) {
    ctx.stroke();
  }
};

const barData = {
  labels: [
    "Deadline missed",
    "Delivery Speed",
    "Developer speed",
    "Contribution",
    "Task Created",
    "Task Completed",
  ],

  datasets: [
    {
      backgroundColor: [
        "#00858D",
        "#553679",
        "#4A76FD",
        "#FFCD3F",
        "#D31D79",
        "#FE727B",
      ],
      //backgroundColor: "#4DBD98",
      // borderColor: "#4DBD98",
      borderWidth: 0,
      barPercentage: 0.2,
      barThickness: 2,
      borderRadius: 10,
      //hoverBackgroundColor: "#4DBD98",
      // hoverBorderColor: "#4DBD98",
      data: [65, 59, 80, 98, 56, 93],
    },
  ],
  maintainAspectRatio: false,
};

const WorkSummaryList = ({ data }) => (
  <div className="work-summary">
    <div className="d-flex justify-content-center">
      <Col md={10}>
        <Row>
          <Col md={6}>
            <CardComponent
              color={Colors.ZEEDAS_WHITE}
              bgColor={Colors.ZEEDAS_DEEP_BLUE}
            >
              <>
                <div className="d-flex justify-content-between">
                  <div className="amount-icon">
                    <ShoppingIcon width={15} height={17} />
                  </div>
                  <div className="amount">$14</div>
                </div>
                <Row className="total">
                  <span className="amount-text-sm">Amount</span>
                  <span className="amount-text-lg">Lost so far</span>
                </Row>
              </>
            </CardComponent>
          </Col>
          <Col md={6}>
            <CardComponent
              color={Colors.ZEEDAS_WHITE}
              bgColor={Colors.ZEEDAS_ORANGE}
            >
              <>
                <div className="d-flex justify-content-between">
                  <div className="amount-icon">
                    <IconUsers width={15} height={17} />
                  </div>
                  <div className="amount">$32</div>
                </div>
                <Row className="total">
                  <span className="amount-text-sm">Amount</span>
                  <span className="amount-text-lg">Saved so far</span>
                </Row>
              </>
            </CardComponent>
          </Col>
        </Row>
      </Col>
    </div>
    <div className="bar-chart px-4">
      <p className="mb-3">Breakdown over time</p>
      <Bar
        height={110}
        data={barData}
        options={{
          legend: { display: false, hidden: true, strokeStyle: "none" },
          scales: {
            xAxes: [
              {
                barThickness: 20,
                gridLines: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  display: true,
                  fontSize: 6,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  // display: false,
                  borderDash: [8, 4],
                  drawBorder: false,
                },
                ticks: {
                  display: false,
                },
                radius: 30,
              },
            ],
          },
        }}
      />
    </div>
  </div>
);

WorkSummaryList.defaultProps = {
  data: [],
};

WorkSummaryList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object])
  ),
};

export default WorkSummaryList;
