// import winston from 'winston';

// const logger = winston.createLogger({
//     format: winston.format.combine(
//         winston.format.errors({ stack: true }),
//         winston.format.timestamp({
//             format: 'YYYY-MM-DD HH:mm:ss'
//         }),
//         winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`+(info.splat!==undefined?`${info.splat}`:" "))
//     ),
//     transports: [
//         new winston.transports.File({ filename: './logs/info.log', level: 'info' }),
//         new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
//     ],
// })

// logger.add(new winston.transports.Console({
//     format: winston.format.simple()
// }))

export default {
    // info: logger.info,
    // warn: logger.warn,
    // error: logger.error,

    info: (message?: any, ...optionalParams: any[]) => {
        console.log(message, optionalParams)
    },

    warn: (message?: any, ...optionalParams: any[]) => {
        console.log(message, optionalParams)
    },

    error: (message?: any, ...optionalParams: any[]) => {
        console.log(message, optionalParams)
    },

};