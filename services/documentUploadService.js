import { axiosInstance } from "./axiosInstance";

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axiosInstance.post("/upload/document", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const removeDocument = async (filePath) => {
  const payload = { files: [filePath] };
  const { data } = await axiosInstance.post("/upload/remove/file", payload);
  return data;
};

