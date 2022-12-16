"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[382],{

/***/ 9382:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DocRegistry": function() { return /* binding */ DocRegistry; }
/* harmony export */ });
/* harmony import */ var snarkyjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6400);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

class MyMerkleWitness extends (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .MerkleWitness */ .Pj)(20) {
}
let initialHash = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0);
class DocRegistry extends snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .SmartContract */ .C3 {
    constructor() {
        super(...arguments);
        this.registryHash = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .State */ .ZM)();
        this.noOfDocs = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .State */ .ZM)();
    }
    deploy(args) {
        super.deploy(args);
        this.setPermissions({
            ...snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Permissions["default"] */ .Pl["default"](),
            editState: snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Permissions.proofOrSignature */ .Pl.proofOrSignature(),
            send: snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Permissions.proof */ .Pl.proof(),
        });
        this.registryHash.set(initialHash);
    }
    uploadDoc(docHash, path) {
        const currRoot = this.registryHash.get();
        this.registryHash.assertEquals(currRoot);
        const noOfDocs = this.noOfDocs.get();
        this.noOfDocs.assertEquals(noOfDocs);
        const doc = snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Poseidon.hash */ .jm.hash(docHash.toFields());
        // ensure that path is empty
        const emptyDocRoot = path.calculateRoot((0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0));
        currRoot.assertEquals(emptyDocRoot);
        // calculate root for document.
        const newDocRoot = path.calculateRoot(doc);
        // update root
        this.registryHash.set(newDocRoot);
        this.noOfDocs.set(noOfDocs.add(1));
    }
    verify(docHash, path) {
        const currRoot = this.registryHash.get();
        this.registryHash.assertEquals(currRoot);
        const doc = snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Poseidon.hash */ .jm.hash(docHash.toFields());
        // check the initial state matches what we expect
        const docRoot = path.calculateRoot(doc);
        return docRoot.equals(currRoot);
    }
}
__decorate([
    (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .state */ .SB)(snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN),
    __metadata("design:type", Object)
], DocRegistry.prototype, "registryHash", void 0);
__decorate([
    (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .state */ .SB)(snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN),
    __metadata("design:type", Object)
], DocRegistry.prototype, "noOfDocs", void 0);
__decorate([
    snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .method */ .UD,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .CircuitString */ ._G, MyMerkleWitness]),
    __metadata("design:returntype", void 0)
], DocRegistry.prototype, "uploadDoc", null);
__decorate([
    snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .method */ .UD,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .CircuitString */ ._G, MyMerkleWitness]),
    __metadata("design:returntype", snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Bool */ .tW)
], DocRegistry.prototype, "verify", null);
//# sourceMappingURL=DocRegistry.js.map

/***/ })

}]);