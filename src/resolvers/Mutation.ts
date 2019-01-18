const Mutation = {
    createDraft(parent, args, context, info) {
        return context.db.mutation.createPost(
            {
                data: {
                    title: args.title,
                    author: {
                        connect: { id: args.userId }
                    }
                }
            },
            info
        )
    },
    publish(parent, args, context, info) {
        return context.db.mutation.updatePost(
            {
                data: {
                    where: { id: args.postId },
                    data: { published: true },
                }
            },
            info
        )
    },
    async  saveUser(parent, args, { models }, info) {
        const User = models.User;
        let user = await User.findById(args.userId);
        user.firstName=args.firstName;
        await user.save()
        console.log(user);
        return user;
    }
}
export default Mutation;