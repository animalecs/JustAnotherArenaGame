#pragma strict

public var initialCamera : GameObject;
public var characterCamera : Camera;
public var personaggio : GameObject;
public var spawnSystem : spawnSystem;

private var animationController : Animation;
private var soundtrack : AudioSource;
private var bloodScreen : Canvas;
private var king : GameObject;
private var deathCanvas : Canvas;
private var timerDialoghi : float;
private var mySpawnSystem : spawnSystem;
private var manaGUI : Canvas;
private var mirinoGUI : GUITexture;
private var ball : GameObject;
private var portal : GameObject;

function Start () 
{
	Time.timeScale = 1;
	Screen.showCursor = false;
	Screen.lockCursor = true;
	
	
	initialCamera.GetComponent(Camera).enabled=true;
	manaGUI = GameObject.Find("contenitoreVarie/UIMana").GetComponent(Canvas);
	mirinoGUI = GameObject.Find("mirino").GetComponent(GUITexture);
	soundtrack = GameObject.Find("statuaTeschio").GetComponent(AudioSource);
	king = GameObject.Find("king");
	animationController = GetComponent(Animation);
	ball = GameObject.Find("Portal");
	mySpawnSystem = GameObject.Find("spawnPoints").GetComponent("spawnSystem");
	bloodScreen = GameObject.Find("bloodScreen").GetComponent(Canvas);
	deathCanvas = GameObject.Find("deathCanvas").GetComponent(Canvas);
	
	soundtrack.enabled = false;
	spawnSystem.enabled=false;
	manaGUI.enabled = false;
	mirinoGUI.enabled = false;
	ball.SetActive(false);
	
	characterCamera.enabled=false;
	bloodScreen.enabled = false;
	deathCanvas.enabled = false;
	personaggio.SetActive(false);
	timerDialoghi = 0;
	animationController.Play("initialAnimation");
}

function OnGUI() {
	
	timerDialoghi += Time.deltaTime;
	if(timerDialoghi > 6 && timerDialoghi < 9)
		GUI.Box(Rect(Screen.width/2, Screen.height/1.2, 100, 25), "Dove mi trovo?");
	if(timerDialoghi > 15 && timerDialoghi < 23)
		GUI.Box(Rect((Screen.width/2)-150, Screen.height/1.2, 300, 25),"E come mai ho solo più una mano!?!?");
	if(timerDialoghi > 27 && timerDialoghi < 33)
		GUI.Box(Rect((Screen.width/2)-150, Screen.height/1.2, 300, 25), "Ho un brutto presentimento..");
	if(timerDialoghi > 70 && timerDialoghi < 75)
		GUI.Box(Rect((Screen.width/2)-200, Screen.height/1.2, 400, 25), "Questo tizio sembra strano quanto questo posto..");
	if(timerDialoghi > 80 && timerDialoghi < 86)
		GUI.Box(Rect((Screen.width/2)-200, Screen.height/1.2, 400, 50), "-BENVENUTO NELL'ARENA!\n\nIL LUOGO DOVE TU DOVRAI COMBATTERE!");
	if(timerDialoghi > 87 && timerDialoghi < 89)
		GUI.Box(Rect((Screen.width/2)-100, Screen.height/1.2, 400, 25), "-BUONA FORTUNA!");
}

function changeCamera() {
	deathCanvas.enabled = true;
	ball.SetActive(true);
	mySpawnSystem.enabled = true;
	king.SetActive(false);
	initialCamera.SetActive(false);
	manaGUI.enabled = true;
	mirinoGUI.enabled = true;
	personaggio.SetActive(true);
	characterCamera.enabled=true;
	soundtrack.enabled = true;
	
	
	startSpawn();
	this.enabled = false;
}

function startSpawn() {
	bloodScreen.enabled = true;
	spawnSystem.enabled = true;
}