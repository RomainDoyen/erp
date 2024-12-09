import { FormInputProps } from '../../types/typesUI';

export const invoicesInputConfig: FormInputProps[] = [
  {
    label: "Nom du client",
    type: "text",
    name: "customer_name",
    required: true,
    validation: {
      maxLength: { value: 255, message: "Le nom ne peut pas dépasser 255 caractères" },
      validate: (value) => value.trim().length > 0 || "Le nom du client est requis",
    },
  },
  {
    label: "Montant",
    type: "number",
    name: "amount",
    required: true,
    validation: { 
      min: { value: 0, message: "Le montant doit être supérieur à 0" },
      validate: (value) => !isNaN(parseFloat(value)) || "Le montant est requis",
    },
  },
  {
    label: "Échéance",
    type: "date",
    name: "due_date",
    required: true,
    validation: {
      validate: (value) => new Date(value) > new Date() || "La date doit être future",
    },
  },
  {
    label: "Statut",
    type: "select",
    name: "status",
    required: true,
    options: ["Paid", "Pending", "Overdue"],
    validation: {
      validate: (value) => value !== "Sélectionnez un statut" || "Le statut est requis",
    },
  },
];