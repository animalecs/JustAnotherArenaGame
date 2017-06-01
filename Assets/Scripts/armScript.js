#pragma strict

private var myAnimator : Animator;
private var waitAttackTime : float;
private var waitOtherAttack : float;
private var allowAttack	: boolean;
private var caricamentoSlowDown : GameObject;

function Start () {
	myAnimator = this.GetComponent(Animator);
	waitAttackTime = 0;
	myAnimator.SetBool("attack", false);
	caricamentoSlowDown = GameObject.Find("contenitoreVarie/UIMana/pnlArmaDue");
	waitOtherAttack = 0;
	allowAttack = true;
}

function Update () {

	if(Input.GetKey(KeyCode.W) && Input.GetKey(KeyCode.LeftShift))
		myAnimator.SetBool("run", true);
	else
		myAnimator.SetBool("run", false);
		
	if(waitAttackTime > 0)
		waitAttackTime += Time.deltaTime;
	if(waitOtherAttack > 0) {
		waitOtherAttack += Time.deltaTime;
		caricamentoSlowDown.transform.localScale.x += Time.deltaTime/90;
	}
	//Aspetta che venga eseguita la mossa prima di resettare le variabili
	if(waitOtherAttack > 15) {
		waitOtherAttack = 0;
		allowAttack = true;
	}
	if(waitAttackTime > 0.5) {
		myAnimator.SetBool("attack", false);
		myAnimator.SetInteger("attackType", 1);
		waitAttackTime = 0;
	}
		
	if(Input.GetMouseButtonDown(1) && !Input.GetKey(KeyCode.LeftShift) && allowAttack) {
		myAnimator.SetBool("attack", true);
		myAnimator.SetInteger("attackType", 0);
		caricamentoSlowDown.transform.localScale.x = 0;
		waitAttackTime += 0.1;
		waitOtherAttack = 0.1;
		allowAttack = false;
	}
	
		
}

function shoot() {
	BroadcastMessage ("sparaEffect");
}
