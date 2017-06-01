#pragma strict

public var awakeSound : AudioClip;
public var halfLifeSound : AudioClip;

private var myAudioSource : AudioSource;

function Start () {
	myAudioSource = this.GetComponent(AudioSource);
	myAudioSource.PlayOneShot(awakeSound, 0.289);
}

function Update () {

}

function metaVita(){
	myAudioSource.PlayOneShot(halfLifeSound, 0.4);
}