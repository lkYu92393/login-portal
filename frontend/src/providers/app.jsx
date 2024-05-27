
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from '../lib/auth'

const ErrorFallback = () => {
    return (
        <div
            className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
            role="alert"
        >
            <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
            <input type="button" onClick={() => window.location.assign(window.location.origin)} value='Refresh' />
        </div>
    );
};

const AppProvider = ({ children }) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AuthProvider>
                <Router>{children}</Router>
            </AuthProvider>
        </ErrorBoundary>
    )
}

export default AppProvider