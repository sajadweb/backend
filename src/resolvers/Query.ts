import { hasPermission } from "../tools";

const Query = {
    async me(parent, args, { request }, info) {
        hasPermission(request.user, ["ADMIN", "SHOP", "PROVIDER"])
        return request.user;
    },
    async users(parent, args, { models }, info) {
        const User = models.User;
        const user = await User.find().populate({
            path: "categories",
            populate: { path: 'parent' }
        }).exec();
        console.log("user", user);
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
    async provinces(parent, args, { models }, info) {
        const Province = models.Province;
        const provinces = await Province.find();
        return provinces;
    },
    async cities(parent, args, { models }, info) {
        const City = models.City;
        const cities = await City.find().populate("province").exec();
        return cities;
    },
    async areas(parent, args, { models }, info) {
        const Area = models.Area;
        const areas = await Area.find().populate({
            path: "city",
            populate: { path: 'province' }
        }).exec();
        return areas;
    },

    async products(parent, args, { models }, info) {
        const Product = models.Product;
        const products = await Product.find()
            .populate("categories")
            .populate({
                path: "prices",
                populate: { path: "provider" }
            })
            .exec();
        return products;
    },

    async suborders(parent, args, { models }, info) {
        const SubOrder = models.SubOrder;
        const suborders = await SubOrder.find().populate("provider").exec();
        return suborders;
    },

    async orders(parent, args, { models }, info) {
        const Order = models.Order;
        const orders = await Order.find()
            .populate("shop")
            .populate({
                path: "details",
                populate: { path: "provider" }
            })
            .exec();
        return orders;
    },

    // publishedPosts(parent, args, context, info) {
    //     return context.db.query.posts({ where: { published: true } }, info)
    // },
    // post(parent, args, context, info) {
    //     return context.db.query.post({ where: { id: args.postId } }, info)
    // },
    // postsByUser(parent, args, context, info) {
    //     return context.db.query.user({
    //         where: { id: args.userId }
    //     }, info).posts()
    // }
}
export default Query;