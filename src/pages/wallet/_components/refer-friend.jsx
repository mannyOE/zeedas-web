import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import CardComponent from '../../../zeedas-components/card';
import BlockLevelButton from '../../../zeedas-components/block-level-button';
import Chips from '../../../zeedas-components/chips';
import ButtonLoadingIcon from '../../../zeedas-assets/icons/icon-button-loader';
import { walletService } from 'services/wallet-service';
import { notify } from 'zeedas-components/bottom-notification';
import {
  appConstants,
  NOTIFICATION_FAILURE,
  NOTIFICATION_SUCCESS,
} from '../../../constants';

const ReferFriend = ({ onReferralSuccess }) => {
  const [referrals, setReferrals] = useState(["amanicholas@gmail.com"]);
  const [requestingReferral, setRequestingReferral] = useState(false);
  const [referError, setReferError] = useState(false);

  const deleteChip = (index) => {
    const remainingChips = referrals.filter((chip, i) => i !== index);
    setReferrals(remainingChips);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !validateEmail(event.target.value)) {
      setReferError(true);
      return;
    }
    if (event.key === 'Enter' && event.target.value === '') {
      setReferError(true);
      return;
    }
    if (event.key === 'Enter' && event.target.value !== '') {
      const newChip = event.target.value;
      setReferrals([...referrals, newChip])
      if (referrals.length > 0) {
        setReferError(false);
      }
      // eslint-disable-next-line no-param-reassign
      event.target.value = '';
    }
  };

  const validateEmail = (mail) => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    setReferError(true);
    return false;
  };

  const validateInput = () => {
    let noError = true;
    if (referrals.length === 0) {
      noError = false;
      setReferError(true);
    } else {
      setReferError(false);
    }
    return noError;
  };

  const sendReferral = () => {
    if (validateInput()) {
      const payload = {
        emails: referrals,
      };
      setRequestingReferral(true);
      walletService.sendReferrals(payload).then((res) => {
        setRequestingReferral(false);
        const { response } = res;
        if (res.status === appConstants.SUCCESS_RESPONSE) {
          setReferrals([]);
          onReferralSuccess();
          notify(response.message, NOTIFICATION_SUCCESS);
        } else if (res.status === appConstants.ERROR_RESPONSE) {
          notify(response.message, NOTIFICATION_FAILURE);
        }
      });
    }
  };
  return (
    <CardComponent>
      <div className="p-3">
        <Row>
          {referrals.map((text, i) => (
            <Col
              key={i}
              sm="12"
              md="12"
              lg={window.innerWidth < 1400 ? 12 : 6}
              className="mt-4"
            >
              <Chips text={text} deleteChip={() => deleteChip(i)} />
            </Col>
          ))}
        </Row>

        <Row>
          <Col sm="12" className="mt-4">
            <input
              type="email"
              className="refer-input"
              placeholder="Enter email address"
              onKeyPress={handleKeyPress}
            />
            {!referError && (
              <span className="refer-input-msg">
                Click enter after inserting your email
              </span>
            )}
            {referError && (
              <span className="refer-input-error">
                Please enter a valid email
              </span>
            )}
          </Col>
          <Col lg={12} className="invite-button">
            <BlockLevelButton
              color="zd-blue"
              onClick={sendReferral}
              disabled={requestingReferral}
            >
              <span>
                {requestingReferral ? <ButtonLoadingIcon /> : `Send Invite`}
              </span>
            </BlockLevelButton>
          </Col>
        </Row>
      </div>
    </CardComponent>
  );
};

export default ReferFriend;

ReferFriend.defaultProps = {
  onReferralSuccess: () => {
    // your logic here...
  },
};

ReferFriend.propTypes = {
  onReferralSuccess: PropTypes.func,
};
