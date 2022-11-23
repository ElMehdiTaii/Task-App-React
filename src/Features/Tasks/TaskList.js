import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTasks, putTasks, deleteTasks, postTasks } from "../../Apis";
import { useRef, useState, useEffect } from "react";

const TaskList = () => {
  const queryClient = useQueryClient();
  const taskAssignedTo = useRef();
  const taskName = useRef();
  const taskType = useRef();
  const [editedTask, setEditedTask] = useState(null);
  const [hideList, setHideList] = useState(false)

  useEffect(() => {
    if (editedTask && hideList) {

      taskName.current.value = editedTask.Name;
      taskAssignedTo.current.value = editedTask.UserName;
      taskType.current.value = editedTask.Type;
    }
  }, [hideList]);

  const {
    isLoading,
    isError,
    error,
    data: tasks,
  } = useQuery("tasks", getTasks);

  const addTaskMutation = useMutation(postTasks, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const putTaskMutation = useMutation(putTasks, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const deleteTaskMutation = useMutation(deleteTasks, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedTask) {
      putTaskMutation.mutate({
        id: editedTask.id,
        Name: taskName.current.value,
        UserName: taskAssignedTo.current.value,
        Type: taskType.current.value,
      });
      setEditedTask(null);
    } else {
      addTaskMutation.mutate({
        id: Math.random(),
        Name: taskName.current.value,
        UserName: taskAssignedTo.current.value,
        Type: taskType.current.value,
      });
    }
    setHideList(!hideList);
  };

  const handleEdit = (task) => {
    setEditedTask(task);
    setHideList(!hideList);
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-3">
          <input
            className="form-control"
            type="text"
            id="new-name"
            ref={taskName}
            placeholder="Enter new Task Name"
            required
          />
        </div>
        <div className="col-3">
          <input
            className="form-control"
            type="text"
            id="new-name"
            ref={taskAssignedTo}
            placeholder="Enter Assigned To"
            required
          />
        </div>
        <div className="col-3">
          <input
            className="form-control"
            type="text"
            id="new-name"
            ref={taskType}
            placeholder="Enter Task Type"
            required
          />
        </div>
        <div className="col-3">
          <button className="btn btn-primary">
            {editedTask ? "Update" : "Create"} Task
          </button>
          &nbsp;
          <button
            className="btn btn-primary"
            onClick={() => {
              setHideList(!hideList);
              setEditedTask(null);
            }}
          >
            Back To List
          </button>
        </div>
      </div>
    </form>
  );
  return (
    <div>
      {hideList && newItemSection}

      {!hideList && (
        <div>
          <button
            className="btn btn-success"
            onClick={() => setHideList(!hideList)}
          >
            New Task
          </button>
          {isLoading && <p>Loading...</p>}
          {!isLoading &&
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Assigned To</th>
                  <th scope="col">Type</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tasks?.map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.Name}</td>
                    <td>{task.UserName}</td>
                    <td>{task.Type}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-link"
                        onClick={() => handleEdit(task)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-link"
                        onClick={() => deleteTaskMutation.mutate({ id: task.id })}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>}
        </div>
      )}
    </div>
  );
};

export default TaskList;
