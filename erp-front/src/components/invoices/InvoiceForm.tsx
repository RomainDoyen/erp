import { useForm, SubmitHandler } from "react-hook-form";
import { fetchData, createData } from "../../utils/axios";
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
        {/* Nom du client */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Client</label>
          <input
            className={`block w-full p-2 border ${
              errors.customer_name ? "border-red-500" : "border-gray-300"
            } rounded`}
            placeholder="Nom du client"
            aria-invalid={!!errors.customer_name}
            {...register("customer_name", {
              required: "Le nom du client est requis",
              maxLength: {
                value: 255,
                message: "Le nom ne peut pas dépasser 255 caractères",
              },
            })}
          />
          {errors.customer_name && (
            <span className="text-red-500 text-sm">{errors.customer_name.message}</span>
          )}
        </div>

        {/* Montant */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Montant</label>
          <input
            type="number"
            step="0.01"
            className={`block w-full p-2 border ${
              errors.amount ? "border-red-500" : "border-gray-300"
            } rounded`}
            placeholder="Montant"
            aria-invalid={!!errors.amount}
            {...register("amount", { required: "Le montant est requis", min: 0 })}
          />
          {errors.amount && (
            <span className="text-red-500 text-sm">{errors.amount.message}</span>
          )}
        </div>

        {/* Date d'échéance */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Échéance</label>
          <input
            type="date"
            className={`block w-full p-2 border ${
              errors.due_date ? "border-red-500" : "border-gray-300"
            } rounded`}
            aria-invalid={!!errors.due_date}
            {...register("due_date", {
              required: "La date d'échéance est requise",
              validate: (value) =>
                new Date(value) > new Date() || "La date doit être future",
            })}
          />
          {errors.due_date && (
            <span className="text-red-500 text-sm">{errors.due_date.message}</span>
          )}
        </div>

        {/* Statut */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Statut</label>
          <select
            className={`block w-full p-2 border ${
              errors.status ? "border-red-500" : "border-gray-300"
            } rounded`}
            defaultValue=""
            aria-invalid={!!errors.status}
            {...register("status", {
              required: "Le statut est requis",
              validate: (value) => ["Paid", "Pending", "Overdue"].includes(value) || "Statut invalide",
            })}
          >
            <option value="">Sélectionnez un statut</option>
            <option value="Paid">Payé</option>
            <option value="Pending">En attente</option>
            <option value="Overdue">En retard</option>
          </select>
          {errors.status && (
            <span className="text-red-500 text-sm">{errors.status.message}</span>
          )}
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          className={`w-full p-2 text-white ${
            isSubmitting ? "bg-gray-500" : "bg-blue-500"
          } rounded hover:bg-blue-600`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Envoi en cours..." : "Soumettre"}
        </button>

        {/* Erreur de soumission */}
        {submissionError && (
          <div className="text-red-500 text-sm mt-2">{submissionError}</div>
        )}
      </form>
    </div>
  );
}
