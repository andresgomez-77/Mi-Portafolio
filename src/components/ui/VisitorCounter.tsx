/**
 * Real-time visitor counter using window.storage (Claude.ai persistent storage).
 * Increments on each page load and persists data across sessions.
 *
 * NOTE: window.storage only works in Claude.ai environment.
 * For production deployment (Vercel/Netlify), replace with:
 * - Supabase: https://supabase.com
 * - Upstash Redis: https://upstash.com
 * - Firebase Realtime DB
 */

import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { alpha } from "@mui/material/styles";
import { tokens } from "../../theme/theme";
import useCountUp from "../../hooks/useCountUp";

/** Data structure for visitor statistics storage */
interface VisitorData {
  total: number; // Total visits across all time
  today: number; // Visits on current day
  lastDate: string; // Date of last visit (YYYY-MM-DD)
  lastReset: string; // Last daily counter reset date
}

/** Get current date as ISO string (YYYY-MM-DD format) */
const getTodayStr = () => new Date().toISOString().split("T")[0];

/**
 * Visitor counter component with count-up animation.
 * Displays total and daily visit counts with animated increment.
 */
const VisitorCounter = () => {
  const [data, setData] = useState<VisitorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  /** Trigger count-up animation only when data loads and component is visible */
  const totalCount = useCountUp({
    end: data?.total ?? 0,
    duration: 1500,
    trigger: visible && !loading,
  });

  const todayCount = useCountUp({
    end: data?.today ?? 0,
    duration: 1000,
    trigger: visible && !loading,
  });

  useEffect(() => {
    const registerVisit = async () => {
      try {
        const today = getTodayStr();
        let current: VisitorData = {
          total: 0,
          today: 0,
          lastDate: today,
          lastReset: today,
        };

        // Read existing visitor data from storage
        try {
          const result = await window.storage?.get("portfolio:visitors", true);
          if (result?.value) {
            const parsed = JSON.parse(result.value) as VisitorData;
            current = parsed;
          }
        } catch {
          // First visit or storage error - use default values
        }

        // Reset daily counter if new day detected
        if (current.lastReset !== today) {
          current.today = 0;
          current.lastReset = today;
        }

        // Increment counters for this visit
        current.total += 1;
        current.today += 1;
        current.lastDate = today;

        // Save with shared=true so count is visible to all users
        await window.storage?.set(
          "portfolio:visitors",
          JSON.stringify(current),
          true, // shared flag for global visibility
        );

        setData(current);
      } catch (err) {
        // Fallback if storage unavailable (outside Claude.ai environment)
        console.warn("Storage unavailable, using fallback data:", err);
        setData({
          total: 247,
          today: 12,
          lastDate: getTodayStr(),
          lastReset: getTodayStr(),
        });
      } finally {
        setLoading(false);
        // Small delay for smooth count-up animation
        setTimeout(() => setVisible(true), 200);
      }
    };

    registerVisit();
  }, []);

  if (loading) {
    return <VisitorSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 2,
          py: 1.2,
          borderRadius: tokens.radius.md,
          border: `1px solid ${tokens.color.border.subtle}`,
          backgroundColor: alpha(tokens.color.bg.surface, 0.6),
          backdropFilter: "blur(8px)",
          width: "fit-content",
        }}
        role="status"
        aria-label={`${data?.total} visitas totales al portafolio`}
      >
        {/* Pulsing indicator dot */}
        <Box
          sx={{
            position: "relative",
            width: "10px",
            height: "10px",
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          {/* Outer ripple wave animation */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              backgroundColor: alpha(tokens.color.amber[500], 0.3),
              "@keyframes ping": {
                "0%": { transform: "scale(1)", opacity: 0.8 },
                "100%": { transform: "scale(2.5)", opacity: 0 },
              },
              animation: "ping 2s ease-out infinite",
            }}
          />
          {/* Punto interior */}
          <Box
            sx={{
              position: "absolute",
              inset: "2px",
              borderRadius: "50%",
              backgroundColor: tokens.color.amber[500],
            }}
          />
        </Box>

        {/* Total */}
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
          <Typography
            sx={{
              fontFamily: tokens.font.display,
              fontSize: "1.4rem",
              lineHeight: 1,
              color: tokens.color.amber[500],
            }}
          >
            {totalCount.toLocaleString()}
          </Typography>
          <Typography
            sx={{
              fontFamily: tokens.font.mono,
              fontSize: "0.62rem",
              color: tokens.color.text.muted,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            visitas
          </Typography>
        </Box>

        {/* Separador */}
        <Box
          sx={{
            width: "1px",
            height: "24px",
            backgroundColor: tokens.color.border.subtle,
            flexShrink: 0,
          }}
          aria-hidden="true"
        />

        {/* Hoy */}
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
          <Typography
            sx={{
              fontFamily: tokens.font.mono,
              fontSize: "0.95rem",
              lineHeight: 1,
              color: tokens.color.text.secondary,
              fontWeight: 500,
            }}
          >
            {todayCount}
          </Typography>
          <Typography
            sx={{
              fontFamily: tokens.font.mono,
              fontSize: "0.62rem",
              color: tokens.color.text.muted,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            hoy
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

// ── Skeleton mientras carga ───────────────────────────────────────────────────
const VisitorSkeleton = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      px: 2,
      py: 1.2,
      borderRadius: tokens.radius.md,
      border: `1px solid ${tokens.color.border.subtle}`,
      backgroundColor: alpha(tokens.color.bg.surface, 0.4),
      width: "fit-content",
      "@keyframes shimmer": {
        "0%": { opacity: 0.4 },
        "50%": { opacity: 0.8 },
        "100%": { opacity: 0.4 },
      },
      animation: "shimmer 1.5s ease-in-out infinite",
    }}
    aria-hidden="true"
  >
    <Box
      sx={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: tokens.color.border.default,
      }}
    />
    <Box
      sx={{
        width: "80px",
        height: "16px",
        borderRadius: tokens.radius.sm,
        backgroundColor: tokens.color.border.default,
      }}
    />
    <Box
      sx={{
        width: "1px",
        height: "24px",
        backgroundColor: tokens.color.border.subtle,
      }}
    />
    <Box
      sx={{
        width: "50px",
        height: "16px",
        borderRadius: tokens.radius.sm,
        backgroundColor: tokens.color.border.default,
      }}
    />
  </Box>
);

// ── Augmentar el tipo Window para typescript ──────────────────────────────────
declare global {
  interface Window {
    storage?: {
      get: (
        key: string,
        shared?: boolean,
      ) => Promise<{ key: string; value: string; shared: boolean } | null>;
      set: (
        key: string,
        value: string,
        shared?: boolean,
      ) => Promise<{ key: string; value: string; shared: boolean } | null>;
      delete: (
        key: string,
        shared?: boolean,
      ) => Promise<{ key: string; deleted: boolean; shared: boolean } | null>;
      list: (
        prefix?: string,
        shared?: boolean,
      ) => Promise<{ keys: string[]; prefix?: string; shared: boolean } | null>;
    };
  }
}

export default VisitorCounter;
