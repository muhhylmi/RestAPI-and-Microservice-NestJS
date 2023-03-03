"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserV2Dto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_v2_dto_1 = require("./create-user-v2.dto");
class UpdateUserV2Dto extends (0, mapped_types_1.PartialType)(create_user_v2_dto_1.CreateUserV2Dto) {
}
exports.UpdateUserV2Dto = UpdateUserV2Dto;
//# sourceMappingURL=update-user-v2.dto.js.map