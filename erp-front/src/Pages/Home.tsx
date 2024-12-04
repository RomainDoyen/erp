const Home = () => {
  return (
      <div className="text-center mt-10">
          <h1 className="text-4xl font-bold text-gray-800">
              Bienvenue sur l'application de Gestion financière et comptabilité
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
              Gérez vos revenus et dépenses facilement avec notre interface intuitive.
          </p>
          <div className="mt-6 space-x-4">
              <a
                  href="/add-transaction"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                  Ajouter une Transaction
              </a>
              <a
                  href="/tracking-transaction"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
              >
                  Voir le Suivi
              </a>
          </div>
      </div>
  );
};

export default Home;
