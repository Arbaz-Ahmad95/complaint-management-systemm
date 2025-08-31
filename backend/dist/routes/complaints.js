"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const complaintContoller_1 = require("../controllers/complaintContoller");
const router = express_1.default.Router();
router.post("/", complaintContoller_1.createComplaint);
router.get("/", complaintContoller_1.getComplaints);
router.patch("/:id", complaintContoller_1.updateComplaintStatus);
router.delete("/:id", complaintContoller_1.deleteComplaint);
exports.default = router;
