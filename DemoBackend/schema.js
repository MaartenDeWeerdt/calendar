export default `
    type Task {
        _id: String!
        text: String
        dayOfMonth: String
        month: String
        year: String
        hours: String
        minutes: String
    }
    type Query {
        allTasks: [Task!]!,
        tasksForDay(dayOfMonth: String, month: String, year: String, hours: String, minutes: String): [Task!]
    }
    type Mutation {
        createTask(text: String!, dayOfMonth: String!, month: String!, year: String!, hours: String!, minutes: String!): [Task!]
    }
`;