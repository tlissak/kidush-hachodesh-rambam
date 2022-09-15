
// חודשה של לבנה
// תשעה ועשרים יום ושתים עשרה שעות מיום שלושים מתחילת לילו, ושבע מאות שלושה ותשעים חלקים משעת שלוש עשרה
const MoonMolad = MoonMoladInSundays = new Time(29, 12, 793);

// שנת לבנה פשוטה
// שלוש מאות וארבעה וחמישים יום ושמונה שעות ושמונה מאות ושישה ושבעים חלקים
const MoonYearPshuta = new Time(354, 8, 876);

// שנת לבנה מעוברת
// שלוש מאות שלושה ושמונים יום ואחת ועשרים שעות וחמש מאות תשעה ושמונים חלקים.
const MoonYearMeuberet = new Time(383, 21, 589);

//שארית חודש לבנה, והוא א' י"ב תשצ"ג
const MoonMolad_mod7 = MoonMolad.mod7();// new Time(1,12,793) ; //

// שנת חמה
// rav shmouel
const SunYearA1 = new Time(365, 6, 0);

//שארית שנת חמה על שנת לבנה פשוטה
const SunYear_minus_MoonYearPshuta = SunYearA1.sub(MoonYearPshuta)  ; // new Time(11,21,204);

// שארית שנה פשוטה, ד' ח' תתע"ו
const MoonYearPshuta_mod7 = MoonYearPshuta.mod7(); // == new Time(4,8,876)

// שארית שנה המעוברת,  ה' כ"א תקפ"ט
const MoonYearMeuberet_mod7 = MoonYearMeuberet.mod7(); // == new Time(5,21,589) //

//  והוא היה בליל שני חמש שעות בלילה ומאתיים וארבעה חלקים, סימן להם ב' ה' ר"ד; וממנו היא התחלת החשבון.
// ומולד השנה, הוא מולד תשרי של אותה השנה.
const MoladTishriFirstYear = new Time(1, 17, 204,0,0);

// כשתקבץ שארית כל שנה משתים עשרה שנה הפשוטות, שהיא ד' ח' תתע"ו
// ושארית כל שנה משבע שנים המעוברות, שהיא ה' כ"א תקפ"ט
// יישאר שני ימים ושש עשרה שעות וחמש מאות וחמישה ותשעים חלקים, סימן להם ב' י"ו תקצ"ה; וזה הוא שארית המחזור.
const CycleMoon = MoonYearPshuta_mod7.multi(12).add(MoonYearMeuberet_mod7.multi(7)).mod7() ;//new Time(2d,16h,595);

const CycleSun = SunYearA1.multi(19).mod7(); // new Time(2,18h,0);

// תמצא הכול תשע עשרה שנה משני החמה, שכל שנה מהן שלוש מאות וחמישה ושישים יום ושש שעות בשווה:
// ולא יישאר ממניין ימי החמה בכל תשע עשרה שנה זו, חוץ משעה אחת וארבע מאות ושמונים וחמישה חלקים, סימן להם א' תפ"ה.
const Mod_CycleSun_CycleMoon = CycleSun.sub(CycleMoon); //new Time(0,1,485);

const SHANA_PSHUTA = 12 ;
const SHANA_MEUBERET = 13 ;

const HOUR_PARTS = 1080 ;

const SHANA_CHASERA = 'CHASERA' ;
const SHANA_KESIDRA = 'KESIDRA' ;
const SHANA_MELEA = 'MELEA';