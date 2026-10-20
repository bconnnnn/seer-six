"use strict";
const ROUTES=[
["home","Seer Protocol","✦"],["markets","Market Explorer","◈"],["deep","Deep","◉"],
["futarchy","Futarchy","⌁"],["opportunities","Opportunity Markets","◇"],["risk","Risk Pricing","◫"]
];
const params=new URLSearchParams(location.search);
const view=ROUTES.some(a=>a[0]===params.get("view"))?params.get("view"):"home";
const state={filter:"All",search:"",watch:new Set(),deep:0,assumption:50,opOrder:"Most backed",opSelected:0,riskWindow:"30D",riskCategory:"All"};
const mk=[
["Technology","Will open models lead the next inference breakthrough?",68,"$1.26m","5.3k"],
["Crypto","Will an Ethereum scaling proposal pass governance this quarter?",74,"$840k","2.4k"],
["Public Goods","Which restoration pilot earns independent approval?",57,"$920k","1.7k"],
["World","Will open-data procurement expand to twelve cities?",39,"$470k","990"],
["Technology","Will private AI devices reach sustainable production volumes?",62,"$2.1m","6.1k"],
["Crypto","Will protocol insurance coverage expand before year end?",45,"$710k","1.6k"]
];
const outcomes=[
["Commons Forge",34,"Accessibility infrastructure",42,"Broad reuse and measurable reach make this proposal attractive to evaluators."],
["Civic Grid",29,"Open procurement data",39,"Clear milestones; uncertain regional adoption."],
["Climate Mesh",22,"Environmental sensor networks",28,"Hardware deployment creates additional delivery uncertainty."],
["Atlas Library",15,"Portable open textbooks",22,"Strong social return with harder-to-verify near-term outcomes."]
];
const submissions=[
["Lightwell","Studio Meridian","Design",37,208,"A modular civic service for intermittent connectivity."],
["The Commons Kit","Open Civic Lab","Open source",28,172,"Composable civic components for local organizations."],
["Signal Garden","Vera Collective","Impact",21,144,"Transparent environmental data communities can verify."],
["Riverline","Northfield Works","Infrastructure",14,78,"Replicable flood warnings and accessible alerts."]
];
const protocols=[
["Atlas Lending","Lending",12,"−1.8 pp","#a477ff"],
["Meridian Vault","Yield",19,"+2.4 pp","#f1a1aa"],
["Northstar Pool","Liquidity",8,"−0.6 pp","#a8d8c2"],
["Bridgeworks","Bridge",27,"+3.1 pp","#b7a1ff"],
["Harbor Stable","Stablecoin",6,"−0.9 pp","#91cce2"]
];
function safe(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function href(p,label,cls="card-link"){return "<a class='"+cls+"' href='?view="+p+"'>"+safe(label)+" ↗</a>";}
function header(k,title,description){return "<div class='section-kicker'>"+k+"</div><h1 class='hero-heading'>"+title+"</h1><p class='subhead'>"+description+"</p>";}
function divider(title,detail=""){return "<div class='eyeline'><h2>"+title+"</h2><span class='micro'>"+detail+"</span></div>";}
function tag(text,variant=""){return "<span class='tag "+variant+"'>"+safe(text)+"</span>";}
function bar(num,variant=""){return "<div class='bar "+variant+"'><span style='width:"+Math.max(1,Math.min(100,num))+"%'></span></div>";}
function buttons(values,active,type){return "<div class='chip-row'>"+values.map(x=>"<button class='chip "+(active===x?"active":"")+"' data-action='"+type+"' data-value='"+safe(x)+"'>"+safe(x)+"</button>").join("")+"</div>";}
function mount(s){document.getElementById("view").innerHTML=s;}
document.getElementById("nav").innerHTML=ROUTES.map(x=>"<a href='?view="+x[0]+"' class='"+(view===x[0]?"active":"")+"'><span class='nav-icon'>"+x[2]+"</span>"+x[1]+"</a>").join("");
document.getElementById("breadcrumb").textContent="SEER / "+ROUTES.find(x=>x[0]===view)[1].toUpperCase();
document.getElementById("connect").addEventListener("click",()=>document.getElementById("notice").showModal());
document.getElementById("theme").addEventListener("click",function(){document.body.classList.toggle("light");this.textContent=document.body.classList.contains("light")?"☾":"☀";});
function homePage(){
const apps=[
["markets","01","Seer App","◈","A general explorer for questions and outcomes, without choosing a specific market type."],
["deep","02","Deep","◉","Many possible outcomes, including markets designed for agent-assisted forecasting."],
["futarchy","03","Futarchy","⌁","Conditional markets compare what a measure might look like if a proposal passes."],
["opportunities","04","Opportunity Markets","◇","Forecast which submissions may be selected while preserving the reviewer's choice."],
["risk","05","Risk Pricing","◫","Compare estimates of adverse-event risk across DeFi protocols."]
];
mount(header("The Seer ecosystem","One protocol.<br><span class='violet'>Six connected interfaces.</span>","Prediction markets are most useful when the interface fits the question. One foundational protocol, five specialist applications, and one clear design language.")+
"<div class='hero-actions'>"+href("markets","Explore markets","primary large-btn")+href("deep","Open Deep","outline large-btn")+"</div>"+
"<section class='hero-stage'><div class='section-kicker'>THE SHARED GRAMMAR</div><h2 class='hero-heading' style='font-size:clamp(32px,3.4vw,52px)'>A forecast informs.<br>People decide.</h2><div class='stage-matrix'>"+
"<div class='stage-item'><span>01 / FRAME</span><strong>Define the outcome</strong><span>A question with a clear resolution rule.</span></div>"+
"<div class='stage-item'><span>02 / DISCOVER</span><strong>Understand the estimate</strong><span>Probability, context, and uncertainty.</span></div>"+
"<div class='stage-item'><span>03 / DECIDE</span><strong>Keep human agency</strong><span>Markets do not replace the vote.</span></div></div></section>"+
divider("The specialist applications","FIVE PATHS / ONE PROTOCOL")+
"<section class='grid cols3'>"+apps.map(x=>"<article class='card hoverable'><div class='card-top'><span class='card-label'>APPLICATION "+x[1]+"</span><div class='card-icon'>"+x[3]+"</div></div><h3>"+x[2]+"</h3><p>"+x[4]+"</p>"+href(x[0],"Explore design")+"</article>").join("")+"</section>"+
divider("Design principles","RECOGNIZABLE THROUGHOUT")+
"<div class='grid cols3'><div class='stat-card'><span class='card-label'>SHARED INTERACTION</span><strong>01</strong><p>One clear navigation system, accessible across every surface.</p></div><div class='stat-card'><span class='card-label'>SPECIALIST LENSES</span><strong>05</strong><p>Different questions need different representations.</p></div><div class='stat-card'><span class='card-label'>HUMAN OVERSIGHT</span><strong>∞</strong><p>Probabilities remain signals, not automated conclusions.</p></div></div>");
}
function marketCards(){
let list=mk.map((m,i)=>({m,i})).filter(({m,i})=>(state.filter==="All"||(state.filter==="Watchlist"&&state.watch.has(i))||m[0]===state.filter)&&m[1].toLowerCase().includes(state.search.toLowerCase()));
const node=document.getElementById("market-list");if(!node)return;
node.innerHTML=list.length?list.map(({m,i})=>"<article class='market-card'><div class='market-head'>"+tag(m[0],"purple")+"<button class='watch "+(state.watch.has(i)?"on":"")+"' aria-label='Watch market' data-action='watch' data-value='"+i+"'>"+(state.watch.has(i)?"★":"☆")+"</button></div><h3>"+safe(m[1])+"</h3><div class='prob-label'><span>YES ESTIMATE</span><strong>"+m[2]+"%</strong></div>"+bar(m[2])+"<div class='market-stats'><span>Sample volume<br><strong>"+m[3]+"</strong></span><span>Observers<br><strong>"+m[4]+"</strong></span></div></article>").join(""):"<div class='empty'>No markets match. Change your search or filter.</div>";
document.getElementById("market-count").textContent=list.length+" ILLUSTRATIVE MARKETS";
}
function marketsPage(){
mount(header("Seer / general market explorer","Every question.<br><span class='violet'>One place to look.</span>","Find markets across categories. Search, filter and save questions to a local watchlist. The cards demonstrate interaction with carefully labeled synthetic data.")+
"<div class='grid cols3'><div class='stat-card'><span class='card-label'>DEMO MARKETS</span><strong>06</strong><p>Across four categories</p></div><div class='stat-card'><span class='card-label'>WATCHLIST</span><strong>"+state.watch.size+"</strong><p>Saved in this browsing session</p></div><div class='stat-card'><span class='card-label'>CONNECTED APPS</span><strong>05</strong><p>Each a different view of markets</p></div></div>"+
divider("Find your market","SEARCH AND FILTER")+
"<div class='toolbar'><input class='search' id='market-search' aria-label='Search markets' placeholder='Search markets and questions...' type='search' value='"+safe(state.search)+"'>"+tag("NON-LIVE DATA")+"</div>"+
buttons(["All","Crypto","Technology","Public Goods","World","Watchlist"],state.filter,"market-filter")+
divider("Discovery","<span id='market-count'></span>")+
"<div class='grid cols3' id='market-list'></div><p class='small-note' style='margin-top:20px'>Every price, volume and outcome in this interface is illustrative, not Seer market data.</p>");
marketCards();
}
function deepPage(){
const selected=outcomes[state.deep];
mount(header("Deep / multi-outcome markets","Questions can have<br><span class='violet'>more than two answers.</span>","What if AI agents forecast how human reviewers will evaluate four public-goods grant proposals? Deep presents multiple potential winners without collapsing the problem into yes/no.")+
"<div class='toolbar'>"+tag("PUBLIC GOODS CASE STUDY","purple")+tag("FOUR OUTCOMES")+tag("AGENT-READY MARKET")+"</div>"+
"<div class='split'><section class='panel'><div class='card-label'>WHICH PROPOSAL TOPS THE EVALUATOR RANKING?</div><h3 style='margin:16px 0 25px'>Compare every candidate</h3><div class='grid' style='gap:10px'>"+
outcomes.map((x,i)=>"<button class='option-card "+(i===state.deep?"selected":"")+"' data-action='deep' data-value='"+i+"'><div class='option-head'><strong>"+(i+1)+" · "+x[0]+"</strong><span class='amount'>"+x[1]+"%</span></div>"+bar(x[1])+"<p class='small-note'>"+x[2]+"</p></button>").join("")+"</div><p class='small-note'>Estimates sum to 100%. Click to inspect a candidate.</p></section>"+
"<aside class='grid'><div class='artifact'><span class='card-label' style='color:#ccb3ee'>SELECTED CANDIDATE</span><h3>"+selected[0]+"</h3><p>"+selected[2]+"</p></div><div class='panel'><div class='card-label'>FORECAST DETAIL</div><div class='grid cols2' style='margin:17px 0'><div class='metric'><span class='metric-label'>ESTIMATE</span><strong>"+selected[1]+"%</strong></div><div class='metric'><span class='metric-label'>AGENT SIGNALS</span><strong>"+selected[3]+"</strong></div></div><div class='insight'><h4>Why the market might think this</h4><p>"+selected[4]+"</p></div></div></aside></div>"+
divider("Built for many outcomes","INFERENCE ≠ AUTHORITY")+
"<div class='evidence'><strong>Human review still owns the selection.</strong> Market prices represent beliefs about the evaluation result, not an instruction to fund a candidate.</div>");
}
