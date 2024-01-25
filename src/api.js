import "whatwg-fetch";

export const fetchTaskData = async () => {
    let fetchData = "http://localhost:8000/tasks";
    let response = await fetch(fetchData, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  };

  export const updateTaskData = async (id, data) => {
    let fetchData = `http://localhost:8000/tasks/${id}`;
    let newObj = {name: data.name, dueDate: data.dueDate, status: "closed"}
    let response = await fetch(fetchData, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        
      },
      body:JSON.stringify(newObj)
    });
    const data1 = await response.json();
    return data1;
  };
  export const postTasks = async (data) => {
    let fetchData = 'http://localhost:8000/tasks/';
    let response = await fetch(fetchData, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body:JSON.stringify(data)
    });
    const data1 = await response.json();
    return data1;
  };