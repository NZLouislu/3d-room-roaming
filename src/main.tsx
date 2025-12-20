import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root');

if (!rootElement) {
  document.body.innerHTML = '<div style="padding: 20px; font-family: sans-serif;"><h1>Error</h1><p>Root element not found. Please refresh the page.</p></div>';
  throw new Error('Root element not found');
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'sans-serif',
      backgroundColor: '#fee',
      border: '2px solid #c00',
      borderRadius: '8px',
      margin: '20px'
    }}>
      <h1 style={{ color: '#c00' }}>Application Error</h1>
      <p><strong>Error:</strong> {error.message}</p>
      <details style={{ marginTop: '10px' }}>
        <summary>Stack Trace</summary>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '10px', 
          overflow: 'auto',
          fontSize: '12px'
        }}>
          {error.stack}
        </pre>
      </details>
      <button 
        onClick={() => window.location.reload()} 
        style={{
          marginTop: '15px',
          padding: '10px 20px',
          backgroundColor: '#c00',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Reload Page
      </button>
    </div>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#1e293b',
      color: 'white',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid rgba(255,255,255,0.3)',
          borderTop: '4px solid white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }} />
        <h2>Loading 3D Experience...</h2>
        <p style={{ color: '#94a3b8', marginTop: '10px' }}>Please wait while we initialize the application</p>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render application:', error);
  rootElement.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif; background-color: #fee; border: 2px solid #c00; border-radius: 8px; margin: 20px;">
      <h1 style="color: #c00;">Fatal Error</h1>
      <p>Failed to initialize the application. Please try refreshing the page.</p>
      <p><strong>Error:</strong> ${error instanceof Error ? error.message : String(error)}</p>
      <button onclick="window.location.reload()" style="margin-top: 15px; padding: 10px 20px; background-color: #c00; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Reload Page
      </button>
    </div>
  `;
}
