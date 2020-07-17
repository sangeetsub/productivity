export const taskDescriptionMapper = [
  [["Waste"], ["Extraordinary Productivity"]],
  [["Distraction"], ["Necessity"]],
];

export const taskQuarterMapper = [
  [4, 2],
  [3, 1],
];

export const taskDescriptionsByQuarter = [
  "",
  "Necessity",
  "Extraordinary Productivity",
  "Distraction",
  "Waste",
];

export const isTasksUpdated = (tasks) => {
  //TODO: check if prev length of each index is same or not.
};

export const taskInQArray = (myTasks) => {
  const tasks = new Array(5).fill(0).map(() => []);
  if (myTasks !== null && myTasks.length > 0) {
    myTasks.forEach((task) => {
      const index = taskQuarterMapper[task.urgency][task.importancy];
      tasks[index] = [...tasks[index], task];
    });
  }
  // will need to omit index 1 to properly encode to quarter
  delete tasks[0];
  return tasks;
};
