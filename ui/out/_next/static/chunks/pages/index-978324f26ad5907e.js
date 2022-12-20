(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[405],{

/***/ 9208:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/",
      function () {
        return __webpack_require__(5128);
      }
    ]);
    if(false) {}
  

/***/ }),

/***/ 7801:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "$_": function() { return /* reexport */ Footer; },
  "h4": function() { return /* reexport */ Header; },
  "gq": function() { return /* reexport */ Upload; }
});

// UNUSED EXPORTS: Notification, Status

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
;// CONCATENATED MODULE: ./components/Footer.tsx


const Footer = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("footer", {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                href: "https://github.com/JoE11-y/mina-doc-registry",
                target: "_blank",
                rel: "noreferrer",
                children: "Mina Document Registry"
            }),
            " ",
            "- NextJS & Mina Protocol ZKApp"
        ]
    });
};

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Spinner.js
var Spinner = __webpack_require__(6968);
// EXTERNAL MODULE: ./lib/context/minaWeb3.tsx
var minaWeb3 = __webpack_require__(2531);
// EXTERNAL MODULE: ./node_modules/snarkyjs/dist/web/index.js
var web = __webpack_require__(6400);
;// CONCATENATED MODULE: ./pages/zkappWorkerClient.ts

class ZkappWorkerClient {
    // ---------------------------------------------------------------------------------------
    loadSnarkyJS() {
        return this._call("loadSnarkyJS", {});
    }
    setActiveInstanceToBerkeley() {
        return this._call("setActiveInstanceToBerkeley", {});
    }
    loadContract() {
        return this._call("loadContract", {});
    }
    compileContract() {
        return this._call("compileContract", {});
    }
    fetchAccount(param) {
        let { publicKey  } = param;
        const result = this._call("fetchAccount", {
            publicKey58: publicKey.toBase58()
        });
        return result;
    }
    initZkappInstance(publicKey) {
        return this._call("initZkappInstance", {
            publicKey58: publicKey.toBase58()
        });
    }
    async getNumOfDocs() {
        const result = await this._call("getNumOfDocs", {});
        if (result) {
            return web/* Field.fromJSON */.gN.fromJSON(JSON.parse(result));
        } else {
            return (0,web/* Field */.gN)(0);
        }
    }
    async getRegistryHash() {
        const result = await this._call("getRegistryHash", {});
        console.log(result);
        if (result) {
            return web/* Field.fromJSON */.gN.fromJSON(JSON.parse(result));
        } else {
            return (0,web/* Field */.gN)(0);
        }
    }
    createUploadTxn(docHash, path) {
        return this._call("createUploadTransaction", {
            docHash,
            path
        });
    }
    proveUploadTxn() {
        return this._call("proveUploadTransaction", {});
    }
    async getUploadTxnJSON() {
        const result = await this._call("getUploadTransactionJSON", {});
        return result;
    }
    createVerifyTxn(docHash, path) {
        return this._call("createVerifyTransaction", {
            docHash,
            path
        });
    }
    proveVerifyTxn() {
        return this._call("proveVerifyTransaction", {});
    }
    async getVerifyTxnJSON() {
        const result = await this._call("getVerifyTransactionJSON", {});
        return result;
    }
    _call(fn, args) {
        return new Promise((resolve, reject)=>{
            this.promises[this.nextId] = {
                resolve,
                reject
            };
            const message = {
                id: this.nextId,
                fn,
                args
            };
            this.worker.postMessage(message);
            this.nextId++;
        });
    }
    constructor(){
        this.worker = new Worker(__webpack_require__.tu(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u(812), __webpack_require__.b)));
        this.promises = {};
        this.nextId = 0;
        this.worker.onmessage = (event)=>{
            this.promises[event.data.id].resolve(event.data.data);
            delete this.promises[event.data.id];
        };
    }
}


;// CONCATENATED MODULE: ./components/Status.tsx






const Status = ()=>{
    const { state , setAccountStatus , setState  } = (0,minaWeb3/* useMinaWeb3Context */.Q)();
    const [loading, setLoading] = (0,react.useState)(false);
    const auroLink = "https://www.aurowallet.com/";
    const auroLinkElem = /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
        href: auroLink,
        target: "_blank",
        rel: "noreferrer",
        children: " [Link] "
    });
    // const faucetLink = "https://faucet.minaprotocol.com/?address=" + state.publicKey!.toBase58();
    const faucetLink = "https://faucet.minaprotocol.com/?address=";
    // -------------------------------------------------------
    // Do Setup
    (0,react.useEffect)(()=>{
        (async ()=>{
            if (!state.hasBeenSetup) {
                setLoading(true);
                const zkappWorkerClient = new ZkappWorkerClient();
                console.log("Loading SnarkyJS...");
                await zkappWorkerClient.loadSnarkyJS();
                console.log("done");
                await zkappWorkerClient.setActiveInstanceToBerkeley();
                const mina = window.mina;
                if (mina == null) {
                    setState({
                        ...state,
                        hasWallet: false
                    });
                    return;
                }
                const publicKeyBase58 = (await mina.requestAccounts())[0];
                const publicKey = web/* PublicKey.fromBase58 */.nh.fromBase58(publicKeyBase58);
                console.log("using key", publicKey.toBase58());
                console.log("checking if account exists...");
                const res = await zkappWorkerClient.fetchAccount({
                    publicKey: publicKey
                });
                const accountExists = res.error == null;
                await zkappWorkerClient.loadContract();
                console.log("compiling zkApp");
                await zkappWorkerClient.compileContract();
                console.log("zkApp compiled");
                const zkappPublicKey = web/* PublicKey.fromBase58 */.nh.fromBase58("B62qiVYJgMHVjqEMVjBdFr8XHCQ358MWpUHqQ6gbWPbE9Ef9jQYDMu1");
                const res2 = await zkappWorkerClient.fetchAccount({
                    publicKey: zkappPublicKey
                });
                const zkAppExists = res2.error == null;
                let noOfDocs = null;
                let registryHash = null;
                if (zkAppExists) {
                    await zkappWorkerClient.initZkappInstance(zkappPublicKey);
                    console.log("getting zkApp state...");
                    await zkappWorkerClient.fetchAccount({
                        publicKey: zkappPublicKey
                    });
                    noOfDocs = await zkappWorkerClient.getNumOfDocs();
                    registryHash = await zkappWorkerClient.getRegistryHash();
                    console.log("current states:", noOfDocs.toString(), registryHash.toString());
                }
                setState({
                    zkappWorkerClient,
                    hasWallet: true,
                    hasBeenSetup: true,
                    publicKey,
                    zkappPublicKey,
                    accountExists,
                    noOfDocs,
                    registryHash
                });
                setLoading(false);
            }
        })();
    }, [
        setState,
        state
    ]);
    // -------------------------------------------------------
    // Wait for account to exist, if it didn't
    (0,react.useEffect)(()=>{
        (async ()=>{
            if (state.hasBeenSetup && !state.accountExists) {
                setLoading(true);
                for(;;){
                    console.log("checking if account exists...");
                    const res = await state.zkappWorkerClient.fetchAccount({
                        publicKey: state.publicKey
                    });
                    const accountExists = res.error == null;
                    if (accountExists) {
                        break;
                    }
                    await new Promise((resolve)=>setTimeout(resolve, 5000));
                }
                setAccountStatus({
                    accountExists: true
                });
                setLoading(false);
            }
        })();
    }, [
        state.hasBeenSetup
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            "Status:",
            loading ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                children: [
                    " Loading ZKApp ",
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(Spinner/* default */.Z, {
                        animation: "border",
                        as: "span",
                        size: "sm",
                        role: "status",
                        "aria-hidden": "true",
                        className: "opacity-25"
                    }),
                    " "
                ]
            }) : state.hasWallet != null && !state.hasWallet ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                children: [
                    " Could not find a wallet. Install Auro wallet here: ",
                    auroLinkElem
                ]
            }) : state.hasBeenSetup && !state.accountExists ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                children: [
                    "Account does not exist. Please visit the faucet to fund this account",
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                        href: faucetLink,
                        target: "_blank",
                        rel: "noreferrer",
                        children: " [Link] "
                    })
                ]
            }) : "Active"
        ]
    });
};

;// CONCATENATED MODULE: ./components/Header.tsx




const Header = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("header", {
                id: "menu",
                className: "heading",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)((link_default()), {
                        href: "/",
                        id: "linkHome",
                        children: "Home"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)((link_default()), {
                        href: "/submit-document",
                        id: "linkSubmitDocument",
                        children: "Submit Document"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)((link_default()), {
                        href: "/verify-document",
                        id: "linkVerifyDocument",
                        children: "Verify Document"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(Status, {})
        ]
    });
};

// EXTERNAL MODULE: ./node_modules/react-toastify/dist/react-toastify.esm.mjs + 1 modules
var react_toastify_esm = __webpack_require__(2920);
// EXTERNAL MODULE: ./node_modules/react-toastify/dist/ReactToastify.css
var ReactToastify = __webpack_require__(7134);
;// CONCATENATED MODULE: ./components/Notifications.tsx




const Notification = ()=>/*#__PURE__*/ _jsx(ToastContainer, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        newestOnTop: true,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: false,
        pauseOnHover: true
    });

// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Form.js + 18 modules
var Form = __webpack_require__(5447);
// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Button.js + 1 modules
var Button = __webpack_require__(3680);
// EXTERNAL MODULE: ./node_modules/js-sha3/src/sha3.js
var sha3 = __webpack_require__(1094);
;// CONCATENATED MODULE: ./components/Upload.tsx





const Upload = (param)=>{
    let { id  } = param;
    const { state  } = (0,minaWeb3/* useMinaWeb3Context */.Q)();
    const [hash, setHash] = (0,react.useState)("");
    const [name, setName] = (0,react.useState)("");
    const dateAdded = Date.now().toString();
    const [loading, setLoading] = (0,react.useState)(false);
    function handleOnChange(file) {
        setName(file.name);
        var reader = new FileReader();
        reader.onload = function() {
            //@ts-ignore
            let documentHash = (0,sha3.sha3_256)(reader.result);
            setHash(documentHash);
        };
        reader.readAsBinaryString(file);
    }
    // const addDocument = async (doc: registry.Doc) => {
    // 	try {
    // 		setLoading(true);
    // 		const fee: string = await registry.uploadFee();
    // 		await registry.addDoc({ doc, fee }).then((resp: any) => {
    // 			toast.success(<NotificationSuccess text={`Document ${hash.toString().slice(0, 10)} added successfully.`} />);
    // 			registry.getNoOfDocs();
    // 		});
    // 	} catch (error) {
    // 		console.log({ error });
    // 		toast.warn(<NotificationError text="Failed to add Document to registry." />);
    // 	} finally {
    // 		setLoading(false);
    // 	}
    // };
    // const verifyDocument = async (doc: registry.Doc) => {
    // 	try {
    // 		setLoading(true);
    // 		const fee: string = await registry.verificationFee();
    // 		const adminStatus: boolean = await registry.checkAdminStatus(account.accountId);
    // 		const userStatus: boolean = await registry.checkUserStatus(hash, account.accountId);
    // 		if (adminStatus || userStatus) {
    // 			const publishDate = await registry.showDoc({ doc, accountId: account.accountId });
    // 			if (publishDate > 0) {
    // 				let displayDate = new Date(publishDate / 1000000).toLocaleString();
    // 				toast.success(<NotificationSuccess text={`Document ${hash.toString().slice(0, 20)}... is <b>valid<b>, date published: ${displayDate}`} />);
    // 			} else {
    // 				toast.warn(<NotificationError text={`Document ${hash.toString().slice(0, 20)}... is <b>invalid</b>: not found in the registry.`} />);
    // 			}
    // 		} else {
    // 			await registry.verify({ doc, fee })
    // 		}
    // 	} catch (error) {
    // 		console.log({ error });
    // 		toast.warn(<NotificationError text={`You have to pay verification fee to verify doc`} />);
    // 	} finally {
    // 		setLoading(false);
    // 	}
    // };
    function onSubmit(e) {
        e.preventDefault();
        if (!hash) {
            return;
        }
        console.log(hash);
    // if (id === "documentToVerify") {
    // 	verifyDocument({ name, hash, dateAdded })
    // } else if (id === "documentForUpload") {
    // 	addDocument({ name, hash, dateAdded })
    // } else {
    // 	console.log("invalid ID")
    // }
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(Form/* default */.Z, {
        onSubmit: onSubmit,
        className: "mt-4",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(Form/* default.Group */.Z.Group, {
                className: "my-2",
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(Form/* default.Control */.Z.Control, {
                    id: id,
                    type: "file",
                    onChange: (e)=>handleOnChange(e.target.files[0])
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(Button/* default */.Z, {
                type: "submit",
                variant: "success",
                id: "".concat(id, "Button"),
                children: loading ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                            children: [
                                " ",
                                id === "documentForUpload" ? "Uploading" : "Verifying",
                                " "
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(Spinner/* default */.Z, {
                            animation: "border",
                            as: "span",
                            size: "sm",
                            role: "status",
                            "aria-hidden": "true",
                            className: "opacity-25"
                        })
                    ]
                }) : id === "documentForUpload" ? "Upload" : "Check Document"
            })
        ]
    });
};

;// CONCATENATED MODULE: ./components/index.tsx







/***/ }),

/***/ 5128:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(682);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7801);
/* harmony import */ var _lib_context_minaWeb3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2531);





function Index() {
    var _state_noOfDocs;
    const { state  } = (0,_lib_context_minaWeb3__WEBPACK_IMPORTED_MODULE_3__/* .useMinaWeb3Context */ .Q)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components__WEBPACK_IMPORTED_MODULE_2__/* .Header */ .h4, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                    id: "viewHome",
                    className: "my-5",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
                            children: "Document Registry"
                        }),
                        "Welcome to the Document Registry DApp. This decentralized app runs on the Mina Protocol network and holds a registry of documents in an on chain hash.",
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                    children: "The registry keeps the hashes of the documents along with their publish date."
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("b", {
                                            className: "fw-bold",
                                            children: "Contract owner"
                                        }),
                                        " can submit new documents to be stored on the blockchain."
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("b", {
                                            className: "fw-bold",
                                            children: "Users"
                                        }),
                                        " can verify the existence of certain document in the registry."
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                    children: [
                                        "Contract ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("b", {
                                            className: "fw-bold",
                                            children: "address"
                                        }),
                                        " (on Berkeley testnet):",
                                        " ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                            href: state.zkappPublicKey != null ? "https://berkeley.minaexplorer.com/wallet/".concat(state.zkappPublicKey.toBase58()) : "https://berkeley.minaexplorer.com/wallet/",
                                            id: "contractLink",
                                            target: "_blank",
                                            rel: "noreferrer",
                                            children: [
                                                " ",
                                                state.zkappPublicKey != null ? state.zkappPublicKey.toBase58() : "Loading..."
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                    children: [
                                        "Number of ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("b", {
                                            className: "fw-bold",
                                            children: "Documents"
                                        }),
                                        " in registry:",
                                        " ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("b", {
                                            className: "fw-bold",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                                id: "docsInRegistry",
                                                href: "#docsInRegistry",
                                                children: (_state_noOfDocs = state.noOfDocs) === null || _state_noOfDocs === void 0 ? void 0 : _state_noOfDocs.toString()
                                            })
                                        }),
                                        " ",
                                        "Documents"
                                    ]
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components__WEBPACK_IMPORTED_MODULE_2__/* .Footer */ .$_, {})
        ]
    });
}
/* harmony default export */ __webpack_exports__["default"] = (Index);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [829,337,774,888,179], function() { return __webpack_exec__(9208); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);