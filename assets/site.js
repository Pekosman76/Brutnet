const salaryRates={"non-cadre":0.22,"cadre":0.25,"public":0.15};
const entRates={"bnc":0.256,"bic-services":0.212,"bic-vente":0.123};
function money(v){return `${Math.round(v).toLocaleString('fr-FR')} €`;}
function calcTax(income){const bands=[[11497,0],[29315,0.11],[83823,0.30],[180294,0.41],[Infinity,0.45]];let tax=0,cur=income,prev=0;for(const [limit,rate] of bands){const part=Math.min(cur,limit-prev);if(part>0){tax+=part*rate;cur-=part;}if(cur<=0)break;prev=limit;}return tax;}
function updateSalary(){const brut=Number(document.getElementById('sal-brut')?.value||0);const status=document.getElementById('sal-status')?.value||'non-cadre';const taxRate=Number(document.getElementById('sal-tax')?.value||0);const months=Number(document.getElementById('sal-months')?.value||12);const netAnnual=brut*(1-salaryRates[status]);const netMonthly=netAnnual/months;const netAfterAnnual=netAnnual*(1-taxRate/100);
setText('s-net-month',money(netMonthly*(1-taxRate/100)));setText('s-net-annual',money(netAfterAnnual));setText('s-brut-month',money(brut/months));setText('sticky-month',money(netMonthly*(1-taxRate/100)));setText('sticky-annual',money(netAfterAnnual));}
function updateEnt(){const ca=Number(document.getElementById('ent-ca')?.value||0);const regime=document.getElementById('ent-regime')?.value||'bnc';const urssaf=ca*entRates[regime];const netUrssaf=ca-urssaf;const abat=regime==='bic-vente'?0.71:regime==='bic-services'?0.50:0.34;const taxable=ca*(1-abat);const tax=calcTax(taxable);const final=netUrssaf-tax;
setText('e-net',money(final));setText('e-urssaf',money(urssaf));setText('e-tax',money(tax));setText('sticky-tax',money(tax));}
function setText(id,v){const el=document.getElementById(id);if(el)el.textContent=v;}
function copyResult(id,btn){navigator.clipboard.writeText(document.getElementById(id)?.textContent||'');btn.dataset.copied='1';btn.textContent='Copié ✅';setTimeout(()=>btn.textContent='Copier le résultat',1500)}
function toggleAcc(btn){const expanded=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!expanded));}
function initCookies(){const b=document.getElementById('cookie-banner');if(!b)return;const c=localStorage.getItem('cookieConsent');if(!c)b.style.display='block';}
function setConsent(v){localStorage.setItem('cookieConsent',v);document.getElementById('cookie-banner').style.display='none';}
window.addEventListener('DOMContentLoaded',()=>{updateSalary();updateEnt();initCookies();document.getElementById('year')&& (document.getElementById('year').textContent=new Date().getFullYear());});
