import React from "react";
import { connect } from "react-redux";
import { FormGroup } from "reactstrap";
import RoleList from "./role-list";
import ChipEntriesDisplay from "./chip-entries-display";
import { NOTIFICATION_FAILURE } from "../../../../constants";
import { notify } from "../../../../zeedas-components/bottom-notification";
import validators from "../../../../utils/validators";

class CoreTeamForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coreTeamEntries: props.coreTeamEntries,
      selectedRole: false,
      email: "",
      selectedChip: null,
      chipIndex: null,
    };

    this.validators = validators;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.coreTeamEntries !== prevProps.coreTeamEntries) {
      this.setState({ coreTeamEntries: this.props.coreTeamEntries });
    }
  }

  onChangeRadioButton = (e, roleId) => {
    const { coreTeamEntries, selectedChip, chipIndex, email } = this.state;
    // this.setState({ selectedRole: roleId });

    if (this.state.email === "") {
      const updatedChipEntry = { ...selectedChip, role: roleId };
      coreTeamEntries.splice(chipIndex, 1, updatedChipEntry);
      this.props.setCoreTeamEntries(coreTeamEntries);
    } else {
      // const email = event.target.value;
      const entry = {
        email,
        role: roleId,
      };
      const newEntries = [...coreTeamEntries, entry];
      coreTeamEntries.push(entry);
      this.setState(
        {
          // coreTeamEntries: newEntries,
          // selectedRole: false,
          email: "",
          selectedChip: entry,
          chipIndex: newEntries.indexOf(entry),
        },
        () => {
          this.props.setCoreTeamEntries(newEntries);
        }
      );
      // event.target.value = "";
    }
  };

  formValidators(fieldName, value) {
    this.validators[fieldName].errors = [];
    this.validators[fieldName].state = value;
    this.validators[fieldName].valid = true;
    this.validators[fieldName].rules.forEach((rule) => {
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value)) {
          this.validators[fieldName].errors.push(rule.message);
          this.validators[fieldName].valid = false;
        }
      } else if (typeof rule.test === "function") {
        if (!rule.test(value)) {
          this.validators[fieldName].errors.push(rule.message);
          this.validators[fieldName].valid = false;
        }
      }
    });
  }

  showErrors(fieldName) {
    const validator = this.validators[fieldName];
    const result = "";
    if (validator && !validator.valid && validator.state !== "") {
      const errors = validator.errors.map((info, index) => (
        <span className="error" key={index}>
          {info}
          <br />
        </span>
      ));
      return <div className="error mb-2 ml-4">{errors}</div>;
    }
    return result;
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });

    this.formValidators([event.target.name], event.target.value);
  };

  deleteEntry = (index) => {
    const { coreTeamEntries } = this.state;
    const remainingEntries = coreTeamEntries.filter((chip, i) => i !== index);
    this.props.setCoreTeamEntries(remainingEntries);
  };

  handleKeyPress = (event) => {
    const { coreTeamEntries, selectedRole, email } = this.state;

    if (event.key === "Enter") {
      if (email === "") {
        notify("Please enter an email", NOTIFICATION_FAILURE);
        return;
      }
      this.setState({
        selectedChip: null,
        chipIndex: null,
      });
      const entry = {
        email,
        role: selectedRole,
      };
      const newEntries = [...coreTeamEntries, entry];

      coreTeamEntries.push(entry);
      this.setState(
        {
          // coreTeamEntries: newEntries,
          selectedRole: false,
          email: "",
          selectedChip: entry,
          chipIndex: newEntries.indexOf(entry),
        },
        () => {
          this.props.setCoreTeamEntries(newEntries);
        }
      );
    }
  };

  handleChipClick = (chipEntry, chipIndex) => {
    this.setState({
      selectedRole: chipEntry.role,
      selectedChip: chipEntry,
      chipIndex: chipIndex,
    });
  };

  onInputFocus = () => {
    this.setState({ selectedChip: null, chipIndex: null, selectedRole: false });
  };

  render() {
    const { selectedRole, email, chipIndex } = this.state;
    const { roles, coreTeamEntries } = this.props;
    return (
      <div>
        <ChipEntriesDisplay
          handleChipClick={this.handleChipClick}
          entries={coreTeamEntries}
          deleteChip={this.deleteEntry}
          selected={chipIndex}
        />
        <FormGroup>
          <input
            name="email"
            value={email}
            onFocus={this.onInputFocus}
            className="add-team-members-input"
            placeholder="Enter email address"
            onChange={this.onInputChange}
            onKeyPress={this.handleKeyPress}
          />
        </FormGroup>
        {this.showErrors("email")}
        <hr />
        <div className="role-section">
          <h3 className="role-selection-header">Assign Role to team member</h3>
          <RoleList
            roles={roles}
            name="core-team-role"
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
export default connect(mapStateToProps)(CoreTeamForm);
