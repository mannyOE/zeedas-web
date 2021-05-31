import React, { useState } from "react";
import { DATA_TYPES } from "utils/constants";
import PlanningParameter from "../planning-parameter/index";
import "./style.scss";

const PlanningMethod = ({ method }) => {
  const [activeInput, setActiveInput] = useState(null);

  return (
    <div className="PlanningMethod">
      <div className="row">
        <div className="col-md-6">
          <div>
            <h4 className="font-12 text-capitalize">{method.name}</h4>
            <p className="font-10">{/* {method.description} */}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-4">
            <h5 className="font-10">Input Parameter</h5>
            <div className="PlanningMethod__input-parameters d-flex flex-wrap">
              {method.inputs.length === 0 ? (
                <span>--</span>
              ) : (
                method.inputs.map((input, index) => (
                  <div onClick={() => setActiveInput(input)}>
                    <PlanningParameter
                      key={index}
                      title={`${input.name}:${input.type} ${
                        input.type === DATA_TYPES.object ? "▾" : ""
                      }`}
                      className="mr-2 mb-2"
                    />
                  </div>
                ))
              )}
            </div>
            {activeInput && activeInput.type == DATA_TYPES.object && (
              <div className="object-area">{activeInput.object}</div>
            )}
          </div>
          <div>
            <h5 className="font-10">Output Parameter</h5>
            <div className="PlanningMethod__input-parameters d-flex flex-wrap">
              <PlanningParameter
                title={`${method.outputs.name}:${method.outputs.type}`}
                className="mr-2 mb-2"
              />
            </div>
            {method.outputs.type == DATA_TYPES.object && (
              <div className="object-area">{method.outputs.object}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningMethod;
