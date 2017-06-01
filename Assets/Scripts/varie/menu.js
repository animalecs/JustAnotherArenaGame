#pragma strict

public var canvasLoading : GameObject;
public var tempoCaricamento : float;

private var timer : float;
private var startLoading : boolean;

function Start () 
{
	Time.timeScale = 1;
	canvasLoading.SetActive(false);
	timer = 0;
	startLoading = false;
	
}

function changeScene ()  {
	
	startLoading = true;
	
	canvasLoading.SetActive(true);
}

function exitGame() {
	Application.Quit();
}

function Update()
{
	Screen.showCursor = true;
	Time.timeScale = 1;
	if(startLoading)
		timer += Time.deltaTime;
	if(timer >= tempoCaricamento)
		Application.LoadLevel("demo2");
}

