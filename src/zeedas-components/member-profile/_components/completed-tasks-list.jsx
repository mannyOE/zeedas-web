import React from 'react';
import { ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import ZeedasBadge from '../../badge';
import colors from 'utils/colors';
import BellIcon from 'zeedas-assets/icons/icon-bell';
import NoList from './no-list';

const CompletedTasksList = ({ data, dummyData }) => (
  <div className="completed-task-list">
    {dummyData.length < 1 ? (
      <NoList />
    ) : (
      <ListGroup flush className="py-2 px-0">
        {dummyData.map((item, index) => (
          <ListGroupItem key={index} className="py-4 px-0">
            <Row>
              <Col md="5">
                <span className="task-title">{item.title}</span>
              </Col>
              <Col md="4" className="text-right">
                <img
                  class="company-logo"
                  src="https://res.cloudinary.com/zeedas/image/upload/v1595015255/project-icons/project1_sprxhh.svg"
                  alt=""
                />
              </Col>
              <Col md="2">
                <ZeedasBadge
                  color={colors.ZEEDAS_BLUE}
                  backgroundColor={colors.ZEEDAS_FADED_BLUE}
                >
                  <BellIcon color={colors.ZEEDAS_BLUE} />
                  &nbsp;
                  <span className="font-10">Oct 12</span>
                </ZeedasBadge>
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
    )}
  </div>
);

CompletedTasksList.defaultProps = {
  data: [],
};

CompletedTasksList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object])
  ),
};

export default CompletedTasksList;
