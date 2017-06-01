#pragma strict

function Start () {

}

function Update () {

}

function goToMainMenu(){
	Time.timeScale = 1;
	Application.LoadLevel("menu");
}

function restart() {
	Time.timeScale = 1;
	Application.LoadLevel("demo2");
	
}