using UnityEngine;
using System.Collections;


public class effectSystem : MonoBehaviour {

	public GameObject personaggio;
	public GameObject[] effetti = new GameObject[3];
	public Camera cameras;

	private AudioSource mainSound;
	private RaycastHit hit;
	private int currentEffectIndex;
	private bool slowMotion;
	private float slowMotionTimer;

	// Use this for initialization
	void Start () {
		currentEffectIndex = 0;
		mainSound = GameObject.Find ("statuaTeschio").GetComponent<AudioSource> ();
		slowMotion = false;
		slowMotionTimer = 0;
	}
	
	// Update is called once per frame
	void Update () {

		if (slowMotionTimer > 0) 
			slowMotionTimer += Time.deltaTime;

		if(!slowMotion)
			mainSound.pitch = Mathf.MoveTowards(mainSound.pitch, 1.0f, 50 * Time.deltaTime);
		
		//Debug.Log (slowMotionTimer);

		if (slowMotion && slowMotionTimer >= 2.5f) {
			//Debug.Log ("ciao");

			Time.timeScale = 1;
			slowMotionTimer = 0;
			slowMotion = false;
		}

	
		
	}

void sparaEffect() {
		Time.timeScale = 0.3f;
		mainSound.pitch = Mathf.MoveTowards(mainSound.pitch, 0.8f, 1000 * Time.deltaTime);
		slowMotion = true;
		slowMotionTimer = 0.1f;
}

}

