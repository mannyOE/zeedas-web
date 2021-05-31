import React, { useState, useRef, useEffect } from 'react';
import './style.scss';
import ZeedasModal from 'zeedas-components/modal';
import IconCopy from 'zeedas-assets/icons/icon-copy';
import ReferImg from 'zeedas-assets/images/profile/refer-img.svg';
import ReferFriend from 'pages/wallet/_components/refer-friend';
import IconArrowBack from 'zeedas-assets/icons/icon-arrow-back';
import { AppUtils } from 'utils/app-utils';
import { walletService } from 'services/wallet-service';
import { appConstants } from 'constants/app.constants';

const ReferralCard = ({ showInviteForm }) => {
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const referalLinkRef = useRef(null);

  const copyLink = () => {
    referalLinkRef.current.select();
    referalLinkRef.current.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand('copy');
    setCopied(true);
  };

  useEffect(() => {
    getWalletStatistics()
  }, [])

  const getWalletStatistics = () => {
    walletService.getWalletStatistics().then((res) => {
      const { response } = res;
      if (res.status === appConstants.SUCCESS_RESPONSE) {
          setReferralCode(response.data.referalCode)
      }
    });
  };

  return (
    <div className="ReferAFriendModal p-5 ">
      <div className="ReferAFriendModal__content h-100 px-5 d-flex flex-column justify-content-between">
        <div className="text-center">
          <img src={ReferImg} alt="zeedas-referral" />
        </div>

        <p className="text-center font-18 mx-4">
          Gift a friend <span className="orange-text">$50</span> , and get{' '}
          <span className="orange-text">$50</span> when they join us
        </p>

        <button
          className="ReferAFriendModal__button font-14 w-100"
          onClick={() => showInviteForm()}
        >
          Invite by Email
        </button>
        <p className="text-center">Or</p>
        <div className="ReferAFriendModal__link d-flex align-items-center justify-content-between p-3">
          <input
            ref={referalLinkRef}
            type="text"
            className="font-14 w-100 pr-4"
            value={AppUtils.getReferralLink(referralCode)}
          />
          <a type="button" onClick={() => copyLink()}>
            <IconCopy />
          </a>
        </div>
        {copied && (
          <div className="text-center">
            <span className="ReferAFriendModal__link-status font-14">
              Link Copied
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const ReferAFriendModal = ({ open, onClose }) => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const handleClose = () => {
    setShowInviteForm(false);
    onClose();
  };

  return (
    <ZeedasModal
      open={open}
      onClose={handleClose}
      title="Refer a friend"
      width="35%"
    >
      <div className="ReferralCard">
      {showInviteForm ? (
        <>
        <a onClick={() => setShowInviteForm(false)} className="back-btn d-inline-flex align-items-center m-4"><IconArrowBack/> <span className="ml-2">Back</span></a>
        <ReferFriend onReferralSuccess={handleClose} />
        </>
      ) : (
        <ReferralCard showInviteForm={() => setShowInviteForm(true)} />
      )}
      </div>
    </ZeedasModal>
  );
};

export default ReferAFriendModal;
