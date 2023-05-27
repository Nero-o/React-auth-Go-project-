import axios from "axios";

export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post("http://localhost:8080/api/register", userData);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao registrar usuário.");
  }
};

export const loginUser = async (userData: any) => {
  try {
    const response = await axios.post("http://localhost:8080/api/login", userData);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao fazer login.");
  }

};
