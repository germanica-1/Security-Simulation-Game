// Game data and scenarios for the security simulation

import profile1 from "../../assets/images/profiles/profile_1.jfif";
import profile2 from "../../assets/images/profiles/profile_2.jfif";
import profile3 from "../../assets/images/profiles/profile_3.jfif";
import profile4 from "../../assets/images/profiles/profile_4.jfif";
import profile5 from "../../assets/images/profiles/profile_5.jfif";
import profile6 from "../../assets/images/profiles/profile_6.jfif";

export interface Visitor {
  name: string;
  age: number;
  purpose: string;
  idNumber: string;
  avatar: string;
}

export interface IDCard {
  name: string;
  age: number;
  idNumber: string;
  purpose: string;
  status: "Valid" | "Expired";
  issueDate: string;
  expiryDate: string;
  avatar: string;
}

export interface Scenario {
  visitor: Visitor;
  idCard: IDCard;
  shouldApprove: boolean; // true = should be approved, false = should be denied
  reason: string;
}


const profiles = [
  profile1,
  profile2,
  profile3,
  profile4,
  profile5,
  profile6
];

let shuffledProfiles: string[] = [];
let currentIndex = 0;

function shuffle(array: string[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

function getNextProfile(): string {
  if (currentIndex >= shuffledProfiles.length) {
    shuffledProfiles = shuffle(profiles);
    currentIndex = 0;
  }

  return shuffledProfiles[currentIndex++];
}

const purposes = [
  // NORMAL / SAFE
  "Business Meeting",
  "Delivery Service",
  "Maintenance Work",
  "Guest Visit",
  "Contractor Service",
  "Interview Appointment",
  "Equipment Installation",
  "Inspection",
  "Client Consultation",
  "Technical Support",
  "Office Supplies Delivery",
  "Scheduled Meeting",
  "Training Session",
  "Facility Tour",
  "Vendor Appointment",

  // SLIGHTLY SUSPICIOUS (makes player think)
  "Follow-up Visit",
  "Document Submission",
  "Personal Errand",
  "Quick Visit",
  "Meeting a Friend",
  "Checking Something",
  "Dropping Off Package",
  "Account Concern",
  "Lost Item Retrieval",
  "Internal Inquiry",

  // URGENT (pressure situations)
  "Emergency Maintenance",
  "System Repair",
  "Urgent Delivery",
  "Security Inspection",
  "Incident Response",
  "Equipment Failure Fix",
  "Last-minute Meeting",
  "IT System Crash Response"
];

const firstNames = [
  "Kirvy", "Steven", "Samantha", "Rafael", "Wyn", "Trisha", "Anna", "Chrizztell",
  "Thomas", "Janine", "Ricka", "Irish", "Vincent", "James", "Matt", "Kim",

  "Avrylle", "Laurence", "Matthew", "Gian", "John", "Chrysler", "RR", "Ezekiel",
  "Bryce", "Nico", "Danielle", "Jherald", "Jerald", "Mary", "Cyruz", "Neil",
  "Sofia", "Jaime", "Raffy", "Shan", "Jhan", "Bea", "Marianeth", "Misaki",
  "Allen", "Troy", "Crishlyn", "Siren", "Marwell", "Justine", "Justin",
  "Juan", "Trixia", "Lorenz", "Marc",

  // extra for variety
  "Adrian", "Carlo", "Joshua", "Daniel", "Christian", "Mark", "Paul",
  "Anthony", "Miguel", "Angelo", "Patricia", "Nicole", "Angela",
  "Bianca", "Frances", "Elaine", "Clarisse", "Joy", "Faith"
];

const lastNames = [
  "Aragon", "Perez", "Ng", "Balano", "Celada", "Vasquez", "Millete", "Aliquer",
  "Macion", "Leonardo", "Montesa", "David", "Malik", "Agustin", "Mabborang",
  "Taylor",

  "Abas", "Abiva", "Arciaga", "Battad", "Candelaria", "Caoile", "Carandang",
  "Compañero", "Cruz", "Daguna", "De Dios", "De Rivera", "Dejucos",
  "Delos Reyes", "Dona", "Draculan", "Escasinas", "Estrada", "Gayo",
  "Gegabine", "Ireneo", "Jeremias", "Luna", "Morena", "Ota",
  "Pagtulingan", "Payongayong", "Piedad", "Quevedo", "Reyes", "Rivera",
  "Salazar", "Sastre", "Sayago", "Singson", "Tabuzo", "Ubana",
  "Vaca", "Villaflor", "Zabala",

  // extra for variety
  "Santos", "Garcia", "Lopez", "Torres", "Flores", "Ramos",
  "Mendoza", "Castro", "Aquino", "Bautista", "Domingo",
  "Navarro", "Ortega", "Pascual", "Silva", "Tan", "Uy"
];

function generateIDNumber(): string {
  const prefix = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const numbers = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${numbers}`;
}

function getRandomDate(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getRandomFutureDate(daysAhead: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function generateScenarios(): Scenario[] {
  const scenarios: Scenario[] = [];

  // Generate 20 scenarios
  for (let i = 0; i < 20; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    const age = 18 + Math.floor(Math.random() * 50);
    const purpose = purposes[Math.floor(Math.random() * purposes.length)];
    const idNumber = generateIDNumber();


    // Use Unsplash photos for avatars
    const avatarQueries = [
      "professional business person",
      "office worker portrait",
      "business professional headshot",
      "corporate employee",
      "professional portrait"
    ];
    const avatarQuery = avatarQueries[i % avatarQueries.length];
    const avatar = getNextProfile();

    // Determine scenario type (70% valid, 30% invalid)
    const random = Math.random();
    let shouldApprove: boolean;
    let reason: string;
    let cardName = fullName;
    let cardAge = age;
    let cardStatus: "Valid" | "Expired" = "Valid";
    let cardPurpose = purpose;
    let cardIdNumber = idNumber;

    const errorTypes = [
      "id", "id", "id",  //higher chance of errors (60%)
      "purpose", "purpose",
      "name",
      "age", "age",
      "expired"
    ];

    // Decide how many errors (0–3)
    const errorCount = Math.random() < 0.4 ? 0 : Math.floor(Math.random() * 3) + 1;

    const selectedErrors = errorTypes
      .sort(() => 0.5 - Math.random())
      .slice(0, errorCount);

    shouldApprove = selectedErrors.length === 0;

    let reasons: string[] = [];

    selectedErrors.forEach((error) => {
      switch (error) {
        case "name":
          let wrongFirstName;
          do {
            wrongFirstName =
              firstNames[Math.floor(Math.random() * firstNames.length)];
          } while (wrongFirstName === firstName);

          cardName = `${wrongFirstName} ${lastName}`;
          reasons.push("Name mismatch");
          break;

        case "age":
          cardAge = age + (Math.random() < 0.5 ? 3 : -3); // smaller difference = harder
          reasons.push("Age mismatch");
          break;

        case "purpose":
          let wrongPurpose;
          do {
            wrongPurpose =
              purposes[Math.floor(Math.random() * purposes.length)];
          } while (wrongPurpose === purpose);

          cardPurpose = wrongPurpose;
          reasons.push("Purpose mismatch");
          break;

        case "id":
          const index = Math.floor(Math.random() * idNumber.length);
          let replacement;

          do {
            replacement = Math.floor(Math.random() * 10).toString();
          } while (replacement === idNumber[index]);

          cardIdNumber =
            idNumber.slice(0, index) +
            replacement +
            idNumber.slice(index + 1);

          reasons.push("ID number mismatch");
          break;

        case "expired":
          cardStatus = "Expired";
          reasons.push("Expired ID");
          break;
      }
    });

    reason =
      reasons.length === 0
        ? "All information matches and ID is valid"
        : reasons.join(", ");

    const issueDate = getRandomDate(Math.floor(Math.random() * 1000) + 365);
    const expiryDate = cardStatus === "Valid"
      ? getRandomFutureDate(Math.floor(Math.random() * 365) + 30)
      : getRandomDate(Math.floor(Math.random() * 365) + 1);

    scenarios.push({
      visitor: {
        name: fullName,
        age,
        purpose,
        idNumber,
        avatar,
      },
      idCard: {
        name: cardName,
        age: cardAge,
        idNumber: cardIdNumber,
        purpose: cardPurpose,
        status: cardStatus,
        issueDate,
        expiryDate,
        avatar,
      },
      shouldApprove,
      reason,
    });
  }

  return scenarios;
}
