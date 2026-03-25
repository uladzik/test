import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {
  state = { error: null }
  static getDerivedStateFromError(error: Error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: 'monospace', background: '#fee2e2', minHeight: '100vh' }}>
          <h1 style={{ color: '#dc2626' }}>Runtime Error</h1>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#7f1d1d' }}>{(this.state.error as Error).message}</pre>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#7f1d1d', fontSize: 12 }}>{(this.state.error as Error).stack}</pre>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
