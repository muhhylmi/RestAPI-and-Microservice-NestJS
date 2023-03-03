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
exports.UsersV2Controller = void 0;
const common_1 = require("@nestjs/common");
const users_v2_service_1 = require("./users-v2.service");
const create_user_v2_dto_1 = require("./dto/create-user-v2.dto");
const update_user_v2_dto_1 = require("./dto/update-user-v2.dto");
const microservices_1 = require("@nestjs/microservices");
let UsersV2Controller = class UsersV2Controller {
    constructor(usersService, client) {
        this.usersService = usersService;
        this.client = client;
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
    getNotifications(data, context) {
        return this.usersService.receiveUserData(data, context);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_v2_dto_1.CreateUserV2Dto]),
    __metadata("design:returntype", void 0)
], UsersV2Controller.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
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
    __metadata("design:paramtypes", [String, update_user_v2_dto_1.UpdateUserV2Dto]),
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
    (0, microservices_1.MessagePattern)('user-created'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, microservices_1.RmqContext]),
    __metadata("design:returntype", void 0)
], UsersV2Controller.prototype, "getNotifications", null);
UsersV2Controller = __decorate([
    (0, common_1.Controller)('usersV2'),
    __param(1, (0, common_1.Inject)('USERS_SERVICE')),
    __metadata("design:paramtypes", [users_v2_service_1.UsersV2Service,
        microservices_1.ClientProxy])
], UsersV2Controller);
exports.UsersV2Controller = UsersV2Controller;
//# sourceMappingURL=users-v2.controller.js.map