import axios from "axios";

const TUITS_API = "https://software-engineering-a1.herokuapp.com/api/tuits";
const USERS_API = "https://software-engineering-a1.herokuapp.com/api/users";

export const findAllTuits = () =>
    axios.get(TUITS_API)
        .then(response => response.data);

export const findTuitById = (tid) =>
    axios.get(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const findTuitByUser = (uid) =>
    axios.get(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);

export const createTuit = (uid, tuit) => {
    return axios.post(`${USERS_API}/${uid}/tuits`, tuit)
    .then(response => {return response.data}).catch(err => {return null;});
}
    

export const updateTuit = (tid, tuit) =>
    axios.post(`${TUITS_API}/${tid}`, tuit)
        .then(response => response.data);

export const deleteTuit = (tid) =>
    axios.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);
