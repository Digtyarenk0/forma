import React, { Component, ReactNode } from 'react'
import { Trans } from '@lingui/react/macro'

import { IS_DEVELOPMENT_ENVIRONMENT } from '@/shared/env'

import cls from './error-boundary.module.scss'

const errorMessageDynamicImport = 'Failed to fetch dynamically imported module:'

const KEY = 'APP_IS_AUTO_REALOAD'
const setIsAutoReloaded = (s: number) => localStorage.setItem(KEY, s.toString())

export interface ErrorBoundaryProps {
  children?: ReactNode
}

export interface ErrorBoundaryState {
  hasError: boolean
  isAutoUPD: boolean
  isChunkErr: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    isAutoUPD: false,
    isChunkErr: false
  }

  public componentDidCatch(error: Error) {
    const isAutoReload = (localStorage.getItem(KEY) || '0') !== '1'
    const isChunkErr = error.message.includes(errorMessageDynamicImport)
    if (isChunkErr && isAutoReload) {
      this.setState({
        hasError: true,
        isAutoUPD: true
      })
      setIsAutoReloaded(1)
      setTimeout(() => {
        location.reload()
      }, 10_000)
    } else {
      this.setState({
        hasError: true,
        isChunkErr: isChunkErr
      })
      setIsAutoReloaded(0)
      setTimeout(
        () => {
          location.reload()
        },
        IS_DEVELOPMENT_ENVIRONMENT ? 270_000 : 30_000
      )
    }
  }

  onClickHandler = () => location.reload()

  public render() {
    if (this.state.hasError) {
      return (
        <div data-test="error-boundary-wrapper">
          <div className={cls.errorWrapper}>
            <h2 className={cls.title}>
              <Trans>Service Temporarily Unavailable</Trans>
            </h2>
            <p className={cls.text}>
              <Trans>This page are you looking isn`t available. Try to reload again or use the button below.</Trans>
            </p>

            <button onClick={this.onClickHandler}>
              <Trans>Reload Page</Trans>
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
