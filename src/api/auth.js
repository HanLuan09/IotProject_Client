import axios from "./index";
import { API_SERVER } from "config/constant";

class AuthApi {
  static Login = (data) => {
    return axios.post(`${API_SERVER}login`, data); // data = {code, password}
  };

  static Register = (data) => {
    return axios.post(`${API_SERVER}users/register`, data);
  };

  static Authorize = (code) => {
    return axios.get(`${API_SERVER}sessions/oauth/github?code=${code}`);
  };

  static Logout = (data) => {
    return axios.post(`${API_SERVER}users/logout`, data, {
      headers: { Authorization: `${data.token}` },
    });
  };

  static Subject = (code) => {
    //return axios.get(`${API_SERVER}subject/${code}`);
    return axios.get(`${API_SERVER}subject?code=${code}`);
  };

  static AccountSubject = (code) => {
    //return axios.get(`${API_SERVER}subject/${code}`);
    return axios.get(`${API_SERVER}account/subject?code=${code}`);
  };

  static studentsBySubject = (subjectId) => {
    //return axios.get(`${API_SERVER}subject/students`, code);
    return axios.get(`${API_SERVER}subject/students?code=${subjectId}`);
  };

  static subjectAttendanceById = (subjectId) => {
    return axios.get(`${API_SERVER}subject/attendance?code=${subjectId}`);
  };

  static attendanceMessage = () => {
    return axios.get(`${API_SERVER}receive`);
  };

  static attendanceStudent = (data) => {
    return axios.post(`${API_SERVER}attendance`, data);
  };

  
}

export default AuthApi;
