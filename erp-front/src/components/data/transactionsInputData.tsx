import { FormInputProps } from '../../types/typesUI';

export const transactionsInputConfig: FormInputProps[] = [
  {
    label: "Type",
    type: "select",
    name: "type",
    required: true,
    options: ["Sélectionnez un type", "Revenue", "Expense"],
    validation: {
      validate: (value) => value !== "Sélectionnez un type" || "Le type est requis",
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
    label: "Date",
    type: "date",
    name: "date",
    required: true,
    validation: {
      validate: (value) => new Date(value) <= new Date() || "La date doit être passée",
    },
  },
  {
    label: "Description",
    type: "text",
    name: "description",
    required: false,
    validation: {
      maxLength: { value: 255, message: "La description ne peut pas dépasser 255 caractères" },
      validate: (value) => value.trim().length > 0 || "La description est requise",
    },
  },
];