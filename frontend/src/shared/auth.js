// eslint-disable-next-line functional/no-let
let authErrorHandler = null;

export function setAuthErrorHandler(handler) {
  authErrorHandler = handler;
}

export function handleAuthError() {
  if (authErrorHandler) {
    authErrorHandler();
  }
}
