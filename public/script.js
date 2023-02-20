var showClothes = document.getElementById("Show");
var addClothes = document.getElementById("Add");
var deletClothes = document.getElementById("Delet");
var showDetails = document.getElementById("ShowDetails");

showClothes.addEventListener("click", (e)=>{
    showDetails.style.display = "block";
    e.preventDefault();
})
