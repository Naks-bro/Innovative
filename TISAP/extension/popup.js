const API_URL = 'http://localhost:8000/api/events';

const $ = (sel) => document.querySelector(sel);
const statusEl = $('#status');
const userIdInput = $('#userId');
const btnClick = $('#btnClick');
const btnReport = $('#btnReport');
const btnIgnore = $('#btnIgnore');

function setStatus(message, ok = true) {
  statusEl.textContent = message;
  statusEl.className = 'status ' + (ok ? 'ok' : 'err');
}

async function sendEvent(action) {
  const userId = userIdInput.value.trim();
  if (!userId) {
    setStatus('Please enter a User ID', false);
    userIdInput.focus();
    return;
  }

  // Persist user id for convenience
  try {
    if (chrome?.storage?.sync) {
      chrome.storage.sync.set({ tisap_user_id: userId });
    }
  } catch (_) {}

  const payload = {
    user_id: userId,
    campaign_id: 'camp-demo',
    scenario_id: 'ext-browser',
    channel: 'browser',
    action,
    timestamp: new Date().toISOString(),
  };

  // Disable buttons while sending
  [btnClick, btnReport, btnIgnore].forEach((b) => (b.disabled = true));
  setStatus('Sending...');

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      let bodyText = '';
      try {
        bodyText = await res.text();
      } catch (_) {}
      setStatus(`❌ Failed (HTTP ${res.status}) ${bodyText ? '- ' + bodyText : ''}`, false);
      return;
    }
    setStatus('✅ Sent');
    // Auto-reload after 3 seconds
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } catch (err) {
    console.error('Send failed', err);
    setStatus(`❌ Failed (Network) - ${err?.message || err}`, false);
  } finally {
    [btnClick, btnReport, btnIgnore].forEach((b) => (b.disabled = false));
  }
}

// Restore saved user id
try {
  if (chrome?.storage?.sync) {
    chrome.storage.sync.get(['tisap_user_id'], (res) => {
      if (res?.tisap_user_id) userIdInput.value = res.tisap_user_id;
    });
  }
} catch (_) {}

btnClick.addEventListener('click', () => sendEvent('link_clicked'));
btnReport.addEventListener('click', () => sendEvent('reported_simulation'));
btnIgnore.addEventListener('click', () => sendEvent('ignored'));
