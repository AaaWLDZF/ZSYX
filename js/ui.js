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
    
    // 程实属性
    this.updateBar('cs-hp-fill', 'cs-hp', cs.hp, cs.hpMax);
    this.updateBar('cs-mp-fill', 'cs-mp', cs.mp, cs.mpMax);
    this.updateBar('cs-trust-fill', 'cs-trust', cs.trust, 100);
    
    // 队友
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
    
    // 分数
    document.getElementById('score-dengshen').textContent = Game.state.score_dengshen;
    document.getElementById('score-jinshen').textContent = Game.state.score_jinshen;
    
    // 天赋/道具
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
    
    // 信仰标签
    const faithEl = document.getElementById('cs-faith');
    if (faithEl) faithEl.textContent = `【${cs.faithName}】信徒 · ${cs.charClassName}`;
    
    // 天赋标签
    const talentEl = document.getElementById('cs-talents');
    if (talentEl) {
      talentEl.innerHTML = cs.talentList.slice(0, 5).map(t => 
        `<span class="talent-tag" title="${t.desc}">${t.name}[${t.rank}]</span>`
      ).join('');
    }
    
    // 道具标签
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
  setSceneTitle(title) {
    const el = document.getElementById('scene-title');
    if (el) el.textContent = title;
  },

  setScenePhase(phase) {
    const el = document.getElementById('scene-phase');
    if (el) el.textContent = phase;
  },

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
    
    // 自动滚动到底部
    content.scrollTop = content.scrollHeight;
    
    // 保存到游戏状态日志
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
    const map = {
      lie: '谎言',
      truth: '真相',
      talent: '天赋',
      danger: '危险'
    };
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
        <button class="choice-btn jinshen-choice" data-idx="${idx}">
          ${c.text}
        </button>
      `;
    }).join('');
    
    // 绑定点击
    list.querySelectorAll('.jinshen-choice').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.idx);
        callback(choices[idx]);
        this.clearChoices();
      };
    });
  },

  /* ===== 谎言编织面板 ===== */
  openLiePanel() {
    const panel = document.getElementById('lie-panel');
    const options = document.getElementById('lie-options');
    const hint = document.getElementById('lie-hint');
    
    if (!panel) return;
    
    hint.textContent = '选择你要编织的谎言类型（消耗精神力，效果随机）：';
    
    const lies = [
      { text: '对队友编造"前方安全"的假象', mpCost: 10, desc: '提升全队勇气，降低恐惧' },
      { text: '对敌人/恐魔编造"我们很强大"的假象', mpCost: 15, desc: '有几率让敌人撤退' },
      { text: '对所有人编造"我们有大神器"的假象', mpCost: 25, desc: '大幅提升队友信任度' },
      { text: '编造"某某队友是神明特使"的谎言', mpCost: 20, desc: '随机提升或降低某队友信任' }
    ];
    
    options.innerHTML = lies.map((l, idx) => `
      <button class="lie-option-btn" data-idx="${idx}">
        <b>${l.text}</b>
        <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">精神 -${l.mpCost} · ${l.desc}</div>
      </button>
    `).join('');
    
    options.querySelectorAll('.lie-option-btn').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.idx);
        const lie = lies[idx];
        Game.closeLiePanel();
        Game.state.chengshi.mp -= lie.mpCost;
        Game.addStoryLine('程实', lie.text + '（你启动了谎言编织）', 'cs-speaker');
        // 随机效果
        const roll = Math.random();
        if (roll < 0.6) {
          Game.addStoryLine('旁白', '谎言生效了！队友们开始相信你的话。', 'narration');
          Game.state.teammates.forEach(t => {
            if (t.alive) t.trust = Math.min(100, t.trust + 3);
          });
          this.showToast('谎言成功！队友信任+3', 'success');
        } else {
          Game.addStoryLine('旁白', '有人开始怀疑你……谎言似乎有漏洞。', 'narration');
          const doubtTeammate = Game.state.teammates.find(t => t.alive);
          if (doubtTeammate) doubtTeammate.doubt += 10;
          this.showToast('谎言被部分识破！队友怀疑+10', 'error');
        }
        this.updateAllBars();
      };
    });
    
    panel.classList.remove('hidden');
  },

  closeLiePanel() {
    const panel = document.getElementById('lie-panel');
    if (panel) panel.classList.add('hidden');
  },

  /* ===== 恐惧值更新 ===== */
  updateFear(value) {
    const fill = document.getElementById('cs-fear-fill');
    const num = document.getElementById('cs-fear');
    if (fill) fill.style.width = Math.min(100, Math.max(0, value)) + '%';
    if (num) num.textContent = value;
  },

  /* ===== 弹窗 ===== */
  showModal(title, body, buttons) {
    const overlay = document.getElementById('modal-overlay');
    const titleEl = document.getElementById('modal-title');
    const bodyEl = document.getElementById('modal-body');
    const footerEl = document.getElementById('modal-footer');
    
    if (!overlay) return;
    
    titleEl.textContent = title;
    bodyEl.innerHTML = body || '';
    
    footerEl.innerHTML = '';
    if (buttons && buttons.length > 0) {
      buttons.forEach(btn => {
        const b = document.createElement('button');
        b.className = btn.style === 'primary' ? 'btn-primary' : 'btn-secondary';
        b.textContent = btn.text;
        b.onclick = btn.action;
        footerEl.appendChild(b);
      });
    }
    
    overlay.classList.remove('hidden');
  },

  closeModal(event) {
    // 如果是点击遮罩关闭
    if (event && event.target.id === 'modal-overlay') {
      document.getElementById('modal-overlay').classList.add('hidden');
      return;
    }
    // 点击关闭按钮
    if (!event || event.type === 'click' && event.target.classList?.contains('modal-close')) {
      document.getElementById('modal-overlay').classList.add('hidden');
    }
    // 通过直接调用
    if (event === undefined || event === null) {
      document.getElementById('modal-overlay').classList.add('hidden');
    }
  },

  /* ===== 神明展示弹窗 ===== */
  showGodModal(godData, onClose) {
    this.godModalCallback = onClose;
    
    const html = `
      <div class="god-display">
        <div class="god-icon" style="color:${godData.color};">${godData.icon}</div>
        <div class="god-name">【${godData.name}】</div>
        <div class="god-title">${godData.personality}</div>
        <div class="god-stats">
          <div class="god-stat">
            <div class="god-stat-label">耐心值</div>
            <div class="god-stat-bar"><div class="god-stat-bar-fill patience" id="god-patience" style="width:70%;"></div></div>
          </div>
          <div class="god-stat">
            <div class="god-stat-label">欣赏值</div>
            <div class="god-stat-bar"><div class="god-stat-bar-fill appreciation" id="god-appreciation" style="width:30%;"></div></div>
          </div>
        </div>
      </div>
      <div style="font-size:12px;color:var(--text-muted);text-align:center;margin-top:10px;">
        <b style="color:var(--accent-gold);">形象：</b>${godData.appearance}
      </div>
      <div style="font-size:12px;color:var(--text-muted);text-align:center;margin-top:6px;">
        <b style="color:var(--accent-purple);">厌恶：</b>${godData.hatred}
      </div>
      <div style="margin-top:16px;text-align:center;">
        <p class="choice-reminder">你感到祂的目光落在你身上……小心应对</p>
      </div>
    `;
    
    this.showModal(`🌟 觐见神明：${godData.name}`, html, []);
    
    // 触发回调（延迟以让用户看到弹窗）
    setTimeout(() => {
      if (this.godModalCallback) {
        this.godModalCallback();
        this.godModalCallback = null;
      }
    }, 1500);
  },

  closeGodModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
  },

  /* ===== Toast ===== */
  showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  },

  /* ===== 打字指示器 ===== */
  showTyping() {
    document.getElementById('typing-indicator')?.classList.remove('hidden');
  },

  hideTyping() {
    document.getElementById('typing-indicator')?.classList.add('hidden');
  }
};

// 启动时渲染初始UI
window.addEventListener('load', () => {
  // 检查是否有存档，更新按钮状态
  const continueBtn = document.querySelector('.btn-secondary');
  if (continueBtn) {
    if (!Game.hasSave()) {
      continueBtn.style.opacity = '0.4';
      continueBtn.style.pointerEvents = 'none';
      continueBtn.textContent = '暂无存档';
    }
  }
});
