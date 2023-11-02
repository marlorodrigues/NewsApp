import controller from './controllers'

const base = '/restaurants'

module.exports = {
    meta: {

    },
    routes: [
        { method: 'POST', url: `${base}`, handler: controller.create_restaurant },
    ]
}