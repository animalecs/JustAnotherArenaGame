#pragma strict

private var myAnimator : Animator;
private var isOnSettings : boolean;
private var mySettingsCanvas : Canvas;
private var sliderAntialiasing : Slider;
private var sliderQuality : Slider;
private var sliderOmbre : Slider;
private var lblQualitaAntialiasing : Text;
private var lblQualitaOmbre : Text;
private var lblQualitaTexture : Text;


function Start () {
	myAnimator = GameObject.Find("Main Camera").GetComponent(Animator);
	mySettingsCanvas = GameObject.Find("CanvasSettings").GetComponent(Canvas);
	mySettingsCanvas.enabled = false;
	
	sliderAntialiasing = GameObject.Find("SliderAntialiasing").GetComponent(Slider);
	sliderQuality = GameObject.Find("SliderQuality").GetComponent(Slider);
	sliderOmbre = GameObject.Find("SliderOmbre").GetComponent(Slider);
	lblQualitaAntialiasing = GameObject.Find("lblQualityAntialiasing").GetComponent(Text);
	lblQualitaOmbre = GameObject.Find("lblQualityOmbre").GetComponent(Text);
	lblQualitaTexture = GameObject.Find("lblQualityTexture").GetComponent(Text);
	
	sliderOmbre.value = 1;
	sliderQuality.value = 1;
	sliderAntialiasing.value = 1;
	
	
}

function Update () {
	if(Input.GetKeyDown(KeyCode.Escape)){
		myAnimator.SetBool("settings", false);
		mySettingsCanvas.enabled = false;
	}
	
	setLabelQuality(sliderOmbre, lblQualitaOmbre);
	setLabelAnialiasing(sliderAntialiasing, lblQualitaAntialiasing);
	setGeneralQuality(sliderQuality, lblQualitaTexture);
		
	
}

function activateSettings(){
	myAnimator.SetBool("settings", true);
	mySettingsCanvas.enabled = true;
}

function setLabelQuality( mySlider : Slider, myLabel : Text){
	switch(mySlider.value)
	{
		case 0:
			myLabel.text = "BASSO";
			break;
		case 1:
			myLabel.text = "MEDIO";
			break;
		case 2:
			myLabel.text = "ALTO";
			break;
		case 3:
			myLabel.text = "ULTRA";
			break;
	}

}

function setGeneralQuality( mySlider : Slider, myLabel : Text){
	switch(mySlider.value)
	{
		case 0:
			myLabel.text = "BASSA";
			break;
		case 1:
			myLabel.text = "MEDIA";
			break;
		case 2:
			myLabel.text = "ALTA";
			break;
		case 3:
			myLabel.text = "ULTRA";
			break;
	}

}

function setLabelAnialiasing( mySlider : Slider, myLabel : Text){
	switch(mySlider.value)
	{
		case 0:
			myLabel.text = "OFF";
			break;
		case 1:
			myLabel.text = "2X";
			break;
		case 2:
			myLabel.text = "4X";
			break;
		case 3:
			myLabel.text = "8X";
			break;
	}

}

function setSettings() {

		switch(sliderQuality.value)
	{
		case 0:
			QualitySettings.SetQualityLevel (1, true);
			break;
		case 1:
			QualitySettings.SetQualityLevel (3, true);
			break;
		case 2:
			QualitySettings.SetQualityLevel (4, true);
			break;
		case 3:
			QualitySettings.SetQualityLevel (5, true);
			break;
	}
	
	
	switch(sliderAntialiasing.value)
	{
		case 0:
			QualitySettings.antiAliasing = 0;
			break;
		case 1:
			QualitySettings.antiAliasing = 2;
			break;
		case 2:
			QualitySettings.antiAliasing = 4;
			break;
		case 3:
			QualitySettings.antiAliasing = 8;
			break;
	}
	

	
	switch(sliderOmbre.value)
	{
		case 0:
			QualitySettings.shadowDistance = 0;
			break;
		case 1:
			QualitySettings.shadowDistance = 15;
			break;
		case 2:
			QualitySettings.shadowDistance = 60;
			break;
		case 3:
			QualitySettings.shadowDistance = 120;
			break;
	}
	if(GameObject.Find("Vsync").GetComponent(Toggle).isOn)
		QualitySettings.vSyncCount = 1;
	else
		QualitySettings.vSyncCount = 0;

		myAnimator.SetBool("settings", false);
		mySettingsCanvas.enabled = false;
}
