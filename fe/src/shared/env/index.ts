import { toast } from 'react-toastify'

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production'
}

const IS_DEVELOPMENT = import.meta.env.REACT_APP_ENVIRONMENT === Environment.DEVELOPMENT

export const ENV = {
  REACT_APP_ENVIRONMENT: import.meta.env.REACT_APP_ENVIRONMENT as Environment
}

if (IS_DEVELOPMENT) {
  const REACT_APP_ENVIRONMENT_STORAGE = localStorage.getItem('REACT_APP_ENVIRONMENT') as Environment

  if (ENV.REACT_APP_ENVIRONMENT) {
    if (!REACT_APP_ENVIRONMENT_STORAGE) {
      localStorage.setItem('REACT_APP_ENVIRONMENT', ENV.REACT_APP_ENVIRONMENT as string)
    } else if (REACT_APP_ENVIRONMENT_STORAGE !== ENV.REACT_APP_ENVIRONMENT) {
      ENV.REACT_APP_ENVIRONMENT = REACT_APP_ENVIRONMENT_STORAGE
      toast.info(
        `REACT_APP_ENVIRONMENT was changed from "${import.meta.env.REACT_APP_ENVIRONMENT}" to "${
          ENV.REACT_APP_ENVIRONMENT
        }"`
      )
    }
  }
}

export const IS_DEVELOPMENT_ENVIRONMENT = ENV.REACT_APP_ENVIRONMENT === Environment.DEVELOPMENT
export const IS_PRODUCTION_ENVIRONMENT = ENV.REACT_APP_ENVIRONMENT === Environment.PRODUCTION
