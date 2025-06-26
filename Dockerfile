# Imagem base do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Expõe a porta 3000 (ou a que seu app usar)
EXPOSE 3000

# Comando para iniciar o app
CMD ["node", "index.js"]
