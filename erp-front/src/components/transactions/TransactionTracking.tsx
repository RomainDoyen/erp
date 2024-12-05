import { useEffect, useState } from 'react';
import { fetchData, updateData, deleteData } from '../../utils/axios';
import Button from '../ui/Button';
import FormInput from '../ui/FormInput';
import Table from '../ui/Table';

export default function TransactionTracking() {
    const [data, setData] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState<any | null>(null);
    
    const [formData, setFormData] = useState({
        type: '',
        amount: '',
        description: ''
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchData('transactions');
                setData(result);
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, []);

    const deleteTransaction = async (id: number) => {
        try {
            const result = await deleteData('transactions', id);
            console.log("Transaction supprimée avec succès :", result);
            alert("Transaction supprimée avec succès !");
            setData(data.filter((transaction: any) => transaction.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    const editTransaction = async (id: number) => {
        const transaction = data.find((t: any) => t.id === id);
        setEditingTransaction(transaction);
        setFormData({
            type: transaction?.type,
            amount: transaction?.amount,
            description: transaction?.description
        });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingTransaction) return;

        try {
            const result = await updateData('transactions', editingTransaction.id, formData);
            console.log("Transaction mise à jour avec succès :", result);
            alert("Transaction mise à jour avec succès !");
            setEditingTransaction(null);
            const updatedData = data.map((transaction: any) =>
                transaction.id === editingTransaction.id ? result : transaction
            );
            setData(updatedData);
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Suivi des Revenus et Dépenses</h1>
            {data.length > 0 ? (
                <Table
                    data={data}
                    columns={[
                        { header: 'ID', accessor: (row: any) => row.id },
                        { header: 'Type', accessor: (row: any) => row.type },
                        { header: 'Montant', accessor: (row: any) => row.amount },
                        { header: 'Description', accessor: (row: any) => row.description },
                        { header: 'Date', accessor: (row: any) => row.created_at }
                    ]}
                    actions={(row: any) => (
                        <>
                            <Button 
                                theme='primary'
                                onClick={() => editTransaction(row.id)}
                            >
                                Modifier
                            </Button>
                            <Button
                                theme='secondary'
                                onClick={() => deleteTransaction(row.id)}
                            >
                                Supprimer
                            </Button>
                        </>
                    )}
                />
            ) : (
                <p className="mt-6">Aucune transaction disponible</p>
            )}

            {editingTransaction && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold">Modifier la transaction</h2>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <FormInput
                            label="Type"
                            type="select"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            options={["Revenue", "Expense"]}
                        />
                        <FormInput
                            label="Montant"
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                        />
                        <FormInput
                            label="Description"
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                        <div>
                            <Button
                                type="submit"
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Mettre à jour
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};