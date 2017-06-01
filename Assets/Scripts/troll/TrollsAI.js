#pragma strict

public var salute : float;
public var distanzaDalNemico : float;
public var velocitaMax : float;

private var agent : NavMeshAgent; //Il navMeshAgent dell'object su cui è presente questo script
private var nemico : GameObject;
private var animator : Animator; //L'animator del troll
private var distanceFromEnemy : float; //Distanza dal nemico
private var attackType : int;
private var timerMorte : float;
private var tempoTrascorsoAttacco : float;
private var spawnSystemCounter : spawnSystem;


function Start () 
{
	spawnSystemCounter = GameObject.Find("spawnPoints").GetComponent(spawnSystem);
	nemico = GameObject.Find("personaggio");
	agent = GetComponent.<NavMeshAgent>();
	animator = GetComponent.<Animator>();
	
	attackType = Random.Range(0,2);
	agent.stoppingDistance = distanceFromEnemy;
	agent.speed = Random.Range(velocitaMax - 2, velocitaMax);
	attackType = 0;
	tempoTrascorsoAttacco = 0;
}

function Update () 
{
			//Se sono vivo
			if(salute > 0) {
				//Controllo la distanza dal nemico
				distanceFromEnemy = Vector3.Distance(nemico.transform.position, transform.position);
				if(distanceFromEnemy > 2) {
					var rotazione = Vector3(nemico.transform.position.x, transform.position.y, nemico.transform.position.z);
					//Debug.Log(rotazione);
					transform.LookAt(rotazione);
				}
				
				//Se la distanza è minore di un certo valore scelto 
				if(distanceFromEnemy <= distanzaDalNemico) {
					//Debug.Log("CI SONO");
					agent.Stop();
					animator.SetBool("attack", true);
					//Finisco di correre/camminare
					animator.SetBool("run", false);
					animator.SetBool("walk", false);
					tempoTrascorsoAttacco += Time.deltaTime;
					//tempoTrascorso è una variabile che mi permette di estrarre un numero random ogni 0.7 secondi
					//invece che ad ogni frame in modo da non affaticare il processore
					//Debug.Log("Sono fuori con timer "+ tempoTrascorsoAttacco);
					if(animator.GetCurrentAnimatorStateInfo(0).nameHash == Animator.StringToHash("Base Layer.generalAttack") && tempoTrascorsoAttacco > 1){
						tempoTrascorsoAttacco = 0;
						attackType = Random.Range(0.0, 2.0);
						animator.SetInteger("attackType", Mathf.FloorToInt(attackType));
					}
				}
				else {
					tempoTrascorsoAttacco = 0;
					animator.SetBool("attack", false);
					//Vado verso il nemico
					agent.SetDestination(nemico.transform.position);
					//Rinizio a camminare/correre
					animator.SetBool("run", true);
					animator.SetBool("walk", true);
				}
			}
			else {
				agent.Stop();
				animator.SetBool("death", true);
				this.collider.enabled = false;
				timerMorte += Time.deltaTime;
				//Se sono morto dopo 5 secondi mi distruggo per non inficiare le prestazioni
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




