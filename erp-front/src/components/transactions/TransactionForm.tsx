import { useForm, SubmitHandler } from "react-hook-form";
import { fetchData, createData } from "../../utils/axios";
import FormInput from "../ui/FormInput";
import Button from "../ui/Button";
import axios from "axios";
import { useState } from "react";
import { InputsTransaction } from "../../types/typesComponents";
import { transactionsInputConfig } from "../../components/data/transactionsInputData";

export default function TransactionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsTransaction>();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<InputsTransaction> = async (data) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    const formattedData = {
      ...data,
      amount: parseFloat(data.amount.toString()),
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

        {transactionsInputConfig.map((input, index) => (
          <FormInput
            key={index}
            label={input.label}
            type={input.type}
            name={input.name}
            error={errors[input.name as keyof InputsTransaction]?.message}
            options={input.options || []}
            {...register(input.name, input.validation)}
          />
        ))}

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
