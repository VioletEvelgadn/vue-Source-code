// 进行打包
// 获取打包目录
// const fs = require('fs')
// const execa = require('execa')
import fs from 'fs'
import {execa} from 'execa';


const dirs = fs.readdirSync('packages').filter(item => {
    if( !fs.statSync(`packages/${item}`).isDirectory() ) {
        return false
    }
        return true
})

// 并行打包

   async function build(target) {
    console.log(target)
       // -c 执行rollup配置
       await execa('rollup',[ '-c', "--environment", `TARGET:${target}`],{ stdio:'inherit' })
    }

    async function runParAller(dirs, itemFn) {
        //进行遍历
        let result = []
        dirs.forEach(item => {
            result.push(itemFn(item))
        })
        // 存放打包的Promise，等待打包执行完毕调用runParAller方法
        return  Promise.all(result)
    }

    runParAller(dirs, build).then(() => {
        console.log(1)
    })

console.log(dirs)

