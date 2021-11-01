"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUsersQueueDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_users_queue_dto_1 = require("./create-users-queue.dto");
class UpdateUsersQueueDto extends (0, mapped_types_1.PartialType)(create_users_queue_dto_1.CreateUsersQueueDto) {
}
exports.UpdateUsersQueueDto = UpdateUsersQueueDto;
//# sourceMappingURL=update-users-queue.dto.js.map