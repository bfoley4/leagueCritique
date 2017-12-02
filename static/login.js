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
  		var txtEmail = document.getElementById('txt-email');
  		var txtPassword = document.getElementById('txt-password');
  		var btnLogin = document.getElementById('btn-login');
  		var btnSignUp = document.getElementById('btn-signup');

  		btnLogin.addEventListener('click', e => {
  			var username = txtEmail.value;
  			var password = txtPassword.value;
  			var auth = firebase.auth();
  			var promise = auth.signInWithEmailAndPassword(username, password);
  			promise.catch(e => console.log(e.message));
  		});

  		btnSignUp.addEventListener('click', e => {
  			var username = txtEmail.value;
  			var password = txtPassword.value;
  			var auth = firebase.auth();
  			var promise = auth.createUserWithEmailAndPassword(username, password);
  			promise.catch(e => console.log(e.message));
  		});

  		firebase.auth().onAuthStateChanged(firebaseUser => {
  			if(firebaseUser){
  				location.href = '/';
  			} else {
  				console.log('not logged in');
  			}
  		});
  	}

}());