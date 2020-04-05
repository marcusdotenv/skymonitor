# Sky Monitor 

Aplicação beaseada em um projeto do repositório [app-ideas](https://github.com/florinpop17/app-ideas). 

## A ideia

Produzir uma aplicação capaz de checar a temperatura de localidades requisitadas pelo usuário utilizando a api do `accuweather`. 

## Features propostas: 

- [x] Entrar com o nome da cidade em um campo de `input`;
- [x] Ao pressionar enter, fazer uma requisição a API passando o nome da cidade. Em seguida, recarregar a DOM com as informções de temperatura, frase descritiva da condição climática e um ícone que indica o horário (diurno ou noturno) e a condição climática;
- [x] Quando o navegador for fechado, utilizar o `localStorage` para salvar a última pesquisa do usuário. Quando a aplicação for novamente aberta, fazer uma requisiço a API e exibir os dados dos dados salvos no localStorage. **(Feature Bônus)**


## Acréscimos: 

- Foi acrescentado um campo de input para que o usuário digite também o estado da cidade a qual ele está buscando. Como há diversas cidades com o mesmo nome (num mesmo país e no mundo), utilizar o estado na pesquisa reduz em muito a chance de haver resultados incorretos. 

- Alerts que indicam quando há uma localização incorreta. Nesse caso, o usuário terá de redigitar a pesquisa. 
