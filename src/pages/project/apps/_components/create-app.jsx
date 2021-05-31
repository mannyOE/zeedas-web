import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
  Label,
  Input,
  Form,
  FormGroup,
  CustomInput,
  Modal,
} from "reactstrap";
import MultiSelect from "zeedas-components/multiselect";
import { appService } from "../apps.services";
import {
  appConstants,
  NOTIFICATION_FAILURE,
  NOTIFICATION_INFO,
  NOTIFICATION_SUCCESS,
} from "../../../../constants";
import { ERROR_RESPONSE } from "../../../../utils/constants";
import { notify } from "../../../../zeedas-components/bottom-notification";
import ZeedasInput from "../../../../zeedas-components/input";
import ZeedasTextArea from "../../../../zeedas-components/text-area";
import CardComponent from "../../../../zeedas-components/card";
import BlockLevelButton from "../../../../zeedas-components/block-level-button";
import IconPlus from "../../../../zeedas-assets/icons/icon-plus";
import TabNavigation from "../../../../zeedas-components/tab-navigation";
import ProjectIconsList from "../../../../zeedas-components/project-icons-list";
import ButtonLoadingIcon from "../../../../zeedas-assets/icons/icon-button-loader";
import UploadIcon from "../../../../zeedas-components/upload-icon";
import validators from "../../../../utils/validators";
import ZeedasCheckbox from "../../../../zeedas-components/checkbox";
import TransactionBadge from "../../../../zeedas-components/transaction-badge.jsx";
import IconArrowDown from "../../../../zeedas-assets/icons/icon-arrow-down.jsx";
import IconSearchLight from "../../../../zeedas-assets/icons/icon-search-light";
import { projectActions } from "../../../../state/redux/project/actions";

const tabNavigationTitles = [
  { tabId: 1, title: "App Icons" },
  { tabId: 2, title: "Custom App Icon" },
];

const CreateApp = ({
  AppDescription,
  toggleDescreption,
  skillsContainer,
  toggleSkills,
  closeModal,
  getApps,
  projectId,
  skills,
}) => {
  // const fSkills = skills.map((skill) => {
  //   return {
  //     ...skill,
  //     label: skill.name,
  //     value: skill.name,
  //   };
  // });
  const dispatch = useDispatch();
  const [allApps, setAllApps] = useState([
    { value: "Repositories", checked: true },
    { value: "Server Config", checked: false },
  ]);
  const uploadedImage = useRef(null);
  const [uploadUrl, setUploadUrl] = useState("");
  const [buttonDisable, setDisable] = useState(true);
  const [selectedSkills, setSelectedSkills] = useState([]);
  // const [formattedSkills] = useState(fSkills);
  const [fileUpload, setFile] = useState("");
  const [allSkills, setSkill] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState({
    icon: "",
    name: "",
    description: "",
    projectId: "",
    appNeed: [],
    skills: [],
  });
  const [requesting, setRequesting] = useState(false);
  const [customIcon, setCustomIcon] = useState(false);
  const selectActiveUrl = (e) => {
    setState({
      ...state,
      icon: e,
    });
    setCustomIcon(false);
  };
  const onChangeAppNeed = (e, i) => {
    const options = [...allApps];
    const option = { ...options[i] };
    option.checked = e.target.checked;
    options[i] = option;
    setAllApps(options);
  };
  const onChangeChecked = (e, value) => {
    // current array of options
    const options = state.skills;
    let index;
    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      options.push(value.name);
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = options.indexOf(value.name);
      options.splice(index, 1);
    }
    // update the state with the new array of options
    setState({
      ...state,
      skills: options,
    });
  };

  const handleChange = (selectedSkills) => {
    // const errors = this.setErrorMessage('selectedSkills', selectedSkills);
    setSelectedSkills(selectedSkills);
  };
  // const handleChange = (e) => setSearchTerm(e.target.value);

  useEffect(() => {
    const result = skills.filter((o) => o.name.toLowerCase().includes(searchTerm));
    const formattedSkills = result.map((skill) => ({
      label: skill.name,
      value: skill.name,
    }));
    setSkill(formattedSkills);
  }, [searchTerm, skills]);

  useEffect(() => {
    if (state.name === "" || selectedSkills.length == 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [state, selectedSkills]);

  const onUploadImage = (e) => {
    const [file] = e.target.files;

    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const icon = e.target.result;
        setUploadUrl(icon);
        setCustomIcon(true);
      };
    }
  };

  const onInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    formValidators([event.target.name], event.target.value);
  };

  const formValidators = (fieldName, value) => {
    validators[fieldName].errors = [];
    validators[fieldName].state = value;
    validators[fieldName].valid = true;
    validators[fieldName].rules.forEach((rule) => {
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value)) {
          validators[fieldName].errors.push(rule.message);
          validators[fieldName].valid = false;
        }
      } else if (typeof rule.test === "function") {
        if (!rule.test(value)) {
          validators[fieldName].errors.push(rule.message);
          validators[fieldName].valid = false;
        }
      }
    });
  };

  const showErrors = (fieldName) => {
    const validator = validators[fieldName];
    const result = "";
    if (validator && !validator.valid && validator.state !== "") {
      const errors = validator.errors.map((info, index) => (
        <span className="error" key={index}>
          {info}
          <br />
        </span>
      ));
      return <div className="error mb-2">{errors}</div>;
    }
    return result;
  };

  const uploadToCloudinary = async () => {
    const formData = new FormData();
    formData.append("file", fileUpload);
    formData.append("upload_preset", "rkcmx9ry");
    const options = {
      method: "POST",
      body: formData,
    };
    return fetch("https://api.Cloudinary.com/v1_1/zeedas/image/upload", options)
      .then((res) => res.json())
      .then(async (res) => res.secure_url)
      .catch((err) => {});
  };

  const createApp = async (icon) => {
    await setRequesting(true);
    const apps = allApps.filter((app) => app.checked === true);
    const appNeed = apps.map((app) => app.value);
    const newState = {
      ...state,
      // skills: selectedSkills.map((skill) => skill.name),
      skills: selectedSkills.map((skill) => skill.value),
      projectId,
      icon: icon || state.icon,
      appNeed,
    };

    appService.createApp(newState)
      .then(async (response) => {
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
          setRequesting(false);
        } else {
          await getApps();
          setState({
            name: "",
            description: "",
            skills: [],
            icon: "",
          });
          setUploadUrl("");
          document
            .querySelectorAll("input[type=checkbox]")
            .forEach((el) => (el.checked = false));
          document
            .querySelectorAll(".project-icon-wrap")
            .forEach((el) => el.classList.remove("icon-active"));

          const options = [...allApps];
          options[1].checked = false;
          await setAllApps(options);
          await dispatch(projectActions.fetchTodo(projectId));
          notify(response.response.message, NOTIFICATION_SUCCESS);
          closeModal();
        }
      })
      .finally(() => setRequesting(false));
  };

  const checkUploadType = async () => {
    await setRequesting(true);
    if (customIcon) {
      const clod = await uploadToCloudinary();
      await createApp(clod);
      // setRequesting(false);
    } else {
      await createApp();
      // setRequesting(false);
    }
  };

  const tabNavigationContents = [
    {
      contentId: 1,
      content: <ProjectIconsList onClick={selectActiveUrl} />,
    },
    {
      contentId: 2,
      content: (
        <UploadIcon
          uploadedImage={uploadedImage}
          onUploadImage={onUploadImage}
          uploadUrl={uploadUrl}
        />
      ),
    },
  ];
  // <CardComponent>

  return (
    <div className="create-project">
      <div className="">
        <h1 className="modalTitle">Create App</h1>
        <p className="description-header">
          {" "}
          Enter the Details of the Project u would like to create and assign a
          team lead specific to this project
        </p>
      </div>

      <ZeedasInput
        label="Give this App a name"
        placeholder="Eg. Natterbase"
        onChange={onInputChange}
        name="name"
        type="text"
        value={state.name}
      />
      {showErrors("name")}

      <p className="description" onClick={toggleDescreption}>
        Add a description
      </p>
      {AppDescription === true && (
        <ZeedasTextArea
          className=""
          // label="Project Description"
          name="description"
          onChange={onInputChange}
          placeholder="Description"
          type="textarea"
          value={state.description}
          height="150px"
        />
      )}
      {showErrors("description")}
      <div className="mb-4 skills-set mt-4">
        <p className="default-input-label">Select Skill sets</p>
        {skillsContainer === true && (
          <MultiSelect
            options={allSkills}
            value={selectedSkills}
            onChange={handleChange}
            placeholder="Select Skills"
            isClearable={false}
            error={null}
            wrapValues={false}
            defaultPadding
          />
          // <div className="multi-select-content">
          //   <CardComponent
          //     bgColor="#ffffff"
          //     border="1px solid #E0E7FF"
          //     borderRadius="4px"
          //   >
          //     <div>
          //       <div className="input-group mb-3">
          //         <div className="d-flex">
          //           <span className="input-group-text">
          //             <IconSearchLight />
          //           </span>
          //         </div>
          //         <input
          //           type="text"
          //           className="form-control"
          //           placeholder="Search"
          //           value={searchTerm}
          //           name="search"
          //           onChange={handleChange}
          //           aria-label="Search"
          //           aria-describedby="basic-addon1"
          //         />
          //       </div>

        //       <FormGroup>
        //         {allSkills.map((skill) => (
        //           <div className="mb-2" key={skill._id}>
        //             <ZeedasCheckbox
        //               id={skill._id}
        //               value={skill.name}
        //               text={skill.name}
        //               handleCheckboxChange={(e) => onChangeChecked(e, skill)}
        //             />
        //           </div>
        //         ))}
        //       </FormGroup>
        //     </div>
        //   </CardComponent>
        // </div>
        )}
      </div>
      <div className="mt-4">
        <p className="default-input-label">Select App Need</p>
        <FormGroup>
          {allApps.map((app, i) => (
            <div className="mb-4" key={i}>
              <ZeedasCheckbox
                id={i}
                value={app.value}
                name={app.value}
                text={app.value}
                checked={app.checked}
                handleCheckboxChange={(e) => onChangeAppNeed(e, i)}
              />
            </div>
          ))}
        </FormGroup>
      </div>
      <div className="mt-5 icons-tabs">
        <CardComponent
          bgColor="#FDFDFD"
          border="1px solid rgba(45, 45, 45, 0.1)"
          borderRadius="10px"
          minHeight="190px"
        >
          <TabNavigation
            tabNavigationTitles={tabNavigationTitles}
            tabNavigationContents={tabNavigationContents}
          />
        </CardComponent>
      </div>
      <div className="mt-4">
        <BlockLevelButton
          disabled={buttonDisable}
          color="zd-blue"
          onClick={checkUploadType}
        >
          {requesting ? (
            <span className="d-flex justify-content-center align-items-center">
              <ButtonLoadingIcon
                margin="0 10px 0 0"
                height="16px"
                width="16px"
              />
            </span>
          ) : (
            <span>
              <IconPlus height={13} width={13} />
              {" "}
              Create App
            </span>
          )}
        </BlockLevelButton>
      </div>
    </div>
  );
  // </CardComponent>
};

export default CreateApp;
CreateApp.defaultProps = {
  openCreateProject: () => {},
  toggleDescreption: () => {},
  closeModal: () => {},
  getApps: () => {},
  AppDescription: false,
  skillsContainer: true,
  toggleSkills: () => {},
  requesting: false,
  icons: "",
};
CreateApp.propTypes = {
  openCreateProject: PropTypes.func,
  AppDescription: PropTypes.bool,
  skillsContainer: PropTypes.bool,
  toggleDescreption: PropTypes.func,
  toggleSkills: PropTypes.func,
  closeModal: PropTypes.func,
  icons: PropTypes.string,
  getApps: PropTypes.func,
};
