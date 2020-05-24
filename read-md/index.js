const fs = require('fs')
const path = require('path')
let post = path.resolve(__dirname, './_posts')

let mdFiles = []
const files = fs.readdirSync(post)
files.forEach(function (item, index) {
    let stat = fs.lstatSync(post+"/" + item)
    if (stat.isDirectory() === false) {
        mdFiles.push(item)
    }
})

console.log(mdFiles);
mdFiles.forEach((item, ind)=>{
    fs.readFile(post+"/"+item, 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            let startInd = data.indexOf('---')
            let endInd = data.indexOf('---', startInd + 5);
            console.log(startInd, endInd)
            let str = data.slice(startInd + 3, endInd)
            let tage = str.match(/\[(\S*)\]/)[1]
            console.log(tage,item)
            fs.mkdir(post+"/"+tage, (err, path) => {
                if (err) throw err
                console.log('创建目录：', path)
            })
        }
    })
})






