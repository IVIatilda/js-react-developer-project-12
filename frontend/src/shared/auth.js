let authErrorHandler = null;

export function setAuthErrorHandler(handler) {
    authErrorHandler = handler;
}

export function handleAuthError() {
    if (authErrorHandler) {
        authErrorHandler();
    }
}
