import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTasks, putTasks, deleteTasks, postTasks } from "../../Apis";
import { useState } from "react";


const TaskList = () => {
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState('')
  const [newUserName, setNewUserName] = useState('')
  const [newType, setNewType] = useState('')


  const [hideList, setHideList] = useState(false)
  const {
    isLoading,
    isError,
    error,
    data: tasks
  } = useQuery('tasks', getTasks)

  const addTaskMutation = useMutation(postTasks, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks")
    }
  });

  const putTaskMutation = useMutation(putTasks, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks")
    }
  });

  const deleteTaskMutation = useMutation(deleteTasks, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks")
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    addTaskMutation.mutate({ id: Math.random(), Name: newName, UserName: newUserName, Type: newType })
    setNewName('')
    setNewUserName('')
    setNewType('')
    setHideList(!hideList)
  }

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-3">
          <input className="form-control"
            type="text"
            id="new-name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new Task Name" required
          />
        </div>
        <div className="col-3">
          <input className="form-control"
            type="text"
            id="new-name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Enter Assigned To" required
          />
        </div>
        <div className="col-3">
          <input className="form-control"
            type="text"
            id="new-name"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            placeholder="Enter Task Type" required
          />
        </div>
        <div className="col-3">
          <button className="btn btn-primary">
            Create Task
          </button>&nbsp;
          <button className="btn btn-primary" onClick={() => setHideList(!hideList)}>
            Back To List
          </button>
        </div>
      </div>
    </form>
  )
  return (
    <div>
      {hideList &&
        newItemSection
      }

      {!hideList &&
        <div>
          <button className="btn btn-success" onClick={() => setHideList(!hideList)}>
            New Task
          </button>
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
              {tasks?.map((task) =>
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.Name}</td>
                  <td>{task.UserName}</td>
                  <td>{task.Type}</td>
                  <td><button type="button" className="btn btn-link">Update</button></td>
                  <td><button type="button" className="btn btn-link" onClick={() => deleteTaskMutation.mutate({ id: task.id })}>Delete</button></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}

export default TaskList;