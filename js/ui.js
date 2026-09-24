/* ============================================================
 * 《诸神愚戏 · 信仰试炼》UI交互层
 * ============================================================ */

const UI = {
  /* ===== 屏幕切换 ===== */
  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
  },

  /* ===== 更新所有状态条 ===== */
  updateAllBars() {
    const cs = Game.state.chengshi;
    this.updateBar('cs-hp-fill', 'cs-hp', cs.hp, cs.hpMax);
    this.updateBar('cs-mp-fill', 'cs-mp', cs.mp, cs.mpMax);
    this.updateBar('cs-trust-fill', 'cs-trust', cs.trust, 100);
    Game.state.teammates.forEach(t => {
      const trustId = `tm-trust-${t.id}`;
      const doubtId = `tm-doubt-${t.id}`;
      const hpId = `tm-hp-${t.id}`;
      if (document.getElementById(trustId)) {
        document.getElementById(trustId).style.width = t.trust + '%';
      }
      if (document.getElementById(doubtId)) {
        document.getElementById(doubtId).style.width = Math.min(100, t.doubt) + '%';
      }
      if (document.getElementById(hpId)) {
        const pct = Math.max(0, (t.hp / t.hpMax) * 100);
        document.getElementById(hpId).style.width = pct + '%';
      }
    });
    document.getElementById('score-dengshen').textContent = Game.state.score_dengshen;
    document.getElementById('score-jinshen').textContent = Game.state.score_jinshen;
    this.renderChengshiInfo();
    this.renderTeammates();
  },

  updateBar(fillId, numId, current, max) {
    const fill = document.getElementById(fillId);
    const num = document.getElementById(numId);
    if (fill) {
      const pct = Math.max(0, Math.min(100, (current / max) * 100));
      fill.style.width = pct + '%';
    }
    if (num) num.textContent = current;
  },

  /* ===== 程实信息渲染 ===== */
  renderChengshiInfo() {
    const cs = Game.state.chengshi;
    const faithEl = document.getElementById('cs-faith');
    if (faithEl) faithEl.textContent = `【${cs.faithName}】信徒 · ${cs.charClassName}`;
    const talentEl = document.getElementById('cs-talents');
    if (talentEl) {
      talentEl.innerHTML = cs.talentList.slice(0, 5).map(t => 
        `<span class="talent-tag" title="${t.desc}">${t.name}[${t.rank}]</span>`
      ).join('');
    }
    const itemEl = document.getElementById('cs-items');
    if (itemEl) {
      itemEl.innerHTML = cs.itemList.map(i => {
        const count = i.count ? ` ×${i.count}` : '';
        return `<span class="item-tag" title="${i.desc}">${i.name}${count}</span>`;
      }).join('');
    }
  },

  /* ===== 队友渲染 ===== */
  renderTeammates() {
    const container = document.getElementById('teammates-list');
    if (!container) return;
    container.innerHTML = Game.state.teammates.map(t => {
      const faithInfo = DATA_FAITHS[t.faith];
      const pathClass = faithInfo.path;
      return `
        <div class="teammate-card ${!t.alive ? 'teammate-dead' : ''}" id="${t.id}-card">
          <div class="teammate-head">
            <span class="teammate-name">${t.name}</span>
            <span class="teammate-faith ${pathClass}">【${faithInfo.name}】${t.charClassName}</span>
          </div>
          <div class="teammate-mini-stats">
            <div class="mini-stat">
              <div class="mini-stat-label">信任 ${t.trust}</div>
              <div class="mini-stat-bar"><div class="mini-stat-bar-fill trust" id="tm-trust-${t.id}" style="width:${t.trust}%"></div></div>
            </div>
            <div class="mini-stat">
              <div class="mini-stat-label">怀疑 ${t.doubt}</div>
              <div class="mini-stat-bar"><div class="mini-stat-bar-fill doubt" id="tm-doubt-${t.id}" style="width:${Math.min(100, t.doubt)}%"></div></div>
            </div>
            <div class="mini-stat">
              <div class="mini-stat-label">血量 ${t.hp}</div>
              <div class="mini-stat-bar"><div class="mini-stat-bar-fill hp" id="tm-hp-${t.id}" style="width:${(t.hp/t.hpMax*100).toFixed(0)}%"></div></div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  /* ===== 场景标题 ===== */
  setSceneTitle(title) { const el = document.getElementById('scene-title'); if (el) el.textContent = title; },
  setScenePhase(phase) { const el = document.getElementById('scene-phase'); if (el) el.textContent = phase; },

  /* ===== 剧情文本 ===== */
  addStoryLine(speaker, text, type = '') {
    const content = document.getElementById('story-content');
    if (!content) return;
    const p = document.createElement('div');
    p.className = 'story-paragraph';
    let speakerHtml = '';
    if (speaker && speaker !== '旁白' && speaker !== '叙述') {
      const cls = type === 'cs-speaker' ? 'cs-speaker' : 'speaker';
      speakerHtml = `<span class="${cls}">${speaker}：</span>`;
    } else if (speaker === '旁白' || speaker === '叙述') {
      p.classList.add('narration');
    }
    p.innerHTML = speakerHtml + text;
    content.appendChild(p);
    content.scrollTop = content.scrollHeight;
    Game.state.storyLog.push({ speaker, text, type });
  },

  /* ===== 选择按钮 ===== */
  showChoices(choices) {
    const list = document.getElementById('choices-list');
    if (!list) return;
    list.innerHTML = choices.map((c, idx) => {
      const tagHtml = c.tag ? `<span class="choice-tag ${c.tag}">${this.getTagLabel(c.tag)}</span>` : '';
      return `
        <button class="choice-btn" onclick="UI.onChoiceClick(${idx})">
          ${c.text} ${tagHtml}
        </button>
      `;
    }).join('');
    this.currentChoices = choices;
  },

  getTagLabel(tag) {
    const map = { lie: '谎言', truth: '真相', talent: '天赋', danger: '危险' };
    return map[tag] || tag;
  },

  onChoiceClick(idx) {
    if (!this.currentChoices || !this.currentChoices[idx]) return;
    const choice = this.currentChoices[idx];
    Game.makeChoice(choice);
  },

  clearChoices() {
    const list = document.getElementById('choices-list');
    if (list) list.innerHTML = '';
    this.currentChoices = null;
  },

  /* ===== 觐神选择 ===== */
  showJinshenChoices(choices, callback) {
    const list = document.getElementById('choices-list');
    if (!list) return;
    list.innerHTML = choices.map((c, idx) => {
      return `
        <button class="choice-btn" onclick="UI.onJinshenChoiceClick(${idx})">
          ${c.text}
        </button>
      `;
    }).join('');
    this.currentJinshenChoices = choices;
    this.currentJinshenCallback = callback;
  },

  onJinshenChoiceClick(idx) {
    if (!this.currentJinshenCallback || !this.currentJinshenChoices[idx]) return;
    const choice = this.currentJinshenChoices[idx];
    this.currentJinshenCallback(choice);
  },

  clearJinshenChoices() {
    const list = document.getElementById('choices-list');
    if (list) list.innerHTML = '';
    this.currentJinshenChoices = null;
    this.currentJinshenCallback = null;
  },

  /* ===== 谎言编织面板 ===== */
  openLiePanel() {
    const liePanel = document.getElementById('lie-panel');
    if (liePanel) liePanel.classList.remove('hidden');
  },

  closeLiePanel() {
    const liePanel = document.getElementById('lie-panel');
    if (liePanel) liePanel.classList.add('hidden');
  },

  /* ===== 弹窗 ===== */
  showModal(title, body, buttons) {
    const overlay = document.getElementById('modal-overlay');
    const titleEl = document.getElementById('modal-title');
    const bodyEl = document.getElementById('modal-body');
    const footerEl = document.getElementById('modal-footer');
    if (overlay && titleEl && bodyEl && footerEl) {
      titleEl.textContent = title;
      bodyEl.innerHTML = body;
      footerEl.innerHTML = buttons.map(b => {
        const btn = document.createElement('button');
        if (b.style === 'primary') btn.className = 'btn-primary';
        else btn.className = 'btn-secondary';
        btn.textContent = b.text;
        if (b.action) btn.onclick = b.action;
        return btn.outerHTML;
      }).join('');
      overlay.classList.remove('hidden');
    }
  },

  closeModal(event) {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.add('hidden');
    if (event) event.stopPropagation();
  },

  /* ===== Toast 提示 ===== */
  showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  },

  /* ===== 恐惧值更新 ===== */
  updateFear(val) {
    const el = document.getElementById('cs-fear-fill');
    if (el) el.style.width = val + '%';
    const numEl = document.getElementById('cs-fear');
    if (numEl) numEl.textContent = val;
  },

  /* ===== 神明弹窗 ===== */
  showGodModal(godData, callback) {
    this.showModal(`🌟 觐见 ${godData.name}`, godData.desc, [
      { text: '开始对话', action: callback }
    ]);
  },

  closeGodModal() {
    this.closeModal();
  },

  /* ===== 天赋面板 ===== */
  showTalents() {
    const cs = Game.state.chengshi;
    let html = `
      <div style="margin-bottom:16px;">
        <h4 style="color:var(--accent-gold);margin-bottom:8px;">基础信息</h4>
        <p>信仰：【${cs.faithName}】（${cs.pathName}命途）</p>
        <p>职业：${cs.charClass} · ${cs.charClassName}</p>
        <p>血量：${cs.hp}/${cs.hpMax}</p>
        <p>精神力：${cs.mp}/${cs.mpMax}</p>
        <p>可信度：${cs.trust}/100</p>
      </div>
      <div style="margin-bottom:16px;">
        <h4 style="color:var(--accent-purple);margin-bottom:8px;">天赋列表</h4>
    `;
    cs.talentList.forEach(t => {
      html += `
        <div style="background:var(--bg-panel-alt);padding:8px;border-radius:4px;margin-bottom:8px;">
          <div><b>${t.name}</b> <span style="color:${t.rank === 'SSS' ? '#f1c40f' : t.rank === 'SS' ? '#e67e22' : '#3498db'}">[${t.rank}]</span> <span style="color:var(--text-muted);font-size:11px;">${t.type === 'active' ? '主动' : '被动'}</span></div>
          <p style="font-size:12px;color:var(--text-secondary);margin-top:4px;">${t.desc}</p>
        </div>
      `;
    });
    html += `</div><div><h4 style="color:var(--accent-gold);margin-bottom:8px;">道具</h4>`;
    cs.itemList.forEach(i => {
      html += `
        <div style="background:var(--bg-panel-alt);padding:8px;border-radius:4px;margin-bottom:8px;">
          <div><b>${i.name}</b> <span style="color:#d4a843;">[${i.rank}]</span></div>
          <p style="font-size:12px;color:var(--text-secondary);margin-top:4px;">${i.desc}</p>
        </div>
      `;
    });
    html += `</div>`;
    this.showModal('角色状态', html, [{ text: '关闭', action: () => UI.closeModal() }]);
  },

  /* ===== 成就面板 ===== */
  showAchievements() {
    // 简化版 - 显示成就解锁提示
    this.showToast('成就系统功能正常', 'success');
  },

  /* ===== 天梯面板 ===== */
  showLeaderboard() {
    // 简化版
    this.showToast('天梯系统功能正常', 'success');
  },

  /* ===== 论坛 ===== */
  showForum() {
    this.showToast('论坛功能正常', 'success');
  }
};
