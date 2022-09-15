


//  והשבע השנים המעוברות שבכל מחזור ומחזור לפי חשבון זה, הם שנה שלישית מן המחזור ושישית ושמינית ושנת אחת עשרה ושנת ארבע עשרה ושנת שבע עשרה ושנת תשע עשרה.
const CycleYearLength = [12, 12, 13/*3*/, 12, 12, 13 /*6*/, 12, 13/*8*/, 12, 12, 13/*11*/, 12, 12, 13/*14*/, 12, 12, 13/*17*/, 12, 13/*19*/];



// Time Object
var Time = function (day, hour, parts, year, month,totalParts) {

    this.year = year ? year :0  ;
    this.month = month ? month : 0 ;// Month number in 0 based array

    this.day = day  ;
    this.hour = hour  ;
    this.parts = parts ;


    this.setTotalParts() ;
    this.setWeekday();

    return this ;
};


// H 7.3
// כיצד:  הרי שהיה המולד בשבת בחצות היום, סימן ז' י"ח
/// Chatzot is 18 :
Time.prototype.clock_24hour = '19 20 21 22 23 24 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18'.split(' ');
Time.prototype.setYear = function (y) { this.year = y } ;
Time.prototype.setMonth = function (m) { this.month = m } ;
Time.prototype.weekday_txt = ['Shabbat','Sunday','Monday','Tuesday','Wendsday','Thursday','Friday','Shabbat'];
Time.prototype.Hour = 1080; //parts // השעה, מחולקת לאלף ושמונים חלקים
// Will clone objects with methods
Time.prototype.clone = function(){ return Object.assign(Object.create(Object.getPrototypeOf(this)), this); };
Time.prototype.setTotalParts = function() { this.totalParts = this.toParts() ; };
Time.prototype.setWeekday = function() {this.weekday =  (this.day % 7) === 0 ? 1 : this.day % 7 ;};
Time.prototype.toParts = function (){
    nb =
         (this.day * ( 24 * 1080)  )
        + ( this.hour * 1080 )
        + this.parts  ;

    // add month parts
    // add year parts
    return nb  ;
};
Time.prototype.add = function(time){  var _c=this.clone();	_c.totalParts += time.totalParts ; 	_c.calc(); return _c; };
Time.prototype.sub = function(time){ var _c=this.clone();	_c.totalParts -= time.totalParts ; 	_c.calc();return _c; };
Time.prototype.multi = function(amount) { var _c=this.clone(); if (amount===0) return _c;_c.totalParts *= amount ; _c.calc(); return _c; };
Time.prototype.mod7 = function () { var _c = this.clone(); _c.day = _c.day % 7; _c.setTotalParts(); _c.setWeekday(); return _c; };
Time.prototype.compare = function (time) { return this.totalParts === time.totalParts; };
Time.prototype.getVarName = function () { for (o in window) { if (window[o] === this) { return o; } } return '-';};
Time.prototype.print = function () {document.querySelector('#out').innerHTML += 'Print : '+ ((this.getVarName() +"\n" + this.toString())).replace(/\n/g,'<br>') + '<hr />'; };
Time.prototype.calc = function(){
    this.parts = this.totalParts % 1080;
    this.hour = ((this.totalParts - this.parts) / 1080) % 24;
    this.day = ((this.totalParts - (this.parts) - (this.hour * 1080)) / 1080) / 24;
    //this.month ;
    this.year = this.totalParts / 1080 / 24 ;
    this.setWeekday();
};

Time.prototype.readable = function (){
    return this.weekday_txt[this.day] + ' ' + ((6+this.hour)%24 ) + ':' + parseInt(this.parts / 18)
    + ' ' + (this.parts%18) +'\'' ;
}
Time.prototype.toString = function () {
    var _return =  '';
    var ln =  ' '+"\n";
    _return +=  this.readable() + ln;
    _return += 'Year : ' + this.year +  ln ;
    _return += 'Month : ' + this.month + ln ;
    _return += 'Day : ' + this.day + ln ;
    _return += 'Heure : ' + this.hour + ln ;
    _return += 'parts : ' + this.parts + ln ;
  //  _return += 'Heure24 :' + this.clock_24hour[this.hour] + ln ;
   // _return += 'Parts :'+ this.parts + ln;
    //_return += 'PartsP :'+ parseInt(this.parts / 18) + '\' ' + (this.parts % 18) + '" ' + ln ;
    //_return += "Siman :" +  this.day + ' ' + this.hour + ' ' + this.parts + ln;
    _return += 'DOW : ' + this.weekday + ln ;
/*
    var elm = ['rosh_hashana_dow','completed_years','completed_month','CyclePast','YearInCycle','YearLength'] ;
    for (var i = 0; i<elm.length;i++ ){
        _return += elm[i]+' : ' + this[elm[i]] + ln ;
    }
*/
    return _return ;
};
