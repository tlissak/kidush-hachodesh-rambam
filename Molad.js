
Time.prototype.getMoladByYear = function(year, month) {

    this.year = year ; // Completed year only
    this.month = month ; // Month number in 0 based array

    this.completed_years = this.year - 1 ;
    this.completed_month = this.month - 1 ; // Month number in 0 based array
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
        if (CycleYearLength[i] === SHANA_PSHUTA) {
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

    return this._out.mod7();
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


    this.rosh_hashana_dow = this.weekday;



    // H 7.1
    //Rule 1 :
    // אין קובעין לעולם ראש חודש תשרי לפי חשבון זה, לא באחד בשבת, ולא ברביעי בשבת, ולא בערב שבת--סימן להם אד"ו
    // אלא כשיהיה מולד תשרי באחד משלושה ימים האלו, קובעין ראש החודש ביום שלאחריו.
    if (this.weekday === 1 || this.weekday === 4 || this.weekday === 6) {
        this.rosh_hashana_dow = this.weekday + 1;
    }
    // H 7.2
    // Rule 2 :
    //וכן אם יהיה המולד בחצי היום או למעלה מחצי היום, קובעין ראש חודש ביום שלאחריו.
    // כיצד--הרי שהיה המולד ביום השני שש שעות ביום או יתר על שש שעות, קובעין ראש חודש בשלישי.
    // ואם יהיה המולד קודם חצי היום, אפילו בחלק אחד--קובעין ראש החודש באותו יום המולד עצמו:  והוא, שלא יהיה אותו היום מימי אד"ו.
    // Half of the day mean 18 !!!!!!!!
    var HALF_DAY = 6 ;

    if ( this.weekday === 1 && this.molad.hour >= HALF_DAY)
        this.rosh_hashana_dow = 2;
    if ( this.weekday === 2 && this.molad.hour >= HALF_DAY)
        this.rosh_hashana_dow = 3;
    if ( this.weekday === 3 && this.molad.hour >= HALF_DAY)
        this.rosh_hashana_dow = 5;
    if ( this.weekday === 4 && this.molad.hour >= HALF_DAY)
        this.rosh_hashana_dow = 5;
    if ( this.weekday === 5 && this.molad.hour >= HALF_DAY)
        this.rosh_hashana_dow = 7;
    if ( this.weekday === 6 && this.molad.hour >= HALF_DAY)
        this.rosh_hashana_dow = 7;
    if ( this.weekday === 7 && this.molad.hour >= HALF_DAY)
        this.rosh_hashana_dow = 2;

        /*
    if ( this.weekday === 2 && this.molad.hour >= HALF_DAY){
        this.rosh_hashana_dow = 3;
    }else if((this.weekday === 5 && this.molad.hour >= HALF_DAY) || (this.weekday === 7 && this.molad.hour >= HALF_DAY)) {
        this.rosh_hashana_dow = this.weekday + 2 ;
    } else if(this.molad.hour >= HALF_DAY) {
        this.rosh_hashana_dow = this.weekday + 1;
    }
    */


    // H 7.4
    // Rule 3 :
    // מולד תשרי שיצא בחשבון זה בליל שלישי בתשע שעות בלילה ומאתיים וארבעה חלקים משעה עשירית, סימנה ג' ט' ר"ד, או יותר על זה
    // --אם הייתה שנה פשוטה, דוחין את ראש החודש, ואין קובעים אותו בשלישי בשנה זו, אלא בחמישי בשבת.

    if (this.YearLength === SHANA_PSHUTA && this.weekday === 3
        && ((this.hour * HOUR_PARTS) + this.parts)  >= ((9 * HOUR_PARTS) + 204)) {
        this.rosh_hashana_dow = 5;
    }

  //  console.log(this.rosh_hashana_dow) ;

    // H 7.5
    // Rule 4 :
    // וכן אם יצא מולד תשרי ביום שני בשלוש שעות ביום וחמש מאות ושמונים ותשעה חלקים משעה רביעית, סימנה ב' ט"ו תקפ"ט, או יתר על כן
    // --אם הייתה אותה השנה מוצאי המעוברת, שתהיה השנה הסמוכה לה שעברה מעוברת--אין קובעין ראש החודש בשני בשנה זו, אלא בשלישי.

    PrevYearLength = this.YearInCycle === 0 ? SHANA_MEUBERET : CycleYearLength[this.YearInCycle-1];

    if ( PrevYearLength === SHANA_MEUBERET
        && this.weekday === 2 && ((this.hour * HOUR_PARTS) + this.parts) >= ((15 * HOUR_PARTS) + 589)) {
        this.rosh_hashana_dow = 3;
    }

    //c(this.rosh_hashana_dow) ;
    return this;
};

/*
 H 8.5
סדר החודשים המלאים והחסרים לפי חשבון זה, כך הוא:
תשרי, לעולם מלא; וחודש טבת, לעולם חסר; ומטבת ואילך, אחד מלא ואחד חסר על הסדר.
כיצד--טבת חסר, שבט מלא, אדר חסר, ניסן מלא, אייר חסר, סיוון מלא, תמוז חסר, אב מלא, אלול חסר.
ובשנה המעוברת, אדר ראשון מלא, ואדר שני חסר.
*/
Time.prototype.MonthLength = '';
Time.prototype.PshutaMonthLength = {TISHRI:30,CHESHVAN:-0,KISLEV:-0,TEVET:29,CHVAT:30,ADAR :29,NISAN: 30,IYAR: 29,SIVAN: 30,TAMUZ: 29,AV: 30,ELUL: 29};
Time.prototype.MeuberetMonthLength = {TISHRI:30, CHESHVAN:-0,KISLEV:-0, TEVET:29, CHVAT:30, ADAR_1:30,ADAR_2: 29,NISAN: 30,IYAR: 29,SIVAN: 30,TAMUZ: 29,AV: 30,ELUL: 29};



Time.prototype.getYearDaysCount = function () {

    /*
     H 8.7
     דרך ידיעת השנה אם חודשיה שלמים, או חסרין, או כסדרן לפי חשבון זה--כך הוא:  תדע תחילה יום שנקבע בו ראש השנה שתרצה לידע סידור חודשיה, כמו שביארנו בפרק שביעי; ותדע יום שייקבע בו ראש השנה שלאחריה, ותחשוב מניין הימים שביניהן חוץ מיום הקביעה של זו ושל זו.
     */

    this.getRoshHashanaDow();

    this.nextYear = this.clone() ;
    this.nextYear.getMoladByYear(this.year+1,1);
    this.nextYear.getRoshHashanaDow();




    c(this);

    //day in between

// TESTS :
//      this.YearLength = 12
//    this.rosh_hashana_dow = 3 ;
//   this.nextYear.rosh_hashana_dow = 5;




    if (this.nextYear.rosh_hashana_dow < this.rosh_hashana_dow)
        this.nextYear.rosh_hashana_dow += 7;

    var days_interval = this.nextYear.rosh_hashana_dow - this.rosh_hashana_dow - 1;

    //console.log(days_interval) ;
    /*
     H 8.7
     אם תמצא ביניהן שני ימים, יהיו חודשי השנה חסרין; ואם תמצא ביניהם שלושה ימים, יהיו כסדרן; ואם תמצא ביניהם ארבעה, יהיו שלמים.

     */

    if (this.YearLength === SHANA_PSHUTA){ // Shana Pshuta
        if (days_interval === 2){
            this.MonthLength = SHANA_CHASERA ;
            this.PshutaMonthLength.CHESHVAN = 29;
            this.PshutaMonthLength.KISLEV = 29;
        }else
        if (days_interval === 3){
            this.MonthLength = SHANA_KESIDRA ;
            this.PshutaMonthLength.CHESHVAN = 29;
            this.PshutaMonthLength.KISLEV = 30;
        }else
        if (days_interval === 4) {
            this.MonthLength = SHANA_MELEA ;
            this.PshutaMonthLength.CHESHVAN = 30;
            this.PshutaMonthLength.KISLEV = 30;
        }else{
            console.log(days_interval , 'SHANA_PSHUTA days_interval Not in range ?!') ;
        }
    }
    /*
     H 8.8
     ח,ח  במה דברים אמורים, בשהייתה השנה שתרצה לידע סידור חודשיה פשוטה.
       אבל אם הייתה מעוברת--אם תמצא בין יום קביעתה ובין יום קביעת שנה שלאחריה ארבעה ימים,
        יהיו חודשי אותה השנה המעוברת חסרים; ואם תמצא ביניהם חמישה ימים, יהיו כסדרן; ואם תמצא ביניהם שישה, יהיו שלמים
     */
    if (this.YearLength === SHANA_MEUBERET) { // Shana Meuberet
        if (days_interval === 4){
            this.MonthLength = SHANA_CHASERA ;
            this.MeuberetMonthLength.CHESHVAN = 29;
            this.MeuberetMonthLength.KISLEV = 29;
        }else
        if (days_interval === 5){
            this.MonthLength = SHANA_KESIDRA ;
            this.MeuberetMonthLength.CHESHVAN = 29;
            this.MeuberetMonthLength.KISLEV = 30;
        }else
        if (days_interval === 6) {
            this.MonthLength = SHANA_MELEA ;
            this.MeuberetMonthLength.CHESHVAN = 30;
            this.MeuberetMonthLength.KISLEV = 30;
        }else{
            console.log(days_interval , 'SHANA_MEUBERET days_interval Not in range ?!') ;
        }
    }

    /*

    H 8.9
    כיצד:  הרי שרצינו לידע סידור חודשי שנה זו, והיה ראש השנה בחמישי והיא פשוטה, וראש השנה שלאחריה בשני בשבת; נמצא ביניהן שלושה ימים, ידענו ששנה זו חודשיה כסדרן.  ואילו היה ראש השנה שלאחריה בשלישי, היו חודשי שנה זו שלמים; ואילו היה ראש השנה בשנה זו בשבת, ובשנה שלאחריה בשלישי בשבת, היו חודשי שנה זו חסרין.  ועל דרך זו תחשוב לשנה המעוברת, כמו שביארנו.

    TESTING ..
    */




    /*
 H 8.10
ח,י  יש שם סימנין שתסמוך עליהם כדי שלא תטעה בחשבון סידור חודשי השנה, והן בנויין על עיקרי זה החשבון והקביעות והדחייות שביארנו דרכם; ואלו הן:  כל שנה שיהיה ראש השנה בה בשלישי, תהיה לעולם כסדרן לפי חשבון זה, בין פשוטה, בין מעוברת; ואם יהיה ראש השנה בשבת או בשני, לא תהיה כסדרן לעולם, בין בפשוטה, בין במעוברת; ואם יהיה ראש השנה בחמישי--אם פשוטה היא, אי אפשר שיהיו חודשיה חסרים לפי חשבון זה, ואם מעוברת היא, אי אפשר שיהיו חודשיה כסדרן לפי חשבון זה.
    * */
    if (this.rosh_hashana_dow===3 && this.MonthLength !== SHANA_KESIDRA){}
        // Weve got a problem
    if (this.rosh_hashana_dow===7 || this.rosh_hashana_dow===2 && this.MonthLength === SHANA_KESIDRA){}
        // Weve got a problem
    if (this.rosh_hashana_dow===5 && this.YearLength === SHANA_PSHUTA && this.MonthLength === SHANA_CHASERA){}
        // Weve got a problem
    if (this.rosh_hashana_dow===5 && this.YearLength === SHANA_MEUBERET && this.MonthLength === SHANA_KESIDRA){}
        // Weve got a problem


    return this;

} ;