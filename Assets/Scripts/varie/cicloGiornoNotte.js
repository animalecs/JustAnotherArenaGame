#pragma strict

//Dalle 0 alle 12 è giorno, dalle 12 alle 24 notte

private var slider : float;
private var ora : float;	//l'ora del giorno
private var velocitaReale;

var coloreNebbiaGiorno : Color;
var coloreNebbiaNotte : Color;

var ambientLightGiorno : Color;
var ambientLightNotte : Color;

//I colori che assume lo skybox
var NightTint : Color;
var DuskTint : Color;
var MorningTint : Color;
var MiddayTint : Color;

var SkyBoxMaterial1 : Material;
var SkyBoxMaterial2 : Material;

var sole : Light;

var velocita : float;

function Start () {

	
	slider = 0;

}

function Update () {
	
	Debug.Log("Ora: "+ ora);
	if(slider >= 1)
	{
		slider = 0;
	}

	slider = slider + Time.deltaTime/velocita;
	ora = slider * 24;
	//Muovo il sole sul suo asse rotatorio z
	transform.localEulerAngles = Vector3(0,0, (slider * 360)-90);
	//Debug.Log(Time.deltaTime + "last frame");
	//La notte dura la metà del giorno
	if(ora > 12)
		velocitaReale = velocita/2;
	else
		velocitaReale = velocita;
		
	//RenderSettings.skybox.SetFloat("_Blend", ora/2);
		
	if(ora > 0 && ora < 4)
	{
		//Mattino
		RenderSettings.skybox=SkyBoxMaterial1;
		RenderSettings.fogColor = coloreNebbiaGiorno;
		RenderSettings.fogColor = ambientLightGiorno;
		SkyBoxMaterial1.SetColor ("_Tint", Color.Lerp (DuskTint,MorningTint, ora+1.5) );
		RenderSettings.skybox.SetFloat("_Blend", (ora/2)-0.5);
	}
	
	if(ora > 4 && ora < 9)
	{
		//Giorno
	}
	
	if(ora > 9 && ora < 12)
	{
		//Tramonto
		//RenderSettings.skybox=SkyBoxMaterial2;
		//RenderSettings.skybox.SetFloat("_Blend", ora/4);
		
	}
	
	if(ora > 12 && ora < 24)
	{
		//Notte
		RenderSettings.fogColor = coloreNebbiaNotte;
		RenderSettings.fogColor = ambientLightNotte;
		sole.intensity = 0.1;
		RenderSettings.skybox=SkyBoxMaterial2;
		//RenderSettings.skybox.SetFloat("_Blend", (ora/2)-0.5);
	}
	

}