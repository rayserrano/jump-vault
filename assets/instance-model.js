(function(){
  var modal=document.getElementById('imModal');
  if(!modal) return;
  var openers=document.querySelectorAll('.im-open');
  function open(){ modal.hidden=false; document.body.style.overflow='hidden'; }
  function close(){ modal.hidden=true; document.body.style.overflow=''; }
  openers.forEach(function(el){
    el.addEventListener('click', open);
    el.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open(); } });
  });
  modal.addEventListener('click', close);
  document.addEventListener('keydown', function(e){ if(e.key==='Escape' && !modal.hidden) close(); });
})();
