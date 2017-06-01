#pragma strict
import UnityEngine.UI;

public var velocitaTransizione :float = 5f;

public var arena : GameObject;	//Il canvas in cui c'è il text
private var arenaText : Text ;	//Il text del canvas
private var entrata : boolean;
private var cancello : Animation;


function Start () 
{
		arenaText = arena.GetComponentInChildren(Text);
		arenaText.color = Color.clear;
		cancello = GameObject.Find("cancello").animation;
}

function Update()
{
	cambiaColore();
}

function cambiaColore()
{
	//Quando entro nel trigger cambio il colore del text, stessa cosa quando esco
	if(entrata)
		arenaText.color = Color.Lerp(arenaText.color, Color(255, 255, 255, 255), velocitaTransizione * Time.deltaTime);
	else
		arenaText.color = Color.Lerp(arenaText.color, Color.clear, velocitaTransizione * Time.deltaTime);
}


function OnTriggerEnter(other : Collider) 
{
		entrata = true;
		cancello.Play("apri");
		
}

function OnTriggerExit(other : Collider) 
{
		entrata = false;
		
}