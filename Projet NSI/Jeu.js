
class Puissance4 {
  /*
    Initialise la grille en fonction de `lignes` × `colonnes` (6×7), et fait l'affichage dans l'élément `elt`.
   */
  constructor(elt, lignes=6, colonnes=7) {
    this.lignes = lignes;                     // Nombre de lignes 
    this.colonnes = colonnes;                 // et de colonnes
    this.grille = Array(this.lignes);         // 0: case vide | 1: pion du joueur 1  |  2: pion du joueur 2
    for (let i = 0; i < this.lignes; i++) {
      this.grille
[i] = Array(this.colonnes).fill(0);
    }
    this.turn = 1;   // 1 ou 2 (prochain joueur)
    this.moves = 0;  // Nombre de coups joués
    this.gagnant = null;
    this.element = document.querySelector(elt);  //  Affichage
    this.element.addEventListener('click', (evenement) => this.handle_click(evenement)); // Importation d'un gestionnaire d'événements pour gérer le click
    this.render();
  }
  
  /* Affiche la grille */
  render() {
    let table = document.createElement('table');
    for (let i = this.lignes - 1; i >= 0; i--) {
      let tr = table.appendChild(document.createElement('tr'));
      for (let j = 0; j < this.colonnes; j++) {
        let td = tr.appendChild(document.createElement('td'));
        let colonne = this.grille
  [i][j];
        if (colonne)
          td.className = 'player' + colonne;
        td.dataset.pionColonne = j;
      }
    }
    this.element.innerHTML = '';
    this.element.appendChild(table);
  }
  
	set(ligne, pionColonne, player) {
	  this.grille[ligne][pionColonne] = player;    // Ajout de couleur dans la case
    this.moves++;                                // Compte le coup
	}

  /*Fonction qui ajoute un pion dans une colonne */
	play(pionColonne) {
    let ligne;  // Trouver la première case libre dans la colonne
    for (let i = 0; i < this.lignes; i++) {
      if (this.grille
  [i][pionColonne] == 0) {
        ligne = i;
        break;
      }
    }
    if (ligne === undefined) {
      return null;
    } else {
      this.set(ligne, pionColonne, this.turn);    // Placement du pion
      return ligne;                               // Renvoi de la ligne où le pion a été placé
    }
	}
  
  handle_click(evenement) {
    // On vérifie si la partie n'est pas finie
    if (this.gagnant !== null) {
  		if (window.confirm("Game over! \n \n Voulez-vous relancer une partie ? \n\n")) {
  			this.reset();    // Si la case est confirmée on relance une grille vide
        this.render();
			}
			return;
    }

	  let pionColonne = evenement.target.dataset.pionColonne;
  	if (pionColonne !== undefined) {
      pionColonne = parseInt(pionColonne);          // La fonction parseInt converti les chaines de caractères précédentes en entier
     	let ligne = this.play(parseInt(pionColonne));
      
      if (ligne === null) {
        window.alert("Cette colonne est pleine");
      } else {
        // Vérifier s'il y a un gagnant, ou si la partie est finie
        if (this.fin(ligne, pionColonne, this.turn)) {
          this.gagnant = this.turn;
        } else if (this.moves >= this.lignes * this.pionColonnes) {
          this.gagnant = 0;
        }
        this.turn = 3 - this.turn;    // Passe le tour à l'adversaire  (3 - 2 = 1,  3 - 1 = 2)
        this.render()

        // Affichage d'une pop-up pour annoncer la fin de la partie
        switch (this.gagnant) {
          case 1:
            window.alert("Le joueur Rouge a gagné !"); 
            break;
          case 2:
            window.alert("Le joueur Jaune a gagné !"); 
            break;
        }
      }
    }
  }

  /* 
   Cette fonction vérifie si le coup dans la case `ligne`, `pionColonne` par le joueur `player` est un coup gagnant.
   Renvoie "true" si la partie est gagnée par un joueur et sinon "false" pour que la partie continue
 */
	fin(ligne, pionColonne, player) {
		// Axe Horizontal
    let compteur = 0;
    for (let j = 0; j < this.colonnes; j++) {
      compteur = (this.grille
  [ligne][j] == player) ? compteur+1 : 0;
      if (compteur >= 4) return true;
    }
		// Axe Vertical
    compteur = 0;
    for (let i = 0; i < this.lignes; i++) {
      compteur = (this.grille
  [i][pionColonne] == player) ? compteur+1 : 0;
	    if (compteur >= 4) return true;
    }
		// Axe Diagonal (Gauche vers Droite "/")
    compteur = 0;
    let shift = ligne - pionColonne;
    for (let i = Math.max(shift, 0); i < Math.min(this.lignes, this.colonnes + shift); i++) {
      compteur = (this.grille
  [i][i - shift] == player) ? compteur+1 : 0;
    	if (compteur >= 4) return true;
    }
		// Axe Diagonal (Droite vers Gauche "\")
    compteur = 0;
    shift = ligne + pionColonne;
    for (let i = Math.max(shift - this.colonnes + 1, 0); i < Math.min(this.lignes, shift + 1); i++) {
      console.log(i,shift-i,shift)
      compteur = (this.grille
  [i][shift - i] == player) ? compteur+1 : 0;
      if (compteur >= 4) return true;
    }
    
    return false;
	}

  // Réinitialise l'affichage pour recommencer une partie
  reset() {
    for (let i = 0; i < this.lignes; i++) {
      for (let j = 0; j < this.colonnes; j++) {
        this.grille
  [i][j] = 0;
      }
    }
		this.move = 0;
    this.gagnant = null;
	}
}
// Initialisation du jeu
let p4 = new Puissance4('#game');