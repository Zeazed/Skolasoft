"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const express = require('express');
const app = express();
function serverError(err, req, res, next) {
    fs_extra_1.default.readFile("public/500.html", "utf-8").then((data) => {
        res.status(500).send(data);
        console.error(err.toString());
    });
}
exports.serverError = serverError;
