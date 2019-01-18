const Query = {
    async users(parent, args, { models }, info) {
        const User = models.User;
        const user = await User.find().populate({
            path: "categories",
            // Get friends of friends - populate the 'friends' array for every friend
            populate: { path: 'parent' }
        }).exec();
        console.log(user);
        return user;
    },
    async categories(parent, args, { models }, info) {
        const Category = models.Category;
        const category = await Category.find().populate({
            path: "parent",
            populate: { path: 'parent' }
        }).exec();

        console.log("category", category);
        return category;
    },
    publishedPosts(parent, args, context, info) {
        return context.db.query.posts({ where: { published: true } }, info)
    },
    post(parent, args, context, info) {
        return context.db.query.post({ where: { id: args.postId } }, info)
    },
    postsByUser(parent, args, context, info) {
        return context.db.query.user({
            where: { id: args.userId }
        }, info).posts()
    }
}
export default Query;