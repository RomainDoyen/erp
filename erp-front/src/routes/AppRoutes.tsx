import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import TransactionForm from '../components/TransactionForm';
import TransactionTracking from '../components/TransactionTracking';

const AppRoutes = () => {
    return (
        <Router>
            <Navbar />
            <div className="container mx-auto px-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add-transaction" element={<TransactionForm />} />
                    <Route path="/tracking-transaction" element={<TransactionTracking />} />
                </Routes>
            </div>
        </Router>
    );
};

export default AppRoutes;
