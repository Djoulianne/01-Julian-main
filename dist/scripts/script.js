// ==========================================
// 1. FONCTIONS DE L'INDEX (OVERLAYS)
// ==========================================

// START QUIZZ - Overlay n°1 (Avatar / Pseudo)
function openOverlay() {
  const el = document.getElementById('overlay');
  if (el) el.style.display = 'flex';
}
function closeOverlay() {
  const el = document.getElementById('overlay');
  if (el) el.style.display = 'none';
}

// Overlay 2 (Catégories)
function openCategoryOverlay() {
  const el = document.getElementById('categoryOverlay');
  if (el) el.classList.add('categoryOverlay--active');
}
function closeCategoryOverlay() {
  const el = document.getElementById('categoryOverlay');
  if (el) el.classList.remove('categoryOverlay--active');
}

// Gestion des catégories (Uniquement si on est sur l'index)
const catOptions = document.querySelectorAll('.cat-option');
if (catOptions.length > 0) {
  catOptions.forEach(button => {
    button.addEventListener('click', function() {
        catOptions.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
  });
}

// ==========================================
// 2. LOGIQUE DU QUIZ (DYNAMIQUE)
// ==========================================

const answerBtns = document.querySelectorAll('.answer-btn');
const btnSubmit  = document.querySelector('.btn-submit');
const zigzagLayer = document.querySelector('.layer-zigzag');

// Configuration
const CORRECT_ANSWER = "Casablanca";
const MASCOT_HAPPY_SRC = "../src/images/mascot_happy.png";
const MASCOT_SAD_SRC   = "../src/images/mascot_sad.png";

// ON VÉRIFIE SI ON EST SUR LA PAGE QUIZ
if (btnSubmit && answerBtns.length > 0) {

  answerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      answerBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      btnSubmit.disabled = false;
      btnSubmit.style.opacity = "1";
    });
  });

  btnSubmit.addEventListener('click', () => {
    if (btnSubmit.textContent === "Next Question") {
      window.location.reload(); 
      return;
    }

    const selectedBtn = document.querySelector('.answer-btn.selected');
    if(!selectedBtn) return; 

    const isCorrect = selectedBtn.textContent.trim() === CORRECT_ANSWER;

    answerBtns.forEach(btn => {
      btn.disabled = true;
      if (btn.textContent.trim() === CORRECT_ANSWER) {
        btn.classList.add('correct');
      }
    });

    if (!isCorrect) {
      selectedBtn.classList.add('wrong');
      if (zigzagLayer) zigzagLayer.classList.add('is-wrong');
    }

    // FEEDBACK (Mascotte + Texte)
    const feedbackContainer = document.createElement('div');
    feedbackContainer.classList.add('feedback-container');

    const mascotImg = document.createElement('img');
    mascotImg.classList.add('mascot-image');

    const feedbackText = document.createElement('p');
    feedbackText.classList.add('feedback-msg');

    if (isCorrect) {
      mascotImg.src = MASCOT_HAPPY_SRC;
      feedbackText.textContent = "Correct ! Bravo !";
      feedbackText.classList.add('success');
    } else {
      mascotImg.src = MASCOT_SAD_SRC;
      feedbackText.textContent = `Dommage ! La réponse était ${CORRECT_ANSWER}.`;
      feedbackText.classList.add('error');
    }
    
    feedbackContainer.appendChild(mascotImg);
    feedbackContainer.appendChild(feedbackText);
    document.querySelector('.card-footer').before(feedbackContainer);

    btnSubmit.textContent = "Next Question";
  });
}