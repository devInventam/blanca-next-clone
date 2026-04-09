import { useState } from "react";
import { removeDocument, uploadDocument } from "../services/documentUploadService";

export const useDocumentUploader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadFile = async (file) => {
    setIsLoading(true);
    try {
      const response = await uploadDocument(file);
      const uploadedPath = response?.data?.url || response?.data?.path || "";
      return uploadedPath;
    } catch (error) {
      console.error("Failed to upload document:", error);
      return "";
    } finally {
      setIsLoading(false);
    }
  };

  const removeUploadedFile = async (filePath) => {
    if (!filePath) return null;

    setIsLoading(true);
    try {
      const response = await removeDocument(filePath);
      return response;
    } catch (error) {
      console.error("Failed to remove document:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadFile,
    removeUploadedFile,
    isLoading,
  };
};

