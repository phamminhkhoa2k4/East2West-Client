
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", 
  headers: {
    "Content-Type": "application/json",
  },
});


type getProps = {
  endpoint : string
}

type postProps = {
  endpoint: string;
  payload : any 
};


type putProps = {
  id : number
  endpoint: string;
  payload: any;
};


type deleteProps = {
  id: number;
  endpoint: string;

};
const getData = async ({ endpoint }: getProps) => {
  try {
    const response = await api.get(endpoint);
    return response.data ;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}; 


const createData = async ({endpoint , payload} : postProps) => {
  try {
    const response = await api.post(endpoint , payload);
    return response.data;
  } catch (error) {
    console.error("Error creating data:", error);
  }
};


const updateData = async ({id , payload , endpoint} : putProps) => {
  try {
    const response = await api.put(`/${endpoint}/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

const deleteData = async ({id, endpoint} :deleteProps) => {
  try {
    const response = await api.delete(`/${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

export {api ,getData , createData , updateData ,deleteData  }