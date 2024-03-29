<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">Este é um microsserviço responsável pelos pagamentos do app lanchonete usando as melhores práticas de arquitetura de software.</p>
  <p align="center">
    <a href="https://nodejs.org/en" target="_blank"><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.JS" /></a>
    <a href="https://www.typescriptlang.org" target="_blank"><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript" /></a>
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt="NPM Version" /></a>
    <a href="https://www.postgresql.org" target="_blank"><img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="PostgreSQL" /></a>
    <a href="https://www.docker.com" target="_blank"><img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" /></a>
  </p>
</p>


<!-- TITULO DO PROJETO -->
<br />
<div align="center">
  <h3 align="center">Lanchonete Payment Service</h3>
</div>



<!-- COMECANDO -->
## Começando

Para executar o projeto localmente siga as próximas etapas.

### Pré-requisitos

* Docker com compose
  Veja a [documentação](https://docs.docker.com/engine/install/) para instalar o docker no seu sistema se ainda não tiver instalado.
* NodeJS no mínimo na versão 16. Recomendado a versão 18 (LTS) disponível no [site oficial](https://nodejs.org/en).

### Instalação

A instalação é bem simples, siga as seguintes etapas:

1. Clone o repositório
   ```sh
   git clone https://github.com/fiap-soat-tech-challenge/lanchonete-payment-service
   ```
2. Entre na pasta do projeto
   ```sh
   cd lanchonete-payment-service
   ```
3. Crie um arquivo novo arquivo com as váriaveis de ambiente `.env` usando o `.env.example`
   ```sh
   cp .env.example .env
   ```
4. Agora execute o projeto usando o docker compose
   ```sh
   docker compose --profile=all up
   ```

<p align="right">(<a href="#readme-top">Voltar para o topo</a>)</p>

<!-- EXEMPLOS DE USO -->
## Exemplos de uso

### Para acessar a home da API
- http://localhost:3003/

Nessa página você terá o link para a documentação (Swagger) e poderar utilizar toda a aplicação!

### Para acessar o Swagger UI use uma das seguintes URLs
- http://localhost:3003/api/docs

### Health Check
    http://localhost:3003/health

A resposta deve seguir o seguinte formato:

```json
{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    },
  },
  "error": {
    
  },
  "details": {
    "database": {
      "status": "up"
    },
  }
}
```

<p align="right">(<a href="#readme-top">Voltar para o topo</a>)</p>

## Banco de dados

O MongoDB é um sistema de gerenciamento de banco de dados NoSQL (Not Only SQL), orientado a documentos e de código aberto. 
Ele foi projetado para ser escalável e flexível, permitindo armazenarmos e gerenciar grandes volumes de dados de maneira
eficiente.

<p align="right">(<a href="#readme-top">Voltar para o topo</a>)</p>

## SAGA Pattern - Coreografia

Utilizamos a estratégia **coreografia**.

Decidimos utilizar a estratégia **coreografia** por ser mais simples e ter um acoplamento fraco entre os serviços. Assim,
pensando nos próximos passos, a evolução dos microsserviços se torna mais tranquila já que os mesmos vão estar sem
acoplamento com os demais e poderemos também ao ponto que aumentamos o time (de desenvolvedores) dividir a sub times,
o que vai facilitar o crescimento do time. Assim, por ser mais simples do que a estratégia orquestração, podemos
implementar mais rapidamente, e com isso entregar uma primeira versão do software mais rápido.

No futuro com a evolução, do software, do time, e mudanças no negócio (possivelmente) podemos pensar em utilizar a
orquestração, mas no momento é mais vantajoso usarmos a estratégia **coreografia**. Assim cada serviço sabe qual
evento disparar e qual evento deve ouvir para que a saga seja completa.

## Zap Scanning Reports

Os relatórios de segurança do ZAP Scanning estão disponíveis no diretório `zap-reports` na raiz do projeto. Como os
são HTML, não é possível visualizá-los diretamente no GitHub. Para visualizá-los, faça o clone do repositório e abra
os arquivos HTML em um navegador.

Importante: Como os relatórios não tiveram nenhum alerta, resolvemos disponibilizar imagens da execução do ZAP Scanning
para constatar que o mesmo foi executado como deveria. E como não houve alerta com risco **High** então não foi 
necessário gerar dois relatórios para cada endpoint.

### Geração do Pagamento

![Geração do Pagamento Imagem 1](zap-reports/zap-geracao-pagamento-1.png)

![Geração do Pagamento Imagem 2](zap-reports/zap-geracao-pagamento-2.png)

### Confirmação do Pagamento

![Confirmação do Pagamento Imagem 1](zap-reports/zap-confirmacao-pagamento-1.png)

![Confirmação do Pagamento Imagem 2](zap-reports/zap-confirmacao-pagamento-2.png)

## Relatório RIPD do sistema

Link para o relatório RIPD do sistema: **[Relatório RIPD](https://docs.google.com/document/d/1hBpNQ4Gs5mKzRf0FAM85vzqWiXM7idFJF5sMvlN9cy0/preview)**.

## Diagrama da Arquitetura

![Diagrama da Arquitetura](https://github.com/fiap-soat-tech-challenge/terraform-lanchonete-app/blob/main/docs/imagens/infra_aws_app.png)