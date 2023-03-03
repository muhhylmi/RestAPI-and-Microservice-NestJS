"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersV2Module = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const mongoose_1 = require("@nestjs/mongoose");
const user_v2_schema_1 = require("./schema/user-v2.schema");
const users_v2_controller_1 = require("./users-v2.controller");
const users_v2_service_1 = require("./users-v2.service");
let UsersV2Module = class UsersV2Module {
};
UsersV2Module = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            mongoose_1.MongooseModule.forFeature([{ name: user_v2_schema_1.UserV2.name, schema: user_v2_schema_1.UserSchema }]),
            microservices_1.ClientsModule.register([
                {
                    name: 'USERS_SERVICE',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: ['amqp://guest:guest@localhost:5672'],
                        queue: 'main_queue',
                        queueOptions: {
                            durable: false
                        },
                    },
                },
            ]),
        ],
        controllers: [users_v2_controller_1.UsersV2Controller],
        providers: [users_v2_service_1.UsersV2Service]
    })
], UsersV2Module);
exports.UsersV2Module = UsersV2Module;
//# sourceMappingURL=users-v2.module.js.map