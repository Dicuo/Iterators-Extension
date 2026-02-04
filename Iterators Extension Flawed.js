(function(Scratch) {
    'use strict';
    if (!Scratch.extensions.unsandboxed) {
        throw new Error('\'Iterators\' must run unsandboxed!');
    }
    const {BlockType, BlockShape, ArgumentType, Cast, vm} = Scratch

    // Using jw's Array extension
    if (!vm.jwArray || !vm.runtime.ext_jwArray) vm.extensionManager.loadExtensionIdSync('jwArray')
    const jwArray = vm.jwArray
    const ArrayType = jwArray.Type

    // const menuIconURI = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjBweCIgeG1sbnM6Yng9Imh0dHBzOi8vYm94eS1zdmcuY29tIj4KICA8ZWxsaXBzZSBzdHlsZT0iZmlsbDogI2I1MmM1N2ZmOyBzdHJva2Utd2lkdGg6IDE7IiBjeD0iMTAiIGN5PSIxMCIgcng9IjEwIiByeT0iMTAiIHRyYW5zZm9ybT0ibWF0cml4KDAuOTk5OTk5OTk5OTk5OTk5OSwgMCwgMCwgMC45OTk5OTk5OTk5OTk5OTk5LCAtMy41NTI3MTM2Nzg4MDA1MDFlLTE1LCAtMS43NzYzNTY4Mzk0MDAyNTA1ZS0xNSkiLz4KICA8ZWxsaXBzZSBzdHlsZT0iZmlsbDogI2U0NDE1ZmZmOyBzdHJva2Utd2lkdGg6IDE7IiBjeD0iMTAiIGN5PSIxMCIgcng9IjkiIHJ5PSI5IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjk5OTk5OTk5OTk5OTk5OTksIDAsIDAsIDAuOTk5OTk5OTk5OTk5OTk5OSwgLTMuNTUyNzEzNjc4ODAwNTAxZS0xNSwgLTEuNzc2MzU2ODM5NDAwMjUwNWUtMTUpIi8+CiAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4xMTI1OTMwMDI2MTczNTkxNiwgMCwgMCwgMC4xMTI1OTMwMDI2MTczNTkxNiwgLTE2Ljk0OTkyNDcyMTU2NzY5NywgLTYuMjEzMzk0MjU3NjI1ODUwNSkiIHN0eWxlPSIiPgogICAgPHJlY3QgeD0iMTc1Ljc5NSIgeT0iMTQwIiB3aWR0aD0iMTE0IiBoZWlnaHQ9IjgiIHN0eWxlPSJmaWxsOiAjZmZmOyIvPgogICAgPGVsbGlwc2Ugc3R5bGU9ImZpbGw6IHJnYigyMjgsIDY1LCA5NSk7IHN0cm9rZTogI2ZmZjsgc3Ryb2tlLXdpZHRoOiA4OyIgY3g9IjE5MCIgY3k9IjE0NCIgcng9IjE3LjA1NCIgcnk9IjE3LjA1NCIvPgogICAgPGVsbGlwc2Ugc3R5bGU9ImZpbGw6IHJnYigyMjgsIDY1LCA5NSk7IHN0cm9rZTogI2ZmZjsgc3Ryb2tlLXdpZHRoOiA4OyIgY3g9IjI4OC43MTQiIGN5PSIxNDQiIHJ4PSIxNy4wNTQiIHJ5PSIxNy4wNTQiLz4KICAgIDxwYXRoIGQ9Ik0gMjg0LjIwNSA3OS4zMyBRIDI4Ny4zODEgNzMuNzAyIDI5MC41NTYgNzkuMzMgTCAzMDUuMzc3IDEwNS41OTUgUSAzMDguNTUzIDExMS4yMjMgMzAyLjIwMSAxMTEuMjIzIEwgMjcyLjU2IDExMS4yMjMgUSAyNjYuMjA4IDExMS4yMjMgMjY5LjM4NCAxMDUuNTk1IFoiIGJ4OnNoYXBlPSJ0cmlhbmdsZSAyNjYuMjA4IDczLjcwMiA0Mi4zNDUgMzcuNTIxIDAuNSAwLjE1IDFAYTA3MDQ1MjYiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7IHN0cm9rZTogcmdiKDI1NSwgMjU1LCAyNTUpOyBzdHJva2Utd2lkdGg6IDg7IHN0cm9rZS1saW5lY2FwOiByb3VuZDsgdHJhbnNmb3JtLWJveDogZmlsbC1ib3g7IHRyYW5zZm9ybS1vcmlnaW46IDUwJSA1MCU7IiB0cmFuc2Zvcm09Im1hdHJpeCgwLCAxLCAtMSwgMCwgLTQ4LjQ2ODAwOSwgNTAuMTMwNTA2KSIvPgogIDwvZz4KPC9zdmc+";
    const menuIconURI = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjBweCIgeG1sbnM6Yng9Imh0dHBzOi8vYm94eS1zdmcuY29tIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQtMCIgYng6cGlubmVkPSJ0cnVlIj4KICAgICAgPHRpdGxlPkZpbGw8L3RpdGxlPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiByZ2IoMjU1LCA2OCwgMTE4KTsiPjwvc3RvcD4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjogcmdiKDI1NSwgNTQsIDk4KTsiPjwvc3RvcD4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50LTAtMCIgaHJlZj0iI2dyYWRpZW50LTAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMTAiIHkxPSIxIiB4Mj0iMTAiIHkyPSIxOSI+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQtMSIgYng6cGlubmVkPSJ0cnVlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjogcmdiKDE4NiwgMzgsIDk2KTsiPjwvc3RvcD4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjogcmdiKDE3MiwgNDEsIDc5KTsiPjwvc3RvcD4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50LTEtMCIgaHJlZj0iI2dyYWRpZW50LTEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMTAiIHkxPSIwIiB4Mj0iMTAiIHkyPSIyMCI+PC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPGVsbGlwc2Ugc3R5bGU9InN0cm9rZS13aWR0aDogMTsgZmlsbDogdXJsKCNncmFkaWVudC0xLTApOyIgY3g9IjEwIiBjeT0iMTAiIHJ4PSIxMCIgcnk9IjEwIiB0cmFuc2Zvcm09Im1hdHJpeCgwLjk5OTk5OTk5OTk5OTk5OTksIDAsIDAsIDAuOTk5OTk5OTk5OTk5OTk5OSwgLTMuNTUyNzEzNjc4ODAwNTAxZS0xNSwgLTEuNzc2MzU2ODM5NDAwMjUwNWUtMTUpIj48L2VsbGlwc2U+CiAgPGVsbGlwc2Ugc3R5bGU9InN0cm9rZS13aWR0aDogMTsgZmlsbDogdXJsKCNncmFkaWVudC0wLTApOyIgY3g9IjEwIiBjeT0iMTAiIHJ4PSI5IiByeT0iOSIgdHJhbnNmb3JtPSJtYXRyaXgoMC45OTk5OTk5OTk5OTk5OTk5LCAwLCAwLCAwLjk5OTk5OTk5OTk5OTk5OTksIC0zLjU1MjcxMzY3ODgwMDUwMWUtMTUsIC0xLjc3NjM1NjgzOTQwMDI1MDVlLTE1KSI+PC9lbGxpcHNlPgogIDxyZWN0IHg9IjYuMjI4IiB5PSI5LjU1IiB3aWR0aD0iNy40ODMiIGhlaWdodD0iMC45MDEiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7IHN0cm9rZS13aWR0aDogMC4xMTM7Ij48L3JlY3Q+CiAgPGVsbGlwc2Ugc3R5bGU9InN0cm9rZTogcmdiKDI1NSwgMjU1LCAyNTUpOyBzdHJva2Utd2lkdGg6IDAuOTAxOyBmaWxsOiBub25lOyIgY3g9IjQuNDQzIiBjeT0iMTAiIHJ4PSIxLjkyIiByeT0iMS45MiI+PC9lbGxpcHNlPgogIDxlbGxpcHNlIHN0eWxlPSJzdHJva2U6IHJnYigyNTUsIDI1NSwgMjU1KTsgc3Ryb2tlLXdpZHRoOiAwLjkwMTsgZmlsbDogbm9uZTsiIGN4PSIxNS41NTciIGN5PSIxMCIgcng9IjEuOTIiIHJ5PSIxLjkyIj48L2VsbGlwc2U+CiAgPHBhdGggZD0iTSAzMS45OTkgOC45MzIgUSAzMi4zNTcgOC4yOTggMzIuNzE1IDguOTMyIEwgMzQuMzgzIDExLjg4OSBRIDM0Ljc0MSAxMi41MjMgMzQuMDI2IDEyLjUyMyBMIDMwLjY4OCAxMi41MjMgUSAyOS45NzMgMTIuNTIzIDMwLjMzMSAxMS44ODkgWiIgYng6c2hhcGU9InRyaWFuZ2xlIDI5Ljk3MyA4LjI5OCA0Ljc2OCA0LjIyNSAwLjUgMC4xNSAxQDY4NjMxOGZkIiBzdHlsZT0iZmlsbDogcmdiKDI1NSwgMjU1LCAyNTUpOyBzdHJva2U6IHJnYigyNTUsIDI1NSwgMjU1KTsgc3Ryb2tlLXdpZHRoOiAwLjkwMTsgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kOyB0cmFuc2Zvcm0tYm94OiBmaWxsLWJveDsgdHJhbnNmb3JtLW9yaWdpbjogNTAlIDUwJTsiIHRyYW5zZm9ybT0ibWF0cml4KDAsIDEsIC0xLCAwLCAtMjIuNDA3MDA1LCAtMC41NjkwMzUpIj48L3BhdGg+Cjwvc3ZnPg=="
    const arrowURI = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNS44OTMiIGhlaWdodD0iMTUuODkzIiB2aWV3Qm94PSIwIDAgMTUuODkzIDE1Ljg5MyI+PHBhdGggZD0iTTkuMDIxIDEyLjI5NHYtMi4xMDdsLTYuODM5LS45MDVDMS4zOTggOS4xODQuODQ2IDguNDg2Ljk2MiA3LjcyN2MuMDktLjYxMi42MDMtMS4wOSAxLjIyLTEuMTY0bDYuODM5LS45MDVWMy42YzAtLjU4Ni43MzItLjg2OSAxLjE1Ni0uNDY0bDQuNTc2IDQuMzQ1YS42NDMuNjQzIDAgMCAxIDAgLjkxOGwtNC41NzYgNC4zNmMtLjQyNC40MDQtMS4xNTYuMTEtMS4xNTYtLjQ2NSIgZmlsbD0ibm9uZSIgc3Ryb2tlLW9wYWNpdHk9Ii4xNSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuNzUiLz48cGF0aCBkPSJNOS4wMjEgMTIuMjk0di0yLjEwN2wtNi44MzktLjkwNUMxLjM5OCA5LjE4NC44NDYgOC40ODYuOTYyIDcuNzI3Yy4wOS0uNjEyLjYwMy0xLjA5IDEuMjItMS4xNjRsNi44MzktLjkwNVYzLjZjMC0uNTg2LjczMi0uODY5IDEuMTU2LS40NjRsNC41NzYgNC4zNDVhLjY0My42NDMgMCAwIDEgMCAuOTE4bC00LjU3NiA0LjM2Yy0uNDI0LjQwNC0xLjE1Ni4xMS0xLjE1Ni0uNDY1IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMCAxNS44OTJWMGgxNS44OTJ2MTUuODkyeiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==";

    function span(text) {
        let el = document.createElement('span')
        el.innerText = text
        el.style.display = 'hidden'
        el.style.whiteSpace = 'nowrap'
        el.style.width = '100%'
        el.style.textAlign = 'center'
        return el
    }

    class IterEntry {
        constructor(value, type = 0) {
            this.value = value;
            this.type = type;
            this.yieldResponse = null;
        }
        static Item(value) {return new IterEntry(value)}
        static Yield(value = null) {return new IterEntry(value, 1)}
        static Done() {return new IterEntry(null, 2)}
        get isItem() {return this.type == 0}
        get isYield() {return this.type == 1}
        get isDone() {return this.type == 2}
    }

    class IteratorType {
        customId = "divIterator"
        lastItemType = 0
        consumed = 0
        yieldEntry = null

        get done() {return this.lastItemType == 2}

        constructor(kind = "Empty", state = {}, next = function() {this.done = true}) {
            this.kind = [].concat(kind);
            this.state = state;
            this.iterNext = next;
        }

        getIterChain() {
            return this.kind
            .map(k => typeof k === "string" ? k
                : k.kind && k.args ? `${k.kind}(${
                    k.args.map(i => i instanceof IteratorType ? i.getIterChain() : i.toString()).join(",")
                })`
                : ""
            ).join("↦")
        }
        
        getIterKind() {
            const kind = this.kind[this.kind.length-1]
            return typeof kind === "string" ? kind : kind.kind ?? ''
        }

        jwArrayHandler() {
            return `Iterator<${this.consumed}>`
        }

        chainIter(kind, state, next, done) {return new IteratorType(this.kind.concat(kind), state, next, done)}

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

        next(ctx, thread, target, runtime, stage) {
            if(this.done) return IterEntry.Done()
            if(this.yieldEntry && this.yieldEntry.yieldResponse != null) {
                const next = this.yieldEntry.yieldResponse;
                this.lastItemType = 0;
                this.yieldEntry = null;
                return IterEntry.Item(next);
            }
            const next = this.iterNext.apply(this, [this.state, thread, target, runtime, stage]);
            this.lastItemType = next.type
            this.yieldEntry = next.isYield ? next : null;
            if(next.isItem) this.consumed++;
            return next
        }

        clone() {
            const state = Object.fromEntries(Object.entries(this.state).map(([key, val]) => [key, 
                val instanceof IteratorType ? val.clone() : val
            ]))
            const clone = new IteratorType(this.kind, state, this.iterNext);
            clone.consumed = this.consumed;
            return clone
        }
    }

    const divIterator = {
        Type: IteratorType,
        Entry: IterEntry,
        Block: {
            blockType: BlockType.REPORTER,
            //blockShape: "divIterator", 
            blockShape: vm.pmVersion ? BlockShape.ARROW : "divIterator",
            forceOutputType: "Iterator",
            allowDropAnywhere: true,
            disableMonitor: true
        },
        Argument: {
            shape: vm.pmVersion ? BlockShape.ARROW : "divIterator",
            exemptFromNormalization: true,
            check: ["Iterator"]
        },
    }

    class Extension {
        constructor() {
            vm.divIterator = divIterator
            vm.runtime.registerSerializer("divIterator",
                _ => null,
                _ => new IteratorType()
            )
            vm.runtime.registerCompiledExtensionBlocks('divIterator', this.getCompileInfo());

            // If this isn't on the port, use a custom arrow shape
            if(!vm.pmVersion) {
                Scratch.gui.getBlockly().then(ScratchBlocks => {
                    ScratchBlocks.BlockSvg.registerCustomShape("divIterator", {
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
            }
        }
        getInfo = () => ({
            id: "divIterator",
            name: "Iterators",
            color1: "#ff3662",
            color2: "#7d101d",
            color3: "#ac294f",
            menuIconURI,
            blocks: [
                {
                    opcode: 'iterItem',
                    text: 'item',
                    blockType: BlockType.REPORTER,
                    hideFromPalette: true,
                    allowDropAnywhere: true,
                    canDragDuplicate: true
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
                    opcode: 'iterAdvance',
                    text: 'advance [ITER]',
                    disableMonitor: true,
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ITER: divIterator.Argument
                    }
                },
                {
                    opcode: 'iterNext',
                    text: 'next item from [ITER]',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.ROUND,
                    allowDropAnywhere: true,
                    arguments: {
                        ITER: divIterator.Argument
                    }
                },
                {
                    opcode: 'iterDone',
                    text: '[ITER] is done?',
                    disableMonitor: true,
                    blockType: BlockType.BOOLEAN,
                    allowDropAnywhere: true,
                    arguments: {
                        ITER: divIterator.Argument
                    }
                },
                {
                    opcode: 'iterClone',
                    text: 'clone [ITER]',
                    arguments: {
                        ITER: divIterator.Argument
                    },
                    ...divIterator.Block
                },

                {
                    blockType: BlockType.LABEL,
                    text: 'Iterables'
                },
                {
                    opcode: 'iterRange',
                    text: 'range from [START] to [END]',
                    arguments: {
                        START: {type: ArgumentType.NUMBER, defaultValue: 1},
                        END: {type: ArgumentType.NUMBER, defaultValue: 10},
                    },
                    ...divIterator.Block
                },

                {
                    blockType: BlockType.LABEL,
                    text: 'Iterator Adapters'
                },
                {
                    opcode: 'iterAdapterMap',
                    text: '[ITER] then map [I] [IMG] [MAP]',
                    arguments: {
                        ITER: divIterator.Argument,
                        I: {fillIn: 'iterItem'},
                        MAP: {
                            type: Scratch.ArgumentType.STRING,
                            exemptFromNormalization: true
                        },
                        IMG: { type: Scratch.ArgumentType.IMAGE, dataURI: arrowURI } // Stole from Sharkpool muhahaha
                    },
                    ...divIterator.Block
                },
                {
                    opcode: 'iterAdapterKeep',
                    text: '[ITER] then keep [I] if [PRED]',
                    arguments: {
                        ITER: divIterator.Argument,
                        I: {fillIn: 'iterItem'},
                        PRED: {type: Scratch.ArgumentType.BOOLEAN},
                    },
                    ...divIterator.Block
                },
                '---',
                {
                    opcode: 'iterAdapterEnum',
                    text: '[ITER] then enumerate items',
                    arguments: {
                        ITER: divIterator.Argument,
                    },
                    ...divIterator.Block
                },
                {
                    opcode: 'iterAdapterCycle',
                    text: '[ITER] then cycle items',
                    arguments: {
                        ITER: divIterator.Argument,
                    },
                    ...divIterator.Block
                },
                '---',
                {
                    opcode: 'iterAdapterTake',
                    text: '[ITER] then take [COUNT] items',
                    arguments: {
                        ITER: divIterator.Argument,
                        COUNT: {type: Scratch.ArgumentType.NUMBER, defaultValue: 4},
                    },
                    ...divIterator.Block
                },
                {
                    opcode: 'iterAdapterSkip',
                    text: '[ITER] then skip [COUNT] items',
                    arguments: {
                        ITER: divIterator.Argument,
                        COUNT: {type: Scratch.ArgumentType.NUMBER, defaultValue: 4},
                    },
                    ...divIterator.Block
                },
                {
                    opcode: 'iterAdapterStepBy',
                    text: '[ITER] then step by [STEP] items',
                    arguments: {
                        ITER: divIterator.Argument,
                        STEP: {type: Scratch.ArgumentType.NUMBER, defaultValue: 2},
                    },
                    ...divIterator.Block
                },
                '---',
                {
                    opcode: 'iterAdapterChain',
                    text: '[ITER1] then chain with [ITER2]',
                    arguments: {
                        ITER1: divIterator.Argument,
                        ITER2: divIterator.Argument,
                    },
                    ...divIterator.Block
                },
                {
                    opcode: 'iterAdapterZip',
                    text: '[ITER1] then zip with [ITER2]',
                    arguments: {
                        ITER1: divIterator.Argument,
                        ITER2: divIterator.Argument,
                    },
                    ...divIterator.Block
                },

                '---',
                {
                    opcode: 'iterAdapterInspect',
                    text: '[ITER] then inspect [I]',
                    branchCount: 1,
                    arguments: {
                        ITER: divIterator.Argument,
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
                    opcode: 'iterTermCount',
                    text: '[ITER] finally count items',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        ITER: divIterator.Argument,
                    },
                },
                {
                    opcode: 'iterTermFold',
                    text: '[ITER] finally reduce [INIT] with [A] [I] [IMG] [FOLD]',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.ROUND,
                    allowDropAnywhere: true,
                    arguments: {
                        ITER: divIterator.Argument,
                        INIT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "foo",
                            exemptFromNormalization: true
                        },
                        FOLD: {
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
                    text: '[ITER] finally any [I] [IMG] [PRED]',
                    disableMonitor: true,
                    blockType: BlockType.BOOLEAN,
                    allowDropAnywhere: true,
                    arguments: {
                        ITER: divIterator.Argument,
                        PRED: {type: Scratch.ArgumentType.BOOLEAN},
                        I: {fillIn: 'iterItem'},
                        IMG: { type: Scratch.ArgumentType.IMAGE, dataURI: arrowURI }
                    }
                },
                {
                    opcode: 'iterTermAll',
                    text: '[ITER] finally all [I] [IMG] [PRED]',
                    disableMonitor: true,
                    blockType: BlockType.BOOLEAN,
                    allowDropAnywhere: true,
                    arguments: {
                        ITER: divIterator.Argument,
                        PRED: {type: Scratch.ArgumentType.BOOLEAN},
                        I: {fillIn: 'iterItem'},
                        IMG: { type: Scratch.ArgumentType.IMAGE, dataURI: arrowURI }
                    }
                },
                '---',
                {
                    opcode: 'iterTermForEach',
                    text: 'for [I] of [ITER]',
                    blockType: BlockType.LOOP,
                    branchCount: 1,
                    arguments: {
                        ITER: divIterator.Argument,
                        I: {fillIn: 'iterItem'},
                    },
                },

                '---',
                '---',
                {
                    opcode: 'iterFromArray',
                    text: 'iterate over array [ARR]',
                    arguments: {
                        ARR: jwArray.Argument
                    },
                    ...divIterator.Block
                },
                {
                    opcode: 'iterToArray',
                    text: '[ITER] finally collect to array',
                    arguments: {
                        ITER: divIterator.Argument
                    },
                    ...jwArray.Block
                },
            ]
        })

        getCompileInfo = () => ({
            ir: {
                iterAdvance: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'stack',
                        ITER: generator.descendInputOfBlock(block, 'ITER'),
                    }
                },
                iterNext: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        ITER: generator.descendInputOfBlock(block, 'ITER'),
                    }
                },

                // Adapters
                iterAdapterMap: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        ITER: generator.descendInputOfBlock(block, 'ITER'),
                        MAP: generator.descendInputOfBlock(block, 'MAP'),
                    }
                },
                iterAdapterKeep: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        ITER: generator.descendInputOfBlock(block, 'ITER'),
                        PRED: generator.descendInputOfBlock(block, 'PRED'),
                    }
                },
                iterAdapterInspect: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        ITER: generator.descendInputOfBlock(block, 'ITER'),
                        SUBSTACK: generator.descendSubstack(block, 'SUBSTACK')
                    }
                },

                // Terminators
                iterTermCount: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        ITER: generator.descendInputOfBlock(block, 'ITER'),
                    }
                },
                iterTermFold: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        ITER: generator.descendInputOfBlock(block, 'ITER'),
                        INIT: generator.descendInputOfBlock(block, 'INIT'),
                        FOLD: generator.descendInputOfBlock(block, 'FOLD'),
                    }
                },
                iterTermAny: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        ITER: generator.descendInputOfBlock(block, 'ITER'),
                        PRED: generator.descendInputOfBlock(block, 'PRED'),
                    }
                },
                iterTermAll: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        ITER: generator.descendInputOfBlock(block, 'ITER'),
                        PRED: generator.descendInputOfBlock(block, 'PRED'),
                    }
                },

                iterTermForEach: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'stack',
                        ITER: generator.descendInputOfBlock(block, 'ITER'),
                        SUBSTACK: generator.descendSubstack(block, 'SUBSTACK')
                    }
                },
            },
            js: {
                iterAdvance(node, compiler, imports) {
                    const iter = compiler.localVariables.next(),
                        item   = compiler.localVariables.next();
                    compiler.source += 
                 /*js*/`const ${iter} = vm.divIterator.Type.toIterator(${compiler.descendInput(node.ITER).asUnknown()});\n`
                +/*js*/`while(!${iter}.done) {\n`
                      +`    const ${item} = ${iter}.next(null, thread, target, runtime, stage);\n`
                      +`    if(!${item}.isYield) break;\n`
                      +`    yield ${item}.value;\n`
                      +`}\n`
                },
                iterNext(node, compiler, imports) {
                    const iter = compiler.localVariables.next(),
                        item   = compiler.localVariables.next();
                    return new imports.TypedInput(
                 /*js*/`(yield* (function*() {\n`
                      +`    const ${iter} = vm.divIterator.Type.toIterator(${compiler.descendInput(node.ITER).asUnknown()});\n`
                      +`    let ${item} = vm.divIterator.Entry.Done();`
                      +`    while(!${iter}.done) {\n`
                      +`        ${item} = ${iter}.next(null, thread, target, runtime, stage);\n`
                      +`        if(!${item}.isYield) break;\n`
                      +`        ${item}.yieldResponse = yield ${item}.value;\n`
                      +`    }\n`
                      +`    return ${item}.isItem ? ${item}.value : '';\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },

                // Adapters
                iterAdapterMap(node, compiler, imports) {
                    const iter = compiler.localVariables.next(),
                        item   = compiler.localVariables.next(),
                        map    = compiler.localVariables.next(),
                        state  = compiler.localVariables.next(),
                        proc   = compiler.localVariables.next();
                    return new imports.TypedInput(
                 /*js*/`(yield* (function*() {\n`
                      +`    const ${iter} = vm.divIterator.Type.toIterator(${compiler.descendInput(node.ITER).asUnknown()});\n`
                      +`    const ${proc} = thread.procedures;\n`
                      +`    return ${iter}.chainIter("Map",\n`
                      +`        {iter: ${iter}, partial: null, map: function*(${item}, thread, target, runtime, stage) {\n`
                      +`            thread._divIterItem ??= [];\n`
                      +`            thread._divIterItem.push(${item});\n`
                      +`            thread.procedures = {...${proc}, ...thread.procedures};\n`
                      +`            ${item} = (${compiler.descendInput(node.MAP).asUnknown()});\n`
                      +`            thread._divIterItem.pop();\n`
                      +`            return ${item};\n`
                      +`        }}, function(${state}, thread, target, runtime, stage) {\n`
                      +`        const {iter: ${iter}, map: ${map}} = ${state};\n`
                      +`        if(!${state}.partial) {`
                      +`            const ${item} = ${iter}.next(this, thread, target, runtime, stage);\n`
                      +`            if(!${item}.isItem) return ${item};\n`
                      +`            ${state}.partial = ${map}(${item}.value, thread, target, runtime, stage)\n`
                      +`        };\n`
                      +`        const {value, done} = ${state}.partial.next();`
                      +`        if(done) ${state}.partial = null;\n`
                      +`        return done ? vm.divIterator.Entry.Item(value) : vm.divIterator.Entry.Yield(value);\n`
                      +`    })\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },
                iterAdapterKeep(node, compiler, imports) {
                    const iter = compiler.localVariables.next(),
                        item   = compiler.localVariables.next(),
                        pred   = compiler.localVariables.next(),
                        state  = compiler.localVariables.next(),
                        proc   = compiler.localVariables.next();
                    return new imports.TypedInput(
                 /*js*/`(yield* (function*() {\n`
                      +`    const ${iter} = vm.divIterator.Type.toIterator(${compiler.descendInput(node.ITER).asUnknown()});\n`
                      +`    const ${proc} = thread.procedures;\n`
                      +`    return ${iter}.chainIter("Keep",\n`
                      +`        {iter: ${iter}, partial: null, pred: function*(${item}, thread, target, runtime, stage) {\n`
                      +`            thread._divIterItem ??= [];\n`
                      +`            thread._divIterItem.push(${item});\n`
                      +`            thread.procedures = {...${proc}, ...thread.procedures};\n`
                      +`            const ${pred} = (${compiler.descendInput(node.PRED).asBoolean()});\n`
                      +`            thread._divIterItem.pop();\n`
                      +`            return [${pred}, vm.divIterator.Entry.Item(${item})];\n`
                      +`        }}, function(${state}, thread, target, runtime, stage) {\n`
                      +`        const {iter: ${iter}, pred: ${pred}} = ${state};\n`
                      +`        if(!${state}.partial) {`
                      +`            const ${item} = ${iter}.next(this, thread, target, runtime, stage);\n`
                      +`            if(!${item}.isItem) return ${item};\n`
                      +`            ${state}.partial = ${pred}(${item}.value, thread, target, runtime, stage)\n`
                      +`        };\n`
                      +`        const {value, done} = ${state}.partial.next();`
                      +`        if(done) ${state}.partial = null;\n`
                      +`        return done && value[0] ? value[1] : vm.divIterator.Entry.Yield(value);\n`
                      +`    })\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },
                iterAdapterInspect(node, compiler, imports) {
                    console.log(node);
                    const src = compiler.source
                    compiler.source = ""
                    compiler.descendStack(node.SUBSTACK, new imports.Frame(true, "divIterator.iterAdapterInspect"))
                    compiler.yieldLoop()
                    const substack = compiler.source
                    compiler.source = src;
                    const iter = compiler.localVariables.next(),
                        item   = compiler.localVariables.next(),
                        insp   = compiler.localVariables.next(),
                        state  = compiler.localVariables.next(),
                        proc   = compiler.localVariables.next();
                    return new imports.TypedInput(
                 /*js*/`(yield* (function*() {\n`
                      +`    const ${iter} = vm.divIterator.Type.toIterator(${compiler.descendInput(node.ITER).asUnknown()});\n`
                      +`    const ${proc} = thread.procedures;\n`
                      +`    return ${iter}.chainIter("Inspect",\n`
                      +`        {iter: ${iter}, item: null, partial: null, threadGen: null, insp: function*(${item}, thread, target, runtime, stage) {\n`
                      +`            thread._divIterItem ??= [];\n`
                      +`            thread._divIterItem.push(${item});\n`
                      +`            thread.procedures = {...${proc}, ...thread.procedures};\n`
                      +`            yield* (function*() {do {\n`
                      +`                ${substack};\n`
                      +`            } while(false);})();\n`
                      +`            thread._divIterItem.pop();\n`
                      +`        }}, function(${state}, thread, target, runtime, stage) {\n`
                      +`        const {iter: ${iter}, insp: ${insp}} = ${state};\n`
                      +`        if(!${state}.partial || thread.generator !== ${state}.threadGen?.deref()) {`
                      +`            ${state}.item = ${iter}.next(this, thread, target, runtime, stage);\n`
                      +`            if(!${state}.item.isItem) return ${state}.item;\n`
                      +`            ${state}.threadGen = new WeakRef(thread.generator);\n`
                      +`            ${state}.partial = ${insp}(${state}.item.value, thread, target, runtime, stage)\n`
                      +`        };\n`
                      +`        const {value, done} = ${state}.partial.next();`
                      +`        if(done) {\n`
                      +`            ${state}.partial = null;\n`
                      +`            const ${item} = ${state}.item; ${state}.item = null;\n`
                      +`            return ${item};\n`
                      +`        } else {\n`
                      +`            return vm.divIterator.Entry.Yield(value);`
                      +`        };\n`
                      +`    })\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },

                // Terminators
                iterTermCount(node, compiler, imports) {
                    const iter = compiler.localVariables.next(),
                        count  = compiler.localVariables.next(),
                        item   = compiler.localVariables.next();
                    // Loop Yield
                    const src = compiler.source
                    compiler.source = ""; compiler.yieldLoop()
                    const yielder = compiler.source; compiler.source = src;
                    return new imports.TypedInput(
                 /*js*/`(yield* (function*() {\n`
                      +`    const ${iter} = vm.divIterator.Type.toIterator(${compiler.descendInput(node.ITER).asUnknown()});\n`
                      +`    let ${count} = 0, ${item};\n`
                      +`    while(!${iter}.done) {\n`
                      +`        ${item} = ${iter}.next(null, thread, target, runtime, stage);\n`
                      +`        if(${item}.isDone) break;\n`
                      +`        if(${item}.isYield) {yield ${item}.value; continue;}\n`
                      +`        ${count}++;\n`
                      +`        if(${count} % 10 == 0) ${yielder};\n`
                      +`    };\n`
                      +`    return ${count};\n`
                      +`})())\n`
                    , imports.TYPE_UNKNOWN)
                },
                iterTermFold(node, compiler, imports) {
                    const iter = compiler.localVariables.next(),
                        i      = compiler.localVariables.next(),
                        item   = compiler.localVariables.next(),
                        acc    = compiler.localVariables.next();
                    // Loop Yield
                    const src = compiler.source
                    compiler.source = ""; compiler.yieldLoop()
                    const yielder = compiler.source; compiler.source = src;
                    return new imports.TypedInput(
                /*js*/ `(yield* (function*() {\n`
                      +`    const ${iter} = vm.divIterator.Type.toIterator(${compiler.descendInput(node.ITER).asUnknown()});\n`
                      +`    let ${item}, ${acc} = ${compiler.descendInput(node.INIT).asUnknown()};\n`
                      +`    thread._divIterItem ??= [];\n`
                      +`    thread._divIterAcc ??= [];\n`
                      +`    for(let ${i} = 0; !${iter}.done; ${i}++) {\n`
                      +`        ${item} = ${iter}.next(null, thread, target, runtime, stage);\n`
                      +`        if(${item}.isDone) break;\n`
                      +`        if(${item}.isYield) {${item}.yieldResponse = yield ${item}.value; continue;}\n`
                      +`        thread._divIterItem.push(${item}.value);\n`
                      +`        thread._divIterAcc.push(${acc});\n`
                      +`        ${acc} = ${compiler.descendInput(node.FOLD).asUnknown()};\n`
                      +`        thread._divIterItem.pop();\n`
                      +`        thread._divIterAcc.pop();\n`
                      +`        if(${i} % 10 == 0) ${yielder};\n`
                      +`    };\n`
                      +`    return ${acc};\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },
                iterTermAny(node, compiler, imports) {
                    const iter = compiler.localVariables.next(),
                        i      = compiler.localVariables.next(),
                        item   = compiler.localVariables.next(),
                        any    = compiler.localVariables.next();
                    // Loop Yield
                    const src = compiler.source
                    compiler.source = ""; compiler.yieldLoop()
                    const yielder = compiler.source; compiler.source = src;
                    return new imports.TypedInput(
                /*js*/ `(yield* (function*() {\n`
                      +`    const ${iter} = vm.divIterator.Type.toIterator(${compiler.descendInput(node.ITER).asUnknown()});\n`
                      +`    let ${item}, ${any} = false;\n`
                      +`    thread._divIterItem ??= [];\n`
                      +`    for(let ${i} = 0; !${any} && !${iter}.done; ${i}++) {\n`
                      +`        ${item} = ${iter}.next(null, thread, target, runtime, stage);\n`
                      +`        if(${item}.isDone) break;\n`
                      +`        if(${item}.isYield) {${item}.yieldResponse = yield ${item}.value; continue;}\n`
                      +`        thread._divIterItem.push(${item}.value);\n`
                      +`        ${any} ||= ${compiler.descendInput(node.PRED).asBoolean()};\n`
                      +`        thread._divIterItem.pop();\n`
                      +`        if(${i} % 10 == 0) ${yielder};\n`
                      +`    };\n`
                      +`    return ${any};\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },
                iterTermAll(node, compiler, imports) {
                    const iter = compiler.localVariables.next(),
                        i      = compiler.localVariables.next(),
                        item   = compiler.localVariables.next(),
                        all    = compiler.localVariables.next();
                    // Loop Yield
                    const src = compiler.source
                    compiler.source = ""; compiler.yieldLoop()
                    const yielder = compiler.source; compiler.source = src;
                    return new imports.TypedInput(
                /*js*/ `(yield* (function*() {\n`
                      +`    const ${iter} = vm.divIterator.Type.toIterator(${compiler.descendInput(node.ITER).asUnknown()});\n`
                      +`    let ${item}, ${all} = true;\n`
                      +`    thread._divIterItem ??= [];\n`
                      +`    for(let ${i} = 0; ${all} && !${iter}.done; ${i}++) {\n`
                      +`        ${item} = ${iter}.next(null, thread, target, runtime, stage);\n`
                      +`        if(${item}.isDone) break;\n`
                      +`        if(${item}.isYield) {${item}.yieldResponse = yield ${item}.value; continue;}\n`
                      +`        thread._divIterItem.push(${item}.value);\n`
                      +`        ${all} &&= ${compiler.descendInput(node.PRED).asBoolean()};\n`
                      +`        thread._divIterItem.pop();\n`
                      +`        if(${i} % 10 == 0) ${yielder};\n`
                      +`    };\n`
                      +`    return ${all};\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },

                iterTermForEach: (node, compiler, imports) => {
                    const iter = compiler.localVariables.next(),
                        item = compiler.localVariables.next();
                    const src = compiler.source
                    compiler.source = ""
                    compiler.descendStack(node.SUBSTACK, new imports.Frame(true, "divIterator.iterTermForEach"))
                    compiler.yieldLoop()
                    const substack = compiler.source
                    compiler.source = src + 
                 /*js*/`const ${iter} = vm.divIterator.Type.toIterator(${compiler.descendInput(node.ITER).asUnknown()});\n`
                +/*js*/`thread._divIterItem ??= [];\n`
                +/*js*/`thread._divIterItem.push(null);\n`
                +/*js*/`let ${item};\n`
                +/*js*/`while(!${iter}.done) {\n`
                      +`    ${item} = ${iter}.next(null, thread, target, runtime, stage);\n`
                      +`    if(${item}.isDone) break;\n`
                      +`    if(${item}.isYield) {${item}.yieldResponse = yield ${item}.value; continue;}\n`
                      +`    thread._divIterItem[thread._divIterItem.length-1] = ${item}.value;\n`
                      +`    ${substack}\n`
                      +`};\n`
                +/*js*/`thread._divIterItem.pop();`
                },
            }
        })
        
        iterItem({}, util) {
            return util.thread._divIterItem ? util.thread._divIterItem.at(-1) : ""
        }
        iterAcc({}, util) {
            return util.thread._divIterAcc ? util.thread._divIterAcc.at(-1) : ""
        }

        iterAdvance() {
            return "noop" // IteratorType.toIterator(ITER).next()
        }
        iterNext() {
            return "noop" // return IteratorType.toIterator(ITER).next()
        }
        iterDone({ITER}) {
            return IteratorType.toIterator(ITER).done
        }
        iterClone({ITER}) {
            return IteratorType.toIterator(ITER).clone()
        }
        
        // Iterables
        // Note: set end to 1e308 for a practically infinite iterator.
        iterRange({START, END}) {
            const advance = n => n + (START < END ? 1 : -1);
            return new IteratorType({kind: "Range", args: [START, END]},
                {curr: START}, function(state) {
                const {curr} = state;
                if(curr == advance(END)) return IterEntry.Done()
                state.curr = advance(curr);
                return IterEntry.Item(curr)
            })
        }

        // Adapters
        iterAdapterMap() {
            return "noop"
        }
        iterAdapterKeep() {
            return "noop"
        }

        iterAdapterEnum({ITER}) {
            ITER = IteratorType.toIterator(ITER)
            return ITER.chainIter("Enumerate",
                {iter: ITER, num: 1}, function(state, thread, target, runtime, stage) {
                const {iter, num} = state;
                const item = iter.next(this, thread, target, runtime, stage); 
                if(!item.isItem) return item;
                state.num += 1;
                return IterEntry.Item(new ArrayType([num, item.value]))
            })
        }
        iterAdapterCycle({ITER}) {
            ITER = IteratorType.toIterator(ITER)
            return ITER.chainIter("Cycle", 
                {iter: ITER, buffer: [], i: 0}, function(state, thread, target, runtime, stage) {
                const {iter, buffer, i} = state;
                if(iter.done) {
                    if(buffer.length == 0) return IterEntry.Done()
                    state.i = (i + 1) % buffer.length
                    return buffer[i]
                }
                const item = iter.next(null, thread, target, runtime, stage);
                if(!item.isItem) return item;
                buffer.push(item)
                return item;
            }, ITER.done)
        }

        iterAdapterTake({ITER, COUNT}) {
            ITER = IteratorType.toIterator(ITER)
            return ITER.chainIter({kind: "Take", args: [COUNT]},
                {iter: ITER, count: COUNT}, function(state, thread, target, runtime, stage) {
                const {iter, count} = state;
                if(count <= 0) return IterEntry.Done()
                const item = iter.next(this, thread, target, runtime, stage);
                if(!item.isItem) return item;
                state.count--;
                return item
            }, ITER.done)
        }
        iterAdapterSkip({ITER, COUNT}) {
            ITER = IteratorType.toIterator(ITER)
            return ITER.chainIter({kind: "Skip", args: [COUNT]}, 
                {iter: ITER, count: COUNT}, function(state, thread, target, runtime, stage) {
                const {iter} = state;
                while(state.count > 0) {
                    const item = iter.next(this, thread, target, runtime, stage);
                    if(!item.isItem) return item;
                    state.count--;
                }
                return iter.next(this, thread, target, runtime, stage)
            }, ITER.done)
        }
        iterAdapterStepBy({ITER, STEP}) {
            ITER = IteratorType.toIterator(ITER)
            return ITER.chainIter({kind: "StepBy", args: [STEP]}, 
                {iter: ITER, skipped: STEP}, function(state, thread, target, runtime, stage) {
                const {iter} = state;
                let item;
                while(state.skipped+1 < STEP) {
                    item = iter.next(this, thread, target, runtime, stage);
                    if(!item.isItem) return item;
                    state.skipped++;
                }
                item = iter.next(this, thread, target, runtime, stage);
                if(!item.isItem) return item;
                state.skipped = 0;
                return item
            }, ITER.done)
        }
        
        iterAdapterChain({ITER1, ITER2}) {
            ITER1 = IteratorType.toIterator(ITER1)
            ITER2 = IteratorType.toIterator(ITER2)
            return ITER1.chainIter({kind: "Chain", args: [ITER2]}, 
                {iter1: ITER1, iter2: ITER2}, function(state, thread, target, runtime, stage) {
                const {iter1, iter2} = state;
                let item = iter1.next(null, thread, target, runtime, stage);
                if(!item.isDone) return item;
                return iter2.next(this, thread, target, runtime, stage)
            }, ITER1.done && ITER2.done)
        }
        iterAdapterZip({ITER1, ITER2}) {
            ITER1 = IteratorType.toIterator(ITER1)
            ITER2 = IteratorType.toIterator(ITER2)
            return ITER1.chainIter({kind: "Zip", args: [ITER2]}, 
                {iter1: ITER1, iter2: ITER2, item1: null}, function(state, thread, target, runtime, stage) {
                const {iter1, iter2} = state;
                const item1 = state.item1 ?? iter1.next(this, thread, target, runtime, stage);
                if(!item1.isItem) return item1;
                state.item1 = item1
                const item2 = iter2.next(this, thread, target, runtime, stage);
                if(!item2.isItem) return item2;
                state.item1 = null;
                return new ArrayType([item1, item2])
            }, ITER1.done && ITER2.done)
        }

        iterAdapterInspect() {
            return "noop"
        }

        // Terminators
        iterTermCount() {
            return "noop"
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

        iterTermForEach() {
            return "noop"
        }

        // Other
        iterFromArray() {
            return "noop"
        }
        iterToArray() {
            return "noop"
        }
    }
    Scratch.extensions.register(new Extension())
})(Scratch)