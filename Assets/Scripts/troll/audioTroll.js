#pragma strict

public var awakeSound : AudioClip;
public var deathSound : AudioClip;

private var myAudioSource : AudioSource;
private var animator : Animator;

function Start () {
	myAudioSource = this.GetComponent(AudioSource);
	animator = GetComponent.<Animator>();
	
	myAudioSource.Play();
	myAudioSource.loop = true;
}

function Update () {
	if(animator.GetBool("death")){
		myAudioSource.loop = false;
		//myAudioSource.PlayOneShot(deathSound, 0.8);
	}
}
