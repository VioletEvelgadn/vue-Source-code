// 导入相关依赖
import ts from 'rollup-plugin-typescript2' // 解析ts
import json from "@rollup/plugin-json";
import resolvePlugin from "@rollup/plugin-node-resolve" // 解析第三方插件
import { createRequire } from 'node:module'
import path from "node:path"; // 处理路径
import { fileURLToPath } from 'node:url'

// 获取路径

    const require = createRequire(import.meta.url)
    const __dirname = fileURLToPath(new URL('.', import.meta.url))

    let packagesDir = path.resolve(__dirname, 'packages')
    const packageDir = path.resolve(packagesDir, process.env.TARGET)
    const resolve = (p) => path.resolve(packageDir, p)
    const pkg = require(resolve(`package.json`))
    const packageOptions = pkg.buildOptions || {}
    const name = packageOptions.filename || path.basename(packageDir)

// 创建表
    const outputOptions = {
        "esm-bundler":{
            file: resolve(`dist/${name}.esm-bundler.js`),
            format: 'es'
        },
        "cjs":{
            file: resolve(`dist/${name}.cjs.js`),
            format: 'cjs'
        },
        "global":{
            file: resolve(`dist/${name}.global.js`),
            format: 'iife'
        }
    }

    const options = pkg.buildOptions

    function  createConfig (format,output) {

        if (!output) {
            process.exit(1)
        }

        // 打包
        output.name = options.name
        console.log(11111111111111,options.name)
        output.sourcemap = true
    //     生成配置
        return {
            input:resolve('sec/input.ts'),
            output,
            plugins:[
                json(),
                ts({
                    tsconfig:path.resolve(__dirname, 'tsconfig.json')
                }),
                resolvePlugin() // 解析第三方插件
            ]
        }
    }

//     导出一个配置
 export default options.formats.map(format => createConfig( format, outputOptions[format] ))
