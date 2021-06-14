import axios from "axios";
//server del fake del db
export default axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {'Content-type': 'application/json'}
    }

)
