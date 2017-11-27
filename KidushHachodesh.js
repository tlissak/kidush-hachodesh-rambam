// http://www.mechon-mamre.org/i/38.htm

// Perek 6 to 9
  
function c(_x) { 
console.log( _x );
//document.querySelector('#out').innerHTML += ''+_x.replace(/\n/g,'<br/>')+'<hr>';
}


// חודשה של לבנה
// תשעה ועשרים יום ושתים עשרה שעות מיום שלושים מתחילת לילו, ושבע מאות שלושה ותשעים חלקים משעת שלוש עשרה
var MoonMolad = MoonMoladInSundays = new Time(29, 12, 793);

// שנת לבנה פשוטה
// שלוש מאות וארבעה וחמישים יום ושמונה שעות ושמונה מאות ושישה ושבעים חלקים
var MoonYearPshuta = new Time(354, 8, 876);

// שנת לבנה מעוברת
// שלוש מאות שלושה ושמונים יום ואחת ועשרים שעות וחמש מאות תשעה ושמונים חלקים.
var MoonYearMeuberet = new Time(383, 21, 589);

//שארית חודש לבנה, והוא א' י"ב תשצ"ג 
var MoonMolad_mod7 = MoonMolad.mod7();// new Time(1,12,793) ; //

// שנת חמה
// selon le ra shmouel
var SunYearA1 = new Time(365, 6, 0);

//שארית שנת חמה על שנת לבנה פשוטה
var SunYear_minus_MoonYearPshuta = SunYearA1.sub(MoonYearPshuta)  ; // new Time(11,21,204);

// שארית שנה פשוטה, ד' ח' תתע"ו
var MoonYearPshuta_mod7 = MoonYearPshuta.mod7(); //new Time(4,8,876) 

// שארית שנה המעוברת,  ה' כ"א תקפ"ט
var MoonYearMeuberet_mod7 = MoonYearMeuberet.mod7(); // new Time(5,21,589) // 

//  והוא היה בליל שני חמש שעות בלילה ומאתיים וארבעה חלקים, סימן להם ב' ה' ר"ד; וממנו היא התחלת החשבון.
// ומולד השנה, הוא מולד תשרי של אותה השנה.
var MoladTishriFirstYear = new Time(1, 17, 204);

// כשתקבץ שארית כל שנה משתים עשרה שנה הפשוטות, שהיא ד' ח' תתע"ו
// ושארית כל שנה משבע שנים המעוברות, שהיא ה' כ"א תקפ"ט
// יישאר שני ימים ושש עשרה שעות וחמש מאות וחמישה ותשעים חלקים, סימן להם ב' י"ו תקצ"ה; וזה הוא שארית המחזור.
var CycleMoon = MoonYearPshuta_mod7.multi(12).add(MoonYearMeuberet_mod7.multi(7)).mod7() ;//new Time(2d,16h,595);


var CycleSun = SunYearA1.multi(19).mod7(); // new Time(2,18h,0);

//  והשבע השנים המעוברות שבכל מחזור ומחזור לפי חשבון זה, הם שנה שלישית מן המחזור ושישית ושמינית ושנת אחת עשרה ושנת ארבע עשרה ושנת שבע עשרה ושנת תשע עשרה.
var CycleYearLength = [12, 12, 13/*3*/, 12, 12, 13 /*6*/, 12, 13/*8*/, 12, 12, 13/*11*/, 12, 12, 13/*14*/, 12, 12, 13/*17*/, 12, 13/*19*/];

// תמצא הכול תשע עשרה שנה משני החמה, שכל שנה מהן שלוש מאות וחמישה ושישים יום ושש שעות בשווה:
// ולא יישאר ממניין ימי החמה בכל תשע עשרה שנה זו, חוץ משעה אחת וארבע מאות ושמונים וחמישה חלקים, סימן להם א' תפ"ה.
var Mod_CycleSun_CycleMoon = CycleSun.sub(CycleMoon); //new Time(0,1,485);

// כשיהיה עימך ידוע מולד חודש מן החודשים, ותוסיף עליו א' י"ב תשצ"ג--ייצא מולד חודש שאחריו, ותדע באי זה יום מימי השבוע ובאי זו שעה ובכמה חלק יהיה. 
//  כיצד--הרי שהיה מולד ניסן באחד בשבת בחמש שעות ביום ומאה ושבעה חלקים, סימן להם א' ה' ק"ז
//  ז  כשתוסיף עליו שארית חודש לבנה, והוא א' י"ב תשצ"ג--ייצא מולד אייר בליל שלישי חמש שעות בלילה ותשע מאות חלקים, סימן להם ג' ה' תת"ק. 
var ExMoladNissan = new Time (1,5,107) ;
var ExMoladIyar = ExMoladNissan.add(MoonMolad_mod7); 
var ExMoladIyarReal = new Time(2,17,900)  ;
if (!ExMoladIyar.compare(ExMoladIyarReal)) { c('Calcuation error !'); ExMoladIyar.print(); ExMoladIyarReal.print(); }


Time.prototype.getMoladByYear = function(year, month) {

	this.year = year ; // Completed year only
	this.month = month ; // Month number in 0 based array

    this.completed_years = this.year - 1 ;
    this.completed_month = this.month-1 ; // Month number in 0 based array
    // תיקח שני יצירה שעברו וגמרו, 
    // ותעשה אותם מחזורין של תשע עשרה תשע עשרה,  	ותדע מניין המחזורין שעברו,;
	this.CyclePast = parseInt(this.completed_years / 19); // Number of complete cycles

    //  ומניין השנים שעברו ממחזור שעדיין לא נשלם
	this.YearInCycle = (this.completed_years % 19); // The number of year in current cycle (0 based)

    
	this.YearLength = CycleYearLength[this.YearInCycle];	// Get is leap year

	this._out = MoladTishriFirstYear.clone();
	
    // ותיקח לכל מחזור ומחזור ב' י"ו תקצ"ה,
	if (this.CyclePast)
	    this._out = this._out.add(CycleMoon.multi(this.CyclePast));
	
    // Add mod for each year pshuta or meuberet 
	for(var i=0;i<(this.YearInCycle);i++){
	    if (CycleYearLength[i] == 12) {
	        // ולכל שנה פשוטה משני המחזור שלא נשלם ד' ח' תתע"ו
			this._out = this._out.add(MoonYearPshuta_mod7);
	    } else {
	        //ולכל שנה מעוברת ה' כ"א תקפ"ט.
			this._out = this._out.add(MoonYearMeuberet_mod7);
		}
	}
	
    // Add Mod month 
	if (this.completed_month)
	    this._out = this._out.add(MoonMolad_mod7.multi(this.completed_month));
	
	var m= this._out.mod7();	
	this.molad = m ;
};

Time.prototype.rosh_hashana_dow = 0 ;// Day Of Week


/* H 7.7
מצא דרך קביעת ראש חודש תשרי לפי חשבון זה, כך הוא:
תחשב ותדע המולד באי זה יום יהיה, ובכמה שעות מן היום או מן הלילה, ובכמה חלקים מן השעה.
ויום המולד הוא יום הקביעה לעולם,
אלא אם כן היה באחד בשבת או ברביעי או בערב שבת,
או אם היה המולד בחצות היום או אחר חצות,
או אם היה בר"ד חלקים משעה עשירית מליל שלישי או יותר על זה והייתה שנה פשוטה,
או שהיה המולד בתקפ"ט חלקים משעה רביעית מיום שני והייתה השנה פשוטה שאחר המעוברת
--שאם יארע אחד מארבעה דברים האלו, אין קובעין ביום המולד, אלא ביום שלאחריו או שלאחר אחריו, כדרך שביארנו
*/

Time.prototype.getRoshHashanaDow = function () {

    this.rosh_hashana_dow = this.molad.weekday;
    // H 7.1
    //Rule 1 : 
    // אין קובעין לעולם ראש חודש תשרי לפי חשבון זה, לא באחד בשבת, ולא ברביעי בשבת, ולא בערב שבת--סימן להם אד"ו
    // אלא כשיהיה מולד תשרי באחד משלושה ימים האלו, קובעין ראש החודש ביום שלאחריו.
    if (this.molad.weekday == 1 || this.molad.weekday == 4 || this.molad.weekday == 6) {
        this.rosh_hashana_dow = this.molad.weekday + 1;
    }
    // H 7.2
    // Rule 2 :
    //וכן אם יהיה המולד בחצי היום או למעלה מחצי היום, קובעין ראש חודש ביום שלאחריו.
    // כיצד--הרי שהיה המולד ביום השני שש שעות ביום או יתר על שש שעות, קובעין ראש חודש בשלישי. 
    // ואם יהיה המולד קודם חצי היום, אפילו בחלק אחד--קובעין ראש החודש באותו יום המולד עצמו:  והוא, שלא יהיה אותו היום מימי אד"ו.
    // Half of the day mean 18 !!!!!!!!
	
	if (
        (this.molad.weekday == 2 && this.molad.hour >= 18)
        || (this.molad.weekday == 5 && this.molad.hour >= 18)
        || (this.molad.weekday == 7 && this.molad.hour >= 18)
        ) {
        this.rosh_hashana_dow = this.molad.weekday + 2 ;
    } else if(this.molad.hour >= 18) {
        this.rosh_hashana_dow = this.molad.weekday + 1;
    }

    // H 7.4
    // Rule 3 :
    // מולד תשרי שיצא בחשבון זה בליל שלישי בתשע שעות בלילה ומאתיים וארבעה חלקים משעה עשירית, סימנה ג' ט' ר"ד, או יותר על זה
    // --אם הייתה שנה פשוטה, דוחין את ראש החודש, ואין קובעים אותו בשלישי בשנה זו, אלא בחמישי בשבת.
    if (this.YearLength == 12 && this.molad.weekday == 3 && ((this.molad.hour * 1080) + this.molad.parts) >= ((9 * 1080) + 204)) {
        this.rosh_hashana_dow = 5;
    }

    // H 7.5
    // Rule 4 :
    // וכן אם יצא מולד תשרי ביום שני בשלוש שעות ביום וחמש מאות ושמונים ותשעה חלקים משעה רביעית, סימנה ב' ט"ו תקפ"ט, או יתר על כן
    // --אם הייתה אותה השנה מוצאי המעוברת, שתהיה השנה הסמוכה לה שעברה מעוברת--אין קובעין ראש החודש בשני בשנה זו, אלא בשלישי.
    PrevYearLength = this.YearInCycle == 0 ? 13 : CycleYearLength[this.YearInCycle-1];
    if ( PrevYearLength == 13
        && this.molad.weekday == 2 && ((this.molad.hour * 1080) + this.molad.parts) >= ((15 * 1080) + 589)) {
        this.rosh_hashana_dow = 3;
    }

    //c(this.rosh_hashana_dow) ;

};

/*
 H 8.5
סדר החודשים המלאים והחסרים לפי חשבון זה, כך הוא:
תשרי, לעולם מלא; וחודש טבת, לעולם חסר; ומטבת ואילך, אחד מלא ואחד חסר על הסדר. 
כיצד--טבת חסר, שבט מלא, אדר חסר, ניסן מלא, אייר חסר, סיוון מלא, תמוז חסר, אב מלא, אלול חסר.
ובשנה המעוברת, אדר ראשון מלא, ואדר שני חסר.
*/
Time.prototype.PshutaMonthLength = [30, 0, 0, 29, 30, 29, 30, 29, 30, 29, 30, 29];
Time.prototype.MeuberetMonthLength = [30, 0, 0, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29];




// H 8.4
// מולד תשרי שיצא בחשבון זה בליל שלישי בתשע שעות בלילה ומאתיים וארבעה חלקים משעה עשירית, סימנה ג' ט' ר"ד,
// או יותר על זה--אם הייתה שנה פשוטה, דוחין את ראש החודש, ואין קובעים אותו בשלישי בשנה זו, אלא בחמישי בשבת.
var ExMoladRH = new Time(3, 9, 204);
ExMoladRH.getMoladByYear(1, 1 /*Rosh hashana*/) ;
ExMoladRH.getRoshHashanaDow();


Time.prototype.getYearDaysCount = function (print_result) {

    //TODO : Should be test

    /*
     H 8.7
     דרך ידיעת השנה אם חודשיה שלמים, או חסרין, או כסדרן לפי חשבון זה--כך הוא:  תדע תחילה יום שנקבע בו ראש השנה שתרצה לידע סידור חודשיה, כמו שביארנו בפרק שביעי; ותדע יום שייקבע בו ראש השנה שלאחריה, ותחשוב מניין הימים שביניהן חוץ מיום הקביעה של זו ושל זו.
     */
    this.getRoshHashanaDow();

    this.nextYear = this.clone() ;
    this.nextYear.getMoladByYear(this.year+1,1);
    this.nextYear.getRoshHashanaDow();


    //c(this.nextYear.molad.toString());

    //day in between

    if(this.rosh_hashana_dow>this.nextYear.rosh_hashana_dow)
        day_in_between_dow_kviaa = this.rosh_hashana_dow - this.nextYear.rosh_hashana_dow;
    else
        day_in_between_dow_kviaa = (this.rosh_hashana_dow+7) - this.nextYear.rosh_hashana_dow;

    /*
     H 8.7
     אם תמצא ביניהן שני ימים, יהיו חודשי השנה חסרין; ואם תמצא ביניהם שלושה ימים, יהיו כסדרן; ואם תמצא ביניהם ארבעה, יהיו שלמים.

     */

    if (this.YearLength == 12){ // Shana Pshuta
        if (day_in_between_dow_kviaa == 2){
            this.PshutaMonthLength[1] = 29;
            this.PshutaMonthLength[2] = 29;
        }
        if (day_in_between_dow_kviaa == 3){
            this.PshutaMonthLength[1] = 29;
            this.PshutaMonthLength[2] = 30;
        }
        if (day_in_between_dow_kviaa == 4) {
            this.PshutaMonthLength[1] = 30;
            this.PshutaMonthLength[2] = 30;
        }
    }
    /*
     H 8.8
     ח,ח  במה דברים אמורים, בשהייתה השנה שתרצה לידע סידור חודשיה פשוטה.  אבל אם הייתה מעוברת--אם תמצא בין יום קביעתה ובין יום קביעת שנה שלאחריה ארבעה ימים, יהיו חודשי אותה השנה המעוברת חסרים; ואם תמצא ביניהם חמישה ימים, יהיו כסדרן; ואם תמצא ביניהם שישה, יהיו שלמים

     */
    if (this.YearLength == 13) { // Shana Meuberet
        if (day_in_between_dow_kviaa == 4){
            this.MeuberetMonthLength[1] = 29;
            this.MeuberetMonthLength[2] = 29;
        }
        if (day_in_between_dow_kviaa == 5){
            this.MeuberetMonthLength[1] = 29;
            this.MeuberetMonthLength[2] = 30;
        }
        if (day_in_between_dow_kviaa == 6) {
            this.MeuberetMonthLength[1] = 30;
            this.MeuberetMonthLength[2] = 30;
        }
    }

    if (print_result) {
        c('Year : '+ this.year
            + "\n Molad "+ this.molad.toString()
            + "\n Shana "+ (this.YearLength == 12 ? 'PSHUTA' : 'MEUBERET')
            + "\n Rosh hashana DOW : "+ this.molad.weekday_txt[this.rosh_hashana_dow]
            + "\n Next Year Rosh hashana DOW : "+ this.molad.weekday_txt[this.nextYear.rosh_hashana_dow]
            + "\n Days in between kviuut  : "+day_in_between_dow_kviaa
        )

        c( (this.YearLength == 12 ) ? this.PshutaMonthLength.join(',') : this.MeuberetMonthLength.join(','));
    }

}



ExMoladRH.getYearDaysCount(1) ;
ExMoladRH.print();

/*

TESTS :
H 8.9
כיצד:  הרי שרצינו לידע סידור חודשי שנה זו, והיה ראש השנה בחמישי והיא פשוטה, וראש השנה שלאחריה בשני בשבת; נמצא ביניהן שלושה ימים, ידענו ששנה זו חודשיה כסדרן.  ואילו היה ראש השנה שלאחריה בשלישי, היו חודשי שנה זו שלמים; ואילו היה ראש השנה בשנה זו בשבת, ובשנה שלאחריה בשלישי בשבת, היו חודשי שנה זו חסרין.  ועל דרך זו תחשוב לשנה המעוברת, כמו שביארנו.

H 8.10
ח,י  יש שם סימנין שתסמוך עליהם כדי שלא תטעה בחשבון סידור חודשי השנה, והן בנויין על עיקרי זה החשבון והקביעות והדחייות שביארנו דרכם; ואלו הן:  כל שנה שיהיה ראש השנה בה בשלישי, תהיה לעולם כסדרן לפי חשבון זה, בין פשוטה, בין מעוברת; ואם יהיה ראש השנה בשבת או בשני, לא תהיה כסדרן לעולם, בין בפשוטה, בין במעוברת; ואם יהיה ראש השנה בחמישי--אם פשוטה היא, אי אפשר שיהיו חודשיה חסרים לפי חשבון זה, ואם מעוברת היא, אי אפשר שיהיו חודשיה כסדרן לפי חשבון זה. 


*/

Test = new Time(0,0);
Test.getMoladByYear(5777,1);
Test.getYearDaysCount() ;


  


