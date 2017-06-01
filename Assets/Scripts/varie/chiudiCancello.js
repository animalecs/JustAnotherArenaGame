#pragma strict

private var cancello : Animation;

function Start () 
{
	cancello = GameObject.Find("cancello").animation;
}

function Update () 
{

}

function OnTriggerEnter(other : Collider) 
{
		cancello.Play("chiudi");
		GameObject.Destroy(this);
		
}