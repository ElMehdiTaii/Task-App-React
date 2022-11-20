import axios from "axios";

const Apis = axios.create({
    baseURL: "http://localhost:3000"
});

export const getTasks = async () => {
    const response = await Apis.get("/tasks")
    console.log(Apis)
    return response.data
};

export const postTasks = async (task) => {
    return await Apis.post("/tasks", task)
};

export const putTasks = async (task) => {
    return await Apis.put(`/tasks/${task.id}`, task)
};

export const deleteTasks = async ({id}) => {
    return await Apis.delete(`/tasks/${id}`,id)
};

export default Apis;