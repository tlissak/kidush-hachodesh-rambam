var Time = function(day,hour,parts){
  this.day = day  ;
  this.hour = hour  ;
  this.parts = parts ;  
  this.setHDN() ;
  this.setWeekday();
}
Time.prototype.clone = function(){ return new Time(this.day,this.hour,this.parts); }
Time.prototype.setHDN = function() { this.hdn = this.toParts() ; }
Time.prototype.setWeekday = function() {this.weekday =  this.day % 7 ;}
Time.prototype.toParts = function (){ return (this.day * ( 24 * Hour )  ) + ( this.hour * Hour ) + this.parts  ;}
Time.prototype.add = function(time){  var _c=this.clone();	_c.hdn += time.hdn ; 	_c.calc(); return _c; }
Time.prototype.sub = function(time){ var _c=this.clone();	_c.hdn -= time.hdn ; 	_c.calc();return _c; }
Time.prototype.multi = function(amount) { var _c=this.clone(); if (amount==0) return _c;_c.hdn *= amount ; _c.calc(); return _c; }
Time.prototype.mod7 = function(){ var _c=this.clone(); _c.day = _c.day % 7 ;_c.setHDN() ; _c.setWeekday();	return _c ;}
Time.prototype.calc = function(){ 
	this.parts = this.hdn % Hour ;
	this.hour = ((this.hdn-this.parts) / Hour) % 24;
	this.day = ((this.hdn-(this.parts)-(this.hour*Hour)) / Hour ) / 24 ;	this.setWeekday();
}
var Hour = 1080 //parts ;
var MoonMolad = MoonMoladInSundays = new Time(29,12,793) ;
var MoonYearPshuta = new Time(354,8,876) ;
var MoonYearMeuberet = new Time(383,21,589) ;
var SunYear = new Time(365,6,0) ;
var SunYear_minus_MoonYearPshuta = SunYear.sub(MoonYearPshuta)  ; // new Time(11,21,204); 
//אי"ב תשצ"ג
var MoonMolad_mod7 = MoonMolad.mod7() ;// new Time(1,12,793) ; //
var MoonYearPshuta_mod7 = MoonYearPshuta.mod7(); //new Time(4,8,876) // == MoonMolad_mod7.clone().multi(12).mod7()
var MoonYearMeuberet_mod7 = MoonYearMeuberet.mod7 (); // new Time(5,21,589) // 
var MoladTishriFirstYear = new Time(1,17,204);
var CycleMoon = MoonYearPshuta.multi(12).add(MoonYearMeuberet.multi(7)) //new Time(6939d,16h,595);
var CycleSun = SunYear.multi(19) ; // new Time(6939d,18h,0);
//בי"ו תקצ"ה
var CycleMoon_mod7 = CycleMoon.mod7() ; //2d,16h,595" 2weekday
var CycleYearLength=[12,12,13/*3*/,12,12,13 /*6*/,12,13/*8*/,12,12,13/*11*/,12,12,13/*14*/,12,12,13/*17*/,12,13/*19*/] ;
var Mod_CycleSun_CycleMoon = CycleSun.sub(CycleMoon) //new Time(0,1,485);

/*Example in rambam :*/
var ExMoladNissan = new Time (1,5,107) ;
var ExMoladIyar = ExMoladNissan.add(MoonMolad_mod7) ;
//var ExMoladSivan = ExMoladNissan.add(MoonMolad_mod7.multi(2)) ;

function Molad(year,month){ //'kibutz_in_midle'
	this.year = year-1 ;
	this.month = month-1 ;
	
	this.CyclePast = parseInt(this.year / 19 )  ;
	this.YearInCycle =   (this.year % 19 ) ;
	this.YearLength = CycleYearLength[this.YearInCycle] ;	
	
	this.left_cycle = MoladTishriFirstYear.clone() ;
	
	if (this.CyclePast) this.left_cycle = this.left_cycle.add(CycleMoon_mod7.multi(this.CyclePast));
	
	for(var i=0;i<(this.YearInCycle);i++){		
		if (CycleYearLength[i] == 12){
			this.left_cycle = this.left_cycle.add(MoonYearPshuta_mod7);
		}else{
			this.left_cycle = this.left_cycle.add(MoonYearMeuberet_mod7);
		}
	}
	
	if (this.month)	this.left_cycle = this.left_cycle.add(MoonMolad_mod7.multi(this.month)) ;
	
	var m= this.left_cycle.mod7();	
	this.molad = m ;
}

function c(x){console.log(x.toString());}

Time.prototype.toString = function(){
		
	var minutes =  parseInt(this.parts / 18) ;
	return (this.day+'d,'+this.hour+'h,'+this.parts+'" ' +"\n" /*+ this.hour + ' ' + "\n"	*/
	+(this.weekday + parseInt(this.hour / 12)) + 'd:'+ this.hour + ':'+minutes +':'+(this.parts %18)+'"' + "\n"
	+(this.weekday) +'weekday');
}

m = MoladTishriFirstYear.clone(); 
m = m.add( CycleMoon_mod7.multi(303) ) ; //add cycle  ;
m = m.add(MoonYearPshuta.multi(11)); //add simple year ;
m = m.add(MoonYearMeuberet.multi(6)) //add leap year ;
m = m.add(MoonMolad_mod7.multi(5)) ; //add months
m = m.mod7(); 
//5775 Adar Wednesday 11:59 (2 chalakim)PM 
//c('OK: '+m);
var d = new Molad(5775 ,6 /*Adar*/) ;//4d,17h,1064" 
//console.log(d);
c(d.molad);



  


