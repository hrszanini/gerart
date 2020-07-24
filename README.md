# Sistema de gerenciamento pessoal de obras

## Funções do sistema
    
1. Cadastrar e gerenciar:
    * Galerias (Espaço Físico)
    * Editais
    * Clientes
    * Obras
    * Materiais (Inventário)

2. Controlar orçamento:
    * Compras de material
    * Vendas de obras

3. Gerar relatórios:
    * Lista de itens cadastrados
    * Histórico de operações

4. Documentos para impressão:
    * Proposta de venda
    * Etiqueta para obras

## Estrutura dos dados

1. Galeria:
    * Nome
    * Endereço
    * Telefone
    * Email
    * Site
    * Contato(Responsável, Atendente, Artistas)

2. Edital:
    * Link
    * Data de início
    * Data de entrega
    * Data do resultado
    * Valor
    * Premiação
    * Obras inscritas

3. Obras:
    * Nome
    * Tamanho
    * Data
    * Técnica
    * Materiais
    * Tipo de tela
    * Artista
    * Local
    * Valor
    * Status venda
    * Proprietário
    * Nível de apreço(Externo, Interno)

4. Clientes:
    * Nome
    * Endereço
    * Email
    * Poder aquisitivo
    * Obras
    * Lista de desejo

5. Materiais:
    * Tipo
    * Especificação
    * Quantidade
    * Preço unitário
    * Local
    * Durabilidade

6. Venda de Obra:
    * Obra
    * Valor
    * Forma de pagamento
    * proprietário
    * Data
