import logger from './logger'

type UncaughtExceptionOrigin = 'uncaughtException' | 'unhandledRejection';
type UncaughtExceptionListener = (error: Error, origin: UncaughtExceptionOrigin) => void;

export = {
    SIGINT: () => {
        logger.info('API Node Stopped with success!')
        process.exit(0)
    },

    uncaughtException: (error: Error, origin: UncaughtExceptionListener) => {
        logger.error(`Uncaught Exception: ${error} - ${origin}`)
        process.exit(0)
    },

    unhandledRejection: (reason: any, promise: Promise<any>) => {
        logger.error(`Unhandled Rejection: ${reason} - ${promise}`)
        promise.catch((error) => {
            logger.error(`CATCH - Unhandled Rejection: ${error.message} - ${error.stack}`)
        })
        process.exit(0)
    }
}