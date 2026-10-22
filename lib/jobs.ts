export type JobType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship"
  | "Remote";

export type Job = {
  id: string;
  title: string;
  company: string;
  companyShort: string;
  location: string;
  type: JobType;
  salaryMin: number;
  salaryMax: number;
  posted: string;
  skills: string[];
};

export const jobs: Job[] = [
  {
    id: "product-designer",
    title: "Senior Product Designer",
    company: "Orbit Labs",
    companyShort: "O",
    location: "Bengaluru",
    type: "Full-time",
    salaryMin: 24,
    salaryMax: 32,
    posted: "2 days ago",
    skills: ["Figma", "Product thinking", "Design systems"],
  },
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    company: "Northstar",
    companyShort: "N",
    location: "Remote",
    type: "Remote",
    salaryMin: 18,
    salaryMax: 28,
    posted: "1 day ago",
    skills: ["React", "TypeScript", "Accessibility"],
  },
  {
    id: "growth-marketer",
    title: "Growth Marketing Manager",
    company: "Goodkind",
    companyShort: "G",
    location: "Mumbai",
    type: "Full-time",
    salaryMin: 16,
    salaryMax: 22,
    posted: "3 days ago",
    skills: ["Lifecycle", "Analytics", "Content"],
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    company: "Finstack",
    companyShort: "F",
    location: "Hyderabad",
    type: "Full-time",
    salaryMin: 12,
    salaryMax: 18,
    posted: "Today",
    skills: ["SQL", "Python", "Looker"],
  },
  {
    id: "people-partner",
    title: "People Operations Partner",
    company: "Kindred Health",
    companyShort: "K",
    location: "Pune",
    type: "Full-time",
    salaryMin: 14,
    salaryMax: 20,
    posted: "4 days ago",
    skills: ["People ops", "HRIS", "Employee experience"],
  },
  {
    id: "content-intern",
    title: "Content Design Intern",
    company: "Morrow",
    companyShort: "M",
    location: "Chennai",
    type: "Internship",
    salaryMin: 4,
    salaryMax: 6,
    posted: "2 days ago",
    skills: ["Writing", "UX", "Research"],
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    company: "Orbit Labs",
    companyShort: "O",
    location: "Bengaluru",
    type: "Full-time",
    salaryMin: 20,
    salaryMax: 30,
    posted: "5 days ago",
    skills: ["Node.js", "PostgreSQL", "APIs"],
  },
  {
    id: "finance-lead",
    title: "Finance & Strategy Lead",
    company: "Finstack",
    companyShort: "F",
    location: "Mumbai",
    type: "Contract",
    salaryMin: 22,
    salaryMax: 30,
    posted: "1 day ago",
    skills: ["Financial modeling", "Strategy", "Excel"],
  },
  {
    id: "customer-success",
    title: "Customer Success Associate",
    company: "Goodkind",
    companyShort: "G",
    location: "Delhi",
    type: "Full-time",
    salaryMin: 8,
    salaryMax: 12,
    posted: "6 days ago",
    skills: ["Communication", "SaaS", "Onboarding"],
  },
  {
    id: "visual-designer",
    title: "Visual Designer",
    company: "Morrow",
    companyShort: "M",
    location: "Remote",
    type: "Part-time",
    salaryMin: 10,
    salaryMax: 15,
    posted: "3 days ago",
    skills: ["Brand", "Illustration", "Figma"],
  },
  {
    id: "engineering-manager",
    title: "Engineering Manager",
    company: "Northstar",
    companyShort: "N",
    location: "Bengaluru",
    type: "Full-time",
    salaryMin: 36,
    salaryMax: 48,
    posted: "Today",
    skills: ["Leadership", "Platform", "Hiring"],
  },
  {
    id: "research-assistant",
    title: "User Research Assistant",
    company: "Kindred Health",
    companyShort: "K",
    location: "Pune",
    type: "Internship",
    salaryMin: 5,
    salaryMax: 7,
    posted: "2 days ago",
    skills: ["Interviews", "Research", "Synthesis"],
  },
];
