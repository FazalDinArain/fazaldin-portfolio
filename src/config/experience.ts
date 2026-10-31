export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  employmentType: string;
  dateRange: string;
  duration: string;
  location: string;
  bullets: readonly string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "bidec",
    role: "Backend Developer",
    company: "Bidec Solutions (Pvt) Ltd.",
    employmentType: "Full-time",
    dateRange: "Nov 2024 – Present",
    duration: "",
    location: "Plot 191 J, PECHS, Karachi (On-site)",
    bullets: [
      "Develop and maintain production-ready backend systems using Laravel and NestJS.",
      "Design and build RESTful APIs for web and mobile applications, focusing on maintainability, reliability, and performance.",
      "Design and optimize MySQL and PostgreSQL databases, including queries, relationships, and database structures.",
      "Build frontend functionality using React, Next.js, and Blade as part of full-stack application development.",
      "Integrate third-party services and APIs, troubleshoot production issues, and implement new features and bug fixes.",
      "Work independently and collaboratively on feature development, debugging, performance optimization, and production support.",
      "Follow clean coding practices and contribute to maintainable, scalable software solutions.",
    ],
  },
  {
    id: "ifm",
    role: "Full-Stack Developer",
    company: "Institute of Financial Markets of Pakistan",
    employmentType: "Part-time",
    dateRange: "Apr 2025 – Sep 2025",
    duration: "6 mos",
    location: "Karachi Stock Exchange, Karachi (Hybrid)",
    bullets: [
      "Developed full-stack web applications using Laravel, PHP, JavaScript, and MySQL.",
      "Built responsive and user-friendly interfaces while integrating frontend functionality with Laravel-based backend systems.",
      "Integrated secure payment gateways and handled payment-related application workflows.",
      "Designed and worked with MySQL databases, including queries, relationships, and database structures.",
      "Developed new features, resolved bugs, and improved existing application functionality based on business requirements.",
      "Improved application usability and user experience through responsive and intuitive web interfaces.",
    ],
  },
  {
    id: "digiwised",
    role: "PHP Developer",
    company: "Digiwised",
    employmentType: "Full-time",
    dateRange: "Apr 2023 – Oct 2024",
    duration: "1 yr 7 mos",
    location: "Shahrah-e-Faisal, Karachi (On-site)",
    bullets: [
      "Developed and maintained web applications using PHP and Laravel, focusing on clean, maintainable backend code.",
      "Built and integrated RESTful APIs to support web application functionality and third-party integrations.",
      "Designed and worked with MySQL databases, including queries, relationships, and database structures.",
      "Implemented new features, resolved bugs, and improved existing application functionality based on business requirements.",
      "Optimized backend logic and database queries to improve application performance and reliability.",
      "Collaborated with team members on development, debugging, testing, and deployment of web applications.",
    ],
  },
  {
    id: "brandsoft",
    role: "PHP Developer (Laravel)",
    company: "BrandSoft Solutions",
    employmentType: "Full-time",
    dateRange: "Feb 2022 – Mar 2023",
    duration: "1 yr 2 mos",
    location: "Gulshan-e-Iqbal, Karachi (On-site)",
    bullets: [
      "Developed and maintained web applications using PHP and Laravel, focusing on clean and maintainable backend functionality.",
      "Built and integrated RESTful APIs to support application features and frontend integrations.",
      "Worked with MySQL databases, including queries, relationships, and database structures.",
      "Developed new features and enhancements based on business and application requirements.",
      "Troubleshot and resolved application bugs and backend issues to improve system stability and reliability.",
      "Collaborated with team members on development, testing, debugging, and ongoing application maintenance.",
    ],
  },
];
