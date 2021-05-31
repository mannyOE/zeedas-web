import React from "react";
import { connect } from "react-redux";
import { FormGroup } from "reactstrap";
import RoleList from "./role-list";
import ChipEntriesDisplay from "./chip-entries-display";

class ContractTeamForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contractTeamEntries: [],
      selectedRole: false,
      email: "",
    };
  }

  onChangeRadioButton = (e, id) => {
    this.setState({ selectedRole: id });
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    // this.formValidators([event.target.name], event.target.value);
  };

  deleteEntry = (index) => {
    const { contractTeamEntries } = this.state;
    const remainingEntries = contractTeamEntries.filter(
      (chip, i) => i !== index
    );
    this.setState({ contractTeamEntries: remainingEntries }, () => {
      this.props.setContractTeamEntries(remainingEntries);
    });
  };

  handleKeyPress = (event) => {
    const { contractTeamEntries, selectedRole } = this.state;

    if (selectedRole === null) {
      //   notify("Please select a role for the team member");
      return;
    }

    if (event.key === "Enter") {
      const email = event.target.value;
      const entry = {
        email,
        role: selectedRole,
        // employmentMode: "contract",
      };
      const newEntries = [...contractTeamEntries, entry];

      contractTeamEntries.push(entry);
      this.setState(
        { contractTeamEntries: newEntries, selectedRole: false },
        () => {
          this.props.setContractTeamEntries(newEntries);
        }
      );

      event.target.value = "";
    }
  };

  render() {
    const {selectedRole } = this.state;
    const { roles, contractTeamEntries } = this.props;
    return (
      <div>
        <ChipEntriesDisplay
          entries={contractTeamEntries}
          deleteChip={this.deleteEntry}
        />
        <FormGroup>
          <input
            className="add-team-members-input"
            placeholder="Enter email address"
            onChange={this.onInputChange}
            onKeyPress={this.handleKeyPress}
          />
        </FormGroup>
        <hr />
        <div className="role-section">
          <h3 className="role-selection-header">Assign Role to team member</h3>
          <RoleList
            roles={roles}
            name="contract-team-role"
            onChangeRadioButton={this.onChangeRadioButton}
            selectedRole={selectedRole}
          />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { requests } = state;
  return {
    requesting: requests.requesting,
  };
}
export default connect(mapStateToProps)(ContractTeamForm);
