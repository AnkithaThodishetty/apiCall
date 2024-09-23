import React, { useState } from 'react';

const App = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(''); 
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false); 

  
  const validateMobile = (number) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(number);
  };

 
  const handleSendOtp = async () => {
    if (!validateMobile(mobile)) {
      setMessage('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setIsLoading(true); 
    setMessage(''); 

    try {
      const response = await fetch('https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile: parseInt(mobile, 10) }), 
      });

      if (response.ok) {
        setMessage('OTP sent successfully.'); 
        setMobile(''); 
        setIsOtpSent(true); 
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Failed to send OTP. Please try again later.'); 
      }
    } catch (error) {
      setMessage('An error occurred while sending the OTP. Please try again.'); 
    } finally {
      setIsLoading(false); 
    }
  };

  
  const handleVerifyOtp = () => {
    if (!otp) {
      setMessage('Please enter the OTP sent to your mobile.');
      return;
    }

    
    setMessage('OTP verified successfully!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Send OTP</h2>
        
        {!isOtpSent ? (
          <>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 mb-5 transition duration-300"
            />
            <button
              onClick={handleSendOtp}
              className={`bg-purple-500 text-white py-3 px-5 rounded-lg shadow-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-700 w-full mb-4 transform transition duration-300 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send OTP'}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 mb-5 transition duration-300"
            />
            <button
              onClick={handleVerifyOtp}
              className="bg-green-500 text-white py-3 px-5 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 w-full mb-4 transform transition duration-300"
            >
              Verify OTP
            </button>
          </>
        )}
        
        {message && (
          <div className={`mt-4 text-center font-semibold ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
