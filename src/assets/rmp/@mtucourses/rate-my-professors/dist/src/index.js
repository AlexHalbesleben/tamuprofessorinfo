"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
const queries_1 = require("./queries");
const constants_1 = require("./constants");
const client = new graphql_request_1.GraphQLClient('https://www.ratemyprofessors.com/graphql', {
    headers: {
        authorization: `Basic ${constants_1.AUTH_TOKEN}`,
    },
    fetch: isomorphic_fetch_1.default
});
const searchSchool = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield client.request(queries_1.autocompleteSchoolQuery, { query });
    return response.autocomplete.schools.edges.map((edge) => edge.node);
});
const searchTeacher = (name, schoolID) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield client.request(queries_1.searchTeacherQuery, {
        text: name,
        schoolID
    });
    if (response.newSearch.teachers === null) {
        return [];
    }
    return response.newSearch.teachers.edges.map((edge) => edge.node);
});
const getTeacher = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield client.request(queries_1.getTeacherQuery, { id });
    return response.node;
});
exports.default = { searchSchool, searchTeacher, getTeacher };
//# sourceMappingURL=index.js.map