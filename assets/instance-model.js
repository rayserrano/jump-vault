(function(){
  var modal=document.getElementById('imModal');
  if(!modal) return;
  var openers=document.querySelectorAll('.im-open');
  var backdrop=modal.querySelector('.im-modal-backdrop');
  var closeBtn=modal.querySelector('.im-modal-close');
  function open(){ modal.hidden=false; document.body.style.overflow='hidden'; if(closeBtn) closeBtn.focus(); }
  function close(){ modal.hidden=true; document.body.style.overflow=''; }
  openers.forEach(function(el){
    el.addEventListener('click', open);
    el.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open(); } });
  });
  if(backdrop) backdrop.addEventListener('click', close);
  if(closeBtn) closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', function(e){ if(e.key==='Escape' && !modal.hidden) close(); });
})();
