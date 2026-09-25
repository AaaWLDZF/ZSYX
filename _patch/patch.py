import hashlib

def fail(msg):
    print('PATCH_FAIL:', msg)
    raise SystemExit(1)

def blob_sha(data):
    return hashlib.sha1(b'blob %d\x00' % len(data) + data).hexdigest()

EXP_H_NEW = '6de07dee7f729dc1c50a85320f8a5863f23fe6dd'
EXP_H_OLD = 'b04ad23004e3387a3a384cedeb1bce9e1a0af504'
EXP_C_NEW = '6c314b4b720c89c613cf97eba8889bc4c77a48f2'
EXP_C_OLD = '4df6442fa9acce0432f72dd19de3a96c6c1c56f4'
OLD_EYE = '      <div class="eye-icon">\n        <div class="eye-layer eye-outer"></div>\n        <div class="eye-layer eye-mid"></div>\n        <div class="eye-layer eye-inner"></div>\n        <div class="eye-layer eye-pupil"></div>\n        <div class="eye-layer eye-glow"></div>\n        <div class="eye-layer eye-vignette"></div>\n      </div>'
NEW_EYE = '      <svg class="eye-svg" viewBox="0 0 220 170" aria-hidden="true">\n        <g class="eye-rays">\n          <line x1="110" y1="21" x2="110" y2="5"/>\n          <line x1="142" y1="29.6" x2="150" y2="15.7"/>\n          <line x1="78" y1="29.6" x2="70" y2="15.7"/>\n          <line x1="165.4" y1="53" x2="179.3" y2="45"/>\n          <line x1="54.6" y1="53" x2="40.7" y2="45"/>\n          <line x1="78" y1="140.4" x2="70" y2="154.3"/>\n          <line x1="142" y1="140.4" x2="150" y2="154.3"/>\n          <line x1="110" y1="149" x2="110" y2="165"/>\n        </g>\n        <g class="eye-dots">\n          <circle cx="171.5" cy="23.5" r="1.7"/>\n          <circle cx="48.5" cy="23.5" r="1.7"/>\n          <circle cx="171.5" cy="146.5" r="1.7"/>\n          <circle cx="48.5" cy="146.5" r="1.7"/>\n        </g>\n        <path class="eye-lid" d="M25 85 C55 43 165 43 195 85 C165 127 55 127 25 85 Z"/>\n        <path class="eye-lid-accent" d="M45 69 C70 40 150 40 175 69"/>\n        <circle class="eye-iris" cx="110" cy="85" r="27"/>\n        <circle class="eye-iris-ring" cx="110" cy="85" r="17.5"/>\n        <circle class="eye-pupil" cx="110" cy="85" r="7"/>\n        <circle class="eye-spark" cx="117" cy="78" r="2.4"/>\n      </svg>'
OLD_LINK = 'href="css/style.css"'
NEW_LINK = 'href="css/style.css?v=0.3"'
OLD_CSS = '/* \u610f\u8bc6\u6d41\u98ce\u683c\u773c\u775b \u2014 \u591a\u5c42\u6a21\u7cca\u5149\u6655 + \u547c\u5438 + \u7f13\u6162\u6f02\u79fb */\n.eye-icon {\n  position: relative;\n  width: 120px;\n  height: 120px;\n  margin: 0 auto;\n  animation: eyeBreath 6s ease-in-out infinite;\n}\n.eye-layer {\n  position: absolute;\n  border-radius: 50%;\n  top: 50%; left: 50%;\n  transform: translate(-50%, -50%);\n  pointer-events: none;\n}\n/* \u6700\u5916\u5c42 \u2014 \u6781\u5ea6\u6a21\u7cca\u7684\u5927\u5149\u6655 */\n.eye-outer {\n  width: 160px; height: 160px;\n  background: radial-gradient(circle,\n    rgba(155, 89, 182, 0.35) 0%,\n    rgba(192, 57, 43, 0.18) 40%,\n    rgba(212, 168, 67, 0.05) 70%,\n    transparent 100%);\n  filter: blur(20px);\n  animation: eyeDrift1 12s ease-in-out infinite;\n}\n/* \u4e2d\u5c42 \u2014 \u8679\u819c\u72b6\u8272\u5e26 */\n.eye-mid {\n  width: 110px; height: 110px;\n  background: radial-gradient(circle at 35% 35%,\n    rgba(232, 217, 240, 0.4) 0%,\n    rgba(155, 89, 182, 0.3) 25%,\n    rgba(192, 57, 43, 0.2) 55%,\n    rgba(30, 20, 40, 0.5) 85%,\n    transparent 100%);\n  filter: blur(8px);\n  animation: eyeDrift2 9s ease-in-out infinite;\n}\n/* \u5185\u5c42 \u2014 \u534a\u900f\u660e\u7403\u4f53 */\n.eye-inner {\n  width: 70px; height: 70px;\n  background: radial-gradient(circle at 30% 30%,\n    rgba(232, 217, 240, 0.5) 0%,\n    rgba(155, 89, 182, 0.4) 50%,\n    rgba(30, 20, 40, 0.7) 100%);\n  filter: blur(2px);\n  animation: eyeBreath 6s ease-in-out infinite;\n}\n/* \u77b3\u5b54 */\n.eye-pupil {\n  width: 14px; height: 14px;\n  background: radial-gradient(circle,\n    #0a0510 0%,\n    #2a1a3a 70%,\n    transparent 100%);\n  box-shadow: 0 0 12px rgba(155, 89, 182, 0.8),\n              0 0 25px rgba(192, 57, 43, 0.4);\n  animation: eyePupil 5s ease-in-out infinite;\n}\n/* \u9ad8\u5149 */\n.eye-glow {\n  width: 20px; height: 20px;\n  background: radial-gradient(circle,\n    rgba(232, 217, 240, 0.9) 0%,\n    rgba(155, 89, 182, 0.3) 50%,\n    transparent 100%);\n  top: 38%; left: 42%;\n  transform: none;\n  filter: blur(2px);\n  animation: eyeGlow 4s ease-in-out infinite;\n}\n/* \u6697\u89d2 */\n.eye-vignette {\n  width: 180px; height: 180px;\n  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.7);\n  filter: blur(5px);\n  animation: eyeVignette 8s ease-in-out infinite;\n}\n@keyframes eyeBreath {\n  0%, 100% { transform: scale(1); opacity: 0.95; }\n  50% { transform: scale(1.05); opacity: 1; }\n}\n@keyframes eyeDrift1 {\n  0%, 100% { transform: translate(-50%, -50%) scale(1); }\n  33% { transform: translate(-52%, -48%) scale(1.02); }\n  66% { transform: translate(-48%, -51%) scale(0.98); }\n}\n@keyframes eyeDrift2 {\n  0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }\n  50% { transform: translate(-50%, -50%) rotate(5deg); }\n}\n@keyframes eyePupil {\n  0%, 100% { transform: translate(-50%, -50%) scale(1); }\n  25% { transform: translate(-47%, -53%) scale(1.05); }\n  50% { transform: translate(-53%, -47%) scale(0.95); }\n  75% { transform: translate(-48%, -48%) scale(1.02); }\n}\n@keyframes eyeGlow {\n  0%, 100% { opacity: 0.8; transform: scale(1); }\n  50% { opacity: 1; transform: scale(1.2); }\n}\n@keyframes eyeVignette {\n  0%, 100% { opacity: 0.7; }\n  50% { opacity: 0.9; }\n}\n'
NEW_CSS = '/* SVG \u7ebf\u7a3f\u98ce\u683c\u773c\u775b \u2014 \u63cf\u8fb9\u7ebf\u6761\u6784\u6210 + \u5c04\u7ebf\u65cb\u8f6c + \u843d\u7b14\u52a8\u753b */\n.eye-svg {\n  width: 150px;\n  height: auto;\n  display: block;\n  margin: 0 auto 6px;\n  animation: eyeFloat 4s ease-in-out infinite;\n  filter: drop-shadow(0 0 14px rgba(155, 89, 182, 0.4));\n}\n.eye-svg path,\n.eye-svg circle,\n.eye-svg line {\n  fill: none;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.eye-svg .eye-rays {\n  transform-origin: 110px 85px;\n  animation: raysSpin 26s linear infinite;\n}\n.eye-svg .eye-rays line {\n  stroke: var(--accent-gold);\n  stroke-width: 1.6;\n  opacity: 0.85;\n}\n.eye-svg .eye-dots circle {\n  fill: var(--accent-gold);\n  animation: dotsTwinkle 3.2s ease-in-out infinite;\n}\n.eye-svg .eye-lid {\n  stroke: #c9a2e8;\n  stroke-width: 2.2;\n  stroke-dasharray: 460;\n  stroke-dashoffset: 460;\n  animation: eyeDraw 1.8s ease-out 0.1s forwards;\n}\n.eye-svg .eye-lid-accent {\n  stroke: rgba(155, 89, 182, 0.55);\n  stroke-width: 1.2;\n  stroke-dasharray: 180;\n  stroke-dashoffset: 180;\n  animation: eyeDraw 1.4s ease-out 0.7s forwards;\n}\n.eye-svg .eye-iris {\n  stroke: var(--accent-purple);\n  stroke-width: 2;\n  stroke-dasharray: 175;\n  stroke-dashoffset: 175;\n  animation: eyeDraw 1.5s ease-out 0.4s forwards;\n}\n.eye-svg .eye-iris-ring {\n  stroke: var(--accent-gold);\n  stroke-width: 1.4;\n  stroke-dasharray: 115;\n  stroke-dashoffset: 115;\n  animation: eyeDraw 1.3s ease-out 0.8s forwards;\n}\n.eye-svg .eye-pupil {\n  fill: #0a0510;\n  stroke: var(--accent-gold);\n  stroke-width: 1.2;\n  transform-origin: 110px 85px;\n  animation: pupilPulse 3.5s ease-in-out infinite;\n}\n.eye-svg .eye-spark {\n  fill: #e8d9f0;\n  stroke: none;\n  animation: sparkTwinkle 2.6s ease-in-out infinite;\n}\n@keyframes eyeFloat {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-8px); }\n}\n@keyframes eyeDraw {\n  to { stroke-dashoffset: 0; }\n}\n@keyframes raysSpin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n@keyframes pupilPulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.18); }\n}\n@keyframes sparkTwinkle {\n  0%, 100% { opacity: 0.55; }\n  50% { opacity: 1; }\n}\n@keyframes dotsTwinkle {\n  0%, 100% { opacity: 0.35; }\n  50% { opacity: 1; }\n}\n'

h = open('index.html', 'rb').read().decode('utf-8')
b = blob_sha(h.encode('utf-8'))
if b == EXP_H_NEW:
    print('index.html already patched, skip')
elif b != EXP_H_OLD:
    fail('index.html unexpected blob: ' + b)
else:
    if h.count(OLD_EYE) != 1:
        fail('index.html old eye block count=%d' % h.count(OLD_EYE))
    h2 = h.replace(OLD_EYE, NEW_EYE, 1)
    if h2.count(OLD_LINK) != 1:
        fail('index.html old link count=%d' % h2.count(OLD_LINK))
    h2 = h2.replace(OLD_LINK, NEW_LINK, 1)
    if blob_sha(h2.encode('utf-8')) != EXP_H_NEW:
        fail('index.html result blob mismatch')
    open('index.html', 'wb').write(h2.encode('utf-8'))
    print('index.html patched chars:', len(h), '->', len(h2))

c = open('css/style.css', 'rb').read().decode('utf-8')
b = blob_sha(c.encode('utf-8'))
if b == EXP_C_NEW:
    print('style.css already patched, skip')
elif b != EXP_C_OLD:
    fail('style.css unexpected blob: ' + b)
else:
    if c.count(OLD_CSS) != 1:
        fail('style.css old eye section count=%d' % c.count(OLD_CSS))
    c2 = c.replace(OLD_CSS, NEW_CSS, 1)
    if blob_sha(c2.encode('utf-8')) != EXP_C_NEW:
        fail('style.css result blob mismatch')
    open('css/style.css', 'wb').write(c2.encode('utf-8'))
    print('style.css patched chars:', len(c), '->', len(c2))

print('PATCH_OK')
