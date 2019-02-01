let app = (function () {

    if (document.deviceready) {
        document.addEventListener("deviceready", init);
    } else {
        document.addEventListener("DOMContentLoaded", init);
    }

    let stars = document.querySelectorAll(".star");
    let imgURI = document.getElementById("photo").src;
    
    
    let arrayStorage = [];

    function init() {
        
        document.getElementById("addButton").addEventListener("click", function () {
            currentPage(2);
        });

        document.getElementById("backButton").addEventListener("click", function () {
            console.log("hola");
            currentPage(0);
        });
        document.getElementById("cancelButton").addEventListener("click", function () {
            currentPage(0);
        })
        document.getElementById("btn").addEventListener("click", takePhoto);

        stars.forEach(function (star) {
            star.addEventListener("click", setStars);
        });
        let ratingNum = parseInt(document.querySelector(".stars").getAttribute("data-rating"));
        let target = stars[ratingNum - 1];
        target.dispatchEvent(new MouseEvent("click"));


        document.getElementById("saveButton").addEventListener("click", setLocalStorage);
        document.getElementById("saveButton").addEventListener("click", outputData);
        outputData();

document.getElementById("deleteBtn").addEventListener("click", deleteImg);


    }


    function currentPage(page) {
        let pageList = [];
        pageList = document.querySelectorAll(".page");

        for (let i = 0; i < pageList.length; i++) {
            if (page == i) {
                pageList[i].classList.add("active");
            } else {
                pageList[i].classList.remove("active");
            }
        }
    }


    function takePhoto() {

        let opts = {

            quality: 80,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG,
            cameraDirection: Camera.Direction.BACK,
            targetWidth: 300,
            targetHeight: 400

        };

        navigator.camera.getPicture(success, failure, opts)

    }

    function success(imgURI) {
        document.getElementById("msg").textContent = imgURI;
        document.getElementById("photo").src = imgURI;

        setLocalStorage(imgURI);
    }

    function failure(msg) {
        document.getElementById("msg").textContent = msg;
    }



    function setLocalStorage() {
        let commments = document.getElementById("commments");
        let objList = {
            "id": Date.now(),
            "title": commments.value,
            "rating": localStorage.getItem("ratingNum"),
            "img": imgURI
        }
        arrayStorage.push(objList);

        console.log(objList);

        localStorage.setItem("data", JSON.stringify(arrayStorage));
        commments.innerHTML = "";
        

    }
 

    function outputData() {

    let data = JSON.parse(localStorage.getItem("data"));
        let div = document.getElementById("insetList");
        div.innerHTML = "";

        data.forEach(function (item) {


            let ul = document.createElement("ul");
            ul.classList.add("title-ul");
            let title = document.createElement("li");

            title.textContent = item.title;

            title.classList.add("outputList");
            title.setAttribute("data-id", item.id);
           
            ul.appendChild(title);
            div.appendChild(ul);
            let titleList = document.querySelectorAll(".title-ul>li");
        


            titleList.forEach(function (item) {

                item.addEventListener("click", function (ev) {
                    let titleId = title.getAttribute("data-id");
                    console.log(titleId);
                    
                   


                    data.forEach(item => {
                        if (item.id == titleId) {
                            console.log(item);
                  
                            let rate =document.querySelector('.stars').getAttribute('data-rating');
                            console.log(rate);
                            
                            
                            let detailsDiv = document.getElementById("outPut-details");
                            detailsDiv.innerHTML = "";

                            let insideDiv = document.createElement("div");
                            let h2Img = document.createElement("h2");
                            let img = document.createElement("img");
                            let rateSaved = document.createElement("p");
                          


                            h2Img.textContent = item.title;
                            img.src = item.imgURI;
                            rateSaved.textContent= rate;
                            

                            detailsDiv.appendChild(insideDiv);
                            
                            insideDiv.appendChild(h2Img);
                            insideDiv.appendChild(img);
                            insideDiv.appendChild(rateSaved);
//                             localStorage.setItem("deleteThis", item.id);


                        }  
                    });
                    let theEv = ev.currentTarget;
                    let evId = theEv.getAttribute("data-id");
                    

                    localStorage.setItem("deleteThis", evId );
                    
                            
                    console.log("si")

                });
                item.addEventListener("click", function () {
                    currentPage(1);
                })
            
            })

        });

        currentPage(0);
    }

 function deleteImg(){
     //let ul = document.querySelector(".title-ul");
     let itemTodelete = localStorage.getItem("deleteThis");
     console.log(itemTodelete);
     //let detailsDiv = document.getElementById("outPut-details");
     //detailsDiv.innerHTML = "";
     let data = JSON.parse(localStorage.getItem("data"));
     
     let index = data.findIndex(item => item.id == itemTodelete);
     console.log(index);
     
//     data.remove(data[index]);
     
    data.splice(index, 0);
     currentPage(0);

//     if( )
//     detailsDiv.removeChild(div);
     }

    function setStars(ev) {

        let span = ev.currentTarget;
        let match = false;
        let num = 0;
        stars.forEach(function (star, index) {
            if (match) {
                star.classList.remove("rated");
            } else {
                star.classList.add("rated");
            }

            if (star === span) {
                match = true;
                num = index + 1;
                localStorage.setItem("ratingNum", num);
            }


        });
        document.querySelector('.stars').setAttribute('data-rating', num);
    }
    
  


})();









