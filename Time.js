
// Time Object
var Time = function (day, hour, parts) {
    this.day = day  ;
    this.hour = hour  ;
    this.parts = parts ;

    this.setHDN() ;
    this.setWeekday();
    return this ;
};



// H 7.3
/// Chatzot is 18 :
// כיצד:  הרי שהיה המולד בשבת בחצות היום, סימן ז' י"ח
Time.prototype.clock_24hour = '19 20 21 22 23 24 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18'.split(' ');
Time.prototype.year = 1;
Time.prototype.month = 1;
Time.prototype.weekday_txt = ['-','Sunday','Monday','Tuesday','Wendsday','Thursday','Friday','Shabbat'];
Time.prototype.Hour = 1080; //parts // השעה, מחולקת לאלף ושמונים חלקים
Time.prototype.clone = function(){ return new Time(this.day,this.hour,this.parts); };
Time.prototype.setHDN = function() { this.hdn = this.toParts() ; };
Time.prototype.setWeekday = function() {this.weekday =  (this.day % 7) === 0 ? 1 : this.day % 7 ;};
Time.prototype.toParts = function (){ return (this.day * ( 24 * 1080)  ) + ( this.hour * 1080 ) + this.parts  ;};
Time.prototype.add = function(time){  var _c=this.clone();	_c.hdn += time.hdn ; 	_c.calc(); return _c; };
Time.prototype.sub = function(time){ var _c=this.clone();	_c.hdn -= time.hdn ; 	_c.calc();return _c; };
Time.prototype.multi = function(amount) { var _c=this.clone(); if (amount===0) return _c;_c.hdn *= amount ; _c.calc(); return _c; };
Time.prototype.mod7 = function () { var _c = this.clone(); _c.day = _c.day % 7; _c.setHDN(); _c.setWeekday(); return _c; };
Time.prototype.compare = function (time) { return this.hdn === time.hdn; };
Time.prototype.getVarName = function () { for (o in window) { if (window[o] === this) { return o; } } return '-';};
Time.prototype.print = function () {document.querySelector('#out').innerHTML += 'Print : '+ ((this.getVarName() +"\n" + this.toString())).replace(/\n/g,'<br>') + '<hr />'; };
Time.prototype.calc = function(){
    this.parts = this.hdn % this.Hour;
    this.hour = ((this.hdn - this.parts) / this.Hour) % 24;
    this.day = ((this.hdn - (this.parts) - (this.hour * this.Hour)) / this.Hour) / 24;
    this.setWeekday();
};
Time.prototype.molad = {} ;
Time.prototype.YearLength = 12;
Time.prototype.toString = function () {
    var _return =  '';
    var ln =  ' '+"\n";
    _return += 'Year : ' + this.year +  ln ;
    _return += 'Month : ' + this.month + ln ;
    _return += 'Day : ' + this.day + ln ;
    _return += 'Heure : ' + this.hour + ln ;
    _return += 'Heure24 :' + this.clock_24hour[this.hour] + ln ;
    _return += 'Parts :'+ this.parts + ln;
    _return += 'PartsP :'+ parseInt(this.parts / 18) + '\' ' + (this.parts % 18) + '" ' + ln ;
    _return += " Siman :" +  this.day + ' ' + this.hour + ' ' + this.parts + ln;
    _return += 'DOW : ' + this.weekday + ln ;

    var elm = ['rosh_hashana_dow','completed_years','completed_month','CyclePast','YearInCycle','YearLength'] ;
    for (var i = 0; i<elm.length;i++ ){
        _return += elm[i]+' : ' + this[elm[i]] + ln ;
    }

    return _return ;
};
