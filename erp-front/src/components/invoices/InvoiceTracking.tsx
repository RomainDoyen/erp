import { useEffect, useState } from 'react';
import { fetchData, updateData, deleteData } from '../../utils/axios';
import Button from '../ui/Button';
import FormInput from '../ui/FormInput';
import Table from '../ui/Table';
import { invoicesInputConfig } from '../data/invoicesInputData';
import Spinner from '../ui/Spinner';
import Modal from '../ui/Modal';
import { showToastSuccess, showToastError } from '../../utils/toastConfig';

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [editingInvoice, setEditingInvoice] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: '',
    amount: '',
    due_date: '',
    status: ''
  });

  const fetchInvoices = async () => {
    setIsLoading(true);
    try {
      const result = await fetchData('invoices');
      setInvoices(result);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchInvoices();
  }, []);

  const editInvoice = async (id: number) => {
    const invoice = invoices.find((i: any) => i.id === id);
    setEditingInvoice(invoice);
    setFormData({
      customer_name: invoice?.customer_name || '',
      amount: invoice?.amount || '',
      due_date: invoice?.due_date || '',
      status: invoice?.status || ''
    });
  }

  const deleteInvoice = async (id: number) => {
    try {
      const result = await deleteData('invoices', id);
      showToastSuccess("Facture supprimée avec succès !");
      setInvoices(invoices.filter((invoice: any) => invoice.id !== id));
    } catch (error) {
      showToastError(`Erreur lors de la suppression ! ${error}`);
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInvoice) return;

    try {
      const result = await updateData('invoices', editingInvoice.id, formData);
      showToastSuccess("Facture mise à jour avec succès !");
      setEditingInvoice(null);
      const updatedData = invoices.map((invoice: any) =>
        invoice.id === editingInvoice.id ? result : invoice
      );
      setInvoices(updatedData);
    } catch (error) {
      showToastError(`Erreur lors de la mise à jour ! ${error}`);
    }
  }

  const closeModal = () => {
    setEditingInvoice(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Liste des Factures</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {invoices.length > 0 ? (
            <Table
              data={invoices}
              columns={[
                { header: 'Nom du client', accessor: (row: any) => row.customer_name },
                { header: 'Montant', accessor: (row: any) => row.amount },
                { header: 'Date d\'échéance', accessor: (row: any) => row.due_date },
                { header: 'Statut', accessor: (row: any) => row.status }
              ]}
              actions={(row: any) => (
                <>
                  <Button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => editInvoice(row.id)}
                  >
                    Modifier
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => deleteInvoice(row.id)}
                  >
                    Supprimer
                  </Button>
                </>
              )}
            />
          ) : (
            <p className="mt-6">Aucune facture trouvée.</p>
          )}
        </>
      )}
    
      {editingInvoice && (
        <Modal isOpen={!!editingInvoice} onClose={closeModal}>
          <form onSubmit={handleFormSubmit} className="mt-4">
            {invoicesInputConfig.map((input, index) => (
              <FormInput
                key={index}
                label={input.label}
                type={input.type}
                name={input.name}
                value={formData[input.name as keyof typeof formData]}
                onChange={e => setFormData({ ...formData, [input.name]: e.target.value })}
                options={input.options}
              />
            ))}

            <Button
              type="submit"
              className="mt-4 bg-green-500 hover:bg-blue-600 text-white p-2 rounded"
            >
              Mettre à jour
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
};