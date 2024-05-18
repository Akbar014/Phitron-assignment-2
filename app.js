


fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=D")
.then(res => res.json())
.then (data => {
    displayPlayerData(data.player)
   
})
.catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});



const displayPlayerData = (players) => {
    const playerContainer = document.getElementById("player-container")

    players.forEach(player => {
        const div = document.createElement("div")
        div.classList.add("col-md-4");
        div.classList.add("mt-2");
        if(player.strThumb == null){
            player.strThumb = "images/profile-default.png"
        }
        const playerDescription = player.strDescriptionEN ? player.strDescriptionEN.slice(1, 20) : 'No description';
        const instagramLink = `http://${player.strInstagram}`;
        const facebookLink = `http://${player.strFacebook}`;
        const twitterLink = `http://${player.strTwitter}`;
        div.innerHTML = `
        <div class="card p-3 py-4">
        <div class="text-center"> 
		<img src="${player.strThumb}" width="100" class="rounded-circle">
            <h3 class="mt-2 text-info">${player.strPlayer}</h3>
			<span class="mt-1 clearfix text-light">${player.strSport}</span>
			
			<div class="row mt-3 mb-3">

                <div class="col-md-4">
                <h6  class="text-info">ID</h6>
                <span class="num"> ${player.idPlayer} </span>
                </div>
			  <div class="col-md-4">
				<h6 class="text-info">Gender</h6>
				<span class="num">${player.strGender}</span>
			  </div>
			  <div class="col-md-4">
			  <h6 class="text-info">City</h6>
				<span class="num">${player.strNationality}</span>
			  </div>
			
			</div>
			
			<hr class="line">
			
			<small class="mt-4 text-light">${playerDescription}</small>
              <div class="social-buttons mt-5"> 
              <a href="${facebookLink}"><button class="neo-button"><i class="fa-brands fa-facebook"></i> </button> </a>
              <a href="${twitterLink}"><button class="neo-button"><i class="fa-brands fa-twitter"></i </button> </a>
              <a href="${instagramLink}"><button class="neo-button"><i class="fa-brands fa-square-instagram" style="color: #B197FC;"></i></button> </a>
			  </div>
			  
			 <div class="profile mt-5">
			 
			 <button onclick= "playerDetails('${player.idPlayer}')" class="profile_button px-5" data-bs-toggle="modal" data-bs-target="#exampleModal"> View profile</button>
			 <button onclick="handleAddToMember('${player.strPlayer.slice(0, 12)}','${player.strThumb}', '${player.idPlayer}')" id="${player.idPlayer}" class="profile_button px-5 mt-2">Add To Team</button>

		</div>
			   
        </div>
    </div>
        `
        playerContainer.appendChild(div);
    })
}

const playerDetails = (id) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then (res => res.json())
    .then (data => { 
        const playerDetails = document.getElementById("playerDetails")
        const div = document.createElement("div")
        data.players.forEach( details => {
            console.log(details.idPlayer) 
            document.getElementById("playerId").innerText = details.idPlayer
            document.getElementById("player-img").src = details.strThumb
            document.getElementById("playerName").innerText = details.strPlayer
            document.getElementById("playerDescription").innerText = details.strDescriptionEN
            document.getElementById("nationality").innerText = details.strNationality
            document.getElementById("sport").innerText = details.strSport
            document.getElementById("team").innerText = details.strTeam
        })
    })
}


document.getElementById("submitBtn").addEventListener(
    "click" , (event) => {
        const inputSearch = document.getElementById("inputSearch").value;
        fetch( `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${inputSearch}`)
        .then(res => res.json())
        .then (data => {
            const searchResult = document.getElementById("searchResult");

            data.player.forEach(player => {
                const div = document.createElement("div")
                div.classList.add("col-md-4");
                div.classList.add("mt-2");
                if(player.strThumb == null){
                    player.strThumb = "images/profile-default.png"
                }
                
        const playerDescription = player.strDescriptionEN ? player.strDescriptionEN.slice(1, 20) : 'No description';
        const instagramLink = `http://${player.strInstagram}`;
        const facebookLink = `http://${player.strFacebook}`;
        const twitterLink = `http://${player.strTwitter}`;
        div.innerHTML = `
                        <div class="card p-3 py-4">
                                <div class="text-center"> 
                                    <img src="${player.strThumb}" width="100" class="rounded-circle">
                                    <h3 class="mt-2 text-info">${player.strPlayer}</h3>
                                    <span class="mt-1 clearfix text-light">${player.strSport}</span>
                                    <div class="row mt-3 mb-3">
                                        <div class="col-md-4">
                                            <h6  class="text-info">ID</h6>
                                            <span class="num"> ${player.idPlayer} </span>
                                        </div>
                                        <div class="col-md-4">
                                            <h6 class="text-info">Gender</h6>
                                            <span class="num">${player.strGender}</span>
                                        </div>
                                        <div class="col-md-4">
                                            <h6 class="text-info">City</h6>
                                            <span class="num">${player.strNationality}</span>
                                        </div>
                                    </div>
                                    <hr class="line">
                                    
                                    <small class="mt-4 text-light">${playerDescription}</small>
                                    <div class="social-buttons mt-5"> 
                                    <a href="${facebookLink}"><button class="neo-button"><i class="fa-brands fa-facebook"></i> </button> </a>
                                    <a href="${twitterLink}"><button class="neo-button"><i class="fa-brands fa-twitter"></i </button> </a>
                                    <a href="${instagramLink}"><button class="neo-button"><i class="fa-brands fa-square-instagram" style="color: #B197FC;"></i></button> </a>
                                </div>
                                
                                <div class="profile mt-5">
                                    <button onclick= "playerDetails('${player.idPlayer}')" class="profile_button px-5" data-bs-toggle="modal" data-bs-target="#exampleModal"> View profile</button>
                                    <button onclick="handleAddToMember('${player.strPlayer.slice(0, 12)}','${player.strThumb}', '${player.idPlayer}')" id="${player.idPlayer}" class="profile_button px-5 mt-2">Add To Team</button>
                                </div>
                            </div>
                        </div>
                        `
                searchResult.appendChild(div);
            })

        })
    }
)

const handleAddToMember = (name, image, id) => {
    const membersCount = document.getElementById("memberNo").innerText;
    const check = document.getElementById(id).innerText
    console.log(check)
    
    if(check == "Member Added"){
        alert("This member already added")   
    }else{
        let convertedCount = parseInt(membersCount) 
        convertedCount += 1

        if(convertedCount <= 11){
            document.getElementById("memberNo").innerText = convertedCount
            const memberInfo = document.getElementById("memberInfo")
            const li = document.createElement("li")
            li.classList.add("list-group-item")
            li.style.background = "linear-gradient(145deg, #544856, #b3a7b5)"
            li.style.color = "white"
            li.innerHTML = `<img src="${image}" style="height: 40px"> ${name}`
            document.getElementById(id).innerText = "Member Added"
            document.getElementById(id).style.background = "red"
            memberInfo.append(li)
        }else{
            alert("You are not able to add more than 11 members ")
        }
    }
    
    
}


