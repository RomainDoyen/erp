import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    <Link to="/">Gestion des Transactions</Link>
                </h1>
                <ul className="flex space-x-6">
                    <li>
                        <Link
                            to="/add-transaction"
                            className="hover:text-gray-300 transition duration-200"
                        >
                            Formulaire de Transaction
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/tracking-transaction"
                            className="hover:text-gray-300 transition duration-200"
                        >
                            Suivi des Transactions
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
