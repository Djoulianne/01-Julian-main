// SWITCH FR/EN//
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
// START QUIZZ //
// Fonction pour l'overlay n°1 (Avatar / Pseudo)
function openOverlay() {
  document.getElementById('overlay').style.display = 'flex';
}

function closeOverlay() {
  document.getElementById('overlay').style.display = 'none';
}

// Overlay 2
function openCategoryOverlay() {
  document.getElementById('categoryOverlay').classList.add('categoryOverlay--active');
}
function closeCategoryOverlay() {
  document.getElementById('categoryOverlay').classList.remove('categoryOverlay--active');
}
// Gestion de la sélection visuelle des catégories (le contour jaune)
document.querySelectorAll('.cat-option').forEach(button => {
  button.addEventListener('click', function() {
      document.querySelectorAll('.cat-option').forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
  });
});
