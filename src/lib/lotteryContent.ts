// ---------------------------------------------------------------------------
// Static rich content for all 9 lotteries — used across homepage, game pages,
// result pages, and blog posts. Written once, rendered everywhere.
// ---------------------------------------------------------------------------

export interface LotteryContentData {
  /** 3-4 paragraph detailed description */
  fullDescription: string;
  /** Step-by-step how to play */
  howToPlay: string;
  /** Prize structure explanation */
  prizeStructure: string;
  /** Historical context — first draw, milestones */
  drawHistory: string;
  /** 2-3 interesting facts */
  curiosities: string;
  /** Short rules summary for homepage card (~150 words) */
  homepageSummary: string;
  /** First draw date (for "Xth concurso" calculation) */
  firstDrawDate: string;
  /** 10 rotating curiosity facts for result pages */
  facts: string[];
}

export const LOTTERY_CONTENT: Record<string, LotteryContentData> = {
  'mega-sena': {
    fullDescription:
      'A Mega-Sena existe desde 1996 e é a loteria mais conhecida do Brasil. O apostador escolhe 6 números entre 1 e 60. Os sorteios acontecem às terças, quintas e sábados, às 21h (horário de Brasília), com transmissão ao vivo.\n\nTodo dia 31 de dezembro acontece a Mega da Virada, um sorteio especial que não acumula: o prêmio vai para quem acertar a faixa mais alta com ganhadores. A Mega da Virada já pagou mais de R$ 500 milhões em um único concurso.\n\nGanha quem acertar 4 números (Quadra), 5 (Quina) ou todos os 6 (Sena). A aposta simples custa R$ 5,00 e dá para marcar até 20 números, o que aumenta as chances e o valor da aposta.',
    howToPlay:
      '1. Escolha 6 a 20 números no volante, de 01 a 60.\n2. Marque a aposta no volante físico em uma lotérica ou pelo aplicativo/site Loterias Caixa.\n3. A aposta mínima (6 números) custa R$ 5,00. Quanto mais números marcar, maior o custo e as chances.\n4. Você também pode optar pela Surpresinha (números escolhidos aleatoriamente) ou Teimosinha (mesma aposta por vários concursos consecutivos).\n5. Os sorteios acontecem às terças, quintas e sábados, às 21h.\n6. Confira o resultado neste site minutos após o sorteio oficial.',
    prizeStructure:
      'A Mega-Sena distribui prêmios em 3 faixas: Sena (6 acertos), Quina (5 acertos) e Quadra (4 acertos). Do valor arrecadado, 43,35% vai para o prêmio bruto, distribuído assim: 35% para a Sena, 19% para a Quina e 19% para a Quadra. Os 27% restantes vão para acumulações especiais e a Mega da Virada.',
    drawHistory:
      'O primeiro sorteio da Mega-Sena aconteceu em 11 de março de 1996. De lá pra cá, o maior prêmio da Mega-Sena regular passou dos R$ 300 milhões, e a Mega da Virada já pagou mais de R$ 500 milhões em um concurso só.',
    curiosities:
      'A Mega-Sena já fez mais de 100 milionários desde 1996. Os números que mais saíram ao longo da história são 10, 53, 05 e 33. A chance de acertar a Sena com aposta simples (6 números) é de 1 em 50.063.860. Com 20 números (aposta máxima), a chance cai para 1 em 1.292.',
    homepageSummary:
      'Sorteios às terças, quintas e sábados. O apostador escolhe 6 números de 1 a 60 e ganha acertando 4, 5 ou 6 dezenas. A chance de acertar a Sena com aposta simples é de 1 em 50.063.860. A aposta mínima custa R$ 5,00. Quando acumula, o prêmio costuma passar dos R$ 100 milhões. A Mega da Virada, no dia 31 de dezembro, é o maior sorteio do ano e não acumula.',
    firstDrawDate: '11/03/1996',
    facts: [
      'Desde 1996, a Mega-Sena já pagou mais de R$ 100 bilhões em prêmios.',
      'Com aposta simples, a chance de acertar os 6 números é de 1 em 50.063.860.',
      'A Mega da Virada acontece todo dia 31 de dezembro e não acumula.',
      'Dá para marcar até 20 números no volante, mas o custo da aposta sobe junto.',
      'Os números 10, 53, 05 e 33 são os que mais saíram na história.',
      'O prêmio é pago de uma vez, já com desconto de imposto de renda na fonte.',
      'Se ninguém acerta a Sena, o prêmio acumula para o concurso seguinte.',
      'O ganhador tem 90 dias corridos para resgatar o prêmio. Depois disso, perde.',
      'Parte da arrecadação vai para programas sociais do Governo Federal.',
      'O recorde de acumulação já passou de 15 concursos seguidos sem ganhador da Sena.',
    ],
  },
  'lotofacil': {
    fullDescription:
      'A Lotofácil é a loteria mais fácil de ganhar da Caixa. Existe desde 2003. O apostador marca 15 números entre 25, e os sorteios acontecem de segunda a sábado às 21h.\n\nO que diferencia a Lotofácil é que ela premia a partir de 11 acertos, com chance de aproximadamente 1 em 11 para a faixa mínima. Acertar todos os 15 números tem probabilidade de 1 em 3.268.760.\n\nA aposta mínima custa R$ 3,00 (15 números). Dá para marcar até 20 números por volante, o que melhora as chances mas encarece a aposta. Por isso a Lotofácil é popular entre quem quer prêmios menores mas mais frequentes.',
    howToPlay:
      '1. Escolha de 15 a 20 números no volante, entre 01 e 25.\n2. A aposta mínima (15 números) custa R$ 3,00.\n3. Você pode fazer apostas em casas lotéricas ou pelo aplicativo/site Loterias Caixa.\n4. Use a Surpresinha para números aleatórios ou Teimosinha para repetir a aposta.\n5. Os sorteios acontecem de segunda a sábado, às 21h.\n6. Ganha quem acertar 11, 12, 13, 14 ou 15 números.',
    prizeStructure:
      'A Lotofácil distribui prêmios em 5 faixas: 15 acertos (prêmio principal), 14, 13, 12 e 11 acertos. Do prêmio bruto, 35% vai para quem acerta 15, 15% para 14 acertos, 20% para 13, 15% para 12 e 15% para 11 acertos. A probabilidade de ganhar qualquer prêmio na Lotofácil é de aproximadamente 1 em 11.',
    drawHistory:
      'O primeiro sorteio da Lotofácil aconteceu em 29 de setembro de 2003. Em volume diário de apostas, ela supera até a Mega-Sena.',
    curiosities:
      'É comum dezenas de apostadores acertarem os 15 números em um único concurso da Lotofácil. Com 5 faixas de premiação e probabilidades altas, muitos jogadores usam desdobramentos para cobrir mais combinações.',
    homepageSummary:
      'Sorteios de segunda a sábado. O apostador marca 15 números entre 25 e ganha acertando 11 ou mais. A chance de acertar 15 é de 1 em 3.268.760, mas a de acertar 11 (prêmio mínimo) é de 1 em 11. A aposta mínima custa R$ 3,00.',
    firstDrawDate: '29/09/2003',
    facts: [
      'Existe desde 2003 e já pagou bilhões de reais em prêmios.',
      'A chance de acertar os 15 números é de 1 em 3.268.760.',
      'Ganhar qualquer prêmio (11 acertos) tem chance de 1 em 11.',
      'É comum dezenas de apostadores acertarem os 15 números no mesmo concurso.',
      'Dá para marcar até 20 números por volante para melhorar as chances.',
      'São 6 sorteios por semana, de segunda a sábado — a loteria que mais sorteia.',
      'Em volume diário de apostas, supera todas as outras loterias da Caixa.',
      'A Lotofácil da Independência, em setembro, é o sorteio especial que não acumula.',
      'O apostador marca 15 de 25 números — ou seja, 60% do total.',
      'Parte da arrecadação vai para o Comitê Olímpico e o Comitê Paralímpico Brasileiro.',
    ],
  },
  'quina': {
    fullDescription:
      'A Quina existe desde 1994. Sorteios de segunda a sábado às 21h. O apostador escolhe 5 números entre 1 e 80, e ganha acertando de 2 a 5 números.\n\nA aposta mínima custa R$ 2,50, o menor valor entre as principais loterias. Dá para marcar até 15 números por volante, o que melhora as chances mas encarece a aposta.\n\nA Quina de São João, no dia 24 de junho, é o sorteio especial que não acumula. Todo o prêmio vai para os acertadores da maior faixa com ganhadores.',
    howToPlay:
      '1. Escolha de 5 a 15 números no volante, entre 01 e 80.\n2. A aposta mínima (5 números) custa R$ 2,50.\n3. Faça sua aposta em lotéricas ou pelo aplicativo Loterias Caixa.\n4. Os sorteios acontecem de segunda a sábado, às 21h.\n5. Ganha quem acertar 2, 3, 4 ou 5 números.\n6. Confira o resultado neste site logo após o sorteio.',
    prizeStructure:
      'A Quina premia em 4 faixas: Quina (5 acertos), Quadra (4), Terno (3) e Duque (2). Do prêmio bruto, 35% vai para a Quina, 15% para a Quadra, 20% para o Terno e 30% para o Duque. Acertar apenas 2 números já garante um prêmio, tornando a Quina muito acessível.',
    drawHistory:
      'O primeiro sorteio da Quina foi em 13 de março de 1994. É uma das loterias mais antigas da Caixa que ainda está ativa. A Quina de São João, criada depois, virou um dos sorteios especiais mais esperados.',
    curiosities:
      'A Quina usa 80 números, o maior universo numérico entre as loterias populares. Isso dificulta o prêmio principal, mas acertar o Duque (2 números) tem chance de 1 em 36.',
    homepageSummary:
      'Sorteios de segunda a sábado. O apostador escolhe 5 números de 1 a 80 e ganha acertando de 2 a 5 dezenas. A probabilidade do prêmio principal é de 1 em 24.040.016. A aposta mínima custa R$ 2,50, a mais barata entre as loterias. A Quina de São João é o sorteio especial que não acumula.',
    firstDrawDate: '13/03/1994',
    facts: [
      'Existe desde 1994 — é uma das loterias mais antigas da Caixa.',
      'A chance de acertar os 5 números é de 1 em 24.040.016 com aposta simples.',
      'Acertar só 2 números (Duque) já dá prêmio. A chance é de 1 em 36.',
      'A Quina de São João, em junho, é o sorteio especial que não acumula.',
      'Os números vão de 1 a 80, o maior universo numérico entre as loterias populares.',
      'A aposta mínima custa R$ 2,50, a mais barata entre as principais loterias.',
      'Dá para marcar até 15 números por volante.',
      'São 6 sorteios por semana, de segunda a sábado, às 21h.',
      'Parte da arrecadação vai para o Fundo Penitenciário Nacional e o Ministério do Esporte.',
      'Os números 04, 52 e 33 são os que mais saíram na história da Quina.',
    ],
  },
  'lotomania': {
    fullDescription:
      'Na Lotomania, o apostador marca 50 números de 00 a 99. São sorteados 20 números por concurso. Ganha quem acertar todos os 20 — ou quem não acertar nenhum.\n\nSorteios às segundas, quartas e sextas, às 21h. A aposta é fixa em R$ 3,00 para exatamente 50 números. Não dá para escolher mais nem menos.\n\nA premiação tem 7 faixas: de 20 acertos até 15, mais a faixa de 0 acertos. Essa regra de premiar quem erra tudo é única entre as loterias brasileiras.',
    howToPlay:
      '1. Marque exatamente 50 números no volante, de 00 a 99.\n2. A aposta custa R$ 3,00 (valor fixo, sem variação).\n3. São sorteados 20 números por concurso.\n4. Ganha acertando 20, 19, 18, 17, 16, 15 ou 0 números.\n5. Faça sua aposta em casas lotéricas ou online.\n6. Sorteios às segundas, quartas e sextas, às 21h.',
    prizeStructure:
      'A Lotomania distribui prêmios em 7 faixas: 20 acertos (37,5%), 19 acertos (10%), 18 acertos (10%), 17 acertos (10%), 16 acertos (10%), 15 acertos (10%) e 0 acertos (12,5%). A faixa de 0 acertos tem a mesma probabilidade do prêmio principal.',
    drawHistory:
      'O primeiro sorteio da Lotomania foi em 2 de outubro de 1999. A regra de premiar quem acerta 0 números chamou atenção desde o início.',
    curiosities:
      'A probabilidade de não acertar nenhum dos 20 números é a mesma de acertar todos. A aposta é fixa em 50 números — não dá para marcar mais nem menos.',
    homepageSummary:
      'O apostador marca 50 números de 00 a 99. São sorteados 20, e ganha quem acertar todos ou nenhum. Sorteios às segundas, quartas e sextas. A aposta fixa custa R$ 3,00. A chance do prêmio principal é de 1 em 11.372.635. Detalhe: acertar 0 números também paga prêmio.',
    firstDrawDate: '02/10/1999',
    facts: [
      'Existe desde 1999. É a única loteria brasileira que premia quem acerta 0 números.',
      'A chance de acertar os 20 números é de 1 em 11.372.635.',
      'O apostador sempre marca exatamente 50 números — sem variação.',
      'A chance de não acertar nenhum é exatamente igual à de acertar todos os 20.',
      'A aposta é fixa em R$ 3,00. Não dá para pagar mais para marcar mais números.',
      'São 20 números sorteados de um universo de 100 (00 a 99).',
      'Sorteios 3 vezes por semana: segunda, quarta e sexta.',
      'São 7 faixas de premiação, incluindo a faixa de 0 acertos.',
      'O apostador marca mais números (50) do que são sorteados (20).',
      'A Lotomania de Independência, em setembro, não acumula.',
    ],
  },
  'mais-milionaria': {
    fullDescription:
      'A +Milionária é a loteria mais nova da Caixa, lançada em 2022. O apostador escolhe 6 números de 1 a 50 e 2 trevos de 1 a 6.\n\nO prêmio mínimo garantido é de R$ 10 milhões, o maior piso entre as loterias brasileiras. Sorteios às quartas e sábados, às 21h.\n\nSão 10 faixas de premiação, de 6 números + 2 trevos (prêmio principal) até 3 números + 2 trevos. A probabilidade de acertar tudo é de 1 em 238.360.500 — a mais difícil da Caixa, mas os prêmios são proporcionais.',
    howToPlay:
      '1. Escolha 6 números de 01 a 50.\n2. Escolha 2 trevos de 1 a 6.\n3. A aposta mínima custa R$ 6,00.\n4. Sorteios às quartas e sábados, às 21h.\n5. São 10 faixas de premiação.\n6. Prêmio mínimo garantido de R$ 10 milhões.',
    prizeStructure:
      'A +Milionária tem 10 faixas de premiação. O prêmio principal (6+2) tem mínimo garantido de R$ 10 milhões. As faixas vão de 6 números + 2 trevos até 3 números + 2 trevos, oferecendo diversas chances de ganhar.',
    drawHistory:
      'O primeiro sorteio da +Milionária foi em 28 de maio de 2022. O piso mínimo de R$ 10 milhões foi pensado para competir com grandes loterias internacionais.',
    curiosities:
      'É a única loteria da Caixa com dois elementos de sorteio: números e trevos. A probabilidade de 1 em 238.360.500 é a mais difícil do Brasil, mas o prêmio mínimo garantido de R$ 10 milhões compensa.',
    homepageSummary:
      'O apostador escolhe 6 números de 1 a 50 mais 2 trevos de 1 a 6. Prêmio mínimo garantido de R$ 10 milhões. Sorteios às quartas e sábados. A chance do prêmio principal é de 1 em 238.360.500, a mais difícil da Caixa. A aposta mínima custa R$ 6,00.',
    firstDrawDate: '28/05/2022',
    facts: [
      'É a loteria mais nova da Caixa, lançada em 2022.',
      'O prêmio mínimo garantido é de R$ 10 milhões por concurso.',
      'A chance de acertar tudo (6+2) é de 1 em 238.360.500.',
      'Única loteria da Caixa que combina números (6 de 50) com trevos (2 de 6).',
      'São 10 faixas de premiação.',
      'Sorteios duas vezes por semana: quartas e sábados.',
      'O piso de R$ 10 milhões foi pensado para competir com loterias internacionais.',
      'O prêmio principal exige acertar os 6 números e os 2 trevos.',
      'A aposta mínima custa R$ 6,00, o valor mais alto entre as loterias da Caixa.',
      'Os trevos são sorteados de forma independente dos números.',
    ],
  },
  'dia-de-sorte': {
    fullDescription:
      'No Dia de Sorte, o apostador escolhe 7 números de 1 a 31 (os dias do mês) e um mês da sorte entre os 12 do ano.\n\nSorteios às terças, quintas e sábados, às 21h. A aposta mínima custa R$ 3,00 e dá para marcar até 15 números.\n\nMesmo sem acertar números suficientes, quem acerta o mês sorteado já leva prêmio, com chance de 1 em 12.',
    howToPlay:
      '1. Escolha de 7 a 15 números no volante, entre 01 e 31.\n2. Escolha 1 mês da sorte entre os 12 meses do ano.\n3. A aposta mínima (7 números) custa R$ 3,00.\n4. Sorteios às terças, quintas e sábados, às 21h.\n5. Ganha acertando 4, 5, 6 ou 7 números, ou acertando o mês da sorte.\n6. O mês é sorteado independentemente dos números.',
    prizeStructure:
      'O Dia de Sorte premia em 5 faixas: 7 acertos (30%), 6 acertos (15%), 5 acertos (20%), 4 acertos (35%) e Mês da Sorte (valor fixo). O mês é sorteado separadamente e garante um prêmio adicional com chance de 1 em 12.',
    drawHistory:
      'O primeiro sorteio do Dia de Sorte foi em 19 de maio de 2018. A ideia de combinar números com meses era nova no Brasil.',
    curiosities:
      'É a única loteria da Caixa onde se escolhe um mês além dos números. Os números vão de 1 a 31 porque representam os dias do mês. Acertar só o mês já paga prêmio.',
    homepageSummary:
      'O apostador escolhe 7 números de 1 a 31 e um mês da sorte. Sorteios às terças, quintas e sábados. A chance de acertar 7 números é de 1 em 5.245.786. A aposta mínima custa R$ 3,00. Quem acerta o mês da sorte já ganha, com chance de 1 em 12.',
    firstDrawDate: '19/05/2018',
    facts: [
      'Existe desde 2018.',
      'A chance de acertar os 7 números é de 1 em 5.245.786.',
      'Única loteria da Caixa onde se escolhe um mês além dos números.',
      'Acertar só o mês da sorte já dá prêmio. Chance de 1 em 12.',
      'Os números vão de 1 a 31 porque representam os dias do mês.',
      'O mês é sorteado de forma independente dos números.',
      'Dá para marcar até 15 números no volante.',
      'São 5 faixas de premiação, incluindo a faixa do mês.',
      'A aposta mínima custa R$ 3,00 (7 números + 1 mês).',
      'É a única loteria brasileira que mistura números com meses do ano.',
    ],
  },
  'super-sete': {
    fullDescription:
      'O Super Sete funciona com 7 colunas, cada uma com números de 0 a 9. O apostador escolhe um número por coluna, ou mais para melhorar as chances.\n\nSorteios às segundas, quartas e sextas, às 21h. A aposta mínima custa R$ 2,50. Dá para marcar até 3 números por coluna.\n\nGanha quem acertar de 3 a 7 colunas. A chance de acertar as 7 com aposta simples é de 1 em 10.000.000.',
    howToPlay:
      '1. Escolha um número de 0 a 9 para cada uma das 7 colunas.\n2. É possível marcar até 3 números por coluna para aumentar as chances.\n3. A aposta mínima (1 número por coluna) custa R$ 2,50.\n4. Sorteios às segundas, quartas e sextas, às 21h.\n5. Ganha acertando 3, 4, 5, 6 ou 7 colunas.\n6. Use a Surpresinha para seleção aleatória.',
    prizeStructure:
      'O Super Sete premia em 5 faixas: 7 colunas certas (40%), 6 colunas (15%), 5 colunas (15%), 4 colunas (15%) e 3 colunas (15%). Cada coluna sorteada é independente das demais.',
    drawHistory:
      'O Super Sete começou em 2 de outubro de 2020, no lugar da extinta Loteca. O formato em colunas é inspirado em loterias europeias.',
    curiosities:
      'É a única loteria da Caixa com formato de colunas. Cada coluna é sorteada de forma independente, com números de 0 a 9.',
    homepageSummary:
      'O Super Sete funciona com 7 colunas independentes, cada uma com números de 0 a 9. O apostador escolhe um número por coluna e ganha acertando de 3 a 7 colunas. Sorteios às segundas, quartas e sextas. A probabilidade de acertar as 7 colunas é de 1 em 10.000.000. A aposta mínima custa R$ 2,50.',
    firstDrawDate: '02/10/2020',
    facts: [
      'Começou em outubro de 2020, no lugar da extinta Loteca.',
      'A chance de acertar as 7 colunas é de 1 em 10.000.000.',
      'Única loteria da Caixa com formato de colunas independentes.',
      'Cada coluna tem números de 0 a 9 — 10 opções por coluna.',
      'Dá para marcar até 3 números por coluna.',
      'A aposta mínima custa R$ 2,50.',
      'Sorteios 3 vezes por semana: segunda, quarta e sexta.',
      'O formato em colunas é inspirado em loterias europeias.',
      'Acertar 3 colunas já dá prêmio. A chance é de 1 em 16.',
      'São 5 faixas de premiação, de 3 a 7 colunas.',
    ],
  },
  'dupla-sena': {
    fullDescription:
      'A Dupla Sena faz dois sorteios de 6 números (de 1 a 50) em cada concurso. O apostador concorre com a mesma aposta nos dois.\n\nSorteios às segundas, quartas e sextas, às 21h. A aposta mínima custa R$ 2,50 e dá para marcar de 6 a 15 números.\n\nGanha quem acertar 3, 4, 5 ou 6 números em qualquer dos dois sorteios. Na prática, são duas chances de ganhar por concurso.',
    howToPlay:
      '1. Escolha de 6 a 15 números no volante, entre 01 e 50.\n2. A aposta mínima (6 números) custa R$ 2,50.\n3. São realizados 2 sorteios de 6 números em cada concurso.\n4. Você concorre com a mesma aposta nos dois sorteios.\n5. Sorteios às segundas, quartas e sextas, às 21h.\n6. Ganha acertando 3, 4, 5 ou 6 números em qualquer sorteio.',
    prizeStructure:
      'A Dupla Sena premia em 4 faixas por sorteio: Sena (6 acertos - 30%), Quina (5 acertos - 10%), Quadra (4 acertos - 10%) e Terno (3 acertos - 50%). Como são dois sorteios, o apostador tem o dobro de chances.',
    drawHistory:
      'O primeiro sorteio da Dupla Sena foi em 6 de novembro de 2001. Foi a primeira loteria da Caixa com dois sorteios por concurso.',
    curiosities:
      'É a única loteria da Caixa com dois sorteios por concurso. O prêmio do segundo sorteio, quando não há ganhador da Sena, costuma acumular mais rápido que o primeiro.',
    homepageSummary:
      'Dois sorteios de 6 números (de 1 a 50) em cada concurso. Sorteios às segundas, quartas e sextas. A chance de acertar a Sena em cada sorteio é de 1 em 15.890.700. A aposta mínima custa R$ 2,50. São duas chances de ganhar com a mesma aposta.',
    firstDrawDate: '06/11/2001',
    facts: [
      'Existe desde 2001. Foi a primeira loteria da Caixa com dois sorteios por concurso.',
      'A chance de acertar a Sena em cada sorteio é de 1 em 15.890.700.',
      'São dois sorteios de 6 números por concurso — duas chances com a mesma aposta.',
      'Dá para ganhar nos dois sorteios ao mesmo tempo.',
      'A aposta mínima custa R$ 2,50 para 6 números.',
      'Os números vão de 1 a 50, com 6 sorteados em cada rodada.',
      'Sorteios 3 vezes por semana: segunda, quarta e sexta.',
      'O apostador pode marcar de 6 a 15 números por volante.',
      'A Dupla Sena de Páscoa é o sorteio especial que não acumula.',
      'Acertar o Terno (3 números) tem chance de 1 em 60 por sorteio.',
    ],
  },
  'timemania': {
    fullDescription:
      'Na Timemania, o apostador escolhe 10 números de 1 a 80 e um time do coração entre 80 clubes brasileiros. São sorteados 7 números e 1 time.\n\nSorteios às terças, quintas e sábados, às 21h. A aposta é fixa em R$ 3,50.\n\nQuem acerta o time sorteado já ganha, mesmo sem acertar números suficientes. Parte da arrecadação vai para os clubes de futebol participantes, para pagamento de dívidas fiscais.',
    howToPlay:
      '1. Escolha 10 números de 01 a 80.\n2. Escolha 1 time do coração entre os 80 clubes disponíveis.\n3. A aposta custa R$ 3,50 (valor fixo).\n4. São sorteados 7 números e 1 time.\n5. Sorteios às terças, quintas e sábados, às 21h.\n6. Ganha acertando 3, 4, 5, 6 ou 7 números, ou o time do coração.',
    prizeStructure:
      'A Timemania premia em 6 faixas: 7 acertos (30%), 6 acertos (10%), 5 acertos (15%), 4 acertos (15%), 3 acertos (20%) e Time do Coração (10%). Acertar o time garante um prêmio adicional independente dos números.',
    drawHistory:
      'A Timemania começou em 1º de março de 2008. O objetivo era ajudar clubes de futebol a quitar dívidas fiscais com o Governo Federal, repassando parte da arrecadação.',
    curiosities:
      'Os 80 clubes participantes incluem times de todas as divisões do futebol brasileiro. A chance de acertar o time do coração é de 1 em 80.',
    homepageSummary:
      'O apostador escolhe 10 números de 1 a 80 e um time do coração entre 80 clubes brasileiros. São sorteados 7 números e 1 time. Sorteios às terças, quintas e sábados. A chance do prêmio principal é de 1 em 26.472.637. A aposta custa R$ 3,50. Acertar o time do coração já paga prêmio.',
    firstDrawDate: '01/03/2008',
    facts: [
      'Existe desde 2008. Foi criada para ajudar clubes de futebol a quitar dívidas fiscais.',
      'A chance de acertar os 7 números é de 1 em 26.472.637.',
      'Única loteria da Caixa onde se escolhe um time de futebol.',
      '80 clubes brasileiros participam, de todas as divisões.',
      'Acertar só o time do coração já dá prêmio. Chance de 1 em 80.',
      'A aposta é fixa em R$ 3,50.',
      'O apostador escolhe 10 números, mas só 7 são sorteados.',
      'Parte da arrecadação vai direto para os clubes participantes.',
      'Sorteios 3 vezes por semana: terça, quinta e sábado.',
      'São 6 faixas de premiação, incluindo a faixa do time do coração.',
    ],
  },
};

// ---------------------------------------------------------------------------
// Prize redemption information (shared across all lotteries)
// ---------------------------------------------------------------------------

export const PRIZE_REDEMPTION = {
  tiers: [
    {
      range: 'Até R$ 2.259,20',
      where: 'Em qualquer casa lotérica credenciada ou agência da Caixa.',
      docs: 'Documento de identidade com foto e CPF.',
    },
    {
      range: 'De R$ 2.259,21 a R$ 10.000,00',
      where: 'Em qualquer agência da Caixa Econômica Federal.',
      docs: 'Documento de identidade com foto e CPF.',
    },
    {
      range: 'Acima de R$ 10.000,00',
      where: 'Em agência da Caixa, com agendamento prévio pela central 0800 726 0101.',
      docs: 'Documento de identidade, CPF e comprovante de residência.',
    },
  ],
  deadline: 90, // days
  taxInfo: 'Prêmios acima de R$ 2.259,20 têm desconto de Imposto de Renda na fonte, com alíquota de 13,8%.',
};

// ---------------------------------------------------------------------------
// Tool page content — static explanations, FAQs, and tips for each tool
// ---------------------------------------------------------------------------

export interface ToolPageContent {
  howToUse: string;
  faq: { question: string; answer: string }[];
  tips: string[];
}

export const TOOL_CONTENT: Record<string, ToolPageContent> = {
  conferidor: {
    howToUse:
      'Selecione a loteria, informe o número do concurso e digite os números da sua aposta. O sistema compara com o resultado oficial e mostra quantos acertos você teve e em qual faixa se enquadra. Dá para conferir várias apostas seguidas sem recarregar a página. Os dados vêm da API oficial da Caixa.',
    faq: [
      {
        question: 'O conferidor funciona com todos os concursos?',
        answer: 'Sim, o conferidor funciona com todos os concursos já realizados de todas as 9 loterias da Caixa. Basta informar o número do concurso e seus números.',
      },
      {
        question: 'Os resultados do conferidor são confiáveis?',
        answer: 'Sim. Os dados vêm da API oficial da Caixa Econômica Federal, então a comparação é feita com os números oficiais do sorteio.',
      },
      {
        question: 'Posso conferir apostas antigas?',
        answer: 'Sim, é possível conferir apostas de qualquer concurso já realizado, desde o primeiro sorteio de cada loteria até o mais recente.',
      },
      {
        question: 'O que significam as faixas de premiação mostradas?',
        answer: 'As faixas indicam quantos números você acertou. Cada loteria tem faixas diferentes — por exemplo, na Mega-Sena você ganha com 4, 5 ou 6 acertos, enquanto na Lotofácil ganha com 11 a 15 acertos.',
      },
    ],
    tips: [
      'Confira sua aposta logo após o sorteio para saber imediatamente se foi premiado.',
      'Guarde o comprovante físico da aposta mesmo após conferir online — ele é necessário para resgatar o prêmio.',
      'Verifique com atenção o número do concurso antes de conferir para não comparar com o sorteio errado.',
    ],
  },
  simulador: {
    howToUse:
      'Escolha a loteria, insira os números que você costuma jogar e selecione o período (últimos 10, 50 ou 100 concursos). O sistema mostra quantas vezes seus números teriam sido premiados, em quais faixas, e quanto você teria ganhado. Serve para entender a frequência de acertos das suas combinações sem gastar nada.',
    faq: [
      {
        question: 'A simulação indica os melhores números para jogar?',
        answer: 'Não. A simulação mostra como seus números se saíram em sorteios passados. Cada sorteio é independente — resultados anteriores não influenciam os próximos.',
      },
      {
        question: 'Quantos concursos posso simular de uma vez?',
        answer: 'Você pode simular seus números contra os últimos 10, 50 ou 100 concursos de qualquer loteria, analisando o desempenho ao longo de diferentes períodos.',
      },
      {
        question: 'O simulador calcula o lucro líquido?',
        answer: 'O simulador mostra o valor bruto dos prêmios que você teria ganho. Para valores acima de R$ 2.259,20, desconte 13,8% de Imposto de Renda para obter o valor líquido.',
      },
      {
        question: 'Posso simular apostas com mais números?',
        answer: 'Sim. Você pode simular apostas com mais números que o mínimo, como 7 números na Mega-Sena ou 16 na Lotofácil, para ver como as chances mudam.',
      },
    ],
    tips: [
      'Períodos longos (100+ concursos) dão uma amostra mais confiável.',
      'Compare diferentes combinações para ver como a frequência de acertos varia.',
      'Lembre-se: simulação mostra o passado, não prevê o futuro.',
    ],
  },
  gerador: {
    howToUse:
      'Selecione a loteria e clique em "Gerar" para obter uma combinação válida. Gere quantas combinações quiser e copie os números para usar na aposta. O gerador usa a API de criptografia do navegador para aleatoriedade real. Todas as combinações respeitam as regras de cada loteria.',
    faq: [
      {
        question: 'Os números gerados são realmente aleatórios?',
        answer: 'Sim. Usa a API de criptografia do navegador (crypto.getRandomValues), sem padrões previsíveis.',
      },
      {
        question: 'Os números gerados têm mais chance de sair?',
        answer: 'Não. Cada combinação tem a mesma chance de sair. Loterias são jogos de acaso — nenhuma combinação é mais provável que outra.',
      },
      {
        question: 'Posso gerar números para bolões?',
        answer: 'Sim. Você pode gerar múltiplas combinações e usá-las para montar bolões com amigos ou colegas de trabalho.',
      },
      {
        question: 'O gerador funciona para todas as loterias?',
        answer: 'Sim. O gerador está configurado para todas as 9 loterias da Caixa, respeitando a quantidade de números e faixa válida de cada modalidade.',
      },
    ],
    tips: [
      'Gere várias combinações e escolha a que mais lhe agradar — todas têm a mesma chance.',
      'Anote ou salve os números gerados antes de ir à lotérica para facilitar o preenchimento do volante.',
      'Use o gerador quando não souber quais números escolher — é equivalente à opção Surpresinha da Caixa.',
    ],
  },
  'numeros-quentes-frios': {
    howToUse:
      'Mostra a frequência com que cada número saiu nos últimos concursos. Números "quentes" são os que saíram acima da média. "Frios" são os que saíram pouco. Selecione a loteria e o período (últimos 10, 50 ou 100 concursos) para ver a classificação de cada número com gráficos e tabelas.',
    faq: [
      {
        question: 'Números quentes têm mais chance de sair no próximo sorteio?',
        answer: 'Não necessariamente. Cada sorteio é independente. A frequência histórica serve como curiosidade, mas não prevê o que vai sair.',
      },
      {
        question: 'Qual período de análise é mais confiável?',
        answer: 'Períodos mais longos (100+ concursos) tendem a se aproximar da distribuição uniforme esperada. Períodos curtos podem mostrar variações naturais que não representam tendências reais.',
      },
      {
        question: 'Por que alguns números saem mais que outros?',
        answer: 'Variações na frequência são naturais em processos aleatórios. Com amostras grandes o suficiente, todos os números tendem a se igualar em frequência. Diferenças observadas são flutuações estatísticas normais.',
      },
      {
        question: 'Devo evitar números frios?',
        answer: 'Não há evidência estatística de que números frios continuem frios ou que números quentes continuem quentes. Cada sorteio é independente e todos os números têm a mesma chance.',
      },
    ],
    tips: [
      'Compare a frequência observada com a esperada (teórica) para cada número.',
      'Variações são normais em processos aleatórios — não confunda flutuação com tendência.',
      'Experimente cruzar com o gerador e o simulador para testar diferentes combinações.',
    ],
  },
  previsoes: {
    howToUse:
      'Gera combinações sugeridas com base no histórico de todos os concursos. Selecione a loteria para ver as sugestões do próximo concurso. O sistema considera: frequência dos números (quentes e frios), atraso (números que não saem há mais tempo) e distribuição par/ímpar. As sugestões são recalculadas após cada sorteio.',
    faq: [
      {
        question: 'As previsões garantem que vou ganhar?',
        answer: 'Não. Nenhum método prevê os números de uma loteria. Os sorteios são aleatórios. As análises servem como apoio e curiosidade, não como garantia.',
      },
      {
        question: 'Qual metodologia é usada nas análises?',
        answer: 'Análise de frequência, cálculo de atraso (números que não saem há mais tempo), distribuição par/ímpar e por faixas numéricas, e dezenas que se repetem entre concursos consecutivos.',
      },
      {
        question: 'As sugestões são atualizadas automaticamente?',
        answer: 'Sim. São recalculadas após cada sorteio com os dados mais recentes.',
      },
      {
        question: 'Posso usar as sugestões em bolões?',
        answer: 'Sim, as combinações sugeridas podem ser usadas em bolões ou apostas individuais. Lembre-se de que são apenas sugestões baseadas em estatísticas históricas.',
      },
    ],
    tips: [
      'Use as análises como complemento, não como critério único.',
      'Misture números quentes, frios e atrasados nas suas apostas.',
      'Jogue dentro do seu orçamento.',
    ],
  },
  historico: {
    howToUse:
      'Selecione a loteria e o ano para ver todos os concursos do período. Cada resultado mostra números sorteados, data, ganhadores e premiação. Dá para baixar os dados em CSV para análise própria. O histórico é atualizado após cada sorteio.',
    faq: [
      {
        question: 'O histórico inclui todos os concursos desde o primeiro?',
        answer: 'Sim. O histórico contém todos os concursos desde o primeiro sorteio de cada loteria, com números, datas, premiação e ganhadores.',
      },
      {
        question: 'Posso baixar os dados do histórico?',
        answer: 'Sim. Você pode exportar os resultados em formato CSV para análise em planilhas como Excel ou Google Sheets.',
      },
      {
        question: 'Os dados são atualizados em tempo real?',
        answer: 'O histórico é atualizado automaticamente minutos após cada sorteio. Novos concursos aparecem assim que os dados oficiais são publicados pela Caixa.',
      },
      {
        question: 'Posso filtrar resultados por período?',
        answer: 'Sim. Você pode filtrar por ano e por loteria específica para encontrar o concurso que deseja consultar.',
      },
    ],
    tips: [
      'Use o filtro por ano para encontrar rapidamente concursos de um período específico.',
      'Exporte os dados em CSV para criar suas próprias análises estatísticas.',
      'Clique em qualquer concurso para ver os detalhes completos, incluindo premiação e ganhadores.',
    ],
  },
};
