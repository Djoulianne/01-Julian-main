// ==========================================
// 1. TES FONCTIONS EXISTANTES (MODAL / UI)
// ==========================================

// SWITCH FR/EN
var x = 0;
function showHide() {
  if (x == 0) {
    document.getElementById('text').style.display = 'block';
    x = 1;
  } else {
    document.getElementById('text').style.display = 'none';
    x = 0;
  }
}

// START QUIZZ - Overlay n°1 (Avatar / Pseudo)
function openOverlay() {
  document.getElementById('overlay').style.display = 'flex';
}
function closeOverlay() {
  document.getElementById('overlay').style.display = 'none';
}

// Overlay 2 (Catégories)
function openCategoryOverlay() {
  document.getElementById('categoryOverlay').classList.add('categoryOverlay--active');
}
function closeCategoryOverlay() {
  document.getElementById('categoryOverlay').classList.remove('categoryOverlay--active');
}

// Gestion de la sélection visuelle des catégories
document.querySelectorAll('.cat-option').forEach(button => {
  button.addEventListener('click', function() {
      document.querySelectorAll('.cat-option').forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
  });
});

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

// On vérifie qu'on est bien sur la page du quiz avant de lancer le script
if (btnSubmit) {

  // Gestion du clic sur les boutons de réponse
  answerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Nettoyage des sélections précédentes
      answerBtns.forEach(b => b.classList.remove('selected'));
      // Sélection du bouton cliqué
      btn.classList.add('selected');
      // Activation du bouton de validation
      btnSubmit.disabled = false;
      btnSubmit.style.opacity = "1";
    });
  });

  // Gestion du clic sur "Submit Answer"
  btnSubmit.addEventListener('click', () => {
    // Si on a déjà répondu, le bouton sert à recharger (ou passer à la suite)
    if (btnSubmit.textContent === "Next Question") {
      window.location.reload(); 
      return;
    }

    const selectedBtn = document.querySelector('.answer-btn.selected');
    const isCorrect = selectedBtn.textContent === CORRECT_ANSWER;

    // 1. Désactivation des boutons et affichage de la bonne réponse
    answerBtns.forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === CORRECT_ANSWER) {
        btn.classList.add('correct');
      }
    });

    // 2. Si c'est faux : bouton en rouge + fond zigzag en rouge
    if (!isCorrect) {
      selectedBtn.classList.add('wrong');
      if (zigzagLayer) {
        zigzagLayer.classList.add('is-wrong');
      }
    }

    // 3. Création du feedback (Mascotte + Texte)
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
    
    // Assemblage du feedback
    feedbackContainer.appendChild(mascotImg);
    feedbackContainer.appendChild(feedbackText);

    // Insertion dans la carte avant le bouton
    document.querySelector('.card-footer').before(feedbackContainer);

    // 4. Transformation du bouton de validation
    btnSubmit.textContent = "Next Question";
  });
}