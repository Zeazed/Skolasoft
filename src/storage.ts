#!/usr/bin/node
import express from "express";
import { Request, Response } from "express";
import { logger } from "./logger";
import { notFound, serverError } from "./errors";
import fs from "fs-extra";
import Mustache from "mustache";

export function createUser(e) {
    e.preventDefault

    const Anv = document.querySelector<HTMLInputElement>("#Anv")
    const Lös = document.querySelector<HTMLInputElement>("#Lös")

if(Anv?.value == null || Anv?.value == "") return
if(Lös?.value == null || Lös?.value == "") return

var user = {
    username: Anv,
    password: Lös,
    id: uuidv4
   }

    const json = JSON.parse(user)
    localStorage.setItem("user", json)
}

export function loadUser(x){
    const json = JSON.parse(x)
    localStorage.getItem(json)
}

export async function main() {
    const app = express();
  
    app.use(logger);
  
    app.use(express.urlencoded({ extended: true }));
  
    app.get("/world", function (req, res) {
      res.send("Hello World!");
    });
  
    function sendMsg(req: Request, res: Response) {
      const data = {
        asd: req.params.msg_path
          ? req.params.msg_path
          : req.query.msg
          ? req.query.msg
          : "No msg",
      };
  
      fs.readFile("template/msg.html", "utf-8").then((template) => {
        let result = Mustache.render(template, data);
        res.send(result);
      });
    }
  
    app.get("/msg/:msg_path", sendMsg);
    app.get("/msg", sendMsg);
  
    app.get("/error", function (req, res) {
      throw "Test throwing Error";
    });
  
    app.use("/", express.static("public"));
  
    app.use(notFound);
  
    app.use(serverError);
  
    const port = 8080;
  
    app.listen(port, () => {
      console.log("You can find this server on: http://localhost:" + port);
    });
  }