import Link from 'next/link';
import Image from 'next/image';

const Services = () => {
  return (
    <div className="bg-black text-white py-16 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold text-center text-primary mb-12">Our Legal Services</h1>

        {/* POSCO (Prevention of Sexual Offenses) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-white mb-4">POSCO (Prevention of Sexual Offenses)</h2>
            <p className="text-lg text-gray-300 mb-6">
              We assist organizations in creating and implementing policies and procedures to prevent sexual offenses in the workplace, ensuring compliance with the POSCO Act.
            </p>
            <Link
              href="/posco"
              className="text-lg text-primary hover:text-gray-300 transition-colors duration-300 ease-in-out"
            >
              Learn More
            </Link>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://picsum.photos/500/350?random=1"
              alt="POSCO"
              width={500}
              height={350}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <hr className="my-8 border-gray-600" />

        {/* POSH (Prevention of Sexual Harassment) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
          <div className="flex justify-center">
            <Image
              src="https://picsum.photos/500/350?random=2"
              alt="POSH"
              width={500}
              height={350}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-white mb-4">POSH (Prevention of Sexual Harassment)</h2>
            <p className="text-lg text-gray-300 mb-6">
              Our legal team helps businesses develop policies and procedures to prevent sexual harassment at the workplace, ensuring compliance with the POSH Act and providing training to employees.
            </p>
            <Link
              href="/posh"
              className="text-lg text-primary hover:text-gray-300 transition-colors duration-300 ease-in-out"
            >
              Learn More
            </Link>
          </div>
        </div>

        <hr className="my-8 border-gray-600" />

        {/* Corporate Law */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-white mb-4">Corporate Law</h2>
            <p className="text-lg text-gray-300 mb-6">
              We provide expert legal services for businesses, including company formation, mergers & acquisitions, corporate governance, and legal compliance. Our team helps ensure your business operations are legally sound.
            </p>
            <Link
              href="/corporate-law"
              className="text-lg text-primary hover:text-gray-300 transition-colors duration-300 ease-in-out"
            >
              Learn More
            </Link>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://picsum.photos/500/350?random=3"
              alt="Corporate Law"
              width={500}
              height={350}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <hr className="my-8 border-gray-600" />

        {/* Litigation Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
          <div className="flex justify-center">
            <Image
              src="https://picsum.photos/500/350?random=4"
              alt="Litigation"
              width={500}
              height={350}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-white mb-4">Litigation Services</h2>
            <p className="text-lg text-gray-300 mb-6">
              Our litigation experts offer services for both civil and criminal cases, representing clients in court and helping resolve disputes through legal proceedings. We handle everything from arbitration to trial preparation.
            </p>
            <Link
              href="/litigation"
              className="text-lg text-primary hover:text-gray-300 transition-colors duration-300 ease-in-out"
            >
              Learn More
            </Link>
          </div>
        </div>

        <hr className="my-8 border-gray-600" />

        {/* Contract Law */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-white mb-4">Contract Law</h2>
            <p className="text-lg text-gray-300 mb-6">
              We offer comprehensive services for contract drafting, negotiation, and dispute resolution. Whether it’s business contracts, employment agreements, or other legal documents, we ensure your interests are protected.
            </p>
            <Link
              href="/contract-law"
              className="text-lg text-primary hover:text-gray-300 transition-colors duration-300 ease-in-out"
            >
              Learn More
            </Link>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://picsum.photos/500/350?random=5"
              alt="Contract Law"
              width={500}
              height={350}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
