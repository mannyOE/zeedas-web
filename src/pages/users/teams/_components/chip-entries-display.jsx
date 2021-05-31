import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import Chips from "../../../../zeedas-components/chips";
import colors from "../../../../utils/colors";

const ChipEntriesDisplay = ({
  entries,
  deleteChip,
  handleChipClick,
  selected,
}) => (
  <div style={{ height: "100px" }} className="d-flex flex-row px-4 py-2">
    <PerfectScrollbar>
      <div style={{ display: "flex" }}>
        {entries.map((entry, index) => {
          return (
            <div
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => handleChipClick(entry, index)}
            >
              {entry.role ? (
                <div>
                  <small
                    className="ml-2"
                    style={{ color: `${colors.ZEEDAS_WHITE}` }}
                  >
                    {"role added"}
                  </small>
                </div>
              ) : (
                <div>
                  <small
                    className="ml-2"
                    style={{ color: `${colors.ZEEDAS_RED}` }}
                    color="zd-red"
                  >
                    click to add role
                  </small>
                </div>
              )}
              <Chips
                backgroundColor={
                  entry.role ? undefined : `${colors.ZEEDAS_FADED_RED}`
                }
                borderColor={
                  index === selected
                    ? `1px solid ${colors.ZEEDAS_DARK_BLUE}`
                    : undefined
                }
                className="m-2"
                text={entry.email}
                deleteChip={() => deleteChip(index)}
              />
            </div>
          );
        })}
      </div>
    </PerfectScrollbar>
  </div>
);

export default ChipEntriesDisplay;
