import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { setPageTitle } from "state/redux/app-header/actions";
import { PAGE_TITLES } from "utils/constants";
import ProjectsNav from "./_components/projects-nav";
import SingleProject from "./_components/single-project";
import ZeedasFullModal from "../../zeedas-components/full-modal";
import ZeedasModal from "../../zeedas-components/modal";
import EmptyRecordMessage from "../../zeedas-components/empty-record-message";
import CardComponent from "../../zeedas-components/card";
import CreateProject from "./_components/create-project";
import IconDeleteAlt from "../../zeedas-assets/icons/icon-delete-alt";
import EditProject from "./_components/edit-project";
import ActionMessage from "../../zeedas-components/action-message";
import ShareProject from "./_components/share-project";
import PageLoader from "../../zeedas-components/page-loader";
import { projectService } from "../../services/projects-service";
import { usersActions } from "../../state/redux/users/actions";
import { notify } from "../../zeedas-components/bottom-notification";
import {
  appConstants,
  NOTIFICATION_FAILURE,
  NOTIFICATION_INFO,
  NOTIFICATION_SUCCESS,
} from "../../constants";
import "./style.scss";

export class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateProjectModal: false,
      openEditProjectModal: false,
      openShareProjectModal: false,
      ProjectDescription: false,
      openDeleteProjectModal: false,
      teamMembers: [],
      projects: [],
      requesting: true,
      project: {},
      projectId: "",
      adminRole: false,
      isRequestingDelete: false,
      deleteConfirmationText: "",
    };
  }

  async componentDidMount() {
    // await this.props.dispatch(usersActions.fetchAccountInfo());
    this.props.dispatch(setPageTitle(PAGE_TITLES.project));
    await this.checkRole();
    await this.props.dispatch(usersActions.fetchTeamMembers());

    this.getProjects();
    // this.getTeamMembers();

    // await this.props.dispatch(projectActions.getProjects());
  }

  checkRole = () => {
    this.props.roles.forEach((element) => {
      if (element == "owner" || element == "admin") {
        this.setState({ adminRole: true });
      }
    });
  };

  copyProjectLink = (link) => {
    const aux = document.createElement("input");
    // Assign it the value of the specified element
    aux.setAttribute("value", link);
    // Append it to the body
    document.body.appendChild(aux);
    // Highlight its content
    aux.select();
    // Copy the highlighted text
    document.execCommand("copy");
    // Remove it from the body
    document.body.removeChild(aux);
    notify("Project link copied to clipboard", NOTIFICATION_SUCCESS);
    /* Direct */
    // projectService.copyProjectLink(id).then((res) => {
    //   const { response } = res;
    //   if (res.status === appConstants.SUCCESS_RESPONSE) {
    //     notify(response.message, NOTIFICATION_SUCCESS);
    //     // this.setState({ teamMembers: response.data.members });
    //   } else if (res.status === appConstants.ERROR_RESPONSE) {
    //     // window.alert(response.message);
    //     notify(response.message, NOTIFICATION_FAILURE);
    //   }
    // });
  };

  getTeamMembers = () => {
    /* Direct */
    projectService.getTeamMembers().then((res) => {
      const { response } = res;
      if (res.status === appConstants.SUCCESS_RESPONSE) {
        this.setState({ teamMembers: response.data.members });
      } else if (res.status === appConstants.ERROR_RESPONSE) {
        // window.alert(response.message);
        notify(response.message, NOTIFICATION_FAILURE);
      }
    });
  };

  getProjects = () => {
    this.setState({ requesting: true });
    /* Direct */
    projectService.getProjects().then((res) => {
      const { response } = res;

      if (res.status === appConstants.SUCCESS_RESPONSE) {
        this.setState({ projects: response.data.data });
        this.setState({ requesting: false });
      } else if (res.status === appConstants.ERROR_RESPONSE) {
        // window.alert(response.message);
        notify(response.message, NOTIFICATION_FAILURE);
      }
    });
  };

  toggleDescreption = () => {
    this.setState((prevState) => ({
      ProjectDescription: !prevState.ProjectDescription,
    }));
  };

  openCreateProject = () => {
    this.setState({ openCreateProjectModal: true });
  };

  closeCreateProjectModal = () => {
    this.setState({ openCreateProjectModal: false });
  };

  openEditProject = (project) => {
    this.setState({ project, openEditProjectModal: true });
  };

  closeEditProjectModal = () => {
    this.setState({ openEditProjectModal: false });
  };

  closeShareModal = () => {
    this.setState({ openShareProjectModal: false });
  };

  openShareProject = (projectId) => {
    this.setState({ projectId, openShareProjectModal: true });
  };

  onChangeRadioButton = (e, id) => {
    this.setState({ teamId: id });
  };

  closeDeleteProjectModal = () => {
    this.setState({
      openDeleteProjectModal: false,
      deleteConfirmationText: "",
    });
  };

  openDeleteProject = (project) => {
    this.setState({ project, openDeleteProjectModal: true });
  };

  setDeleteConfirmationText = (event) => {
    this.setState({ deleteConfirmationText: event.target.value });
  }

  deleteProject = () => {
    this.setState({ isRequestingDelete: true });
    projectService.deleteProject(this.state.project._id)
      .then((res) => {
        const { response } = res;
        // if (res.status === appConstants.ERROR_RESPONSE) {
        //   notify(response.message, NOTIFICATION_FAILURE);
        // }
        return projectService.deleteProject(this.state.project._id, response.data);
      })
      .then((res) => {
        notify(res.message, NOTIFICATION_SUCCESS);
        this.getProjects();
        this.closeDeleteProjectModal();
      })
      .finally(() => {
        this.setState({
          isRequestingDelete: false,
          deleteConfirmationText: "",
        });
      });
  };

  sortProjects = (projectsList) => {
    const { sort, filter} = this.props.view;
    let sortedProjectsList = this.state.projects;

    // switch (sort) {
    //   case "newest":
    //     sortedProjectsList = projectsList.sort((a, b) => {
    //       if ((new Date(a.createdAt).getTime()) > (new Date(b.createdAt).getTime())) {
    //         return -1;
    //       }
    //       return 1;
    //     });
    //     break;
    //   case "oldest":
    //     sortedProjectsList = projectsList.sort((a, b) => {
    //       if ((new Date(a.createdAt).getTime()) < (new Date(b.createdAt).getTime())) {
    //         return -1;
    //       }
    //       return 1;
    //     });
    //     break;
    //   default:
    //     sortedProjectsList = projectsList;
    //     break;
    // }

    function sortByDateCreated() {
      switch (sort) {
        case "newest":
          return sortedProjectsList.sort((a, b) => {
            if ((new Date(a.createdAt).getTime()) > (new Date(b.createdAt).getTime())) {
              return -1;
            }
            return 1;
          });
        case "oldest":
          return sortedProjectsList.sort((a, b) => {
            if ((new Date(a.createdAt).getTime()) < (new Date(b.createdAt).getTime())) {
              return -1;
            }
            return 1;
          });
        default:
          return sortedProjectsList;
      }
    }

    function sortByTeamMembers() {
      switch (sort) {
        case "newest":
        case "lowest":
          return sortedProjectsList.sort((a, b) => {
            if (a.userCount < b.userCount) {
              return -1;
            }
            return 1;
          });
        case "oldest":
        case "highest":
          return sortedProjectsList.sort((a, b) => {
            if (a.userCount > b.userCount) {
              return -1;
            }
            return 1;
          });
        default:
          return sortedProjectsList;
      }
    }

    function sortByTimeline() {
      switch (sort) {
        case "newest":
        case "shortest":
          return sortedProjectsList.sort((a, b) => {
            if (
              (new Date(a.expectedEndDate).getTime()) - (new Date(a.startDate).getTime())
              < (new Date(b.expectedEndDate).getTime()) - (new Date(b.startDate).getTime())
            ) {
              return -1;
            }
            return 1;
          });
        case "oldest":
        case "longest":
          return sortedProjectsList.sort((a, b) => {
            if (
              (new Date(a.expectedEndDate).getTime()) - (new Date(a.startDate).getTime())
              > (new Date(b.expectedEndDate).getTime()) - (new Date(b.startDate).getTime())
            ) {
              return -1;
            }
            return 1;
          });
        default:
          return sortedProjectsList;
      }
    }

    function sortBySkills() {
      switch (sort) {
        case "newest":
        case "least":
        case "oldest":
        case "most":
        default:
          return sortedProjectsList;
      }
    }

    switch (filter) {
      case "team_members":
        sortedProjectsList = sortByTeamMembers();
        break;
      case "date_created":
        sortedProjectsList = sortByDateCreated();
        break;
      case "timeline":
        sortedProjectsList = sortByTimeline();
        break;
      case "skills":
        sortedProjectsList = sortBySkills();
        break;
      default:
        break;
    }

    return sortedProjectsList;
  }

  render() {
    const { teamMembers } = this.props;
    const {
      openCreateProjectModal,
      openEditProjectModal,
      openShareProjectModal,
      ProjectDescription,
      openDeleteProjectModal,
      // teamMembers,
      projects,
      project,
      projectId,
      adminRole,
      requesting,
      isRequestingDelete,
      deleteConfirmationText,
    } = this.state;

    if (requesting) {
      return <PageLoader />;
    }

    return (
      <div className="container">
        {projects.length === 0 && (
          <div className="empty-record-container">
            <CardComponent height="100vh">
              <div className="empty-record-content">
                {adminRole ? (
                  <EmptyRecordMessage
                    callAction={this.openCreateProject}
                    width={194}
                    textWidth="336px"
                    message="You have not created any project yet"
                    btnText="Create project"
                    showActionButton
                  />
                ) : (
                  <EmptyRecordMessage
                    callAction={this.openCreateProject}
                    width={194}
                    textWidth="336px"
                    message="You have not created any project yet"
                    btnText="Create project"
                    showActionButton={false}
                  />
                )}
              </div>
            </CardComponent>
          </div>
        )}
        <Row style={{ padding: "0 0.7rem" }}>
          <Col lg={{ size: 12 }}>
            {projects.length > 0 && (
              <div>
                <Row>
                  <Col md={12}>
                    <ProjectsNav
                      adminRole={adminRole}
                      openCreateProject={this.openCreateProject}
                    />
                  </Col>
                </Row>
                <Row>
                  {/* {projects.map((project) => ( */}
                  {this.sortProjects(projects).map((project) => (
                    <Col lg={3} md={4} key={project._id} className="relative">
                      <SingleProject
                        project={project}
                        openEditProjectModal={openEditProjectModal}
                        openEditProject={() => this.openEditProject(project)}
                        openDeleteProject={() => this.openDeleteProject(project)}
                        openShareProject={() => this.openShareProject(project._id)}
                        projectId={project._id}
                        copyProjectLink={() => this.copyProjectLink(project.projectLink)}
                        closeEditProjectModal={this.closeEditProjectModal}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Col>
          <Col>
            <ZeedasModal
              open={openEditProjectModal}
              onClose={this.closeEditProjectModal}
              title="Edit Name & Description"
              description={`For ${project.name}`}
              width={
                window.innerWidth >= 1200
                  ? "35%"
                  : window.innerWidth >= 768
                    ? "50%"
                    : window.innerWidth < 600
                      ? "100%"
                      : "33%"
              }
            >
              <EditProject
                project={project}
                getProjects={this.getProjects}
                closeModal={this.closeEditProjectModal}
              />
            </ZeedasModal>
            <ZeedasModal
              open={openShareProjectModal}
              onClose={this.closeShareModal}
              title="Share Project"
              align="center"
              width={
                window.innerWidth >= 1200
                  ? "35%"
                  : window.innerWidth >= 768
                    ? "50%"
                    : window.innerWidth < 600
                      ? "100%"
                      : "33%"
              }
            >
              <ShareProject
                closeModal={this.closeShareModal}
                projectId={projectId}
              />
            </ZeedasModal>
            <ZeedasModal
              open={openDeleteProjectModal}
              onClose={this.closeDeleteProjectModal}
              title="Delete Project"
              description={`For ${project.name}`}
              width="35%"
            >
              <ActionMessage
                question={`Are you sure you want to delete ${project.name}?`}
                info="This Project will be deleted and can never be retrieved."
                proceedText="Delete this Project"
                btnProceedColor="zd-dark-pink"
                icon={<IconDeleteAlt fill="#fff" />}
                onClickProceed={this.deleteProject}
                onClickCancel={this.closeDeleteProjectModal}
                proceedButtonStyle={{ width: "180px" }}
                cancelButtonStyle={{ width: "100px" }}
                requesting={isRequestingDelete}
                confirmationInput={deleteConfirmationText}
                placeholder="Enter the name of this project to confirm"
                onConfirmationInputChange={this.setDeleteConfirmationText}
                canConfirm={deleteConfirmationText === project.name}
                switchButtonOrder
              />
            </ZeedasModal>
            <ZeedasFullModal
              open={openCreateProjectModal}
              onClose={this.closeCreateProjectModal}
              minHeight="max-content"
              width={
                // eslint-disable-next-line no-nested-ternary
                window.innerWidth >= 768
                  ? "50%"
                  : window.innerWidth < 600
                    ? "100%"
                    : "33%"
              }
            >
              <CreateProject
                teamMembers={teamMembers}
                getProjects={this.getProjects}
                toggleDescreption={this.toggleDescreption}
                ProjectDescription={ProjectDescription}
                closeModal={this.closeCreateProjectModal}
              />
            </ZeedasFullModal>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { requests, projects, users } = state;
  return {
    requesting: requests.requesting,
    projects: projects.projects,
    view: projects.view,
    // teamMembers: projects.projectTeamMembers,
    teamMembers: users.teamsList.coreTeam,
    roles: users.accountInfo.membershipInfo.roles,
  };
}
export default connect(mapStateToProps)(Projects);
