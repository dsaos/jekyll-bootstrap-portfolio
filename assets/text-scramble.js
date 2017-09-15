// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = ''
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      if (newText[i] != ' ') {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 100)
        const end = start + Math.floor(Math.random() * 100)
        this.queue.push({ from, to, start, end })
      } else {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = 1
        const end = 2
        this.queue.push({ from, to, start, end })

      }
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

  
function delay(interval) {
  return new Promise(function(resolve) {
      setTimeout(resolve, interval);
  });
}



const els = document.getElementsByClassName('scramble-in')
for (el of els) {
el.style.visibility = "hidden"
}

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

window.onload = function(event) {


  delay(1000).then(function() {
    for (el of els) {
        let fx = new TextScramble(el)
        el.style.visibility = "visible"
        fx.setText(el.innerText)  
    }
  })
}