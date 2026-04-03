// Game data and scenarios for the security simulation

export interface Visitor {
  name: string;
  age: number;
  purpose: string;
  avatar: string;
}

export interface IDCard {
  name: string;
  age: number;
  idNumber: string;
  status: "Valid" | "Expired";
  issueDate: string;
  expiryDate: string;
}

export interface Scenario {
  visitor: Visitor;
  idCard: IDCard;
  shouldApprove: boolean; // true = should be approved, false = should be denied
  reason: string;
}

const purposes = [
  "Business Meeting",
  "Delivery Service",
  "Maintenance Work",
  "Guest Visit",
  "Contractor Service",
  "Interview Appointment",
  "Equipment Installation",
  "Inspection",
];

const firstNames = [
  "Kirvy", "Alex", "Jordan", "Morgan", "Casey", "Taylor", "Riley", "Avery",
  "Quinn", "Blake", "Cameron", "Drew", "Ellis", "Finley", "Harper", "Jamie"
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Wilson", "Anderson", "Thomas", "Taylor"
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
    const avatar = `https://i.pravatar.cc/200?img=${i + 1}`;

    // Determine scenario type (70% valid, 30% invalid)
    const random = Math.random();
    let shouldApprove: boolean;
    let reason: string;
    let cardName = fullName;
    let cardAge = age;
    let cardStatus: "Valid" | "Expired" = "Valid";

    if (random < 0.5) {
      // Valid scenario - everything matches
      shouldApprove = true;
      reason = "All information matches and ID is valid";
    } else if (random < 0.65) {
      // Name mismatch
      let wrongFirstName;
      do {
        wrongFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      } while (wrongFirstName === firstName);
      cardName = `${wrongFirstName} ${lastName}`;
      shouldApprove = false;
      reason = "Name on ID card doesn't match visitor";
    } else if (random < 0.8) {
      // Age mismatch
      cardAge = age + (Math.random() < 0.5 ? 5 : -5);
      shouldApprove = false;
      reason = "Age on ID card doesn't match visitor";
    } else {
      // Expired ID
      cardStatus = "Expired";
      shouldApprove = false;
      reason = "ID card has expired";
    }

    const issueDate = getRandomDate(Math.floor(Math.random() * 1000) + 365);
    const expiryDate = cardStatus === "Valid" 
      ? getRandomFutureDate(Math.floor(Math.random() * 365) + 30)
      : getRandomDate(Math.floor(Math.random() * 365) + 1);

    scenarios.push({
      visitor: {
        name: fullName,
        age,
        purpose,
        avatar,
      },
      idCard: {
        name: cardName,
        age: cardAge,
        idNumber,
        status: cardStatus,
        issueDate,
        expiryDate,
      },
      shouldApprove,
      reason,
    });
  }

  return scenarios;
}
