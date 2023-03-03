"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersV2Service = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_v2_schema_1 = require("./schema/user-v2.schema");
let UsersV2Service = class UsersV2Service {
    constructor(userModel, client) {
        this.userModel = userModel;
        this.client = client;
    }
    create(createUserDto) {
        const createUser = new this.userModel(createUserDto);
        this.client.emit('test1', createUserDto);
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
    __param(1, (0, common_1.Inject)('USERS_SERVICE')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        microservices_1.ClientProxy])
], UsersV2Service);
exports.UsersV2Service = UsersV2Service;
//# sourceMappingURL=users-v2.service.js.map