import { useForm, SubmitHandler } from "react-hook-form";
import { fetchData, createData } from "../../utils/axios";
import FormInput from "../ui/FormInput";
import Button from "../ui/Button";
import axios from "axios";
import { useState } from "react";

type Inputs = {
  customer_name: string;
  amount: number;
  due_date: string;
  status: string;
};

export default function InvoiceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    const formattedData = {
      ...data,
      amount: parseFloat(data.amount.toString()),
    };

    try {
      await fetchData("sanctum/csrf-cookie");
      const response = await createData("invoices", formattedData);
      alert("Transaction créée avec succès !");
      console.log("Réponse serveur :", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        if (statusCode === 422) {
          setSubmissionError("Les données envoyées ne sont pas valides.");
        } else {
          setSubmissionError("Une erreur s'est produite. Veuillez réessayer.");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Formulaire des Revenus et Dépenses</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <FormInput
          label="Nom du client"
          type="text"
          name="customer_name"
          {...register("customer_name", {
            required: "Le nom du client est requis",
            maxLength: {
              value: 255,
              message: "Le nom ne peut pas dépasser 255 caractères",
            },
          })}
          error={errors.customer_name?.message}
        />

        <FormInput
          label="Montant"
          type="number"
          name="amount"
          {...register("amount", {
            required: "Le montant est requis",
            min: 0,
          })}
          error={errors.amount?.message}
        />

        <FormInput
          label="Échéance"
          type="date"
          name="due_date"
          {...register("due_date", {
            required: "La date d'échéance est requise",
            validate: (value) =>
              new Date(value) > new Date() || "La date doit être future",
          })}
          error={errors.due_date?.message}
        />

        <FormInput
          label="Statut"
          type="select"
          name="status"
          {...register("status", {
            required: "Le statut est requis",
            validate: (value) =>
              ["Paid", "Pending", "Overdue"].includes(value) || "Statut invalide",
          })}
          options={["Paid", "Pending", "Overdue"]}
          error={errors.status?.message}
        />

        <Button
          type="submit"
          className={`w-full p-2 text-white ${
            isSubmitting ? "bg-gray-500" : "bg-blue-500"
          } rounded hover:bg-blue-600`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Envoi en cours..." : "Soumettre"}
        </Button>

        {submissionError && (
          <div className="text-red-500 text-sm mt-2">{submissionError}</div>
        )}
      </form>
    </div>
  );
}
