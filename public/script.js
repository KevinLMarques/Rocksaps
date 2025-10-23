async function carregarMusicas() {
  const container = document.getElementById('musicas-container');
  if (!container) {
    console.error('Elemento #musicas-container não encontrado no DOM.');
    return;
  }

  container.innerHTML = '<p>Carregando músicas...</p>';

  try {
    console.log('Iniciando requisição para /api/musicas...');
    const resposta = await fetch('/api/musicas');

    console.log('Status da resposta:', resposta.status);
    if (!resposta.ok) {
      const textoErro = await resposta.text();
      console.error('Resposta da API não OK:', textoErro);
      throw new Error('Erro na resposta da API');
    }

    const musicas = await resposta.json();
    console.log('Músicas recebidas:', musicas);

    container.innerHTML = '';

    if (!Array.isArray(musicas) || musicas.length === 0) {
      console.warn('Nenhuma música encontrada ou formato inesperado.');
      container.innerHTML = '<p>Nenhuma música encontrada.</p>';
      return;
    }

    musicas.forEach(musica => {
      console.log('Renderizando música:', musica);

      const div = document.createElement('div');
      div.classList.add('musica');

      div.innerHTML = `
        <img src="${musica.capa}" alt="${musica.nome}">
        <h3>${musica.nome}</h3>
        <p>${musica.artista}</p>
        ${musica.preview ? `<audio controls src="${musica.preview}"></audio>` : '<p>Sem preview disponível</p>'}
      `;

      container.appendChild(div);
    });
  } catch (erro) {
    console.error('Erro ao carregar músicas:', erro);
    container.innerHTML = '<p>Erro ao carregar músicas.</p>';
  }
}

carregarMusicas();