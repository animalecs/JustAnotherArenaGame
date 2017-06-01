#pragma strict

private var animator : Animator;
private var script : gun_system;
private var muzzleFlash : GameObject;
private var timerMuzzleFlash : float;
private var isThereMuzzleFlash;

function Start () 
{
	script = GameObject.Find("guns").GetComponent("gun_system");
	muzzleFlash = transform.Find("muzzleFlash").gameObject;
	isThereMuzzleFlash = false;
}

function Update()
{
	if(isThereMuzzleFlash)
	{
		timerMuzzleFlash += Time.deltaTime;
		if(timerMuzzleFlash >= 0.08)
		{
			muzzleFlash.SetActive(false);
			isThereMuzzleFlash = false;
		}
	}
}

function viewMuzzleFlash()
{
	muzzleFlash.SetActive(true);
	isThereMuzzleFlash = true;
}

function removeMuzzleFlash()
{
	muzzleFlash.SetActive(false);
}

//Funzione richiamata ad ogni sparo
function shootAudio () 
{
	//Richiamo la funzione gestisciMunizioni del gunSystem
	script.gestisciMunizioni();
}

function reloadEnded()
{
	script.ricaricaArma();

}