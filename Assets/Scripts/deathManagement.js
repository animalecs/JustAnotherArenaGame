#pragma strict

public var health : float = 100.0f; 
//Più è alto e più il personaggio si rigenera velocemente
public var velocitaRigenerazione : float;

private var deathCanvas : Canvas;
private var bloodScreen : Image;
private var myCharacter : GameObject;
private var bloodIntensity : float;
private var death : GameObject;

function Start () {
	deathCanvas = GameObject.Find("deathCanvas").GetComponent(Canvas);
	bloodScreen = GameObject.Find("bloodScreen/pnlBloodScreen").GetComponent(Image);
	myCharacter = GameObject.Find("personaggio");
	
	deathCanvas.enabled = false;
}

function Update () {
	bloodIntensity = (100 - health)/100.0f;
	
	//Debug.Log("Blood: "+bloodIntensity);
	//Debug.Log("Health: "+health);
	if(bloodIntensity < 0.8)
		bloodScreen.color = Color(100, 0, 0, bloodIntensity);
	if(health <= 0) {
		deathCanvas.enabled = true;
		Screen.showCursor = true;
		Screen.lockCursor = false;
	}
	else {
		if(health < 100) {
			health += (Time.deltaTime * velocitaRigenerazione);
		}
	}
}

