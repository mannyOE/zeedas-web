import React from 'react';
import { ListGroup, ListGroupItem, Col } from 'reactstrap';
import SkypeIcon from 'zeedas-assets/icons/icon-skype';
import LocationIcon from 'zeedas-assets/icons/icon-location';
import PhoneIcon from 'zeedas-assets/icons/icon-phone';
import EmailIcon from 'zeedas-assets/icons/icon-email';

const ContactDetails = ({
  skypeId,
  email,
  phoneNumber,
  location,
  className,
}) => (
  <>
    <ListGroup className={`list-group m-b-0 ${className}`}>
      <ListGroupItem className="border-0 d-flex justify-content-between align-items-center">
        <Col md={10} className="p-0">
          <p className="mb-0 contact-detail-label">E-mail</p>
          <h5 className="contact-detail-value">{email}</h5>
        </Col>
        <Col md={2} className="ml-auto">
          <EmailIcon />
        </Col>
      </ListGroupItem>
      <ListGroupItem className="border-0 d-flex justify-content-between align-items-center">
        <Col md={10} className="p-0">
          <p className="mb-0 contact-detail-label">Phone Number</p>
          <h5 className="contact-detail-value">{phoneNumber}</h5>
        </Col>
        <Col md={2} className="ml-auto">
          <PhoneIcon />
        </Col>
      </ListGroupItem>
      {location && (
        <ListGroupItem className=" border-0 d-flex justify-content-between align-items-center">
          <Col md={10} className="p-0">
            <p className="mb-0 contact-detail-label">Location</p>
            <h5 className="contact-detail-value">{location}</h5>
          </Col>
          <Col md={2} className="ml-auto">
            <LocationIcon />
          </Col>
        </ListGroupItem>
      )}
      {skypeId && (
        <ListGroupItem className=" border-0 d-flex justify-content-between align-items-center">
          <Col md={10} className="p-0">
            <p className="mb-0 contact-detail-label">Skype</p>
            <h5 className="contact-detail-value">{skypeId}</h5>
          </Col>
          <Col md={2} className="ml-auto">
            <SkypeIcon />
          </Col>
        </ListGroupItem>
      )}
    </ListGroup>
  </>
);

export default ContactDetails;
