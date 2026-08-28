import { faker } from "@faker-js/faker";

export interface TestData {
    firstName: string;
    middleName: string;
    lastName: string;
    username: string;
    status: string;
    password: string;
    toastMessage: string;
}

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

    const special = faker.helpers.arrayElement([
        "@", "#", "$", "%", "&", "*", "!"
    ]);

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

export function generateTestData(): TestData {

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
        status: faker.helpers.arrayElement(["1", "2"]),
        password: generatePassword(),
        toastMessage: "Successfully Saved"
    };
}

