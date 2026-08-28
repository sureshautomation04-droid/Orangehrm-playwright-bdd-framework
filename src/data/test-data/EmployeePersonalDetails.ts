import { EmployeePersonalDetails } from "../../utils/TestDataGenerator";

/**
 * Static test data for employee personal details
 * Used for consistent test scenarios
 */
export const employeePersonalDetails: EmployeePersonalDetails = {
    otherId: "WAP403248LGF",
    drivingLicenseNumber: "DL12345678",
    licenseExpiryDate: "2030-12-31",
    nationality: "Indian",
    maritalStatus: "Single",
    dateOfBirth: "1995-05-15",
    gender: "Male",
    bloodGroup: "A+",
    testField: "Negative",
    updateToastMessage: "Successfully Updated"
};

/**
 * Alternative test data sets for different scenarios
 */
export const employeePersonalDetailsAlternate: EmployeePersonalDetails = {
    otherId: "ALT88291KPQ",
    drivingLicenseNumber: "DL87654321",
    licenseExpiryDate: "2028-06-15",
    nationality: "American",
    maritalStatus: "Married",
    dateOfBirth: "1988-11-22",
    gender: "Female",
    bloodGroup: "O+",
    testField: "Positive",
    updateToastMessage: "Successfully Updated"
};

/**
 * Generates dynamic personal details for data-driven tests
 */
export function generateDynamicPersonalDetails(): EmployeePersonalDetails {
    const { generateEmployeePersonalDetails } = require("../../utils/TestDataGenerator");
    return generateEmployeePersonalDetails();
}