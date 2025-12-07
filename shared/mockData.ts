import type { EmergencyContact, MedicalRecord, HospitalVisit } from "./schema";

// ============================================
// FILIPINO NAMES DATA
// ============================================
export const filipinoFirstNames = {
  male: [
    "Juan", "Jose", "Antonio", "Pedro", "Miguel", "Rafael", "Carlos", "Francisco", 
    "Ramon", "Eduardo", "Manuel", "Roberto", "Ricardo", "Fernando", "Alejandro",
    "Marco", "Gabriel", "Daniel", "Paolo", "Christian", "Jerome", "Kenneth",
    "Mark", "John Paul", "Ariel", "Reynaldo", "Rolando", "Ernesto", "Dante", "Joel"
  ],
  female: [
    "Maria", "Ana", "Rosa", "Carmen", "Josefa", "Luz", "Elena", "Patricia",
    "Teresa", "Cristina", "Margarita", "Rosario", "Dolores", "Esperanza", "Pilar",
    "Angela", "Sofia", "Isabella", "Gabriela", "Camille", "Jasmine", "Michelle",
    "Nicole", "Katrina", "Regina", "Beatriz", "Cecilia", "Lourdes", "Marites", "Joy"
  ]
};

export const filipinoLastNames = [
  "Dela Cruz", "Santos", "Reyes", "Cruz", "Bautista", "Ocampo", "Garcia", "Mendoza",
  "Torres", "Villanueva", "Gonzales", "Fernandez", "Lopez", "Ramos", "Aquino",
  "Castro", "Rivera", "Flores", "Navarro", "Diaz", "Morales", "Jimenez",
  "Hernandez", "Castillo", "Aguilar", "Pascual", "Manalo", "Soriano", "Tan", "Lim",
  "Chua", "Go", "Sy", "Ong", "Yu", "Co", "Ang", "Dy", "See", "Yap"
];

// ============================================
// PHILIPPINE ADDRESSES
// ============================================
export const philippineAddresses = [
  { street: "123 Rizal Avenue", barangay: "Barangay 123", city: "Manila", province: "Metro Manila", zipCode: "1000" },
  { street: "456 EDSA", barangay: "Barangay San Lorenzo", city: "Makati City", province: "Metro Manila", zipCode: "1227" },
  { street: "789 Ayala Avenue", barangay: "Bel-Air", city: "Makati City", province: "Metro Manila", zipCode: "1226" },
  { street: "321 Session Road", barangay: "Burnham", city: "Baguio City", province: "Benguet", zipCode: "2600" },
  { street: "555 Osmeña Boulevard", barangay: "Kamputhaw", city: "Cebu City", province: "Cebu", zipCode: "6000" },
  { street: "888 Quezon Avenue", barangay: "South Triangle", city: "Quezon City", province: "Metro Manila", zipCode: "1103" },
  { street: "100 España Boulevard", barangay: "Sampaloc", city: "Manila", province: "Metro Manila", zipCode: "1008" },
  { street: "200 Commonwealth Ave", barangay: "Holy Spirit", city: "Quezon City", province: "Metro Manila", zipCode: "1127" },
  { street: "75 Alabang-Zapote Road", barangay: "Alabang", city: "Muntinlupa City", province: "Metro Manila", zipCode: "1780" },
  { street: "42 Bonifacio High Street", barangay: "Fort Bonifacio", city: "Taguig City", province: "Metro Manila", zipCode: "1634" },
  { street: "15 Corrales Avenue", barangay: "Cagayan de Oro", city: "Cagayan de Oro City", province: "Misamis Oriental", zipCode: "9000" },
  { street: "88 J.P. Laurel Avenue", barangay: "Poblacion", city: "Davao City", province: "Davao del Sur", zipCode: "8000" },
  { street: "33 Real Street", barangay: "Iloilo City Proper", city: "Iloilo City", province: "Iloilo", zipCode: "5000" },
  { street: "77 Lacson Street", barangay: "Bacolod", city: "Bacolod City", province: "Negros Occidental", zipCode: "6100" },
  { street: "50 Magsaysay Drive", barangay: "Dagupan", city: "Dagupan City", province: "Pangasinan", zipCode: "2400" }
];

// ============================================
// COMMON PHILIPPINE DISEASES & CONDITIONS
// ============================================
export const commonPhilippineDiseases = [
  { name: "Dengue Fever", icd10: "A90", category: "Infectious" },
  { name: "Tuberculosis", icd10: "A15", category: "Infectious" },
  { name: "Typhoid Fever", icd10: "A01.0", category: "Infectious" },
  { name: "Leptospirosis", icd10: "A27", category: "Infectious" },
  { name: "COVID-19", icd10: "U07.1", category: "Infectious" },
  { name: "Hypertension", icd10: "I10", category: "Cardiovascular" },
  { name: "Type 2 Diabetes Mellitus", icd10: "E11", category: "Metabolic" },
  { name: "Acute Respiratory Infection", icd10: "J06.9", category: "Respiratory" },
  { name: "Pneumonia", icd10: "J18.9", category: "Respiratory" },
  { name: "Bronchial Asthma", icd10: "J45", category: "Respiratory" },
  { name: "Acute Gastroenteritis", icd10: "A09", category: "Gastrointestinal" },
  { name: "Urinary Tract Infection", icd10: "N39.0", category: "Genitourinary" },
  { name: "Chronic Kidney Disease", icd10: "N18", category: "Genitourinary" },
  { name: "Ischemic Heart Disease", icd10: "I25.9", category: "Cardiovascular" },
  { name: "Cerebrovascular Disease (Stroke)", icd10: "I67.9", category: "Cardiovascular" },
  { name: "Malaria", icd10: "B54", category: "Infectious" },
  { name: "Hepatitis B", icd10: "B16", category: "Infectious" },
  { name: "Chicken Pox", icd10: "B01", category: "Infectious" },
  { name: "Measles", icd10: "B05", category: "Infectious" },
  { name: "Hand, Foot and Mouth Disease", icd10: "B08.4", category: "Infectious" }
];

// ============================================
// TOP PHILIPPINE HOSPITALS
// ============================================
export const philippineHospitals = [
  {
    name: "Philippine General Hospital",
    licenseNumber: "DOH-NCR-001-2024",
    address: "Taft Avenue, Ermita, Manila 1000, Metro Manila",
    contactNumber: "+63 2 8554 8400",
    departments: ["Emergency Medicine", "Internal Medicine", "Surgery", "Pediatrics", "Obstetrics & Gynecology", "Cardiology", "Neurology", "Orthopedics", "Oncology", "Psychiatry"],
    type: "Government Tertiary",
    bedCapacity: 1500
  },
  {
    name: "St. Luke's Medical Center - Global City",
    licenseNumber: "DOH-NCR-002-2024",
    address: "Rizal Drive corner 32nd Street, Bonifacio Global City, Taguig 1634",
    contactNumber: "+63 2 8789 7700",
    departments: ["Cardiovascular", "Cancer Center", "Neurosciences", "Transplant", "Orthopedics", "Emergency", "Pediatrics"],
    type: "Private Tertiary",
    bedCapacity: 650
  },
  {
    name: "Makati Medical Center",
    licenseNumber: "DOH-NCR-003-2024",
    address: "2 Amorsolo Street, Legaspi Village, Makati 1229, Metro Manila",
    contactNumber: "+63 2 8888 8999",
    departments: ["Cardiology", "Oncology", "Neurology", "Gastroenterology", "Nephrology", "Urology", "ENT"],
    type: "Private Tertiary",
    bedCapacity: 600
  },
  {
    name: "The Medical City",
    licenseNumber: "DOH-NCR-004-2024",
    address: "Ortigas Avenue, Pasig City 1605, Metro Manila",
    contactNumber: "+63 2 8988 1000",
    departments: ["Heart Center", "Cancer Center", "Neurosciences", "Women and Children", "Digestive Disease"],
    type: "Private Tertiary",
    bedCapacity: 550
  },
  {
    name: "Asian Hospital and Medical Center",
    licenseNumber: "DOH-NCR-005-2024",
    address: "2205 Civic Drive, Filinvest Corporate City, Alabang, Muntinlupa 1781",
    contactNumber: "+63 2 8771 9000",
    departments: ["Cardiology", "Cancer Center", "Orthopedics", "Neurosciences", "Diabetes Center"],
    type: "Private Tertiary",
    bedCapacity: 235
  },
  {
    name: "Cardinal Santos Medical Center",
    licenseNumber: "DOH-NCR-006-2024",
    address: "10 Wilson Street, Greenhills West, San Juan 1502, Metro Manila",
    contactNumber: "+63 2 8727 0001",
    departments: ["Heart Center", "Stroke Center", "Cancer Center", "Orthopedics", "Kidney Center"],
    type: "Private Tertiary",
    bedCapacity: 300
  },
  {
    name: "Chong Hua Hospital",
    licenseNumber: "DOH-VII-001-2024",
    address: "Don Mariano Cui Street, Cebu City 6000, Cebu",
    contactNumber: "+63 32 255 8000",
    departments: ["Cardiology", "Oncology", "Orthopedics", "Neurology", "Pediatrics"],
    type: "Private Tertiary",
    bedCapacity: 500
  },
  {
    name: "Davao Doctors Hospital",
    licenseNumber: "DOH-XI-001-2024",
    address: "E. Quirino Avenue, Davao City 8000, Davao del Sur",
    contactNumber: "+63 82 222 8000",
    departments: ["Emergency", "Surgery", "Internal Medicine", "Pediatrics", "OB-Gyne"],
    type: "Private Tertiary",
    bedCapacity: 350
  },
  {
    name: "Jose B. Lingad Memorial General Hospital",
    licenseNumber: "DOH-III-001-2024",
    address: "Sindalan, San Fernando, Pampanga 2000",
    contactNumber: "+63 45 961 2691",
    departments: ["Emergency", "Internal Medicine", "Surgery", "Pediatrics", "Family Medicine"],
    type: "Government Tertiary",
    bedCapacity: 400
  },
  {
    name: "Baguio General Hospital and Medical Center",
    licenseNumber: "DOH-CAR-001-2024",
    address: "Governor Pack Road, Baguio City 2600, Benguet",
    contactNumber: "+63 74 442 4216",
    departments: ["Emergency", "Medicine", "Surgery", "Pediatrics", "OB-Gyne", "Psychiatry"],
    type: "Government Tertiary",
    bedCapacity: 350
  }
];

// ============================================
// COMMON PHILIPPINE MEDICINES
// ============================================
export const philippineMedicines = [
  { name: "Biogesic (Paracetamol)", dosage: "500mg", form: "Tablet", category: "Analgesic/Antipyretic" },
  { name: "Neozep Forte", dosage: "500mg/25mg/2mg", form: "Tablet", category: "Cold & Flu" },
  { name: "Bioflu", dosage: "500mg/25mg/2mg", form: "Tablet", category: "Cold & Flu" },
  { name: "Amoxicillin", dosage: "500mg", form: "Capsule", category: "Antibiotic" },
  { name: "Cefalexin", dosage: "500mg", form: "Capsule", category: "Antibiotic" },
  { name: "Metformin", dosage: "500mg", form: "Tablet", category: "Antidiabetic" },
  { name: "Losartan", dosage: "50mg", form: "Tablet", category: "Antihypertensive" },
  { name: "Amlodipine", dosage: "5mg", form: "Tablet", category: "Antihypertensive" },
  { name: "Salbutamol", dosage: "2mg", form: "Tablet", category: "Bronchodilator" },
  { name: "Omeprazole", dosage: "20mg", form: "Capsule", category: "Proton Pump Inhibitor" },
  { name: "Loperamide (Diatabs)", dosage: "2mg", form: "Capsule", category: "Antidiarrheal" },
  { name: "Mefenamic Acid", dosage: "500mg", form: "Capsule", category: "NSAID" },
  { name: "Ibuprofen", dosage: "400mg", form: "Tablet", category: "NSAID" },
  { name: "Ascorbic Acid", dosage: "500mg", form: "Tablet", category: "Vitamin" },
  { name: "Cetirizine", dosage: "10mg", form: "Tablet", category: "Antihistamine" },
  { name: "Cotrimoxazole (Bactrim)", dosage: "400mg/80mg", form: "Tablet", category: "Antibiotic" },
  { name: "Atorvastatin", dosage: "20mg", form: "Tablet", category: "Statin" },
  { name: "Aspirin", dosage: "80mg", form: "Tablet", category: "Antiplatelet" },
  { name: "Simvastatin", dosage: "20mg", form: "Tablet", category: "Statin" },
  { name: "Insulin Glargine", dosage: "100 IU/mL", form: "Injection", category: "Insulin" }
];

// ============================================
// COMMON LABORATORY TESTS IN PH
// ============================================
export const philippineLabTests = [
  { name: "Complete Blood Count (CBC)", category: "Hematology", unit: "cells/uL" },
  { name: "Fasting Blood Sugar (FBS)", category: "Chemistry", unit: "mg/dL", normalRange: "70-100" },
  { name: "HbA1c", category: "Chemistry", unit: "%", normalRange: "<5.7" },
  { name: "Lipid Profile", category: "Chemistry", unit: "mg/dL" },
  { name: "Creatinine", category: "Chemistry", unit: "mg/dL", normalRange: "0.7-1.3" },
  { name: "Blood Urea Nitrogen (BUN)", category: "Chemistry", unit: "mg/dL", normalRange: "7-20" },
  { name: "SGPT/ALT", category: "Chemistry", unit: "U/L", normalRange: "7-56" },
  { name: "SGOT/AST", category: "Chemistry", unit: "U/L", normalRange: "10-40" },
  { name: "Urinalysis", category: "Urine", unit: "N/A" },
  { name: "Chest X-Ray", category: "Radiology", unit: "N/A" },
  { name: "ECG/EKG", category: "Cardiology", unit: "N/A" },
  { name: "Dengue NS1 Antigen", category: "Serology", unit: "N/A" },
  { name: "COVID-19 RT-PCR", category: "Molecular", unit: "N/A" },
  { name: "COVID-19 Antigen Test", category: "Serology", unit: "N/A" },
  { name: "Hepatitis B Surface Antigen", category: "Serology", unit: "N/A" },
  { name: "Thyroid Function Test (T3, T4, TSH)", category: "Chemistry", unit: "N/A" },
  { name: "Uric Acid", category: "Chemistry", unit: "mg/dL", normalRange: "2.5-7.0" },
  { name: "Stool Examination", category: "Parasitology", unit: "N/A" },
  { name: "Sputum AFB Smear", category: "Microbiology", unit: "N/A" },
  { name: "Blood Typing (ABO & Rh)", category: "Blood Bank", unit: "N/A" }
];

// ============================================
// VACCINATION RECORDS (DOH IMMUNIZATION SCHEDULE)
// ============================================
export const philippineVaccinations = [
  { name: "BCG", disease: "Tuberculosis", schedule: "At birth" },
  { name: "Hepatitis B", disease: "Hepatitis B", schedule: "At birth, 6 weeks, 14 weeks" },
  { name: "Pentavalent (DPT-HepB-Hib)", disease: "Diphtheria, Pertussis, Tetanus, Hep B, Hib", schedule: "6, 10, 14 weeks" },
  { name: "Oral Polio Vaccine (OPV)", disease: "Poliomyelitis", schedule: "6, 10, 14 weeks" },
  { name: "Inactivated Polio Vaccine (IPV)", disease: "Poliomyelitis", schedule: "14 weeks" },
  { name: "Pneumococcal Conjugate Vaccine (PCV)", disease: "Pneumonia", schedule: "6, 10, 14 weeks" },
  { name: "Measles-Mumps-Rubella (MMR)", disease: "Measles, Mumps, Rubella", schedule: "9, 12 months" },
  { name: "Influenza Vaccine", disease: "Influenza", schedule: "Annually" },
  { name: "COVID-19 Vaccine (Pfizer/Moderna/Sinovac)", disease: "COVID-19", schedule: "12+ years, Primary + Boosters" },
  { name: "Tetanus-Diphtheria (Td)", disease: "Tetanus, Diphtheria", schedule: "Pregnant women, Adults" },
  { name: "HPV Vaccine", disease: "Human Papillomavirus", schedule: "9-14 years, 2 doses" },
  { name: "Japanese Encephalitis Vaccine", disease: "Japanese Encephalitis", schedule: "9 months" },
  { name: "Rabies Vaccine", disease: "Rabies", schedule: "Post-exposure" },
  { name: "Typhoid Vaccine", disease: "Typhoid Fever", schedule: "2+ years" },
  { name: "Hepatitis A Vaccine", disease: "Hepatitis A", schedule: "1+ years, 2 doses" }
];

// ============================================
// COMMON MEDICAL PROCEDURES
// ============================================
export const medicalProcedures = [
  { name: "Appendectomy", category: "Surgery", avgCost: 50000 },
  { name: "Cesarean Section", category: "OB-Gyne", avgCost: 80000 },
  { name: "Normal Spontaneous Delivery", category: "OB-Gyne", avgCost: 30000 },
  { name: "Coronary Angiogram", category: "Cardiology", avgCost: 100000 },
  { name: "Coronary Angioplasty/Stenting", category: "Cardiology", avgCost: 350000 },
  { name: "Hemodialysis", category: "Nephrology", avgCost: 3500 },
  { name: "Colonoscopy", category: "Gastroenterology", avgCost: 15000 },
  { name: "Endoscopy (EGD)", category: "Gastroenterology", avgCost: 12000 },
  { name: "Cholecystectomy", category: "Surgery", avgCost: 70000 },
  { name: "Hernia Repair", category: "Surgery", avgCost: 45000 },
  { name: "Cataract Surgery", category: "Ophthalmology", avgCost: 35000 },
  { name: "CT Scan", category: "Radiology", avgCost: 8000 },
  { name: "MRI", category: "Radiology", avgCost: 15000 },
  { name: "Ultrasound", category: "Radiology", avgCost: 1500 },
  { name: "Physical Therapy Session", category: "Rehabilitation", avgCost: 800 }
];

// ============================================
// COMMON ALLERGIES
// ============================================
export const commonAllergies = [
  "Penicillin", "Sulfa drugs", "Aspirin", "Ibuprofen", "Seafood",
  "Shellfish", "Peanuts", "Eggs", "Milk", "Soy", "Dust mites",
  "Pollen", "Latex", "Bee stings", "Contrast dye", "Lidocaine",
  "Codeine", "Morphine", "None known"
];

// ============================================
// BLOOD TYPES
// ============================================
export const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// ============================================
// MOCK PATIENT PROFILES
// ============================================
export const mockPatientProfiles = [
  {
    id: "patient-001",
    nftId: "PHM-NFT-2024-001-ABCD1234",
    firstName: "Juan",
    lastName: "Dela Cruz",
    email: "juan.delacruz@email.com",
    phone: "+63 917 123 4567",
    dateOfBirth: new Date("1985-03-15"),
    address: "123 Rizal Avenue, Barangay 123, Manila, Metro Manila 1000",
    bloodType: "O+",
    allergies: ["Penicillin", "Seafood"],
    currentMedications: ["Losartan 50mg daily", "Metformin 500mg twice daily"],
    emergencyContacts: [
      { name: "Maria Dela Cruz", relationship: "Wife", phone: "+63 918 234 5678" },
      { name: "Pedro Dela Cruz", relationship: "Son", phone: "+63 919 345 6789" }
    ] as EmergencyContact[],
    recentRecords: [
      { date: "2024-11-15", type: "Consultation", description: "Follow-up for Hypertension and Diabetes", provider: "Dr. Santos - Philippine General Hospital" },
      { date: "2024-10-20", type: "Laboratory", description: "HbA1c: 7.2%, FBS: 126 mg/dL", provider: "PGH Laboratory" },
      { date: "2024-09-05", type: "Prescription", description: "Metformin 500mg, Losartan 50mg refill", provider: "Dr. Santos" }
    ] as MedicalRecord[],
    hospitalHistory: [
      { hospital: "Philippine General Hospital", date: "2024-06-10", reason: "Chest pain evaluation", treatment: "Cardiac workup - negative for acute coronary syndrome" },
      { hospital: "Makati Medical Center", date: "2023-12-15", reason: "Dengue fever", treatment: "IV fluids, monitoring, discharged after 5 days" }
    ] as HospitalVisit[]
  },
  {
    id: "patient-002",
    nftId: "PHM-NFT-2024-002-EFGH5678",
    firstName: "Maria",
    lastName: "Santos",
    email: "maria.santos@email.com",
    phone: "+63 918 987 6543",
    dateOfBirth: new Date("1992-07-22"),
    address: "456 Ayala Avenue, Bel-Air, Makati City, Metro Manila 1226",
    bloodType: "A+",
    allergies: ["Sulfa drugs"],
    currentMedications: ["Cetirizine 10mg as needed", "Vitamin D3 1000IU daily"],
    emergencyContacts: [
      { name: "Jose Santos", relationship: "Husband", phone: "+63 917 111 2222" },
      { name: "Ana Santos", relationship: "Mother", phone: "+63 916 333 4444" }
    ] as EmergencyContact[],
    recentRecords: [
      { date: "2024-11-20", type: "Consultation", description: "Prenatal checkup - 28 weeks", provider: "Dr. Reyes - St. Luke's BGC" },
      { date: "2024-11-18", type: "Ultrasound", description: "Congenital anomaly scan - normal", provider: "St. Luke's Radiology" },
      { date: "2024-10-25", type: "Laboratory", description: "Glucose Challenge Test - normal", provider: "St. Luke's Laboratory" }
    ] as MedicalRecord[],
    hospitalHistory: [
      { hospital: "St. Luke's Medical Center BGC", date: "2024-08-15", reason: "First trimester screening", treatment: "Routine prenatal care" }
    ] as HospitalVisit[]
  },
  {
    id: "patient-003",
    nftId: "PHM-NFT-2024-003-IJKL9012",
    firstName: "Roberto",
    lastName: "Garcia",
    email: "roberto.garcia@email.com",
    phone: "+63 919 555 7890",
    dateOfBirth: new Date("1958-11-08"),
    address: "789 Session Road, Burnham, Baguio City, Benguet 2600",
    bloodType: "B+",
    allergies: ["Aspirin", "Contrast dye"],
    currentMedications: ["Amlodipine 10mg daily", "Atorvastatin 40mg daily", "Aspirin 80mg daily (hold)", "Insulin Glargine 20 units at bedtime"],
    emergencyContacts: [
      { name: "Elena Garcia", relationship: "Wife", phone: "+63 920 666 8901" },
      { name: "Carlos Garcia", relationship: "Son", phone: "+63 921 777 9012" }
    ] as EmergencyContact[],
    recentRecords: [
      { date: "2024-11-10", type: "Procedure", description: "Coronary Angiogram - 70% LAD stenosis", provider: "Dr. Villanueva - Baguio General Hospital" },
      { date: "2024-11-05", type: "Consultation", description: "Chest pain, shortness of breath evaluation", provider: "Dr. Villanueva" },
      { date: "2024-10-01", type: "Laboratory", description: "Lipid Panel: TC 245, LDL 165, HDL 38, TG 210", provider: "BGH Laboratory" }
    ] as MedicalRecord[],
    hospitalHistory: [
      { hospital: "Baguio General Hospital", date: "2024-11-08", reason: "Unstable angina", treatment: "Admitted to CCU, coronary angiogram performed, scheduled for PCI" },
      { hospital: "Philippine Heart Center", date: "2022-05-20", reason: "Coronary artery bypass surgery", treatment: "CABG x3 vessels, uneventful recovery" }
    ] as HospitalVisit[]
  },
  {
    id: "patient-004",
    nftId: "PHM-NFT-2024-004-MNOP3456",
    firstName: "Angela",
    lastName: "Reyes",
    email: "angela.reyes@email.com",
    phone: "+63 920 123 0987",
    dateOfBirth: new Date("2015-04-12"),
    address: "321 Commonwealth Ave, Holy Spirit, Quezon City, Metro Manila 1127",
    bloodType: "AB+",
    allergies: ["Eggs"],
    currentMedications: ["Salbutamol inhaler as needed", "Montelukast 5mg daily"],
    emergencyContacts: [
      { name: "Patricia Reyes", relationship: "Mother", phone: "+63 917 444 5555" },
      { name: "Ramon Reyes", relationship: "Father", phone: "+63 918 666 7777" }
    ] as EmergencyContact[],
    recentRecords: [
      { date: "2024-11-18", type: "Consultation", description: "Asthma follow-up - well controlled", provider: "Dr. Cruz - The Medical City" },
      { date: "2024-11-18", type: "Vaccination", description: "Influenza vaccine administered", provider: "The Medical City" },
      { date: "2024-08-15", type: "Laboratory", description: "CBC, Spirometry - within normal limits", provider: "TMC Laboratory" }
    ] as MedicalRecord[],
    hospitalHistory: [
      { hospital: "The Medical City", date: "2024-02-10", reason: "Acute asthma exacerbation", treatment: "Nebulization, oral steroids, discharged after 2 days" },
      { hospital: "Philippine Children's Medical Center", date: "2023-06-05", reason: "Pneumonia", treatment: "IV antibiotics, supportive care, 5-day admission" }
    ] as HospitalVisit[]
  },
  {
    id: "patient-005",
    nftId: "PHM-NFT-2024-005-QRST7890",
    firstName: "Fernando",
    lastName: "Mendoza",
    email: "fernando.mendoza@email.com",
    phone: "+63 921 987 1234",
    dateOfBirth: new Date("1970-09-30"),
    address: "555 Osmeña Boulevard, Kamputhaw, Cebu City, Cebu 6000",
    bloodType: "O-",
    allergies: ["None known"],
    currentMedications: ["Omeprazole 20mg daily", "Pantoprazole 40mg daily"],
    emergencyContacts: [
      { name: "Rosario Mendoza", relationship: "Wife", phone: "+63 922 111 0000" }
    ] as EmergencyContact[],
    recentRecords: [
      { date: "2024-11-12", type: "Procedure", description: "Upper GI Endoscopy - Gastric ulcer, H. pylori positive", provider: "Dr. Tan - Chong Hua Hospital" },
      { date: "2024-11-12", type: "Prescription", description: "Triple therapy: Amoxicillin, Clarithromycin, Omeprazole x 14 days", provider: "Dr. Tan" },
      { date: "2024-11-01", type: "Consultation", description: "Epigastric pain, heartburn for 3 weeks", provider: "Dr. Tan" }
    ] as MedicalRecord[],
    hospitalHistory: [
      { hospital: "Chong Hua Hospital", date: "2024-11-12", reason: "Upper GI bleeding", treatment: "Endoscopy with cauterization, PPI drip, 3-day admission" }
    ] as HospitalVisit[]
  }
];

// ============================================
// MOCK DOCTOR PROFILES
// ============================================
export const mockDoctorProfiles = [
  {
    id: "doctor-001",
    firstName: "Ricardo",
    lastName: "Santos",
    email: "dr.santos@pgh.gov.ph",
    phone: "+63 917 888 9999",
    licenseNumber: "PRC-MD-2010-001234",
    issuingBody: "Professional Regulation Commission",
    specialization: "Internal Medicine - Endocrinology",
    hospitalId: "hospital-001",
    licenseExpiry: new Date("2027-06-30")
  },
  {
    id: "doctor-002",
    firstName: "Cristina",
    lastName: "Reyes",
    email: "dr.reyes@stlukes.com.ph",
    phone: "+63 918 777 8888",
    licenseNumber: "PRC-MD-2008-005678",
    issuingBody: "Professional Regulation Commission",
    specialization: "Obstetrics & Gynecology",
    hospitalId: "hospital-002",
    licenseExpiry: new Date("2026-12-31")
  },
  {
    id: "doctor-003",
    firstName: "Antonio",
    lastName: "Villanueva",
    email: "dr.villanueva@bgh.gov.ph",
    phone: "+63 919 666 7777",
    licenseNumber: "PRC-MD-2005-009012",
    issuingBody: "Professional Regulation Commission",
    specialization: "Cardiology - Interventional",
    hospitalId: "hospital-010",
    licenseExpiry: new Date("2025-09-30")
  },
  {
    id: "doctor-004",
    firstName: "Beatriz",
    lastName: "Cruz",
    email: "dr.cruz@tmc.com.ph",
    phone: "+63 920 555 6666",
    licenseNumber: "PRC-MD-2012-003456",
    issuingBody: "Professional Regulation Commission",
    specialization: "Pediatrics - Pulmonology",
    hospitalId: "hospital-004",
    licenseExpiry: new Date("2028-03-31")
  },
  {
    id: "doctor-005",
    firstName: "Eduardo",
    lastName: "Tan",
    email: "dr.tan@chonghua.com.ph",
    phone: "+63 921 444 5555",
    licenseNumber: "PRC-MD-2007-007890",
    issuingBody: "Professional Regulation Commission",
    specialization: "Gastroenterology",
    hospitalId: "hospital-007",
    licenseExpiry: new Date("2026-06-30")
  }
];

// ============================================
// MOCK BLOCKCHAIN/NFT TRANSACTIONS
// ============================================
export const mockBlockchainTransactions = [
  {
    id: "tx-001",
    txHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
    blockNumber: 12345678,
    timestamp: new Date("2024-11-20T10:30:00Z"),
    type: "NFT_MINT",
    fromAddress: "0x0000000000000000000000000000000000000000",
    toAddress: "0xABCD1234567890ABCDEF1234567890ABCDEF1234",
    nftId: "PHM-NFT-2024-001-ABCD1234",
    patientId: "patient-001",
    gasUsed: 150000,
    gasPrice: "20 gwei",
    status: "confirmed"
  },
  {
    id: "tx-002",
    txHash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab",
    blockNumber: 12345680,
    timestamp: new Date("2024-11-20T11:15:00Z"),
    type: "ACCESS_GRANTED",
    fromAddress: "0xABCD1234567890ABCDEF1234567890ABCDEF1234",
    toAddress: "0xDEF4567890ABCDEF1234567890ABCDEF12345678",
    nftId: "PHM-NFT-2024-001-ABCD1234",
    accessDuration: 3600,
    doctorId: "doctor-001",
    gasUsed: 80000,
    gasPrice: "18 gwei",
    status: "confirmed"
  },
  {
    id: "tx-003",
    txHash: "0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
    blockNumber: 12345700,
    timestamp: new Date("2024-11-20T14:45:00Z"),
    type: "RECORD_UPDATE",
    fromAddress: "0xDEF4567890ABCDEF1234567890ABCDEF12345678",
    toAddress: "0xABCD1234567890ABCDEF1234567890ABCDEF1234",
    nftId: "PHM-NFT-2024-001-ABCD1234",
    metadataHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
    gasUsed: 120000,
    gasPrice: "22 gwei",
    status: "confirmed"
  },
  {
    id: "tx-004",
    txHash: "0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    blockNumber: 12345750,
    timestamp: new Date("2024-11-21T09:00:00Z"),
    type: "EMERGENCY_ACCESS",
    fromAddress: "0x9999888877776666555544443333222211110000",
    toAddress: "0xABCD1234567890ABCDEF1234567890ABCDEF1234",
    nftId: "PHM-NFT-2024-003-IJKL9012",
    accessReason: "Emergency room admission - cardiac event",
    hospitalId: "hospital-010",
    gasUsed: 95000,
    gasPrice: "25 gwei",
    status: "confirmed"
  },
  {
    id: "tx-005",
    txHash: "0x5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12",
    blockNumber: 12345800,
    timestamp: new Date("2024-11-21T16:30:00Z"),
    type: "DATA_SALE",
    fromAddress: "0xABCD1234567890ABCDEF1234567890ABCDEF1234",
    toAddress: "0xRESEARCH1234567890ABCDEF1234567890ABCDEF",
    nftId: "PHM-NFT-2024-002-EFGH5678",
    dataType: "Anonymized prenatal data",
    priceWei: "500000000000000000",
    gasUsed: 200000,
    gasPrice: "20 gwei",
    status: "confirmed"
  }
];

// ============================================
// MOCK SMART CONTRACT CALLS
// ============================================
export const mockSmartContractCalls = [
  {
    id: "call-001",
    contractAddress: "0xPHILHEALTHNFT1234567890ABCDEF1234567890",
    methodName: "mintHealthNFT",
    params: {
      patientAddress: "0xABCD1234567890ABCDEF1234567890ABCDEF1234",
      tokenURI: "ipfs://QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
      encryptionKeyHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
    },
    timestamp: new Date("2024-11-20T10:30:00Z"),
    caller: "0xSYSTEM_DEPLOYER_ADDRESS_1234567890ABCDEF"
  },
  {
    id: "call-002",
    contractAddress: "0xPHILHEALTHNFT1234567890ABCDEF1234567890",
    methodName: "grantTemporaryAccess",
    params: {
      tokenId: 1,
      granteeAddress: "0xDEF4567890ABCDEF1234567890ABCDEF12345678",
      durationSeconds: 3600,
      accessLevel: 2
    },
    timestamp: new Date("2024-11-20T11:15:00Z"),
    caller: "0xABCD1234567890ABCDEF1234567890ABCDEF1234"
  },
  {
    id: "call-003",
    contractAddress: "0xPHILHEALTHNFT1234567890ABCDEF1234567890",
    methodName: "updateMedicalRecord",
    params: {
      tokenId: 1,
      recordHash: "QmNewRecordHash1234567890ABCDEF",
      recordType: "consultation",
      providerAddress: "0xDEF4567890ABCDEF1234567890ABCDEF12345678"
    },
    timestamp: new Date("2024-11-20T14:45:00Z"),
    caller: "0xDEF4567890ABCDEF1234567890ABCDEF12345678"
  },
  {
    id: "call-004",
    contractAddress: "0xPHILHEALTHNFT1234567890ABCDEF1234567890",
    methodName: "requestEmergencyAccess",
    params: {
      tokenId: 3,
      requesterAddress: "0x9999888877776666555544443333222211110000",
      emergencyCode: "EMERGENCY-BGH-2024-001",
      reason: "Cardiac emergency - patient unconscious"
    },
    timestamp: new Date("2024-11-21T09:00:00Z"),
    caller: "0x9999888877776666555544443333222211110000"
  },
  {
    id: "call-005",
    contractAddress: "0xDATAMARKETPLACE1234567890ABCDEF12345678",
    methodName: "listDataForSale",
    params: {
      tokenId: 2,
      priceWei: "500000000000000000",
      dataCategory: "prenatal_anonymized",
      validUntil: new Date("2025-12-31T23:59:59Z")
    },
    timestamp: new Date("2024-11-21T16:00:00Z"),
    caller: "0xABCD1234567890ABCDEF1234567890ABCDEF1234"
  }
];

// ============================================
// MOCK AUDIT LOGS
// ============================================
export const mockAuditLogs = [
  {
    id: "audit-001",
    timestamp: new Date("2024-11-20T10:30:00Z"),
    action: "NFT_CREATED",
    actorType: "system",
    actorId: "system-deployer",
    targetType: "patient_record",
    targetId: "patient-001",
    nftId: "PHM-NFT-2024-001-ABCD1234",
    ipAddress: "10.0.0.1",
    userAgent: "PHHealth-Backend/1.0",
    details: { tokenId: 1, mintedTo: "0xABCD1234567890ABCDEF1234567890ABCDEF1234" },
    blockchainTxHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890"
  },
  {
    id: "audit-002",
    timestamp: new Date("2024-11-20T11:15:00Z"),
    action: "ACCESS_GRANTED",
    actorType: "patient",
    actorId: "patient-001",
    targetType: "doctor",
    targetId: "doctor-001",
    nftId: "PHM-NFT-2024-001-ABCD1234",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)",
    details: { accessDuration: 3600, accessLevel: "full_read" },
    blockchainTxHash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab"
  },
  {
    id: "audit-003",
    timestamp: new Date("2024-11-20T11:45:00Z"),
    action: "RECORD_VIEWED",
    actorType: "doctor",
    actorId: "doctor-001",
    targetType: "patient_record",
    targetId: "patient-001",
    nftId: "PHM-NFT-2024-001-ABCD1234",
    ipAddress: "10.20.30.40",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    details: { viewedSections: ["allergies", "medications", "recent_records"] },
    blockchainTxHash: null
  },
  {
    id: "audit-004",
    timestamp: new Date("2024-11-20T14:45:00Z"),
    action: "RECORD_UPDATED",
    actorType: "doctor",
    actorId: "doctor-001",
    targetType: "patient_record",
    targetId: "patient-001",
    nftId: "PHM-NFT-2024-001-ABCD1234",
    ipAddress: "10.20.30.40",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    details: { addedRecord: { type: "consultation", date: "2024-11-20" } },
    blockchainTxHash: "0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd"
  },
  {
    id: "audit-005",
    timestamp: new Date("2024-11-21T09:00:00Z"),
    action: "EMERGENCY_ACCESS_REQUESTED",
    actorType: "hospital",
    actorId: "hospital-010",
    targetType: "patient_record",
    targetId: "patient-003",
    nftId: "PHM-NFT-2024-003-IJKL9012",
    ipAddress: "203.177.50.100",
    userAgent: "PHHealth-Emergency/1.0",
    details: { reason: "Cardiac emergency", emergencyCode: "EMERGENCY-BGH-2024-001" },
    blockchainTxHash: "0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
  },
  {
    id: "audit-006",
    timestamp: new Date("2024-11-21T09:01:00Z"),
    action: "EMERGENCY_ACCESS_GRANTED",
    actorType: "system",
    actorId: "emergency-access-service",
    targetType: "patient_record",
    targetId: "patient-003",
    nftId: "PHM-NFT-2024-003-IJKL9012",
    ipAddress: "10.0.0.1",
    userAgent: "PHHealth-Backend/1.0",
    details: { accessDuration: 14400, accessLevel: "emergency_full" },
    blockchainTxHash: "0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
  },
  {
    id: "audit-007",
    timestamp: new Date("2024-11-21T16:30:00Z"),
    action: "DATA_SOLD",
    actorType: "patient",
    actorId: "patient-002",
    targetType: "research_institution",
    targetId: "research-001",
    nftId: "PHM-NFT-2024-002-EFGH5678",
    ipAddress: "192.168.1.150",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    details: { dataType: "prenatal_anonymized", pricePhp: 28000 },
    blockchainTxHash: "0x5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12"
  },
  {
    id: "audit-008",
    timestamp: new Date("2024-11-22T08:00:00Z"),
    action: "ACCESS_REVOKED",
    actorType: "patient",
    actorId: "patient-001",
    targetType: "doctor",
    targetId: "doctor-001",
    nftId: "PHM-NFT-2024-001-ABCD1234",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)",
    details: { reason: "Access period expired", previousAccessLevel: "full_read" },
    blockchainTxHash: "0x6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234"
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================
export function generateRandomNftId(): string {
  const year = new Date().getFullYear();
  const sequence = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  const randomChars = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `PHM-NFT-${year}-${sequence}-${randomChars}`;
}

export function generateRandomWalletAddress(): string {
  return "0x" + Array.from({ length: 40 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join("").toUpperCase();
}

export function generateRandomTxHash(): string {
  return "0x" + Array.from({ length: 64 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
}

export function getRandomFilipino(gender?: "male" | "female"): { firstName: string; lastName: string } {
  const selectedGender = gender || (Math.random() > 0.5 ? "male" : "female");
  const firstNames = filipinoFirstNames[selectedGender];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = filipinoLastNames[Math.floor(Math.random() * filipinoLastNames.length)];
  return { firstName, lastName };
}

export function getRandomAddress(): string {
  const addr = philippineAddresses[Math.floor(Math.random() * philippineAddresses.length)];
  return `${addr.street}, ${addr.barangay}, ${addr.city}, ${addr.province} ${addr.zipCode}`;
}

export function getRandomBloodType(): string {
  return bloodTypes[Math.floor(Math.random() * bloodTypes.length)];
}

export function getRandomAllergies(count: number = 2): string[] {
  const shuffled = [...commonAllergies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getRandomDisease(): typeof commonPhilippineDiseases[0] {
  return commonPhilippineDiseases[Math.floor(Math.random() * commonPhilippineDiseases.length)];
}

export function getRandomHospital(): typeof philippineHospitals[0] {
  return philippineHospitals[Math.floor(Math.random() * philippineHospitals.length)];
}

export function getRandomMedicine(): typeof philippineMedicines[0] {
  return philippineMedicines[Math.floor(Math.random() * philippineMedicines.length)];
}

export function getRandomLabTest(): typeof philippineLabTests[0] {
  return philippineLabTests[Math.floor(Math.random() * philippineLabTests.length)];
}
