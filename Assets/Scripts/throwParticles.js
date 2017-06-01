#pragma strict

private var myRigidbody : Rigidbody;
private var cameras : Camera;
private var ray : Ray;
private var hit : RaycastHit;
private var character : GameObject;
private var timerCollision : float;


function Start () {
	myRigidbody = this.GetComponent(Rigidbody);
	character = GameObject.Find("personaggio");
	
	cameras = GameObject.Find("Main Camera").camera;
	ray = cameras.ScreenPointToRay (Vector3(Screen.width/2, Screen.height/2, 0));
	timerCollision = 0;
}

function Update () {
	
	if(timerCollision > 0)
		timerCollision += Time.deltaTime;
	if(timerCollision >= 0.4)
		Destroy(this.gameObject);
	
	if(Physics.Raycast(transform.position, ray.direction, hit)) {	
		transform.position = Vector3.MoveTowards(transform.position, hit.point, Time.deltaTime * 20);
   	}
}

function OnCollisionEnter(collision : Collision) {
		
		if(collision.gameObject.layer != "TransparentFX"){
			transform.Find("Explosion").active = true;
			transform.Find("Ball").collider.enabled = false;
			//Debug.Log("ciao");
			timerCollision += Time.deltaTime;
		}
}