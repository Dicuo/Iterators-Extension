(function(Scratch) {
    'use strict';
    // // Is this part necessary?
    // if (!Scratch.extensions.unsandboxed) {
    //     throw new Error('\'Iterators\' must run unsandboxed!');
    // }

    const menuIconURI = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjBweCIgeG1sbnM6Yng9Imh0dHBzOi8vYm94eS1zdmcuY29tIj4KICA8ZWxsaXBzZSBzdHlsZT0iZmlsbDogI2I1MmM1N2ZmOyBzdHJva2Utd2lkdGg6IDE7IiBjeD0iMTAiIGN5PSIxMCIgcng9IjEwIiByeT0iMTAiIHRyYW5zZm9ybT0ibWF0cml4KDAuOTk5OTk5OTk5OTk5OTk5OSwgMCwgMCwgMC45OTk5OTk5OTk5OTk5OTk5LCAtMy41NTI3MTM2Nzg4MDA1MDFlLTE1LCAtMS43NzYzNTY4Mzk0MDAyNTA1ZS0xNSkiLz4KICA8ZWxsaXBzZSBzdHlsZT0iZmlsbDogI2U0NDE1ZmZmOyBzdHJva2Utd2lkdGg6IDE7IiBjeD0iMTAiIGN5PSIxMCIgcng9IjkiIHJ5PSI5IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjk5OTk5OTk5OTk5OTk5OTksIDAsIDAsIDAuOTk5OTk5OTk5OTk5OTk5OSwgLTMuNTUyNzEzNjc4ODAwNTAxZS0xNSwgLTEuNzc2MzU2ODM5NDAwMjUwNWUtMTUpIi8+CiAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4xMTI1OTMwMDI2MTczNTkxNiwgMCwgMCwgMC4xMTI1OTMwMDI2MTczNTkxNiwgLTE2Ljk0OTkyNDcyMTU2NzY5NywgLTYuMjEzMzk0MjU3NjI1ODUwNSkiIHN0eWxlPSIiPgogICAgPHJlY3QgeD0iMTc1Ljc5NSIgeT0iMTQwIiB3aWR0aD0iMTE0IiBoZWlnaHQ9IjgiIHN0eWxlPSJmaWxsOiAjZmZmOyIvPgogICAgPGVsbGlwc2Ugc3R5bGU9ImZpbGw6IHJnYigyMjgsIDY1LCA5NSk7IHN0cm9rZTogI2ZmZjsgc3Ryb2tlLXdpZHRoOiA4OyIgY3g9IjE5MCIgY3k9IjE0NCIgcng9IjE3LjA1NCIgcnk9IjE3LjA1NCIvPgogICAgPGVsbGlwc2Ugc3R5bGU9ImZpbGw6IHJnYigyMjgsIDY1LCA5NSk7IHN0cm9rZTogI2ZmZjsgc3Ryb2tlLXdpZHRoOiA4OyIgY3g9IjI4OC43MTQiIGN5PSIxNDQiIHJ4PSIxNy4wNTQiIHJ5PSIxNy4wNTQiLz4KICAgIDxwYXRoIGQ9Ik0gMjg0LjIwNSA3OS4zMyBRIDI4Ny4zODEgNzMuNzAyIDI5MC41NTYgNzkuMzMgTCAzMDUuMzc3IDEwNS41OTUgUSAzMDguNTUzIDExMS4yMjMgMzAyLjIwMSAxMTEuMjIzIEwgMjcyLjU2IDExMS4yMjMgUSAyNjYuMjA4IDExMS4yMjMgMjY5LjM4NCAxMDUuNTk1IFoiIGJ4OnNoYXBlPSJ0cmlhbmdsZSAyNjYuMjA4IDczLjcwMiA0Mi4zNDUgMzcuNTIxIDAuNSAwLjE1IDFAYTA3MDQ1MjYiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7IHN0cm9rZTogcmdiKDI1NSwgMjU1LCAyNTUpOyBzdHJva2Utd2lkdGg6IDg7IHN0cm9rZS1saW5lY2FwOiByb3VuZDsgdHJhbnNmb3JtLWJveDogZmlsbC1ib3g7IHRyYW5zZm9ybS1vcmlnaW46IDUwJSA1MCU7IiB0cmFuc2Zvcm09Im1hdHJpeCgwLCAxLCAtMSwgMCwgLTQ4LjQ2ODAwOSwgNTAuMTMwNTA2KSIvPgogIDwvZz4KPC9zdmc+";

    // Stole from sharkpool muhahaha
    const arrowURI = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNS44OTMiIGhlaWdodD0iMTUuODkzIiB2aWV3Qm94PSIwIDAgMTUuODkzIDE1Ljg5MyI+PHBhdGggZD0iTTkuMDIxIDEyLjI5NHYtMi4xMDdsLTYuODM5LS45MDVDMS4zOTggOS4xODQuODQ2IDguNDg2Ljk2MiA3LjcyN2MuMDktLjYxMi42MDMtMS4wOSAxLjIyLTEuMTY0bDYuODM5LS45MDVWMy42YzAtLjU4Ni43MzItLjg2OSAxLjE1Ni0uNDY0bDQuNTc2IDQuMzQ1YS42NDMuNjQzIDAgMCAxIDAgLjkxOGwtNC41NzYgNC4zNmMtLjQyNC40MDQtMS4xNTYuMTEtMS4xNTYtLjQ2NSIgZmlsbD0ibm9uZSIgc3Ryb2tlLW9wYWNpdHk9Ii4xNSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuNzUiLz48cGF0aCBkPSJNOS4wMjEgMTIuMjk0di0yLjEwN2wtNi44MzktLjkwNUMxLjM5OCA5LjE4NC44NDYgOC40ODYuOTYyIDcuNzI3Yy4wOS0uNjEyLjYwMy0xLjA5IDEuMjItMS4xNjRsNi44MzktLjkwNVYzLjZjMC0uNTg2LjczMi0uODY5IDEuMTU2LS40NjRsNC41NzYgNC4zNDVhLjY0My42NDMgMCAwIDEgMCAuOTE4bC00LjU3NiA0LjM2Yy0uNDI0LjQwNC0xLjE1Ni4xMS0xLjE1Ni0uNDY1IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMCAxNS44OTJWMGgxNS44OTJ2MTUuODkyeiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==";

    const {BlockType, BlockShape} = Scratch

    const iteratorLimit = 2 ** 32 // Same as jwk's Array limit

    const vm = Scratch.vm
    // Use jwk's Array extension
    if (!vm.jwArray) vm.extensionManager.loadExtensionIdSync('jwArray')
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
                    opcode: 'iterAdvance',
                    text: 'advance [iter]',
                    disableMonitor: true,
                    blockType: BlockType.COMMAND,
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
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                    arguments: {
                        iter: {shape: BlockShape.SQUARE},
                        I: {fillIn: 'iterItem'},
                        map: {
                            type: Scratch.ArgumentType.STRING,
                            exemptFromNormalization: true
                        },
                        IMG: { type: Scratch.ArgumentType.IMAGE, dataURI: arrowURI } // Stole from Sharkpool muhahaha
                    }
                },
                {
                    opcode: 'iterAdapterFilter',
                    text: '[iter] then keep [I] if [pred]',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                    arguments: {
                        iter: {shape: BlockShape.SQUARE},
                        I: {fillIn: 'iterItem'},
                        pred: {
                            type: Scratch.ArgumentType.BOOLEAN,
                        },
                    }
                },
                {
                    opcode: 'iterAdapterEnum',
                    text: '[iter] then enumerate items',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                    arguments: {
                        iter: {shape: BlockShape.SQUARE},
                    }
                },
                {
                    opcode: 'iterAdapterCycle',
                    text: '[iter] then cycle items',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                    arguments: {
                        iter: {shape: BlockShape.SQUARE},
                    }
                },
                {
                    opcode: 'iterAdapterTake',
                    text: '[iter] then take [count] items',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                    arguments: {
                        iter: {shape: BlockShape.SQUARE},
                        count: {type: Scratch.ArgumentType.NUMBER, defaultValue: 4},
                    }
                },
                {
                    opcode: 'iterAdapterSkip',
                    text: '[iter] then skip [count] items',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                    arguments: {
                        iter: {shape: BlockShape.SQUARE},
                        count: {type: Scratch.ArgumentType.NUMBER, defaultValue: 4},
                    }
                },
                {
                    opcode: 'iterAdapterChain',
                    text: '[iter1] then chain with [iter2]',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                    arguments: {
                        iter1: {shape: BlockShape.SQUARE},
                        iter2: {shape: BlockShape.SQUARE},
                    }
                },
                {
                    opcode: 'iterAdapterZip',
                    text: '[iter1] then zip with [iter2]',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    blockShape: BlockShape.SQUARE,
                    allowDropAnywhere: true,
                    arguments: {
                        iter1: {shape: BlockShape.SQUARE},
                        iter2: {shape: BlockShape.SQUARE},
                    }
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
                    text: '[iter] finally reduce with [init] using [A] [I] [IMG] [fold]',
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
                        fold: {
                            type: Scratch.ArgumentType.STRING,
                            exemptFromNormalization: true
                        },
                        A: {fillIn: 'iterAcc'},
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
                        iter: {shape: BlockShape.SQUARE},
                        I: {fillIn: 'iterItem'},
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
                iterAdvance: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'stack',
                        iter: generator.descendInputOfBlock(block, 'iter'),
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
                iterAdapterFilter: (generator, block) => {
                    generator.script.yields = true
                    return {
                        kind: 'input',
                        iter: generator.descendInputOfBlock(block, 'iter'),
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
                },
            },
            js: {
                iterNext(node, compiler, imports) {
                    const iter = compiler.localVariables.next(),
                        item = compiler.localVariables.next();
                    return new imports.TypedInput(
                 /*js*/`(yield* (function*() {\n`
                      +`    const ${iter} = ${compiler.descendInput(node.iter).asUnknown()};\n`
                      +`    let ${item} = ${iter}.gen.next();\n`
                      +`    while(!${item}.done && ${item}.value === undefined) {\n`
                      +`        yield;\n`
                      +`        ${item} = ${iter}.gen.next();\n`
                      +`    };\n`
                      +`    return new vm.jwArray.Type(${item}.done ? [] : [${item}.value]);\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },
                iterAdvance(node, compiler, imports) {
                    const iter = compiler.localVariables.next(),
                        item = compiler.localVariables.next();
                    compiler.source +=
                 /*js*/`const ${iter} = ${compiler.descendInput(node.iter).asUnknown()};\n`
                +/*js*/`let ${item} = ${iter}.gen.next();\n`
                +/*js*/`while(!${item}.done && ${item}.value === undefined) {\n`
                      +`    yield;\n`
                      +`    ${item} = ${iter}.gen.next();\n`
                      +`};\n`
                },
                iterAdapterMap(node, compiler, imports) {
                    const iter = compiler.localVariables.next(),
                        item = compiler.localVariables.next();
                    return new imports.TypedInput(
                 /*js*/`(yield* (function*() {\n`
                      +`    const ${iter} = ${compiler.descendInput(node.iter).asUnknown()};\n`
                      +`    return new vm.divIterator.IteratorType("Map", function*() {\n`
                      +`        thread._divIterItem ??= [];\n`
                      +`        thread._divIterItem.push(null);\n`
                      +`        for(const ${item} of ${iter}.gen) {\n`
                      +`            if(${item} === undefined) {yield; continue;}\n`
                      +`            thread._divIterItem[thread._divIterItem.length-1] = ${item};\n`
                      +`            yield ${compiler.descendInput(node.map).asUnknown()}\n`
                      +`        };\n`
                      +`        thread._divIterItem.pop();\n`
                      +`    })\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },
                iterAdapterFilter(node, compiler, imports) {
                    const iter = compiler.localVariables.next(),
                        item = compiler.localVariables.next();
                    // Loop Yield
                    const src = compiler.source
                    compiler.source = ""; compiler.yieldLoop()
                    const yielder = compiler.source; compiler.source = src;
                    return new imports.TypedInput(
                 /*js*/`(yield* (function*() {\n`
                      +`    const ${iter} = ${compiler.descendInput(node.iter).asUnknown()};\n`
                      +`    return new vm.divIterator.IteratorType("Filter", function*() {\n`
                      +`        thread._divIterItem ??= [];\n`
                      +`        thread._divIterItem.push(null);\n`
                      +`        for(const ${item} of ${iter}.gen) {\n`
                      +`            if(${item} === undefined) {yield; continue;}\n`
                      +`            thread._divIterItem[thread._divIterItem.length-1] = ${item};\n`
                      +`            if(${compiler.descendInput(node.pred).asBoolean()}) yield ${item};\n`
                      +`            ${yielder};\n`
                      +`        };\n`
                      +`        thread._divIterItem.pop();\n`
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
                      +`    let ${acc} = ${compiler.descendInput(node.init).asUnknown()};\n`
                      +`    thread._divIterItem ??= [];\n`
                      +`    thread._divIterItem.push(null);\n`
                      +`    thread._divIterAcc ??= [];\n`
                      +`    thread._divIterAcc.push(null);\n`
                      +`    for(const ${item} of ${iter}.gen) {\n`
                      +`        if(${item} === undefined) {yield; continue;};\n`
                      +`        thread._divIterItem[thread._divIterItem.length-1] = ${item};\n`
                      +`        thread._divIterAcc[thread._divIterItem.length-1] = ${acc};\n`
                      +`        ${acc} = ${compiler.descendInput(node.fold).asUnknown()};\n`
                      +`        ${yielder};\n`
                      +`    };\n`
                      +`    thread._divIterItem.pop();\n`
                      +`    thread._divIterAcc.pop();\n`
                      +`    return ${acc};\n`
                      +`})())`
                    , imports.TYPE_UNKNOWN)
                },
                // _divIterItem
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
                +/*js*/`thread._divIterItem ??= [];\n`
                +/*js*/`thread._divIterItem.push(null);\n`
                +/*js*/`for(const ${item} of ${iter}.gen) {\n`
                      +`    if(${item} === undefined) {yield; continue;};\n`
                      +`    thread._divIterItem[thread._divIterItem.length-1] = ${item};\n`
                      +`    ${substack}\n`
                      +`};\n`
                +/*js*/`thread._divIterItem.pop();`
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

        iterAdvance() {
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

        iterAdapterEnum({iter}) {
            return new IteratorType("Enumerate", function*() {
                let i = 0;
                for(const item of iter.gen) {
                    if(item === undefined) {yield; continue;}
                    yield new Array([++i, item])
                }
            })
        }

        iterAdapterCycle({iter}) {
            return new IteratorType("Cycle", function*() {
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

        iterAdapterTake({iter, count}) {
            return new IteratorType("Take", function*() {
                let idx = 0
                for(const item of iter.gen) {
                    if(item === undefined) {yield; continue;}
                    if(++idx > count) break;
                    yield item
                }
            })
        }

        iterAdapterSkip({iter, count}) {
            return new IteratorType("Skip", function*() {
                let idx = 0
                while(idx < count) {
                    const next = iter.gen.next()
                    if(next.done) return
                    if(next.value !== undefined) idx++
                }
                yield* iter.gen
            })
        }

        iterAdapterChain({iter1, iter2}) {
            return new IteratorType("Chain", function*() {
                yield* iter1.gen
                yield* iter2.gen
            })
        }

        iterAdapterZip({iter1, iter2}) {
            return new IteratorType("Zip", function*() {
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

        iterItem({}, util) {
            return util.thread._divIterItem ? util.thread._divIterItem[util.thread._divIterItem.length-1] : ""
        }

        iterAcc({}, util) {
            return util.thread._divIterAcc ? util.thread._divIterAcc[util.thread._divIterAcc.length-1] : ""
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