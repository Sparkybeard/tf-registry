"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const router = express_1.default.Router();
// ref: https://www.terraform.io/docs/internals/remote-service-discovery.html
router.get('/.well-known/terraform.json', (_req, res) => {
    // match with https://registry.terraform.io/.well-known/terraform.json
    res.json({
        'modules.v1': '/v1/modules/',
        'providers.v1': '/v1/providers/',
    });
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS1kaXNjb3ZlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL3NlcnZpY2UtZGlzY292ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhEQUE4QjtBQUU5QixNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLDZFQUE2RTtBQUM3RSxNQUFNLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQ3RELHNFQUFzRTtJQUN0RSxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ1AsWUFBWSxFQUFFLGNBQWM7UUFDNUIsY0FBYyxFQUFFLGdCQUFnQjtLQUNqQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILGtCQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG4vLyByZWY6IGh0dHBzOi8vd3d3LnRlcnJhZm9ybS5pby9kb2NzL2ludGVybmFscy9yZW1vdGUtc2VydmljZS1kaXNjb3ZlcnkuaHRtbFxucm91dGVyLmdldCgnLy53ZWxsLWtub3duL3RlcnJhZm9ybS5qc29uJywgKF9yZXEsIHJlcykgPT4ge1xuICAvLyBtYXRjaCB3aXRoIGh0dHBzOi8vcmVnaXN0cnkudGVycmFmb3JtLmlvLy53ZWxsLWtub3duL3RlcnJhZm9ybS5qc29uXG4gIHJlcy5qc29uKHtcbiAgICAnbW9kdWxlcy52MSc6ICcvdjEvbW9kdWxlcy8nLFxuICAgICdwcm92aWRlcnMudjEnOiAnL3YxL3Byb3ZpZGVycy8nLFxuICB9KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG5cbiJdfQ==