// src/hooks/useForm.ts
// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM HOOK — useForm
//
// Centraliza toda la lógica del formulario:
// valores, errores, validación y estado de envío.
//
// Concepto nuevo: tipos genéricos en hooks <T>
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback } from "react";

// T es el tipo de los campos del formulario
// Ejemplo: T = { nombre: string; email: string; mensaje: string }
type FormValues = Record<string, string>;
type FormErrors = Record<string, string>;
type FormTouched = Record<string, boolean>;
type ValidatorFn = (values: FormValues) => FormErrors;

export type SubmitStatus = "idle" | "loading" | "success" | "error";

interface UseFormOptions {
  initialValues: FormValues;
  validate: ValidatorFn;
  onSubmit: (values: FormValues) => Promise<void>;
}

interface UseFormReturn {
  values: FormValues;
  errors: FormErrors;
  touched: FormTouched;
  status: SubmitStatus;
  isValid: boolean;
  handleChange: (field: string, value: string) => void;
  handleBlur: (field: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  reset: () => void;
}

const useForm = ({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions): UseFormReturn => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  // Validar en cada cambio para feedback inmediato
  const handleChange = useCallback(
    (field: string, value: string) => {
      const newValues = { ...values, [field]: value };
      setValues(newValues);

      // Solo mostrar error si el campo ya fue tocado (evita errores antes de interactuar)
      if (touched[field]) {
        const newErrors = validate(newValues);
        setErrors(newErrors);
      }
    },
    [values, touched, validate],
  );

  // Marcar como tocado al salir del campo → activa la validación
  const handleBlur = useCallback(
    (field: string) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const newErrors = validate(values);
      setErrors(newErrors);
    },
    [values, validate],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Marcar todos los campos como tocados para mostrar todos los errores
      const allTouched = Object.keys(initialValues).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as FormTouched,
      );
      setTouched(allTouched);

      // Validar antes de enviar
      const currentErrors = validate(values);
      setErrors(currentErrors);

      // Si hay errores no enviamos
      if (Object.keys(currentErrors).length > 0) return;

      setStatus("loading");
      try {
        await onSubmit(values);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    },
    [values, validate, onSubmit, initialValues],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setStatus("idle");
  }, [initialValues]);

  // El formulario es válido si no hay errores y todos los campos tienen valor
  const isValid =
    Object.keys(errors).length === 0 &&
    Object.values(values).every((v) => v.trim().length > 0);

  return {
    values,
    errors,
    touched,
    status,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
};

export default useForm;
