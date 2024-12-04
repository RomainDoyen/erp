import { useEffect, useState } from 'react';
import { fetchData, updateData, deleteData } from '../utils/axios';

const Dashboard = () => {
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
                <table className="table-auto w-full mt-6">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Type</th>
                            <th className="border px-4 py-2">Montant</th>
                            <th className="border px-4 py-2">Déscription</th>
                            <th className="py-2 px-4 text-left">Date</th>
                            <th className="py-2 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((transaction: any) => (
                            <tr key={transaction.id}>
                                <td className="border px-4 py-2">{transaction.id}</td>
                                <td className="border px-4 py-2">{transaction.type}</td>
                                <td className="border px-4 py-2">{transaction.amount}</td>
                                <td className="border px-4 py-2">{transaction.description}</td>
                                <td className="border px-4 py-2">{transaction.created_at}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => editTransaction(transaction.id)}
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => deleteTransaction(transaction.id)}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="mt-6">Aucune transaction disponible</p>
            )}

            {editingTransaction && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold">Modifier la transaction</h2>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="Revenue">Revenue</option>
                                <option value="Expense">Expense</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Montant</label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Mettre à jour
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Dashboard;