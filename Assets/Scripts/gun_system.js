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
	/*
	//Zoommo con l'arma	
	if(Input.GetMouseButton(1))
		animator.SetBool("idleMira", true);
	else 
		animator.SetBool("idleMira", false);
	*/
		
//-------------------------------------------------------- Braccio -----------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
/*			
	if(Input.GetMouseButtonDown(1) && !corsa && !ricarica) {
		usoBraccio = true;
	}
	
	if(Input.GetMouseButtonUp(1)) {
		usoBraccio = false;
	}
*/	
//-------------------------------------------------------- MIRA -----------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------

/*
	if(Input.GetMouseButtonDown(1))
	{
		var velocitaAndata = -8000.0;
		myCamera.fieldOfView = Mathf.SmoothDamp(myCamera.fieldOfView, 45.0, velocitaAndata, smoothTime);
		//Debug.Log("giù "+velocitaAndata);
		mira = true;
		mirino.active=false;
	}
		
	if(Input.GetMouseButtonUp(1))
	{
		var velocitaRitorno = 8000.0;
		myCamera.fieldOfView = Mathf.SmoothDamp(myCamera.fieldOfView, 60.0, velocitaRitorno, smoothTime);
		//Debug.Log("su");
		mira = false;
		mirino.active=true;
	}
	*/
	
	
//------------------------------------------------- ANIMAZIONI GUN SYSTEM------------------------------------------
//---------------------------------------------------------------------------------------------------------------	
	
	//Faccio partire l'animazione generale della corsa	
	if((Input.GetKey(KeyCode.W) || Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.D)) && Input.GetKey(KeyCode.LeftShift) && !ricarica){
		myAnimator.SetBool("run", true);
		myScript.movement.maxForwardSpeed = 10;
		mirino.enabled=false;
		corsa = true;
	}
	else{
		mirino.enabled=true;
		myAnimator.SetBool("run", false);
		myScript.movement.maxForwardSpeed = 7;
		corsa = false;
	}
	
	//Faccio partire l'animazione generale della camminata
	if(Input.GetKey(KeyCode.W) || Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.S) || Input.GetKey(KeyCode.D))
		myAnimator.SetBool("walk", true);
	else
		myAnimator.SetBool("walk", false);
		
	//Quando ricarico
	if(Input.GetKeyDown(KeyCode.R) && !shoot && (munizioniArma[indice_arma] != munizioniMaxArma[indice_arma]))
		animator.SetBool("reload", true);
		
}
//----------------------------------------------RICARICA-----------------------------------------------------
//------------------------------------------------------------------------------------------------------------------

//Funzione richiamata alla fine della ricarica dell'arma
function ricaricaArma() {
	var proiettiliRichiesti : int;
		
	ricarica = false;
	animator.SetBool("reload", false);
	proiettiliRichiesti = munizioniMaxArma[indice_arma] - munizioniArma[indice_arma];
	if(munizioniTotaliArma[indice_arma] < proiettiliRichiesti)
		proiettiliRichiesti = munizioniTotaliArma[indice_arma];
	else
	{
		munizioniTotaliArma[indice_arma] -= proiettiliRichiesti;
		munizioniArma[indice_arma] += proiettiliRichiesti;
	}
	visualizzatoreMunizioni[indice_arma].text = munizioniArma[indice_arma].ToString() + "\n" + munizioniTotaliArma[indice_arma].ToString();
		
}

//----------------------------------------------FUNZIONI ESTERNE-----------------------------------------------------
//------------------------------------------------------------------------------------------------------------------

//Questa funzione è richiamata alla fine dell'animazione
function switch_weapon(){
		//Disattivo l'arma attuale
		weapons[old_index_weapon].SetActive(false);
		//Attivo l'arma successiva e ottengo il suo animator
		weapons[indice_arma].SetActive(true);
		animator = weapons[indice_arma].GetComponent(Animator);
		//Eseguo l'animazione di entrata dell'arma
		animation.Play("weapon_entry");
		isSwitchFinished=true;
}

function walk_sound() {
	if(!Input.GetKey(KeyCode.Space)){
		audio.Play();
	}
}

function gestisciMunizioni() {
	//Gestisco lo sparo solo se ho abbastanza munizioni
	if(munizioniArma[indice_arma] != 0 && !ricarica){
		//Mando un messaggio al mio figlio che si occupa dello sparo che deve sparare
		BroadcastMessage ("spara");
		//Riproduco il suono dello sparo
		audioSourceGuns.volume = audioSourceVolume;
		audioSourceGuns.PlayOneShot(audioShoot[indice_arma]);
		munizioniArma[indice_arma]--;
		visualizzatoreMunizioni[indice_arma].text = munizioniArma[indice_arma].ToString() + "\n" + munizioniTotaliArma[indice_arma].ToString();
	}
}


