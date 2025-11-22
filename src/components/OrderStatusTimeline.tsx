import React from 'react';

interface OrderStatusTimelineProps {
  currentStatus: string;
}

export const OrderStatusTimeline: React.FC<OrderStatusTimelineProps> = ({ currentStatus }) => {
  const statuses = [
    { key: 'pending', label: 'Order Placed', icon: '📋' },
    { key: 'confirmed', label: 'Confirmed', icon: '✅' },
    { key: 'processing', label: 'Processing', icon: '🔄' },
    { key: 'shipped', label: 'Shipped', icon: '🚚' },
    { key: 'delivered', label: 'Delivered', icon: '📦' }
  ];

  const getStatusIndex = (status: string) => {
    return statuses.findIndex(s => s.key === status.toLowerCase());
  };

  const currentStatusIndex = getStatusIndex(currentStatus);

  const getStatusColor = (index: number) => {
    if (index < currentStatusIndex) return 'bg-green-500';
    if (index === currentStatusIndex) return 'bg-blue-500';
    return 'bg-gray-300';
  };

  const getTextColor = (index: number) => {
    if (index <= currentStatusIndex) return 'text-gray-900';
    return 'text-gray-400';
  };

  if (currentStatus.toLowerCase() === 'cancelled') {
    return (
      <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl mb-2">❌</div>
          <h3 className="font-semibold text-red-800">Order Cancelled</h3>
          <p className="text-sm text-red-600 mt-1">This order has been cancelled</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative">
        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}
          />
        </div>
        
        {/* Status items */}
        <div className="relative flex justify-between">
          {statuses.map((status, index) => (
            <div key={status.key} className="flex flex-col items-center">
              {/* Status circle */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold transition-colors duration-300 ${
                getStatusColor(index)
              }`}>
                {index <= currentStatusIndex ? '✓' : index + 1}
              </div>
              
              {/* Status label */}
              <div className={`mt-2 text-xs font-medium text-center max-w-16 ${getTextColor(index)}`}>
                <div className="mb-1">{status.icon}</div>
                {status.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Current status info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center">
          <div className="text-blue-600 mr-3">📍</div>
          <div>
            <h4 className="font-semibold text-blue-900">Current Status</h4>
            <p className="text-sm text-blue-700 capitalize">{currentStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusTimeline;