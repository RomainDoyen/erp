import { useEffect, useState } from 'react';
import api from '../utils/axios';

const Dashboard = () => {
    const [data, setData] = useState([]);

    function fetchData() {
        api.get('http://127.0.0.1:8000/transactions')
            .then((response) => setData(response.data))
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Dashboard</h1>
            {data ? data.length > 0 && (
                <table className="table-auto w-full mt-6">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Type</th>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                      {data.map((transaction: any) => (
                        <tr key={transaction.id}>
                          <td className="border px-4 py-2">{transaction.id}</td>
                          <td className="border px-4 py-2">{transaction.type}</td>
                          <td className="border px-4 py-2">{transaction.amount}</td>
                          <td className="border px-4 py-2">{transaction.description}</td>
                        </tr>
                      ))}
                    </tbody>
                </table>
            ) : (
                <p>No data</p>
            )}
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </div>
    );
};

export default Dashboard;
