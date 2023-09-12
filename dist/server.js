"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const connectDB = require('./config/dbConn');
const port = process.env.PORT || 3000;
connectDB();
const app = (0, express_1.default)();
var corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use("/api/blog", blogRoutes_1.default);
mongoose_1.default.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
//# sourceMappingURL=server.js.map