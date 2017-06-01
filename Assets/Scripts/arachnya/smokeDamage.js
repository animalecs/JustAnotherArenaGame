#pragma strict

private var characterMotor : CharacterMotor;
private var nemico : GameObject;

function Start () {
	characterMotor = GameObject.Find("personaggio").GetComponent(CharacterMotor);
	nemico = GameObject.Find("personaggio");
}

function Update () {
	var distanceFromEnemy = Vector3.Distance(nemico.transform.position, transform.position);
	if(distanceFromEnemy < 9)
		characterMotor.movement.maxForwardSpeed = characterMotor.movement.maxForwardSpeed - 0.05;
}