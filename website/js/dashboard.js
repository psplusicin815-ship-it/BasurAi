// =============================================
//  BasurAi Dashboard JavaScript
// =============================================

let currentGuildId = null;
let currentPage = 'welcome';
let guildCache = null;

const API = CONFIG.API_URL + '/api';
const HEADERS = {
  'Content-Type': 'application/json',
  'x-api-key': CONFIG.API_KEY,
};

// ── Init ──────────────────────────────────────
window.addEventListener('DOMContentLoaded', async () => {
  await loadGuilds();
});

// ── Page Navigation ───────────────────────────
function showPage(page) {
  currentPage = page;
  document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(el => {
    if (el.getAttribute('onclick')?.includes(page)) el.classList.add('active');
  });

  document.getElementById('page-welcome').style.display = page === 'welcome' ? 'block' : 'none';
  document.getElementById('page-autorole').style.display = page === 'autorole' ? 'block' : 'none';

  if (currentGuildId) loadGuildData(currentGuildId);
}

// ── Loading ───────────────────────────────────
function setLoading(val) {
  document.getElementById('loading').classList.toggle('show', val);
}

// ── Alerts ────────────────────────────────────
function showAlert(type, message) {
  const el = document.getElementById(`alert-${type}`);
  el.textContent = type === 'success' ? `✅ ${message}` : `❌ ${message}`;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3500);
}

// ── Load Guilds ───────────────────────────────
async function loadGuilds() {
  setLoading(true);
  try {
    const res = await fetch(`${API}/dashboard/guilds`, { headers: HEADERS });
    if (!res.ok) throw new Error(await res.text());
    const guilds = await res.json();

    const select = document.getElementById('guild-select');
    select.innerHTML = '<option value="">— Sunucu seçin —</option>';

    guilds.forEach(g => {
      const opt = document.createElement('option');
      opt.value = g.guildId;
      opt.textContent = g.guildName || `Sunucu (${g.guildId})`;
      select.appendChild(opt);
    });

    if (guilds.length === 0) {
      select.innerHTML = '<option value="">Bot henüz hiçbir sunucuda değil</option>';
    }
  } catch (err) {
    console.error('Guild listesi alınamadı:', err);
    showAlert('error', 'API bağlantısı kurulamadı. config.js dosyasındaki API_URL adresinizi kontrol edin.');
  } finally {
    setLoading(false);
  }
}

// ── Guild Change ──────────────────────────────
async function onGuildChange() {
  const select = document.getElementById('guild-select');
  currentGuildId = select.value || null;
  guildCache = null;

  if (!currentGuildId) {
    showNoServer();
    return;
  }

  await loadGuildData(currentGuildId);
}

function showNoServer() {
  document.getElementById('welcome-no-server').style.display = 'flex';
  document.getElementById('welcome-settings').style.display = 'none';
  document.getElementById('autorole-no-server').style.display = 'flex';
  document.getElementById('autorole-settings').style.display = 'none';
}

// ── Load Guild Data ───────────────────────────
async function loadGuildData(guildId) {
  setLoading(true);
  try {
    // Load cache (channels + roles) and settings in parallel
    const [cacheRes, settingsRes] = await Promise.all([
      fetch(`${API}/bot/guild/${guildId}/cache`),
      fetch(`${API}/bot/guild/${guildId}/settings`),
    ]);

    if (!cacheRes.ok || !settingsRes.ok) throw new Error('Veri alınamadı');

    guildCache = await cacheRes.json();
    const settings = await settingsRes.json();

    if (currentPage === 'welcome') {
      populateWelcomePage(guildCache, settings);
    } else {
      populateAutorolePage(guildCache, settings);
    }
  } catch (err) {
    console.error('Guild verisi alınamadı:', err);
    showAlert('error', 'Sunucu verisi alınamadı: ' + err.message);
  } finally {
    setLoading(false);
  }
}

// ── Welcome Page ──────────────────────────────
function populateWelcomePage(cache, settings) {
  document.getElementById('welcome-no-server').style.display = 'none';
  document.getElementById('welcome-settings').style.display = 'block';

  // Toggle
  document.getElementById('welcome-enabled').checked = settings.welcomeEnabled ?? false;
  updateWelcomeBadge();

  // Channels (text only: type 0)
  const channelSelect = document.getElementById('welcome-channel');
  const textChannels = (cache.channels || []).filter(c => c.type === 0);
  channelSelect.innerHTML = '<option value="">— Kanal seçin —</option>';
  textChannels.forEach(ch => {
    const opt = document.createElement('option');
    opt.value = ch.id;
    opt.textContent = `# ${ch.name}`;
    if (ch.id === settings.welcomeChannelId) opt.selected = true;
    channelSelect.appendChild(opt);
  });

  // Message
  document.getElementById('welcome-message').value =
    settings.welcomeMessage || 'Sunucumuza hoş geldin, {user}! 🎉';
}

function updateWelcomeBadge() {
  const on = document.getElementById('welcome-enabled').checked;
  const badge = document.getElementById('welcome-status-badge');
  badge.textContent = on ? '⬤ Açık' : '⬤ Kapalı';
  badge.className = 'status-badge ' + (on ? 'on' : 'off');
}

async function saveWelcome() {
  if (!currentGuildId) return showAlert('error', 'Lütfen önce bir sunucu seçin.');

  const body = {
    welcomeEnabled: document.getElementById('welcome-enabled').checked,
    welcomeChannelId: document.getElementById('welcome-channel').value || null,
    welcomeMessage: document.getElementById('welcome-message').value.trim() ||
      'Sunucumuza hoş geldin, {user}! 🎉',
  };

  setLoading(true);
  try {
    const res = await fetch(`${API}/bot/guild/${currentGuildId}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(await res.text());
    showAlert('success', 'Hoşgeldin ayarları kaydedildi!');
  } catch (err) {
    showAlert('error', 'Kayıt başarısız: ' + err.message);
  } finally {
    setLoading(false);
  }
}

// ── Autorole Page ─────────────────────────────
function populateAutorolePage(cache, settings) {
  document.getElementById('autorole-no-server').style.display = 'none';
  document.getElementById('autorole-settings').style.display = 'block';

  // Toggle
  document.getElementById('autorole-enabled').checked = settings.autoRoleEnabled ?? false;
  updateAutoroleBadge();

  // Roles
  const roleSelect = document.getElementById('autorole-role');
  const roles = (cache.roles || []).filter(r => r.name !== '@everyone');
  roleSelect.innerHTML = '<option value="">— Rol seçin —</option>';
  roles.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.id;
    // Show color dot if has color
    const colorHex = r.color ? '#' + r.color.toString(16).padStart(6, '0') : null;
    opt.textContent = (colorHex && r.color !== 0 ? '● ' : '') + r.name;
    if (colorHex && r.color !== 0) opt.style.color = colorHex;
    if (r.id === settings.autoRoleId) opt.selected = true;
    roleSelect.appendChild(opt);
  });
}

function updateAutoroleBadge() {
  const on = document.getElementById('autorole-enabled').checked;
  const badge = document.getElementById('autorole-status-badge');
  badge.textContent = on ? '⬤ Açık' : '⬤ Kapalı';
  badge.className = 'status-badge ' + (on ? 'on' : 'off');
}

async function saveAutorole() {
  if (!currentGuildId) return showAlert('error', 'Lütfen önce bir sunucu seçin.');

  const body = {
    autoRoleEnabled: document.getElementById('autorole-enabled').checked,
    autoRoleId: document.getElementById('autorole-role').value || null,
  };

  setLoading(true);
  try {
    const res = await fetch(`${API}/bot/guild/${currentGuildId}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(await res.text());
    showAlert('success', 'Otomatik rol ayarları kaydedildi!');
  } catch (err) {
    showAlert('error', 'Kayıt başarısız: ' + err.message);
  } finally {
    setLoading(false);
  }
}
