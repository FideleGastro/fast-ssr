import { promisify } from 'util'
import fs from 'fs'
// const readFile = promisify(fs.readFile)

import webpack from 'webpack'
import webpackConfig from '../config/webpack.config'

const copyFile = promisify(fs.copyFile)
const writeFile = promisify(fs.writeFile)

const build = () => new Promise((res, rej) => {
  webpack(webpackConfig).run((err, stats) => {
    if (err) rej(err)
    res(stats)
  })
})

async function main() {
  try {
    const stats = await build()
    console.log(stats)
    await writeFile('build/stats.json', JSON.stringify(stats.toJson()))
    await copyFile('./run.js', 'build')
  } catch (err) {
    console.error(err)
  }
}

main()