import axios from "axios";

export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post("http://localhost:8080/register", userData);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao registrar usuário.");
  }
};

export const loginUser = async (userData: any) => {
  try {
    const response = await axios.post("http://localhost:8080/login", userData);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao fazer login.");
  }

};
