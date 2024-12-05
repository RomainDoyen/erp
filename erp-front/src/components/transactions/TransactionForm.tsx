import { useForm, SubmitHandler } from "react-hook-form";
import { fetchData, createData } from "../../utils/axios";
import FormInput from "../ui/FormInput";
import Button from "../ui/Button";
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
      await fetchData("sanctum/csrf-cookie");
      const response = await createData("transactions", formattedData);
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
    <div className="p-6">
      <h1 className="text-xl font-bold">Formulaire des Revenus et Dépenses</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <FormInput
          label="Type"
          type="select"
          name="type"
          options={["Sélectionnez un type", "Revenue", "Expense"]}
          {...register("type", { required: "Le type est requis" })}
          error={errors.type?.message}
        />
          
        <FormInput
          label="Montant"
          type="number"
          name="amount"
          {...register("amount", { required: "Le montant est requis", min: 0 })}
          error={errors.amount?.message}
        />

        <FormInput
          label="Description"
          type="text"
          name="description"
          {...register("description", {
            required: "La description est requise",
            maxLength: {
              value: 255,
              message: "La description ne peut pas dépasser 255 caractères",
            },
          })}
          error={errors.description?.message}
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
