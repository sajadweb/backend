import { hasPermission, checkPermission } from "../tools";

// tslint:disable:typedef

const Query = {
    async me(parent, args, { request }, info) {
        hasPermission(request.user, ["ADMIN", "SHOP", "PROVIDER"]);
        return request.user;
    },
    async type_estates(parent, args, { request, models }, info) {
        hasPermission(request.user, ["ADMIN", "SHOP", "PROVIDER"]);
        const TypeEstate = models.TypeEstate;
        const type_estates = await TypeEstate.find();
        return type_estates;
    },
    async users(parent, args, { request, models }, info) {
        console.log("ddddd", request.user);
        hasPermission(request.user, ["ADMIN"]);
        const User = models.User;
        const user = await User.find().populate({
            path: "categories",
            populate: { path: "parent" }
        }).exec();
        console.log("user", user);
        return user;
    },
    async categories(parent, args, { models, request }, info) {
        hasPermission(request.user, ["ADMIN", "SHOP", "PROVIDER"]);
        const Category = models.Category;
        const category = await Category.find().populate({
            path: "parent",
            populate: { path: "parent" }
        }).exec();
        return category;
    },
    async provinces(parent, args, { models, request }, info) {
        hasPermission(request.user, ["ADMIN", "SHOP", "PROVIDER"]);
        const Province = models.Province;
        const provinces = await Province.find();
        return provinces;
    },
    async cities(parent, args, { models, request }, info) {
        hasPermission(request.user, ["ADMIN", "SHOP", "PROVIDER"]);
        const City = models.City;
        const cities = await City.find({province: args.province});
        return cities;
    },
    async areas(parent, args, { models, request }, info) {
        hasPermission(request.user, ["ADMIN", "SHOP", "PROVIDER"]);
        const Area = models.Area;
        const areas = await Area.find({city: args.city});
        return areas;
    },

    async products(parent, args, { models, request }, info) {
        hasPermission(request.user, ["ADMIN", "SHOP", "PROVIDER"]);

        const Product = models.Product;
        console.log(request.user.categories, " request.user.categories");
        const products = await Product.find({ categories: { $in: request.user.categories }, prices: { $not: { $size: 0 } } })
            .populate("categories")
            .populate({
                path: "prices",
                populate: { path: "provider" }
            })
            .exec();
        return products;
    },

    async suborders(parent, args, { models, request }, info) {
        hasPermission(request.user, ["ADMIN", "PROVIDER"]);
        const SubOrder = models.SubOrder;
        const suborders = await SubOrder.find().populate("provider").exec();
        return suborders;
    },

    async orders(parent, args, { models, request }, info) {
        hasPermission(request.user, ["ADMIN", "SHOP", "PROVIDER"]);
        const Order = models.Order;
        const SubOrder = models.SubOrder;
        const ADMIN = checkPermission(request.user, ["ADMIN"]);
        const SHOP = checkPermission(request.user, ["SHOP"]);
        const PROVIDER = checkPermission(request.user, ["PROVIDER"]);
        const $type = (ADMIN && "ADMIN") || (SHOP && "SHOP") || (PROVIDER && "PROVIDER");
        let orders = null;

        switch ($type) {
            case "ADMIN":
                {
                    orders = await Order.find()
                        .populate("shop")
                        .populate({
                            path: "details",
                            populate: { path: "provider" }
                        })
                        .exec();
                }
                break;
            case "PROVIDER":
                orders = await SubOrder.find().populate("provider").exec();
                break;
            case "SHOP":
                orders = await Order.find()
                    .populate("shop")
                    .populate({
                        path: "details",
                        populate: { path: "provider" }
                    })
                    .exec();
                break;
        }



        return orders;
    },
};
export default Query;