/* ═══════════════════════════════════════════════
   GONATRA MESSAGING — messages.js
   Chat system: conversations, real-time-feel chat,
   read receipts, typing indicator, profiles
   ═══════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────
   MESSAGING STATE
───────────────────────────────────────────── */
const msgState = {
  conversations: [...SEED_CONVERSATIONS.map(c => ({ ...c, messages: c.messages.map(m => ({...m})) }))],
  activeConvId: null,
  convSearch: "",
  profileOpen: false,
  pendingImage: null, // base64 data url staged for sending
};

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

// the "other" user id in a conversation, relative to current user
function otherUserId(conv) {
  if (!state.currentUser) return null;
  return conv.participants.find(p => p !== state.currentUser.id) || conv.participants[1];
}

function getChatUser(id) {
  return CHAT_USERS[id] || { id, name: "Unknown User", avatarColor: "#94a3b8", type: "buyer", online: false, lastSeen: Date.now(), bio: "" };
}

function fmtTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function fmtConvTime(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function fmtDateDivider(ts) {
  const d = new Date(ts);
  const today = new Date();
  const yesterday = new Date(); yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: d.getFullYear() !== today.getFullYear() ? "numeric" : undefined });
}

function lastMessage(conv) {
  return conv.messages[conv.messages.length - 1] || null;
}

function unreadCount(conv) {
  if (!state.currentUser) return 0;
  return conv.messages.filter(m => m.from !== state.currentUser.id && m.status !== "seen").length;
}

function totalUnreadCount() {
  return msgState.conversations
    .filter(c => state.currentUser && c.participants.includes(state.currentUser.id))
    .reduce((sum, c) => sum + unreadCount(c), 0);
}

function genMsgId() { return "m" + Date.now().toString(36) + Math.random().toString(36).slice(2,6); }

function isOnline(userId) {
  const u = getChatUser(userId);
  return u.online;
}

function statusLabel(userId) {
  const u = getChatUser(userId);
  if (u.online) return "Online";
  const diff = Date.now() - u.lastSeen;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Active just now";
  if (mins < 60) return `Active ${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `Active ${hrs}h ago`;
  return `Active ${Math.floor(hrs/24)}d ago`;
}

/* find or create a conversation with a given user, optionally linked to a product */
function findOrCreateConversation(otherId, productId = null) {
  if (!state.currentUser) return null;
  let conv = msgState.conversations.find(c =>
    c.participants.includes(state.currentUser.id) && c.participants.includes(otherId)
  );
  if (!conv) {
    conv = {
      id: "conv" + Date.now().toString(36),
      participants: [state.currentUser.id, otherId],
      productId: productId || null,
      messages: [],
    };
    msgState.conversations.unshift(conv);
  } else if (productId && !conv.productId) {
    conv.productId = productId;
  }
  return conv;
}

/* ─────────────────────────────────────────────
   NAV BADGE UPDATE
───────────────────────────────────────────── */
function updateMessagesBadge() {
  const btn = $("#messagesBtn");
  const badge = $("#msgBadge");
  const link = $("#messagesLink");

  if (!state.currentUser) {
    btn.style.display = "none";
    if (link) link.style.display = "none";
    return;
  }
  btn.style.display = "inline-flex";
  if (link) link.style.display = "block";

  const count = totalUnreadCount();
  if (count > 0) {
    badge.textContent = count > 9 ? "9+" : count;
    badge.style.display = "flex";
    badge.classList.add("badge-pulse");
  } else {
    badge.style.display = "none";
    badge.classList.remove("badge-pulse");
  }
}

/* ─────────────────────────────────────────────
   PAGE: MESSAGES
───────────────────────────────────────────── */
function renderMessagesPage() {
  const tpl = $("#tpl-messages");
  const app = $("#app");
  app.innerHTML = "";
  app.appendChild(tpl.content.cloneNode(true));

  msgState.profileOpen = false;

  renderConvList();
  bindMessagesPageEvents();

  // If a conversation was requested via routeParam (e.g. from "Message Seller")
  if (state.routeParam) {
    openConversation(state.routeParam);
  } else if (msgState.activeConvId) {
    // re-open previously active conversation
    const stillExists = msgState.conversations.find(c => c.id === msgState.activeConvId
      && c.participants.includes(state.currentUser.id));
    if (stillExists) openConversation(msgState.activeConvId);
  }
}

function bindMessagesPageEvents() {
  $("#convSearchInput").addEventListener("input", (e) => {
    msgState.convSearch = e.target.value;
    renderConvList();
  });

  $("#chatBackBtn").addEventListener("click", () => {
    $("#msgChat").classList.remove("mobile-open");
  });

  $("#profileCloseBtn").addEventListener("click", () => {
    msgState.profileOpen = false;
    $("#msgShell")?.classList.remove("profile-open");
    $(".msg-shell")?.classList.remove("profile-open");
  });

  $("#chatInfoBtn").addEventListener("click", toggleProfilePanel);
  $$("[data-action='view-profile']").forEach(el => el.addEventListener("click", toggleProfilePanel));

  // composer
  $("#sendMsgBtn").addEventListener("click", sendCurrentMessage);
  $("#chatInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); sendCurrentMessage(); }
  });
  $("#chatInput").addEventListener("input", () => {
    // simulate "user is typing" -> trigger other side typing back occasionally is handled on send
  });

  $("#attachImageBtn").addEventListener("click", () => $("#imageFileInput").click());
  $("#imageFileInput").addEventListener("change", handleImageSelect);
}

/* ─────────────────────────────────────────────
   CONVERSATION LIST
───────────────────────────────────────────── */
function getMyConversations() {
  if (!state.currentUser) return [];
  let convs = msgState.conversations.filter(c => c.participants.includes(state.currentUser.id));

  if (msgState.convSearch.trim()) {
    const q = msgState.convSearch.trim().toLowerCase();
    convs = convs.filter(c => {
      const other = getChatUser(otherUserId(c));
      const productMatch = c.productId && findProduct(c.productId)?.name.toLowerCase().includes(q);
      return other.name.toLowerCase().includes(q) || productMatch;
    });
  }

  // sort by last message time, most recent first
  convs.sort((a, b) => {
    const aLast = lastMessage(a)?.time || 0;
    const bLast = lastMessage(b)?.time || 0;
    return bLast - aLast;
  });
  return convs;
}

function renderConvList() {
  const listEl = $("#convList");
  const emptyEl = $("#convEmptyState");
  const totalEl = $("#convUnreadTotal");

  const convs = getMyConversations();

  // unread total badge in sidebar header
  const totalUnread = totalUnreadCount();
  if (totalUnread > 0) {
    totalEl.textContent = totalUnread > 9 ? "9+" : totalUnread;
    totalEl.style.display = "flex";
  } else {
    totalEl.style.display = "none";
  }

  if (convs.length === 0) {
    listEl.innerHTML = "";
    emptyEl.style.display = "block";
    return;
  }
  emptyEl.style.display = "none";

  listEl.innerHTML = convs.map(c => {
    const other = getChatUser(otherUserId(c));
    const last = lastMessage(c);
    const unread = unreadCount(c);
    const product = c.productId ? findProduct(c.productId) : null;

    let previewText = "No messages yet";
    if (last) {
      if (last.image && last.text) previewText = "📷 " + last.text;
      else if (last.image) previewText = "📷 Photo";
      else previewText = last.text;
      if (last.from === state.currentUser.id) previewText = "You: " + previewText;
    }

    return `
      <div class="conv-item ${c.id === msgState.activeConvId ? "active" : ""}" data-conv-id="${c.id}">
        <div class="conv-avatar-wrap">
          <div class="conv-avatar" style="background:${other.avatarColor}">${other.name.charAt(0)}</div>
          <span class="online-dot ${other.online ? "is-online" : ""}"></span>
        </div>
        <div class="conv-meta">
          <div class="conv-top-row">
            <span class="conv-name">${other.name}</span>
            <span class="conv-time">${last ? fmtConvTime(last.time) : ""}</span>
          </div>
          <div class="conv-preview-row">
            <span class="conv-preview ${unread > 0 ? "unread" : ""}">${previewText}</span>
            ${unread > 0 ? `<span class="conv-unread-badge">${unread > 9 ? "9+" : unread}</span>` : ""}
          </div>
          ${product ? `<span class="conv-product-tag">${product.image} ${product.name}</span>` : ""}
        </div>
      </div>
    `;
  }).join("");

  $$(".conv-item", listEl).forEach(item => {
    item.addEventListener("click", () => openConversation(item.dataset.convId));
  });
}
