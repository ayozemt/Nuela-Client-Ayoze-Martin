import Teacher from "./Teacher";

interface Subject {
  _id: string;
  name: string;
  type: "Obligatoria" | "Optativa";
  grade:
    | "1 de ESO"
    | "2 de ESO"
    | "3 de ESO"
    | "4 de ESO"
    | "1 de Bachillerato"
    | "2 de Bachillerato";
  group: "A" | "B" | "C" | "D";
  hours: number;
  espacio?: string;
  teacher?: Teacher["_id"];
}

export default Subject;
