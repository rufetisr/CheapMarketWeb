import React from 'react';

const Contact = () => {
  const emailAddress = "cheapmarket.az@gmail.com"; // Replace with your actual email

  return (
    <div className=" bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Have questions about CheapMarket or found a bug? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* General Inquiries */}
          <div className="bg-white rounded-xl shadow-md p-8 flex items-start space-x-4 border border-gray-100">
            <div className="bg-blue-100 p-3 rounded-lg">
              {/* <Mail className="w-6 h-6 text-blue-600" /> */}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">General Support</h2>
              <p className="text-gray-600 mb-4">For support or any inquiries, reach out to us:.</p>
              <a
                href={`mailto:${emailAddress}`}
                className="text-blue-600 font-semibold hover:underline text-lg"
              >
                {emailAddress}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;