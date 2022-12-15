#!/usr/bin/node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.loadUser = exports.createUser = void 0;
const express_1 = __importDefault(require("express"));
const logger_1 = require("./logger");
const errors_1 = require("./errors");
const fs_extra_1 = __importDefault(require("fs-extra"));
const mustache_1 = __importDefault(require("mustache"));
function createUser(e) {
    e.preventDefault;
    const Anv = document.querySelector("#Anv");
    const Lös = document.querySelector("#Lös");
    if ((Anv === null || Anv === void 0 ? void 0 : Anv.value) == null || (Anv === null || Anv === void 0 ? void 0 : Anv.value) == "")
        return;
    if ((Lös === null || Lös === void 0 ? void 0 : Lös.value) == null || (Lös === null || Lös === void 0 ? void 0 : Lös.value) == "")
        return;
    var user = {
        username: Anv,
        password: Lös,
        id: uuidv4
    };
    const json = JSON.parse(user);
    localStorage.setItem("user", json);
}
exports.createUser = createUser;
function loadUser(x) {
    const json = JSON.parse(x);
    localStorage.getItem(json);
}
exports.loadUser = loadUser;
async function main() {
    const app = (0, express_1.default)();
    app.use(logger_1.logger);
    app.use(express_1.default.urlencoded({ extended: true }));
    app.get("/world", function (req, res) {
        res.send("Hello World!");
    });
    function sendMsg(req, res) {
        const data = {
            asd: req.params.msg_path
                ? req.params.msg_path
                : req.query.msg
                    ? req.query.msg
                    : "No msg",
        };
        fs_extra_1.default.readFile("template/msg.html", "utf-8").then((template) => {
            let result = mustache_1.default.render(template, data);
            res.send(result);
        });
    }
    app.get("/msg/:msg_path", sendMsg);
    app.get("/msg", sendMsg);
    app.get("/error", function (req, res) {
        throw "Test throwing Error";
    });
    app.use("/", express_1.default.static("public"));
    app.use(errors_1.notFound);
    app.use(errors_1.serverError);
    const port = 8080;
    app.listen(port, () => {
        console.log("You can find this server on: http://localhost:" + port);
    });
}
exports.main = main;
