"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var marqueurs;
	var pseudo;
	var mdp;
	var page;
	var nom3x3;
	var contenu;
	var i;
	var x;
	var table = [];
	var list = [];

	page = fs.readFileSync('../html/modele_solo_3x3.html', 'utf-8');

	marqueurs = [];
	marqueurs.erreur = "";
	marqueurs.pseudo = query.pseudo;
	marqueurs.mdp = query.mdp;
	nom3x3 = query.pseudo + "3x3";
	
	contenu = fs.readFileSync(nom3x3 + ".json" , "UTF-8");
	table = JSON.parse(contenu);
	console.log (table);
			
	table [0] = !table[0];
//	do {
		if (query.cell === 1) {		
			table [0] = !table[0];
			table [1] = !table[1];
			table [3] = !table[3];
		}
		if (query.cell === 2) {
			table [0] = !table[0];
			table [1] = !table[1];
			table [2] = !table[2];
			table [4] = !table[4];		
		}
		if (query.cell === 3) {
			table [1] = !table[1];
			table [2] = !table[2];
			table [5] = !table[5];
		}
		if (query.cell === 4) {
			table [0] = !table[0];
			table [3] = !table[3];
			table [5] = !table[5];
			table [6] = !table[6];
		}
		if (query.cell === 5) {
			table [1] = !table[1];
			table [3] = !table[3];
			table [4] = !table[4];
			table [5] = !table[5];
			table [7] = !table[7];
		}
		if (query.cell === 6) {
			table [2] = !table[2];
			table [4] = !table[4];
			table [5] = !table[5];
			table [8] = !table[8];
		}
		if (query.cell === 7) {
			table [3] = !table[3];
			table [6] = !table[6];
			table [7] = !table[7];
		}
		if (query.cell === 8) {
			table [4] = !table[4];
			table [6] = !table[6];
			table [7] = !table[7];
			table [8] = !table[8];
		}
		if (query.cell === 9) {
			table [5] = !table[5];
			table [7] = !table[7];
			table [8] = !table[8];
		}
	

//	} while ();

	table = JSON.stringify(table);
	console.log("enregistrer dans : " + nom3x3 + ".json === " + table);
	fs.writeFileSync(nom3x3 + ".json", [table], 'utf-8');

	contenu = fs.readFileSync(nom3x3 + ".json" , "UTF-8");

	
	
	
	if(list[0] === false) {
		marqueurs.c1 = "\"Lune.png\"";
		console.log("marqueurc"+1+" = "+marqueurs.c1);
	} else {
		marqueurs.c1 = "\"Soleil.png\"";
		console.log("marqueurc"+1+" = "+marqueurs.c1);
	}

	if(list[1] === false) {
		marqueurs.c2 = "\"Lune.png\"";
		console.log("marqueurc"+2+" = "+marqueurs.c2);
	} else {
		marqueurs.c2 = "\"Soleil.png\"";
		console.log("marqueurc"+2+" = "+marqueurs.c2);
	}

	if(list[2] === false) {
		marqueurs.c3 = "\"Lune.png\"";
		console.log("marqueurc"+3+" = "+marqueurs.c3);
	} else {
			marqueurs.c3 = "\"Soleil.png\"";
			console.log("marqueurc"+3+" = "+marqueurs.c3);
	}

	if(list[3] === false) {
		marqueurs.c4 = "\"Lune.png\"";
		console.log("marqueurc"+4+" = "+marqueurs.c4);
	} else {
		marqueurs.c4 = "\"Soleil.png\"";
		console.log("marqueurc"+4+" = "+marqueurs.c4);
	}	

	if(list[4] === false) {
		marqueurs.c5 = "\"Lune.png\"";
		console.log("marqueurc"+5+" = "+marqueurs.c5);
	} else {
		marqueurs.c5 = "\"Soleil.png\"";
		console.log("marqueurc"+5+" = "+marqueurs.c5);
	}				
	
	if(list[5] === false) {
		marqueurs.c6 = "\"Lune.png\"";
		console.log("marqueurc"+6+" = "+marqueurs.c6);
	} else {
		marqueurs.c6 = "\"Soleil.png\"";
		console.log("marqueurc"+6+" = "+marqueurs.c6);
	}	

	if(list[6] === false) {
		marqueurs.c7 = "\"Lune.png\"";
		console.log("marqueurc"+7+" = "+marqueurs.c7);
	} else {
		marqueurs.c7 = "\"Soleil.png\"";
		console.log("marqueurc"+7+" = "+marqueurs.c7);
	}

	if(list[7] === false) {
		marqueurs.c8 = "\"Lune.png\"";
		console.log("marqueurc"+8+" = "+marqueurs.c8);
	} else {
		marqueurs.c8 = "\"Soleil.png\"";
		console.log("marqueurc"+8+" = "+marqueurs.c8);
	}
	
	if(list[8] === false) {
		marqueurs.c9 = "\"Lune.png\"";
		console.log("marqueurc"+9+" = "+marqueurs.c9);
	} else {
		marqueurs.c9 = "\"Soleil.png\"";
		console.log("marqueurc"+9+" = "+marqueurs.c9);
	}
};

module.exports = trait;
