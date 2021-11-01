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
exports.UsersQueueController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const users_queue_service_1 = require("./users-queue.service");
const create_users_queue_dto_1 = require("./dto/create-users-queue.dto");
const update_users_queue_dto_1 = require("./dto/update-users-queue.dto");
let UsersQueueController = class UsersQueueController {
    constructor(usersQueueService, client) {
        this.usersQueueService = usersQueueService;
        this.client = client;
    }
    create(createUsersQueueDto) {
        return this.usersQueueService.create(createUsersQueueDto);
    }
    findAll() {
        return this.usersQueueService.findAll();
    }
    findOne(id) {
        return this.usersQueueService.findOne(id);
    }
    update(updateUsersQueueDto) {
        return this.usersQueueService.update(updateUsersQueueDto.id, updateUsersQueueDto);
    }
    remove(id) {
        return this.usersQueueService.remove(id);
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('createUsersQueue'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_users_queue_dto_1.CreateUsersQueueDto]),
    __metadata("design:returntype", void 0)
], UsersQueueController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)('findAllUsersQueue'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersQueueController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)('findOneUsersQueue'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersQueueController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)('updateUsersQueue'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_users_queue_dto_1.UpdateUsersQueueDto]),
    __metadata("design:returntype", void 0)
], UsersQueueController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('removeUsersQueue'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersQueueController.prototype, "remove", null);
UsersQueueController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)('USERS_SERVICE')),
    __metadata("design:paramtypes", [users_queue_service_1.UsersQueueService,
        microservices_1.ClientProxy])
], UsersQueueController);
exports.UsersQueueController = UsersQueueController;
//# sourceMappingURL=users-queue.controller.js.map