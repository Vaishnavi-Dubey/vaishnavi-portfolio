import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>
                    <h2>Something went wrong loading the 3D scene.</h2>
                    <p>Please refresh or try a different browser.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
