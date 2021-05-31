import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const TimelineListItem = ({ data, idx }) => (
  <div className="list-widget">
    <div className={`timeline-list-item-content ${(idx === 4) && "last-time-line-content"}`}>
      <div className=" list-body list-style-none m-0 pb-2">
        <div className={`list-item ${(idx === 4) && "last"}`}>
          {data.narration}
          {' '}
          <span className="ml-auto font-12 time">{moment(data.createdAt).from(new Date())}</span>
        </div>
      </div>
      <span className="circle" style={{ backgroundColor: data.color, boxShadow: data.boxShadow }} />

    </div>
  </div>
);

TimelineListItem.defaultProps = {
  data: [],
};

TimelineListItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string, PropTypes.array],
  )),
};


const TimelineList = ({ timelineData }) => (
  <div>
    <div className="timeline-list-container">
      {timelineData.map((data, idx) => (
        <TimelineListItem data={data} key={idx} idx={idx} />
      ))}

    </div>

  </div>
);

TimelineList.defaultProps = {
  timelineData: [],
};

TimelineList.propTypes = {
  timelineData: PropTypes.arrayOf(PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string, PropTypes.object],
  )),
};

export default TimelineList;
