import { isMobile, random, SendSms, isCode, enCode, isString, hasPermission, checkPermission } from "../tools";
// tslint:disable:typedef
// tslint:disable
const Mutation = {

    async  saveUser(parent, args, { request, models }, info) {
        hasPermission(request.user, ["ADMIN"]);
        const User = models.User;
        let user = await User.findById(request.userId);
        user.firstName = args.firstName;
        await user.save();
        console.log(user);
        return user;
    },
    async  userSignIn(parent, args, { models }) {
        //validation mobile
        if (!isMobile(args.mobile)) {
            throw Error("موبایل صحیح نمی باشد");
        }
        //find mobile
        const User = models.User;
        let user = await User.findOne({ mobile: args.mobile });
        if (!user) {
            throw Error("موبایل صحیح نمی باشد");
        }
        // send code
        const code = random(6);
        // save code
        user.sms_code = code;
        if (user.save()) {
            // const sms = new SendSms();
            // const response = await sms.verify(args.mobile , code);
            return true;
        } else {
            throw Error("موبایل صحیح نمی باشد");
        }

    },
    async  userSignUp(parent, args, { models }, info) {
        // validation mobile
        if (!isMobile(args.mobile)) {
            throw Error("موبایل صحیح نمی باشد");
        }
        //find mobile
        const User = models.User;
        const find = await User.findOne({ mobile: args.mobile });
        if (find) {
            throw Error("موبایل  تکراری است");
        }
        //save user
        let u = new User();
        u.firstName = args.firstName;
        u.lastName = args.lastName;
        u.mobile = args.mobile;
        u.permission = ["SHOP"];
        u.status = 0;
        const code = random(6);
        //save code 
        u.sms_code = code;
        if (u.save()) {
            // const sms = new SendSms();
            // const response = await sms.verify(args.mobile , code);
            return true
        } else {
            throw Error("موبایل صحیح نمی باشد");
        }
    },
    async  userVerify(parent, args, { models }, info) {
        //validation mobile and code
        if (!isMobile(args.mobile) || !isCode(args.code)) {
            throw Error("موبایل یا کد صحیح نمی باشد");
        }
        //find mobile , code
        const User = models.User;
        let myUser = await User.findOne({ mobile: args.mobile, sms_code: args.code });
        if (!myUser) {
            throw Error("موبایل یا کد صحیح نمی باشد");
        }
        //create token
        const user = {
            id: myUser._id,
            permission: myUser.permission,
            categories: myUser.categories,
        };
        const token = enCode(user);
        return {
            data: myUser,
            token,
        }
        //return user
    },
    async  editProvince(parent, args, { request, models }, info) {
        hasPermission(request.user, ["ADMIN"]);
        //validation name
        if (!isString(args.name)) {
            throw Error("نام استان صحیح نمی باشد");
        }
        //find by id
        const Province = models.Province;
        const province = await Province.findById(args.id);
        if (!province) {
            throw Error("  استان پیدا نشد");
        }
        //save 
        province.name = args.name;
        if (province.save) {
            return province;
        }
        throw Error("مشکلی در ثبت وجود امد");
    },
    async  newProvince(parent, args, { request, models }, info) {
        hasPermission(request.user, ["ADMIN"]);
        //find by name
        if (!isString(args.name)) {
            throw Error("نام استان صحیح نمی باشد");
        }
        //new model
        const Province = models.Province;
        const find = await Province.findOne({ name: args.name });
        if (find) {
            throw Error("استان تکراری می باشد");
        }
        let province = new Province();
        // save
        province.name = args.name;
        if (province.save()) {
            return province;
        }
        throw Error("مشکلی در ثبت وجود امد");

    },
    // async  newCity(parent, args, { request, models }, info) {
    //       hasPermission(request.user, ["ADMIN"]);
    //      //find by name
    //     //edit 
    //     //return 
    // },
    // async  editCity(parent, args, { request, models }, info) {
    //       hasPermission(request.user, ["ADMIN"]);
    //      //find by id
    //     //edit 
    //     //return 
    // },
    // async  newArea(parent, args, { request, models }, info) {
    //       hasPermission(request.user, ["ADMIN"]);
    //      //find by name
    //     //edit 
    //     //return 
    // },
    // async  editArea(parent, args, { request, models }, info) {
    //       hasPermission(request.user, ["ADMIN"]);
    //      //find by id
    //     //edit 
    //     //return 
    // },
    // async  newCategory(parent, args, { request, models }, info) {
    //       hasPermission(request.user, ["ADMIN"]);
    //      //find by title
    //     //edit 
    //     //return 
    // },
    // async  editCategory(parent, args, { request, models }, info) {
    //       hasPermission(request.user, ["ADMIN"]);
    //      //find by id
    //     //edit 
    //     //return 
    // },
    // async  newProduct(parent, args, { request, models }, info) {
    //       hasPermission(request.user, ["ADMIN"]);
    //      //find by id
    //     //edit 
    //     //return 
    // },
    // async  editProduct(parent, args, { request, models }, info) {
    //       hasPermission(request.user, ["ADMIN"]);
    //      //find by id
    //     //edit 
    //     //return 
    // },
    // async  newOrder(parent, args, { request, models }, info) {
    //       hasPermission(request.user, ["ADMIN"]);
    //      //find by id
    //     //edit 
    //     //return 
    // },
    // async  editOrder(parent, args, { request, models }, info) {
    //       hasPermission(request.user, ["ADMIN"]);
    //      //find by id
    //     //edit 
    //     //return 
    // },
    async  addPriceInProduct(parent, args, { request, models }, info) {
        hasPermission(request.user, ["PROVIDER", "ADMIN"]);
        const ADMIN = checkPermission(request.user, ["ADMIN"]);
        const Product = models.Product;
        const Prices = models.Prices;
        const find = await Product.findById(args.product);
        if (find) {
            throw Error("محصول مورد نظر یافت نشد");
        }
        const PROVIDER = checkPermission(request.user, ["PROVIDER"]);
        const $type = (ADMIN && "ADMIN") || (PROVIDER && "PROVIDER")

        switch ($type) {
            case "ADMIN":
                {
                    return true;
                }
                break;
            case "PROVIDER":
                const prices = new Prices();
                prices.price = args.price;
                prices.provider = request.user.id;
                prices.save();
                break;

        }
        // find by id
        // edit 
        // return 
    },
    // tslint:disable-next-line:typedef
    async  saveProfileShop(parent, args, { request, models }, info) {
        hasPermission(request.user, ["SHOP", "PROVIDER", "ADMIN"]);
        const User = models.User;
        let user = await User.findById(request.userId);
        if (!user) {
            throw Error("کاربر گرامی اطلاعات شما یافت نشد");
        }
        if (args.postal_code) {
            user.postal_code = args.postal_code;
        }
        if (args.shaba) {
            user.shaba = args.shaba;
        }
        if (args.name) {
            user.shop_name = args.name;
        }
        if (args.mali) {
            user.mali = args.mali;
        }
        if (args.sabt) {
            user.sabt = args.sabt;
        }
        if (args.type_estate) {
            user.type_estate = args.type_estate;
        }
        if (args.category) {
            user.categories = [args.category,...user.categories];
        }
        if (args.address) {
            user.address = args.address;
        }
        if (args.province) {
            user.province= args.province;
        }
        if (args.city) {
            user.city = args.city;
        }
        if (args.area) {
            user.area = args.area;
        }

        await user.save();
        console.log(user);
        return true;
    },
};
export default Mutation;