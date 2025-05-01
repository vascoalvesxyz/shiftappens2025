(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/MainCanvas.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ThreeScene)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/OrbitControls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Edges$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Edges.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ThreeScene() {
    _s();
    const test = ()=>{
        console.log('Red cube clicked');
    };
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
        camera: {
            position: [
                10,
                10,
                10
            ],
            fov: 60
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.5
            }, void 0, false, {
                fileName: "[project]/src/components/MainCanvas.tsx",
                lineNumber: 15,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("gridHelper", {
                args: [
                    10,
                    5
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/MainCanvas.tsx",
                lineNumber: 16,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrbitControls"], {}, void 0, false, {
                fileName: "[project]/src/components/MainCanvas.tsx",
                lineNumber: 18,
                columnNumber: 13
            }, this),
            [
                {
                    id: 1,
                    position: [
                        4,
                        0.5,
                        -2
                    ]
                },
                {
                    id: 2,
                    position: [
                        4,
                        0.5,
                        0
                    ]
                },
                {
                    id: 3,
                    position: [
                        4,
                        0.5,
                        -4
                    ]
                },
                {
                    id: 4,
                    position: [
                        4,
                        0.5,
                        2
                    ]
                },
                {
                    id: 5,
                    position: [
                        4,
                        0.5,
                        4
                    ]
                },
                {
                    id: 11,
                    position: [
                        2,
                        0.5,
                        4
                    ]
                },
                {
                    id: 12,
                    position: [
                        2,
                        0.5,
                        2
                    ]
                },
                {
                    id: 13,
                    position: [
                        0,
                        0.5,
                        4
                    ]
                },
                {
                    id: 15,
                    position: [
                        0,
                        0.5,
                        -2
                    ]
                },
                {
                    id: 14,
                    position: [
                        0,
                        0.5,
                        0
                    ]
                },
                {
                    id: 16,
                    position: [
                        0,
                        0.5,
                        -4
                    ]
                },
                {
                    id: 17,
                    position: [
                        0,
                        0.5,
                        2
                    ]
                },
                {
                    id: 18,
                    position: [
                        2,
                        0.5,
                        0
                    ]
                },
                {
                    id: 19,
                    position: [
                        2,
                        0.5,
                        -2
                    ]
                },
                {
                    id: 20,
                    position: [
                        2,
                        0.5,
                        -4
                    ]
                },
                {
                    id: 21,
                    position: [
                        -2,
                        0.5,
                        -4
                    ]
                },
                {
                    id: 22,
                    position: [
                        -2,
                        0.5,
                        -2
                    ]
                },
                {
                    id: 23,
                    position: [
                        -2,
                        0.5,
                        0
                    ]
                },
                {
                    id: 24,
                    position: [
                        -2,
                        0.5,
                        2
                    ]
                },
                {
                    id: 25,
                    position: [
                        -2,
                        0.5,
                        4
                    ]
                }
            ].map(({ id, position, color })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: position,
                    onClick: ()=>setSelectedId(id),
                    onPointerOver: ()=>document.body.style.cursor = 'pointer',
                    onPointerOut: ()=>document.body.style.cursor = 'default',
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                1,
                                1,
                                1
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/MainCanvas.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: selectedId === id ? 'green' : 'black'
                        }, void 0, false, {
                            fileName: "[project]/src/components/MainCanvas.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Edges$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edges"], {
                            scale: 1.05,
                            color: "white"
                        }, void 0, false, {
                            fileName: "[project]/src/components/MainCanvas.tsx",
                            lineNumber: 51,
                            columnNumber: 25
                        }, this)
                    ]
                }, id, true, {
                    fileName: "[project]/src/components/MainCanvas.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/MainCanvas.tsx",
        lineNumber: 14,
        columnNumber: 9
    }, this);
}
_s(ThreeScene, "6tRyBKpA6Tf8zEXxvntvrffDmeA=");
_c = ThreeScene;
var _c;
__turbopack_context__.k.register(_c, "ThreeScene");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_components_MainCanvas_tsx_50e0a4e0._.js.map