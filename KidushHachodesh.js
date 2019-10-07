// http://www.mechon-mamre.org/i/38.htm

// Perek 6 to 9
  
function c(_x) {

    document.querySelector('#out').innerHTML += 'C : '+ _x+ '<hr />';

    //console.log( _x );
}

// כשיהיה עימך ידוע מולד חודש מן החודשים, ותוסיף עליו א' י"ב תשצ"ג--ייצא מולד חודש שאחריו, ותדע באי זה יום מימי השבוע ובאי זו שעה ובכמה חלק יהיה. 
//  כיצד--הרי שהיה מולד ניסן באחד בשבת בחמש שעות ביום ומאה ושבעה חלקים, סימן להם א' ה' ק"ז
//  ז  כשתוסיף עליו שארית חודש לבנה, והוא א' י"ב תשצ"ג--ייצא מולד אייר בליל שלישי חמש שעות בלילה ותשע מאות חלקים, סימן להם ג' ה' תת"ק. 
var ExMoladNissan = new Time (1,5,107) ;
var ExMoladIyar = ExMoladNissan.add(MoonMolad_mod7); 
var ExMoladIyarReal = new Time(2,17,900)  ;
if (!ExMoladIyar.compare(ExMoladIyarReal)) {
    c('Calcuation error ! xy1');
    ExMoladIyar.print();
    ExMoladIyarReal.print();
}


//H 7.6


// H 8.4
// מולד תשרי שיצא בחשבון זה בליל שלישי בתשע שעות בלילה ומאתיים וארבעה חלקים משעה עשירית, סימנה ג' ט' ר"ד,
// או יותר על זה--אם הייתה שנה פשוטה, דוחין את ראש החודש, ואין קובעים אותו בשלישי בשנה זו, אלא בחמישי בשבת.
//var ExMoladRH = new Time(3, 9, 204); //print



//(new Time(0,0,0)).getYearDaysCount( ).print() ;

/*
    if (print_result) {
        c('Year : '+ this.year
            + "\n Molad "+ this.toString()
            + "\n Shana "+ (this.YearLength === SHANA_PSHUTA ? 'PSHUTA' : 'MEUBERET')
            + "\n Rosh hashana DOW : "+ this.weekday_txt[this.rosh_hashana_dow]
            + "\n Next Year Rosh hashana DOW : "+ this.weekday_txt[this.nextYear.rosh_hashana_dow]
            + "\n Days in between kviuut  : "+day_in_between_dow_kviaa
        );

        c( (this.YearLength === SHANA_PSHUTA ) ? this.PshutaMonthLength.join(',') : this.MeuberetMonthLength.join(','));
    }
*
* */


Test = new Time(0,0).getMoladByYear(5780,1).getYearDaysCount() ;


  


