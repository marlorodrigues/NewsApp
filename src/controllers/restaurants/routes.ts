import controller from './controllers'

const base = '/restaurants'

module.exports = {
    meta: {

    },
    routes: [
        { method: 'GET', url: `${base}`, handler: controller.restaurants },
        { method: 'POST', url: `${base}`, handler: controller.create_restaurant },
    ]
}