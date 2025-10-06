(function(Scratch) {
    'use strict';

    const menuIconURI = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjBweCIgeG1sbnM6Yng9Imh0dHBzOi8vYm94eS1zdmcuY29tIj4KICA8ZWxsaXBzZSBzdHlsZT0iZmlsbDogI2I1MmM1N2ZmOyBzdHJva2Utd2lkdGg6IDE7IiBjeD0iMTAiIGN5PSIxMCIgcng9IjEwIiByeT0iMTAiIHRyYW5zZm9ybT0ibWF0cml4KDAuOTk5OTk5OTk5OTk5OTk5OSwgMCwgMCwgMC45OTk5OTk5OTk5OTk5OTk5LCAtMy41NTI3MTM2Nzg4MDA1MDFlLTE1LCAtMS43NzYzNTY4Mzk0MDAyNTA1ZS0xNSkiLz4KICA8ZWxsaXBzZSBzdHlsZT0iZmlsbDogI2U0NDE1ZmZmOyBzdHJva2Utd2lkdGg6IDE7IiBjeD0iMTAiIGN5PSIxMCIgcng9IjkiIHJ5PSI5IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjk5OTk5OTk5OTk5OTk5OTksIDAsIDAsIDAuOTk5OTk5OTk5OTk5OTk5OSwgLTMuNTUyNzEzNjc4ODAwNTAxZS0xNSwgLTEuNzc2MzU2ODM5NDAwMjUwNWUtMTUpIi8+CiAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4xMTI1OTMwMDI2MTczNTkxNiwgMCwgMCwgMC4xMTI1OTMwMDI2MTczNTkxNiwgLTE2Ljk0OTkyNDcyMTU2NzY5NywgLTYuMjEzMzk0MjU3NjI1ODUwNSkiIHN0eWxlPSIiPgogICAgPHJlY3QgeD0iMTc1Ljc5NSIgeT0iMTQwIiB3aWR0aD0iMTE0IiBoZWlnaHQ9IjgiIHN0eWxlPSJmaWxsOiAjZmZmOyIvPgogICAgPGVsbGlwc2Ugc3R5bGU9ImZpbGw6IHJnYigyMjgsIDY1LCA5NSk7IHN0cm9rZTogI2ZmZjsgc3Ryb2tlLXdpZHRoOiA4OyIgY3g9IjE5MCIgY3k9IjE0NCIgcng9IjE3LjA1NCIgcnk9IjE3LjA1NCIvPgogICAgPGVsbGlwc2Ugc3R5bGU9ImZpbGw6IHJnYigyMjgsIDY1LCA5NSk7IHN0cm9rZTogI2ZmZjsgc3Ryb2tlLXdpZHRoOiA4OyIgY3g9IjI4OC43MTQiIGN5PSIxNDQiIHJ4PSIxNy4wNTQiIHJ5PSIxNy4wNTQiLz4KICAgIDxwYXRoIGQ9Ik0gMjg0LjIwNSA3OS4zMyBRIDI4Ny4zODEgNzMuNzAyIDI5MC41NTYgNzkuMzMgTCAzMDUuMzc3IDEwNS41OTUgUSAzMDguNTUzIDExMS4yMjMgMzAyLjIwMSAxMTEuMjIzIEwgMjcyLjU2IDExMS4yMjMgUSAyNjYuMjA4IDExMS4yMjMgMjY5LjM4NCAxMDUuNTk1IFoiIGJ4OnNoYXBlPSJ0cmlhbmdsZSAyNjYuMjA4IDczLjcwMiA0Mi4zNDUgMzcuNTIxIDAuNSAwLjE1IDFAYTA3MDQ1MjYiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7IHN0cm9rZTogcmdiKDI1NSwgMjU1LCAyNTUpOyBzdHJva2Utd2lkdGg6IDg7IHN0cm9rZS1saW5lY2FwOiByb3VuZDsgdHJhbnNmb3JtLWJveDogZmlsbC1ib3g7IHRyYW5zZm9ybS1vcmlnaW46IDUwJSA1MCU7IiB0cmFuc2Zvcm09Im1hdHJpeCgwLCAxLCAtMSwgMCwgLTQ4LjQ2ODAwOSwgNTAuMTMwNTA2KSIvPgogIDwvZz4KPC9zdmc+";

    const {BlockType, BlockShape} = Scratch

    const iteratorLimit = 2 ** 32 // Same as jwk's Array limit

    const vm = Scratch.vm
    // Use jwk's Array extension
    if (!vm.jwArray) vm.extensionManager.loadExtensionIdSync('jwArray')
    const jwArray = vm.jwArray
    const Array = jwArray.Type
    // Use jwk's Lambda extension
    if (!vm.jwLambda) vm.extensionManager.loadExtensionIdSync('jwLambda')
    const jwLambda = vm.jwLambda
    const Lambda = jwLambda.Type

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
        
        constructor(kind, data, next) {
            this.kind = kind
            this.data = data
            this.next = next
        }

        toString() {
            return `${this.kind} Iterator`
        }

        toReporterContent() {
            const root = document.createElement('div');
            root.style.display = 'flex'
            root.appendChild(span(`${this.kind} Iterator`))
            return root
        }

        getNext() {
            return this.next(this.data)
        }
    }
    class AdapterType {
        customId = "divAdapter"

        constructor(kind, cons) {
            this.kind = kind
            this.cons = cons
        }

        toString() {
            return `${this.kind} Adapter`
        }

        toReporterContent() {
            const root = document.createElement('div');
            root.style.display = 'flex'
            root.appendChild(span(`${this.kind} Adapter`))
            return root
        }

        adaptIter(iter) {
            return this.cons(iter)
        }
    }

    const divIterator = {
        IteratorType, AdapterType,
        iteratorLimit
    }

    class Extension {
        constructor() {
            vm.divIterator = divIterator
            vm.runtime.registerCompiledExtensionBlocks('divIterator', this.getCompileInfo());
        }

        getInfo = () => ({
            id: "divIterator",
            name: "Iterators",
            color1: "#e4415fff",
            color2: "#b52c57ff",
            menuIconURI,
            blocks: [
                {
                    opcode: 'iterNext',
                    text: 'next from [iter]',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.ROUND,
                    allowDropAnywhere: true,
                    arguments: {
                        iter: {
                            shape: BlockShape.SQUARE,
                        }
                    }
                },
                {
                    opcode: 'iterRange',
                    text: 'range from [start] to [end]',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                    arguments: {
                        start: {type: Scratch.ArgumentType.NUMBER, defaultValue: 1},
                        end: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10},
                    }
                },

                {
                    blockType: BlockType.LABEL,
                    text: 'Iterator Adapters'
                },
                {
                    opcode: 'iterThenAdapt',
                    text: '[iter] then [adapt]',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                    arguments: {
                        iter: {shape: BlockShape.SQUARE},
                        adapt: {shape: BlockShape.SQUARE}
                    }
                },
                '---',
                {
                    opcode: 'iterAdapterMap',
                    text: 'map with [func]',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                    arguments: {
                        func: jwLambda.Argument,
                    }
                },
                {
                    opcode: 'iterAdapterFilter',
                    text: 'filter by [pred]',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                    arguments: {
                        pred: jwLambda.Argument,
                    }
                },
                {
                    opcode: 'iterAdapterEnum',
                    text: 'enumerate elements',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                },
                {
                    opcode: 'iterAdapterCycle',
                    text: 'cycle elements',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                },
                {
                    opcode: 'iterAdapterTake',
                    text: 'take [count] elements',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                    arguments: {
                        count: {type: Scratch.ArgumentType.NUMBER, defaultValue: 4},
                    }
                },
                {
                    opcode: 'iterAdapterSkip',
                    text: 'skip [count] elements',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                    arguments: {
                        count: {type: Scratch.ArgumentType.NUMBER, defaultValue: 4},
                    }
                },
                {
                    opcode: 'iterAdapterChain',
                    text: 'chain with [iter2]',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                    arguments: {
                        iter2: {shape: BlockShape.SQUARE},
                    }
                },
                {
                    opcode: 'iterAdapterZip',
                    text: 'zip with [iter2]',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                    arguments: {
                        iter2: {shape: BlockShape.SQUARE},
                    }
                },

                {
                    blockType: BlockType.LABEL,
                    text: 'Iterator Terminators'
                },
                {
                    opcode: 'iterTermCount',
                    text: '[iter] finally count elements',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.ROUND,
                    allowDropAnywhere: true,
                    arguments: {
                        iter: {
                            shape: BlockShape.SQUARE,
                        }
                    },
                },
                {
                    opcode: 'iterTermFold',
                    text: '[iter] finally fold with [init] using [fold]',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.ROUND,
                    allowDropAnywhere: true,
                    arguments: {
                        iter: {shape: BlockShape.SQUARE},
                        init: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "foo",
                            exemptFromNormalization: true
                        },
                        fold: jwLambda.Argument,
                    }
                },
                '---',
                {
                    opcode: 'iterTermForEachE',
                    text: 'element',
                    blockType: BlockType.REPORTER,
                    hideFromPalette: true,
                    allowDropAnywhere: true,
                    canDragDuplicate: true
                },
                {
                    opcode: 'iterTermForEach',
                    text: 'for [E] of [iter]',
                    blockType: BlockType.LOOP,
                    arguments: {
                        iter: {shape: BlockShape.SQUARE},
                        E: {fillIn: 'iterTermForEachE'},
                    }
                },

                {
                    blockType: BlockType.LABEL,
                    text: 'Array iteration'
                },
                {
                    opcode: 'iterArray',
                    text: 'iterate over array [arr]',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                    arguments: {
                        arr: jwArray.Argument
                    }
                },
                {
                    opcode: 'iterCollectToArray',
                    text: '[iter] finally collect to array',
                    arguments: {
                        iter: {shape: BlockShape.SQUARE,}
                    },
                    ...jwArray.Block
                },
            ],
        })

        getCompileInfo = () => ({
            ir: {
                iterAdapterMap: (generator, block) => {
                    //generator.script.yields = true
                    return {
                        kind: 'input',
                        func: generator.descendInputOfBlock(block, 'func'),
                    }
                },
                iterAdapterFilter: (generator, block) => {
                    //generator.script.yields = true
                    return {
                        kind: 'input',
                        pred: generator.descendInputOfBlock(block, 'pred'),
                    }
                },
                iterTermFold: (generator, block) => {
                    //generator.script.yields = true
                    return {
                        kind: 'input',
                        iter: generator.descendInputOfBlock(block, 'iter'),
                        init: generator.descendInputOfBlock(block, 'init'),
                        fold: generator.descendInputOfBlock(block, 'fold'),
                    }
                }
            },
            js: {
                iterAdapterMap: (node, compiler, imports) => {
                    const originalSource = compiler.source;
                    compiler.source = `(yield* (function*() {\n`
                    compiler.source += `  const func = runtime.vm.jwLambda.Type.toLambda(${compiler.descendInput(node.func).asUnknown()});\n`;
                    compiler.source += `  return new runtime.vm.divIterator.AdapterType("Map", iter => new runtime.vm.divIterator.IteratorType("Map", {iter}, self => {\n`;
                    compiler.source += `    const next = self.iter.getNext();\n`
                    compiler.source += `    return next.length === 0 ? [] : [func.execute(next[0], thread, target, runtime, stage).next().value];\n`
                    compiler.source += `  }));\n`
                    compiler.source += `})())`
                    const stackSource = compiler.source;
                    compiler.source = originalSource;
                    return new imports.TypedInput(stackSource, imports.TYPE_UNKNOWN);
                },
                iterAdapterFilter: (node, compiler, imports) => {
                    const originalSource = compiler.source;
                    compiler.source = `(yield* (function*() {\n`
                    compiler.source += `  const pred = runtime.vm.jwLambda.Type.toLambda(${compiler.descendInput(node.pred).asUnknown()});\n`;
                    compiler.source += `  return new runtime.vm.divIterator.AdapterType("Filter", iter => new runtime.vm.divIterator.IteratorType("Filter", {iter}, self => {\n`;
                    compiler.source += `    for(let i = 0; i < runtime.vm.divIterator.iteratorLimit; i++) {\n`
                    compiler.source += `      const next = self.iter.getNext();\n`
                    compiler.source += `      if(next.length === 0 || pred.execute(next[0], thread, target, runtime, stage).next().value) return next;\n`
                    compiler.source += `    }\n`
                    compiler.source += `  }));\n`
                    compiler.source += `})())`
                    const stackSource = compiler.source;
                    compiler.source = originalSource;
                    return new imports.TypedInput(stackSource, imports.TYPE_UNKNOWN);
                },
                iterTermFold: (node, compiler, imports) => {
                    const originalSource = compiler.source;
                    compiler.source = `(yield* (function*() {\n`
                    compiler.source += `  const fold = runtime.vm.jwLambda.Type.toLambda(${compiler.descendInput(node.fold).asUnknown()});\n`;
                    compiler.source += `  const iter = ${compiler.descendInput(node.iter).asUnknown()};\n`
                    compiler.source += `  let acc = ${compiler.descendInput(node.init).asUnknown()};\n`
                    compiler.source += `  for(let i = 0; i < runtime.vm.divIterator.iteratorLimit; i++) {\n`
                    compiler.source += `    const next = iter.getNext();\n`
                    compiler.source += `    if(next.length === 0) break;\n`
                    compiler.source += `    acc = fold.execute(new runtime.vm.jwArray.Type([acc, next[0]]), thread, target, runtime, stage).next().value;\n`
                    compiler.source += `  }\n`
                    compiler.source += `  return acc;\n`
                    compiler.source += `})())`
                    const stackSource = compiler.source;
                    compiler.source = originalSource;
                    return new imports.TypedInput(stackSource, imports.TYPE_UNKNOWN);
                }
            }
        })


        iterNext({iter}) {
            return new Array(iter.getNext())
        }

        iterRange({start, end}) {
            return new IteratorType("Range", {idx: 0}, (self) => {
                return end < start || self.idx + start <= end ? [start + self.idx++] : []
            })
        }

        // Adapters
        iterThenAdapt({iter, adapt}) {
            return adapt.adaptIter(iter)
        }

        iterAdapterMap() {
            return "noop"
        }

        iterAdapterFilter() {
            return "noop"
        }

        iterAdapterEnum() {
            return new AdapterType("Enumerate", iter => new IteratorType("Enumerate", {iter, idx: 1}, self => {
                const next = self.iter.getNext()
                return next.length === 0 ? [] : [new Array([self.idx++, next[0]])]
            }))
        }

        iterAdapterCycle() {
            return new AdapterType("Cycle", iter => new IteratorType("Cycle", {iter, buffer: [], idx: 0}, self => {
                const next = self.iter.getNext()
                if(next.length === 0) {
                    if(self.buffer.length === 0) return []
                    if(self.buffer.length === self.idx) self.idx = 0
                    return [self.buffer[self.idx++]]
                }
                self.buffer[self.idx++] = next[0]
                return next
            }))
        }

        iterAdapterTake({count}) {
            return new AdapterType("Take", iter => new IteratorType("Take", {iter, idx: 1}, self => {
                const next = self.iter.getNext()
                return self.idx++ > count ? [] : next
            }))
        }

        iterAdapterSkip({count}) {
            return new AdapterType("Skip", iter => new IteratorType("Skip", {iter, skipped: 0}, self => {
                while(self.skipped++ < count)
                    if(self.iter.getNext() === 0) return
                return self.iter.getNext()
            }))
        }

        iterAdapterChain({iter2}) {
            return new AdapterType("Chain", iter1 => new IteratorType("Chain", {iter1, iter2, snd: false}, self => {
                if(self.snd) return self.iter2.getNext()
                const next = self.iter1.getNext()
                if(next.length === 0) {
                    self.snd = true
                    return self.iter2.getNext()
                }
                return next
            }))
        }

        iterAdapterZip({iter2}) {
            return new AdapterType("Zip", iter1 => new IteratorType("Zip", {iter1, iter2}, self => {
                const next1 = self.iter1.getNext()
                const next2 = self.iter2.getNext()
                return next1.length === 0 || next2.length === 0 ? [] : [new Array([next1, next2])]
            }))
        }

        // Iterator Terminators
        iterTermCount({iter}) {
            let count = 0
            while(count < iteratorLimit && iter.getNext().length !== 0) count++
            return count
        }

        iterTermFold() {
            return 'noop'
        }

        iterTermForEachE({}, util) {
            return util.thread.stackFrames[0].divIterator
        }

        iterTermForEach({iter}, util) {
            if (util.stackFrame.execute) {
                const { iter } = util.stackFrame;
                const next = iter.getNext()
                if(next.length === 0) return;
                util.thread.stackFrames[0].divIterator = next[0];
            } else {
                const next = iter.getNext()
                if(next.length === 0) return;
                util.stackFrame.iter = iter;
                util.stackFrame.execute = true;
                util.thread.stackFrames[0].divIterator = next[0];
            }
            util.startBranch(1, true);
        }
        
        // Array specific blocks
        iterArray({arr}) {
            return new IteratorType("Array", {array: arr.array, idx: 0}, (self) => {
                return self.idx < self.array.length ? [self.array[self.idx++]] : []
            })
        }

        iterCollectToArray({iter}) {
            let array = []
            for(let i = 0; i < iteratorLimit; i++) {
                const next = iter.getNext()
                if(next.length === 0) break;
                array.push(next[0])
            }
            return new Array(array)
        }
    }
    Scratch.extensions.register(new Extension())
})(Scratch)