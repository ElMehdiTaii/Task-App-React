import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTasks, putTasks, deleteTasks, postTasks } from "../../Apis";
import { useState } from "react";


const TaskList = () => {
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState('')
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
    addTaskMutation.mutate({ id: 21, Name: newName, UserName: "3582197214794723", Type: "Yearly" })
    setNewName('')
  }

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <input className="form-control"
            type="text"
            id="new-name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new Task Name"
          />
        </div>
        <div className="col-4">
          <button className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  )
  console.log(tasks)  
  return (  <main>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        {tasks?.map((task) => {
          <tr key={task.id}>
            <th scope="row">{task}</th>
          </tr>
        })}
      </tbody>
    </table>
  </main>)
}

export default TaskList;