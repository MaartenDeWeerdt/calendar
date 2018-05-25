export default {
    Query: {
        allTasks: async (parent, args, { Task }) => {
            const tasks = await Task.find();
            return tasks.map(x => {
                x._id = x._id.toString();
                return x;
            })
        },
        tasksForDay: async (parent, args, { Task }) => {
            const tasks = await Task.find({
                dayOfMonth: args.dayOfMonth,
                month: args.month,
                year: args.year,
            })
            return tasks.map(x => {
                x._id = x._id.toString();
                return x;
            })
        }
    },
    Mutation: {
        createTask: async (parent, args, { Task }) => {
            const task = await new Task(args).save();
            const tasks = await Task.find({
                dayOfMonth: args.dayOfMonth,
                month: args.month,
                year: args.year,
            })
            return tasks.map(x => {
                x._id = x._id.toString();
                return x;
            })
        }
    }
}