import re, hashlib

def fail(msg):
    print('PATCH_FAIL:', msg)
    raise SystemExit(1)

def blob_sha(data):
    return hashlib.sha1(b'blob %d\x00' % len(data) + data).hexdigest()

# ---- index.html: emoji eye -> 6-layer structural eye (original 09-22 21:36 design) ----
EXP_H_NEW = 'b04ad23004e3387a3a384cedeb1bce9e1a0af504'
EXP_H_OLD = '38e6c60f78f7da8a10b00ca553ba8c77dbb47cd4'
h = open('index.html', 'rb').read().decode('utf-8')
if blob_sha(h.encode('utf-8')) == EXP_H_NEW:
    print('index.html already patched, skip')
else:
    if blob_sha(h.encode('utf-8')) != EXP_H_OLD:
        fail('index.html unexpected blob: ' + blob_sha(h.encode('utf-8')))
    NEW_EYE = (
        '<div class="eye-icon">\n'
        '        <div class="eye-layer eye-outer"></div>\n'
        '        <div class="eye-layer eye-mid"></div>\n'
        '        <div class="eye-layer eye-inner"></div>\n'
        '        <div class="eye-layer eye-pupil"></div>\n'
        '        <div class="eye-layer eye-glow"></div>\n'
        '        <div class="eye-layer eye-vignette"></div>\n'
        '      </div>'
    )
    h2, n = re.subn(r'<div class="eye-icon">[^<]*</div>', lambda m: NEW_EYE, h, count=1)
    if n != 1:
        fail('index.html eye anchor not found')
    if blob_sha(h2.encode('utf-8')) != EXP_H_NEW:
        fail('index.html result blob mismatch: ' + blob_sha(h2.encode('utf-8')))
    open('index.html', 'wb').write(h2.encode('utf-8'))
    print('index.html patched chars:', len(h), '->', len(h2))

# ---- css/style.css: drop emoji eye styles, un-scope layered eye container ----
EXP_C_NEW = '4df6442fa9acce0432f72dd19de3a96c6c1c56f4'
EXP_C_OLD = '6a1b23045d0c83e5f73db893bc13c4a62801f97f'
c = open('css/style.css', 'rb').read().decode('utf-8')
if blob_sha(c.encode('utf-8')) == EXP_C_NEW:
    print('style.css already patched, skip')
else:
    if blob_sha(c.encode('utf-8')) != EXP_C_OLD:
        fail('style.css unexpected blob: ' + blob_sha(c.encode('utf-8')))
    # remove emoji base styles + eyeFloat keyframes
    c2, n1 = re.subn(r'/\* emoji .*?\*/\n\.eye-icon \{.*?\n\}\n@keyframes eyeFloat \{.*?\n\}\n', '', c, count=1, flags=re.S)
    if n1 != 1:
        fail('style.css emoji block not found')
    # restore container selector to plain .eye-icon (as in the 21:37 snapshot)
    c2, n2 = re.subn(r'\.eye-icon\.consciousness-stream \{', '.eye-icon {', c2, count=1)
    if n2 != 1:
        fail('style.css selector not found')
    # comment: drop the (backup) marker
    if '\uff08\u5907\u7528\uff09' not in c2:
        fail('style.css comment marker not found')
    c2 = c2.replace('\uff08\u5907\u7528\uff09', '', 1)
    if blob_sha(c2.encode('utf-8')) != EXP_C_NEW:
        fail('style.css result blob mismatch: ' + blob_sha(c2.encode('utf-8')))
    open('css/style.css', 'wb').write(c2.encode('utf-8'))
    print('style.css patched chars:', len(c), '->', len(c2))

print('PATCH_OK')
