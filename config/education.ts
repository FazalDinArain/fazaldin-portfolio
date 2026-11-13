export type EducationEntry = {
  id: string;
  school: string;
  degree: string;
  dateRange: string;
};

export const education: EducationEntry[] = [
  {
    id: "uos",
    school: "University of Sindh",
    degree: "Bachelor of Science, Information Technology",
    dateRange: "Jan 2018 – Dec 2021",
  },
  {
    id: "aiou",
    school: "Allama Iqbal Open University (AIOU)",
    degree: "Bachelor of Arts, General",
    dateRange: "Jan 2015 – Dec 2017",
  },
];
