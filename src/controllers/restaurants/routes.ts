import controller from './controllers'

const base = '/restaurants'

module.exports = {
    meta: {

    },
    routes: [      
        { method: 'GET', url: `${base}`, handler: controller.restaurants },

        { method: 'GET', url: `${base}/info`, handler: controller.restaurant_data },

        { method: 'POST', url: `${base}`, handler: controller.create_restaurant },

        { method: 'DELETE', url: `${base}`, handler: controller.delete_restaurant },
    ]
}