import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { connect } from "react-redux";
import {
  FormWrapper,
  Header,
  Badge,
  FormBody,
  FormRow,
  Label,
  InputWrapper,
  IconRing,
  TagsContainer,
} from "./style";
import { theme } from "../../style";
import { Textarea } from "../../_components/form/textarea";
import { DatePicker } from "../../_components/datepicker";
// import DatePicker from "react-datepicker";
import { CalendarIcon } from "../../../../zeedas-assets/icons/icon-calendar";
import { ProjectIcon } from "../../../../zeedas-assets/icons/icon-project";
import {
  modulesSelector,
  updateModule,
  appSelector,
} from "../../../../state/redux/modules/actions";
import { useComponentVisible } from "../../_components/custom-hooks";
import { Tag } from "../../_components/tags";
import { Select } from "../../_components/select";
import { Dropdown } from "../../_components/drop-down/index";

const iconProps = {
  dimension: {
    width: 12.8,
    height: 12.8,
  },
  color: theme.colors.gray500,
};

export const ModuleForm = (props) => {
  const {
    module, updateModule, modules, apps,
  } = props;
  const { dependentModules } = module;

  // eslint-disable-next-line array-callback-return,consistent-return
  const filteredModules = modules.filter((unfilteredModule) => {
    if (
      (new Date(unfilteredModule.createdAt).getTime() < new Date(module.createdAt).getTime())
      && unfilteredModule._id !== module._id
    ) {
      return unfilteredModule;
    }
  });

  const [name, setName] = useState(module.name);
  const [dueDate, setDueDate] = useState(
    (module.dueDate && moment(module.dueDate).toDate()) || "",
  );
  const [description, setDescription] = useState(module.desc);
  const [app, setApp] = useState(
    apps.data.find((app) => app._id === module.app),
  );
  const [selectedModules, setSelectedModules] = useState(
    dependentModules.map((item) => item[0]) || [],
  );
  const firstUpdateDesc = useRef(true);
  const firstUpdateName = useRef(true);

  const timeoutName = useRef(null);
  const timeoutDesc = useRef(null);

  const handleDueDate = (_, date) => {
    setDueDate(date);
    updateModule(module._id, { project: module.project, dueDate: date });
  };

  const handleModuleSelect = (item) => {
    if (!item) return;
    if (!selectedModules.find(({ _id }) => _id === item._id)) {
      updateModule(module._id, {
        project: module.project,
        dependentModules: [...selectedModules, item],
      });
      setSelectedModules([...selectedModules, item]);
    }
  };

  const handleAppSelect = (item) => {
    setApp(item);
    updateModule(module._id, { project: module.project, app: item._id });
  };

  const deleteDependency = (id) => {
    const newDependencies = selectedModules.filter(({ _id }) => _id !== id);
    updateModule(module._id, {
      project: module.project,
      dependentModules: newDependencies,
    });
    setSelectedModules(newDependencies);
  };

  const displayTags = () => selectedModules.map((item) => {
    const { name, _id } = item;
    return (
      <Tag
        label={name}
        key={_id}
        onClose={() => deleteDependency(_id)}
        size="small"
      />
    );
  });

  useEffect(() => {
    if (firstUpdateName.current) {
      firstUpdateName.current = false;
      return;
    }
    if (timeoutName.current) {
      clearTimeout(timeoutName.current);
    }
    timeoutName.current = setTimeout(
      () => updateModule(module._id, { project: module.project, name }),
      1000,
    );
    return () => clearTimeout(timeoutName.current);
    // eslint-disable-next-line
  }, [name]);

  useEffect(() => {
    if (firstUpdateDesc.current) {
      firstUpdateDesc.current = false;
      return;
    }
    if (timeoutDesc.current) {
      clearTimeout(timeoutDesc.current);
    }
    timeoutDesc.current = setTimeout(
      () => updateModule(module._id, {
        project: module.project,
        desc: description,
      }),
      1000,
    );
    return () => clearTimeout(timeoutDesc.current);
    // eslint-disable-next-line
  }, [description]);

  return (
    <FormWrapper>
      <Header>
        <Textarea handleChange={setName} value={name} />
        <Badge color={theme.colors.gray500}>{module.status}</Badge>
      </Header>
      <FormBody>
        <FormRow>
          <Label>Due Date</Label>
          <InputWrapper>
            <IconRing>
              <CalendarIcon {...iconProps} />
            </IconRing>
            <DatePicker
              placeholderText="Due Date"
              name="startTime"
              selected={dueDate}
              onDateChange={handleDueDate}
              showYearDropdown
              showMonthDropdown
              className="project-timeline"
              useShortMonthInDropdown
              popperClassName="zeedas-datepicker"
            />
            {/* <DatePicker
              selected={dueDate}
              onChange={handleDueDate}
              name="startTime"
              placeholderText="Due Date"
              showYearDropdown
              showMonthDropdown
              filterDate={(date) => date.getTime() > Date.now() || Date.now()}
              className="project-timeline"
              useShortMonthInDropdown
              popperClassName="zeedas-datepicker"
            /> */}
          </InputWrapper>
        </FormRow>
        <FormRow>
          <Label>App</Label>
          <InputWrapper>
            {app && app.icon ? (
              <img className="company-logo mr-2" width="25px" src={app.icon} alt="" />
            ) : (
              <IconRing color={theme.colors.blue100} />
            )}
            <Select
              items={apps.data}
              itemKey="name"
              selectedItem={app}
              placeholder="Select App"
              handleSelect={handleAppSelect}
            />
          </InputWrapper>
        </FormRow>
        <TagsContainer>{displayTags()}</TagsContainer>
        <FormRow>
          <Label>Dependency</Label>
          <InputWrapper>
            <IconRing>
              <ProjectIcon {...iconProps} />
            </IconRing>
            <Dropdown
              placeholder="Select Module"
              itemKey="name"
              // items={modules}
              items={filteredModules}
              onSelect={handleModuleSelect}
            />
          </InputWrapper>
        </FormRow>
        <FormRow>
          <Label>Description</Label>
          <Textarea
            handleChange={setDescription}
            value={description}
            placeholder="Module description"
          />
        </FormRow>
      </FormBody>
    </FormWrapper>
  );
};

const mapStateToProps = (state, { id }) => {
  const modules = modulesSelector(state);
  const module = modules.find(({ _id }) => _id === id);
  return {
    apps: appSelector(state),
    modules,
    module,
  };
};

export default connect(mapStateToProps, { updateModule })(ModuleForm);
