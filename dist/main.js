/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./libs/common/src/index.ts":
/*!**********************************!*\
  !*** ./libs/common/src/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./rmq/rmq.module */ "./libs/common/src/rmq/rmq.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./rmq/rmq.service */ "./libs/common/src/rmq/rmq.service.ts"), exports);


/***/ }),

/***/ "./libs/common/src/rmq/rmq.module.ts":
/*!*******************************************!*\
  !*** ./libs/common/src/rmq/rmq.module.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RmqModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RmqModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rmq_service_1 = __webpack_require__(/*! ./rmq.service */ "./libs/common/src/rmq/rmq.service.ts");
let RmqModule = RmqModule_1 = class RmqModule {
    static register({ name }) {
        return {
            module: RmqModule_1,
            imports: [
                microservices_1.ClientsModule.registerAsync([
                    {
                        name,
                        useFactory: async (configService) => ({
                            transport: microservices_1.Transport.RMQ,
                            options: {
                                urls: [configService.get('RMQ_URI')],
                                queue: configService.get(`${name}_QUEUE`),
                            },
                        }),
                        inject: [config_1.ConfigService],
                    },
                ]),
            ],
            exports: [microservices_1.ClientsModule],
        };
    }
};
RmqModule = RmqModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [rmq_service_1.RmqService],
        exports: [rmq_service_1.RmqService],
    })
], RmqModule);
exports.RmqModule = RmqModule;


/***/ }),

/***/ "./libs/common/src/rmq/rmq.service.ts":
/*!********************************************!*\
  !*** ./libs/common/src/rmq/rmq.service.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RmqService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let RmqService = class RmqService {
    constructor(configService) {
        this.configService = configService;
    }
    getOptions(queue, noAck = false) {
        return {
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [this.configService.get('RMQ_URI')],
                queue: this.configService.get(`${queue}_QUEUE`),
                noAck,
                persistent: true,
            },
        };
    }
    ack(context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        channel.ack(originalMessage);
    }
};
RmqService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], RmqService);
exports.RmqService = RmqService;


/***/ }),

/***/ "./src/app.controller.ts":
/*!*******************************!*\
  !*** ./src/app.controller.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app.service.ts");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./src/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app.service.ts");
const users_module_1 = __webpack_require__(/*! ./users/users.module */ "./src/users/users.module.ts");
const users_v2_module_1 = __webpack_require__(/*! ./users-v2/users-v2.module */ "./src/users-v2/users-v2.module.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const item_module_1 = __webpack_require__(/*! ./item/item.module */ "./src/item/item.module.ts");
const Joi = __webpack_require__(/*! joi */ "joi");
const order_module_1 = __webpack_require__(/*! ./order/order.module */ "./src/order/order.module.ts");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    RMQ_URI: Joi.string().required(),
                    MONGODB_URI: Joi.string().required(),
                    PORT: Joi.number().required(),
                    USER_QUEUE: Joi.string().required()
                }),
            }),
            users_module_1.UsersModule,
            users_v2_module_1.UsersV2Module,
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('MONGODB_URI'),
                }),
                inject: [config_1.ConfigService],
            }),
            item_module_1.ItemModule,
            order_module_1.OrderModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService]
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app.service.ts":
/*!****************************!*\
  !*** ./src/app.service.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    getData(data) {
        return console.log(data);
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./src/item/item.controller.ts":
/*!*************************************!*\
  !*** ./src/item/item.controller.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const request_mapping_decorator_1 = __webpack_require__(/*! @nestjs/common/decorators/http/request-mapping.decorator */ "@nestjs/common/decorators/http/request-mapping.decorator");
const route_params_decorator_1 = __webpack_require__(/*! @nestjs/common/decorators/http/route-params.decorator */ "@nestjs/common/decorators/http/route-params.decorator");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const item_dto_1 = __webpack_require__(/*! ./item.dto */ "./src/item/item.dto.ts");
const item_service_1 = __webpack_require__(/*! ./item.service */ "./src/item/item.service.ts");
let ItemController = class ItemController {
    constructor(itemService) {
        this.itemService = itemService;
    }
    async createItem(createItemDto) {
        const result = await this.itemService.createItem(createItemDto);
        return result;
    }
    async getNotifications(data, context) {
        return await this.itemService.receiveOrderData(data, context);
    }
};
__decorate([
    (0, request_mapping_decorator_1.Post)(),
    __param(0, (0, route_params_decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof item_dto_1.CreateItemDto !== "undefined" && item_dto_1.CreateItemDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "createItem", null);
__decorate([
    (0, microservices_1.EventPattern)('order-created'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, typeof (_b = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "getNotifications", null);
ItemController = __decorate([
    (0, common_1.Controller)('items'),
    __metadata("design:paramtypes", [typeof (_c = typeof item_service_1.ItemService !== "undefined" && item_service_1.ItemService) === "function" ? _c : Object])
], ItemController);
exports.ItemController = ItemController;


/***/ }),

/***/ "./src/item/item.dto.ts":
/*!******************************!*\
  !*** ./src/item/item.dto.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateItemDto = void 0;
class CreateItemDto {
}
exports.CreateItemDto = CreateItemDto;


/***/ }),

/***/ "./src/item/item.module.ts":
/*!*********************************!*\
  !*** ./src/item/item.module.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemModule = void 0;
const common_1 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const item_controller_1 = __webpack_require__(/*! ./item.controller */ "./src/item/item.controller.ts");
const item_service_1 = __webpack_require__(/*! ./item.service */ "./src/item/item.service.ts");
const item_schema_1 = __webpack_require__(/*! ./schema/item.schema */ "./src/item/schema/item.schema.ts");
let ItemModule = class ItemModule {
};
ItemModule = __decorate([
    (0, common_2.Module)({
        imports: [
            config_1.ConfigModule,
            mongoose_1.MongooseModule.forFeature([{ name: item_schema_1.Item.name, schema: item_schema_1.itemSchema }]),
            common_1.RmqModule
        ],
        controllers: [item_controller_1.ItemController],
        providers: [item_service_1.ItemService]
    })
], ItemModule);
exports.ItemModule = ItemModule;


/***/ }),

/***/ "./src/item/item.service.ts":
/*!**********************************!*\
  !*** ./src/item/item.service.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const item_schema_1 = __webpack_require__(/*! ./schema/item.schema */ "./src/item/schema/item.schema.ts");
const common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let ItemService = class ItemService {
    constructor(itemModel) {
        this.itemModel = itemModel;
    }
    async createItem(payload) {
        const createItem = new this.itemModel(payload);
        const result = await createItem.save();
        if (!result) {
            throw new common_2.BadRequestException('failed to insert item');
        }
        return result;
    }
    async findOne(payload) {
        const item = await this.itemModel.findOne({ itemID: payload });
        if (item.errors) {
            throw new common_2.BadRequestException('item not found');
        }
        return item;
    }
    async receiveOrderData(payload, context) {
        const ctx = 'itemService-receiveOrderData';
        const { orderItems } = payload;
        for (const orderItem of orderItems) {
            const item = await this.itemModel.findOne({ itemID: orderItem.itemID });
            const updateItem = await this.itemModel.updateOne({ itemID: orderItem.itemID }, {
                $set: { qty: item.qty - orderItem.qty }
            });
            if (!updateItem) {
                common_1.Logger.error('update item failed', ctx);
            }
        }
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        const msgJson = JSON.parse(originalMsg.content);
        channel.ack(originalMsg);
        return msgJson;
    }
};
ItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(item_schema_1.Item.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], ItemService);
exports.ItemService = ItemService;


/***/ }),

/***/ "./src/item/schema/item.schema.ts":
/*!****************************************!*\
  !*** ./src/item/schema/item.schema.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.itemSchema = exports.Item = exports.AddressSchema = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
let Address = class Address {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Address.prototype, "brand", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Address.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Address.prototype, "_id", void 0);
Address = __decorate([
    (0, mongoose_1.Schema)()
], Address);
exports.AddressSchema = mongoose_1.SchemaFactory.createForClass(Address);
let Item = class Item {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Item.prototype, "itemName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: (0, uuid_1.v4)() }),
    __metadata("design:type", String)
], Item.prototype, "itemID", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Item.prototype, "itemCategory", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Item.prototype, "qty", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Item.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.AddressSchema }),
    __metadata("design:type", typeof (_a = typeof Body !== "undefined" && Body) === "function" ? _a : Object)
], Item.prototype, "detail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: new Date().toISOString() }),
    __metadata("design:type", String)
], Item.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Item.prototype, "createdBy", void 0);
Item = __decorate([
    (0, mongoose_1.Schema)()
], Item);
exports.Item = Item;
exports.itemSchema = mongoose_1.SchemaFactory.createForClass(Item);


/***/ }),

/***/ "./src/order/order.controller.ts":
/*!***************************************!*\
  !*** ./src/order/order.controller.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const request_mapping_decorator_1 = __webpack_require__(/*! @nestjs/common/decorators/http/request-mapping.decorator */ "@nestjs/common/decorators/http/request-mapping.decorator");
const route_params_decorator_1 = __webpack_require__(/*! @nestjs/common/decorators/http/route-params.decorator */ "@nestjs/common/decorators/http/route-params.decorator");
const order_dto_1 = __webpack_require__(/*! ./order.dto */ "./src/order/order.dto.ts");
const order_service_1 = __webpack_require__(/*! ./order.service */ "./src/order/order.service.ts");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async createOrder(createOrderDto) {
        const result = await this.orderService.createOrder(createOrderDto);
        return result;
    }
};
__decorate([
    (0, request_mapping_decorator_1.Post)(),
    __param(0, (0, route_params_decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof order_dto_1.CreateOrderDto !== "undefined" && order_dto_1.CreateOrderDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
OrderController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [typeof (_b = typeof order_service_1.OrderService !== "undefined" && order_service_1.OrderService) === "function" ? _b : Object])
], OrderController);
exports.OrderController = OrderController;


/***/ }),

/***/ "./src/order/order.dto.ts":
/*!********************************!*\
  !*** ./src/order/order.dto.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateOrderDto = void 0;
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;


/***/ }),

/***/ "./src/order/order.module.ts":
/*!***********************************!*\
  !*** ./src/order/order.module.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderModule = void 0;
const common_1 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const item_schema_1 = __webpack_require__(/*! src/item/schema/item.schema */ "./src/item/schema/item.schema.ts");
const order_controller_1 = __webpack_require__(/*! ./order.controller */ "./src/order/order.controller.ts");
const order_service_1 = __webpack_require__(/*! ./order.service */ "./src/order/order.service.ts");
const order_schema_1 = __webpack_require__(/*! ./schema/order.schema */ "./src/order/schema/order.schema.ts");
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    (0, common_2.Module)({
        imports: [
            config_1.ConfigModule,
            mongoose_1.MongooseModule.forFeature([{ name: order_schema_1.Order.name, schema: order_schema_1.OrderSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: item_schema_1.Item.name, schema: item_schema_1.itemSchema }]),
            common_1.RmqModule.register({ name: 'ORDER' })
        ],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService]
    })
], OrderModule);
exports.OrderModule = OrderModule;


/***/ }),

/***/ "./src/order/order.service.ts":
/*!************************************!*\
  !*** ./src/order/order.service.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const order_schema_1 = __webpack_require__(/*! ./schema/order.schema */ "./src/order/schema/order.schema.ts");
const common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const decorators_1 = __webpack_require__(/*! @nestjs/common/decorators */ "@nestjs/common/decorators");
const item_schema_1 = __webpack_require__(/*! src/item/schema/item.schema */ "./src/item/schema/item.schema.ts");
let OrderService = class OrderService {
    constructor(orderModel, itemModel, client) {
        this.orderModel = orderModel;
        this.itemModel = itemModel;
        this.client = client;
    }
    async createOrder(payload) {
        const { orderItems } = payload;
        let totalPrice = 0;
        for (const orderItem of orderItems) {
            const item = await this.itemModel.findOne({ itemID: orderItem.itemID });
            if (!item) {
                throw new common_2.BadRequestException('Item Not Found');
            }
            totalPrice += orderItem.qty * item.price;
        }
        payload.totalPrice = totalPrice;
        const createOrder = new this.orderModel(payload);
        const result = await createOrder.save();
        if (!result) {
            throw new common_2.BadRequestException('failed to insert item');
        }
        this.client.emit('order-created', result);
        return result;
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(item_schema_1.Item.name)),
    __param(2, (0, decorators_1.Inject)('ORDER')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _c : Object])
], OrderService);
exports.OrderService = OrderService;


/***/ }),

/***/ "./src/order/schema/order.schema.ts":
/*!******************************************!*\
  !*** ./src/order/schema/order.schema.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderSchema = exports.Order = exports.OrderItemsSchema = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
let OrderItems = class OrderItems {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], OrderItems.prototype, "itemID", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], OrderItems.prototype, "qty", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], OrderItems.prototype, "_id", void 0);
OrderItems = __decorate([
    (0, mongoose_1.Schema)()
], OrderItems);
exports.OrderItemsSchema = mongoose_1.SchemaFactory.createForClass(OrderItems);
let Order = class Order {
};
__decorate([
    (0, mongoose_1.Prop)({ default: (0, uuid_1.v4)() }),
    __metadata("design:type", String)
], Order.prototype, "orderID", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.OrderItemsSchema] }),
    __metadata("design:type", typeof (_a = typeof Body !== "undefined" && Body) === "function" ? _a : Object)
], Order.prototype, "orderItems", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: new Date().toISOString() }),
    __metadata("design:type", String)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Order.prototype, "createdBy", void 0);
Order = __decorate([
    (0, mongoose_1.Schema)()
], Order);
exports.Order = Order;
exports.OrderSchema = mongoose_1.SchemaFactory.createForClass(Order);


/***/ }),

/***/ "./src/users-v2/schema/user-v2.schema.ts":
/*!***********************************************!*\
  !*** ./src/users-v2/schema/user-v2.schema.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.UserV2 = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
let UserV2 = class UserV2 {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserV2.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserV2.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserV2.prototype, "userID", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserV2.prototype, "createdAt", void 0);
UserV2 = __decorate([
    (0, mongoose_1.Schema)()
], UserV2);
exports.UserV2 = UserV2;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(UserV2);


/***/ }),

/***/ "./src/users-v2/user-v2.dto.ts":
/*!*************************************!*\
  !*** ./src/users-v2/user-v2.dto.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserV2Dto = exports.CreateUserV2Dto = void 0;
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
class CreateUserV2Dto {
}
exports.CreateUserV2Dto = CreateUserV2Dto;
class UpdateUserV2Dto extends (0, mapped_types_1.PartialType)(CreateUserV2Dto) {
}
exports.UpdateUserV2Dto = UpdateUserV2Dto;


/***/ }),

/***/ "./src/users-v2/users-v2.controller.ts":
/*!*********************************************!*\
  !*** ./src/users-v2/users-v2.controller.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersV2Controller = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_v2_service_1 = __webpack_require__(/*! ./users-v2.service */ "./src/users-v2/users-v2.service.ts");
const user_v2_dto_1 = __webpack_require__(/*! ./user-v2.dto */ "./src/users-v2/user-v2.dto.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let UsersV2Controller = class UsersV2Controller {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async findAll() {
        return await this.usersService.findAll();
    }
    findOne(id, test) {
        let result = this.usersService.findOne(+id);
        if (id == "1") {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: 'This is a custom message',
            }, common_1.HttpStatus.FORBIDDEN);
        }
        return result;
    }
    update(id, updateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }
    remove(id) {
        return this.usersService.remove(+id);
    }
    async getNotifications(data, context) {
        return await this.usersService.receiveUserData(data, context);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof user_v2_dto_1.CreateUserV2Dto !== "undefined" && user_v2_dto_1.CreateUserV2Dto) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], UsersV2Controller.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UsersV2Controller.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('test')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersV2Controller.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof user_v2_dto_1.UpdateUserV2Dto !== "undefined" && user_v2_dto_1.UpdateUserV2Dto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], UsersV2Controller.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersV2Controller.prototype, "remove", null);
__decorate([
    (0, microservices_1.EventPattern)('user-created'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, typeof (_d = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], UsersV2Controller.prototype, "getNotifications", null);
UsersV2Controller = __decorate([
    (0, common_1.Controller)('usersV2'),
    __metadata("design:paramtypes", [typeof (_e = typeof users_v2_service_1.UsersV2Service !== "undefined" && users_v2_service_1.UsersV2Service) === "function" ? _e : Object])
], UsersV2Controller);
exports.UsersV2Controller = UsersV2Controller;


/***/ }),

/***/ "./src/users-v2/users-v2.module.ts":
/*!*****************************************!*\
  !*** ./src/users-v2/users-v2.module.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersV2Module = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const user_v2_schema_1 = __webpack_require__(/*! ./schema/user-v2.schema */ "./src/users-v2/schema/user-v2.schema.ts");
const users_v2_controller_1 = __webpack_require__(/*! ./users-v2.controller */ "./src/users-v2/users-v2.controller.ts");
const users_v2_service_1 = __webpack_require__(/*! ./users-v2.service */ "./src/users-v2/users-v2.service.ts");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
let UsersV2Module = class UsersV2Module {
};
UsersV2Module = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            mongoose_1.MongooseModule.forFeature([{ name: user_v2_schema_1.UserV2.name, schema: user_v2_schema_1.UserSchema }]),
            common_2.RmqModule
        ],
        controllers: [users_v2_controller_1.UsersV2Controller],
        providers: [users_v2_service_1.UsersV2Service]
    })
], UsersV2Module);
exports.UsersV2Module = UsersV2Module;


/***/ }),

/***/ "./src/users-v2/users-v2.service.ts":
/*!******************************************!*\
  !*** ./src/users-v2/users-v2.service.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersV2Service = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const user_v2_schema_1 = __webpack_require__(/*! ./schema/user-v2.schema */ "./src/users-v2/schema/user-v2.schema.ts");
let UsersV2Service = class UsersV2Service {
    constructor(userModel) {
        this.userModel = userModel;
    }
    create(createUserDto) {
        const createUser = new this.userModel(createUserDto);
        return createUser.save();
    }
    async findAll() {
        return await this.userModel.find();
    }
    async findOne(data) {
        const result = this.userModel.find({ 'name': data.name }).exec().then(res => {
            console.log(res);
        });
        return this.userModel.find({ _id: new mongoose_2.Types.ObjectId() }).exec();
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    async receiveUserData(data, context) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        const msgJson = JSON.parse(originalMsg.content);
        const createUser = new this.userModel(data).save();
        if (createUser) {
            channel.ack(originalMsg);
        }
        return msgJson;
    }
};
UsersV2Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_v2_schema_1.UserV2.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UsersV2Service);
exports.UsersV2Service = UsersV2Service;


/***/ }),

/***/ "./src/users/schema/user.schema.ts":
/*!*****************************************!*\
  !*** ./src/users/schema/user.schema.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
let User = class User {
};
__decorate([
    (0, mongoose_1.Prop)({ require: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: (0, uuid_1.v4)() }),
    __metadata("design:type", String)
], User.prototype, "userID", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: new Date().toISOString() }),
    __metadata("design:type", String)
], User.prototype, "createdAt", void 0);
User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),

/***/ "./src/users/user.dto.ts":
/*!*******************************!*\
  !*** ./src/users/user.dto.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = exports.CreateUserDto = void 0;
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
class UpdateUserDto extends (0, mapped_types_1.PartialType)(CreateUserDto) {
}
exports.UpdateUserDto = UpdateUserDto;


/***/ }),

/***/ "./src/users/users.controller.ts":
/*!***************************************!*\
  !*** ./src/users/users.controller.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./src/users/users.service.ts");
const user_dto_1 = __webpack_require__(/*! ./user.dto */ "./src/users/user.dto.ts");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        return await this.usersService.create(createUserDto);
    }
    async findAll() {
        return await this.usersService.findAll();
    }
    findOne(id, test) {
        let result = this.usersService.findOne(+id);
        if (id == "1") {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: 'This is a custom message',
            }, common_1.HttpStatus.FORBIDDEN);
        }
        return result;
    }
    update(id, updateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }
    remove(id) {
        return this.usersService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('test')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof user_dto_1.UpdateUserDto !== "undefined" && user_dto_1.UpdateUserDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [typeof (_d = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _d : Object])
], UsersController);
exports.UsersController = UsersController;


/***/ }),

/***/ "./src/users/users.module.ts":
/*!***********************************!*\
  !*** ./src/users/users.module.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./src/users/users.service.ts");
const users_controller_1 = __webpack_require__(/*! ./users.controller */ "./src/users/users.controller.ts");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const user_schema_1 = __webpack_require__(/*! ./schema/user.schema */ "./src/users/schema/user.schema.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            common_2.RmqModule.register({ name: 'USER' })
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService]
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),

/***/ "./src/users/users.service.ts":
/*!************************************!*\
  !*** ./src/users/users.service.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const user_schema_1 = __webpack_require__(/*! ./schema/user.schema */ "./src/users/schema/user.schema.ts");
let UsersService = class UsersService {
    constructor(userModel, client) {
        this.userModel = userModel;
        this.client = client;
    }
    async create(createUserDto) {
        const createUser = new this.userModel(createUserDto);
        const result = await createUser.save();
        if (!result) {
            throw new common_1.BadRequestException('Failed to Insert User');
        }
        this.client.emit('user-created', result);
        return result;
    }
    async findAll() {
        return await this.userModel.find();
    }
    async findOne(data) {
        const result = this.userModel.find({ 'name': data.name }).exec().then(res => {
            console.log(res);
        });
        return this.userModel.find({ _id: new mongoose_2.Types.ObjectId() }).exec();
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, common_1.Inject)('USER')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object])
], UsersService);
exports.UsersService = UsersService;


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/common/decorators":
/*!********************************************!*\
  !*** external "@nestjs/common/decorators" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("@nestjs/common/decorators");

/***/ }),

/***/ "@nestjs/common/decorators/http/request-mapping.decorator":
/*!***************************************************************************!*\
  !*** external "@nestjs/common/decorators/http/request-mapping.decorator" ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = require("@nestjs/common/decorators/http/request-mapping.decorator");

/***/ }),

/***/ "@nestjs/common/decorators/http/route-params.decorator":
/*!************************************************************************!*\
  !*** external "@nestjs/common/decorators/http/route-params.decorator" ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = require("@nestjs/common/decorators/http/route-params.decorator");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/mapped-types":
/*!***************************************!*\
  !*** external "@nestjs/mapped-types" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/mongoose":
/*!***********************************!*\
  !*** external "@nestjs/mongoose" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("joi");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const rmqService = app.get(common_1.RmqService);
    app.connectMicroservice(rmqService.getOptions('USER'));
    app.connectMicroservice(rmqService.getOptions('ORDER'));
    const configService = app.get(config_1.ConfigService);
    await app.startAllMicroservices();
    await app.listen(configService.get('PORT'));
}
bootstrap();

})();

/******/ })()
;