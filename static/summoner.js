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
  };

}());

function loadSummonerData(summonerName){
    var sumRefObject = firebase.database().ref().child('summoner').child(summonerName.replace(' ', ''));
    var commentRefObject = firebase.database().ref().child('summoner').child(summonerName.replace(' ', '')).child('comments');

    sumRefObject.on('value', function(summoner){
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

        summoner.child('championData').forEach(function(data){
          data.forEach(function(queue){
            var champion = document.createElement('div');
            var champName = document.createElement('div');
            var champLvl = document.createElement('div');
            var champPoints = document.createElement('div');

            champion.setAttribute('class', 'champion');
            champName.setAttribute('class', 'champ-name');
            champLvl.setAttribute('class', 'champ-lvl');
            champPoints.setAttribute('class', 'champ-points');
            wrapper.appendChild(champion);

            if (champName.innerText == '') {
              object = queue.child('championName').val();
              var name = document.createTextNode('Champ: ' + object[Object.keys(object)[0]]);
              champName.appendChild(name);
              champion.appendChild(champName);
            }
            if (champLvl.innerText == '') {
              var lvl = document.createTextNode('LVL: ' + queue.child('championLevel').val());
              champLvl.appendChild(lvl);
              champion.appendChild(champLvl);
            }
            if (champPoints.innerText == '') {
              var points = document.createTextNode('Points: ' + queue.child('championPoints').val());
              champPoints.appendChild(points);
              champion.appendChild(champPoints);
            }
          });
        });
        
        commentRefObject.on('value', function(comments){
          var commentContainer = document.getElementById('comment-container');
          comments.forEach(function(queue){
            queue.forEach(function(text){
              var commentWrapper = document.createElement('div');
              commentWrapper.setAttribute('class', 'comment-wrapper');
              commentContainer.appendChild(commentWrapper);
              
              var comment = document.createElement('div');
              comment.setAttribute('class', 'comment');
              console.log(queue.key);

              if (comment.innerText == ''){
                var userDiv = document.createElement('div');
                userDiv.setAttribute('class', 'user-div');
                userDiv.innerText = queue.key;
                var text = document.createTextNode(text.val());
                comment.appendChild(text);
                commentWrapper.appendChild(userDiv);
                commentWrapper.appendChild(comment);
              }
            });
          });
        });

    });
}