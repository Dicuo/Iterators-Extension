(function(Scratch) {
    'use strict';
    if (!Scratch.extensions.unsandboxed) {
        throw new Error('\'Iterators\' must run unsandboxed!');
    }

    const menuIconURI = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjBweCIgeG1sbnM6Yng9Imh0dHBzOi8vYm94eS1zdmcuY29tIj4KICA8ZWxsaXBzZSBzdHlsZT0iZmlsbDogI2I1MmM1N2ZmOyBzdHJva2Utd2lkdGg6IDE7IiBjeD0iMTAiIGN5PSIxMCIgcng9IjEwIiByeT0iMTAiIHRyYW5zZm9ybT0ibWF0cml4KDAuOTk5OTk5OTk5OTk5OTk5OSwgMCwgMCwgMC45OTk5OTk5OTk5OTk5OTk5LCAtMy41NTI3MTM2Nzg4MDA1MDFlLTE1LCAtMS43NzYzNTY4Mzk0MDAyNTA1ZS0xNSkiLz4KICA8ZWxsaXBzZSBzdHlsZT0iZmlsbDogI2U0NDE1ZmZmOyBzdHJva2Utd2lkdGg6IDE7IiBjeD0iMTAiIGN5PSIxMCIgcng9IjkiIHJ5PSI5IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjk5OTk5OTk5OTk5OTk5OTksIDAsIDAsIDAuOTk5OTk5OTk5OTk5OTk5OSwgLTMuNTUyNzEzNjc4ODAwNTAxZS0xNSwgLTEuNzc2MzU2ODM5NDAwMjUwNWUtMTUpIi8+CiAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4xMTI1OTMwMDI2MTczNTkxNiwgMCwgMCwgMC4xMTI1OTMwMDI2MTczNTkxNiwgLTE2Ljk0OTkyNDcyMTU2NzY5NywgLTYuMjEzMzk0MjU3NjI1ODUwNSkiIHN0eWxlPSIiPgogICAgPHJlY3QgeD0iMTc1Ljc5NSIgeT0iMTQwIiB3aWR0aD0iMTE0IiBoZWlnaHQ9IjgiIHN0eWxlPSJmaWxsOiAjZmZmOyIvPgogICAgPGVsbGlwc2Ugc3R5bGU9ImZpbGw6IHJnYigyMjgsIDY1LCA5NSk7IHN0cm9rZTogI2ZmZjsgc3Ryb2tlLXdpZHRoOiA4OyIgY3g9IjE5MCIgY3k9IjE0NCIgcng9IjE3LjA1NCIgcnk9IjE3LjA1NCIvPgogICAgPGVsbGlwc2Ugc3R5bGU9ImZpbGw6IHJnYigyMjgsIDY1LCA5NSk7IHN0cm9rZTogI2ZmZjsgc3Ryb2tlLXdpZHRoOiA4OyIgY3g9IjI4OC43MTQiIGN5PSIxNDQiIHJ4PSIxNy4wNTQiIHJ5PSIxNy4wNTQiLz4KICAgIDxwYXRoIGQ9Ik0gMjg0LjIwNSA3OS4zMyBRIDI4Ny4zODEgNzMuNzAyIDI5MC41NTYgNzkuMzMgTCAzMDUuMzc3IDEwNS41OTUgUSAzMDguNTUzIDExMS4yMjMgMzAyLjIwMSAxMTEuMjIzIEwgMjcyLjU2IDExMS4yMjMgUSAyNjYuMjA4IDExMS4yMjMgMjY5LjM4NCAxMDUuNTk1IFoiIGJ4OnNoYXBlPSJ0cmlhbmdsZSAyNjYuMjA4IDczLjcwMiA0Mi4zNDUgMzcuNTIxIDAuNSAwLjE1IDFAYTA3MDQ1MjYiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7IHN0cm9rZTogcmdiKDI1NSwgMjU1LCAyNTUpOyBzdHJva2Utd2lkdGg6IDg7IHN0cm9rZS1saW5lY2FwOiByb3VuZDsgdHJhbnNmb3JtLWJveDogZmlsbC1ib3g7IHRyYW5zZm9ybS1vcmlnaW46IDUwJSA1MCU7IiB0cmFuc2Zvcm09Im1hdHJpeCgwLCAxLCAtMSwgMCwgLTQ4LjQ2ODAwOSwgNTAuMTMwNTA2KSIvPgogIDwvZz4KPC9zdmc+";

    // Stole this icon from sharkpool muhahaha
    const arrowURI = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNS44OTMiIGhlaWdodD0iMTUuODkzIiB2aWV3Qm94PSIwIDAgMTUuODkzIDE1Ljg5MyI+PHBhdGggZD0iTTkuMDIxIDEyLjI5NHYtMi4xMDdsLTYuODM5LS45MDVDMS4zOTggOS4xODQuODQ2IDguNDg2Ljk2MiA3LjcyN2MuMDktLjYxMi42MDMtMS4wOSAxLjIyLTEuMTY0bDYuODM5LS45MDVWMy42YzAtLjU4Ni43MzItLjg2OSAxLjE1Ni0uNDY0bDQuNTc2IDQuMzQ1YS42NDMuNjQzIDAgMCAxIDAgLjkxOGwtNC41NzYgNC4zNmMtLjQyNC40MDQtMS4xNTYuMTEtMS4xNTYtLjQ2NSIgZmlsbD0ibm9uZSIgc3Ryb2tlLW9wYWNpdHk9Ii4xNSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuNzUiLz48cGF0aCBkPSJNOS4wMjEgMTIuMjk0di0yLjEwN2wtNi44MzktLjkwNUMxLjM5OCA5LjE4NC44NDYgOC40ODYuOTYyIDcuNzI3Yy4wOS0uNjEyLjYwMy0xLjA5IDEuMjItMS4xNjRsNi44MzktLjkwNVYzLjZjMC0uNTg2LjczMi0uODY5IDEuMTU2LS40NjRsNC41NzYgNC4zNDVhLjY0My42NDMgMCAwIDEgMCAuOTE4bC00LjU3NiA0LjM2Yy0uNDI0LjQwNC0xLjE1Ni4xMS0xLjE1Ni0uNDY1IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMCAxNS44OTJWMGgxNS44OTJ2MTUuODkyeiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==";

    const {BlockType, BlockShape, Cast, vm} = Scratch

    // Using jw's Array extension
    if (!vm.jwArray || !vm.runtime.ext_jwArray) vm.extensionManager.loadExtensionIdSync('jwArray')
    const jwArray = vm.jwArray
    const Array = jwArray.Type

    function span(text) {
        let el = document.createElement('span')
        el.innerHTML = text
        el.style.display = 'hidden'
        el.style.whiteSpace = 'nowrap'
        el.style.width = '100%'
        el.style.textAlign = 'center'
        return el
    }

    class IteratorType {
        customId = "divIterator"
        consumed = 0
        done = false

        constructor(kind = "Empty", gen = function*(){}) {
            this.kind = [].concat(kind);
            this.gen = gen.apply(this);
            this.thread = {};
            console.log(gen)
        }

        getIterChain() {
            return this.kind
            .map(k => typeof k === "string" ? k
                : k.kind && k.args ? `${k.kind}(${
                    k.args.map(i => i instanceof IteratorType ? i.getIterChain() : i.toString()).join(",")
                })`
                : ""
            )
            .join("↦")
        }
        
        getIterKind() {
            const kind = this.kind[this.kind.length-1]
            return typeof kind === "string" ? kind : kind.kind ?? ''
        }

        jwArrayHandler() {
            return `Iterator`
        }

        chainIter(kind, gen) {return new IteratorType(this.kind.concat(kind), gen)}

        toString() {
            return `${this.getIterKind()} Iterator`
        }

        toReporterContent() {
            const root = document.createElement('div');
            root.style.display = 'flex';
            root.style.flexDirection = 'column';
            root.appendChild(span(`${this.getIterChain()} Iterator`));
            if(this.consumed > 0 || this.done) {
                let text = ''
                if(this.consumed > 0) text += `consumed: ${this.consumed}` + (this.done ? " " : "")
                if(this.done) text += "(done)"
                root.appendChild(span(text));
            }
            return root;
        }

        toMonitorContent() {
            const root = document.createElement('div');
            root.style.display = 'flex';
            root.style.flexDirection = 'column';
            root.appendChild(span(`${this.getIterKind()} Iterator`));
            if(this.consumed > 0 || this.done) {
                let text = ''
                if(this.consumed > 0) text += `consumed: ${this.consumed}` + (this.done ? " " : "")
                if(this.done) text += "(done)"
                root.appendChild(span(text));
            }
            return root;
        }

        static toIterator(x) {
            if(x instanceof IteratorType) return x;
            return new IteratorType();
        }

        next(thread) {
            if(thread) this.thread = thread
            const next = this.gen.next();
            if(next.value) this.consumed++;
            this.done ||= next.done;
            return next.value
        }

        [Symbol.iterator]() {
            return this
        }

        // yield undefined values and only return when an actual item is found
        *yieldNext(thread) {
            while(!this.done) {
                const item = this.next(thread)
                if(this.done) break;
                if(item !== undefined) return item
                yield
            }
        }

        *iterTo(name, yielder, thread) {
            return yield* vm.runtime.divIterables.get(name)?.fromIter?.apply(this, [yielder, thread])
        }
    }

    const divIterator = {
        Type: IteratorType,
        Block: {
            blockType: BlockType.REPORTER,
            blockShape: "divIterator-iter", // BlockShape.ARROW,
            forceOutputType: "Iterator",
            allowDropAnywhere: true,
            disableMonitor: true
        },
        // Branched: {
        //     blockType: BlockType.REPORTER,
        //     blockShape: "divIterator-iterBranched", // BlockShape.ARROW,
        //     forceOutputType: "Iterator",
        //     allowDropAnywhere: true,
        //     disableMonitor: true
        // },
        Argument: {
            shape: "divIterator-iter", // BlockShape.ARROW,
            exemptFromNormalization: true,
            check: ["Iterator"]
        },
    }

    function registerString() {
        vm.runtime.divIterables ??= new Map()
        vm.runtime.divIterables.set("string", {
            type: String,
            toIter() {
                const str = this;
                return new vm.divIterator.Type("String", function*() {
                    for(let i = 0; i < str.length; i++) yield str[i]
                })
            },
            *fromIter(yielder, thread) {
                let str = ''
                while(!this.done) {
                    const item = yield* this.yieldNext(thread)
                    if(this.done) break
                    str += Cast.toString(item)
                    yield* yielder();
                }
                return str
            }
        })
    }
    function registerjwArray() {
        vm.runtime.divIterables ??= new Map()
        vm.runtime.divIterables.set("array", {
            type: vm.jwArray.Type, 
            toIter() {
                const {array} = this;
                return new vm.divIterator.Type("Array", function*() {
                    for(let i = 0; i < array.length; i++) yield array[i]
                })
            },
            *fromIter(yielder, thread) {
                let array = []
                while(!this.done) {
                    const item = yield* this.yieldNext(thread)
                    if(this.done) break
                    array.push(item)
                    yield* yielder();
                }
                return new vm.jwArray.Type(array)
            }
        })
    }
    function registerdogeObject() {
        vm.runtime.divIterables ??= new Map()
        vm.runtime.divIterables.set("object", {
            type: vm.dogeiscutObject.Type,
            toIter() {
                const {object} = this;
                return new vm.divIterator.Type("Object", function*() {
                    const entries = Object.entries(object).map(([key, value]) => {
                        return new vm.jwArray.Type([key, vm.dogeiscutObject.Type.convertIfNeeded(value)]);
                    });
                    for(let i = 0; i < entries.length; i++) yield entries[i]
                })
            },
            *fromIter(yielder, thread) {
                const {array} = yield* this.iterTo("array", yielder, thread)
                try {
                    return new vm.dogeiscutObject.Type(Object.assign(Object.create(null),
                        Object.fromEntries(array.map(val => val.array ?? val))
                    ))
                } catch {}
                return new vm.dogeiscutObject.Type()
            }
        })
    }

    class Extension {
        constructor() {
            vm.divIterator = divIterator
            vm.runtime.registerSerializer("divIterator",
                _ => null,
                _ => new IteratorType()
            )
            vm.runtime.registerCompiledExtensionBlocks('divIterator', this.getCompileInfo());

            registerString()
            registerjwArray()
            // registerdogeObject()

            // Custom shape cause the built-in arrow... sux !!!
            Scratch.gui.getBlockly().then(ScratchBlocks => {
                ScratchBlocks.BlockSvg.registerCustomShape("divIterator-iter", {
                    emptyInputPath: `m 16 0 h 15 q 3 0 5 2 l 8 8 q 3 3 3 4 v 4 q 0 1 -3 4 l -8 8 q -2 2 -5 2 h -15 h -11 c -2 0 -3 0 -4 -1 s -1 -3 0 -4 l 9 -9 v -4 l -8 -8 c -2 -2 -2 -4 -1 -5 s 2 -1 4 -1 h 11 z`,
                    leftPath(block) {
                        const edgeWidth = block.height / 2;
                        const h = -2*Math.max(edgeWidth - 14*1.25, 0);
                        return [
                            block.inputList.some(i => i.type === ScratchBlocks.NEXT_STATEMENT) 
                            ? `h -21 c -2.5 0 -3.75 0 -5 -1.25 s -1.25 -3.75 0 -5 l 11.25 -11.25 v ${h} l -10 -10 c -2.5 -2.5 -2.5 -5 -1.25 -6.25 s 2.5 -1.25 5 -1.25 h 21` 
                            : `h ${-13.75 + h/2.} c -2.5 0 -3.75 0 -5 -1.25 s -1.25 -3.75 0 -5 l 11.25 -11.25 v ${h} l -10 -10 c -2.5 -2.5 -2.5 -5 -1.25 -6.25 s 2.5 -1.25 5 -1.25 h ${13.75 - h/2.}`
                        ];
                    },
                    rightPath(block) {
                        const edgeWidth = /*block.height/2.;*/ block.edgeShapeWidth_;
                        const h = 2*Math.max(edgeWidth - 14*1.25, 0);
                        return [`h ${h/2} q 3.75 0 6.25 2.5 l 10 10 q 3.75 3.75 3.75 5 v ${h} q 0 1.25 -3.75 5 l -10 10 q -2.5 2.5 -6.25 2.5 h ${-h/2}`];
                    },
                    outputLeftPadding(block) {
                        return block.inputList.some(i => i.type == ScratchBlocks.NEXT_STATEMENT) 
                        ? -block.height/2 + 22 : 0
                    }
                });
            });
            // Branched variant (different path and overrides width)
            // Scratch.gui.getBlockly().then(ScratchBlocks => {
            //     ScratchBlocks.BlockSvg.registerCustomShape("divIterator-iterBranched", {
            //         ... ScratchBlocks.BlockSvg.CUSTOM_SHAPES.get("custom-divIterator-iterNormal"),
            //         leftPath(block) {
            //             const edgeWidth = block.height / 2;
            //             const h = -2*Math.max(edgeWidth - 14*1.25, 0);
            //             return [`c -2.5 0 -3.75 0 -5 -1.25 s -1.25 -3.75 0 -5 l 11.25 -11.25 v ${h} l -10 -10 c -2.5 -2.5 -2.5 -5 -1.25 -6.25 s 2.5 -1.25 5 -1.25 h 13.75`];
            //         },
            //     });
            // });
        }

        getInfo = () => ({
            id: "divIterator",
            name: "Iterators",
            color1: "#e4415fff",
            color2: "#b52c57ff",
            menuIconURI,
            blocks: [
                {
                    opcode: 'iterAdvance',
                    text: 'advance [iter]',
                    disableMonitor: true,
                    blockType: BlockType.COMMAND,
                    arguments: {
                        iter: divIterator.Argument
                    }
                },
                {
                    opcode: 'iterNext',
                    text: 'next item from [iter]',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.ROUND,
                    allowDropAnywhere: true,
                    arguments: {
                        iter: divIterator.Argument
                    }
                },
                {
                    opcode: 'iterDone',
                    text: '[iter] is done?',
                    disableMonitor: true,
                    blockType: BlockType.BOOLEAN,
                    allowDropAnywhere: true,
                    arguments: {
                        iter: divIterator.Argument
                    }
                },

                {
                    blockType: BlockType.LABEL,
                    text: 'Iterables'
                },
                {
                    opcode: 'iterRange',
                    text: 'range from [start] to [end]',
                    arguments: {
                        start: {type: Scratch.ArgumentType.NUMBER, defaultValue: 1},
                        end: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10},
                    },
                    ...divIterator.Block
                },
                {
                    opcode: 'iterOver',
                    text: 'iterate over [itrbl]',
                    arguments: {
                        itrbl: {
                            type: Scratch.ArgumentType.STRING,
                            exemptFromNormalization: true
                        }
                    },
                    ...divIterator.Block
                },
                {
                    opcode: 'iterCollectToType',
                    text: '[iter] finally collect to [type]',
                    arguments: {
                        iter: divIterator.Argument,
                        type: {
                            type: Scratch.ArgumentType.STRING,
                            menu: "fromIter",
                            defaultValue: "array"
                        }
                    },
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.ROUND,
                    allowDropAnywhere: true,
                },

                {
                    blockType: BlockType.LABEL,
                    text: 'Iterator Adapters'
                },
                {
                    opcode: 'iterItem',
                    text: 'item',
                    blockType: BlockType.REPORTER,
                    hideFromPalette: true,
                    allowDropAnywhere: true,
                    canDragDuplicate: true
                },
                {
                    opcode: 'iterAdapterMap',
                    text: '[iter] then map [I] [IMG] [map]',
                    arguments: {
                        iter: divIterator.Argument,
                        I: {fillIn: 'iterItem'},
                        map: {
                            type: Scratch.ArgumentType.STRING,
                            exemptFromNormalization: true
                        },
                        IMG: { type: Scratch.ArgumentType.IMAGE, dataURI: arrowURI } // Stole from Sharkpool muhahaha
                    },
                    ...divIterator.Block
                },
                {
                    opcode: 'iterAdapterKeep',
                    text: '[iter] then keep [I] if [pred]',
                    arguments: {
                        iter: divIterator.Argument,
                        I: {fillIn: 'iterItem'},
                        pred: {type: Scratch.ArgumentType.BOOLEAN},
                    },
                    ...divIterator.Block
                },
                '---',
                {
                    opcode: 'iterAdapterEnum',
                    text: '[iter] then enumerate items',
                    arguments: {
                        iter: divIterator.Argument,
                    },
                    ...divIterator.Block
                },
                {
                    opcode: 'iterAdapterCycle',
                    text: '[iter] then cycle items',
                    arguments: {
                        iter: divIterator.Argument,
                    },
                    ...divIterator.Block
                },
                '---',
                {
                    opcode: 'iterAdapterTake',
                    text: '[iter] then take [count] items',
                    arguments: {
                        iter: divIterator.Argument,
                        count: {type: Scratch.ArgumentType.NUMBER, defaultValue: 4},
                    },
                    ...divIterator.Block
                },
                {
                    opcode: 'iterAdapterSkip',
                    text: '[iter] then skip [count] items',
                    arguments: {
                        iter: divIterator.Argument,
                        count: {type: Scratch.ArgumentType.NUMBER, defaultValue: 4},
                    },
                    ...divIterator.Block
                },
                {
                    opcode: 'iterAdapterStepBy',
                    text: '[iter] then step by [count] items',
                    arguments: {
                        iter: divIterator.Argument,
                        count: {type: Scratch.ArgumentType.NUMBER, defaultValue: 2},
                    },
                    ...divIterator.Block
                },
                '---',
                {
                    opcode: 'iterAdapterChain',
                    text: '[iter1] then chain with [iter2]',
                    arguments: {
                        iter1: divIterator.Argument,
                        iter2: divIterator.Argument,
                    },
                    ...divIterator.Block
                },
                {
                    opcode: 'iterAdapterZip',
                    text: '[iter1] then zip with [iter2]',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                    arguments: {
                        iter1: divIterator.Argument,
                        iter2: divIterator.Argument,
                    },
                    ...divIterator.Block
                },
                '---',
                {
                    opcode: 'iterAdapterFlatten',
                    text: '[iter] then flatten with depth [depth]',
                    arguments: {
                        iter: divIterator.Argument,
                        depth: {type: Scratch.ArgumentType.NUMBER, defaultValue: 1},
                    },
                    ...divIterator.Block
                },

                '---',
                {
                    opcode: 'iterAdapterInspect',
                    text: '[iter] then inspect [I]',
                    branchCount: 1,
                    arguments: {
                        iter: divIterator.Argument,
                        I: {fillIn: 'iterItem'},
                    },
                    branches: [{}],
                    ...divIterator.Block
                },

                {
                    blockType: BlockType.LABEL,
                    text: 'Iterator Terminators'
                },
                {
                    opcode: 'iterAcc',
                    text: 'acc',
                    blockType: BlockType.REPORTER,
                    hideFromPalette: true,
                    allowDropAnywhere: true,
                    canDragDuplicate: true
                },
                {
                    opcode: 'iterTermCount',
                    text: '[iter] finally count items',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        iter: divIterator.Argument,
                    },
                },
                {
                    opcode: 'iterTermFold',
                    text: '[iter] finally reduce [init] with [A] [I] [IMG] [fold]',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.ROUND,
                    allowDropAnywhere: true,
                    arguments: {
                        iter: divIterator.Argument,
                        init: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "foo",
                            exemptFromNormalization: true
                        },
                        fold: {
                            type: Scratch.ArgumentType.STRING,
                            exemptFromNormalization: true
                        },
                        A: {fillIn: 'iterAcc'},
                        I: {fillIn: 'iterItem'},
                        IMG: { type: Scratch.ArgumentType.IMAGE, dataURI: arrowURI }
                    }
                },
                {
                    opcode: 'iterTermAny',
                    text: '[iter] finally any [I] [IMG] [pred]',
                    disableMonitor: true,
                    blockType: BlockType.BOOLEAN,
                    allowDropAnywhere: true,
                    arguments: {
                        iter: divIterator.Argument,
                        pred: {type: Scratch.ArgumentType.BOOLEAN},
                        I: {fillIn: 'iterItem'},
                        IMG: { type: Scratch.ArgumentType.IMAGE, dataURI: arrowURI }
                    }
                },
                {
                    opcode: 'iterTermAll',
                    text: '[iter] finally all [I] [IMG] [pred]',
                    disableMonitor: true,
                    blockType: BlockType.BOOLEAN,
                    allowDropAnywhere: true,
                    arguments: {
                        iter: divIterator.Argument,
                        pred: {type: Scratch.ArgumentType.BOOLEAN},
                        I: {fillIn: 'iterItem'},
                        IMG: { type: Scratch.ArgumentType.IMAGE, dataURI: arrowURI }
                    }
                },
                '---',
                {
                    opcode: 'iterTermForEach',
                    text: 'for [I] of [iter]',
                    blockType: BlockType.LOOP,
                    branchCount: 1,
                    arguments: {
                        iter: divIterator.Argument,
                        I: {fillIn: 'iterItem'},
                    },
                },

                // Arrays are just part of iterables now :)
                // {
                //     blockType: BlockType.LABEL,
                //     text: 'Array iteration'
                // },
                // {
                //     opcode: 'iterArray',
                //     text: 'iterate over array [arr]',
                //     arguments: {
                //         arr: jwArray.Argument
                //     },
                //     ...divIterator.Block
                // },
                // {
                //     opcode: 'iterCollectToArray',
                //     text: '[iter] finally collect to array',
                //     arguments: {
                //         iter: divIterator.Argument
                //     },
                //     ...jwArray.Block
                // },

            ],
            menus: {
                fromIter: {
                    acceptReporters: false,
                    items: [...vm.runtime.divIterables.keys()]
                    .map(name => ({text: name, value: name}))
                }
            }
        })

        getCompileInfo = () => ({
            ir: {
                iterAdvance: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'stack',
                        iter: generator.descendInputOfBlock(block, 'iter'),
                    }
                },
                iterNext: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        iter: generator.descendInputOfBlock(block, 'iter'),
                    }
                },

                iterCollectToType: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        iter: generator.descendInputOfBlock(block, 'iter'),
                        type: block.fields.type.value
                    }
                },

                iterAdapterMap: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        iter: generator.descendInputOfBlock(block, 'iter'),
                        map: generator.descendInputOfBlock(block, 'map'),
                    }
                },
                iterAdapterKeep: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        iter: generator.descendInputOfBlock(block, 'iter'),
                        pred: generator.descendInputOfBlock(block, 'pred'),
                    }
                },
                iterAdapterInspect: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        iter: generator.descendInputOfBlock(block, 'iter'),
                        substack: generator.descendSubstack(block, 'SUBSTACK')
                    }
                },

                iterTermFold: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        iter: generator.descendInputOfBlock(block, 'iter'),
                        init: generator.descendInputOfBlock(block, 'init'),
                        fold: generator.descendInputOfBlock(block, 'fold'),
                    }
                },
                iterTermAny: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        iter: generator.descendInputOfBlock(block, 'iter'),
                        pred: generator.descendInputOfBlock(block, 'pred'),
                    }
                },
                iterTermAll: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        iter: generator.descendInputOfBlock(block, 'iter'),
                        pred: generator.descendInputOfBlock(block, 'pred'),
                    }
                },
                iterTermCount: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        iter: generator.descendInputOfBlock(block, 'iter'),
                    }
                },
                iterTermForEach: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'stack',
                        iter: generator.descendInputOfBlock(block, 'iter'),
                        substack: generator.descendSubstack(block, 'SUBSTACK')
                    }
                },

                // iterItem: (generator, block) => {
                //     generator.script.yields = false
                //     return {
                //         kind: 'input',
                //     }
                // },
            },
            js: {
                iterAdvance(node, compiler, imports) {
                    compiler.source += /*js*/`yield* vm.divIterator.Type.toIterator(${compiler.descendInput(node.iter).asUnknown()}).yieldNext(thread);\n`
                },
                iterNext(node, compiler, imports) {
                    return new imports.TypedInput(
                 /*js*/`((yield* vm.divIterator.Type.toIterator(${compiler.descendInput(node.iter).asUnknown()}).yieldNext(thread)) ?? '')`
                    , imports.TYPE_UNKNOWN)
                },

                iterCollectToType(node, compiler, imports) {
                    // Loop Yield
                    const src = compiler.source
                    compiler.source = ""; compiler.yieldLoop()
                    const yielder = compiler.source; compiler.source = src;
                    return new imports.TypedInput(
                /*js*/ `(yield* vm.divIterator.Type.toIterator(${compiler.descendInput(node.iter).asUnknown()}).iterTo('${node.type}', function*(){${yielder}}, thread))`
                    , imports.TYPE_UNKNOWN)
                },

                iterAdapterMap(node, compiler, imports) {
                    const iter = compiler.localVariables.next();
                    return new imports.TypedInput(
                 /*js*/`(yield* (function*() {\n`
                      +`    const ${iter} = vm.divIterator.Type.toIterator(${compiler.descendInput(node.iter).asUnknown()});\n`
                      +`    return ${iter}.chainIter("Map", function*() {\n`
                      +`        while(!${iter}.done) {\n`
                      +`            this.thread._divIterItem ??= [];\n`
                      +`            this.thread._divIterItem.push(yield* ${iter}.yieldNext(this.thread));\n`
                      +`            if(!${iter}.done) yield (${compiler.descendInput(node.map).asUnknown()});\n`
                      +`            this.thread._divIterItem.pop();\n`
                      +`        };\n`
                      +`    })\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },
                iterAdapterKeep(node, compiler, imports) {
                    const iter = compiler.localVariables.next();
                    // Loop Yield
                    const src = compiler.source
                    compiler.source = ""; compiler.yieldLoop()
                    const yielder = compiler.source; compiler.source = src;
                    return new imports.TypedInput(
                 /*js*/`(yield* (function*() {\n`
                      +`    const ${iter} = vm.divIterator.Type.toIterator(${compiler.descendInput(node.iter).asUnknown()});\n`
                      +`    return ${iter}.chainIter("Keep", function*() {\n`
                      +`        while(!${iter}.done) {\n`
                      +`            this.thread._divIterItem ??= [];\n`
                      +`            this.thread._divIterItem.push(yield* ${iter}.yieldNext(this.thread));\n`
                      +`            if(!${iter}.done && (${compiler.descendInput(node.pred).asBoolean()})) yield this.thread._divIterItem.pop();\n`
                      +`            ${yielder};\n`
                      +`        };\n`
                      +`    })\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },
                iterAdapterInspect: (node, compiler, imports) => {
                    const iter = compiler.localVariables.next();
                    const src = compiler.source
                    compiler.source = ""
                    compiler.descendStack(node.substack, new imports.Frame(true, "divIterator.iterAdapterInspect"))
                    compiler.yieldLoop()
                    const substack = compiler.source
                    compiler.source = src;
                    return new imports.TypedInput(
                 /*js*/`(yield* (function*() {\n`
                      +`    const ${iter} = vm.divIterator.Type.toIterator(${compiler.descendInput(node.iter).asUnknown()});\n`
                      +`    return ${iter}.chainIter("Inspect", function*() {\n`
                      +`        while(!${iter}.done) {\n`
                      +`            this.thread._divIterItem ??= [];\n`
                      +`            this.thread._divIterItem.push(yield* ${iter}.yieldNext(this.thread));\n`
                      +`            const origThread = thread;\n`
                      +`            thread = this.thread;\n`
                      +`            if(!${iter}.done) do {\n`
                      +`                ${substack};\n`
                      +`            } while(false);\n`
                      +`            thread = origThread;\n`
                      +`            yield this.thread._divIterItem.pop();\n`
                      +`        };\n`
                      +`    })\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },

                iterTermCount(node, compiler, imports) {
                    const iter = compiler.localVariables.next(),
                        count = compiler.localVariables.next();
                    // Loop Yield
                    const src = compiler.source
                    compiler.source = ""; compiler.yieldLoop()
                    const yielder = compiler.source; compiler.source = src;
                    return new imports.TypedInput(
                 /*js*/`(yield* (function*() {\n`
                      +`    const ${iter} = vm.divIterator.Type.toIterator(${compiler.descendInput(node.iter).asUnknown()});\n`
                      +`    let ${count} = 0;\n`
                      +`    while(!${iter}.done) {\n`
                      +`        yield* ${iter}.yieldNext(thread);\n`
                      +`        if(${iter}.done) break;\n`
                      +`        ${count}++;\n`
                      +`        ${yielder};\n`
                      +`    };\n`
                      +`    return ${count};\n`
                      +`})())\n`
                    , imports.TYPE_UNKNOWN)
                },
                iterTermFold(node, compiler, imports) {
                    const iter = compiler.localVariables.next(),
                        acc = compiler.localVariables.next();
                    // Loop Yield
                    const src = compiler.source
                    compiler.source = ""; compiler.yieldLoop()
                    const yielder = compiler.source; compiler.source = src;
                    return new imports.TypedInput(
                /*js*/ `(yield* (function*() {\n`
                      +`    const ${iter} = vm.divIterator.Type.toIterator(${compiler.descendInput(node.iter).asUnknown()});\n`
                      +`    let ${acc} = ${compiler.descendInput(node.init).asUnknown()};\n`
                      +`    thread._divIterItem ??= [];\n`
                      +`    thread._divIterAcc ??= [];\n`
                      +`    while(!${iter}.done) {\n`
                      +`        thread._divIterItem.push(yield* ${iter}.yieldNext(thread));\n`
                      +`        thread._divIterAcc.push(${acc});\n`
                      +`        if(!${iter}.done) ${acc} = ${compiler.descendInput(node.fold).asUnknown()};\n`
                      +`        thread._divIterItem.pop();\n`
                      +`        thread._divIterAcc.pop();\n`
                      +`        ${yielder};\n`
                      +`    };\n`
                      +`    return ${acc};\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },
                iterTermAny(node, compiler, imports) {
                    const iter = compiler.localVariables.next();
                    // Loop Yield
                    const src = compiler.source
                    compiler.source = ""; compiler.yieldLoop()
                    const yielder = compiler.source; compiler.source = src;
                    return new imports.TypedInput(
                /*js*/ `(yield* (function*() {\n`
                      +`    const ${iter} = vm.divIterator.Type.toIterator(${compiler.descendInput(node.iter).asUnknown()});\n`
                      +`    thread._divIterItem ??= [];\n`
                      +`    let any = false;`
                      +`    while(!any && !${iter}.done) {\n`
                      +`        thread._divIterItem.push(yield* ${iter}.yieldNext(thread));\n`
                      +`        if(!${iter}.done) any ||= ${compiler.descendInput(node.pred).asUnknown()};\n`
                      +`        thread._divIterItem.pop();\n`
                      +`        ${yielder};\n`
                      +`    };\n`
                      +`    return any;\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },
                // Pretty much the dual of iterTermAny lol
                iterTermAll(node, compiler, imports) {
                    const iter = compiler.localVariables.next();
                    // Loop Yield
                    const src = compiler.source
                    compiler.source = ""; compiler.yieldLoop()
                    const yielder = compiler.source; compiler.source = src;
                    return new imports.TypedInput(
                /*js*/ `(yield* (function*() {\n`
                      +`    const ${iter} = vm.divIterator.Type.toIterator(${compiler.descendInput(node.iter).asUnknown()});\n`
                      +`    thread._divIterItem ??= [];\n`
                      +`    let all = false;`
                      +`    while(all && !${iter}.done) {\n`
                      +`        thread._divIterItem.push(yield* ${iter}.yieldNext(thread));\n`
                      +`        if(!${iter}.done) all &&= ${compiler.descendInput(node.pred).asUnknown()};\n`
                      +`        thread._divIterItem.pop();\n`
                      +`        ${yielder};\n`
                      +`    };\n`
                      +`    return all;\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },
                iterTermForEach: (node, compiler, imports) => {
                    const iter = compiler.localVariables.next(),
                        item = compiler.localVariables.next();
                    const src = compiler.source
                    compiler.source = ""
                    compiler.descendStack(node.substack, new imports.Frame(true, "divIterator.iterTermForEach"))
                    compiler.yieldLoop()
                    const substack = compiler.source
                    compiler.source = src + 
                 /*js*/`const ${iter} = vm.divIterator.Type.toIterator(${compiler.descendInput(node.iter).asUnknown()});\n`
                +/*js*/`thread._divIterItem ??= [];\n`
                +/*js*/`thread._divIterItem.push(null);\n`
                +/*js*/`while(!${iter}.done) {\n`
                      +`    const ${item} = yield* ${iter}.yieldNext(thread);\n`
                      +`    if(${iter}.done) break;\n`
                      +`    thread._divIterItem[thread._divIterItem.length-1] = ${item};\n`
                      +`    ${substack}\n`
                      +`};\n`
                +/*js*/`thread._divIterItem.pop();`
                },

                //iterItem: (node, compiler, imports) => new imports.TypedInput(`(thread._divIterItem ? thread._divIterItem.at(-1) : '')`, imports.TYPE_UNKNOWN)
            }
        })


        iterAdvance() {
            return 'noop'
        }

        iterNext() {
            return 'noop'
        }

        iterDone({iter}) {
            iter = IteratorType.toIterator(iter)
            return iter.done
        }

        // Iterables
        iterOver({itrbl}) {
            if(itrbl instanceof IteratorType) return itrbl;
            //if(itrbl[divIterator.Interface.toIter]) return itrbl[divIterator.Interface.toIter]()
            return [...vm.runtime.divIterables.values()].find(({type}) => type == itrbl.constructor)?.toIter?.apply(itrbl) ?? new IteratorType()
        }

        iterCollectToType() {
            return 'noop'
        }

        // Note: set end to 1e308 for a practically infinite iterator.
        iterRange({start, end}) {
            return new IteratorType({kind: "Range", args: [start, end]}, function*() {
                if(end < start) for(let i = start; i >= end; i--) yield i;
                else for(let i = start; i <= end; i++) yield i;
            })
        }

        // Adapters
        iterAdapterMap() {
            return "noop"
        }
        iterAdapterKeep() {
            return "noop"
        }

        iterAdapterEnum({iter}) {
            iter = IteratorType.toIterator(iter)
            return iter.chainIter("Enumerate", function*() {
                for(let i = 1; !iter.done; i++) {
                    const item = yield* iter.yieldNext(this.thread)
                    if(iter.done) return
                    yield new Array([i, item])
                }
            })
        }
        iterAdapterCycle({iter}) {
            iter = IteratorType.toIterator(iter)
            return iter.chainIter("Cycle", function*() {
                let buffer = []
                while(!iter.done) {
                    const item = yield* iter.yieldNext(this.thread)
                    if(iter.done) break
                    buffer.push(item)
                    yield item
                }
                if(buffer.length === 0) return
                for(let i = 0;; i = (i+1) % buffer.length) yield buffer[i]
            })
        }

        iterAdapterTake({iter, count}) {
            iter = IteratorType.toIterator(iter)
            return iter.chainIter({kind:"Take", args: [count]}, function*() {
                for(let i = 0; i < count && !iter.done; i++) yield yield* iter.yieldNext(this.thread)
            })
        }
        iterAdapterSkip({iter, count}) {
            iter = IteratorType.toIterator(iter)
            return iter.chainIter({kind:"Skip", args: [count]}, function*() {
                for(let i = 0; i < count && !iter.done; i++) yield* iter.yieldNext(this.thread)
                for(;;) {
                    const item = yield* iter.yieldNext(this.thread)
                    if(iter.done) break
                    yield item;
                }
            })
        }
        iterAdapterStepBy({iter, count}) {
            iter = IteratorType.toIterator(iter)
            return iter.chainIter({kind:"StepBy", args: [count]}, function*() {
                for(let i = 0; !iter.done; i++) {
                    const item = yield* iter.yieldNext(this.thread)
                    if(iter.done) return
                    if(i % count == 0) yield item
                }
            })
        }

        iterAdapterChain({iter1, iter2}) {
            iter1 = IteratorType.toIterator(iter1)
            iter2 = IteratorType.toIterator(iter2)
            return iter1.chainIter({kind: "Chain", args: [iter2]}, function*() {
                for(;;) {
                    const item = yield* iter1.yieldNext(this.thread)
                    if(iter1.done) break
                    yield item;
                }
                for(;;) {
                    const item = yield* iter2.yieldNext(this.thread)
                    if(iter2.done) break
                    yield item;
                }
            })
        }
        iterAdapterZip({iter1, iter2}) {
            iter1 = IteratorType.toIterator(iter1)
            iter2 = IteratorType.toIterator(iter2)
            return iter1.chainIter({kind: "Zip", args: [iter2]}, function*() {
                for(;;) {
                    const item1 = yield* iter1.yieldNext(this.thread)
                    if(iter1.done) return
                    const item2 = yield* iter2.yieldNext(this.thread)
                    if(iter2.done) return
                    yield new Array([item1, item2])
                }
            })
        }

        iterAdapterFlatten({iter, depth}) {
            iter = IteratorType.toIterator(iter)
            depth = Math.floor(depth)
            if(depth === 0) return iter.chainIter({kind: "Flatten", args: [0]}, function*() {yield* iter})
            return iter.chainIter({kind: "Flatten", args: [depth]}, function*() {
                const flat = function*(iter, depth) {
                    if(depth === 0) yield* iter;
                    else while(!iter.done) {
                        const item = yield* iter.yieldNext(this.thread)
                        if(iter.done) return;
                        if(item instanceof IteratorType) yield* flat(item, depth-1);
                        const toIter = [...vm.runtime.divIterables.values()].find(({type}) => type == item.constructor)?.toIter
                        if(toIter) yield* flat(toIter?.apply(itrbl), depth-1)
                        else yield item
                    }
                }.bind(this)
                const flattened = flat(iter, depth);
                for(;;) {
                    const item = yield* flattened.yieldNext(this.thread)
                    if(flattened.done) break
                    yield item;
                }
            })
        }
        iterAdapterInspect() {
            return 'noop'
        }

        // Iterator Terminators
        iterTermCount() {
            return 'noop'
        }

        iterTermFold() {
            return 'noop'
        }

        iterTermAny() {
            return 'noop'
        }

        iterTermAll() {
            return 'noop'
        }

        iterItem({}, util) {
            return util.thread._divIterItem ? util.thread._divIterItem.at(-1) : ""
        }

        iterAcc({}, util) {
            return util.thread._divIterAcc ? util.thread._divIterAcc.at(-1) : ""
        }

        iterTermForEach() {
            return 'noop'
        }
        
        // Array specific blocks
        // iterArray({arr}) {
        //     const {array} = Array.toArray(arr)
        //     return new IteratorType("Array", function*() {
        //         for(let i = 0; i < array.length; i++) yield array[i]
        //     })
        // }

        // iterCollectToArray() {
        //     return 'noop'
        // }
    }
    Scratch.extensions.register(new Extension())
})(Scratch)