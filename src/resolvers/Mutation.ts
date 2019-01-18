import { isMobile, random, SendSms, isCode } from "../tools";
const Mutation = {

    async  saveUser(parent, args, { models }) {
        const User = models.User;
        let user = await User.findById(args.userId);
        user.firstName = args.firstName;
        await user.save();
        console.log(user);
        return user;
    },
    async  signIn(parent, args, { models }) {
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
        //send code
        const code = random(6);
        //save code 
        user.sms_code = code;
        if (user.save()) {
            // const sms = new SendSms();
            // const response = await sms.verify(args.mobile , code);
            return true
        } else {
            throw Error("موبایل صحیح نمی باشد");
        }

    },
    async  signUp(parent, args, { models }, info) {
        //validation mobile
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
    async  verify(parent, args, { models }, info) {
        //validation mobile and code
        //find mobile , code
        //create token
        //return user
    },
    // async  editProvince(parent, args, { models }, info) {
    //     //find by id
    //     //edit 
    //     //return 
    // },
    // async  newProvince(parent, args, { models }, info) {
    //      //find by name
    //     //edit 
    //     //return 
    // },
    // async  newCity(parent, args, { models }, info) {
    //      //find by name
    //     //edit 
    //     //return 
    // },
    // async  editCity(parent, args, { models }, info) {
    //      //find by id
    //     //edit 
    //     //return 
    // },
    // async  newArea(parent, args, { models }, info) {
    //      //find by name
    //     //edit 
    //     //return 
    // },
    // async  editArea(parent, args, { models }, info) {
    //      //find by id
    //     //edit 
    //     //return 
    // },
    // async  newCategory(parent, args, { models }, info) {
    //      //find by title
    //     //edit 
    //     //return 
    // },
    // async  editCategory(parent, args, { models }, info) {
    //      //find by id
    //     //edit 
    //     //return 
    // },
    // async  newProduct(parent, args, { models }, info) {
    //      //find by id
    //     //edit 
    //     //return 
    // },
    // async  editProduct(parent, args, { models }, info) {
    //      //find by id
    //     //edit 
    //     //return 
    // },
    // async  newOrder(parent, args, { models }, info) {
    //      //find by id
    //     //edit 
    //     //return 
    // },
    // async  editOrder(parent, args, { models }, info) {
    //      //find by id
    //     //edit 
    //     //return 
    // },
    // async  addPriceInProduct(parent, args, { models }, info) {
    //      //find by id
    //     //edit 
    //     //return 
    // },
    // async  editProfile(parent, args, { models }, info) {
    //      //find by id
    //     //edit 
    //     //return 
    // }
}
export default Mutation;