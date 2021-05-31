import React from 'react';
import PropTypes from "prop-types";
import InputRightIcon from "../../../zeedas-components/input-right-icon";
import SavedCardsListGroup from "./saved-cards-list-group";
import CardComponent from "../../../zeedas-components/card";
import BlockLevelButton from "../../../zeedas-components/block-level-button";
import ButtonLoadingIcon from "../../../zeedas-assets/icons/icon-button-loader";

const FundWallet = ({
  data, onChange, fundWallet, onChangeRadioButton,
  checkedSavedCard, name, fundValue, requestingFundWallet,
  cardId, cardLength,
}) => (
  <CardComponent>
    <div className="fund-wallet-complete ">
      <InputRightIcon
        label="How much ($) do you want to fund"
        placeholder="Enter Amount"
        type="number"
        onChange={onChange}
        name="fundValue"
        value={fundValue}
        id="fund-wallet"
      />
      <div className="saved-cards">
        <p>Select your card</p>
        <SavedCardsListGroup
          cardLength={cardLength}
          data={data}
          onChangeRadioButton={onChangeRadioButton}
          checkedSavedCard={checkedSavedCard}
          name={name}
          cardId={cardId}

        />
      </div>
      <div className="mt-4">
        <BlockLevelButton
          color="zd-blue"
          onClick={fundWallet}
          disabled={requestingFundWallet}
        >
          <span>
            {requestingFundWallet ? <ButtonLoadingIcon /> : `Fund Wallet`}
          </span>
        </BlockLevelButton>
      </div>
    </div>
  </CardComponent>
);

export default FundWallet;

FundWallet.defaultProps = {
  data: [],
  onChange: () => {},
  name: "",
  fundWallet: () => {},
  onChangeRadioButton: () => {},
  checkedSavedCard: "",
  fundValue: "",
  requestingFundWallet: false,
  cardId: "",
  cardLength: 0,
};

FundWallet.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string, PropTypes.object],
  )),
  name: PropTypes.string,
  onChange: PropTypes.func,
  fundWallet: PropTypes.func,
  onChangeRadioButton: PropTypes.func,
  checkedSavedCard: PropTypes.string,
  fundValue: PropTypes.string,
  requestingFundWallet: PropTypes.bool,
  cardId: PropTypes.string,
  cardLength: PropTypes.number,
};
