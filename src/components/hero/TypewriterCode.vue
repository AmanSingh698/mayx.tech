<template>
  <div class="code-win">
    <!-- Title bar -->
    <div class="code-win__bar">
      <span class="win-dot" style="background:#ff5f57"></span>
      <span class="win-dot" style="background:#ffbd2f"></span>
      <span class="win-dot" style="background:#28c840"></span>
      <span class="win-dot--label">agent.config.ts</span>
    </div>

    <!-- Code body: rendered tokens up to current char index -->
    <div class="code-win__body" aria-live="polite">
      <template v-for="(line, li) in visibleLines" :key="li">
        <div class="code-line">
          <!-- Each token in the line -->
          <template v-for="(tok, ti) in line" :key="ti">
            <span :class="tok.cls">{{ tok.text }}</span>
          </template>
          <!-- Blinking cursor sits after the last char of the current line being typed -->
          <span v-if="li === currentLine && !done" class="cursor">▋</span>
        </div>
      </template>
      <!-- Cursor on blank lines between tokens while waiting -->
      <span v-if="done" class="cursor">▋</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// Props: allow parent to reset typing (e.g. when slide becomes active)
const props = defineProps({
  active: { type: Boolean, default: true }
})

// Full code broken into lines → tokens (cls + text)
const CODE_LINES = [
  [
    { cls: 'c-blue', text: 'const' },
    { cls: 'c-white', text: ' agent' },
    { cls: 'c-muted', text: ' = {' }
  ],
  [
    { cls: '', text: '  ' },
    { cls: 'c-purple', text: 'model' },
    { cls: 'c-muted', text: ': ' },
    { cls: 'c-green', text: '"gpt-4o"' },
    { cls: 'c-muted', text: ',' }
  ],
  [
    { cls: '', text: '  ' },
    { cls: 'c-purple', text: 'tools' },
    { cls: 'c-muted', text: ': [' },
    { cls: 'c-green', text: '"web_search"' },
    { cls: 'c-muted', text: ', ' },
    { cls: 'c-green', text: '"code_exec"' },
    { cls: 'c-muted', text: '],' }
  ],
  [
    { cls: '', text: '  ' },
    { cls: 'c-purple', text: 'memory' },
    { cls: 'c-muted', text: ': ' },
    { cls: 'c-green', text: '"persistent"' },
    { cls: 'c-muted', text: ',' }
  ],
  [
    { cls: '', text: '  ' },
    { cls: 'c-purple', text: 'goal' },
    { cls: 'c-muted', text: ': ' },
    { cls: 'c-green', text: '"automate_workflow"' }
  ],
  [
    { cls: 'c-muted', text: '}' }
  ],
  [], // blank spacer
  [
    { cls: 'c-blue', text: 'await ' },
    { cls: 'c-white', text: 'agent' },
    { cls: 'c-muted', text: '.' },
    { cls: 'c-cyan', text: 'run' },
    { cls: 'c-muted', text: '()' }
  ],
  [
    { cls: 'c-muted', text: '// ' },
    { cls: 'c-green', text: '✓ Workflow automated in 1.2s' }
  ]
]

// Flatten to a list of { lineIdx, tokIdx, charIdx, char }
// We'll type char by char across all tokens
const FLAT = (() => {
  const result = []
  CODE_LINES.forEach((line, li) => {
    if (line.length === 0) {
      // blank line — push a "newline" sentinel
      result.push({ lineIdx: li, tokIdx: -1, charIdx: -1, char: null })
    } else {
      line.forEach((tok, ti) => {
        for (let ci = 0; ci < tok.text.length; ci++) {
          result.push({ lineIdx: li, tokIdx: ti, charIdx: ci, char: tok.text[ci] })
        }
      })
    }
  })
  return result
})()

// State: how many flat chars have been revealed
const revealed = ref(0)
const done = ref(false)

// Derive visible lines from revealed count
const visibleLines = computed(() => {
  const lines = []
  let flatCursor = 0

  for (let li = 0; li < CODE_LINES.length; li++) {
    const srcLine = CODE_LINES[li]
    if (srcLine.length === 0) {
      // Blank line — only show if we've reached it
      const atBlank = FLAT.findIndex((f, idx) => idx >= flatCursor && f.lineIdx === li)
      if (flatCursor > FLAT.findLastIndex(f => f.lineIdx < li) || revealed.value > FLAT.filter(f => f.lineIdx < li).length) {
        lines.push([])
      }
      continue
    }

    const lineTokens = []
    let lineStartedShowing = false

    for (let ti = 0; ti < srcLine.length; ti++) {
      const tok = srcLine[ti]
      let revealedText = ''

      for (let ci = 0; ci < tok.text.length; ci++) {
        if (flatCursor < revealed.value) {
          revealedText += tok.text[ci]
          flatCursor++
        }
      }

      if (revealedText.length > 0) {
        lineTokens.push({ cls: tok.cls, text: revealedText })
        lineStartedShowing = true
      } else if (lineStartedShowing) {
        break
      }
    }

    if (lineTokens.length > 0) lines.push(lineTokens)
    if (flatCursor >= revealed.value && lines.length > 0) break
  }

  return lines
})

// Current line index (for cursor positioning)
const currentLine = computed(() => {
  if (visibleLines.value.length === 0) return 0
  return visibleLines.value.length - 1
})

// Typing engine
let timer = null
const CHAR_DELAY_MIN = 28   // ms per char minimum
const CHAR_DELAY_MAX = 85   // ms per char maximum (simulate human rhythm)
const PAUSE_NEWLINE  = 140  // pause at end of line
const PAUSE_DONE     = 2200 // pause before restarting

function scheduleNext() {
  if (!props.active) return

  const cur = FLAT[revealed.value]
  // Slightly longer pause before a newline (end of current line)
  const nextFlat = FLAT[revealed.value + 1]
  const isLineEnd = nextFlat && nextFlat.lineIdx !== cur?.lineIdx

  const delay = isLineEnd
    ? PAUSE_NEWLINE
    : Math.random() * (CHAR_DELAY_MAX - CHAR_DELAY_MIN) + CHAR_DELAY_MIN

  timer = setTimeout(() => {
    if (revealed.value < FLAT.length) {
      revealed.value++
      scheduleNext()
    } else {
      done.value = true
      // Restart after pause
      timer = setTimeout(restart, PAUSE_DONE)
    }
  }, delay)
}

function restart() {
  revealed.value = 0
  done.value = false
  scheduleNext()
}

watch(() => props.active, (val) => {
  if (val) {
    restart()
  } else {
    clearTimeout(timer)
  }
})

onMounted(() => {
  if (props.active) scheduleNext()
})

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<style lang="scss" scoped>
.code-win {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: $radius-md;
  overflow: hidden;
  max-width: 480px;
  width: 100%;

  &__bar {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(255, 255, 255, 0.015);
  }

  &__body {
    padding: 20px 20px 24px;
    font-family: 'Space Mono', 'Fira Code', 'Courier New', monospace;
    font-size: 12.5px;
    line-height: 1.9;
    min-height: 196px;
  }
}

.win-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;

  &--label {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.2);
    font-family: 'Inter', sans-serif;
    margin-left: 4px;
    letter-spacing: 0.02em;
  }
}

.code-line {
  display: block;
  min-height: 1.9em;
  white-space: pre;
}

// Syntax colours
.c-blue   { color: #60A5FA; }
.c-purple { color: #A78BFA; }
.c-green  { color: #34D399; }
.c-white  { color: rgba(255, 255, 255, 0.85); }
.c-muted  { color: rgba(255, 255, 255, 0.35); }
.c-cyan   { color: #67E8F9; }
.c-orange { color: #FCA5A5; }

// Blinking cursor
.cursor {
  display: inline-block;
  color: $primary;
  font-size: 13px;
  line-height: 1;
  vertical-align: baseline;
  animation: blink 1s step-end infinite;
  will-change: opacity;
  margin-left: 1px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
</style>
