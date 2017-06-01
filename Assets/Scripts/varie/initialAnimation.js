#pragma strict

private var kingAnimation : Animation;

function Start () {
	kingAnimation = GameObject.Find("king").GetComponent(Animation);
	kingAnimation.enabled = false;
}

function Update () {

}

function OnTriggerEnter(other : Collider) {
		kingAnimation.enabled = true;
		kingAnimation.Play("initialAnimation");
		kingAnimation["initialAnimation"].speed = 1;
		this.enabled = false;
}