#pragma strict

public var distanzaTiro : float;
public var danno : float;
public var numeroProiettili : int;
public var sangue : GameObject;
public var ammo : Text;

private var cameras : Camera;
private var ray : Ray;
private var hit : RaycastHit;


function Start () 
{
	cameras = GameObject.Find("Main Camera").camera;
}

function Update()
{
	//Mi restituisce ad ogni frame la posizione del mirino con coordinate 3D
	ray = cameras.ScreenPointToRay (Vector3(Screen.width/2, Screen.height/2, 0));
	
}

//Funzione chiamata dall'animation event dell'arma che fa fuoco
function spara () 
{
	
	Debug.DrawRay(transform.position, ray.direction * 300, Color.red, 1);
	
	//Se sto sparando e colpisco un nemico
	if(Physics.Raycast(transform.position, ray.direction, hit) && hit.distance <= distanzaTiro && hit.collider.gameObject.layer == LayerMask.NameToLayer("nemico")) {	
		
		var bloodShot : GameObject;
		//Debug.Log("sparo");
		//Mando il messaggio all'oggetto colpito con il danno
   		hit.transform.SendMessage("gunHit", danno, SendMessageOptions.DontRequireReceiver); 
   		bloodShot = Instantiate(sangue, hit.point - Vector3(0, 0 ,0.5), Quaternion.FromToRotation(transform.up, hit.point));
   		bloodShot.transform.parent =  hit.transform;
   		
   	}
   	
}