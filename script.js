//drag and drop
//selection des éléments à utiliser
const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");
let file; //notre variable globale

button.onclick = () => {
    input.click();
}
function dragImage() {
    input.addEventListener("change", function () {
        //avoir c'est que l'utilisateur choisi en premier
        dropArea.classList.add("active");
        showFile();
    });
       
    //Quand l'utilisateur est dans la zone pour déposer la photo
    dropArea.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropArea.classList.add("active");
        dragText.textContent = "Chargement du fichier";
    });
    
    //Quand l'utilisateur est dans la zone pour déposer la photo
    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("active");
        dragText.textContent = "Glisser et Déposer l'image";
    });
    
    //Si l'utilisateur dépose la photo à la zone
    dropArea.addEventListener("drop", (event) => {
        event.preventDefault();
        file = event.dataTransfer.files[0];
        showFile();
    }); 
}
dragImage();

function showFile() {
    let fileType = file.type; //selection du type de fichier
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //déterminer les extensions valides pour les images
    if (validExtensions.includes(fileType)) { //condition dont la personne choisis réellement une image
        let fileReader = new FileReader(); //création du nouvel objet
        fileReader.onload = () => {
            let fileURL = fileReader.result; //on passe l'url à la variable
            let imgTag = `<img src="${fileURL}" alt="mon profil" id="ImgProfile">`; //création de la variable imgTag à laquelle dans la source on lui passe l'url stocké
            dropArea.innerHTML = imgTag; //mettre notre image dans le conteneur du drag and drop
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("Ceci n'est pas une image !");
        dropArea.classList.remove("active");
        dragText.textContent = "Glisser et Déposer l'image";
    }
}
//enregistrement des informations 
//selection des éléments à utiliser
const formulaire = document.querySelector("form");
const btnCreer = document.querySelector("#btn-creer");
const btnInit = document.querySelector("#btn-init");
let profil = document.querySelector("#ImgProfile");
var row = null;
let hasEdit=false;
let updateId="";

//evenement pour le bouton créer 
btnCreer.addEventListener("click", (e) => {
    e.preventDefault();
    let i='info-'+Date.now().toString();
    let prenom = formulaire.querySelector("#prenom").value,
        nom = formulaire.querySelector("#nom").value,
        numero = formulaire.querySelector("#phone").value,
        groupe = formulaire.querySelector("#groupe").value,
        email = formulaire.querySelector("#email").value,
        bio = formulaire.querySelector("#bio").value;
    profil = formulaire.querySelector("img").src;
    if (hasEdit) {
        document.querySelector(`#${updateId} .name .name-button .firstname`).innerText=prenom;
        document.querySelector(`#${updateId} .name .name-button .lastname`).innerText=nom;
        document.querySelector(`#${updateId} .name .numero-mail .telephone`).innerText=numero;
        document.querySelector(`#${updateId} .name .name-button .groupe`).innerHTML=groupe;
        document.querySelector(`#${updateId} .name .numero-mail .email`).innerText=email;
        document.querySelector(`#${updateId} .name .lorem`).innerText=bio;
        document.querySelector(`#${updateId} .image`).src=profil;
    } else {
        
        let liste = `<div class="infos1" id="${i}">
        <img src="${profil}" alt="profile" class="image">
        <div class="name">
          <div class="name-button"><p class="firstname">${prenom} </p> <p class="lastname">${nom}</p> _ <p class="groupe">${groupe}</p> <i onclick="onEdit (this, '${i}')" class="fa-solid fa-user-pen"></i>
          <i onclick="onDelete (this)"  class="fa-solid fa-trash-can"></i></div>
          <div class="numero-mail"><p class="telephone">${numero}</p> _   <p class="email">${email}</p></div>
          <p class="lorem">${bio}</p>
        </div>
      </div>`;
    
        let listeContact = document.querySelector("#liste");
        listeContact.innerHTML += liste;
    }
    formulaire.reset();
    updateId="";
    hasEdit=false;
    formulaire.querySelector("#btn-creer").textContent='Créer';
    resetImage();  
 
});


//Supprimer un enregistrement
function onDelete(line) {
    if (confirm('Voulez-vous vraiment suppprimer cet enregistrement?')) {
        row=line.parentElement.parentElement.parentElement;
        row.remove();
    }
   
   
}
function onEdit(line,id) {
        row=line.parentElement.parentElement.parentElement;
       
        formulaire.querySelector("#prenom").value=row.querySelector(".firstname").innerHTML;
        formulaire.querySelector("#nom").value=row.querySelector(".lastname").innerHTML;
        formulaire.querySelector("#phone").value=row.querySelector(".telephone").innerHTML;
       formulaire.querySelector("select").value=row.querySelector(".groupe").textContent;
        formulaire.querySelector("#email").value=row.querySelector(".email").innerHTML;
        formulaire.querySelector("#bio").value=row.querySelector(".lorem").innerHTML;
        let fileURL=row.querySelector('.image').src;
       formulaire.querySelector("#btn-creer").textContent='Modifier';
 let imgTag = `<img src="${fileURL}" alt="mon profil" id="ImgProfile">`; //création de la variable imgTag à laquelle dans la source on lui passe l'url stocké
            dropArea.innerHTML = imgTag; 
        hasEdit=true;
        updateId=id;
}

btnInit.addEventListener("click", (e) =>{
   resetImage();
  
   
});
function resetImage() {

    formulaire.querySelector(".drag-area").innerHTML=`<header>Déposer la photo</header>
    <span>Ici</span>
    <button hidden>Importer</button>
    <input type="file" hidden>`;
    dragImage();
}