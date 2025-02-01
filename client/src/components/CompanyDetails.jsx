import NavBar from "./NavBar";
import { Building2, MapPin, Globe } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mt-20 mb-12">
          <h1 className="text-4xl h-14 md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Company Listings
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore innovative companies and discover exciting career opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {companies.map((company) => (
            <div 
              key={company.id} 
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Building2 className="h-6 w-6 text-blue-500 mr-2" />
                  <h3 className="text-xl font-bold text-gray-800">{company.name}</h3>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{company.description}</p>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                    {company.location}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <Globe className="h-4 w-4 mr-2 text-blue-500" />
                    <a 
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      {company.website.replace('https://', '')}
                    </a>
                  </p>
                </div>
                <div className="mt-6">
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-center font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
