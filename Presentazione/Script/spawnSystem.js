#pragma strict

//Numero di livelli presenti
public var numeroLivelli : int;
//Numero di nemici per livello
public var numeroNemiciLivello : int[];
//Array con i modelli 3D dei nemici
public var nemici : GameObject[];
//Posizione dei vari punit in cui i nemici appaiono
public var spawnPoints : GameObject[];
//Il livello in cui sono attualmente
public var livelloAttuale : int;

//Nemici rimanenti prima di passare al prossimo livello
public var numeroNemiciRestanti : int;
//Variabile che mi dice quanto tempo è trascorso dall'inizio del livello
private var tempoTrascorsoLivello : float;
//Variabile che suddivide il livello in ulteriori stage
private var stageLivello : int;
//Camera del personaggio
private var myCamera : Camera;
//Camera utilizzata per lo zoom, non più usata
private var gunCamera : Camera;
//Camera entrata in scena di Arachnya
private var arachnyaCamera : Camera;
//Variabile timer che disabilita la camera delle entrate in scena
private var timer : float;
//Canvas dell'entrata in scena di Arachnya
private var arachnyaCanvas : Canvas;
//Animazione dell'entrata in scena di Arachnya
private var arachnyaAnimation : Animation;
//Canvas dell'entrata in scena del Leviathan
private var leviathanCanvas : Canvas;
//Camera entrata in scena del Leviathan
private var leviathanCamera : Camera;
//Animazione dell'entrata in scena del Leviathan
private var leviathanAnimation : Animation;
//Variabile che fa decidere quale animazione di entrata in scena fare, Arachnya o Leviathan
private var animationTime : int;
//Variabile che controlla il globo finale
private var sphere : GameObject;
//Variabile che controlla il tempo dei dialoghi
private var timerDialoghi : float;
//Testo dei dialoghi
private var dialoghi : boolean;


function Start () {

	livelloAttuale = 0;
	stageLivello = 0;
	transizioneLivelli();
	
	//Ottengo i vari elementi
	gunCamera = GameObject.Find("personaggio/Main Camera/Camera").GetComponent(Camera);
	sphere = GameObject.Find("Portal");
	myCamera = GameObject.Find("personaggio/Main Camera").GetComponent(Camera);
	arachnyaCamera = GameObject.Find("arachnyaCamera").GetComponent(Camera);
	arachnyaCanvas = GameObject.Find("arachnyaCamera/arachnyaCanvas").GetComponent(Canvas);
	arachnyaAnimation = GameObject.Find("arachnyaCamera").GetComponent(Animation);
	leviathanCanvas = GameObject.Find("leviathanCamera/leviathanCanvas").GetComponent(Canvas);
	leviathanAnimation = GameObject.Find("leviathanCamera").GetComponent(Animation);
	leviathanCamera = GameObject.Find("leviathanCamera").GetComponent(Camera);
	
	animationTime = 0;
	dialoghi = false;
	sphere.SetActive(false);
	arachnyaCamera.enabled = false;
	arachnyaCanvas.enabled = false;
	
}

function Update () {

	if(numeroNemiciRestanti == 0)
		transizioneLivelli();
	tempoTrascorsoLivello += Time.deltaTime;
	//Controllo in che livello sono
	//Debug.Log("Nemici restanti: "+numeroNemiciRestanti);
	switch(livelloAttuale)
	{
		case 1:
			
			if(stageLivello == 0)
				spawn(4, 0);
			if(numeroNemiciRestanti == 9 && stageLivello == 1)
				spawn(4, 0);
				if(numeroNemiciRestanti == 5 && stageLivello == 2)
				spawn(4, 0);
			
			
			break;
		
		case 2:
			
			if(stageLivello == 0)
				spawn(1, 1);
			if(tempoTrascorsoLivello > 10 && tempoTrascorsoLivello < 30 && stageLivello == 1)
				spawn(4, 0);
			if(numeroNemiciRestanti == 1 && stageLivello == 2)
				spawn(1, 1);
			
			
			break;
		case 3:
			
			if(stageLivello == 0) {
				spawn(3, 0);
				spawn(1, 1);
			}
			
			
			if(stageLivello == 2 && numeroNemiciRestanti == 1) {
					Time.timeScale = 1;
					spawnAtPoint(1, 2, Vector3(124.26, 150.21, 234.19), Quaternion(0.0, 173.0, 0.0, 0.0));
			}
			
			if(stageLivello == 3) {
				timer += Time.deltaTime;
				if(timer > 3.5 && timer < 4) {
					Time.timeScale = 1;
					arachnyaCamera.enabled = false;
					arachnyaCanvas.enabled = false;
					gunCamera.enabled = true;
					myCamera.enabled = true;
					timer = 0;
				}
			}
			
			break;
		case 4:
		
			if(stageLivello == 0) {
					Time.timeScale = 1;
					timer = 0;
					spawnAtPoint(1, 3, Vector3(139.45, 150.21, 205), Quaternion(357.0, 190.0, 354.0, 0.0));
			}
			
			if(stageLivello == 1) {
				timer += Time.deltaTime;
				if(timer > 3 && timer < 3.2) {
					Time.timeScale = 1;
					arachnyaCamera.enabled = false;
					arachnyaCanvas.enabled = false;
					leviathanCamera.enabled = false;
					leviathanCanvas.enabled = false;
					gunCamera.enabled = true;
					myCamera.enabled = true;
				}
			}
				
			break;
		case 5:
			
			if(stageLivello == 0) {
					sphere.SetActive(true);
					dialoghi = true;
			}
			break;
	}
}

function OnGUI() {
	if(dialoghi) {
		timerDialoghi += Time.deltaTime;
		if(timerDialoghi > 0 && timerDialoghi < 6)
			GUI.Box(Rect((Screen.width/2)-200, Screen.height/1.2, 400, 25), "-Combattente dell'arena, hai raggiunto la fine del tuo cammino");
		if(timerDialoghi > 6 && timerDialoghi < 12)
			GUI.Box(Rect((Screen.width/2)-200, Screen.height/1.2, 400, 25), "-Raggiungi la statua dove hai incontrato il re dell'arena");
		if(timerDialoghi > 12 && timerDialoghi < 16)
			GUI.Box(Rect((Screen.width/2)-200, Screen.height/1.2, 400, 25), "-E farai ritorno a casa");
	}
}

//Passa da un livello al successivo
function transizioneLivelli() {
	numeroNemiciRestanti = numeroNemiciLivello[livelloAttuale];
	tempoTrascorsoLivello = 0;
	stageLivello = 0;
	livelloAttuale++;
	
}

//Spawna un nemico comune in un punto random delle spawn positions
function spawn(numeroNemiciDaSpawnare : int, tipoNemico : int) {
	stageLivello++;
	//Vettore che indica quanti nemici ho già spawnato per ogni spawn point
	var numeroSpawnPerSP : int[] = new int[6];
	var randomPosition : float;
	var spawnIsOk : boolean = false;
	var i : int;
	
	for(i = 0; i < numeroNemiciDaSpawnare; i++){
		while(!spawnIsOk){
			randomPosition = Random.Range(0.0, 5.0);
			if(numeroSpawnPerSP[randomPosition] <= media(numeroSpawnPerSP)){
				spawnIsOk = true;
				numeroSpawnPerSP[randomPosition]++;
				GameObject.Instantiate(nemici[tipoNemico], spawnPoints[randomPosition].transform.position, spawnPoints[randomPosition].transform.rotation);
			}
		}
		spawnIsOk = false;
	}

}

//Spawna un nemico specifico, o Arachnya o Leviathan, con le relative camere
function spawnAtPoint(numeroNemiciDaSpawnare : int, tipoNemico : int, position : Vector3, rotation : Quaternion) {
	stageLivello++;
	myCamera.enabled = false;
	gunCamera.enabled = false;
	Time.timeScale = 0.6;
	arachnyaCamera.enabled = false;
	arachnyaCanvas.enabled = false;
	animationTime++;
	if(animationTime == 1) {
		arachnyaCamera.enabled = true;
		arachnyaCanvas.enabled = true;
		arachnyaAnimation.Play("arachnyaCameraInitial");
		
		
	}
	else {
		leviathanCamera.enabled = true;
		leviathanCanvas.enabled = true;
		leviathanAnimation.Play("leviathanCameraInitial");
		
	}
	GameObject.Instantiate(nemici[tipoNemico], position, rotation);
}

//Funzione richiamata dai nemici alla loro morte
function enemyKilled() {
	numeroNemiciRestanti--;
	//Debug.Log(numeroNemiciRestanti);
}

//Calcola il valore medio di un vettore in input
function media(numeroSpawnPerSP : int[]) {
	var media : float;
	var numeroElementi : float;
	var sommaValori : float;
	var i : int;

	for(i = 0; i < numeroSpawnPerSP.length; i++)
		sommaValori += numeroSpawnPerSP[i];
	numeroElementi = numeroSpawnPerSP.length;
	media = sommaValori / numeroElementi;
	
	/*Debug.Log("Somma valori "+sommaValori);
	Debug.Log("Numero elementi "+numeroElementi);
	Debug.Log("Media "+media);
	*/
	return media;
}