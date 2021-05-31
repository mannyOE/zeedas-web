export default [
  {
    title: "Backlog",
    status: "backlog",
    stage: "pending",
    state: [null, "no-test", "has-test"],
    tasks: [],
    appFilter: [],
    userFilter: [],
  },
  {
    title: "Assigned",
    status: "assigned",
    stage: "pending",
    tasks: [],
    appFilter: [],
    userFilter: [],
  },
  {
    title: "Planning",
    status: "in_progress",
    stage: "planning",
    tasks: [],
    appFilter: [],
    userFilter: [],
  },
  {
    title: "Development",
    status: "in_progress",
    stage: "development",
    tasks: [],
    appFilter: [],
    userFilter: [],
  },
  {
    title: "In Review",
    status: "planning",
    stage: "in_review",
    state: ["ea-review", "qa-review"],
    tasks: [],
    appFilter: [],
    userFilter: [],
  },
  {
    title: "Done",
    status: "complete",
    tasks: [],
    appFilter: [],
    userFilter: [],
  },
];

// export const projectManager = [
//   {
//     title: "backlog",
//     entry: {
//       state: [null, "no-test", "has-test"],
//       status: "backlog",
//     },
//   },
// ];
