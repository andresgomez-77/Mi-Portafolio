import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Chip,
  IconButton,
  Checkbox,
  FormControlLabel,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { alpha } from "@mui/material/styles";
import { tokens } from "../../../theme/theme";
import { adminStyles } from "../../../styles/adminStyles";
import { useAuth } from "../../../context/AuthContext";
import type { Project } from "../../../types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

const emptyForm = {
  title: "",
  description: "",
  image: "",
  tags: "",
  githubUrl: "",
  demoUrl: "",
  badge: "",
  badgeType: "default" as "default" | "featured" | "personal",
  featured: false,
  order: 0,
};

export const ProjectsTab = () => {
  const { token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects`);
      const data = (await res.json()) as Project[];
      setProjects(data);
    } catch {
      setError("Error cargando proyectos");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
    setOpenModal(true);
  };

  const handleEdit = (project: Project) => {
    setEditingId(project._id);
    setForm({
      title: project.title,
      description: project.description,
      image: project.image ?? "",
      tags: project.tags.join(", "),
      githubUrl: project.githubUrl,
      demoUrl: project.demoUrl ?? "",
      badge: project.badge,
      badgeType: project.badgeType ?? "default",
      featured: project.featured ?? false,
      order: project.order,
    });
    setError(null);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    const body = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const url = editingId
      ? `${API_URL}/api/projects/${editingId}`
      : `${API_URL}/api/projects`;

    try {
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        setError("Error guardando el proyecto");
        return;
      }

      await fetchProjects();
      handleClose();
    } catch {
      setError("Error de conexión");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este proyecto?")) return;
    try {
      await fetch(`${API_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchProjects();
    } catch {
      setError("Error eliminando proyecto");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: tokens.font.mono,
            color: tokens.color.text.muted,
            fontSize: "0.8rem",
          }}
        >
          {projects.length} proyectos en total
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenNew}
          sx={adminStyles.button.primary}
        >
          Agregar proyecto
        </Button>
      </Box>

      <Divider sx={{ borderColor: tokens.color.border.subtle }} />

      {/* ── LISTA ──────────────────────────────────────────────────── */}
      {loading ? (
        <Typography
          sx={{
            fontFamily: tokens.font.mono,
            color: tokens.color.text.muted,
            fontSize: "0.8rem",
          }}
        >
          // cargando...
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 2,
          }}
        >
          {projects.map((project) => (
            <Box key={project._id} sx={adminStyles.card}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      color: tokens.color.text.primary,
                      fontWeight: 600,
                      mb: 0.5,
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap" }}>
                    {project.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          fontFamily: tokens.font.mono,
                          fontSize: "0.65rem",
                          backgroundColor: alpha(tokens.color.amber[500], 0.1),
                          color: tokens.color.amber[500],
                        }}
                      />
                    ))}
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    onClick={() => handleEdit(project)}
                    sx={{
                      color: tokens.color.text.muted,
                      "&:hover": { color: tokens.color.amber[500] },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(project._id)}
                    sx={{
                      color: tokens.color.text.muted,
                      "&:hover": { color: "#ef4444" },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* ── MODAL ──────────────────────────────────────────────────── */}
      <Dialog
        open={openModal}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: tokens.color.bg.surface,
            border: `1px solid ${tokens.color.border.default}`,
            borderRadius: tokens.radius.lg,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: tokens.font.mono,
            color: tokens.color.amber[500],
            fontSize: "0.85rem",
          }}
        >
          {editingId ? "// editar proyecto" : "// nuevo proyecto"}
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 2,
              pt: 1,
            }}
          >
            {error && (
              <Typography
                sx={{
                  gridColumn: "1 / -1",
                  color: "#ef4444",
                  fontFamily: tokens.font.mono,
                  fontSize: "0.8rem",
                }}
              >
                {error}
              </Typography>
            )}

            <TextField
              label="Título"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              sx={adminStyles.input}
              fullWidth
            />

            <TextField
              label="Badge"
              value={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.value })}
              sx={adminStyles.input}
              fullWidth
            />

            <TextField
              label="Descripción"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              sx={adminStyles.input}
              fullWidth
              multiline
              rows={3}
            />

            <TextField
              label="Imagen (URL — opcional)"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              sx={adminStyles.input}
              fullWidth
            />

            <TextField
              label="GitHub URL"
              value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              sx={adminStyles.input}
              fullWidth
            />

            <TextField
              label="Demo URL (opcional)"
              value={form.demoUrl}
              onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
              sx={adminStyles.input}
              fullWidth
            />

            <TextField
              label="Tags (separados por coma)"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              sx={adminStyles.input}
              fullWidth
              helperText="Ej: React, TypeScript, Node.js"
            />

            <TextField
              label="Order"
              type="number"
              value={form.order}
              onChange={(e) =>
                setForm({ ...form, order: Number(e.target.value) })
              }
              sx={adminStyles.input}
              fullWidth
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={form.featured}
                  onChange={(e) =>
                    setForm({ ...form, featured: e.target.checked })
                  }
                  sx={{
                    color: tokens.color.amber[500],
                    "&.Mui-checked": { color: tokens.color.amber[500] },
                  }}
                />
              }
              label="Destacado"
              sx={{ color: tokens.color.text.secondary }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              fontFamily: tokens.font.mono,
              borderColor: tokens.color.border.default,
              color: tokens.color.text.muted,
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving || !form.title || !form.githubUrl}
            sx={adminStyles.button.primary}
          >
            {saving ? "Guardando..." : editingId ? "Actualizar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
