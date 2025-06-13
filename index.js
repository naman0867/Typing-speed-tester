 const typingText = document.querySelector('.typing-text p');
    const input = document.querySelector('.wrapper .input-field');
    const time = document.querySelector('.time span b');
    const mistakes = document.querySelector('.mistakes span b');
    const wpm = document.querySelector('.wpm span');
    const cpm = document.querySelector('.cpm span');
    const btn = document.querySelector('button');

    let timer = null;
    let maxTime = 60;
    let timeLeft = maxTime;
    let charIndex = 0;
    let mistake = 0;
    let isTyping = false;

    function loadParagraph() {
      const paragraph = ["Made By Garg Technical",
        "Typing speed tests are great for improving your accuracy and speed.",
    "Practice daily to enhance your typing performance and reduce mistakes.",
    "JavaScript is a powerful language used to build dynamic web applications.",
    "A quick brown fox jumps over the lazy dog is a popular typing sentence.",
    "Always keep your fingers on the home row keys for better efficiency.",
    "This is a simple and fun project to practice DOM manipulation skills.",
    "Accuracy matters more than speed in real-world typing scenarios.",
    "Consistent typing practice leads to faster reflexes and fewer errors.",
    "Challenge yourself to beat your previous WPM score every day!"

      ];
      const randomIndex = Math.floor(Math.random() * paragraph.length);
      typingText.innerHTML = '';

      for (const char of paragraph[randomIndex]) {
        typingText.innerHTML += `<span>${char}</span>`;
      }

      typingText.querySelectorAll('span')[0].classList.add('active');
      document.addEventListener('keydown', () => input.focus());
      typingText.addEventListener('click', () => input.focus());
    }

    function initTyping() {
      const chars = typingText.querySelectorAll('span');
      const typedChar = input.value.charAt(charIndex);

      if (charIndex < chars.length && timeLeft > 0) {
        if (!isTyping) {
          timer = setInterval(initTimer, 1000);
          isTyping = true;
        }

        if (typedChar === chars[charIndex].innerText) {
          chars[charIndex].classList.add('correct');
        } else {
          mistake++;
          chars[charIndex].classList.add('incorrect');
        }

        chars[charIndex].classList.remove('active');
        charIndex++;

        if (charIndex < chars.length) {
          chars[charIndex].classList.add('active');
        }

        mistakes.innerText = mistake;
      } else {
        clearInterval(timer);
        input.value = '';
      }

      
      updateStats();
    }

    function initTimer() {
      if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
        updateStats();
      } else {
        clearInterval(timer);
        input.value = '';
      }
    }

    function updateStats() {
      let wpmCount = Math.round(((charIndex - mistake) / 5) / ((maxTime - timeLeft) / 60));
      let cpmCount = charIndex - mistake;
      wpm.innerText = wpmCount < 0 || !isFinite(wpmCount) ? 0 : wpmCount;
      cpm.innerText = cpmCount < 0 ? 0 : cpmCount;
    }

    function resetTest() {
      clearInterval(timer);
      loadParagraph();
      input.value = '';
      timeLeft = maxTime;
      charIndex = 0;
      mistake = 0;
      isTyping = false;
      time.innerText = timeLeft;
      mistakes.innerText = mistake;
      wpm.innerText = '0';
      cpm.innerText = '0';
    }

    input.addEventListener('input', initTyping);
    loadParagraph();
  