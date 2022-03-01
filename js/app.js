const spinner = document.getElementById('spinner');
const input = document.getElementById('search-input'); // search Input;

document.getElementById('search-btn').addEventListener('click', function () {
    spinner.style.display = "block";//loading spinner display Block;
    const url = `https://openapi.programming-hero.com/api/phones?search=${input.value}`;
    fetch(url)
        .then(res => res.json())
        .then(data => allPhones(data.data))

});


const allPhones = data => {

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = "";



    if (data.length === 0) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = "flex";
        spinner.style.display = "none";
        document.getElementById('device-name').innerText = input.value; //error Handler 
    }
    else {
        for (phone of data) {
            const div = document.createElement('div');
            const phoneId = phone.slug;
            // console.log(phoneId)
            div.innerHTML = `
             
            <div class="card" onclick="loadPhoneDetail('${phoneId}')">       
             
            <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
                 <div class="card-body">
                   <h4 class="card-title">${phone.phone_name}</h4>
                   <h5 class="card-title">${phone.brand}</h5>
                   
                   <a href="#top" class="btn btn-primary">Go somewhere</a>
                 </div>
                 </div>
            `;
            phoneContainer.appendChild(div);
            spinner.style.display = "none";
            document.getElementById('error-message').style.display = "none";

        }



    }

}

// view phone Full Details 
// view phone Full Details 


const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => phoneAllDetails(data.data))
}


const phoneAllDetails = (data) => {

    document.getElementById('phone-detail-container').style.display = "block";
    const phoneDetailsViewer = document.getElementById('phonedetail')
    let phoneData = data;
    let mainFeatures = data.mainFeatures;
    let others = data.others;
    phoneDetailsViewer.innerHTML = `
        <button onclick="closeOverlay()" class="close-btn btn-danger">close</button>
            <div class="card" style="width: 50%; height:20%; margin: 0 auto;">
        <img src="${phoneData.image}" class="card-img-top w-50" alt="">
        <div class="card-body">
        <h5 class="card-title">Name : ${phoneData.name}</h5>
        <p class="card-text">Brand : ${phoneData.brand}</p>
        <p class="card-text">ReleaseDate : ${phoneData.releaseDate}</p>
        <p class="card-text">DisplaySize : ${mainFeatures.displaySize}</p>
        <p class="card-text">ChipSet : ${mainFeatures.chipSet}</p>
        <p class="card-text">Storage : ${mainFeatures.storage}</p>
        <p class="card-text">Memory : ${mainFeatures.memory}</p>
        <p class="card-text">Sensors : ${mainFeatures.sensors}</p>
        <p class="card-text">WLAN : ${others.WLAN}</p>
        <p class="card-text">Bluetooth : ${others.Bluetooth}</p>
        <p class="card-text">GPS : ${others.GPS}</p>
         </div>
        </div>
    `;



}
// Main Body Loading Spinner 
// Main Body Loading Spinner 


document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        spinner.style.display = "block";
    } else {
        spinner.style.display = "none";
    }
};
const closeOverlay = () => {
    document.getElementById('phone-detail-container').style.display = "none";
}