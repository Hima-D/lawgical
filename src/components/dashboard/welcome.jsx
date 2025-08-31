import React from 'react';

const WelcomeSection = ({ user, isLawyer }) => {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Welcome back, {user.displayName || user.email}!
      </h2>
      <p className="text-gray-600">
        {isLawyer
          ? "Manage your legal services and client appointments"
          : "Find legal services and manage your appointments"}
      </p>
    </div>
  );
};

export default WelcomeSection;