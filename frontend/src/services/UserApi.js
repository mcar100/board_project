import { convertFormToObject, changeObjectKeyName } from "../utils/convertor";
import { removeCookie, setCookie } from "../utils/cookies";
import callAxios from "./axios";

export const login = async (formRef) => {
  const formData = convertFormToObject(formRef.current);
  changeObjectKeyName(formData, "g-recaptcha-response", "recaptcha"); // ['g-recaptcha-response'] -> ['recaptcha']

  try {
    const response = await callAxios.post("/auth/login", formData);

    if (formData.emailCheck === "true") {
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      setCookie("email", formData.email, { path: "/login", expires });
    } else {
      removeCookie("email", { path: "/login" });
    }

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 30);
    setCookie("userId", response.data.userId, { path: "/", expires });

    return { success: true, message: response.data.message, url: "/" };
  } catch (thrown) {
    return { success: false, message: thrown.response.data.message };
  }
};

export const logout = async () => {
  const response = await callAxios.get("/auth/logout");
  if (response.status === 200) {
    removeCookie("userId", { path: "/" });
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

export const getUserProfile = async () => {
  const response = await callAxios.get("/user/profile");
  if (response.status === 200) {
    return { message: null, data: response.data };
  }
  return null;
};
