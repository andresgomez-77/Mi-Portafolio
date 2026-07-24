import { useState } from "react";
import { uploadApi } from "../services/api";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

type UseImageUpload = {
  uploadImage: (file: File) => Promise<string>;
  uploading: boolean;
  uploadError: string | null;
};

/**
 * Sube una imagen directo a Cloudinary desde el navegador.
 *
 * Flujo:
 * 1. Pide una firma temporal a nuestro backend (endpoint autenticado,
 *    request minúsculo — solo JSON, nunca el archivo).
 * 2. Con esa firma, hace el POST del archivo directo a la API de
 *    Cloudinary. El binario nunca pasa por nuestra función serverless,
 *    así que el límite de 4.5MB de Vercel no aplica a la imagen.
 *
 * Devuelve la `secure_url` que se guarda tal cual en el campo `image`
 * del proyecto — no se toca el schema de Mongo.
 */
export const useImageUpload = (token: string | null): UseImageUpload => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string> => {
    setUploading(true);
    setUploadError(null);

    try {
      if (!token) {
        throw new Error("Sesión expirada, vuelve a iniciar sesión");
      }
      if (!file.type.startsWith("image/")) {
        throw new Error("El archivo debe ser una imagen");
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        throw new Error("La imagen no debe superar 5MB");
      }

      const { signature, timestamp, folder, apiKey, cloudName } =
        await uploadApi.getSignature(token);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", String(timestamp));
      formData.append("signature", signature);
      formData.append("folder", folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData },
      );

      if (!uploadRes.ok) {
        throw new Error("Cloudinary rechazó la imagen");
      }

      const uploaded = (await uploadRes.json()) as { secure_url: string };
      return uploaded.secure_url;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error subiendo la imagen";
      setUploadError(message);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading, uploadError };
};