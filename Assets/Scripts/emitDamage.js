#pragma strict

private var healthSystem : deathManagement;
private var timeToWait : float;
private var canSendDamage : boolean = true;
private var attackState : int;

public var myAnimator : Animator;
public var damage : float;

public var rayLength : float;

function Start () {
	healthSystem = GameObject.Find("colliderHealth").GetComponent(deathManagement);
	timeToWait = 0.8;
	attackState = Animator.StringToHash("Base.generalAttack");
}

function Update () {
	
	if(!myAnimator.GetBool("death") && myAnimator.GetBool("attack") && myAnimator.GetCurrentAnimatorStateInfo(0) != attackState) {
		var ray : Ray;
		var hit : RaycastHit;
		
		ray = new Ray (transform.position, transform.forward);
		
		Debug.DrawRay(transform.position, ray.direction * rayLength, Color.red, 0.4);
		
		//Se sto sparando e colpisco un nemico
		if(canSendDamage && Physics.Raycast(transform.position, ray.direction, hit) && hit.distance <= rayLength &&hit.collider.gameObject.layer == 11) {	
			
			Debug.Log("colpito nemico");
			healthSystem.health -= damage;
	   		canSendDamage = false;
	   	}
	   	
	   	if(!canSendDamage)
	   		waitNextAttack();
   	}
}

function waitNextAttack() {
	timeToWait -= Time.deltaTime;
	canSendDamage = false;
	if(timeToWait <= 0) {
		timeToWait = 0.8;
		canSendDamage = true;
	}
}