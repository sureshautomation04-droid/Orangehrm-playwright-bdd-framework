import { faker } from "@faker-js/faker";

/**
 * Employee personal details structure
 */
export interface EmployeePersonalDetails {
    otherId: string;
    drivingLicenseNumber: string;
    licenseExpiryDate: string;
    nationality: string;
    maritalStatus: string;
    dateOfBirth: string;
    gender: "Male" | "Female";
    bloodGroup: string;
    testField: string;
    updateToastMessage: string;
}

/**
 * Complete test data for employee creation flow
 */
export interface EmployeeTestData {
    // Basic employee info
    firstName: string;
    middleName: string;
    lastName: string;

    // Login credentials
    username: string;
    status: "Enabled" | "Disabled";
    password: string;

    // Toast messages
    toastMessage: string;
    updateToastMessage: string;

    // Personal details
    personalDetails: EmployeePersonalDetails;
}

/**
 * Generates a secure password meeting common requirements
 */
function generatePassword(): string {
    const upper = faker.string.alpha({ length: 1, casing: "upper" });
    const lower = faker.string.alpha({ length: 1, casing: "lower" });
    const number = faker.string.numeric(1);
    const special = faker.helpers.arrayElement(["@", "#", "$", "%", "&", "*", "!"]);
    const remaining = faker.string.alphanumeric(4);

    return faker.helpers
        .shuffle([upper, lower, number, special, ...remaining])
        .join("");
}

/**
 * Generates random employee personal details
 */
export function generateEmployeePersonalDetails(): EmployeePersonalDetails {
    const nationalities = [
        "Indian", "American", "British", "Canadian", "Australian",
        "German", "French", "Japanese", "Chinese", "Brazilian"
    ];

    const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const genders: ("Male" | "Female")[] = ["Male", "Female"];

    return {
        otherId: faker.string.alphanumeric(12).toUpperCase(),
        drivingLicenseNumber: `DL${faker.string.numeric(8)}`,
        licenseExpiryDate: faker.date.future({ years: 10 }).toISOString().split("T")[0],
        nationality: faker.helpers.arrayElement(nationalities),
        maritalStatus: faker.helpers.arrayElement(maritalStatuses),
        dateOfBirth: faker.date.birthdate({ min: 18, max: 60, mode: "age" }).toISOString().split("T")[0],
        gender: faker.helpers.arrayElement(genders),
        bloodGroup: faker.helpers.arrayElement(bloodGroups),
        testField: faker.lorem.words(2),
        updateToastMessage: "Successfully Updated"
    };
}

/**
 * Generates complete test data for employee creation flow
 */
export function generateEmployeeTestData(): EmployeeTestData {
    const firstName = faker.person.firstName();
    const middleName = faker.person.middleName();
    const lastName = faker.person.lastName();
    const personalDetails = generateEmployeePersonalDetails();

    return {
        firstName,
        middleName,
        lastName,
        username: faker.internet.username({ firstName, lastName }),
        status: faker.helpers.arrayElement(["Enabled", "Disabled"]),
        password: generatePassword(),
        toastMessage: "Successfully Saved",
        updateToastMessage: "Successfully Updated",
        personalDetails
    };
}

/**
 * Generates minimal test data (basic info only)
 */
export function generateBasicEmployeeData(): Pick<EmployeeTestData, "firstName" | "middleName" | "lastName" | "username" | "status" | "password" | "toastMessage"> {
    const firstName = faker.person.firstName();
    const middleName = faker.person.middleName();
    const lastName = faker.person.lastName();

    return {
        firstName,
        middleName,
        lastName,
        username: faker.internet.username({ firstName, lastName }),
        status: faker.helpers.arrayElement(["Enabled", "Disabled"]),
        password: generatePassword(),
        toastMessage: "Successfully Saved"
    };
}

/**
 * For backward compatibility
 * @deprecated Use generateEmployeeTestData() instead
 */
export interface TestData {
    firstName: string;
    middleName: string;
    lastName: string;
    username: string;
    status: string;
    password: string;
    toastMessage: string;
}

export function generateTestData(): TestData {
    const data = generateBasicEmployeeData();
    return {
        ...data,
        status: data.status as string
    };
}