'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Search,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  FileText,
  MapPin,
  Briefcase,
  Calendar,
  DollarSign,
  List,
  Factory,
  Map,
  Code,
} from 'lucide-react';

// Mock state-district data (replace with API call if available)
const stateDistricts = {
  HARYANA: ['AMBALA', 'BHIWANI', 'CHARKHI DADRI', 'FARIDABAD', 'FATEHABAD', 'GURUGRAM', 'HISAR', 'JHAJJAR', 'JIND', 'KAITHAL', 'KARNAL', 'KURUKSHETRA', 'MAHENDRAGARH', 'MEWAT', 'PALWAL', 'PANCHKULA', 'PANIPAT', 'REWARI', 'ROHTAK', 'SIRSA', 'SONIPAT', 'YAMUNANAGAR'],
  DELHI: ['CENTRAL DELHI', 'EAST DELHI', 'NEW DELHI', 'NORTH DELHI', 'NORTH EAST DELHI', 'NORTH WEST DELHI', 'SHAHDARA', 'SOUTH DELHI', 'SOUTH EAST DELHI', 'SOUTH WEST DELHI', 'WEST DELHI'],
  MAHARASHTRA: ['AHMEDNAGAR', 'AKOLA', 'AMRAVATI', 'AURANGABAD', 'BEED', 'BHANDARA', 'BULDHANA', 'CHANDRAPUR', 'DHULE', 'GADCHIROLI', 'GONDIA', 'HINGOLI', 'JALGAON', 'JALNA', 'KOLHAPUR', 'LATUR', 'MUMBAI CITY', 'MUMBAI SUBURBAN', 'NAGPUR', 'NANDED', 'NANDURBAR', 'NASHIK', 'OSMANABAD', 'PALGHAR', 'PARBHANI', 'PUNE', 'RAIGAD', 'RATNAGIRI', 'SANGLI', 'SATARA', 'SINDHUDURG', 'SOLAPUR', 'THANE', 'WARDHA', 'WASHIM', 'YAVATMAL'],
  'UTTAR PRADESH': ['AGRA', 'ALIGARH', 'AMBEDKAR NAGAR', 'AMETHI', 'AMROHA', 'AURAIYA', 'AYODHYA', 'AZAMGARH', 'BAGHPAT', 'BAHRAICH', 'BALLIA', 'BALRAMPUR', 'BANDA', 'BARABANKI', 'BAREILLY', 'BASTI', 'BHADOHI', 'BIJNOR', 'BUDAUN', 'BULANDSHAHR', 'CHANDAULI', 'CHITRAKOOT', 'DEORIA', 'ETAH', 'ETAWAH', 'FARRUKHABAD', 'FATEHPUR', 'FIROZABAD', 'GAUTAM BUDDHA NAGAR', 'GHAZIABAD', 'GHAZIPUR', 'GONDA', 'GORAKHPUR', 'HAMIRPUR', 'HAPUR', 'HARDOI', 'HATHRAS', 'JALAUN', 'JAUNPUR', 'JHANSI', 'KANNAUJ', 'KANPUR DEHAT', 'KANPUR NAGAR', 'KASGANJ', 'KAUSHAMBI', 'KHERI', 'KUSHINAGAR', 'LALITPUR', 'LUCKNOW', 'MAHARAJGANJ', 'MAHOBA', 'MAINPURI', 'MATHURA', 'MAU', 'MEERUT', 'MIRZAPUR', 'MORADABAD', 'MUZAFFARNAGAR', 'PILIBHIT', 'PRATAPGARH', 'PRAYAGRAJ', 'RAE BARELI', 'RAMPUR', 'SAHARANPUR', 'SAMBHAL', 'SANT KABIR NAGAR', 'SHAHJAHANPUR', 'SHAMLI', 'SHRAWASTI', 'SIDDHARTHNAGAR', 'SITAPUR', 'SONBHADRA', 'SULTANPUR', 'UNNAO', 'VARANASI'],
  GUJARAT: ['AHMEDABAD', 'AMRELI', 'ANAND', 'ARAVALLI', 'BANASKANTHA', 'BHARUCH', 'BHAVNAGAR', 'BOTAD', 'CHHOTA UDAIPUR', 'DAHOD', 'DANG', 'DEVBHOOMI DWARKA', 'GANDHINAGAR', 'GIRSOMNATH', 'JAMNAGAR', 'JUNAGADH', 'KACHCHH', 'KHEDA', 'MAHISAGAR', 'MEHSANA', 'MORBI', 'NARMADA', 'NAVSARI', 'PANCHMAHALS', 'PATAN', 'PORBANDAR', 'RAJKOT', 'SABARKANTHA', 'SURAT', 'SURENDRANAGAR', 'TAPI', 'VADODARA', 'VALSAD'],
  KARNATAKA: ['BAGALKOT', 'BALLARI', 'BELAGAVI', 'BENGALURU RURAL', 'BENGALURU URBAN', 'BIDAR', 'CHAMARAJANAGAR', 'CHIKKABALLAPUR', 'CHIKKAMAGALURU', 'CHITRADURGA', 'DAKSHINA KANNADA', 'DAVANGERE', 'DHARWAD', 'GADAG', 'HASSAN', 'HAVERI', 'KALABURAGI', 'KODAGU', 'KOLAR', 'KOPPAL', 'MANDYA', 'MYSURU', 'RAICHUR', 'RAMANAGARA', 'SHIVAMOGGA', 'TUMAKURU', 'UDUPI', 'UTTARA KANNADA', 'VIJAYANAGARA', 'VIJAYAPURA', 'YADGIR'],
};

// Generate years from 2000 to current year
const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 2000; year--) {
    years.push(year.toString());
  }
  return years;
};

// Months array
const months = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

// Header component for internal use
const Header = () => (
  <header className="bg-gray-900 text-white py-4">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Internal Data Portal</h1>
      <p className="text-sm">Powered by RoC & MSME Databases</p>
    </div>
  </header>
);

// Footer component for internal use
const Footer = () => (
  <footer className="bg-gray-900 text-white py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="text-sm">Internal Use Only | &copy; 2025 Data Portal</p>
    </div>
  </footer>
);

// Simple CSV parser that handles quotes
function parseCSV(text) {
  const lines = text.split(/\r?\n/);
  if (lines.length === 0) return [];

  const headers = parseCSVLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = parseCSVLine(lines[i]);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    rows.push(row);
  }
  return rows;
}

function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  if (current) {
    values.push(current.trim());
  }
  return values;
}

export default function CompaniesPage() {
  const { control, handleSubmit, watch, trigger, formState: { errors }, setValue } = useForm({
    mode: 'onChange',
    defaultValues: {
      apiType: 'companies',
      offset: '0',
      limit: '100',
      state: '',
      district: '',
      year: '',
      month: '',
      format: 'json',
    },
  });

  const [isFetching, setIsFetching] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [rawData, setRawData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const watchedApiType = watch('apiType');
  const watchedState = watch('state');
  const watchedDistrict = watch('district');
  const watchedYear = watch('year');
  const watchedMonth = watch('month');
  const watchedFormat = watch('format');
  const watchedLimit = watch('limit');

  // Update available districts when state changes
  useEffect(() => {
    if (watchedState && stateDistricts[watchedState]) {
      setAvailableDistricts(stateDistricts[watchedState]);
      setValue('district', ''); // Reset district when state changes
    } else {
      setAvailableDistricts([]);
      setValue('district', '');
    }
  }, [watchedState, setValue]);

  // Auto-download for CSV when filteredData is ready
  useEffect(() => {
    if (watchedFormat === 'csv' && currentStep === 2 && filteredData) {
      downloadFilteredCSV();
      setSuccessMessage('Filtered CSV file downloaded successfully!');
    }
  }, [filteredData, currentStep, watchedFormat]);

  // Frontend filtering for RoC companies
  const applyFrontendFilters = useMemo(() => {
    if (!rawData || watchedApiType !== 'companies') {
      return rawData;
    }

    let filtered = { ...rawData };
    
    // Assume records array
    if (filtered.records && Array.isArray(filtered.records)) {
      let companies = [...filtered.records];

      // Filter by state (case insensitive)
      if (watchedState) {
        companies = companies.filter(company => 
          (company.CompanyStateCode && company.CompanyStateCode.toLowerCase() === watchedState.toLowerCase()) ||
          (company.CompanyState && company.CompanyState.toLowerCase() === watchedState.toLowerCase())
        );
      }

      // Filter by year and month
      if (watchedYear || watchedMonth) {
        companies = companies.filter(company => {
          // Possible date fields
          const dateFields = ['CompanyRegistrationdate_date', 'DateOfIncorporation', 'IncorporationDate', 'DateIncorporated', 'CreatedDate'];
          let companyDate = null;
          
          for (const field of dateFields) {
            if (company[field]) {
              companyDate = new Date(company[field]);
              break;
            }
          }

          if (!companyDate || isNaN(companyDate.getTime())) {
            return false;
          }

          const companyYear = companyDate.getFullYear().toString();
          const companyMonth = (companyDate.getMonth() + 1).toString().padStart(2, '0');

          let matchesYear = true;
          let matchesMonth = true;

          if (watchedYear) {
            matchesYear = companyYear === watchedYear;
          }

          if (watchedMonth) {
            matchesMonth = companyMonth === watchedMonth;
          }

          return matchesYear && matchesMonth;
        });
      }

      filtered.records = companies;
      filtered.filteredCount = companies.length;
    }

    return filtered;
  }, [rawData, watchedApiType, watchedState, watchedYear, watchedMonth]);

  // Update filtered data when filters change
  useEffect(() => {
    if (watchedApiType === 'companies') {
      setFilteredData(applyFrontendFilters);
    } else {
      setFilteredData(rawData);
    }
  }, [applyFrontendFilters, rawData, watchedApiType]);

  const onSubmit = async (formData) => {
    setIsFetching(true);
    setErrorMessage('');
    setSuccessMessage('');
    setRawData(null);
    setFilteredData(null);

    let query = `/api/companies?apiType=${formData.apiType}&format=${formData.format}&offset=${formData.offset}&limit=${formData.limit}`;
    
    // For MSME, add filters to the API query
    if (formData.apiType === 'msme') {
      if (formData.state) {
        query += `&filters[State]=${encodeURIComponent(formData.state.toUpperCase())}`;
      }
      if (formData.district) {
        query += `&filters[District]=${encodeURIComponent(formData.district.toUpperCase())}`;
      }
    } 
    // For RoC companies, add state filter if supported
    else {
      if (formData.state) {
        query += `&filters[CompanyStateCode]=${encodeURIComponent(formData.state.toLowerCase())}`;
      }
    }

    try {
      const res = await fetch(query);
      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(errorData || 'Failed to fetch data');
      }

      let fetchedData;
      if (formData.format === 'csv') {
        const csvText = await res.text();
        const parsedData = parseCSV(csvText);
        fetchedData = { records: parsedData };
        setSuccessMessage('Data fetched and parsed successfully! Downloading filtered CSV...');
      } else if (formData.format === 'xml') {
        const xmlText = await res.text();
        fetchedData = xmlText;
        setSuccessMessage('Data fetched successfully!');
      } else {
        const jsonData = await res.json();
        fetchedData = jsonData;
        setSuccessMessage('Data fetched successfully!');
      }
      setRawData(fetchedData);
      setCurrentOffset(parseInt(formData.offset));
      const dataLength = typeof fetchedData === 'string' ? 0 : (fetchedData.records ? fetchedData.records.length : 0);
      setHasNext(dataLength === parseInt(formData.limit));
      setCurrentStep(2);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsFetching(false);
    }
  };

  // Function to download filtered CSV
  const downloadFilteredCSV = () => {
    if (!filteredData || !filteredData.records) return;
    
    const csvContent = convertToCSV(filteredData.records);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `filtered_${watchedApiType}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Helper function to convert data to CSV
  const convertToCSV = (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    
    const csvRows = data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in CSV values
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    );
    
    return [csvHeaders, ...csvRows].join('\n');
  };

  const nextStep = async () => {
    let fieldsToValidate = ['apiType', 'offset', 'limit', 'format'];
    
    if (watchedApiType === 'msme' && watchedState) {
      fieldsToValidate.push('state');
      if (watchedDistrict) fieldsToValidate.push('district');
    }
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  const handleNext = async () => {
    const newOffset = currentOffset + parseInt(watchedLimit);
    setValue('offset', newOffset.toString());
    await handleSubmit(onSubmit)();
  };

  const handlePrev = async () => {
    const newOffset = Math.max(0, currentOffset - parseInt(watchedLimit));
    setValue('offset', newOffset.toString());
    await handleSubmit(onSubmit)();
  };

  const prevStep = () => {
    setCurrentStep(1);
    setRawData(null);
    setFilteredData(null);
    setSuccessMessage('');
    setErrorMessage('');
    window.scrollTo(0, 0);
  };

  const renderProgressSteps = () => {
    const steps = [
      { number: 1, title: 'Enter Parameters', icon: Search },
      { number: 2, title: 'View Results', icon: FileText },
    ];

    return (
      <div className="flex justify-center items-center mb-12">
        <div className="flex items-center w-full max-w-3xl">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-1 items-center">
              <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    currentStep === step.number
                      ? 'bg-gray-900 border-transparent text-white shadow-lg scale-110'
                      : currentStep > step.number
                      ? 'bg-green-600 border-transparent text-white shadow-lg'
                      : 'bg-white border-gray-300 text-gray-400 shadow-sm'
                  }`}
                >
                  {currentStep > step.number ? <CheckCircle size={18} /> : <step.icon size={18} />}
                </div>
                <div
                  className={`mt-3 text-center transition-colors duration-300 ${
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  <div className="text-sm font-semibold">{step.title}</div>
                  <div className="text-xs">Step {step.number}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 transition-colors duration-300 ${
                    currentStep > step.number ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      <Card className="bg-white shadow-lg border border-gray-100">
        <CardHeader className="bg-gray-50">
          <div className="flex items-center">
            <div className="p-3 bg-gray-900 rounded-xl text-white mr-4">
              <Search size={24} />
            </div>
            <div>
              <CardTitle className="text-xl text-gray-900">Search Parameters</CardTitle>
              <CardDescription className="text-gray-600">
                Configure parameters to query the {watchedApiType === 'companies' ? 'RoC' : 'MSME'} database
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Controller
              name="apiType"
              control={control}
              rules={{ required: 'Data source is required' }}
              render={({ field }) => (
                <div>
                  <label className="text-sm font-medium text-gray-700">Data Source</label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full px-3 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900">
                      <SelectValue placeholder="Select data source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="companies">Companies (RoC)</SelectItem>
                      <SelectItem value="msme">MSME</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.apiType && (
                    <p className="text-red-500 text-sm">{errors.apiType.message}</p>
                  )}
                </div>
              )}
            />
          </div>
          <div className="space-y-2">
            <Controller
              name="offset"
              control={control}
              rules={{
                required: 'Offset is required',
                pattern: {
                  value: /^\d+$/,
                  message: 'Offset must be a non-negative integer',
                },
                validate: (value) => parseInt(value) >= 0 || 'Offset must be non-negative',
              }}
              render={({ field }) => (
                <div>
                  <label className="text-sm font-medium text-gray-700">Offset</label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="e.g., 0"
                    {...field}
                    className="w-full px-3 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
                  />
                  {errors.offset && (
                    <p className="text-red-500 text-sm">{errors.offset.message}</p>
                  )}
                </div>
              )}
            />
          </div>
          <div className="space-y-2">
            <Controller
              name="limit"
              control={control}
              rules={{
                required: 'Limit is required',
                pattern: {
                  value: /^\d+$/,
                  message: 'Limit must be a positive integer',
                },
                validate: (value) => parseInt(value) > 0 && parseInt(value) <= 100 || 'Limit must be between 1 and 100',
              }}
              render={({ field }) => (
                <div>
                  <label className="text-sm font-medium text-gray-700">Limit</label>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    placeholder="e.g., 100"
                    {...field}
                    className="w-full px-3 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
                  />
                  {errors.limit && (
                    <p className="text-red-500 text-sm">{errors.limit.message}</p>
                  )}
                </div>
              )}
            />
          </div>
          <div className="space-y-2">
            <Controller
              name="state"
              control={control}
              rules={{
                validate: (value) => {
                  if (value && !stateDistricts[value]) return 'Invalid state';
                  return true;
                }
              }}
              render={({ field }) => (
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    State <span className="text-gray-500 text-xs">(Optional)</span>
                  </label>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full px-3 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(stateDistricts).map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && (
                    <p className="text-red-500 text-sm">{errors.state.message}</p>
                  )}
                </div>
              )}
            />
          </div>
          
          {/* District field - for both if state selected */}
          {(watchedApiType === 'msme' || watchedApiType === 'companies') && watchedState && (
            <div className="space-y-2">
              <Controller
                name="district"
                control={control}
                rules={{
                  validate: (value) => {
                    if (value && !availableDistricts.includes(value)) return 'Invalid district';
                    return true;
                  }
                }}
                render={({ field }) => (
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      District <span className="text-gray-500 text-xs">(Optional)</span>
                    </label>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                      disabled={!watchedState}
                    >
                      <SelectTrigger className="w-full px-3 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900">
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDistricts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.district && (
                      <p className="text-red-500 text-sm">{errors.district.message}</p>
                    )}
                  </div>
                )}
              />
            </div>
          )}
          
          {/* Year field - only for RoC Companies */}
          {watchedApiType === 'companies' && (
            <div className="space-y-2">
              <Controller
                name="year"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      <Calendar size={16} className="inline mr-1" />
                      Year <span className="text-gray-500 text-xs">(Optional)</span>
                    </label>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full px-3 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {generateYears().map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>
          )}
          
          {/* Month field - only for RoC Companies */}
          {watchedApiType === 'companies' && (
            <div className="space-y-2">
              <Controller
                name="month"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      <Calendar size={16} className="inline mr-1" />
                      Month <span className="text-gray-500 text-xs">(Optional)</span>
                    </label>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full px-3 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900">
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Controller
              name="format"
              control={control}
              rules={{ required: 'Format is required' }}
              render={({ field }) => (
                <div>
                  <label className="text-sm font-medium text-gray-700">Format</label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full px-3 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="xml">XML</SelectItem>
                      <SelectItem value="csv">CSV (Download)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.format && (
                    <p className="text-red-500 text-sm">{errors.format.message}</p>
                  )}
                </div>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={nextStep}
          size="lg"
          disabled={isFetching}
          className="bg-gray-900 hover:bg-gray-800 text-white"
        >
          <Search size={18} className="mr-2" />
          {isFetching ? 'Fetching...' : 'Fetch Data'}
        </Button>
      </div>
    </div>
  );

  const renderCards = (records) => {
    if (!records || !Array.isArray(records) || records.length === 0) {
      return <p className="text-gray-600">No records found.</p>;
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {records.map((record, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader>
              <CardTitle>{watchedApiType === 'companies' ? record.CompanyName : record.EnterpriseName}</CardTitle>
              <CardDescription>{watchedApiType === 'companies' ? record.CIN : `${record.LG_ST_Code} - ${record.State}`}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <MapPin className="inline mr-2 h-4 w-4" />
                  {watchedApiType === 'companies' ? record.Registered_Office_Address : record.CommunicationAddress}
                </p>
                <p>
                  <Calendar className="inline mr-2 h-4 w-4" />
                  {watchedApiType === 'companies' ? record.CompanyRegistrationdate_date : record.RegistrationDate}
                </p>
                <p>
                  <Briefcase className="inline mr-2 h-4 w-4" />
                  {watchedApiType === 'companies' ? `${record.CompanyCategory} - ${record.CompanySubCategory}` : ( () => {
                    try {
                      const activities = JSON.parse(record.Activities);
                      return activities.map(a => `${a.Description} (${a.NIC5DigitId})`).join(', ');
                    } catch {
                      return record.Activities;
                    }
                  })()}
                </p>
                {watchedApiType === 'companies' && (
                  <>
                    <p>
                      <DollarSign className="inline mr-2 h-4 w-4" />
                      Authorized Capital: {record.AuthorizedCapital}
                    </p>
                    <p>
                      <DollarSign className="inline mr-2 h-4 w-4" />
                      Paid up Capital: {record.PaidupCapital}
                    </p>
                    <p>
                      <List className="inline mr-2 h-4 w-4" />
                      Listing Status: {record.Listingstatus}
                    </p>
                    <p>
                      <CheckCircle className="inline mr-2 h-4 w-4" />
                      Status: {record.CompanyStatus}
                    </p>
                    <p>
                      <Code className="inline mr-2 h-4 w-4" />
                      NIC Code: {record.nic_code}
                    </p>
                    <p>
                      <Factory className="inline mr-2 h-4 w-4" />
                      Industrial Classification: {record.CompanyIndustrialClassification}
                    </p>
                  </>
                )}
                {watchedApiType === 'msme' && (
                  <>
                    <p>
                      <Map className="inline mr-2 h-4 w-4" />
                      District: {record.District} ({record.LG_DT_Code})
                    </p>
                    <p>
                      <MapPin className="inline mr-2 h-4 w-4" />
                      Pincode: {record.Pincode}
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderStep2 = () => {
    const dataToDisplay = watchedApiType === 'companies' ? filteredData : rawData;
    const showFilteredCount = watchedApiType === 'companies' && filteredData && rawData && 
                             filteredData.records && rawData.records && 
                             filteredData.records.length !== rawData.records.length;
    const filteredLength = filteredData?.records?.length || 0;
    let displayText;
    if (watchedApiType === 'msme' || (!watchedYear && !watchedMonth)) {
      displayText = rawData?.count ? `Showing ${currentOffset + 1}-${currentOffset + filteredLength} of ${rawData.count}` : `Offset: ${currentOffset}`;
    } else {
      displayText = `Showing ${filteredLength} filtered records (batch offset ${currentOffset})`;
    }

    return (
      <div className="space-y-8">
        <Card className="bg-white shadow-lg border border-gray-100">
          <CardHeader className="bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-gray-900 rounded-xl text-white mr-4">
                  <FileText size={24} />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-900">Search Results</CardTitle>
                  <CardDescription className="text-gray-600">
                    View the fetched {watchedApiType === 'companies' ? 'company' : 'MSME'} data below
                  </CardDescription>
                  {showFilteredCount && (
                    <div className="text-sm text-blue-600 mt-1">
                      Showing {filteredData.records.length} of {rawData.records.length} records after filtering
                    </div>
                  )}
                </div>
              </div>
              {filteredData && filteredData.records && (
                <Button
                  onClick={downloadFilteredCSV}
                  size="sm"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  <FileText size={16} className="mr-2" />
                  Download Filtered CSV
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {watchedFormat === 'xml' || typeof dataToDisplay === 'string' ? (
              <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-96 overflow-auto text-sm text-gray-800">
                {dataToDisplay}
              </pre>
            ) : (
              renderCards(dataToDisplay?.records)
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <Button
            type="button"
            onClick={prevStep}
            variant="outline"
            size="lg"
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Parameters
          </Button>
          {(watchedFormat === 'json' || watchedFormat === 'csv') && (
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentOffset === 0 || isFetching}
              >
                Previous
              </Button>
              <span className="text-gray-600">
                {displayText}
              </span>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={!hasNext || isFetching}
              >
                Next
              </Button>
            </div>
          )}
          <Button
            type="button"
            onClick={nextStep}
            size="lg"
            disabled={isFetching}
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            <Search size={18} className="mr-2" />
            {isFetching ? 'Fetching...' : 'Refresh'}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {successMessage && (
          <Alert className="bg-green-50 border border-green-200 text-green-800 mb-8">
            <CheckCircle className="w-6 h-6" />
            <AlertDescription className="ml-3">
              <h3 className="text-lg font-semibold">Success</h3>
              <div className="mt-2 text-sm">
                <p>{successMessage}</p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Error Message */}
        {errorMessage && (
          <Alert className="bg-red-50 border border-red-200 text-red-800 mb-8">
            <AlertCircle className="w-6 h-6" />
            <AlertDescription className="ml-3">
              <h3 className="text-lg font-semibold">Error</h3>
              <div className="mt-2 text-sm">
                <p>{errorMessage}</p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Progress Steps */}
        {renderProgressSteps()}

        {/* Form Steps */}
        <div className="mt-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
        </div>

      </div>

      <Footer />
    </div>
  );
}