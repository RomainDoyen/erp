import { useEffect, useState } from 'react';
import { fetchData, createData } from '../../utils/axios';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  function fetchInvoices() {
    fetchData('invoices')
      .then(response => setInvoices(response.data))
      .catch(error => console.error(error));
  }

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handlePayment = async (invoiceId: number) => {
    try {
      await createData('payments', { invoice_id: invoiceId });
      alert('Paiement effectué');
      fetchInvoices();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="overflow-x-auto bg-white p-4 shadow-lg rounded-lg">
      <table className="min-w-full text-sm text-gray-700">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left">Client</th>
            <th className="py-2 px-4 text-left">Montant</th>
            <th className="py-2 px-4 text-left">Échéance</th>
            <th className="py-2 px-4 text-left">Statut</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td className="py-2 px-4">{invoice?.customer_name}</td>
              <td className="py-2 px-4">{invoice?.amount}</td>
              <td className="py-2 px-4">{new Date(invoice?.due_date).toLocaleDateString()}</td>
              <td className="py-2 px-4">{invoice?.status}</td>
              <td className="py-2 px-4">
                {invoice?.status === 'Unpaid' && (
                  <button
                    onClick={() => handlePayment(invoice.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Payer
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
