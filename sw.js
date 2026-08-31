/* Service worker do Corte BrCAST.

   Existe para uma coisa só: deixar o programa instalado em cada máquina,
   funcionando offline, e trocando de versão sozinho quando o laboratório
   publica uma. O arquivo solto continua existindo — isto é o caminho das
   máquinas fixas, não o substituto dele.

   REGRA QUE NÃO PODE SER QUEBRADA: só mexe no que é do próprio site. Os
   cortes vêm de uma planilha do Google, por rede, em outro domínio. Se este
   arquivo guardasse aquelas respostas, o laboratório publicaria uma correção
   de corte e as máquinas continuariam interpretando pelo valor antigo, em
   silêncio, sem erro nenhum na tela. Por isso todo pedido para fora passa
   direto, sem tocar no cache. */

const VERSAO = "2026.08.31.19";
const CACHE  = "corte-brcast-" + VERSAO;

/* O que a máquina precisa ter no disco para abrir sem rede. */
const NUCLEO = [
  "./",
  "./index.html",
  "./Corte-BrCAST.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png"
];

self.addEventListener("install", function(e){
  /* cache:"reload" obriga cada arquivo a vir da rede. Sem isso o navegador
     entrega o que tem no próprio cache HTTP — e o GitHub Pages manda
     max-age=600, então uma versão publicada há menos de dez minutos seria
     guardada aqui com o conteúdo velho dentro. A máquina ficaria com o
     rótulo da versão nova e o programa antigo, avisando para sempre que há
     atualização. Foi exatamente o que aconteceu ao testar. */
  e.waitUntil(
    caches.open(CACHE)
      .then(function(c){
        return c.addAll(NUCLEO.map(function(u){
          return new Request(u, {cache:"reload"});
        }));
      })
      .then(function(){ return self.skipWaiting(); })
  );
});

/* Versão nova entrou: apaga as anteriores. Sem isto o disco só cresce, e uma
   cópia velha poderia ressuscitar. */
self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(ks){
      return Promise.all(ks.map(function(k){
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  const req = e.request;
  if(req.method !== "GET") return;

  const url = new URL(req.url);

  // Planilha de cortes, fontes, qualquer outro domínio: não é da nossa conta.
  if(url.origin !== self.location.origin) return;

  // O aviso de versão só serve se for sempre fresco. Guardá-lo seria dizer
  // para sempre que a versão instalada é a última.
  if(url.pathname.endsWith("/version.json")) return;

  /* A página de entrada é a exceção à regra de baixo. Ela muda mais que o
     programa, e não precisa ser instantânea: quem chega nela está começando,
     não laudando. Servida do cache, uma correção publicada não aparece até o
     service worker trocar de versão — e a pessoa recarrega, vê a página velha
     e conclui que a publicação falhou. Rede primeiro, cache só quando não há
     rede. O programa em si continua na regra oposta, logo abaixo. */
  const raiz = new URL("./", self.location).pathname;
  if(url.pathname === raiz || url.pathname === raiz + "index.html"){
    /* cache:"no-cache" pergunta ao servidor se mudou, em vez de aceitar a
       copia que o navegador guardou. Sem isso o max-age=600 do GitHub Pages
       responde por dez minutos e a rede nem e consultada -- o sintoma que
       isto veio corrigir continuaria igual.

       Vai pela URL, e nao por new Request(req, ...): pedido de navegacao tem
       mode "navigate", e reconstrui-lo com qualquer opcao lanca TypeError. O
       catch abaixo engolia essa excecao e servia o cache, entao a regra parecia
       aplicada e nunca era. */
    e.respondWith(
      fetch(url.href, {cache:"no-cache", credentials:"same-origin"}).then(function(r){
        if(r && r.ok && r.type === "basic"){
          const copia = r.clone();
          caches.open(CACHE).then(function(c){ c.put(req, copia); });
        }
        return r;
      }).catch(function(){
        return caches.match(req).then(function(hit){
          return hit || caches.match(raiz);
        });
      })
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(function(hit){
      if(hit) return hit;
      return fetch(req).then(function(r){
        if(r && r.ok && r.type === "basic"){
          const copia = r.clone();
          caches.open(CACHE).then(function(c){ c.put(req, copia); });
        }
        return r;
      });
    })
  );
});
