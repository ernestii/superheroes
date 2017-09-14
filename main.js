let heroes = [
  {'name' : 'Prof. Xavier', 'twitter' : '@profx', 'pic' : 'http://www.animatedimages.org/data/media/450/animated-marvel-avatar-image-0004.gif'},
  {'name' : 'Spiderman', 'twitter' : '@spidey', 'pic' : 'http://www.animatedimages.org/data/media/450/animated-marvel-avatar-image-0008.gif'},  
  {'name' : 'Wolverine', 'pic' : 'http://www.animatedimages.org/data/media/450/animated-marvel-avatar-image-0011.gif', 'twitter' : '@logan' }
];


let moreHeroes = [
   {'name' : 'Cyclops', 'twitter' : '@oneye', 'pic' : 'http://www.animatedimages.org/data/media/450/animated-marvel-avatar-image-0005.gif'},
   {'name' : 'Storm', 'twitter' : '@rainsitpours', 'pic' : 'http://www.animatedimages.org/data/media/450/animated-marvel-avatar-image-0007.gif'},
   {'name' : 'Phoenix', 'twitter' : '@jeangrey', 'pic' : 'http://www.animatedimages.org/data/media/450/animated-marvel-avatar-image-0016.gif'}
];

var audio = {
  follow: new Audio('./sounds/served.ogg'),
  unfollow: new Audio('./sounds/your-turn.ogg'),
  add: new Audio('./sounds/through-teeth.ogg'),
  error: new Audio('./sounds/swift.ogg')
};


function template(hero) {
  return `<article class="dt w-100 bb b--black-05 pb2 mt2" href="#0">
  <div class="dtc w2 w3-ns v-mid">
    <img src="${hero.pic}" class="ba b--black-10 db br-100 w2 w3-ns h2 h3-ns"/>
  </div>
  <div class="dtc v-mid pl3">
    <h1 class="f6 f5-ns fw6 lh-title black mv0">${hero.name}</h1>
    <h2 class="f6 fw4 mt0 mb0 black-60">${hero.twitter}</h2>
  </div>
  <div class="dtc v-mid">
    <form class="w-100 tr">
      <button class="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60 follow" type="submit">+ Follow</button>
    </form>
  </div>
  </article>`;
}

const add = document.getElementById('add');
const main = document.querySelector('main');

function render() {
  main.innerHTML = heroes.map( (hero, i) => template(hero)).join('');
}

function* addHero() {
  yield* moreHeroes.map( item => template(item) );
}

let genHeroes = addHero();
add.addEventListener('click', function(e) {
  let next = genHeroes.next();

  if ( ! next.done ) {
    let newHero = document.createElement('div');
    newHero.innerHTML = next.value;
    main.appendChild(newHero);
    audio.add.play();
  } else {
    audio.error.play();
    console.warn('No more heroes');
  }

  e.preventDefault();
})

function toggleFollow() {
  document.body.addEventListener('click', function(e) {
    if ( e.target && e.target.classList.contains('follow') ) {
      let action = e.target.innerHTML == '+ Follow' ? 'follow' : 'unfollow';

      switch(action) {
        case 'follow':
          e.target.innerText = 'Following';
          audio.follow.play();
          console.info('Followed');
          break;

        case 'unfollow': 
          e.target.innerText = '+ Follow';
          audio.unfollow.play();
          console.info('Unfollowed')
          break;
      }

      e.preventDefault();
    }
  });
}

render();
toggleFollow();

