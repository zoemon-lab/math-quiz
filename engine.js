import{installCurriculum}from'./curriculum.js';
import {installExtraTopics} from './extra-topics.js';
export const GRADES=['小1','小2','小3','小4','小5','小6','中1','中2','中3'];
export function rng(seed){let a=seed>>>0;return()=>{a+=0x6D2B79F5;let t=Math.imul(a^a>>>15,1|a);t^=t+Math.imul(t^t>>>7,61|t);return((t^t>>>14)>>>0)/4294967296}}
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
export const fraction=(n,d)=>{if(d<0){n=-n;d=-d}const g=gcd(n,d)||1;return d/g===1?String(n/g):`${n/g}/${d/g}`};
const dec=n=>String(Math.round(n*1e8)/1e8),signed=n=>n<0?`(${n})`:String(n),poly=(a,b=0,v='x')=>`${a===1?'':a===-1?'-':a}${v}${b>0?'＋'+b:b<0?'−'+(-b):''}`,term=n=>n>=0?'＋'+n:'−'+(-n),factor=n=>`(x${term(-n)})`;
const cn=n=>n===100?'百':n<10?'〇一二三四五六七八九'[n]:`${Math.floor(n/10)===1?'':'〇一二三四五六七八九'[Math.floor(n/10)]}十${n%10?'〇一二三四五六七八九'[n%10]:''}`;
const sqrt=n=>{let c=1;for(let k=2;k*k<=n;k++)while(n%(k*k)===0){n/=k*k;c*=k}return n===1?String(c):`${c===1?'':c}√${n}`};
export const TOPICS=[];
function topic(grade,id,unit,title,make){TOPICS.push({grade,id,unit,title,make})}
function q(text,answer,math,extra={}){return{text,answer:String(answer),math,...extra}}
function context(rand){return {r:(lo,hi)=>lo+Math.floor(rand()*(hi-lo+1)),pick:a=>a[Math.floor(rand()*a.length)]}}
function calc(grade,id,title,op,range,options={}){if(typeof range==='string'){const unit=title;title=op;op=range;range=arguments[5];options={...(arguments[6]||{}),unit};}const {unit='計算',nonnegative=false,exact=false,scale=1}=options;topic(grade,id,unit,title,({r})=>{let a=r(...range),b=r(...range);if(nonnegative&&a<b)[a,b]=[b,a];if(exact)a*=b;const v=op==='+'?a+b:op==='-'?a-b:op==='*'?a*b:a/b;const sym={'+':'＋','-':'−','*':'×','/':'÷'}[op];return q(`${signed(a/scale)} ${sym} ${signed(b/scale)} を計算しましょう。`,dec(op==='*'?v/(scale*scale):op==='/'?v:v/scale),`(${a}/${scale})${op}(${b}/${scale})`)})}
// 小1：20までの計算、数の読み方、数量の文章題。
topic('小1','p1-read','数','100までの数を読む',({r})=>{const n=r(1,100);return q(`「${cn(n)}」を数字で書きましょう。`,n,String(n))});
topic('小1','p1-next','数','前の数・次の数',({r})=>{const n=r(2,99),s=r(0,1)?1:-1;return q(`${n}の${s===1?'次':'1つ前'}の数を書きましょう。`,n+s,`${n}+(${s})`)});
topic('小1','p1-compare','数','数の大小',({r})=>{const a=r(1,99);let b=r(1,99);if(a===b)b=b%99+1;return q(`${a}と${b}のうち、大きい数を書きましょう。`,Math.max(a,b),`Max(${a},${b})`)});
topic('小1','p1-split','計算','20までの数の分け方',({r})=>{const n=r(3,20),a=r(0,n);return q(`${n}は、${a}といくつに分けられますか。`,n-a,`${n}-${a}`)});
topic('小1','p1-add10','計算','10までのたし算',({r})=>{const a=r(0,10),b=r(0,10-a);return q(`${a}＋${b}＝□`,a+b,`${a}+${b}`)});
topic('小1','p1-add20','計算','くり上がりのあるたし算',({r})=>{const a=r(1,9),b=r(10-a,9);return q(`${a}＋${b}＝□`,a+b,`${a}+${b}`)});
calc('小1','p1-sub20','20までのひき算','-',[0,20],{nonnegative:true});
for(const subtract of [false,true])topic('小1',subtract?'p1-wordsub':'p1-wordadd','文章題',subtract?'のこりを求める':'あわせた数を求める',({r})=>{const a=r(2,19),b=r(1,subtract?a:20-a);return subtract?q(`折り紙が${a}枚あります。${b}枚使いました。何枚のこっていますか。`,`${a-b}枚`,`${a}-${b}`):q(`鉛筆が${a}本あります。さらに${b}本もらいました。全部で何本ですか。`,`${a+b}本`,`${a}+${b}`)});
// 小2
calc('小2','p2-add','計算','2けたのたし算','+',[10,99]);calc('小2','p2-sub','計算','2けたのひき算','-',[10,99],{nonnegative:true});calc('小2','p2-mul','計算','九九','*',[1,9]);
calc('小2','p2-add3','計算','3けたのたし算','+',[100,499]);calc('小2','p2-sub3','計算','3けたのひき算','-',[100,999],{nonnegative:true});
topic('小2','p2-word','文章題','かけ算の文章題',({r})=>{const a=r(2,9),b=r(2,9);return q(`1袋にあめが${a}個ずつ入っています。${b}袋では何個ですか。`,`${a*b}個`,`${a}*${b}`)});
topic('小2','p2-length','単位・時刻','mとcm',({r})=>{const a=r(1,9),b=r(0,99);return q(`${a}m${b}cmは何cmですか。`,`${a*100+b}cm`,`${a}*100+${b}`)});
topic('小2','p2-clock','単位・時刻','時刻と時間',({r})=>{const h=r(1,9),m=r(0,11)*5,d=r(1,12)*5,t=h*60+m+d;return q(`${h}時${m}分の${d}分後は何時何分ですか。`,`${Math.floor(t/60)}時${t%60}分`,`${h}*60+${m}+${d}`,{answerKind:'clock'})});
topic('小2','p2-money','文章題','お金の計算',({r})=>{const a=r(1,9),b=r(0,9),c=r(0,9);return q(`100円玉が${a}枚、10円玉が${b}枚、1円玉が${c}枚。合計何円ですか。`,`${a*100+b*10+c}円`,`${a}*100+${b}*10+${c}`)});
// 小3
calc('小3','p3-mul','計算','2けた×1けた','*',[2,9]);TOPICS.at(-1).make=({r})=>{const a=r(10,99),b=r(2,9);return q(`${a}×${b}を計算しましょう。`,a*b,`${a}*${b}`)};
topic('小3','p3-mul3','計算','3けた×1けた',({r})=>{const a=r(100,999),b=r(2,9);return q(`${a}×${b}を計算しましょう。`,a*b,`${a}*${b}`)});
calc('小3','p3-div','計算','わり切れるわり算','/',[1,9],{exact:true});
topic('小3','p3-rem','計算','あまりのあるわり算',({r})=>{const b=r(2,9),v=r(1,9),rem=r(1,b-1),a=b*v+rem;return q(`${a}÷${b}の商とあまりを求めましょう。`,`商${v}、あまり${rem}`,`${a}/${b}`,{answerKind:'remainder',dividend:a,divisor:b})});
calc('小3','p3-decadd','小数・分数','小数のたし算','+',[1,99],{scale:10});calc('小3','p3-decsub','小数・分数','小数のひき算','-',[1,99],{scale:10,nonnegative:true});
function sameFraction(grade,id,title,op){topic(grade,id,'小数・分数',title,({r})=>{const d=r(3,grade==='小3'?10:20);let a=r(1,d-1),b=r(1,op==='+'&&grade==='小3'?d-a:d-1);if(op==='-'&&a<b)[a,b]=[b,a];const n=op==='+'?a+b:a-b;return q(`${a}/${d} ${op==='+'?'＋':'−'} ${b}/${d} を計算しましょう。`,n===0?'0':n===d?'1':`${n}/${d}`,`${a}/${d}${op}${b}/${d}`)})}
sameFraction('小3','p3-fradd','同じ分母の分数のたし算','+');sameFraction('小3','p3-frsub','同じ分母の分数のひき算','-');
topic('小3','p3-length','単位・時刻','kmとm',({r})=>{const a=r(1,9),b=r(0,999);return q(`${a}km${b}mは何mですか。`,`${a*1000+b}m`,`${a}*1000+${b}`)});
topic('小3','p3-time','単位・時刻','時間を分になおす',({r})=>{const h=r(1,8),m=r(0,59);return q(`${h}時間${m}分は何分ですか。`,`${60*h+m}分`,`${h}*60+${m}`)});
// 小4
calc('小4','p4-mul','計算','2けた×2けた','*',[10,99]);
topic('小4','p4-div','計算','2けたの数でわる',({r})=>{const b=r(11,49),v=r(2,20),a=b*v;return q(`${a}÷${b}を計算しましょう。`,v,`${a}/${b}`)});
topic('小4','p4-decmul','小数・分数','小数×整数',({r})=>{const a=r(1,99),b=r(2,9);return q(`${dec(a/10)}×${b}を計算しましょう。`,dec(a*b/10),`${a}/10*${b}`)});
topic('小4','p4-decdiv','小数・分数','小数÷整数',({r})=>{const b=r(2,9),v=r(1,99),a=b*v;return q(`${dec(a/10)}÷${b}を計算しましょう。`,dec(v/10),`${a}/10/${b}`)});
sameFraction('小4','p4-fradd','分数のたし算と約分','+');sameFraction('小4','p4-frsub','分数のひき算と約分','-');
for(const square of [false,true])topic('小4',square?'p4-square':'p4-rect','図形',square?'正方形の面積':'長方形の面積',({r})=>{const a=r(2,40),b=square?a:r(2,40);return q(square?`1辺${a}cmの正方形の面積は何cm²ですか。`:`たて${a}cm、横${b}cmの長方形の面積は何cm²ですか。`,`${a*b}cm²`,`${a}*${b}`)});
topic('小4','p4-round','数','四捨五入',({r,pick})=>{const n=r(101,9999),base=pick([10,100]);return q(`${n}を四捨五入して、${base===10?'十':'百'}の位までの概数にしましょう。`,Math.floor(n/base+.5)*base,`floor(${n}/${base}+1/2)*${base}`)});
topic('小4','p4-areaunit','図形','面積の単位',({r})=>{const n=r(1,99);return q(`${n}m²は何cm²ですか。`,`${n*10000}cm²`,`${n}*10000`)});
// 小5
calc('小5','p5-decmul','小数・分数','小数×小数','*',[1,99],{scale:10});
topic('小5','p5-decdiv','小数・分数','小数÷小数',({r})=>{const b=r(2,30),v=r(1,30),a=b*v;return q(`${dec(a/10)}÷${dec(b/10)}を計算しましょう。`,v,`${a}/${b}`)});
for(const sub of [false,true])topic('小5',sub?'p5-frsub':'p5-fradd','小数・分数',sub?'異分母分数のひき算':'異分母分数のたし算',({r})=>{let a=r(1,8),b=r(2,12),c=r(1,8),d=r(2,12);if(sub&&a*d<c*b)[a,b,c,d]=[c,d,a,b];return q(`${a}/${b} ${sub?'−':'＋'} ${c}/${d} を計算し、約分して答えましょう。`,fraction(a*d+(sub?-1:1)*c*b,b*d),`${a}/${b}${sub?'-':'+'}${c}/${d}`)});
for(const lcm of [false,true])topic('小5',lcm?'p5-lcm':'p5-gcd','数',lcm?'最小公倍数':'最大公約数',({r})=>{const a=r(2,40),b=r(2,40);return q(`${a}と${b}の${lcm?'最小公倍数':'最大公約数'}を求めましょう。`,lcm?a*b/gcd(a,b):gcd(a,b),`${lcm?'lcm':'gcd'}(${a},${b})`)});
for(const triangle of [false,true])topic('小5',triangle?'p5-tri':'p5-para','図形',triangle?'三角形の面積':'平行四辺形の面積',({r})=>{const a=r(2,25)*2,h=r(2,30),v=a*h/(triangle?2:1);return q(`底辺${a}cm、高さ${h}cmの${triangle?'三角形':'平行四辺形'}の面積を求めましょう。`,`${v}cm²`,`${a}*${h}/${triangle?2:1}`)});
topic('小5','p5-volume','図形','直方体の体積',({r})=>{const a=r(2,20),b=r(2,20),h=r(2,20);return q(`たて${a}cm、横${b}cm、高さ${h}cmの直方体の体積は何cm³ですか。`,`${a*b*h}cm³`,`${a}*${b}*${h}`)});
topic('小5','p5-average','データ','平均',({r})=>{const a=r(20,80),b=r(1,15),c=r(1,15),ns=[a-b,a+b,a-c,a+c];return q(`${ns.join('、')}の4つの数の平均を求めましょう。`,a,`(${ns.join('+')})/4`)});
// 小6
for(const div of [false,true])topic('小6',div?'p6-frdiv':'p6-frmul','小数・分数',div?'分数のわり算':'分数のかけ算',({r})=>{const a=r(1,12),b=r(2,15),c=r(1,12),d=r(2,15);return q(`${a}/${b} ${div?'÷':'×'} ${c}/${d} を計算し、約分して答えましょう。`,fraction(div?a*d:a*c,div?b*c:b*d),`(${a}/${b})${div?'/':'*'}(${c}/${d})`)});
topic('小6','p6-ratio','割合・比例','比を簡単にする',({r})=>{const a=r(1,20),b=r(1,20),k=r(2,9),g=gcd(a,b);return q(`${a*k}：${b*k}を最も簡単な整数の比にしましょう。`,`${a/g}：${b/g}`,`${a}/${b}`,{answerKind:'ratio'})});
topic('小6','p6-percent','割合・比例','割合と百分率',({r})=>{const a=r(2,50)*10,p=r(1,9)*10;return q(`${a}円の${p}%は何円ですか。`,`${a*p/100}円`,`${a}*${p}/100`)});
topic('小6','p6-speed','割合・比例','速さ・道のり・時間',({r})=>{const v=r(20,90),t=r(2,8);return q(`時速${v}kmで${t}時間進みました。道のりは何kmですか。`,`${v*t}km`,`${v}*${t}`)});
for(const area of [true,false])topic('小6',area?'p6-circle':'p6-circum','図形',area?'円の面積':'円周',({r})=>{const a=r(2,30);return q(`半径${a}cmの円の${area?'面積':'円周'}を求めましょう。円周率は3.14とします。`,`${dec((area?a*a:2*a)*3.14)}${area?'cm²':'cm'}`,`${area?a*a:2*a}*314/100`)});
topic('小6','p6-cylinder','図形','円柱の体積',({r})=>{const a=r(2,12),h=r(2,20);return q(`底面の半径${a}cm、高さ${h}cmの円柱の体積は何cm³ですか。円周率は3.14とします。`,`${dec(a*a*h*3.14)}cm³`,`${a}**2*${h}*314/100`)});
topic('小6','p6-prop','割合・比例','比例の式',({r})=>{const a=r(2,12),x=r(2,30);return q(`yはxに比例し、x＝1のときy＝${a}です。x＝${x}のときのyを求めましょう。`,a*x,`${a}*${x}`)});
topic('小6','p6-scale','図形','縮尺',({r})=>{const a=r(1,30),b=r(1,50)*100;return q(`縮尺1/${b}の地図で長さ${a}cmの道があります。実際の長さは何mですか。`,`${a*b/100}m`,`${a}*${b}/100`)});
// 中1
for(const [op,id,title]of [['+','add','正負の数の加法'],['-','sub','正負の数の減法'],['*','mul','正負の数の乗法']])calc('中1','j1-'+id,title,op,[-20,20]);
topic('中1','j1-div','計算','正負の数の除法',({r,pick})=>{const a=r(1,15)*pick([-1,1]),b=r(1,12)*pick([-1,1]);return q(`${signed(a*b)}÷${signed(b)}を計算しましょう。`,a,`${a*b}/${b}`)});
topic('中1','j1-like','文字と式','文字式の計算',({r})=>{const a=r(1,20),b=r(1,20);return q(`${a}x＋${b}xを簡単にしましょう。`,poly(a+b),`(${a}+${b})*x`,{answerKind:'expression'})});
topic('中1','j1-distribute','文字と式','分配法則',({r})=>{const a=r(2,12),b=r(-12,12);return q(`${a}(x${term(b)})を展開しましょう。`,poly(a,a*b),`${a}*(x+(${b}))`,{answerKind:'expression'})});
topic('中1','j1-eq','方程式','一次方程式',({r})=>{const a=r(2,15),b=r(-20,20),x=r(-20,20),c=a*x+b;return q(`${poly(a,b)}＝${c}を解きましょう。`,`x＝${x}`,`${a}*x+(${b})-(${c})`,{answerKind:'equation'})});
topic('中1','j1-prop','比例・反比例','比例',({r})=>{const a=r(-12,12)||1,x=r(-12,12)||2;return q(`y＝${poly(a)}で、x＝${x}のときのyを求めましょう。`,a*x,`${a}*${x}`)});
topic('中1','j1-inverse','比例・反比例','反比例',({r})=>{const a=r(2,12),b=r(2,12);return q(`y＝${a*b}/xで、x＝${b}のときのyを求めましょう。`,a,`${a*b}/${b}`)});
topic('中1','j1-sector','図形','おうぎ形の面積',({r,pick})=>{const a=r(2,20),angle=pick([30,45,60,90,120,180]);return q(`半径${a}cm、中心角${angle}°のおうぎ形の面積をπを使って表しましょう。`,`${fraction(a*a*angle,360)}π cm²`,`${a}**2*${angle}/360*pi`)});
topic('中1','j1-relative','データ','相対度数',({r})=>{const n=r(2,10)*10,k=r(1,n-1);return q(`全体の度数が${n}、ある階級の度数が${k}です。その階級の相対度数を分数で答えましょう。`,fraction(k,n),`${k}/${n}`)});
// 中2
 topic('中2','j2-poly','式と連立方程式','多項式の加法',({r})=>{const a=r(1,12),b=r(-12,12),c=r(1,12),d=r(-12,12);return q(`(${poly(a,b)})＋(${poly(c,d)})を簡単にしましょう。`,poly(a+c,b+d),`(${a}*x+(${b}))+(${c}*x+(${d}))`,{answerKind:'expression'})});
topic('中2','j2-mono','式と連立方程式','単項式の乗法',({r})=>{const a=r(2,15),b=r(2,15);return q(`${a}x×${b}xを簡単にしましょう。`,`${a*b}x²`,`${a}*x*${b}*x`,{answerKind:'expression'})});
topic('中2','j2-system','式と連立方程式','連立方程式',({r})=>{const x=r(-10,10),y=r(-10,10),a=r(2,8),b=r(2,8),c=a*x+y,d=x-b*y;return q(`連立方程式「${a}x＋y＝${c}、x−${b}y＝${d}」を解きましょう。`,`x＝${x}、y＝${y}`,[`${a}*x+y-(${c})`,`x-${b}*y-(${d})`],{answerKind:'system'})});
topic('中2','j2-function','一次関数','一次関数の値',({r})=>{const a=r(-9,9)||2,b=r(-20,20),x=r(-15,15);return q(`y＝${poly(a,b)}で、x＝${x}のときのyを求めましょう。`,a*x+b,`${a}*(${x})+(${b})`)});
topic('中2','j2-slope','一次関数','変化の割合',({r})=>{const a=r(-9,9)||2,b=r(-20,20),x=r(-10,10),d=r(1,9);return q(`一次関数y＝${poly(a,b)}で、xが${x}から${x+d}まで増加するときの変化の割合を求めましょう。`,a,`((${a}*(${x+d})+(${b}))-(${a}*(${x})+(${b})))/${d}`)});
topic('中2','j2-line','一次関数','2点を通る直線',({r})=>{const a=r(-6,6)||1,b=r(-10,10),x=r(-6,0),d=r(1,6);return q(`2点(${x}, ${a*x+b})、(${x+d}, ${a*(x+d)+b})を通る直線の式を求めましょう。`,`y＝${poly(a,b)}`,`${a}*x+(${b})`,{answerKind:'function'})});
topic('中2','j2-triangle','図形','三角形の内角',({r})=>{const a=r(20,70),b=r(20,70);return q(`三角形の2つの内角が${a}°と${b}°です。残りの内角を求めましょう。`,`${180-a-b}°`,`180-${a}-${b}`)});
topic('中2','j2-polygon','図形','多角形の内角の和',({r})=>{const n=r(3,100);return q(`${n}角形の内角の和を求めましょう。`,`${(n-2)*180}°`,`(${n}-2)*180`)});
topic('中2','j2-prob','データ・確率','同様に確からしい確率',({r})=>{const a=r(1,40),b=r(1,40);return q(`赤玉${a}個、白玉${b}個が入った袋から玉を1個無作為に取り出します。赤玉が出る確率を求めましょう。`,fraction(a,a+b),`${a}/(${a}+${b})`)});
topic('中2','j2-quartile','データ・確率','四分位範囲',({r})=>{const ns=Array.from({length:8},()=>r(1,99)).sort((a,b)=>a-b),v=(ns[5]+ns[6]-ns[1]-ns[2])/2;return q(`データ${ns.join('、')}の四分位範囲を求めましょう。`,dec(v),`(${ns[5]}+${ns[6]}-${ns[1]}-${ns[2]})/2`)});
// 中3
 topic('中3','j3-expand','式の展開・因数分解','乗法公式による展開',({r})=>{const a=r(-12,12)||1,b=r(-12,12)||2;return q(`${factor(-a)}${factor(-b)}を展開しましょう。`,`${poly(1,0,'x²')}${a+b?term(a+b).replace(/(\d+)$/,(_,n)=>n==='1'?'x':n+'x'):''}${a*b?term(a*b):''}`,`(x+(${a}))*(x+(${b}))`,{answerKind:'expression'})});
topic('中3','j3-factor','式の展開・因数分解','二次式の因数分解',({r})=>{const a=r(1,15),b=r(1,15),sum=a+b;return q(`x²${term(sum)}x${term(a*b)}を因数分解しましょう。`,`${factor(-a)}${factor(-b)}`,`x**2+${sum}*x+${a*b}`,{answerKind:'expression'})});
topic('中3','j3-common','式の展開・因数分解','共通因数でくくる',({r})=>{const a=r(2,12),b=r(2,15);return q(`${a}x²＋${a*b}xを因数分解しましょう。`,`${a}x(x＋${b})`,`${a}*x**2+${a*b}*x`,{answerKind:'expression'})});
topic('中3','j3-root','平方根','根号の中を簡単にする',({r})=>{const n=r(2,12)**2*[2,3,5,6,7,10,11,13][r(0,7)];return q(`√${n}をできるだけ簡単にしましょう。`,sqrt(n),`sqrt(${n})`)});
topic('中3','j3-rootmul','平方根','平方根の乗法',({r})=>{const a=r(2,60),b=r(2,60);return q(`√${a}×√${b}を計算しましょう。`,sqrt(a*b),`sqrt(${a})*sqrt(${b})`)});
topic('中3','j3-quadratic','二次方程式','因数分解で解く二次方程式',({r})=>{let a=r(-15,15),b=r(-15,15);if(a===b)b=b===15?14:b+1;return q(`x²${a+b===-1?'＋x':a+b===1?'−x':a+b?term(-a-b)+'x':''}${a*b?term(a*b):''}＝0を解きましょう。`,`x＝${Math.min(a,b)}、${Math.max(a,b)}`,`(x-(${a}))*(x-(${b}))`,{answerKind:'roots'})});
topic('中3','j3-function','関数y=ax²','y=ax²の値',({r})=>{const a=r(-8,8)||1,x=r(-12,12);return q(`y＝${a===1?'':a===-1?'-':a}x²で、x＝${x}のときのyを求めましょう。`,a*x*x,`${a}*(${x})**2`)});
topic('中3','j3-similar','図形','相似比と辺の長さ',({r})=>{const a=r(1,9),b=r(1,9),v=r(2,15);return q(`相似な2つの図形A、Bの相似比が${a}：${b}です。Aの辺${a*v}cmに対応するBの辺の長さを求めましょう。`,`${b*v}cm`,`${a*v}*${b}/${a}`)});
topic('中3','j3-circle','図形','円周角の定理',({r})=>{const a=r(1,179);return q(`同じ弧に対する中心角が${a}°のとき、その弧に対する円周角を求めましょう。`,`${dec(a/2)}°`,`${a}/2`)});
topic('中3','j3-pythagoras','図形','三平方の定理',({r})=>{const a=r(2,30),b=r(2,30);return q(`直角三角形の直角をはさむ2辺が${a}cm、${b}cmです。斜辺の長さを求めましょう。`,`${sqrt(a*a+b*b)}cm`,`sqrt(${a}**2+${b}**2)`)});
installExtraTopics(topic,{q,fraction,sqrt,poly,term});
installCurriculum(topic);
const formById={'j3-factor':'factorized','j3-common':'factorized','j3-expand':'expanded','j1-distribute':'expanded','j3-root':'radical','j3-rootadd':'radical','j3-rootdiv':'radical'};
for(const t of TOPICS){t.mode=t.id.startsWith('cs-')?'review':'auto';if(formById[t.id]){const make=t.make;t.make=ctx=>({...make(ctx),answerForm:formById[t.id]})}}
export const COUNTS=[5,10,20,50,100];
export function generate(ids,count,seed=Date.now()>>>0){if(!COUNTS.includes(count))throw Error('問題数を選んでください。');const topics=TOPICS.filter(t=>ids.includes(t.id));if(!topics.length)throw Error('学習内容を1つ以上選んでください。');if(topics.length>count)throw Error(`選択した${topics.length}項目をすべて出すには、問題数を増やすか項目を減らしてください。`);const random=rng(seed),ctx=context(random),selected=[...topics];for(let i=selected.length-1;i>0;i--){const j=ctx.r(0,i);[selected[i],selected[j]]=[selected[j],selected[i]]}const seen=new Set(),questions=[];let repeats=0;for(let i=0;i<count;i++){const topic=selected[i%selected.length];let item;for(let j=0;j<300;j++){item=topic.make(ctx);if(!seen.has(item.text))break}if(seen.has(item.text))repeats++;seen.add(item.text);questions.push({...item,id:`${seed}-${i}`,topicId:topic.id,topic:topic.title,grade:topic.grade})}return {version:1,seed,count,topicIds:topics.map(t=>t.id),questions,repeats,createdAt:Date.now()}}
