import React from "react";

function TaskDetails({ match }) {
  return <div> <h2>The Item Id is :</h2> {match.params.id}</div>;
}

export default TaskDetails;
