import { useRef, useState, type DragEvent, type KeyboardEvent } from "react";
import { Box, Typography, CircularProgress, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { tokens } from "../../theme/theme";
import { adminStyles } from "../../styles/adminStyles";
import { useImageUpload } from "../../hooks/useImageUpload.ts";

type ImageUploadFieldProps = {
  value: string;
  onChange: (url: string) => void;
  token: string | null;
};

export const ImageUploadField = ({
  value,
  onChange,
  token,
}: ImageUploadFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { uploadImage, uploading, uploadError } = useImageUpload(token);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch {
      // uploadError ya quedó seteado dentro del hook, no hay nada más que hacer aquí
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    void handleFile(event.dataTransfer.files?.[0]);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleOpenPicker = () => inputRef.current?.click();

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpenPicker();
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box
        role="button"
        tabIndex={0}
        aria-label="Subir imagen del proyecto: arrastra un archivo o presiona para elegirlo"
        onClick={handleOpenPicker}
        onKeyDown={handleKeyDown}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        sx={{
          border: `1px dashed ${
            isDragging ? tokens.color.amber[500] : tokens.color.border.default
          }`,
          borderRadius: tokens.radius.lg,
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          cursor: "pointer",
          backgroundColor: isDragging
            ? "rgba(245, 166, 35, 0.06)"
            : tokens.color.bg.raised,
          transition: `all ${tokens.transition.normal}`,
          "&:focus-visible": {
            outline: `2px solid ${tokens.color.amber[500]}`,
            outlineOffset: "2px",
          },
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => void handleFile(e.target.files?.[0])}
        />

        {value ? (
          <Box
            component="img"
            src={value}
            alt="Vista previa de la imagen del proyecto"
            sx={{
              width: 64,
              height: 64,
              objectFit: "cover",
              borderRadius: tokens.radius.md,
              border: `1px solid ${tokens.color.border.subtle}`,
              flexShrink: 0,
            }}
          />
        ) : (
          <CloudUploadIcon sx={{ color: tokens.color.text.muted }} />
        )}

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontFamily: tokens.font.mono,
              fontSize: "0.8rem",
              color: tokens.color.text.secondary,
            }}
          >
            {uploading
              ? "Subiendo imagen..."
              : "Arrastra una imagen o haz click para elegirla"}
          </Typography>
          {uploadError && (
            <Typography sx={{ fontSize: "0.75rem", color: "#ef4444", mt: 0.5 }}>
              {uploadError}
            </Typography>
          )}
        </Box>

        {uploading && (
          <CircularProgress size={20} sx={{ color: tokens.color.amber[500] }} />
        )}
      </Box>

      <TextField
        label="O pega una URL de imagen"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={adminStyles.input}
        fullWidth
        size="small"
        helperText="Útil si la imagen ya vive en otro lado (ej. un GitHub raw link)"
      />
    </Box>
  );
};