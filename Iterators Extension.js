(function(Scratch) {
    'use strict';
    // // Is this part necessary?
    // if (!Scratch.extensions.unsandboxed) {
    //     throw new Error('\'Iterators\' must run unsandboxed!');
    // }

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
        
        constructor(kind, gen) {
            this.kind = kind
            this.gen = gen()
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
            return new IteratorType(this.kind, this.cons(iter))
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
                    text: 'next item from [iter]',
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
                    text: 'enumerate items',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                },
                {
                    opcode: 'iterAdapterCycle',
                    text: 'cycle items',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                },
                {
                    opcode: 'iterAdapterTake',
                    text: 'take [count] items',
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
                    text: 'skip [count] items',
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
                    text: '[iter] finally count items',
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
                    opcode: 'iterTermForEachI',
                    text: 'item',
                    blockType: BlockType.REPORTER,
                    hideFromPalette: true,
                    allowDropAnywhere: true,
                    canDragDuplicate: true
                },
                {
                    opcode: 'iterTermForEach',
                    text: 'for [I] of [iter]',
                    blockType: BlockType.LOOP,
                    branchCount: 1,
                    arguments: {
                        iter: {shape: BlockShape.SQUARE},
                        I: {fillIn: 'iterTermForEachI'},
                    },
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
                iterNext: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        iter: generator.descendInputOfBlock(block, 'iter'),
                    }
                },
                iterAdapterMap: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        func: generator.descendInputOfBlock(block, 'func'),
                    }
                },
                iterAdapterFilter: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        pred: generator.descendInputOfBlock(block, 'pred'),
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
                iterCollectToArray: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        iter: generator.descendInputOfBlock(block, 'iter')
                    }
                }
            },
            js: {
                iterNext(node, compiler, imports) {
                    const iter = compiler.localVariables.next(),
                        item = compiler.localVariables.next();
                    // Loop Yield
                    const src = compiler.source
                    compiler.source = ""; compiler.yieldLoop()
                    const yielder = compiler.source; compiler.source = src;
                    return new imports.TypedInput(
                 /*js*/`(yield* (function*() {\n`
                      +`    const ${iter} = ${compiler.descendInput(node.iter).asUnknown()};\n`
                      +`    for(const ${item} of ${iter}.gen) {\n`
                      +`        if(${item} !== undefined) return new vm.jwArray.Type([${item}]);\n`
                      +`        ${yielder};\n`
                      +`    };\n`
                      +`    return new vm.jwArray.Type([]);\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },
                iterAdapterMap(node, compiler, imports) {
                    const func = compiler.localVariables.next(),
                        iter = compiler.localVariables.next(),
                        item = compiler.localVariables.next(),
                        res = compiler.localVariables.next();
                    // Loop Yield
                    const src = compiler.source
                    compiler.source = ""; compiler.yieldLoop()
                    const yielder = compiler.source; compiler.source = src;
                    return new imports.TypedInput(
                 /*js*/`(yield* (function*() {\n`
                      +`    const ${func} = vm.jwLambda.Type.toLambda(${compiler.descendInput(node.func).asUnknown()});\n`
                      +`    return new vm.divIterator.AdapterType("Map", ${iter} => function*() {\n`
                      +`        console.log("Map");\n`
                      +`        for(const ${item} of ${iter}.gen) {\n`
                      +`            console.log(${item});\n`
                      +`            if(${item} === undefined) {yield; continue;}\n`
                      +`            const ${res} = yield* ${func}.execute(${item}, thread, target, runtime, stage);\n`
                      +`            yield ${res};\n`
                      +`            ${yielder};\n`
                      +`        };\n`
                      +`    })\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },
                iterAdapterFilter(node, compiler, imports) {
                    const pred = compiler.localVariables.next(),
                        iter = compiler.localVariables.next(),
                        item = compiler.localVariables.next(),
                        cond = compiler.localVariables.next();
                    // Loop Yield
                    const src = compiler.source
                    compiler.source = ""; compiler.yieldLoop()
                    const yielder = compiler.source; compiler.source = src;
                    return new imports.TypedInput(
                 /*js*/`(yield* (function*() {\n`
                      +`    const ${pred} = vm.jwLambda.Type.toLambda(${compiler.descendInput(node.pred).asUnknown()});\n`
                      +`    return new vm.divIterator.AdapterType("Filter", ${iter} => function*() {\n`
                      +`        for(const ${item} of ${iter}.gen) {\n`
                      +`            if(${item} === undefined) {yield; continue;}\n`
                      +`            const ${cond} = yield* ${pred}.execute(${item}, thread, target, runtime, stage);\n`
                      +`            if(${cond}) yield ${item}\n`
                      +`            ${yielder};\n`
                      +`        }\n`
                      +`    })\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },
                iterTermCount(node, compiler, imports) {
                    const iter = compiler.localVariables.next(),
                        count = compiler.localVariables.next(),
                        item = compiler.localVariables.next();
                    // Loop Yield
                    const src = compiler.source
                    compiler.source = ""; compiler.yieldLoop()
                    const yielder = compiler.source; compiler.source = src;
                    return new imports.TypedInput(
                 /*js*/`(yield* (function*() {\n`
                      +`    const ${iter} = ${compiler.descendInput(node.iter).asUnknown()};\n`
                      +`    let ${count} = 0;\n`
                      +`    for(const ${item} of ${iter}.gen) {\n`
                      +`        if(${item} === undefined) {yield; continue;};\n`
                      +`        ${count}++;\n`
                      +`        ${yielder};\n`
                      +`    };\n`
                      +`    return ${count};\n`
                      +`})())\n`
                    , imports.TYPE_UNKNOWN)
                },
                iterTermFold(node, compiler, imports) {
                    const iter = compiler.localVariables.next(),
                        fold = compiler.localVariables.next(),
                        acc = compiler.localVariables.next(),
                        item = compiler.localVariables.next();
                    // Loop Yield
                    const src = compiler.source
                    compiler.source = ""; compiler.yieldLoop()
                    const yielder = compiler.source; compiler.source = src;
                    return new imports.TypedInput(
                /*js*/ `(yield* (function*() {\n`
                      +`    const ${iter} = ${compiler.descendInput(node.iter).asUnknown()};\n`
                      +`    const ${fold} = vm.jwLambda.Type.toLambda(${compiler.descendInput(node.fold).asUnknown()});\n`
                      +`    let ${acc} = ${compiler.descendInput(node.init).asUnknown()};\n`
                      +`    console.log("Fold");\n`
                      +`    for(const ${item} of ${iter}.gen) {\n`
                      +`        console.log(${item});\n`
                      +`        if(${item} === undefined) {yield; continue;};\n`
                      +`        console.log(${acc} + " + " + ${item});\n`
                      +`        ${acc} = yield* ${fold}.execute(new vm.jwArray.Type([${acc}, ${item}]), thread, target, runtime, stage);\n`
                      +`        ${yielder};\n`
                      +`    };\n`
                      +`    return ${acc};\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },
                // _divIterForEachI
                iterTermForEach: (node, compiler, imports) => {
                    const iter = compiler.localVariables.next(),
                        item = compiler.localVariables.next();
                    const src = compiler.source
                    compiler.source = ""
                    compiler.descendStack(node.substack, new imports.Frame(true, "divIterator.iterTermForEach"))
                    compiler.yieldLoop()
                    const substack = compiler.source
                    compiler.source = src + 
                 /*js*/`const ${iter} = ${compiler.descendInput(node.iter).asUnknown()};\n`
                +/*js*/`thread._divIterForEachI ??= [];\n`
                +/*js*/`thread._divIterForEachI.push(null);\n`
                +/*js*/`for(const ${item} of ${iter}.gen) {\n`
                      +`    if(${item} === undefined) {yield; continue;};\n`
                      +`    thread._divIterForEachI[thread._divIterForEachI.length-1] = ${item};\n`
                      +`    ${substack}\n`
                      +`};\n`
                +/*js*/`thread._divIterForEachI.pop();`
                },
                iterCollectToArray(node, compiler, imports) {
                    const iter = compiler.localVariables.next(),
                        array = compiler.localVariables.next(),
                        item = compiler.localVariables.next();
                    // Loop Yield
                    const src = compiler.source
                    compiler.source = ""; compiler.yieldLoop()
                    const yielder = compiler.source; compiler.source = src;
                    return new imports.TypedInput(
                /*js*/ `(yield* (function*() {\n`
                      +`    const ${iter} = ${compiler.descendInput(node.iter).asUnknown()};\n`
                      +`    let ${array} = [];\n`
                      +`    for(const ${item} of ${iter}.gen) {\n`
                      +`        if(${item} === undefined) {yield; continue;}\n`
                      +`        ${array}.push(${item});\n`
                      +`        ${yielder};\n`
                      +`    };\n`
                      +`    return new vm.jwArray.Type(${array});\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },
            }
        })


        iterNext() {
            return 'noop'
        }

        iterRange({start, end}) {
            return new IteratorType("Range", function*() {
                for(let i = start; end < start || i <= end; i++) yield i
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
            return new AdapterType("Enumerate", iter => function*() {
                let i = 0;
                for(const item of iter.gen) {
                    if(item === undefined) {yield; continue;}
                    yield new Array([++i, item])
                }
            })
        }

        iterAdapterCycle() {
            return new AdapterType("Cycle", iter => function*() {
                let buffer = []
                let idx = 0
                for(const item of iter.gen) {
                    if(item === undefined) {yield; continue;}
                    buffer[idx++] = item
                    yield item
                }
                if(buffer.length === 0) return
                for(;;) {
                    idx %= buffer.length
                    yield buffer[idx++]
                }
            })
        }

        iterAdapterTake({count}) {
            return new AdapterType("Take", iter => function*() {
                let idx = 0
                for(const item of iter.gen) {
                    if(item === undefined) {yield; continue;}
                    if(++idx > count) break;
                    yield item
                }
            })
        }

        iterAdapterSkip({count}) {
            return new AdapterType("Skip", iter => function*() {
                let idx = 0
                while(idx < count) {
                    const next = iter.gen.next()
                    if(next.done) return
                    if(next.value !== undefined) idx++
                }
                yield* iter.gen
            })
        }

        iterAdapterChain({iter2}) {
            return new AdapterType("Chain", iter1 => function*() {
                yield* iter1.gen
                yield* iter2.gen
            })
        }

        iterAdapterZip({iter2}) {
            return new AdapterType("Zip", iter1 => function*() {
                for(;;) {
                    let next1 = iter1.gen.next()
                    if(next1.done) return
                    while(next1.value === undefined) {
                        yield
                        next1 = iter1.gen.next()
                        if(next1.done) return
                    }
                    let next2 = iter2.gen.next()
                    if(next2.done) return
                    while(next2.value === undefined) {
                        yield
                        next2 = iter2.gen.next()
                        if(next2.done) return
                    }
                    yield new Array([next1.value, next2.value])
                }
            })
        }

        // Iterator Terminators
        iterTermCount() {
            return 'noop'
        }

        iterTermFold() {
            return 'noop'
        }

        iterTermForEachI({}, util) {
            return util.thread._divIterForEachI ? util.thread._divIterForEachI[util.thread._divIterForEachI.length-1] : ""
        }

        iterTermForEach() {
            return 'noop'
        }
        
        // Array specific blocks
        iterArray({arr}) {
            const {array} = arr
            return new IteratorType("Array", function*() {
                for(let i = 0; i < array.length; i++) yield array[i]
            })
        }

        iterCollectToArray() {
            return 'noop'
        }
    }
    Scratch.extensions.register(new Extension())
})(Scratch)