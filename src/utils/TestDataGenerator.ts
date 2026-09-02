import { faker } from "@faker-js/faker";

// ============================================================================
// Types
// ============================================================================

/**
 * Employee personal details.
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
 * Complete employee test data.
 */
export interface EmployeeTestData {
    // Employee information
    firstName: string;
    middleName: string;
    lastName: string;

    // Login information
    username: string;
    status: "Enabled" | "Disabled";
    password: string;

    // Messages
    toastMessage: string;
    updateToastMessage: string;

    // Personal details
    personalDetails: EmployeePersonalDetails;
}

// ============================================================================
// Constants
// ============================================================================

const NATIONALITIES = [
    "Indian",
    "American",
    "British",
    "Canadian",
    "Australian",
    "German",
    "French",
    "Japanese",
    "Chinese",
    "Brazilian"
] as const;

const MARITAL_STATUSES = [
    "Single",
    "Married",
    "Other",
] as const;

const BLOOD_GROUPS = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-"
] as const;

const GENDERS = [
    "Male",
    "Female"
] as const;

const EMPLOYEE_STATUSES = [
    "Enabled",
    "Disabled"
] as const;

const SPECIAL_CHARACTERS = [
    "@",
    "#",
    "$",
    "%",
    "&",
    "*",
    "!"
] as const;

// ============================================================================
// Generators
// ============================================================================

/**
 * Generates a password containing:
 * - uppercase character
 * - lowercase character
 * - number
 * - special character
 * - additional alphanumeric characters
 */
function generatePassword(): string {

    const upper = faker.string.alpha({
        length: 1,
        casing: "upper"
    });

    const lower = faker.string.alpha({
        length: 1,
        casing: "lower"
    });

    const number = faker.string.numeric(1);

    const special = faker.helpers.arrayElement(
        SPECIAL_CHARACTERS
    );

    const remaining = faker.string.alphanumeric(4);

    return faker.helpers
        .shuffle([
            upper,
            lower,
            number,
            special,
            ...remaining
        ])
        .join("");
}

/**
 * Generates dynamic employee personal details.
 */
export function generateEmployeePersonalDetails(): EmployeePersonalDetails {

    return {
        otherId: faker.string
            .alphanumeric(12)
            .toUpperCase(),

        drivingLicenseNumber: `DL${faker.string.numeric(8)}`,

        licenseExpiryDate: faker.date
            .future({ years: 10 })
            .toISOString()
            .split("T")[0],

        nationality: faker.helpers.arrayElement(
            NATIONALITIES
        ),

        maritalStatus: faker.helpers.arrayElement(
            MARITAL_STATUSES
        ),

        dateOfBirth: faker.date
            .birthdate({
                min: 18,
                max: 60,
                mode: "age"
            })
            .toISOString()
            .split("T")[0],

        gender: faker.helpers.arrayElement(
            GENDERS
        ),

        bloodGroup: faker.helpers.arrayElement(
            BLOOD_GROUPS
        ),

        testField: faker.lorem.words(2),

        updateToastMessage: "Successfully Updated"
    };
}

/**
 * Generates complete employee test data.
 *
 * This should be the primary test-data factory
 * for employee creation scenarios.
 */
export function generateEmployeeTestData(): EmployeeTestData {

    const firstName = faker.person.firstName();
    const middleName = faker.person.middleName();
    const lastName = faker.person.lastName();

    return {
        firstName,
        middleName,
        lastName,

        username: faker.internet.username({
            firstName,
            lastName
        }),

        status: faker.helpers.arrayElement(
            EMPLOYEE_STATUSES
        ),

        password: generatePassword(),

        toastMessage: "Successfully Saved",

        updateToastMessage: "Successfully Updated",

        personalDetails: generateEmployeePersonalDetails()
    };
}

/**
 * Generates only the basic employee information.
 */
export function generateBasicEmployeeData(): Pick<
    EmployeeTestData,
    | "firstName"
    | "middleName"
    | "lastName"
    | "username"
    | "status"
    | "password"
    | "toastMessage"
> {

    const firstName = faker.person.firstName();
    const middleName = faker.person.middleName();
    const lastName = faker.person.lastName();

    return {
        firstName,
        middleName,
        lastName,

        username: faker.internet.username({
            firstName,
            lastName
        }),

        status: faker.helpers.arrayElement(
            EMPLOYEE_STATUSES
        ),

        password: generatePassword(),

        toastMessage: "Successfully Saved"
    };
}