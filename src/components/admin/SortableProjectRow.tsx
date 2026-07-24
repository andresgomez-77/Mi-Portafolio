import { Box, Typography, Chip, IconButton, Tooltip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import PushPinIcon from "@mui/icons-material/PushPin";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { tokens } from "../../theme/theme";
import type { Project } from "../../types";

type SortableProjectRowProps = {
  project: Project;
  position: number;
  isFirst: boolean;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onPinToTop: (id: string) => void;
};

export const SortableProjectRow = ({
  project,
  position,
  isFirst,
  onEdit,
  onDelete,
  onPinToTop,
}: SortableProjectRowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: project._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 10 : "auto",
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 1.5,
        borderRadius: tokens.radius.md,
        border: `1px solid ${tokens.color.border.subtle}`,
        backgroundColor: tokens.color.bg.surface,
        "&:hover": { borderColor: alpha(tokens.color.amber[500], 0.3) },
      }}
    >
      <IconButton
        {...attributes}
        {...listeners}
        aria-label={`Reordenar "${project.title}" — mantén presionado y arrastra, o usa las flechas del teclado`}
        sx={{ cursor: "grab", touchAction: "none", color: tokens.color.text.muted }}
      >
        <DragIndicatorIcon fontSize="small" />
      </IconButton>

      <Typography
        sx={{
          fontFamily: tokens.font.mono,
          fontSize: "0.75rem",
          color: tokens.color.text.muted,
          width: 24,
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        #{position}
      </Typography>

      {project.image ? (
        <Box
          component="img"
          src={project.image}
          alt=""
          sx={{
            width: 40,
            height: 40,
            objectFit: "cover",
            borderRadius: tokens.radius.sm,
            flexShrink: 0,
          }}
        />
      ) : (
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: tokens.radius.sm,
            backgroundColor: tokens.color.bg.raised,
            flexShrink: 0,
          }}
        />
      )}

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            color: tokens.color.text.primary,
            fontWeight: 600,
            fontSize: "0.9rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {project.title}
        </Typography>
        <Box sx={{ display: "flex", gap: 0.6, flexWrap: "wrap", mt: 0.3 }}>
          {project.tags.slice(0, 4).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                fontFamily: tokens.font.mono,
                fontSize: "0.62rem",
                height: 20,
                backgroundColor: alpha(tokens.color.amber[500], 0.1),
                color: tokens.color.amber[500],
              }}
            />
          ))}
        </Box>
      </Box>

      {!isFirst && (
        <Tooltip title="Fijar como el proyecto más importante">
          <IconButton
            onClick={() => onPinToTop(project._id)}
            aria-label={`Fijar "${project.title}" como el proyecto más importante`}
            sx={{
              color: tokens.color.text.muted,
              "&:hover": { color: tokens.color.amber[500] },
            }}
          >
            <PushPinIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      <IconButton
        onClick={() => onEdit(project)}
        aria-label={`Editar "${project.title}"`}
        sx={{
          color: tokens.color.text.muted,
          "&:hover": { color: tokens.color.amber[500] },
        }}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        onClick={() => onDelete(project._id)}
        aria-label={`Eliminar "${project.title}"`}
        sx={{
          color: tokens.color.text.muted,
          "&:hover": { color: "#ef4444" },
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};