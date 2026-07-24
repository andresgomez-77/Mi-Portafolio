import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "../../../theme/theme";
import { adminStyles } from "../../../styles/adminStyles";
import { useAuth } from "../../../context/AuthContext";
import { projectsApi, projectsAdminApi } from "../../../services/api";
import { ImageUploadField } from "../ImageUploadField";
import { SortableProjectRow } from "../SortableProjectRow";
import type { Project } from "../../../types";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers";

// `order` ya NO vive en el formulario: lo calcula el backend al crear
// (siempre al final) y solo cambia vía drag & drop o "fijar arriba".
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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectsApi.getAll();
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
    if (!token) {
      setError("Sesión expirada, vuelve a iniciar sesión");
      return;
    }
    setSaving(true);
    setError(null);

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await projectsAdminApi.update(token, editingId, payload);
      } else {
        await projectsAdminApi.create(token, payload);
      }
      await fetchProjects();
      handleClose();
    } catch {
      setError("Error guardando el proyecto");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm("¿Eliminar este proyecto?")) return;
    try {
      await projectsAdminApi.remove(token, id);
      await fetchProjects();
    } catch {
      setError("Error eliminando proyecto");
    }
  };

  /**
   * Persiste un nuevo orden en el backend en una sola llamada (bulk write).
   * Aplica el reorden de forma optimista en la UI y, si el request falla,
   * revierte al estado anterior en vez de dejar la lista desincronizada.
   */
  const persistReorder = async (reordered: Project[]) => {
    if (!token) return;
    const previous = projects;
    setProjects(reordered);
    try {
      const confirmed = await projectsAdminApi.reorder(
        token,
        reordered.map((p) => p._id),
      );
      setProjects(confirmed);
    } catch {
      setProjects(previous);
      setError("No se pudo guardar el nuevo orden, intenta de nuevo");
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex((p) => p._id === active.id);
    const newIndex = projects.findIndex((p) => p._id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    void persistReorder(arrayMove(projects, oldIndex, newIndex));
  };

  const handlePinToTop = (id: string) => {
    const target = projects.find((p) => p._id === id);
    if (!target) return;
    const rest = projects.filter((p) => p._id !== id);
    void persistReorder([target, ...rest]);
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
          {projects.length} proyectos en total — arrastra para reordenar
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

      {error && (
        <Typography
          sx={{ color: "#ef4444", fontFamily: tokens.font.mono, fontSize: "0.8rem" }}
        >
          {error}
        </Typography>
      )}

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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={projects.map((p) => p._id)}
            strategy={verticalListSortingStrategy}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {projects.map((project, index) => (
                <SortableProjectRow
                  key={project._id}
                  project={project}
                  position={index + 1}
                  isFirst={index === 0}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onPinToTop={handlePinToTop}
                />
              ))}
            </Box>
          </SortableContext>
        </DndContext>
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
              sx={{ ...adminStyles.input, gridColumn: "1 / -1" }}
              fullWidth
              multiline
              rows={3}
            />

            <Box sx={{ gridColumn: "1 / -1" }}>
              <ImageUploadField
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
                token={token}
              />
            </Box>

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
              sx={{ ...adminStyles.input, gridColumn: "1 / -1" }}
              fullWidth
              helperText="Ej: React, TypeScript, Node.js"
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