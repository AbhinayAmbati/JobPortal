import NavBar from "./NavBar";

const CompanyDetails = () => {
  const companies = [
    {
      id: 1,
      name: "Tech Innovations",
      description: "Leading the way in tech solutions and innovations.",
      location: "San Francisco, CA",
      website: "https://techinnovations.com",
    },
    {
      id: 2,
      name: "Green Solutions",
      description: "Sustainable solutions for a greener planet.",
      location: "Austin, TX",
      website: "https://greensolutions.com",
    },
    {
      id: 3,
      name: "HealthCorp",
      description: "Innovating healthcare for a better tomorrow.",
      location: "New York, NY",
      website: "https://healthcorp.com",
    },
    {
      id: 4,
      name: "Finance Experts",
      description: "Your trusted partner in financial services.",
      location: "Chicago, IL",
      website: "https://financeexperts.com",
    },
    {
        id:5,
        name:"JP Morgan",
        description:"Investment banking company",
        location:"New York",
        website:"https://jpmorgan.com"
    }
  ];

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4 pt-20">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Company Listings</h1>
        <p className="text-lg text-gray-700 mb-6">Explore companies and their offerings.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {companies.map((company) => (
            <div key={company.id} className="bg-white shadow-lg rounded-lg p-6  transition ">
              <h3 className="text-xl font-semibold text-blue-600">{company.name}</h3>
              <p className="text-gray-700 mt-2">{company.description}</p>
              <p className="text-gray-500 mt-2">Location: {company.location}</p>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
              >
                Visit Website
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CompanyDetails;
