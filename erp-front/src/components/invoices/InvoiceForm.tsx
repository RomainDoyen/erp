import { useForm, SubmitHandler } from "react-hook-form";
import { fetchData, createData } from "../../utils/axios";
import FormInput from "../ui/FormInput";
import Button from "../ui/Button";
import axios from "axios";
import { useState } from "react";
import { InputsInvoice } from "../../types/typesComponents";
import { invoicesInputConfig } from "../data/invoicesInputData";
import { showToastSuccess, showToastError } from "../../utils/toastConfig";

export default function InvoiceForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsInvoice>();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<InputsInvoice> = async (data) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    const formattedData = {
      ...data,
      amount: parseFloat(data.amount.toString()),
    };

    try {
      await fetchData("sanctum/csrf-cookie");
      const response = await createData("invoices", formattedData);
      showToastSuccess("Facture créée avec succès !");
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        if (statusCode === 422) {
          setSubmissionError("Les données envoyées ne sont pas valides.");
          showToastError(`Les données envoyées ne sont pas valides. ${error.response?.data.message}`);
        } else {
          setSubmissionError("Une erreur s'est produite. Veuillez réessayer.");
          showToastError(`Une erreur s'est produite. Veuillez réessayer. ${error.response?.data.message}`);
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

        {invoicesInputConfig.map((input, index) => (
          <FormInput
            key={index}
            label={input.label}
            type={input.type}
            name={input.name}
            error={errors[input.name as keyof InputsInvoice]?.message}
            options={input.options || []}
            {...register(input.name, {
              required: input.required,
              ...(input.validation || {}),
            })}
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
