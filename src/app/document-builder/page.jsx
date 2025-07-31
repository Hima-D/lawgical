'use client';
import React, { useState, useRef } from 'react';
import { Calendar, User, MapPin, DollarSign, FileText, Download, Plus, Trash2, Edit3 } from 'lucide-react';

const RentAgreementBuilder = () => {
  const [agreementData, setAgreementData] = useState({
    landlord: {
      name: '',
      address: '',
      phone: '',
      email: ''
    },
    tenant: {
      name: '',
      address: '',
      phone: '',
      email: ''
    },
    property: {
      address: '',
      type: 'Apartment',
      description: ''
    },
    terms: {
      rentAmount: '',
      securityDeposit: '',
      leaseStart: '',
      leaseEnd: '',
      rentDueDate: '1',
      noticePeriod: '30'
    },
    clauses: [
      {
        id: 1,
        title: 'Rent Payment',
        content: 'The Tenant agrees to pay rent in the amount of [RENT_AMOUNT] per month, due on the [RENT_DUE_DATE] of each month.'
      },
      {
        id: 2,
        title: 'Security Deposit',
        content: 'A security deposit of [SECURITY_DEPOSIT] is required and will be returned within 30 days of lease termination, minus any deductions for damages.'
      },
      {
        id: 3,
        title: 'Property Maintenance',
        content: 'The Tenant is responsible for keeping the property clean and in good condition. Any damages beyond normal wear and tear will be charged to the Tenant.'
      },
      {
        id: 4,
        title: 'Termination Notice',
        content: 'Either party may terminate this agreement by providing [NOTICE_PERIOD] days written notice to the other party.'
      }
    ]
  });

  const [activeTab, setActiveTab] = useState('details');
  const previewRef = useRef();

  const handleInputChange = (section, field, value) => {
    setAgreementData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleClauseChange = (id, field, value) => {
    setAgreementData(prev => ({
      ...prev,
      clauses: prev.clauses.map(clause =>
        clause.id === id ? { ...clause, [field]: value } : clause
      )
    }));
  };

  const addClause = () => {
    const newClause = {
      id: Date.now(),
      title: 'New Clause',
      content: 'Enter clause content here...'
    };
    setAgreementData(prev => ({
      ...prev,
      clauses: [...prev.clauses, newClause]
    }));
  };

  const removeClause = (id) => {
    setAgreementData(prev => ({
      ...prev,
      clauses: prev.clauses.filter(clause => clause.id !== id)
    }));
  };

  const replacePlaceholders = (text) => {
    return text
      .replace(/\[RENT_AMOUNT\]/g, agreementData.terms.rentAmount || '[RENT_AMOUNT]')
      .replace(/\[SECURITY_DEPOSIT\]/g, agreementData.terms.securityDeposit || '[SECURITY_DEPOSIT]')
      .replace(/\[RENT_DUE_DATE\]/g, agreementData.terms.rentDueDate || '[RENT_DUE_DATE]')
      .replace(/\[NOTICE_PERIOD\]/g, agreementData.terms.noticePeriod || '[NOTICE_PERIOD]')
      .replace(/\[LANDLORD_NAME\]/g, agreementData.landlord.name || '[LANDLORD_NAME]')
      .replace(/\[TENANT_NAME\]/g, agreementData.tenant.name || '[TENANT_NAME]')
      .replace(/\[PROPERTY_ADDRESS\]/g, agreementData.property.address || '[PROPERTY_ADDRESS]');
  };

  const handlePrint = () => {
    window.print();
  };

  const generatePDF = () => {
    const element = previewRef.current;
    if (element) {
      window.print();
    }
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        activeTab === id
          ? 'bg-blue-100 text-blue-700 border border-blue-200'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      <div className="max-w-7xl mx-auto p-6 print:p-0">
        <div className="print:hidden">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🏠 Rent Agreement Builder</h1>
          <p className="text-gray-600 mb-6">Create professional rental agreements with dynamic content</p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <TabButton id="details" label="Party Details" icon={User} />
            <TabButton id="property" label="Property Info" icon={MapPin} />
            <TabButton id="terms" label="Terms & Conditions" icon={DollarSign} />
            <TabButton id="clauses" label="Custom Clauses" icon={FileText} />
            <TabButton id="preview" label="Preview" icon={Edit3} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Editor Section */}
          <div className={`flex-1 print:hidden ${activeTab === 'preview' ? 'lg:w-1/2' : ''}`}>
            {activeTab === 'details' && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Party Details</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Landlord Details */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Landlord Information</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={agreementData.landlord.name}
                        onChange={(e) => handleInputChange('landlord', 'name', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        placeholder="Address"
                        value={agreementData.landlord.address}
                        onChange={(e) => handleInputChange('landlord', 'address', e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={agreementData.landlord.phone}
                        onChange={(e) => handleInputChange('landlord', 'phone', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={agreementData.landlord.email}
                        onChange={(e) => handleInputChange('landlord', 'email', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Tenant Details */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Tenant Information</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={agreementData.tenant.name}
                        onChange={(e) => handleInputChange('tenant', 'name', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        placeholder="Address"
                        value={agreementData.tenant.address}
                        onChange={(e) => handleInputChange('tenant', 'address', e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={agreementData.tenant.phone}
                        onChange={(e) => handleInputChange('tenant', 'phone', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={agreementData.tenant.email}
                        onChange={(e) => handleInputChange('tenant', 'email', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'property' && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Property Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
                    <textarea
                      placeholder="Complete property address"
                      value={agreementData.property.address}
                      onChange={(e) => handleInputChange('property', 'address', e.target.value)}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                    <select
                      value={agreementData.property.type}
                      onChange={(e) => handleInputChange('property', 'type', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="House">House</option>
                      <option value="Condo">Condo</option>
                      <option value="Room">Room</option>
                      <option value="Studio">Studio</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Description</label>
                    <textarea
                      placeholder="Additional details about the property (bedrooms, bathrooms, amenities, etc.)"
                      value={agreementData.property.description}
                      onChange={(e) => handleInputChange('property', 'description', e.target.value)}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Terms & Conditions</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent ($)</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={agreementData.terms.rentAmount}
                      onChange={(e) => handleInputChange('terms', 'rentAmount', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Security Deposit ($)</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={agreementData.terms.securityDeposit}
                      onChange={(e) => handleInputChange('terms', 'securityDeposit', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lease Start Date</label>
                    <input
                      type="date"
                      value={agreementData.terms.leaseStart}
                      onChange={(e) => handleInputChange('terms', 'leaseStart', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lease End Date</label>
                    <input
                      type="date"
                      value={agreementData.terms.leaseEnd}
                      onChange={(e) => handleInputChange('terms', 'leaseEnd', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rent Due Date (Day of Month)</label>
                    <select
                      value={agreementData.terms.rentDueDate}
                      onChange={(e) => handleInputChange('terms', 'rentDueDate', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Array.from({length: 31}, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notice Period (Days)</label>
                    <input
                      type="number"
                      placeholder="30"
                      value={agreementData.terms.noticePeriod}
                      onChange={(e) => handleInputChange('terms', 'noticePeriod', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'clauses' && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Custom Clauses</h2>
                  <button
                    onClick={addClause}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={16} />
                    Add Clause
                  </button>
                </div>
                
                <div className="space-y-4">
                  {agreementData.clauses.map((clause) => (
                    <div key={clause.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <input
                          type="text"
                          value={clause.title}
                          onChange={(e) => handleClauseChange(clause.id, 'title', e.target.value)}
                          className="font-medium text-lg border-none focus:outline-none focus:ring-0 p-0 flex-1"
                        />
                        <button
                          onClick={() => removeClause(clause.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <textarea
                        value={clause.content}
                        onChange={(e) => handleClauseChange(clause.id, 'content', e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter clause content... Use placeholders like [RENT_AMOUNT], [TENANT_NAME], [LANDLORD_NAME], etc."
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab !== 'preview' && (
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => setActiveTab('preview')}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Edit3 size={16} />
                  Preview Agreement
                </button>
                <button
                  onClick={handlePrint}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Download size={16} />
                  Print / Download PDF
                </button>
              </div>
            )}
          </div>

          {/* Preview Section */}
          {activeTab === 'preview' && (
            <div className="flex-1">
              <div className="print:hidden mb-4 flex gap-4">
                <button
                  onClick={handlePrint}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Download size={16} />
                  Print / Download PDF
                </button>
              </div>
              
              <div
                ref={previewRef}
                className="bg-white shadow-lg border rounded-lg p-8 print:shadow-none print:border-none print:rounded-none max-w-4xl mx-auto"
                style={{ fontFamily: 'Times New Roman, serif' }}
              >
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold uppercase mb-2">Rental Agreement</h1>
                  <p className="text-gray-600">Lease Agreement for Residential Property</p>
                </div>

                <div className="mb-6">
                  <p className="mb-4">
                    This Rental Agreement is entered into on <strong>{new Date().toLocaleDateString()}</strong> between:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-bold mb-2">LANDLORD:</h3>
                      <p><strong>Name:</strong> {agreementData.landlord.name || '[Landlord Name]'}</p>
                      <p><strong>Address:</strong> {agreementData.landlord.address || '[Landlord Address]'}</p>
                      <p><strong>Phone:</strong> {agreementData.landlord.phone || '[Phone Number]'}</p>
                      <p><strong>Email:</strong> {agreementData.landlord.email || '[Email Address]'}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold mb-2">TENANT:</h3>
                      <p><strong>Name:</strong> {agreementData.tenant.name || '[Tenant Name]'}</p>
                      <p><strong>Address:</strong> {agreementData.tenant.address || '[Tenant Address]'}</p>
                      <p><strong>Phone:</strong> {agreementData.tenant.phone || '[Phone Number]'}</p>
                      <p><strong>Email:</strong> {agreementData.tenant.email || '[Email Address]'}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-2">PROPERTY DETAILS:</h3>
                  <p><strong>Address:</strong> {agreementData.property.address || '[Property Address]'}</p>
                  <p><strong>Type:</strong> {agreementData.property.type}</p>
                  {agreementData.property.description && (
                    <p><strong>Description:</strong> {agreementData.property.description}</p>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-2">LEASE TERMS:</h3>
                  <p><strong>Monthly Rent:</strong> ${agreementData.terms.rentAmount || '[Amount]'}</p>
                  <p><strong>Security Deposit:</strong> ${agreementData.terms.securityDeposit || '[Amount]'}</p>
                  <p><strong>Lease Period:</strong> {agreementData.terms.leaseStart || '[Start Date]'} to {agreementData.terms.leaseEnd || '[End Date]'}</p>
                  <p><strong>Rent Due Date:</strong> {agreementData.terms.rentDueDate} of each month</p>
                  <p><strong>Notice Period:</strong> {agreementData.terms.noticePeriod} days</p>
                </div>

                <div className="mb-8">
                  <h3 className="font-bold mb-4">TERMS AND CONDITIONS:</h3>
                  {agreementData.clauses.map((clause, index) => (
                    <div key={clause.id} className="mb-4">
                      <h4 className="font-semibold mb-2">{index + 1}. {clause.title}</h4>
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {replacePlaceholders(clause.content)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-12">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="mb-8">Landlord Signature:</p>
                      <div className="border-b border-black mb-2" style={{ height: '1px', width: '250px' }}></div>
                      <p className="text-sm">
                        {agreementData.landlord.name || '[Landlord Name]'}<br/>
                        Date: _______________
                      </p>
                    </div>
                    
                    <div>
                      <p className="mb-8">Tenant Signature:</p>
                      <div className="border-b border-black mb-2" style={{ height: '1px', width: '250px' }}></div>
                      <p className="text-sm">
                        {agreementData.tenant.name || '[Tenant Name]'}<br/>
                        Date: _______________
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentAgreementBuilder;