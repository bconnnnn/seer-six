"use strict";
function conditional(){let a=state.assumption;let pass=Math.round(55+a*.26),fail=Math.round(43+a*.08);return {pass,fail,diff:pass-fail};}
function futarchyPage(){
const s=conditional();
mount(header("Futarchy / conditional forecasting","Estimate the effect.<br><span class='violet'>Keep the vote.</span>","Conditional markets compare what the chosen success measure could look like if a proposal passes or fails. The DAO still makes its own decision.")+
"<div class='split'><section class='panel'><div class='card-label'>DAO PROPOSAL / PUBLIC GOODS 018</div><h3 style='font-size:28px;margin:15px 0 9px'>Should the DAO fund an open-data infrastructure pilot?</h3><p>Success metric: independent quarterly adoption score, 90 days after implementation.</p>"+
"<div class='condition-grid'>"+
"<div class='condition yes'><div class='condition-h'>IF PROPOSAL PASSES</div><div class='big-number' id='pass-score'>"+s.pass+" / 100</div>"+bar(s.pass)+"<p class='small-note'>Hypothetical conditional estimate</p></div>"+
"<div class='condition no'><div class='condition-h'>IF PROPOSAL FAILS</div><div class='big-number' id='fail-score'>"+s.fail+" / 100</div>"+bar(s.fail,"green")+"<p class='small-note'>Hypothetical conditional estimate</p></div></div>"+
"<div class='insight'><h4>Scenario difference</h4><p><strong id='condition-diff' style='font-size:26px;color:var(--ink)'>+"+s.diff+" points</strong><br>Not an automated recommendation to vote yes.</p></div></section>"+
"<aside class='panel'><h3>Test a scenario</h3><p>Change the adoption environment and observe both conditional estimates. This explores the interface with synthetic input; no live market action occurs.</p>"+
"<label class='field'>Assumption: <strong id='adoption-value'>"+state.assumption+"</strong> / 100<input id='adoption-range' class='range' type='range' min='10' max='90' step='5' value='"+state.assumption+"'></label>"+
"<div class='evidence' style='margin-top:20px'><strong>Scenario sandbox</strong><br>All probabilities are synthetic. Live data would require documented conditional market resolution rules.</div>"+
"<div class='insight' style='margin-top:18px'><h4>Decision boundary</h4><p>Forecast → deliberation → actual governance vote. They should never be confused.</p></div></aside></div>"+
divider("Three questions, three responsibilities","TRANSPARENT GOVERNANCE")+
"<section class='grid cols3'><div class='card'><span class='card-label'>01 / QUESTION</span><h3>What changes?</h3><p>Specify the policy and the outcome measure.</p></div><div class='card'><span class='card-label'>02 / CONDITIONAL</span><h3>What if?</h3><p>Compare forecasts under alternative conditions.</p></div><div class='card'><span class='card-label'>03 / VOTE</span><h3>Who decides?</h3><p>The DAO retains authority over policy.</p></div></section>");
}
function opportunityPage(){
let options=submissions.map((x,i)=>({x,i}));
if(state.opOrder==="Most backed")options.sort((a,b)=>b.x[4]-a.x[4]);
if(state.opOrder==="Most likely")options.sort((a,b)=>b.x[3]-a.x[3]);
if(state.opOrder==="Name A–Z")options.sort((a,b)=>a.x[0].localeCompare(b.x[0]));
const x=submissions[state.opSelected];
mount(header("Opportunity Markets / submissions","See the field.<br><span class='violet'>Keep the human review.</span>","Compare submissions and the market's estimates of their selection. Forecast prices help review attention; the final reviewer decision stays separate.")+
"<div class='toolbar'>"+buttons(["Most backed","Most likely","Name A–Z"],state.opOrder,"op-sort")+tag("HUMAN-SELECTED OUTCOME","good")+"</div>"+
"<div class='split'><section class='panel'><div class='card-label'>OPEN SELECTION MARKET / FOUR SUBMISSIONS</div><div class='grid' style='gap:10px;margin-top:18px'>"+
options.map(({x,i},rank)=>"<button class='option-card "+(state.opSelected===i?"selected":"")+"' data-action='op-select' data-value='"+i+"'><div class='option-head'><strong><span class='rank'>"+String(rank+1).padStart(2,"0")+"</span>"+x[0]+"</strong><span class='amount'>"+x[3]+"%</span></div>"+bar(x[3])+"<p class='small-note'>"+x[2]+" · "+x[4]+" observers</p></button>").join("")+"</div></section>"+
"<aside class='grid'><div class='artifact'><span class='card-label' style='color:#ccb3ee'>SELECTED SUBMISSION</span><h3>"+x[0]+"</h3><p>"+x[5]+"</p></div><div class='panel'><div class='card-label'>SUBMISSION DOSSIER</div><h3 style='margin-top:15px'>"+x[1]+"</h3><p>"+x[2]+"</p><div class='grid cols2'><div class='metric'><span class='metric-label'>MARKET ESTIMATE</span><strong>"+x[3]+"%</strong></div><div class='metric'><span class='metric-label'>OBSERVERS</span><strong>"+x[4]+"</strong></div></div><p class='small-note'>Forecasts are illustrative and do not select the winner.</p></div></aside></div>"+
divider("Role of the market","INFORMING, NOT AWARDING")+
"<div class='evidence'><strong>Keep the selection auditable.</strong> A market can suggest which entries deserve attention, but a review committee's final ranking remains a distinct decision.</div>");
}
function riskAmount(base){let f={"7D":.44,"30D":1,"90D":1.5}[state.riskWindow];return Math.max(2,Math.round(base*f));}
function riskPage(){
const shown=state.riskCategory==="All"?protocols:protocols.filter(x=>x[1]===state.riskCategory);
mount(header("Risk Pricing / comparison","Compare risk signals.<br><span class='violet'>Not false certainty.</span>","Explore market-implied adverse-event estimates across protocols with a declared time window. Prices are signals about uncertain outcomes, never a guarantee of safety.")+
"<div class='toolbar'>"+buttons(["7D","30D","90D"],state.riskWindow,"risk-window")+tag("SYNTHETIC DATA · NOT FINANCIAL ADVICE","warning")+"</div>"+
"<div class='grid cols3'><div class='stat-card'><span class='card-label'>ENTITIES COMPARED</span><strong>"+shown.length+"</strong><p>Fictional demonstration protocols</p></div>"+
"<div class='stat-card'><span class='card-label'>RISK HORIZON</span><strong>"+state.riskWindow+"</strong><p>Explicit estimation period</p></div>"+
"<div class='stat-card'><span class='card-label'>SIGNAL IS NOT SAFETY</span><strong>≠</strong><p>Forecast errors remain possible</p></div></div>"+
divider("Protocol comparisons","FILTER BY CATEGORY")+
buttons(["All","Lending","Yield","Liquidity","Bridge","Stablecoin"],state.riskCategory,"risk-category")+
"<div class='table-wrap' style='margin-top:20px'><table><thead><tr><th>Example protocol</th><th>Market sector</th><th>Adverse-event estimate</th><th>Estimated trend</th><th>Comparison</th></tr></thead><tbody>"+
shown.map(x=>"<tr><td><strong><span class='dot' style='background:"+x[4]+"'></span>"+x[0]+"</strong></td><td>"+x[1]+"</td><td><strong>"+riskAmount(x[2])+"%</strong></td><td>"+x[3]+"</td><td style='min-width:110px'>"+bar(riskAmount(x[2]))+"</td></tr>").join("")+"</tbody></table></div>"+
divider("Make uncertainty readable","NOT A SAFETY SCORE")+
"<div class='grid risk-grid'><div class='curve'><span class='card-label'>EXAMPLE / IMPLIED ESTIMATE OVER TIME</span><svg viewBox='0 0 540 175' role='img' aria-label='Synthetic line chart showing a fluctuating risk estimate'><line x1='0' y1='130' x2='540' y2='130'/><line x1='0' y1='70' x2='540' y2='70'/><line x1='0' y1='15' x2='540' y2='15'/><polygon points='0,135 0,105 60,93 125,111 190,80 255,89 320,55 380,66 430,38 495,44 540,22 540,135'/><polyline points='0,105 60,93 125,111 190,80 255,89 320,55 380,66 430,38 495,44 540,22'/></svg><p class='small-note'>Illustrative shape only · no live prices</p></div>"+
"<div class='panel'><h3>What belongs next to every price?</h3><p><strong>Resolution event:</strong> precise definition of the adverse outcome.</p><p><strong>Time horizon:</strong> avoid comparing 7 days with a one-year estimate.</p><p><strong>Data provenance:</strong> identify the market and show when the estimate was read.</p><p><strong>Uncertainty:</strong> price is not insurance or a promise.</p></div></div>");
}
function route(){if(view==="markets")marketsPage();else if(view==="deep")deepPage();else if(view==="futarchy")futarchyPage();else if(view==="opportunities")opportunityPage();else if(view==="risk")riskPage();else homePage();}
route();
document.addEventListener("input",e=>{
if(e.target.id==="market-search"){state.search=e.target.value;marketCards();}
if(e.target.id==="adoption-range"){
 state.assumption=Number(e.target.value);const x=conditional();
 document.getElementById("adoption-value").textContent=state.assumption;
 document.getElementById("pass-score").textContent=x.pass+" / 100";
 document.getElementById("fail-score").textContent=x.fail+" / 100";
 document.getElementById("condition-diff").textContent="+"+x.diff+" points";
 let b=document.querySelectorAll(".condition .bar span");if(b[0])b[0].style.width=x.pass+"%";if(b[1])b[1].style.width=x.fail+"%";
}});
document.addEventListener("click",e=>{
 const btn=e.target.closest("[data-action]");if(!btn)return;
 const a=btn.dataset.action,v=btn.dataset.value;
 if(a==="market-filter"){state.filter=v;marketsPage();}
 if(a==="watch"){let id=Number(v);if(state.watch.has(id))state.watch.delete(id);else state.watch.add(id);marketsPage();}
 if(a==="deep"){state.deep=Number(v);deepPage();}
 if(a==="op-sort"){state.opOrder=v;opportunityPage();}
 if(a==="op-select"){state.opSelected=Number(v);opportunityPage();}
 if(a==="risk-window"){state.riskWindow=v;riskPage();}
 if(a==="risk-category"){state.riskCategory=v;riskPage();}
});
