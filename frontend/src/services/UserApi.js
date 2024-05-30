import { convertFormToObject, changeObjectKeyName } from "../utils/convertor";
import callAxios from "./axios";

export const login = async (formRef) => {
  const formData = convertFormToObject(formRef.current);
  changeObjectKeyName(formData, "g-recaptcha-response", "recaptcha"); // ['g-recaptcha-response'] -> ['recaptcha']
  const response = await callAxios.post("/auth/login", formData);
  if (response.status === 200) {
    return { message: response.data, url: "/" };
  }
  return null;
};

export const logout = async () => {
  const response = await callAxios.get("/auth/logout");
  if (response.status === 200) {
    return { message: response.data, url: "/login" };
  }
};

export const register = async (formRef) => {
  const formData = convertFormToObject(formRef.current);
  const response = await callAxios.post("/users", formData);
  if (response.status === 200) {
    return { message: response.data, url: "/login" };
  }
  return null;
};

export const checkDuplicate = async (inputRef) => {
  const { name, value } = inputRef.current;
  const response = await callAxios.get("/users/duplication", {
    params: { type: name, value },
  });
  if (response.status === 200) {
    return { message: response.data, value };
  }
  return null;
};

export const sendEmailVerification = async (email) => {
  const response = await callAxios.post("/auth/email", { email });
  if (response.status === 200) {
    return { message: response.data };
  }
  return null;
};

export const checkEmailVerification = async (code) => {
  const response = await callAxios.post("/auth/verification", {
    userNum: code,
  });
  if (response.status === 200) {
    return { message: response.data };
  }
  return null;
};
