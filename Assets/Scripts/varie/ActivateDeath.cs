using UnityEngine;
using System.Collections;


public class ActivateDeath : MonoBehaviour {

	private MouseLook mouseLook;
	private MouseLook cameraMouseLook;
	private Canvas deathCanavs;

	
	// Use this for initialization
	void Start () 
	{
		mouseLook = GameObject.Find("personaggio").GetComponent<MouseLook> ();
		deathCanavs = GameObject.Find ("deathCanvas").GetComponent<Canvas> ();
		cameraMouseLook = GameObject.Find("Main Camera").GetComponent<MouseLook>();


	}
	
	// Update is called once per frame
	void Update () 
	{
		//Mi disabilita il gioco visto che sono morto
		if (deathCanavs.isActiveAndEnabled) {
			Time.timeScale = 0;
			mouseLook.enabled = false;
			cameraMouseLook.enabled = false;
		}
	}
	
}

