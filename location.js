
 var getLocation =document.getElementById("location");
 
 function getnavigation() {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(showPosition,onError);
   } else { 
   getLocation.innerHTML = "Geolocation is not supported by this browser.";
   }
 }
 
 function showPosition(position) {
   // x2.innerHTML = "Latitude: " + position.coords.latitude + 
   // "<br>Longitude: " + position.coords.longitude;
   // console.log(x2);
   let {latitude, longitude} = position.coords;
   fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=67f6dad0bbda4bd7b69b4925042f48e5`)
   .then(response => response.json()).then(response =>{
       let allDetails = response.results[0].components;
       console.table(allDetails);
       let {municipality, region, postcode, country} = allDetails;
             document.getElementById("address").value = `${municipality} ,${region} ${postcode}, ${country} `;
             document.getElementById("gps").value= ` https://maps.google.com/?q=${latitude},${longitude}`;
           }).catch(()=>{
      console.log("error");
   });
   // document.getElementById("location").value=   "Latitude: " + position.coords.latitude + 
   // " | Longitude: " + position.coords.longitude;;
  
 }
 function onError(error){
   if(error.code == 1){
        document.getElementById("name").value="Please Turn on Location Service";
        document.getElementById("number").value="Please Turn on Location Service";
        document.getElementById("gps").value="";
       document.getElementById("address").value = "";
       showPosition();
     }else if(error.code == 2){
     document.getElementById("address").value = "Location is unavailable";
     document.getElementById("name").value = "Location is unavailable";
     document.getElementById("number").value = "Location is unavailable";
     document.getElementById("gps").value = "Location is unavailable";
   }else{
     document.getElementById("address").value = "Something went wrong";
     document.getElementById("name").value = "Something went wrong";
     document.getElementById("number").value = "Something went wrong";
     document.getElementById("gps").value = "Something went wrong";
   }
   getLocation.setAttribute("disabled", "true");
 }

