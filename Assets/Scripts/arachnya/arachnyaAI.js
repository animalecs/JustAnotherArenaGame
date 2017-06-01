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
private var timerBlock : float;
private var spawnSystemCounter : spawnSystem;
private var regenerating : boolean;

//Variabile che mi serve per eseguire solo una volta una funzione
private var playOnce : boolean;

function Start () {
	agent = GetComponent.<NavMeshAgent>();
	animator = GetComponent.<Animator>();
	nemico = GameObject.Find("personaggio");
	spawnSystemCounter = GameObject.Find("spawnPoints").GetComponent(spawnSystem);
	agent.speed = velocitaMax;
	saluteMax = salute;
	regenerating = false;
	Random.seed = Random.Range(1, 100);
	danno = dannoMinMax[0];
	playOnce = false;
}

function Update () {

	
		if(salute > 0){
				distanceFromEnemy = Vector3.Distance(nemico.transform.position, transform.position);
				if(distanceFromEnemy > 2){
					var rotazione = Vector3(nemico.transform.position.x, transform.position.y, nemico.transform.position.z);
					transform.LookAt(rotazione);
				}
				agent.speed = Mathf.Lerp(agent.speed, velocitaMax, Time.deltaTime * 20);
				//Se sono abbastanza vicino al nemico lo attacco
				if(distanceFromEnemy <= distanzaAttacco){
					//Mi fermo
					agent.Stop();
					tempoTrascorsoAttacco += Time.deltaTime;
					animator.SetBool("walk", false);
					// FASE DI ATTACCO
					animator.SetBool("attack", true);
					//tempoTrascorso è una variabile che mi permette di estrarre un numero random ogni 0.7 secondi
					//invece che ad ogni frame in modo da non affaticare il processore
					if(tempoTrascorsoAttacco >= 0.7){
						tempoTrascorsoAttacco = 0;
						attackType = Random.Range(1.0, 4.0);
						animator.SetInteger("attackType", Mathf.FloorToInt(attackType));
					}
				}
				else{
						//Se non devo attaccare inseguo il nemico
					if(!animator.GetCurrentAnimatorStateInfo(0).IsTag("attacco") && !animator.GetCurrentAnimatorStateInfo(0).IsTag("special"))
						agent.SetDestination(nemico.transform.position);
					else
						agent.Stop();
						
						if(animator.GetCurrentAnimatorStateInfo(0).nameHash != Animator.StringToHash("Base Layer.block"))
							animator.SetBool("block", false);
					
					tempoTrascorsoAttacco = 0;
					animator.SetBool("attack", false);
					//Se ho solo più metà salute corro invece che camminare, salto verso il nemico se sono abbastanza lontano da lui
					//e aumento il danno inflitto
					if(salute <= (saluteMax/2)){
						if(!playOnce){
							Debug.Log("metaVita");
							regenerating = true;
							animator.SetBool("block", true);
							salute = (saluteMax/4)*3;
							playOnce = true;
						}	
						else
							regenerating = false;	
					// DISAPPEAR
					danno = dannoMinMax[1];
					agent.speed = velocitaMax + 2;
					}
					animator.SetBool("walk", true);
				}
		}
		else{
			timerMorte += Time.deltaTime;
			animator.SetBool("death", true);
			agent.Stop();
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
		if(!regenerating)
			salute -= damage;
}


