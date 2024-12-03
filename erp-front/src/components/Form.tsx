import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

type Inputs = {
  type: string;
  amount: number;
  description: string;
};

export default function TransactionForm() {
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
      amount: parseFloat(data.amount),
    };

    console.log("Données formatées envoyées :", formattedData);

    try {
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
      const response = await axios.post("http://127.0.0.1:8000/transactions", formattedData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Transaction créée avec succès :", response.data);
      alert("Transaction créée avec succès !");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erreur lors de la soumission :", error.response?.data);
      }
      setSubmissionError("Une erreur s'est produite lors de la soumission du formulaire.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select {...register('type')} defaultValue="">
          <option value="">Sélectionnez un type</option>
          <option value="Revenue">Revenue</option>
          <option value="Expense">Expense</option>
        </select>
        {errors.type && (
          <span className="text-red-500 text-sm">{errors.type.message}</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Montant</label>
        <input
          type="number"
          step="0.01"
          className={`block w-full p-2 border ${
            errors.amount ? "border-red-500" : "border-gray-300"
          } rounded`}
          placeholder="Montant"
          {...register("amount", { required: "Le montant est requis", min: 0 })}
        />
        {errors.amount && (
          <span className="text-red-500 text-sm">{errors.amount.message}</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <input
          className={`block w-full p-2 border ${
            errors.description ? "border-red-500" : "border-gray-300"
          } rounded`}
          placeholder="Description"
          {...register("description", {
            required: "La description est requise",
            maxLength: {
              value: 255,
              message: "La description ne peut pas dépasser 255 caractères",
            },
          })}
        />
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className={`w-full p-2 text-white ${
          isSubmitting ? "bg-gray-500" : "bg-blue-500"
        } rounded hover:bg-blue-600`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Envoi en cours..." : "Soumettre"}
      </button>

      {submissionError && (
        <div className="text-red-500 text-sm mt-2">{submissionError}</div>
      )}
    </form>
  );
}
