(function(){
  // Rebase internal xrefs rendered from header-links.adoc to that source page.
  // Otherwise a relative xref works on header-links.html but breaks when the
  // same list is embedded in another component/module/deep article.
  document.querySelectorAll('.header-adoc-nav[data-header-source-url]').forEach(function(nav){
    var originalPage;
    try { originalPage = new URL(nav.getAttribute('data-header-source-url'), document.baseURI); }
    catch(e) { return; }
    nav.querySelectorAll('a[href]').forEach(function(anchor){
      var href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('/') || /^[a-z][a-z\d+.-]*:/i.test(href) || href.startsWith('//')) return;
      try { anchor.href = new URL(href, originalPage).href; } catch(e) {}
      if (anchor.target === '_blank') anchor.rel = 'noopener noreferrer';
    });
  });

  var toggle=document.querySelector('.mobile-nav-toggle');
  var sidebar=document.querySelector('.docs-sidebar');
  if(toggle&&sidebar){toggle.addEventListener('click',function(){var open=sidebar.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});}

  // Antora may emit a blank navigation-group heading for malformed or unlabeled
  // parent nodes. Do not leave an arrow-only toggle in the sidebar.
  // Also normalize text in headings that contain nested inline markup.
  document.querySelectorAll('.nav-group > .nav-toggle').forEach(function(button){
    var label = button.querySelector('.nav-label');
    if (!label) return;
    var text = (label.textContent || '').replace(/\s+/g, ' ').trim();
    if (!text) {
      var descendants = button.parentElement.querySelectorAll('.nav-children .nav-row a, .nav-children .nav-toggle .nav-label');
      for (var i=0; i<descendants.length; i++) {
        var candidate=(descendants[i].textContent || '').replace(/\s+/g, ' ').trim();
        if (candidate) { text=candidate; break; }
      }
      if (!text) text='Untitled section';
      button.dataset.fallbackLabel='true';
    }
    label.textContent=text;
  });

  // Highlight the active Antora article before initializing expandable groups.
  var here=window.location.pathname;
  document.querySelectorAll('.docs-sidebar a').forEach(function(a){
    try{if(new URL(a.href).pathname===here){a.classList.add('is-current');a.setAttribute('aria-current','page');}}
    catch(e){}
  });

  // Avoid native <details>/<summary> rendering: labels always remain visible.
  // A semantic button handles keyboard interaction and announced expanded state.
  function setGroupOpen(group,open){
    var button=group.querySelector(':scope > .nav-toggle');
    if(!button)return;
    group.classList.toggle('is-collapsed',!open);
    button.setAttribute('aria-expanded',String(open));
    var chevron=button.querySelector('.nav-chevron');
    if(chevron)chevron.textContent=open?'▾':'▸';
  }
  document.querySelectorAll('.nav-group').forEach(function(group,i){
    var button=group.querySelector(':scope > .nav-toggle');
    var children=group.querySelector(':scope > .nav-children');
    if(!button||!children)return;
    if(!children.id)children.id='nav-children-'+(i+1);
    button.setAttribute('aria-controls',children.id);
    // Keep the group containing the current article expanded; collapse others.
    setGroupOpen(group,!!group.querySelector('a[aria-current="page"]'));
  });
  document.addEventListener('click',function(event){
    var button=event.target.closest('.nav-toggle');
    if(!button)return;
    var group=button.closest('.nav-group');
    if(group)setGroupOpen(group,button.getAttribute('aria-expanded')!=='true');
  });

  var filter=document.getElementById('nav-filter');
  if(filter&&sidebar){
    filter.addEventListener('input',function(){
      var q=filter.value.toLowerCase().trim();
      var entries=Array.prototype.slice.call(sidebar.querySelectorAll('li.nav-item'));
      entries.reverse().forEach(function(li){
        var row=li.querySelector(':scope > .nav-row, :scope > .nav-group > .nav-row');
        var label=row?row.textContent.toLowerCase():'';
        var children=li.querySelectorAll('li.nav-item');
        var childMatch=Array.prototype.some.call(children,function(child){return !child.hidden;});
        li.hidden=!!q&&!label.includes(q)&&!childMatch;
        var group=li.querySelector(':scope > .nav-group');
        if(q&&group&&(childMatch||label.includes(q)))setGroupOpen(group,true);
      });
    });
  }
  var toc=document.getElementById('js-local-toc');
  var article=document.querySelector('.article-body');
  if(toc&&article){article.querySelectorAll('h2[id], h3[id]').forEach(function(h){var a=document.createElement('a');a.href='#'+encodeURIComponent(h.id);a.textContent=h.textContent;a.className=h.tagName==='H3'?'level3':'level2';toc.appendChild(a);});}
})();
