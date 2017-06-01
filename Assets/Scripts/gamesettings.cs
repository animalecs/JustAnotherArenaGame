using UnityEngine;
using System.Collections;


public class gamesettings : MonoBehaviour {

	private bool isGameRunning;
	private MouseLook mouseLook;
	private MouseLook cameraMouseLook;
	
	public Canvas pauseMenu;

	// Use this for initialization
	void Start () 
	{
		Application.targetFrameRate = 60;
		isGameRunning = true;
		mouseLook = GetComponent<MouseLook> ();
		cameraMouseLook = GameObject.Find("Main Camera").GetComponent<MouseLook>();
	}
	
	// Update is called once per frame
	void Update () 
	{

		if (Input.GetKeyDown (KeyCode.Escape)) {
			isGameRunning = !isGameRunning;

			if(isGameRunning) {
				pauseMenu.active=false;
				Screen.showCursor = false;
				Screen.lockCursor = true;
				Time.timeScale = 1;
				mouseLook.enabled = true;
				cameraMouseLook.enabled = true;
			}
			else {
				pauseMenu.active=true;
				Screen.showCursor = true;
				Screen.lockCursor = false;
				Time.timeScale = 0;
				mouseLook.enabled = false;
				cameraMouseLook.enabled = false;
			}
		}
	}

}

