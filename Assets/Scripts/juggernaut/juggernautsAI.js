#pragma strict

public var velocitaMax : float;
public var salute : float;
public var distanzaAttacco : float;
public var dannoMinMax : float[];

private var agent : NavMeshAgent; //Il navMeshAgent dell'object su cui è presente questo script
private var nemico : GameObject;
private var animator : Animator; //L'animator del juggernaut
private var distanceFromEnemy : float; //Distanza dal nemico
private var attackType : float;
private var saluteMax : float;
private var tempoTrascorsoAttacco : float;
private var danno : float;
private var timerMorte : float;
private var playOnce : boolean;
private var spawnSystemCounter : spawnSystem;

function Start () {
	agent = GetComponent.<NavMeshAgent>();
	animator = GetComponent.<Animator>();
	nemico = GameObject.Find("personaggio");
	spawnSystemCounter = GameObject.Find("spawnPoints").GetComponent(spawnSystem);
	agent.speed = velocitaMax;
	saluteMax = salute;
	Random.seed = Random.Range(1, 100);
	//Quando l'attackType è 0 non devo attaccare
	attackType = 0;
	danno = dannoMinMax[0];
	playOnce = false;
}

function Update () {

	//Se sono ancora vivo
	if(salute > 0){
		distanceFromEnemy = Vector3.Distance(nemico.transform.position, transform.position);
		if(animator.GetCurrentAnimatorStateInfo(0).nameHash != Animator.StringToHash("Base Layer.idle"))
			attackType = 0;
		
		if(distanceFromEnemy > 2){
			var rotazione = Vector3(nemico.transform.position.x, transform.position.y, nemico.transform.position.z);
			transform.LookAt(rotazione);
		}
		
		//Se sono abbastanza vicino al nemico lo attacco
		if(distanceFromEnemy <= distanzaAttacco){
			//Mi fermo
			agent.Stop();
			tempoTrascorsoAttacco += Time.deltaTime;
			animator.SetBool("run", false);
			animator.SetBool("walk", false);
			// FASE DI ATTACCO
			animator.SetBool("attack", true);
			//tempoTrascorso è una variabile che mi permette di estrarre un numero random ogni 0.7 secondi
			//invece che ad ogni frame in modo da non affaticare il processore
			if(tempoTrascorsoAttacco >= 0.7){
				tempoTrascorsoAttacco = 0;
				attackType = Random.Range(1.0, 7.0);
				animator.SetInteger("attackType", Mathf.FloorToInt(attackType));
			}
		}
		else{
			//Se non devo attaccare inseguo il nemico
			if(attackType == 0 && !animator.GetCurrentAnimatorStateInfo(0).IsTag("attacco"))
				agent.SetDestination(nemico.transform.position);
				
			tempoTrascorsoAttacco = 0;
			animator.SetBool("attack", false);
			//Se ho solo più metà salute corro invece che camminare, salto verso il nemico se sono abbastanza lontano da lui
			//e aumento il danno inflitto
			if(salute <= (saluteMax/2))
			{
				if(!playOnce){
					BroadcastMessage ("metaVita");
					playOnce = true;
				}
				if(animator.GetCurrentAnimatorStateInfo(0).nameHash != Animator.StringToHash("Base Layer.jump"))
					animator.SetBool("jump", false);
				if(Random.Range(0, 100) > 80 && distanceFromEnemy > 14)
					animator.SetBool("jump", true);
				danno = dannoMinMax[1];
				animator.SetBool("walk", true);
				animator.SetBool("run", true);
				agent.speed = velocitaMax + 2;
			}
			else
				animator.SetBool("walk", true);
			}
		}
		else{
			agent.Stop();
			timerMorte += Time.deltaTime;
			animator.SetBool("death", true);
			this.collider.enabled = false;
			//Se sono morto dopo 3 secondi mi distruggo per non inficiare le prestazioni
			if(timerMorte >= 5) {
				spawnSystemCounter.enemyKilled();
				this.gameObject.SetActive(false);
			}
		}
	
}

//Funzione richiamata quando vengo colpito
function gunHit (damage : float) {
		salute -= damage;
}


function OnCollisionEnter(collision : Collision) {
		
		
		if(collision.gameObject.layer == 9){
			//Debug.Log("Colpito da un particellare con nome " + collision.gameObject.name);
			switch(collision.gameObject.name)
			{
				
				case "Firebolt1(Clone)":
					salute -= 40;
					break;
				case "Frostbolt1(Clone)":
					agent.speed = (agent.speed/3)*2;
					break;
				case "BlueFireball3(Clone)":
					salute -= 20;
					break;
			}
		}
}