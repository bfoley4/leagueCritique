(function(){

	// Initialize Firebase
  	var config = {
    	apiKey: "AIzaSyDpKcKnnOCf7KOlbPlYSN9BymVcpw8DkQE",
    	authDomain: "cs4830final.firebaseapp.com",
    	databaseURL: "https://cs4830final.firebaseio.com",
    	projectId: "cs4830final",
    	storageBucket: "cs4830final.appspot.com",
    	messagingSenderId: "382745737283"
  	};

    firebase.initializeApp(config);

  	const sumRefObject = firebase.database().ref().child('summoner');

    sumRefObject.on('value', snap => {
    	var summonerObject = document.getElementById('summoner');
        summonerObject.innerText = JSON.stringify(snap.val(), null, 3);
    });

    sumRefObject.on('value', function(summoner){
        summoner.forEach(function(summoner){
            var wrapper = document.getElementById('wrapper');
            var summonerWrapper = document.createElement('div');
            var summonerLink = document.createElement('a');
            var summonerName = document.createElement('div');
            var summonerSoloDivision = document.createElement('div');
            var summonerSoloLp = document.createElement('div');
            var summonerSoloWins = document.createElement('div');
            var summonerSoloLosses = document.createElement('div');

            summonerWrapper.setAttribute('class', 'summoner');
            summonerLink.setAttribute('class', 'summoner-link');
            summonerName.setAttribute('class', 'summoner-name');
            summonerSoloDivision.setAttribute('class', 'summoner-solo-division');
            summonerSoloLp.setAttribute('class', 'summoner-solo-lp');
            summonerSoloWins.setAttribute('class', 'summoner-solo-wins');
            summonerSoloLosses.setAttribute('class', 'summoner-solo-losses');

            wrapper.appendChild(summonerWrapper);
            summoner.child('summonerData').forEach(function(data){
                data.forEach(function(queue){
                    if (summonerName.innerText == '') {
                        var name = document.createTextNode(queue.child('playerOrTeamName').val());
                        summonerLink.setAttribute('href', '/summoner/' + queue.child('playerOrTeamName').val());
                        summonerName.appendChild(name);
                        summonerLink.appendChild(summonerName);
                        summonerWrapper.appendChild(summonerLink);
                    }
                    if (summonerSoloDivision.innerText == '') {
                        var soloDivision = document.createTextNode('Solo Queue: ' + queue.child('tier').val() + ' ' + queue.child('rank').val());
                        summonerSoloDivision.appendChild(soloDivision);
                        summonerWrapper.appendChild(summonerSoloDivision);
                    }
                    if (summonerSoloLp.innerText == '') {
                        var soloLp = document.createTextNode('LP: ' + queue.child('leaguePoints').val());
                        summonerSoloLp.appendChild(soloLp);
                        summonerWrapper.appendChild(summonerSoloLp);
                    }
                    if (summonerSoloWins.innerText == '') {
                        var soloWins = document.createTextNode('Wins: ' + queue.child('wins').val());
                        summonerSoloWins.appendChild(soloWins);
                        summonerWrapper.appendChild(summonerSoloWins);
                    }
                    if (summonerSoloLosses.innerText == '') {
                        var soloLosses = document.createTextNode('Losses: ' + queue.child('losses').val());
                        summonerSoloLosses.appendChild(soloLosses);
                        summonerWrapper.appendChild(summonerSoloLosses);
                    }
                });
            });
        });
    });
    
    window.onload = function(){
        loginLink = document.getElementById('login-link');
        logoutLink = document.getElementById('logout-link');
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
                logoutLink.classList.remove('hide');
                loginLink.classList.add('hide');
            } else {
                logoutLink.classList.add('hide');
                loginLink.classList.remove('hide');
            }
        });

        logoutLink.addEventListener('click', e => {
            firebase.auth().signOut();
        });
    }

}());

function summonerDropdown(){
  document.getElementById('summonerDropdown').classList.toggle('show');
}

function insertSummoner(summonerName){
    var dbRef = firebase.database().ref();
    if (dbRef.child('summoner/' + summonerName)) {
        dbRef.child('summoner/' + summonerName + '/comments').set('None');
        dbRef.child('summoner/' + summonerName + '/championData').set('None');
        dbRef.child('summoner/' + summonerName + '/summonerData').set('None');
    }
}

window.onclick = function(event) {
  if (!event.target.matches('#dropdown-link') && !event.target.matches('.new-summoner') && !event.target.matches('.btn-primary')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if(openDropdown.classList.contains('show')){
        openDropdown.classList.remove('show');
      }
    }
  }
}