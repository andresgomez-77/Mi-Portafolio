import { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { alpha } from "@mui/material/styles";
import { tokens } from "../../theme/theme";
import { personalInfo } from "../../data/portfolioData";

/** Define the structure of a terminal command execution */
interface TerminalLine {
  command: string;
  response: string | string[];
  delay?: number;
}

/** Sequence of commands that execute automatically in the terminal */
const TERMINAL_SCRIPT: TerminalLine[] = [
  {
    command: "whoami",
    response: personalInfo.name,
  },
  {
    command: "cat rol.txt",
    response: personalInfo.roles[0],
    delay: 200,
  },
  {
    command: "ls skills/ --top",
    response: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
    delay: 200,
  },
  {
    command: "cat status.json",
    response: [
      `"disponible": true,`,
      `"ubicacion": "${personalInfo.location}",`,
      `"modo": "open to work"`,
    ],
    delay: 200,
  },
];

/** Milliseconds per character for typewriter effect */
const TYPE_SPEED = 55;
/** Milliseconds before showing response after command completes */
const RESPONSE_DELAY = 200;

/**
 * Interactive terminal widget that simulates command execution.
 * Typewriter effect for commands and sequential response display.
 */
const TerminalWidget = () => {
  /** Current command index in the sequence */
  const [currentBlock, setCurrentBlock] = useState(0);
  /** Accumulated typed characters for typewriter effect */
  const [typedCommand, setTypedCommand] = useState("");
  /** Whether to display the response for current command */
  const [showResponse, setShowResponse] = useState(false);
  /** Executed commands shown with reduced opacity */
  const [completedBlocks, setCompletedBlocks] = useState<TerminalLine[]>([]);
  /** Sequence completion flag */
  const [finished, setFinished] = useState(false);
  /** Track timeouts for cleanup on unmount */
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timeoutsRef.current.forEach(clearTimeout), []);

  useEffect(() => {
    if (currentBlock >= TERMINAL_SCRIPT.length) {
      setFinished(true);
      return;
    }

    const block = TERMINAL_SCRIPT[currentBlock];
    const command = block.command;
    const extraDelay = block.delay ?? 0;

    setTypedCommand("");
    setShowResponse(false);

    let charIndex = 0;

    const typeNextChar = () => {
      if (charIndex < command.length) {
        const char = command[charIndex++];
        setTypedCommand((prev) => prev + char);
        const t = setTimeout(typeNextChar, TYPE_SPEED + Math.random() * 15);
        timeoutsRef.current.push(t);
      } else {
        const t = setTimeout(() => {
          setShowResponse(true);
          const t2 = setTimeout(() => {
            setCompletedBlocks((prev) => [...prev, block]);
            setCurrentBlock((prev) => prev + 1);
          }, 800 + extraDelay);
          timeoutsRef.current.push(t2);
        }, RESPONSE_DELAY);
        timeoutsRef.current.push(t);
      }
    };

    const t0 = setTimeout(typeNextChar, extraDelay + 150);
    timeoutsRef.current.push(t0);
  }, [currentBlock]);

  const currentScript =
    currentBlock < TERMINAL_SCRIPT.length
      ? TERMINAL_SCRIPT[currentBlock]
      : null;

  return (
    <Box
      aria-label="Terminal interactiva"
      sx={{
        width: "100%",
        borderRadius: tokens.radius.lg,
        backgroundColor: "#0D1117",
        border: `1px solid ${alpha(tokens.color.amber[500], 0.25)}`,
        overflow: "hidden",
        boxShadow: `
          0 0 0 1px ${alpha(tokens.color.amber[500], 0.08)},
          0 20px 40px ${alpha("#000", 0.6)},
          inset 0 1px 0 ${alpha("#fff", 0.04)}
        `,
      }}
    >
      {/* Title bar with window-like appearance */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 1.2,
          backgroundColor: "#161B22",
          borderBottom: `1px solid ${alpha(tokens.color.amber[500], 0.12)}`,
        }}
        aria-hidden="true"
      >
        {/* Traffic light indicators (decorative terminal controls) */}
        {["#FF5F57", "#FFBD2E", "#28CA41"].map((color, i) => (
          <Box
            key={i}
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: color,
              opacity: 0.85,
            }}
          />
        ))}
        <Typography
          sx={{
            fontFamily: tokens.font.mono,
            fontSize: "0.68rem",
            color: alpha("#fff", 0.35),
            letterSpacing: "0.05em",
            ml: 1,
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          ag@portfolio ~ bash
        </Typography>
      </Box>

      {/* Terminal content area */}
      <Box
        sx={{
          p: "16px 20px",
          minHeight: "200px",
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
        role="log"
        aria-live="polite"
      >
        {/* Previously executed commands with reduced opacity */}
        {completedBlocks.map((block, idx) => (
          <Box key={idx} sx={{ opacity: 0.45 }}>
            <TerminalPrompt command={block.command} />
            <TerminalResponse response={block.response} />
          </Box>
        ))}

        {/* Currently executing command with typewriter effect */}
        {currentScript && (
          <Box>
            <TerminalPrompt command={typedCommand} showCursor={!showResponse} />
            <AnimatePresence>
              {showResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <TerminalResponse response={currentScript.response} />
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        )}

        {/* Final cursor after all commands complete */}
        {finished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <TerminalPrompt command="" showCursor />
          </motion.div>
        )}
      </Box>
    </Box>
  );
};

/**
 * Renders the terminal prompt with command text and optional cursor.
 * Includes user, host, and shell indicator styling.
 */
const TerminalPrompt = ({
  command,
  showCursor = false,
}: {
  command: string;
  showCursor?: boolean;
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      lineHeight: 1.8,
    }}
  >
    <Typography
      component="span"
      sx={{
        fontFamily: tokens.font.mono,
        fontSize: "0.78rem",
        color: tokens.color.amber[500],
      }}
    >
      ag
    </Typography>
    <Typography
      component="span"
      sx={{
        fontFamily: tokens.font.mono,
        fontSize: "0.78rem",
        color: alpha("#fff", 0.3),
      }}
    >
      @portfolio
    </Typography>
    <Typography
      component="span"
      sx={{
        fontFamily: tokens.font.mono,
        fontSize: "0.78rem",
        color: "#7C9DBD",
        mx: "4px",
      }}
    >
      :~$
    </Typography>
    <Typography
      component="span"
      sx={{
        fontFamily: tokens.font.mono,
        fontSize: "0.78rem",
        color: "#E6EDF3",
      }}
    >
      {command && ` ${command}`}
    </Typography>
    {showCursor && (
      <Box
        sx={{
          display: "inline-block",
          width: "8px",
          height: "15px",
          backgroundColor: tokens.color.amber[500],
          ml: "3px",
          verticalAlign: "middle",
          "@keyframes termCursor": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0 },
          },
          animation: "termCursor 1s step-end infinite",
        }}
        aria-hidden="true"
      />
    )}
  </Box>
);

/**
 * Displays the terminal response with syntax highlighting.
 * Handles both single-line and multi-line responses.
 */
const TerminalResponse = ({ response }: { response: string | string[] }) => {
  const lines = Array.isArray(response) ? response : [response];
  return (
    <Box sx={{ pl: "12px", mb: "4px" }}>
      {lines.map((line, idx) => (
        <Typography
          key={idx}
          sx={{
            fontFamily: tokens.font.mono,
            fontSize: "0.74rem",
            lineHeight: 1.7,
            color: line.startsWith('"') ? "#79C0FF" : "#7EE787",
          }}
        >
          {line.includes('":') ? (
            <>
              <Box component="span" sx={{ color: "#79C0FF" }}>
                {line.split(":")[0]}:
              </Box>
              <Box component="span" sx={{ color: "#E6EDF3" }}>
                {line.split(":").slice(1).join(":")}
              </Box>
            </>
          ) : (
            line
          )}
        </Typography>
      ))}
    </Box>
  );
};

export default TerminalWidget;
