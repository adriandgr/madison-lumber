const { buildSchema } = require('graphql');


module.exports = buildSchema(`
type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String
    accountType: String
    isAdmin: Boolean
}

input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    accountType: String
}

type AuthData {
    userId: ID!
    firstName: String!
    accountType: String!
    isAdmin: Boolean!
    token: String!
}

type Mill {
    _id: ID!
    uuid: String!
    name: String!
    type: String
    region: String
    contact: MillContact
    catalog: MillCatalog
    qualifications: MillQualifications
    lastUpdated: String
}

input MillInput {
    name: String!
    type: String
    region: String
    contact: MillContactInput
    catalog: MillCatalogInput
    qualifications: MillQualificationsInput
    lastUpdated: String
}

type MillContact {
    address: String
    location: String
    phone: [String]
    fax: String
    website: String
    email: String
    contactPersons: [String]
}

input MillContactInput {
    address: String
    location: String
    phone: [String]
    fax: String
    website: String
    email: String
    contactPersons: [String]
}

type MillCatalog {
    products: [String]
    species: [String]
    roughSizes: [String]
    surfacedSizes: [String]
    production: String
    panelThickness: String
    services: [String]
    kilnCapacity: String
    shipping: [String]
    export: [String]
}

input MillCatalogInput {
    products: [String]
    species: [String]
    roughSizes: [String]
    surfacedSizes: [String]
    production: String
    panelThickness: String
    services: [String]
    kilnCapacity: String
    shipping: [String]
    export: [String]
}

type MillQualifications {
    gradingAgency: String
    memberOf: [String]
    employees: String
    notes: String
    certification: String
    preservatives: String
    treatingFacilities: String
    distributionYard: String
    millStatus: String
}

input MillQualificationsInput {
    gradingAgency: String
    memberOf: [String]
    employees: String
    notes: String
    certification: String
    preservatives: String
    treatingFacilities: String
    distributionYard: String
    millStatus: String
}

input ResultFilters {
    query: String
    count: Int
    offset: Int
}

type RootQuery {
    users: [User!]!
    login(email: String!, password: String!): AuthData!
    validate(token: String!): AuthData!
    mills(resultFilters: ResultFilters): [Mill!]!
}

type RootMutation {
    createUser(userInput: UserInput): User
    createMill(millInput: MillInput): Mill
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);