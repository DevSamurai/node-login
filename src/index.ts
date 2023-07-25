import App from '@/app'

import config from '@/config'

new App(config.nodeEnv).listen(config.port)
