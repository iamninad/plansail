import axios from "axios";
import { API_BASE_URI } from "./config";

class UserService {
  // Function to create a new user
  static createUser = async (userData: any) => {
    try {
      const response = await axios.post(`${API_BASE_URI}/users`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Function to validate a user
  static validateUser = async (userData: any) => {
    try {
      const response = await axios.post(`${API_BASE_URI}/users/login`, userData);
      return response.data;
    } catch(error) {
      throw error;
    }
  }
}

export default UserService;
