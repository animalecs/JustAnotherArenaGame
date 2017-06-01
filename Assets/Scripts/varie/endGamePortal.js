#pragma strict

private var portal2 : GameObject;
private var creditsCanvas : Canvas;
private var timer : float;
private var personaggio : GameObject;
private var audioSourceBase : AudioSource;
private var gameFinished : boolean;
private var timerChangeScene : float;

public var gunSystem : gun_system;


function Start () {
	creditsCanvas = GameObject.Find("contenitoreVarie/Credits").GetComponent(Canvas);
	portal2 = GameObject.Find("Portal/Portal2");
	personaggio = GameObject.Find("personaggio");
	audioSourceBase = GameObject.Find("statuaTeschio").GetComponent(AudioSource);
	
	creditsCanvas.enabled = false;
	gameFinished = false;
}

function Update () {
	timer += Time.deltaTime;
	if(this.gameObject.name == "Portal" && timer > 1 && timer <2) {
		portal2.SetActive(false);
	}
	
	if(gameFinished) {
			Debug.Log(timerChangeScene);
			Debug.Log(Time.timeScale);
			timerChangeScene += Time.deltaTime;
			if(timerChangeScene > 50)
				 Application.LoadLevel("menu");
			
		}
}

function OnTriggerEnter(other : Collider) {
		if(this.gameObject.name == "Portal") {
			
			portal2.SetActive(true);
			GameObject.Find("Portal/Ball").SetActive(false);
			GameObject.Find("Portal/Glow").SetActive(false);
		}
		else {
			audioSourceBase.Stop();
			this.gameObject.GetComponent(AudioSource).audio.Play();
			creditsCanvas.enabled = true;
			gameFinished = true;
			Time.timeScale = 1;
			Screen.showCursor = true;
			Screen.lockCursor = false;
			gunSystem.enabled = false;
		}
		
		
		
}