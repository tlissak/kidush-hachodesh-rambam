
// Time Object
var Time = function (day, hour, parts) {
    this.day = day  ;
    this.hour = hour  ;
    this.parts = parts ;


    this.setHDN() ;
    this.setWeekday();
};



// H 7.3
/// Chatzot is 18 :
// כיצד:  הרי שהיה המולד בשבת בחצות היום, סימן ז' י"ח
Time.prototype.clock_24hour = '19 20 21 22 23 24 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18'.split(' ');

//Time.prototype.year = 0;Time.prototype.month = 0;
Time.prototype.molad = null ;
Time.prototype.weekday_txt = ['-DOW ERR-','Shabbat','Sunday','Monday','Tuesday','Wendsday','Thursday','Friday'];
// השעה, מחולקת לאלף ושמונים חלקים
Time.prototype.Hour = 1080; //parts
Time.prototype.clone = function(){ return new Time(this.day,this.hour,this.parts); };
Time.prototype.setHDN = function() { this.hdn = this.toParts() ; };
Time.prototype.setWeekday = function() {this.weekday =  (this.day % 7)+1 ;};
Time.prototype.toParts = function (){ return (this.day * ( 24 * 1080)  ) + ( this.hour * 1080 ) + this.parts  ;};
Time.prototype.add = function(time){  var _c=this.clone();	_c.hdn += time.hdn ; 	_c.calc(); return _c; };
Time.prototype.sub = function(time){ var _c=this.clone();	_c.hdn -= time.hdn ; 	_c.calc();return _c; };
Time.prototype.multi = function(amount) { var _c=this.clone(); if (amount==0) return _c;_c.hdn *= amount ; _c.calc(); return _c; };
Time.prototype.mod7 = function () { var _c = this.clone(); _c.day = _c.day % 7; _c.setHDN(); _c.setWeekday(); return _c; };
Time.prototype.compare = function (time) { return this.hdn == time.hdn; };
Time.prototype.getVarName = function () { for (o in window) { if (window[o] === this) { return o; } } return '-';};
Time.prototype.print = function () { document.querySelector('#out').innerHTML += 'Print : '+((this.getVarName() +"\n" + this.toString())).replace(/\n/g,'<br>') + '<hr />'; }
Time.prototype.calc = function(){
    this.parts = this.hdn % this.Hour;
    this.hour = ((this.hdn - this.parts) / this.Hour) % 24;
    this.day = ((this.hdn - (this.parts) - (this.hour * this.Hour)) / this.Hour) / 24;
    this.setWeekday();
};
Time.prototype.toString = function () {
    var _return =  '';
    //c(this);
    if (this.year) {
        _return += 'Year ' + this.year + ' ' ;
        _return += 'Month ' + this.month + ' ' ;
    }
    if ((this.hour < 7))
        _return += 'Leil of ' + (this.weekday + 1) + ' (' + this.weekday + ' ' + this.clock_24hour[(this.hour )] ;
    else{
        _return += 'Yom ' + (this.weekday) + ' ' + this.clock_24hour[this.hour-1] + ' in day ';
    }
    _return += this.parts + ' parts - '+ parseInt(this.parts / 18) + '\' ' + (this.parts % 18) + '" ' +"\n" ;


    _return += (this.weekday_txt[this.weekday]) + ' ' + (this.hour+6)+ ':'+ parseInt(this.parts / 18) +' '+ (this.parts % 18) + '" ';

    _return += "\n" + " Siman :" +  this.day + ' ' + this.hour + ' ' + this.parts;

    return _return ;
};
