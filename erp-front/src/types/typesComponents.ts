export type InputsTransaction = {
  type: string;
  amount: number;
  description: string;
};

export type InputsInvoice = {
  customer_name: string;
  amount: number;
  due_date: string;
  status: string;
};