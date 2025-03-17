import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, ScanLine } from 'lucide-react';
import { Button } from '../components/ui/button';

const QRScanner = () => {
  const navigate = useNavigate();

  const handleScan = async () => {
    // In a real app, this would use the device's camera to scan a QR code
    // For demo purposes, we'll simulate scanning and navigation
    const demoRestaurantId = '123';
    navigate(`/restaurant/${demoRestaurantId}`);
  };

  return (
    <div className="max-w-md mx-auto text-center space-y-8">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-primary-100">
        <div className="flex justify-center mb-6">
          <div className="bg-primary-50 p-3 rounded-full">
            <QrCode className="h-8 w-8 text-primary-700" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-primary-900 mb-4">Scan Restaurant QR Code</h2>
        <p className="text-primary-600 mb-8">
          Point your camera at the restaurant's QR code to view their menu and get personalized recommendations
        </p>

        <div className="border-2 border-dashed border-primary-200 rounded-lg p-8 mb-8">
          <div className="flex justify-center mb-4">
            <ScanLine className="h-16 w-16 text-primary-400" />
          </div>
          <p className="text-primary-500 text-sm">Camera viewfinder will appear here</p>
        </div>

        <Button onClick={handleScan} className="w-full">
          Start Scanning
        </Button>
      </div>

      <div className="bg-primary-50 p-6 rounded-xl">
        <h3 className="font-semibold text-primary-900 mb-2">How it works</h3>
        <ol className="text-left text-primary-700 space-y-2">
          <li>1. Find the QR code at your table or restaurant entrance</li>
          <li>2. Scan the code using your phone's camera</li>
          <li>3. Get instant access to the menu with personalized recommendations</li>
        </ol>
      </div>
    </div>
  );
};

export default QRScanner;