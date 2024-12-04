import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../Pages/Navbar';
import Home from '../Pages/Home';
import TransactionForm from '../components/transactions/TransactionForm';
import TransactionTracking from '../components/transactions/TransactionTracking';
import InvoiceForm from '../components/invoices/InvoiceForm';
import InvoiceTracking from '../components/invoices/InvoiceTracking';

const AppRoutes = () => {
    return (
        <Router>
            <Navbar />
            <div className="container mx-auto px-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add-transaction" element={<TransactionForm />} />
                    <Route path="/tracking-transaction" element={<TransactionTracking />} />
                    <Route path="/add-invoice" element={<InvoiceForm />} />
                    <Route path="/tracking-invoice" element={<InvoiceTracking />} />
                </Routes>
            </div>
        </Router>
    );
};

export default AppRoutes;
