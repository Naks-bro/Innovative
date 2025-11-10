import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface AppState {
  userEmail: string;
  status: string;
  statusType: 'idle' | 'success' | 'error';
}

class App extends React.Component<{}, AppState> {
  private API_URL = 'http://localhost:8000/api/events';
  private CAMPAIGN_ID = 'camp-mail';
  private SCENARIO_ID = 'outlook-addin';
  private CHANNEL = 'mail';

  constructor(props: {}) {
    super(props);
    this.state = {
      userEmail: 'Loading...',
      status: 'Ready',
      statusType: 'idle'
    };
  }

  componentDidMount() {
    Office.onReady(() => {
      this.getUserEmail();
    });
  }

  getUserEmail = () => {
    try {
      const userProfile = Office.context.mailbox.userProfile;
      this.setState({ userEmail: userProfile.emailAddress });
    } catch (error) {
      this.setState({ userEmail: 'user@company.com' });
    }
  };

  sendEvent = async (action: string) => {
    const { userEmail } = this.state;
    
    this.setState({ status: 'Sending...', statusType: 'idle' });

    const payload = {
      user_id: userEmail,
      campaign_id: this.CAMPAIGN_ID,
      scenario_id: this.SCENARIO_ID,
      channel: this.CHANNEL,
      action,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        this.setState({ 
          status: '✓ Event sent successfully!', 
          statusType: 'success' 
        });
        setTimeout(() => {
          this.setState({ status: 'Ready', statusType: 'idle' });
        }, 3000);
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error: any) {
      this.setState({ 
        status: `✗ Failed: ${error.message}`, 
        statusType: 'error' 
      });
    }
  };

  render() {
    const { userEmail, status, statusType } = this.state;

    const statusColor = 
      statusType === 'success' ? '#10b981' : 
      statusType === 'error' ? '#ef4444' : 
      '#6b7280';

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.icon}>🛡️</div>
          <div>
            <h2 style={styles.title}>TISAP Mail Agent</h2>
            <p style={styles.subtitle}>Security Awareness Training</p>
          </div>
        </div>

        <div style={styles.userInfo}>
          <span style={styles.label}>User:</span>
          <span style={styles.email}>{userEmail}</span>
        </div>

        <div style={styles.section}>
          <p style={styles.sectionTitle}>Simulate Actions:</p>
          
          <button 
            style={{...styles.button, ...styles.buttonPrimary}}
            onClick={() => this.sendEvent('mail_attachment_opened')}
          >
            📎 Open Attachment
          </button>

          <button 
            style={{...styles.button, ...styles.buttonWarning}}
            onClick={() => this.sendEvent('mail_link_clicked')}
          >
            🔗 Click Link
          </button>

          <button 
            style={{...styles.button, ...styles.buttonSuccess}}
            onClick={() => this.sendEvent('mail_reported_real')}
          >
            🚨 Report Suspicious Email
          </button>
        </div>

        <div style={{...styles.status, color: statusColor}}>
          {status}
        </div>

        <div style={styles.footer}>
          <small style={styles.footerText}>
            API: {this.API_URL}
          </small>
        </div>
      </div>
    );
  }
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '16px',
    backgroundColor: '#f9fafb',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: '#0284c7',
    borderRadius: '8px',
    marginBottom: '16px'
  },
  icon: {
    fontSize: '32px'
  },
  title: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white'
  },
  subtitle: {
    margin: 0,
    fontSize: '11px',
    color: 'rgba(255, 255, 255, 0.9)'
  },
  userInfo: {
    padding: '10px 12px',
    backgroundColor: 'white',
    borderRadius: '6px',
    marginBottom: '16px',
    fontSize: '13px',
    border: '1px solid #e5e7eb'
  },
  label: {
    fontWeight: '600',
    color: '#6b7280',
    marginRight: '8px'
  },
  email: {
    color: '#0d9488'
  },
  section: {
    marginBottom: '16px'
  },
  sectionTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '10px'
  },
  button: {
    width: '100%',
    padding: '12px',
    marginBottom: '8px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: 'white'
  },
  buttonPrimary: {
    backgroundColor: '#0d9488'
  },
  buttonWarning: {
    backgroundColor: '#f59e0b'
  },
  buttonSuccess: {
    backgroundColor: '#10b981'
  },
  status: {
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: '600',
    padding: '8px',
    minHeight: '24px'
  },
  footer: {
    marginTop: '16px',
    paddingTop: '12px',
    borderTop: '1px solid #e5e7eb',
    textAlign: 'center'
  },
  footerText: {
    fontSize: '10px',
    color: '#9ca3af'
  }
};

Office.onReady(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
});
