#pragma strict

private var indice_arma = 0;	//La nuova arma appena switchata
private var old_index_weapon;	//L'arma precedentemente in uso
private var animator : Animator;	//L'animator dell'arma in uso
private var isSwitchFinished = true;	//Mi dice se posso eseguire lo switch dell'arma o se è ancora in corso
private var myAnimator : Animator;	//L'animatore del gun system
private var myScript : CharacterMotor; //Lo script del movimento personaggio
private var myCamera : Camera;	//La camera del personaggio
private var smoothTime = 300; //Variabile per la mira
private var mira = false; //Variabile che mi dice se sono attualmente in fase di mira
private var corsa = false; //Variabile che mi dice se sono attualmente in fase di corsa
private var shoot : boolean = false; //Variabile che mi dice se sto sparando
private var ricarica : boolean;
private var usoBraccio : boolean;


public var mirino : GUITexture;
public var weapons : GameObject[];	//L'array delle armi del giocatore
public var nMaxArmi : int;	// Numero massimo di armi
public var munizioniArma : int[]; //Munizioni "in canna" per ogni arma
public var munizioniTotaliArma : int[]; //Munizioni totali disponibili per ogni arma
public var munizioniMaxArma : int[]; //Munizioni massime che può avere un'arma in canna
public var visualizzatoreMunizioni : Text[]; //La GUI delle munizioni
public var audioShoot : AudioClip[]; //Suono dello sparo di ogni arma
public var audioSourceGuns : AudioSource; //Audiosource del suono di sparo delle armi
public var audioSourceVolume : float;


/*
	Per generalizzare lo script ogni arma deve avere le 
	animazioni che si chiamano nello stesso modo:
	 -idle
	 -idleMira
	 -shoot
	 -shoot2 per lo sparo con mira
	all'interno dell'animator
*/

function Start () {
	audioSourceGuns.priority = 200;
	myCamera = GameObject.Find("Main Camera").GetComponent(Camera);
	Screen.lockCursor = true;
	myScript = GameObject.Find("personaggio").GetComponent(CharacterMotor);
	myAnimator = GetComponentInChildren(Animator);
	old_index_weapon = 0;
	weapons[indice_arma].SetActive(true);
	animator = weapons[indice_arma].GetComponent(Animator);
	animation.Play("weapon_entry");
	myCamera.fieldOfView = 60;
	animator.SetBool("shoot", false);
	ricarica = false;
	usoBraccio = false;
	Time.timeScale = 1;
}

function Update () {

//-------------------------------------------SWITCH ARMI-------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
	
	//Scroll in avanti dell'arma
	if (Input.GetAxis("Mouse ScrollWheel") > 0 && isSwitchFinished) {
		if(indice_arma < nMaxArmi){
			isSwitchFinished=false;
			old_index_weapon = indice_arma;
			indice_arma++;
			animation.Play("weapon_exit");
			
			
		}
	}
	
	//Scroll indietro dell'arma
	if (Input.GetAxis("Mouse ScrollWheel") < 0 && isSwitchFinished) {
		if(indice_arma > 0) {
			isSwitchFinished=false;
			old_index_weapon = indice_arma;
			indice_arma--;
			animation.Play("weapon_exit");
		}
	}
	
//--------------------------------------MOVIMENTI ARMI---------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
	
	//Faccio partire l'animazione della singola arma
	if(Input.GetMouseButton(0) && !corsa && !ricarica && !usoBraccio) {
		animator.SetBool("shoot", true);
		shoot = true;
	}
	
	if(Input.GetMouseButtonUp(0)) {
		animator.SetBool("shoot", false);
		shoot = false;
	}
	
	
	if(munizioniArma[indice_arma] == 0) {
		animator.SetBool("shoot", false);
		shoot = false;
	}
	

}

