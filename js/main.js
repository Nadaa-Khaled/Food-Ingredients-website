/* loading screen */
$(function(){
    $('#loading').fadeOut(2000,function(){
        $('body').css('overflow', 'auto')
    })
})

/*open and close sideNav section*/
function openSideNav(){
    $('#sideNavMenu').animate({left:0},500)
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    

}

function closeSideNav(){
    let width = $('#navMenu').innerWidth();    
    $('#sideNavMenu').animate({left:-width},500)
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
}
closeSideNav()

$("#navHeader i.open-close-icon").on('click', function(){
    let left = $('#sideNavMenu').css('left')

    if (left == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})
/* end of open and close sidenav section*/
/* showData home section */
async function showData(){
    searchContainer.innerHTML=""
    var data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s')
    var response= await data.json()
    displayData(response.meals)

}
showData()

function displayData(data){
    var mealsData = ''
        for(var i=0;i<data.length;i++){
            mealsData+=`
            <div class="col-md-3">
            <div onclick="getMealDetails('${data[i].idMeal}')" class="meal rounded-2 cursor-pointer ">
                    <img class="w-100" src="${data[i].strMealThumb}" >
                    <div class="meal-layer d-flex align-items-center  p-2">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
            </div>
            
            `
    }
    $('#rowData').html(mealsData)
    
}
/* start search section*/
$('#showSearchInputs').on('click', function(){
    closeSideNav()
   showSearchInputs()
})

function showSearchInputs() {
    
        searchContainer.innerHTML = `
        <div class="row py-4 ">
            <div class="col-md-6 ">
                <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
            </div>
        </div>
        `


    rowData.innerHTML = ""
}

async function searchByName(term){
    // rowData.innerHTML = ""

    var data =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    var response= await data.json()

    displayData(response.meals)
}
async function searchByLetter(letter) {
    // rowData.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    response = await response.json()

    displayData(response.meals)
   

}

async function getMealDetails(mealID) {
    closeSideNav()
    rowData.innerHTML = ""

    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals)

}

function displayMealDetails(meal) {
   

    var mealsData = ''
    for (var i = 0; i<meal.length; i++){
        mealsData =`
         <div class="col-md-4 text-white">
                <img class="w-100 rounded-3" src="${meal[i].strMealThumb}"
                    alt="">
                    <h2>${meal[i].strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${meal[i].strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal[i].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal[i].strCategory}</h3>
                <h3>Recipes :</h3>
                 <ul class="list-unstyled d-flex g-3 flex-wrap">
               <li class="alert alert-info m-2 p-1">${meal[i].strMeasure1} ${meal[i].strIngredient1}</li>
               <li class="alert alert-info m-2 p-1">${meal[i].strMeasure2} ${meal[i].strIngredient2}</li>
               <li class="alert alert-info m-2 p-1">${meal[i].strMeasure3} ${meal[i].strIngredient3}</li>
               <li class="alert alert-info m-2 p-1">${meal[i].strMeasure4} ${meal[i].strIngredient4}</li>
               <li class="alert alert-info m-2 p-1">${meal[i].strMeasure5} ${meal[i].strIngredient5}</li>
               <li class="alert alert-info m-2 p-1">${meal[i].strMeasure6} ${meal[i].strIngredient6}</li>
               <li class="alert alert-info m-2 p-1">${meal[i].strMeasure7} ${meal[i].strIngredient7}</li>
                 </ul>
                
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                <li class="alert alert-danger m-2 p-1">${meal[i].strTags}</li>
                </ul>
                <a target="_blank" href="${meal[i].strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal[i].strYoutube}" class="btn btn-danger">Youtube</a>
                </div>
            `
    }
    $('#rowData').html(mealsData)

}


/* category section*/

$('#getCatgories').on('click', function(){
    closeSideNav()
    getCategories()
    console.log('done')
})

async function getCategories(){
    rowData.innerHTML = ""
    searchContainer.innerHTML = "";
    var data = await fetch ('https://www.themealdb.com/api/json/v1/1/categories.php');
    response = await data.json();
    displayCategories(response.categories)
}

function displayCategories(data) {
    let mealData = ''
    for(let i =0; i < data.length; i++) {
        mealData += `
        <div class="col-md-3">
        <div onclick="getCategoryMeals('${data[i].strCategory}')" class="meal rounded-2 cursor-pointer">
            <img class="w-100" src="${data[i].strCategoryThumb}" alt="" >
            <div class="meal-layer position-absolute text-center p-2">
                <h3>${data[i].strCategory}</h3>
                <p>${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
</div>
        `
}
$('#rowData').html(mealData)
}
async function getCategoryMeals(category){
    rowData.innerHTML = ""
    searchContainer.innerHTML = "";
    var data = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await data.json()
    displayData(response.meals.slice(0, 20))
}

/* end of category section*/
/* area section */
$('#getArea').on('click', function(){
    closeSideNav()
    getArea()
})

async function getArea() {
    rowData.innerHTML = ""
    searchContainer.innerHTML = "";

    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await data.json()
    displayArea(respone.meals)

}

function displayArea(data) {
    let areaMeals = "";

    for (let i = 0; i < data.length; i++) {
        areaMeals += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${data[i].strArea}')" class=" meal rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
                        <h3 class="text-white">${data[i].strArea}</h3>
                </div>
        </div>
        `
    }
$('#rowData').html(areaMeals)
}
async function getAreaMeals(area) {
    rowData.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayData(response.meals.slice(0, 20))

}

/* end of area section */
/* start of ingredient section*/
$('#getIngredients').on('click',function(){
    closeSideNav()
    getIngredients()
})
async function getIngredients(){
    rowData.innerHTML = ""
    searchContainer.innerHTML = "";

    var data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    response = await data.json()
    displayIngredients(response.meals.slice(0, 20))

}

function displayIngredients(data){
    let mealsIngredient =''
    for (let i = 0; i < data.length; i++) {
        mealsIngredient+= `
        <div class="col-md-3 text-white">
        <div onclick="getIngredientsMeals('${data[i].strIngredient}')" class="cursor-pointer text-center">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${data[i].strIngredient}</h3>
                <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
</div> 
        `
    }
    $('#rowData').html(mealsIngredient)

}
async function getIngredientsMeals(ingredient){
    rowData.innerHTML = ""
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    response = await data.json()
    displayData(response.meals.slice(0, 20))
}

/* end of ingredient section*/
/* contact section*/

$('#showContactUs').on('click',function(){
    rowData.innerHTML=""
    searchContainer.innerHTML =""
    closeSideNav()
    showContacts()
})
function showContacts() {
    rowData.innerHTML = `<div class="contact d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *example@yahoo/gmail/outlook.com
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")
    $('#nameInput').on('focus',()=> {
        nameInputTouched = true})

    $('#emailInput').on("focus", () => {
        emailInputTouched = true
    })

    $('#phoneInput').on("focus", () => {
        phoneInputTouched = true
    })

    $('#ageInput').on("focus", () => {
        ageInputTouched = true
    })

    $('#passwordInput').on("focus", () => {
        passwordInputTouched = true
    })

    $('#repasswordInput').on("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
            
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() && emailValidation() && phoneValidation() &&  ageValidation() &&  passwordValidation() &&  repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } 
}

function nameValidation() {
    var regexName =/^[a-zA-Z ]+$/;
    return (regexName.test(nameInput.value))
}

function emailValidation(){
    var regexEmail =/^[a-zA-z0-9]{1,}(@)(yahoo|gmail|outlook)(.)(c)(o)(m)$/;
    return (regexEmail.test(emailInput.value))
   
}

function phoneValidation() {
    var regexPhone = /^((\+|0{0,2})([0-9]){1,3})?[-.●\s]?\(?([0-9]{2,3})\)?[-.●\s]?([0-9]{3})[-.●\s]?([0-9]{4})$/;
    return (regexPhone.test(phoneInput.value))
}

function ageValidation() {
    var regexAge = /^([1-9][0-9]|100)$/;
    return (regexAge.test(ageInput.value))
}

function passwordValidation() {
    var regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return (regexPassword.test(passwordInput.value))
}

function repasswordValidation() {
    return repasswordInput.value == passwordInput.value
}