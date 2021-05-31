import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import Chips from "../../../zeedas-components/chips";

const ChipEntriesDisplay = ({ entries, deleteChip }) => (
  <div style={{ height: "100px" }} className="d-flex flex-row p-4">
    <PerfectScrollbar>
      {entries.map((entry, index) => (
        <Chips
          key={index}
          className="m-2"
          text={entry.email}
          deleteChip={() => deleteChip(index)}
        />
      ))}
    </PerfectScrollbar>
  </div>
);

export default ChipEntriesDisplay;
