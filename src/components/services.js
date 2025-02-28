import Link from "next/link";

// Services array data with professional descriptions
export const services = [
  {
    title: "Company Incorporation",
    description:
      "Our comprehensive Company Incorporation services cover the formation of companies, LLPs, and societies. We also provide essential services such as ROC compliance, annual filings, and changes to registered office addresses or directors.",
    link: "/company-incorporation",
  },
  {
    title: "GST Registration and Returns",
    description:
      "We provide GST Registration and Returns filing services to ensure your business complies with the latest GST regulations, helping you avoid penalties and streamline your tax processes.",
    link: "/gst-registration",
  },
  {
    title: "Intellectual Property",
    description:
      "We specialize in Intellectual Property services, including the registration and protection of trademarks, patents, designs, and copyrights. Our services also cover IP opposition, counter-statements, and hearings, both virtual and physical.",
    link: "/intellectual-property",
  },
  {
    title: "FSSAI Registration",
    description:
      "Our FSSAI Registration services assist businesses in the food industry with obtaining Food Registration, State Licenses, and Central Licenses, ensuring compliance with food safety standards.",
    link: "/fssai-registration",
  },
  {
    title: "Digital Signatures",
    description:
      "We assist businesses and professionals in obtaining Digital Signatures for various purposes, ensuring secure and compliant online transactions and document submissions.",
    link: "/digital-signatures",
  },
  {
    title: "ISO Certifications",
    description:
      "Our ISO Certification services help businesses meet international standards, enhancing operational efficiency and building trust with customers and partners.",
    link: "/iso-certifications",
  },
  {
    title: "GeM Portal Registration",
    description:
      "We facilitate GeM Portal Registration and product listing for vendors, enabling businesses to access government procurement opportunities in India.",
    link: "/gem-portal-registration",
  },
  {
    title: "Bookkeeping and Accounting",
    description:
      "Our expert Bookkeeping and Accounting services help businesses maintain accurate financial records, comply with tax regulations, and make informed financial decisions.",
    link: "/bookkeeping-and-accounting",
  },
  {
    title: "MSME and Startup India Registration",
    description:
      "We provide MSME and Startup India Registration services to support new businesses in availing of government schemes and incentives designed to promote growth and innovation.",
    link: "/msme-and-startup-india",
  },
  {
    title: "Shop Act Registration",
    description:
      "We assist businesses with Shop Act Registration, ensuring compliance with local business regulations and legal requirements for operating a retail establishment.",
    link: "/shop-act-registration",
  },
  {
    title: "Trade License",
    description:
      "Our Trade License services ensure your business complies with local regulations, enabling smooth operation and fostering trust with customers and authorities.",
    link: "/trade-license",
  },
  {
    title: "Import Export Code (IE Code)",
    description:
      "We guide businesses through the process of obtaining an Import Export Code (IE Code), a mandatory requirement for engaging in international trade in India.",
    link: "/import-export-code",
  },
  {
    title: "IPO, Mergers, and Valuations",
    description:
      "We provide expert services in IPO filings, mergers, and business valuations, helping businesses navigate complex financial transactions and maximize shareholder value.",
    link: "/ipo-mergers-valuation",
  },
  {
    title: "Legal Metrology Act Registration",
    description:
      "We help businesses comply with the Legal Metrology Act, ensuring proper weight and measure practices are followed in the sale and distribution of products.",
    link: "/legal-metrology-act-registration",
  },
  {
    title: "POSH Training and Compliance",
    description:
      "We offer POSH (Prevention of Sexual Harassment) Training and Compliance services, ensuring that your organization adheres to legal requirements and fosters a safe and respectful workplace environment.",
    link: "/posh-training-compliance",
  },
  {
    title: "Other Professional Services",
    description:
      "In addition to the services listed, we offer a wide range of tailored professional services to meet the unique needs of your business.",
    link: "/other-professional-services",
  },
];

// Services Component
const Services = ({ services }) => {
  return (
    <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-16 px-4 sm:px-0">
      {services.map((service, index) => (
        <div
          key={index}
          className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-primary mb-4">{service.title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
          <Link href={service.link} className="text-primary hover:underline mt-4 inline-block">
            Learn More
          </Link>
        </div>
      ))}
    </section>
  );
};

export default Services;
