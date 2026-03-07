// Toggle accordion section open/closed
function toggleGroup(headerEl) {
  const group = headerEl.closest('.api-group');
  const isOpen = group.classList.contains('open');

  // Close all groups
  document.querySelectorAll('.api-group.open').forEach(g => {
    if (g !== group) g.classList.remove('open');
  });

  // Toggle clicked group
  group.classList.toggle('open', !isOpen);
}

// Initial status check and interval
document.addEventListener('DOMContentLoaded', () => {
  const first = document.querySelector('.api-group');
  if (first) first.classList.add('open');

  // Initial status check
  checkStatus();
  // Periodically check status every 30 seconds
  setInterval(checkStatus, 30000);

  // Manual Retry logic
  const retryBtn = document.getElementById('retry-btn');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      checkStatus();
      startCooldown();
    });
  }
});

const COOLDOWN_DURATION = 10; // 10 seconds
let cooldownTimer = null;

function startCooldown() {
  const retryBtn = document.getElementById('retry-btn');
  const timerSpan = retryBtn.querySelector('.cooldown-timer');
  let timeLeft = COOLDOWN_DURATION;

  retryBtn.disabled = true;
  timerSpan.textContent = `${timeLeft}s`;

  cooldownTimer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(cooldownTimer);
      retryBtn.disabled = false;
      timerSpan.textContent = '';
    } else {
      timerSpan.textContent = `${timeLeft}s`;
    }
  }, 1000);
}

function formatUptime(totalSeconds) {
  if (!totalSeconds || isNaN(totalSeconds)) return '0s';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(' ');
}

async function checkStatus() {
  const serverDot = document.getElementById('server-dot');
  const dbDot = document.getElementById('db-dot');
  const serverVal = document.getElementById('server-value');
  const dbVal = document.getElementById('db-value');
  const uptimeVal = document.getElementById('uptime-value');
  const lastCheckedVal = document.getElementById('last-checked-time');

  // ... (keep existing checking state logic) ...

  try {
    const response = await fetch('/health');
    const data = await response.json();

    // Update Uptime with formatting
    if (uptimeVal && data.uptime) {
      uptimeVal.textContent = formatUptime(data.uptime);
    }

    // Update Server Status
    const isServerOk = data.server === 'running';
    if (serverDot) serverDot.className = `card-status-dot ${isServerOk ? 'status-online' : 'status-offline'}`;
    if (serverVal) {
      serverVal.textContent = isServerOk ? 'Healthy' : 'Stopped';
      serverVal.className = `card-value ${isServerOk ? 'online' : 'offline'}`;
    }

    // Update DB Status
    const isDbConnected = data.database === 'connected';
    if (dbDot) dbDot.className = `card-status-dot ${isDbConnected ? 'status-online' : 'status-offline'}`;
    if (dbVal) {
      dbVal.textContent = isDbConnected ? 'Connected' : 'Disconnected';
      dbVal.className = `card-value ${isDbConnected ? 'online' : 'offline'}`;
    }

    // Update Last Checked
    if (lastCheckedVal) {
      lastCheckedVal.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

  } catch (error) {
    console.error('Health check failed:', error);
    if (serverDot) serverDot.className = 'card-status-dot status-offline';
    if (dbDot) dbDot.className = 'card-status-dot status-offline';
    if (serverVal) {
      serverVal.textContent = 'Unreachable';
      serverVal.className = 'card-value offline';
    }
    if (dbVal) {
      dbVal.textContent = 'Unreachable';
      dbVal.className = 'card-value offline';
    }
    if (uptimeVal) uptimeVal.textContent = '---';
    if (lastCheckedVal) {
      lastCheckedVal.textContent = 'Failed';
    }
  }
}
