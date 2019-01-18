import { prop, Typegoose, arrayProp, Ref } from 'typegoose';

class Category extends Typegoose {

    @prop()
    title: string;

    @prop({ ref: Category })
    parent?: Ref<Category>;

}

class User extends Typegoose {
    @prop()
    mobile: string;

    @prop({ default: 0 })
    role?: string;

    @prop({ default: 0 })
    status?: string;

    @prop()
    sms_code: string;

    @prop()
    permission?: [string];

    @prop()
    firstName?: string;
    @prop()
    lastName?: string;

    @arrayProp({ itemsRef: Category })
    categories?: Ref<Category>[];
}


class Province extends Typegoose {

    @prop()
    name: string;
}

class City extends Typegoose {

    @prop({ ref: Province })
    province?: Ref<Province>;

    @prop()
    name: string;
}



class Area extends Typegoose {
    @prop({ ref: City })
    city?: Ref<City>;

    @prop({ ref: Province })
    province: Ref<Province>;

    @prop()
    name: string;
}

class Price extends Typegoose {
    @prop({ ref: User })
    provider?: Ref<User>;

    @prop()
    price: string;

    // @prop({ ref: Product })
    // product: Ref<Product>;
}

class Product extends Typegoose {
    @prop()
    name: string;

    @prop()
    commission: string;

    @prop()
    publish: boolean;

    @prop()
    photo?: [string];

    @prop()
    description?: string;

    @arrayProp({ itemsRef: Category })
    categories?: Ref<Category>[];


    @arrayProp({ itemsRef: Price })
    prices?: Ref<Price>[];

}

class SubOrder extends Typegoose {

    @prop()
    items: string;

    //@prop({ ref: SubOrder })
    //Order?: Ref<SubOrder>;

    @prop({ ref: User })
    provider?: Ref<User>;
}


class Order extends Typegoose {
    @prop({ ref: User })
    shop?: Ref<User>;

    @prop()
    price_all: string;

    @prop()
    discount: string;

    @prop()
    status:Boolean ;

    @prop({ ref: SubOrder })
    details?: Ref<SubOrder>;

}

const UserModel = new User().getModelForClass(User);
const CategoryModel = new Category().getModelForClass(Category);
const AreaModel = new Area().getModelForClass(Area);
const ProvinceModel = new Province().getModelForClass(Province);
const CityModel = new City().getModelForClass(City);
const ProductModel = new Product().getModelForClass(Product);
const PriceModel = new Price().getModelForClass(Price);
const OrderModel = new Order().getModelForClass(Order);
const SubOrderModel = new SubOrder().getModelForClass(SubOrder);


export const models = {
    User: UserModel,
    Category: CategoryModel,
    City: CityModel,
    Area: AreaModel,
    Province: ProvinceModel,
    Product:ProductModel,
    Price:PriceModel,
    Order:OrderModel,
    SubOrder:SubOrderModel

}