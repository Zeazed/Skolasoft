#!/usr/bin/node
import express from "express";
import { Request, Response } from "express";
import { logger } from "./logger";
import { notFound, serverError } from "./errors";
import fs, { appendFile } from "fs-extra";
import Mustache from "mustache";
import { v4 as uuidv4 } from 'uuid';
import * as functions from "./storage"
import { type } from "os";


functions.main();

const Anv = document.querySelector<HTMLInputElement>("#Anv")
const Lös = document.querySelector<HTMLInputElement>("#Lös")
const Form = document.querySelector<HTMLInputElement>("#container")


var express = require('express');
var bodyParser = require('body-parser');