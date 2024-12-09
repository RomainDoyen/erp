import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white rounded-full">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    <Link 
                        className="text-gray-100 hover:text-gray-300 transition duration-200" 
                        to="/"
                    >
                        Accueil
                    </Link>
                </h1>
                <ul className="flex space-x-6">
                    <li>
                        <Link
                            to="/add-transaction"
                            className="text-gray-100 hover:text-gray-300 transition duration-200"
                        >
                            Formulaire de Transaction
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/tracking-transaction"
                            className="text-gray-100 hover:text-gray-300 transition duration-200"
                        >
                            Suivi des Transactions
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/add-invoice"
                            className="text-gray-100 hover:text-gray-300 transition duration-200"
                        >
                            Formulaire de Facture
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/tracking-invoice"
                            className="text-gray-100 hover:text-gray-300 transition duration-200"
                        >
                            Suivi des Factures
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
