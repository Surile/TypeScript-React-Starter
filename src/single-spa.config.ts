import * as singleSpa from 'single-spa'
import axios from 'axios'
/*
 * runScript：一个promise同步方法。可以代替创建一个script标签，然后加载服务
 * */

const runScript = async (url: any) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = url
        script.onload = resolve
        script.onerror = reject
        const firstScript: any = document.getElementsByTagName('script')[0]
        firstScript.parentNode.insertBefore(script, firstScript)
    })
}

/*
 * getManifest：远程加载manifest.json 文件，解析需要加载的js
 * url: manifest.json 链接
 * bundle：entry名称
 * */
const getManifest = (url: string, bundle: any) =>
    new Promise(async resolve => {
        const {data} = await axios.get(url)
        // eslint-disable-next-line no-console
        const {entrypoints, publicPath} = data
        const assets = entrypoints[bundle].assets
        for (let i = 0; i < assets.length; i++) {
            await runScript(publicPath + assets[i]).then(() => {
                if (i === assets.length - 1) {
                    resolve()
                }
            })
        }
    })

singleSpa.registerApplication(
    //注册微前端服务
    'more_admin',
    async () => {
        if (process.env.NODE_ENV === 'development') {
            await runScript('http://localhost:8000/js/chunk-vendors.js')
            await runScript('http://localhost:8000/js/app.js')
            return (<any>window).singleVue
        } else {
            let singleVue = null
            await getManifest('http://localhost:8000/manifest.json', 'app').then(() => {
                singleVue = (<any>window).singleVue
            })
            return singleVue
        }
    },
    location => location.pathname.startsWith('/more_admin'), // 配置微前端模块前缀
)

singleSpa.registerApplication(
    'more_shop_admin',
    async () => {
        if (process.env.NODE_ENV === 'development') {
            await runScript('http://127.0.0.1:9528/chunk-vendors.js')
            await runScript('http://127.0.0.1:9528/app.js')
            return (<any>window).singleReact
        } else {
            let singleReact: any = null
            await getManifest('http://127.0.0.1:9528/manifest.json', 'app').then(() => {
                singleReact = (<any>window).singleReact
            })
            return singleReact
        }
    },
    location => location.pathname.startsWith('/more_shop_admin'),
)

singleSpa.start() // 启动
