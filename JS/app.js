function _$(elts){
    return document.getElementById(elts);
}

function _creatElts(elts){
    return document.createElement(elts);
}
var btnClickId = "";
function display(num){
    btnClickId = num;
}

//transformer un nombre negatif en positif
function positivite(nbr){
    if(nbr<0)
        return nbr*(-1);
    else    
        return nbr;
}

function compteurBoule(btnList){
    let cpt=0;
    for(let i=0;i<btnList.length;i++){
            if(btnList[i].value == 1)
                cpt++;
        
    }
    return cpt;
}

function suppressionBoule(tab,LigneASupprimer,colonneASupprimer,lastBtnClick,btnClickId,btnList){
    let elemsASuppr = _$("btn_L"+(LigneASupprimer)+"_C_"+colonneASupprimer);
    var lastElms = _$(lastBtnClick);
    var newElms = _$(btnClickId);
    // console.log("last"+lastElms.value);
    // console.log("new "+newElms.value);
    if(elemsASuppr.value == 1 && newElms.value!=1 && lastElms.value == 1){
        tab[LigneASupprimer][colonneASupprimer] = 0;
        // console.log("Nombre de boule restant : " + compteurBoule(btnList));
        console.log("Lig a suppr :"+ LigneASupprimer);
        console.log("Col a suppr :"+ colonneASupprimer);
        
        
        // console.log("tab["+LigneASupprimer+"]["+colonneASupprimer+"]=" + tab[LigneASupprimer][colonneASupprimer]);
        let IdBouleSupprime = _$("btn_L"+LigneASupprimer+"_C_"+colonneASupprimer);
        IdBouleSupprime.value = 0;

        //supprimer l'ancien boule
        let lastElms = _$(lastBtnClick);
        lastElms.value = 0;

        //nouveau boule dans le bouton cliqué
        let newElms = _$(btnClickId);
        newElms.value = 1;

        btnClickId="";
        lastBtnClick="";
        repaint(btnList);
        
        NbrBoule.innerHTML = 'Number of ball : '+parseInt(compteurBoule(btnList));
        //s'il ne reste qu'une boule sure la table,fin,nous avons gagné
        if(compteurBoule(btnList) == 1){
            alert("Félicitation, vous avez gangé");
        }

    }
}

function repaint(btnList){
    //lokoina vert daholo izay btn mbola tsy niala, zan oe ze value=1
    for(let i=0; i<tab.length;i++){
        // console.log(btnList[i].id);
        for(let j=0;j<tab[i].length;j++){
            for(let z=0;z<btnList.length;z++){
                if(btnList[z].value==1){
                    btnList[z].setAttribute('style','background-image: '+imageVato+';');
                    // btnList[z].removeAttribute('style','background :  rgba(0, 255, 21, 0.5);');
                    // btnList[z].setAttribute('style','background :  rgba(0, 255, 21, 0.5);');
                }
                    
                else if(btnList[z].value==0){
                    btnList[z].removeAttribute('style','background-image:'+imageVato+';');
                    btnList[z].setAttribute('style','background : url(../img/solitaire3.jpg);');
                }
                    
            }

        }
    }
}

var imageVato = 'url(../img/bois4.jpg)';
var tab = [["x","x","x","x","x","x","x","x","x"],["x","x","x","x","x","x","x","x","x"],["x","x","x",0,1,1,"x","x","x"],["x","x",1,1,1,1,1,"x","x"],["x",1,1,1,1,1,1,1,"x"],["x",1,1,1,1,1,1,1,"x"],["x",1,1,1,1,1,1,1,"x"],["x","x",1,1,1,1,1,"x","x"],["x","x","x",1,1,1,"x","x","x"],["x","x","x","x","x","x","x","x","x"],["x","x","x","x","x","x","x","x","x"]];
var cptBtn=0;//compteur de bouton
let NbrBoule = _$('NbrBoule');
// let btnList = document.getElementsByTagName('button');
// NbrBoule.innerHTML = compteurBoule(btnList);
// console.log(tab[0][1]);
var createTable = function(){
    let tbody = _$("tbody");

    for(let i=0; i<tab.length;i++){
        let tr = _creatElts("tr"); 
        tbody.appendChild(tr);
        // let td = _creatElts("td");

        for(let j=0;j<tab[i].length;j++){
            tbody.appendChild(tr);

            let td = _creatElts("td");
            tr.appendChild(td);
            
            let cases = _creatElts("span");
            cases.innerHTML = tab[i][j];
            cases.id = "cases_L"+i+"_C_"+j;
            if(cases.textContent!="x"){
                let btn = _creatElts("button");
                cptBtn++;
                // btn.innerHTML = tab[i][j];
                btn.id = "btn_L"+i+"_C_"+j;
                btn.value = tab[i][j];
                btn.setAttribute('onclick',"display('"+btn.id+"')");
                td.appendChild(btn);
            }

        }
    }
}

createTable();

window.addEventListener('load',(e)=>{
    e.preventDefault();
    let btnList = document.getElementsByTagName('button');
    let tempLastBtnClick = "";  //variable temporaire
    let cptClick = 0; 
    let lastBtnClick = "";

    repaint(btnList);


    document.addEventListener('click',(e)=>{   
        // e.preventDefault();
        //supprimer tous les bordures pré-selectionner
        for(let x=0;x<tab.length;x++){
            for(let y=0;y<tab[x].length;y++){
                let ID = "btn_L"+x+"_C_"+y;
                let elems = _$(ID);
                if(elems!=null){
                    // elems.style.borderColor = "black";
                    elems.removeAttribute('style','border : 2px solid  rgba(0, 255, 21, 0.5);');
                    if(elems.value!=0){
                        // elems.setAttribute('style','background :  rgba(0, 255, 21, 0.5);');
                        elems.setAttribute('style','background-image: '+imageVato+';');
                    }
                    if(elems.value==0){
                        elems.setAttribute('style','background : url(../img/solitaire3.jpg);');
                    }
                        
                }
                    
            }
        }

        //ra vo manomboka de mtovy ilay lastBtnClick sy btnClickId
        if(cptClick == 0){
            tempLastBtnClick = btnClickId;
        }else{
            lastBtnClick = tempLastBtnClick;
            tempLastBtnClick = btnClickId;
        }
        // console.log(cptClick)
        
        let ElementBtnChoisit = _$(btnClickId);
        if(btnClickId == ElementBtnChoisit.id && ElementBtnChoisit.value!=0){
            let btn = document.querySelector('.btnBorderBlue');
            cptClick = 1; 
            if(btn)//fafana aloha ilay bordure anle btn teo aloha mba hahafahana msafidy vaovao indray
                btn.classList.remove('btnBorderBlue');
            ElementBtnChoisit.classList.add('btnBorderBlue') ;
        }
     
        let ligneValide = parseInt(btnClickId[5]);
        let colonneValide = parseInt(btnClickId[9]);

        let Lhaut = _$("btn_L"+(ligneValide-2)+"_C_"+colonneValide); //ligne -2 am misy anle selectionner
        let Lbas = _$("btn_L"+(ligneValide+2)+"_C_"+colonneValide);
        let Cgauche = _$("btn_L"+ligneValide+"_C_"+(colonneValide-2));
        let Cdroite = _$("btn_L"+ligneValide+"_C_"+(colonneValide+2));
        
        //choix des placement
        if(_$(btnClickId).value == 1){//ra mbola misy boule le kitiana dia afaka manao choix placement
            if(Lhaut!=null && Lhaut.value==0 && _$("btn_L"+(ligneValide-1)+"_C_"+colonneValide).value==1)
                Lhaut.setAttribute('style','border : 2px solid  rgba(0, 255, 21, 0.5);background : url(../img/solitaire3.jpg);');
            if(Lbas!=null && Lbas.value==0 && _$("btn_L"+(ligneValide+1)+"_C_"+colonneValide).value==1)
                Lbas.setAttribute('style','border : 2px solid rgba(0, 255, 21, 0.5);background : url(../img/solitaire3.jpg);');
            if(Cgauche!=null && Cgauche.value==0 && _$("btn_L"+ligneValide+"_C_"+(colonneValide-1)).value==1)
                Cgauche.setAttribute('style','border : 2px solid rgba(0, 255, 21, 0.5);background : url(../img/solitaire3.jpg);');
            if(Cdroite!=null && Cdroite.value==0 && _$("btn_L"+ligneValide+"_C_"+(colonneValide+1)).value==1)
                Cdroite.setAttribute('style','border : 2px solid  rgba(0, 255, 21, 0.5);background : url(../img/solitaire3.jpg);');
        }
        
        
        //suppression d'une boule
        
        // console.log("lastBtnClick :" + lastBtnClick);
        // console.log("btnClick :" + btnClickId);

        
        //ra meme ligne de colonne no mfanala sinon inverse anzay
        if(((lastBtnClick[5] - btnClickId[5])==0) && lastBtnClick!="" && lastBtnClick != btnClickId){ //si meme ligne
            let colonneASupprimer ;
            let LigneASupprimer = btnClickId[5];

            if(parseInt(lastBtnClick[9]) > parseInt(btnClickId[9])  && ((parseInt(lastBtnClick[9])-1) != parseInt(btnClickId[9]))){
                colonneASupprimer = parseInt(lastBtnClick[9]) - 1;
                suppressionBoule(tab,LigneASupprimer,colonneASupprimer,lastBtnClick,btnClickId,btnList);
                    
    
            }
            else{
                if(parseInt(lastBtnClick[9]) < parseInt(btnClickId[9])  && ((parseInt(lastBtnClick[9])) != (parseInt(btnClickId[9])-1))){
                        colonneASupprimer = parseInt(btnClickId[9]) - 1;
                        suppressionBoule(tab,LigneASupprimer,colonneASupprimer,lastBtnClick,btnClickId,btnList);
          
                        
                }
                
            }  
                    

        }else{
            //si meme colonne
            if(((lastBtnClick[9] - btnClickId[9])==0) && lastBtnClick!=""  && lastBtnClick != btnClickId ){ 
                let LigneASupprimer;
                let colonneASupprimer = btnClickId[9];
                
                if((parseInt(lastBtnClick[5]) > parseInt(btnClickId[5])) && ((lastBtnClick[5]-1) != btnClickId[5])){
                    LigneASupprimer = parseInt(lastBtnClick[5]) - 1;
                    suppressionBoule(tab,LigneASupprimer,colonneASupprimer,lastBtnClick,btnClickId,btnList);  
                }
                    
                else {
                    if((parseInt(lastBtnClick[5]) < parseInt(btnClickId[5])) && (lastBtnClick[5] != (btnClickId[5]-1))){
                        LigneASupprimer = parseInt(btnClickId[5]) - 1;
                        suppressionBoule(tab,LigneASupprimer,colonneASupprimer,lastBtnClick,btnClickId,btnList);   
                    }
                }  
                     
            }
            
        }
    
    });        
    
})

//reactualiser la page(Start Over)
window.addEventListener('load', (e)=>{
    document.getElementById('recommencer').onclick = function(){
        location.reload();
    }
})
 