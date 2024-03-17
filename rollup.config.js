// 导入相关依赖
import ts from 'rollup-plugin-typescript2' // 解析ts
import json from "@rollup/plugin-json";
import resolvePlugin from "@rollup/plugin-node-resolve" // 解析第三方插件
import path from "path"; // 处理路径

// 获取路径
    let packagesDir = path.resolve(__dirname, 'packages')
    // const packageDir = path.resolve(packagesDir, process.env.TARGET)
    // const resolve = (p) => path.resolve(packageDir, p)
    // const pkg = require(resolve(`package.json`))
    // const packageOptions = pkg.buildOptions || {}
console.log( packagesDir, 1234567890 )
