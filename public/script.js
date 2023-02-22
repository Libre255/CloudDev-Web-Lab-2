var showClothes = document.getElementById("Show");
var addClothes = document.getElementById("Add");
var deletClothes = document.getElementById("Delet");
var showDetails = document.getElementById("ShowDetails");

//ShowClothes
showClothes.addEventListener("click", async (e)=>{
    showDetails.style.display = "flex";
    showDetails.innerHTML = ""
    fetch("/getClothes")
    .then(res => res.json())
    .then(ClothesList => {
        ClothesList.forEach(clothes => {
            showDetails.innerHTML += `
            <article>
                <h4>Name:${clothes.name}</h4>
                <p>Type: ${clothes.type}</p>
                <p>Id:${clothes.id}</p>
            </article>
            `
        })
    })
    e.preventDefault();
})
//AddClothes
addClothes.addEventListener("click", e => {
    showDetails.style.display = "flex";
    showDetails.innerHTML = `
    <form id="AddClothesForm">
        <label for="fname">Name:</label><br>
        <input type="text" id="fname" name="fname" ><br>
        <label for="lname">Type:</label><br>
        <select name="typeOfClothes" id="typeOfClothes">
            <option value="coat">Coat</option>
            <option value="t-shirt">T-Shirt</option>
            <option value="pants">Pants</option>
        </select>
        <br><br>
        <input id="submitNewClothesBtn" type="submit" value="Submit">
    </form> 
    `

    var submitNewClothesBtn = document.getElementById("submitNewClothesBtn");
    submitNewClothesBtn.addEventListener("click", e => {
        var NewClothesName = document.getElementById("fname");
        var SelectTypeDropDown = document.getElementById("typeOfClothes");

        const newClothesData = {
            name:NewClothesName.value,
            type:SelectTypeDropDown.value
        }
    
        fetch("/addclothes",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newClothesData)
        })
        .then(data => data.json())
        .then(result => {
            showDetails.innerHTML = `
                <span id="AddClothesResult">
                    You have succesfully added the following item
                    <br>
                    Name:${result.addedItem.name}<br>
                    Type:${result.addedItem.type}<br>
                    Id:${result.addedItem.id}
                 </span>        
            `
            console.log(result);
        })
        
        e.preventDefault();
    })
    e.preventDefault();
})


//DeletClothes
deletClothes.addEventListener("click", e =>{
    showDetails.style.display = "flex";
    showDetails.className ="deletClothesDiv"
    showDetails.innerHTML =`
    <form id="deletForm">
        <h3>Select the {ID} of the clothe you want to delet</h3>
        <select name="idOfClothes" id="IdOfClothes">
                
        </select>
        <input id="submitNewClothesBtn" type="submit" value="Submit">
    </form>
    `;

    var selectHtml = document.getElementById("IdOfClothes");
    fetch("/getClothes")
    .then(data => data.json())
    .then(ClothesList => {
        ClothesList.forEach(clothe => {
            selectHtml.innerHTML += `<option value=${clothe.id}>${clothe.id}</option>`
        })
    })
    var submitNewClothesBtn = document.getElementById("submitNewClothesBtn");
    var selectIdToDelet = document.getElementById("IdOfClothes");
    submitNewClothesBtn.addEventListener("click", e => {
        fetch("/deletclothes",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id:selectIdToDelet.value})
        })
        .then(data => data.json())
        .then(result => {
            showDetails.innerHTML = `
                <h3 id="deletResult">${result.result}</h3>
            `
            console.log(clothes);
        })

        console.log(selectIdToDelet.value);

        e.preventDefault();
    })

    e.preventDefault();
})
