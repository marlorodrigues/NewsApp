import fs from 'fs'

interface Routes {
    method: string
    url: string
    pre_handler: Function
    handler: Function
    post_handler: Function
}

interface RoutesData {
    meta: object
    routes: Routes[]
}

export = {
    handlers: async (): Promise<Object[]> => {

        const dirs = fs.readdirSync(__dirname)
        const expose_routes: Routes[] = []

        var _promise = dirs.map(async (directories: string) => {
            if (directories.includes('index')) return;

            const files = fs.readdirSync(`${__dirname}/${directories}`)

            files.map((filename: string) => {
                if (!filename.includes('routes'))
                    return;

                let routes: RoutesData = require(`${__dirname}/${directories}/${filename}`)

                routes.routes.forEach(x => {
                    console.log(`[OK] - ${x.method.toUpperCase()} - /bkc${x.url}`)
                    expose_routes.push({
                        method: x.method,
                        url: `/bck${x.url}`,
                        pre_handler: x?.pre_handler,
                        handler: x.handler,
                        post_handler: x?.post_handler
                    })
                })
            })

            return null
        })

        await Promise.all(_promise)

        return expose_routes
    }
}