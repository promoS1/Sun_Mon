"use strict";
var fs = require("fs");
require('remedial');


var trait = function (req, res, query) {
	var marqueurs;
	var pseudo;
	var mdp
	var page;
	var nom;
	var contenu;
	var i;
	var x;
	var table = [];
	var list = [];
	var score ;
	//Aller a la page du jeu

	page = fs.readFileSync('../html/modele_solo_3x3.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = query.pseudo;
	marqueurs.mdp = query.mdp;
	nom3x3 = query.pseudo+"3x3";
	nomStat = querypseudo+"Stat";

	///////

	table = [];

	for (i=1;i<=9;i++){
		x = Math.floor(Math.random() * 2)+1;
		if (x===1){
			table.push("l");
		} else if (x===2) {
			table.push("s");
		}
	}

	table = JSON.stringify(table);
	console.log("enrengistrer dans : "+nom3x3+".json ==="+table);
	fs.writeFileSync(nom3x3+".json", [table], 'utf-8');

	/////
	
	contenu = fs.readFileSync(nom+".json" , "UTF-8");
	list = JSON.parse(contenu);
	
	
		if(list[0] === "l") {
			marqueurs.c1 = "\"Lune.png\"";
			console.log("marqueurc"+1+" = "+marqueurs.c1);
		} else {
			marqueurs.c1 = "\"Soleil.png\"";
			console.log("marqueurc"+1+" = "+marqueurs.c1);
		}
					
		if(list[1] === "l") {
			marqueurs.c2 = "\"Lune.png\"";
			console.log("marqueurc"+2+" = "+marqueurs.c2);
		} else {
			marqueurs.c2 = "\"Soleil.png\"";
			console.log("marqueurc"+2+" = "+marqueurs.c2);
		}

		if(list[2] === "l") {
			marqueurs.c3 = "\"Lune.png\"";
			console.log("marqueurc"+3+" = "+marqueurs.c3);
		} else {
			marqueurs.c3 = "\"Soleil.png\"";
			console.log("marqueurc"+3+" = "+marqueurs.c3);
		}

		if(list[3] === "l") {
			marqueurs.c4 = "\"Lune.png\"";
			console.log("marqueurc"+4+" = "+marqueurs.c4);
		} else {
			marqueurs.c4 = "\"Soleil.png\"";
			console.log("marqueurc"+4+" = "+marqueurs.c4);
		}

		if(list[4] === "l") {
			marqueurs.c5 = "\"Lune.png\"";
			console.log("marqueurc"+5+" = "+marqueurs.c5);
		} else {
			marqueurs.c5 = "\"Soleil.png\"";
			console.log("marqueurc"+5+" = "+marqueurs.c5);
		}				
		if(list[5] === "l") {
			marqueurs.c6 = "\"Lune.png\"";
			console.log("marqueurc"+6+" = "+marqueurs.c6);
		} else {
			marqueurs.c6 = "\"Soleil.png\"";
			console.log("marqueurc"+6+" = "+marqueurs.c6);
		}

		if(list[6] === "l") {
			marqueurs.c7 = "\"Lune.png\"";
			console.log("marqueurc"+7+" = "+marqueurs.c7);
		} else {
			marqueurs.c7 = "\"Soleil.png\"";
			console.log("marqueurc"+7+" = "+marqueurs.c7);
		}

		if(list[7] === "l") {
			marqueurs.c8 = "\"Lune.png\"";
			console.log("marqueurc"+8+" = "+marqueurs.c8);
		} else {
			marqueurs.c8 = "\"Soleil.png\"";
			console.log("marqueurc"+8+" = "+marqueurs.c8);
		}

		if(list[8] === "l") {
			marqueurs.c9 = "\"Lune.png\"";
			console.log("marqueurc"+9+" = "+marqueurs.c9);
		} else {
			marqueurs.c9 = "\"Soleil.png\"";
			console.log("marqueurc"+9+" = "+marqueurs.c9);
		}


	
	
	page = page.supplant(marqueurs)
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};



module.exports = trait;
