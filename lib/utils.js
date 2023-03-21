"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitTime = exports.getFirst = exports.getOwnerAndRepo = exports.getRepository = exports.getOptionalInput = exports.logWarning = void 0;
const core = __importStar(require("@actions/core"));
const constants_1 = require("./constants");
function logWarning(msg) {
    core.warning(`${constants_1.WarningPrefix} ${msg}`);
}
exports.logWarning = logWarning;
function getOptionalInput(name, options) {
    const value = core.getInput(name, options);
    return value.length === 0 ? undefined : value;
}
exports.getOptionalInput = getOptionalInput;
function getRepository() {
    const value = process.env['GITHUB_REPOSITORY'];
    if (value === undefined) {
        throw new Error('GITHUB_REPOSITORY is missing in PATH');
    }
    return value;
}
exports.getRepository = getRepository;
function getOwnerAndRepo(full) {
    const results = full.split('/');
    if (results.length !== 2) {
        throw new Error('Full repo is not vaild');
    }
    return results;
}
exports.getOwnerAndRepo = getOwnerAndRepo;
function getFirst(arr) {
    if (arr.length >= 1) {
        return arr[0];
    }
    else {
        return null;
    }
}
exports.getFirst = getFirst;
function waitTime(milliseconds) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            if (isNaN(milliseconds)) {
                throw new Error('milliseconds is not a number');
            }
            setTimeout(() => resolve(), milliseconds);
        });
    });
}
exports.waitTime = waitTime;
