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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.UserV2 = exports.AddressSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Address = class Address {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Address.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Address.prototype, "hobbies", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Address.prototype, "_id", void 0);
Address = __decorate([
    (0, mongoose_1.Schema)()
], Address);
exports.AddressSchema = mongoose_1.SchemaFactory.createForClass(Address);
let UserV2 = class UserV2 {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserV2.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], UserV2.prototype, "age", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserV2.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.AddressSchema }),
    __metadata("design:type", Object)
], UserV2.prototype, "custom", void 0);
UserV2 = __decorate([
    (0, mongoose_1.Schema)()
], UserV2);
exports.UserV2 = UserV2;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(UserV2);
//# sourceMappingURL=user-v2.schema.js.map