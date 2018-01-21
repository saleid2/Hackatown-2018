document.addEventListener('init', function(event) {
    var page = event.target;
  
    if (page.id === 'page1') {
      page.querySelector('#push-button').onclick = function() 
      {
        document.querySelector('#myNavigator').pushPage('page2.html', {data: {title: 'Get help'}});
      };
     
      page.querySelector('#push-button2').onclick = function() 
      {
        document.querySelector('#myNavigator').pushPage('page3.html', {data: {title: 'Volunteer'}});
      };

    } else if (page.id === 'page2' || page.id ==='page3') {
      page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }
  });